<script setup lang="ts">
import * as THREE from 'three'

const host = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const fxReady = ref(false)

const pose = reactive({
  rx: 0,
  ry: 0,
  tx: 0,
  ty: 0,
  tz: 40,
  shineX: 50,
  shineY: 40,
})

onMounted(() => {
  const wrap = host.value
  const el = canvas.value
  if (!wrap) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let disposed = false
  let raf = 0

  const target = { x: 0, y: 0 }
  const smooth = { x: 0, y: 0, vx: 0, vy: 0 }

  const onMove = (e: PointerEvent) => {
    const rect = wrap.getBoundingClientRect()
    target.x = THREE.MathUtils.clamp(((e.clientX - rect.left) / rect.width) * 2 - 1, -1, 1)
    target.y = THREE.MathUtils.clamp(((e.clientY - rect.top) / rect.height) * 2 - 1, -1, 1)
  }
  const onLeave = () => {
    target.x = 0
    target.y = 0
  }
  window.addEventListener('pointermove', onMove, { passive: true })
  wrap.addEventListener('pointerleave', onLeave)

  const stepSpring = () => {
    const ax = (target.x - smooth.x) * 0.09
    const ay = (target.y - smooth.y) * 0.09
    smooth.vx = (smooth.vx + ax) * 0.85
    smooth.vy = (smooth.vy + ay) * 0.85
    smooth.x += smooth.vx
    smooth.y += smooth.vy
  }

  let renderer: THREE.WebGLRenderer | null = null
  let scene: THREE.Scene | null = null
  let camera: THREE.PerspectiveCamera | null = null
  let particles: THREE.Points | null = null
  let pMat: THREE.ShaderMaterial | null = null
  const disposables: Array<{ dispose: () => void }> = []

  const initParticles = () => {
    if (!el || reduced) return false
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: el,
        antialias: true,
        alpha: true,
        premultipliedAlpha: false,
        powerPreference: 'high-performance',
      })
    } catch {
      return false
    }
    if (!renderer.getContext()) {
      renderer.dispose()
      renderer = null
      return false
    }

    let w = wrap.clientWidth || window.innerWidth
    let h = wrap.clientHeight || window.innerHeight

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(w, h, false)
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.autoClear = true

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(30, w / h, 0.1, 100)
    camera.position.set(0.35, 0.06, 3.4)

    const count = 900
    const pos = new Float32Array(count * 3)
    const seed = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2
      const r = 0.9 + Math.random() * 1.8
      pos[i * 3] = Math.cos(a) * r + 0.55
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2.4
      pos[i * 3 + 2] = (Math.sin(a) * r) * 0.55
      seed[i] = Math.random()
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    pGeo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1))
    pMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        attribute float aSeed;
        varying float vA;
        uniform float uTime;
        uniform vec2 uMouse;
        void main(){
          vec3 p = position;
          float spin = uTime * (0.12 + aSeed * 0.2);
          float rr = length(p.xz - vec2(0.55, 0.0));
          p.x = 0.55 + cos(spin + aSeed * 6.28) * rr;
          p.z = sin(spin + aSeed * 6.28) * rr * 0.55;
          p.y += sin(uTime * (0.5 + aSeed) + aSeed * 12.0) * 0.1;
          p.xy += uMouse * (0.12 + aSeed * 0.18);
          vA = 0.22 + aSeed * 0.45;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (1.1 + aSeed * 2.0) * (90.0 / -mv.z);
        }
      `,
      fragmentShader: `
        varying float vA;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          float a = smoothstep(0.5, 0.0, d) * vA;
          gl_FragColor = vec4(1.0, 1.0, 1.0, a);
        }
      `,
    })
    particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)
    disposables.push(pGeo, pMat)

    const onResize = () => {
      if (!renderer || !camera) return
      w = wrap.clientWidth || window.innerWidth
      h = wrap.clientHeight || window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
    }
    window.addEventListener('resize', onResize)
    const ro = new ResizeObserver(onResize)
    ro.observe(wrap)

    onUnmounted(() => {
      window.removeEventListener('resize', onResize)
      ro.disconnect()
      disposables.forEach((d) => d.dispose())
      renderer?.dispose()
    })

    fxReady.value = true
    return true
  }

  const hasFx = initParticles()
  const t0 = performance.now()

  const tick = () => {
    if (disposed) return
    stepSpring()
    const t = (performance.now() - t0) / 1000

    const idleY = Math.sin(t * 0.7) * 4
    const idleX = Math.cos(t * 0.55) * 2.5
    pose.ry = smooth.x * 10 + idleY * 0.15
    pose.rx = smooth.y * -6 + idleX * 0.15
    pose.tx = smooth.x * 10
    pose.ty = smooth.y * 8 + Math.sin(t * 0.9) * 5
    pose.tz = 36
    pose.shineX = 50 + smooth.x * 16
    pose.shineY = 38 + smooth.y * 12

    if (hasFx && renderer && scene && camera && particles && pMat) {
      camera.position.x = 0.35 + smooth.x * 0.08
      camera.position.y = 0.06 - smooth.y * 0.05
      camera.lookAt(0.55, 0, 0)
      pMat.uniforms.uTime.value = t
      pMat.uniforms.uMouse.value.set(smooth.x, -smooth.y)
      renderer.render(scene, camera)
    }

    raf = requestAnimationFrame(tick)
  }

  tick()

  onUnmounted(() => {
    disposed = true
    cancelAnimationFrame(raf)
    window.removeEventListener('pointermove', onMove)
    wrap.removeEventListener('pointerleave', onLeave)
  })
})
</script>

<template>
  <div ref="host" class="scene-host">
    <div class="scene-fallback" aria-hidden="true">
      <div
        class="scene-card"
        :style="{
          transform: `translate3d(${pose.tx}px, ${pose.ty}px, ${pose.tz}px) rotateX(${pose.rx}deg) rotateY(${pose.ry}deg)`,
          '--shine-x': `${pose.shineX}%`,
          '--shine-y': `${pose.shineY}%`,
        }"
      >
        <img
          class="scene-card__img"
          src="/holo-portrait.png"
          alt=""
          width="900"
          height="900"
          draggable="false"
        >
        <div class="scene-card__shine" />
        <div class="scene-card__depth" />
      </div>
    </div>

    <canvas ref="canvas" class="scene3d" :class="{ 'is-on': fxReady }" />
  </div>
</template>

<style scoped>
.scene-host {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  background: #000;
  perspective: 1500px;
  pointer-events: none;
}

.scene3d {
  position: absolute;
  inset: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  display: block;
  opacity: 0;
  transition: opacity 0.8s ease;
  pointer-events: none;
}

.scene3d.is-on {
  opacity: 1;
}

.scene-fallback {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: clamp(1rem, 7vw, 6rem);
  transform-style: preserve-3d;
}

.scene-card {
  position: relative;
  width: min(78vh, 700px);
  max-width: 58vw;
  transform-style: preserve-3d;
  will-change: transform;
  transform-origin: 55% 45%;
}

.scene-card__img {
  width: 100%;
  height: auto;
  display: block;
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 28px 70px rgba(0, 0, 0, 0.7));
  user-select: none;
  -webkit-user-drag: none;
}

.scene-card__shine {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  background: radial-gradient(
    circle at var(--shine-x, 50%) var(--shine-y, 40%),
    rgba(255, 255, 255, 0.28),
    transparent 45%
  );
  mix-blend-mode: screen;
}

.scene-card__depth {
  position: absolute;
  inset: 8% 10%;
  z-index: 1;
  transform: translateZ(-70px) scale(1.06);
  background: radial-gradient(circle, rgba(255, 255, 255, 0.22), transparent 65%);
  filter: blur(30px);
}

@media (max-width: 860px) {
  .scene-fallback {
    justify-content: center;
    align-items: flex-start;
    padding: 16vh 1rem 0;
  }

  .scene-card {
    width: min(84vw, 440px);
    max-width: none;
  }
}
</style>
