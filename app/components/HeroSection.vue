<script setup lang="ts">
import { profile } from '~/data/portfolio'

const root = ref<HTMLElement | null>(null)
const { $gsap } = useNuxtApp()

const contentShift = reactive({ x: 0, y: 0 })
const brand3d = reactive({
  rx: 0,
  ry: 0,
  tz: 0,
})

onMounted(() => {
  const target = { x: 0, y: 0 }
  const smooth = { x: 0, y: 0, vx: 0, vy: 0 }
  let raf = 0

  const onMove = (e: PointerEvent) => {
    target.x = (e.clientX / window.innerWidth - 0.5) * 2
    target.y = (e.clientY / window.innerHeight - 0.5) * 2
  }
  window.addEventListener('pointermove', onMove, { passive: true })

  const tick = () => {
    // Spring for 3D title
    const ax = (target.x - smooth.x) * 0.08
    const ay = (target.y - smooth.y) * 0.08
    smooth.vx = (smooth.vx + ax) * 0.86
    smooth.vy = (smooth.vy + ay) * 0.86
    smooth.x += smooth.vx
    smooth.y += smooth.vy

    // Keep motion gentle so the title never swings over the portrait
    contentShift.x = smooth.x * -4
    contentShift.y = smooth.y * -3

    // Cap leftward tilt — Munni Khan must not cover the portrait
    brand3d.ry = Math.max(-3, Math.min(6, smooth.x * 5))
    brand3d.rx = Math.max(-3, Math.min(3, smooth.y * -3))
    brand3d.tz = 8

    raf = requestAnimationFrame(tick)
  }
  tick()

  if ($gsap && root.value) {
    const ctx = $gsap.context(() => {
      $gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.hero__brand-line', {
          yPercent: 120,
          rotateX: -80,
          transformOrigin: '50% 100%',
          duration: 1.25,
          stagger: 0.1,
        })
        .from('.hero__copy > *', { y: 20, opacity: 0, duration: 0.75, stagger: 0.08 }, '-=0.45')
    }, root.value)
    onUnmounted(() => ctx.revert())
  }

  onUnmounted(() => {
    cancelAnimationFrame(raf)
    window.removeEventListener('pointermove', onMove)
  })
})
</script>

<template>
  <section id="top" ref="root" class="hero">
    <ClientOnly>
      <Scene3D />
    </ClientOnly>

    <div class="hero__veil" aria-hidden="true" />

    <div
      class="hero__content"
      :style="{ transform: `translate3d(${contentShift.x}px, ${contentShift.y}px, 0)` }"
    >
      <p class="hero__kicker">Portfolio / Built to be felt</p>

      <h1
        class="hero__brand"
        aria-label="Munni Khan"
        :style="{
          transform: `perspective(900px) rotateX(${brand3d.rx}deg) rotateY(${brand3d.ry}deg) translateZ(${brand3d.tz}px)`,
        }"
      >
        <span class="hero__brand-mask">
          <span class="hero__brand-line">Munni Khan</span>
        </span>
      </h1>

      <div class="hero__copy">
        <p>{{ profile.tagline }}</p>
        <div class="hero__actions">
          <NuxtLink class="btn btn--primary btn-3d" to="/work">View work</NuxtLink>
          <NuxtLink class="btn btn--ghost btn-3d" to="/contact">Contact</NuxtLink>
        </div>
      </div>
    </div>

    <div class="hero__scroll" aria-hidden="true">
      <span>Scroll</span>
      <i />
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  overflow: hidden;
  background: #000;
}

.hero__veil {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    linear-gradient(90deg, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.42) 34%, rgba(0, 0, 0, 0.05) 55%, transparent 72%),
    linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, transparent 40%, rgba(0, 0, 0, 0.7) 100%);
}

.hero__content {
  position: absolute;
  z-index: 2;
  left: max(1.25rem, calc((100% - var(--content)) / 2));
  bottom: 0;
  width: min(34rem, 46vw);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 0 clamp(3.5rem, 8vh, 5.5rem);
  will-change: transform;
  perspective: 1000px;
  /* Don't let 3D title paint over the portrait */
  overflow: visible;
  pointer-events: none;
}

.hero__content a {
  pointer-events: auto;
}

.hero__kicker {
  margin-bottom: 0.75rem;
  font-size: 0.72rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #fff;
}

.hero__brand {
  margin-bottom: 1.15rem;
  font-family: var(--font-brand);
  font-size: clamp(2.75rem, 6.5vw, 4.75rem);
  font-weight: 500;
  line-height: 1.05;
  letter-spacing: -0.04em;
  text-transform: none;
  transform-style: preserve-3d;
  will-change: transform;
  transform-origin: left bottom;
  max-width: 100%;
}

.hero__brand-mask {
  display: block;
  overflow: hidden;
}

.hero__brand-line {
  display: block;
  color: #fff;
  text-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}

.hero__copy {
  display: grid;
  gap: 1.1rem;
}

.hero__copy p {
  max-width: 36ch;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 300;
  font-size: 1.05rem;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  min-height: 2.9rem;
  padding: 0.7rem 1.2rem;
  font-size: 0.76rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  transition: transform 0.3s ease, background 0.3s ease;
}

.btn:hover { transform: translateY(-2px); }

.btn--primary {
  background: #ffffff;
  color: #070708;
}

.btn--ghost {
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: #fff;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(8px);
}

.hero__scroll {
  position: absolute;
  right: max(1.25rem, calc((100% - var(--content)) / 2));
  bottom: 2.5rem;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 0.68rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
}

.hero__scroll i {
  width: 1px;
  height: 2.6rem;
  background: linear-gradient(#fff, transparent);
  transform-origin: top;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scaleY(0.4); opacity: 0.4; }
  50% { transform: scaleY(1); opacity: 1; }
}

@media (max-width: 860px) {
  .hero__content {
    left: 1.25rem;
    right: 1.25rem;
    width: auto;
    max-width: none;
  }

  .hero__brand {
    font-size: clamp(2.4rem, 10vw, 3.4rem);
  }

  .hero__veil {
    background:
      linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.2) 40%, rgba(0, 0, 0, 0.9) 100%);
  }

  .hero__scroll { display: none; }
}
</style>
