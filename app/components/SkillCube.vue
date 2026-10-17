<script setup lang="ts">
const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'] as const

const pose = reactive({
  rx: -18,
  ry: 28,
  rz: -8,
})

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) return

  let disposed = false
  let raf = 0
  const t0 = performance.now()
  const target = { x: 0, y: 0 }
  const smooth = { x: 0, y: 0 }

  const onMove = (e: PointerEvent) => {
    target.x = (e.clientX / window.innerWidth - 0.5) * 2
    target.y = (e.clientY / window.innerHeight - 0.5) * 2
  }
  window.addEventListener('pointermove', onMove, { passive: true })

  const tick = () => {
    if (disposed) return
    const t = (performance.now() - t0) / 1000
    smooth.x += (target.x - smooth.x) * 0.06
    smooth.y += (target.y - smooth.y) * 0.06

    pose.ry = t * 28 + smooth.x * 36
    pose.rx = -18 + Math.sin(t * 0.55) * 16 + smooth.y * -28
    pose.rz = Math.sin(t * 0.35) * 10 + smooth.x * -6

    raf = requestAnimationFrame(tick)
  }
  tick()

  onUnmounted(() => {
    disposed = true
    cancelAnimationFrame(raf)
    window.removeEventListener('pointermove', onMove)
  })
})
</script>

<template>
  <div class="skill-cube" aria-hidden="true">
    <div
      class="skill-cube__body"
      :style="{
        transform: `rotateX(${pose.rx}deg) rotateY(${pose.ry}deg) rotateZ(${pose.rz}deg)`,
      }"
    >
      <div
        v-for="face in faces"
        :key="face"
        class="skill-cube__face"
        :class="`skill-cube__face--${face}`"
      >
        <img src="/holo-portrait.png" alt="" width="900" height="900" draggable="false">
        <span class="skill-cube__edge" />
      </div>
    </div>
    <div class="skill-cube__glow" />
  </div>
</template>

<style scoped>
.skill-cube {
  --cube: min(42vw, 280px);
  position: relative;
  width: var(--cube);
  height: var(--cube);
  margin: 0.5rem auto 0;
  perspective: 900px;
  transform-style: preserve-3d;
}

.skill-cube__body {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  will-change: transform;
  z-index: 2;
}

.skill-cube__face {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #050505;
  border: 1px solid rgba(255, 255, 255, 0.22);
  backface-visibility: hidden;
}

.skill-cube__face img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  user-select: none;
  -webkit-user-drag: none;
}

.skill-cube__edge {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.12), transparent 18%, transparent 82%, rgba(255, 255, 255, 0.12)),
    linear-gradient(180deg, rgba(255, 255, 255, 0.1), transparent 20%, transparent 80%, rgba(255, 255, 255, 0.08));
  mix-blend-mode: screen;
}

.skill-cube__face--front  { transform: rotateY(0deg) translateZ(calc(var(--cube) / 2)); }
.skill-cube__face--back   { transform: rotateY(180deg) translateZ(calc(var(--cube) / 2)); }
.skill-cube__face--right  { transform: rotateY(90deg) translateZ(calc(var(--cube) / 2)); }
.skill-cube__face--left   { transform: rotateY(-90deg) translateZ(calc(var(--cube) / 2)); }
.skill-cube__face--top    { transform: rotateX(90deg) translateZ(calc(var(--cube) / 2)); }
.skill-cube__face--bottom { transform: rotateX(-90deg) translateZ(calc(var(--cube) / 2)); }

.skill-cube__face--back img,
.skill-cube__face--left img,
.skill-cube__face--bottom img {
  filter: brightness(0.72) contrast(1.08);
}

.skill-cube__face--top img,
.skill-cube__face--right img {
  filter: brightness(0.88);
}

.skill-cube__glow {
  position: absolute;
  left: 50%;
  bottom: -18%;
  width: 120%;
  height: 28%;
  transform: translateX(-50%);
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(255, 255, 255, 0.16), transparent 70%);
  filter: blur(14px);
  z-index: 1;
  pointer-events: none;
}

@media (max-width: 860px) {
  .skill-cube {
    --cube: min(58vw, 220px);
  }
}
</style>
