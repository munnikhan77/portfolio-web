<script setup lang="ts">
import { projects } from '~/data/portfolio'

const root = ref<HTMLElement | null>(null)
const { $gsap } = useNuxtApp()
const { onMove, onLeave } = useTilt(14)

onMounted(() => {
  if (!$gsap || !root.value) return

  const ctx = $gsap.context(() => {
    $gsap.utils.toArray<HTMLElement>('.work__item').forEach((item, i) => {
      const visual = item.querySelector('.work__visual')
      const meta = item.querySelector('.work__meta')

      $gsap.from(visual, {
        rotateY: i % 2 === 0 ? -28 : 28,
        rotateX: 12,
        z: -180,
        opacity: 0.2,
        duration: 1.35,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
        },
      })

      $gsap.from(meta, {
        x: i % 2 === 0 ? 40 : -40,
        opacity: 0,
        duration: 1,
        delay: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
        },
      })
    })
  }, root.value)

  onUnmounted(() => ctx.revert())
})
</script>

<template>
  <section id="work" ref="root" class="section work">
    <div class="container">
      <div class="work__head reveal">
        <p class="section-label">Selected work</p>
        <Title3D text="Selected work" size="lg" />
        <p class="section-lead">
          Case studies from the reel — hover to tilt in 3D. Replace with your real projects anytime.
        </p>
      </div>

      <div class="work__list">
        <article
          v-for="(project, index) in projects"
          :key="project.id"
          class="work__item"
          :class="`reveal-delay-${(index % 3) + 1}`"
        >
          <div
            class="work__visual tilt-3d"
            :style="{ '--accent': project.accent }"
            aria-hidden="true"
            @mousemove="onMove"
            @mouseleave="onLeave"
          >
            <div class="work__visual-inner">
              <span class="work__id text-3d">{{ project.id }}</span>
              <div class="work__grid" />
              <div class="work__shine" />
              <div class="work__orb" />
            </div>
          </div>

          <div
            class="work__meta tilt-3d"
            @mousemove="onMove"
            @mouseleave="onLeave"
          >
            <div class="work__meta-top">
              <p>{{ project.category }}</p>
              <p>{{ project.year }}</p>
            </div>
            <h3 class="work__title text-3d">{{ project.title }}</h3>
            <p class="work__summary">{{ project.summary }}</p>
            <span class="work__link">View case study</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.work {
  background: rgba(0, 0, 0, 0.82);
  perspective: 1200px;
}

.work__head {
  margin-bottom: clamp(2.5rem, 6vw, 4rem);
}

.work__list {
  display: grid;
  gap: clamp(2.5rem, 6vw, 4.5rem);
}

.work__item {
  display: grid;
  gap: 1.35rem;
  transform-style: preserve-3d;
}

.work__visual {
  position: relative;
  aspect-ratio: 16 / 10;
  border: 1px solid var(--line);
  background: rgba(7, 7, 8, 0.35);
  backdrop-filter: blur(6px);
}

.work__visual-inner {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background:
    radial-gradient(ellipse at 30% 20%, color-mix(in srgb, var(--brass) 28%, transparent), transparent 45%),
    radial-gradient(ellipse at 80% 80%, rgba(168, 90, 58, 0.28), transparent 50%),
    linear-gradient(145deg, var(--accent), #0a0a0c 70%);
  transform: translateZ(30px);
  transform-style: preserve-3d;
}

.work__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(235, 228, 214, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(235, 228, 214, 0.05) 1px, transparent 1px);
  background-size: 42px 42px;
  transform: translateZ(10px);
  mask-image: radial-gradient(ellipse at center, #000 20%, transparent 75%);
}

.work__orb {
  position: absolute;
  width: 38%;
  aspect-ratio: 1;
  right: 12%;
  top: 18%;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.25), transparent 60%);
  transform: translateZ(50px);
  animation: orb-float 7s ease-in-out infinite alternate;
}

.work__shine {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at var(--mx, 50%) var(--my, 40%), rgba(235, 228, 214, 0.18), transparent 35%),
    linear-gradient(120deg, transparent 30%, rgba(235, 228, 214, 0.08) 48%, transparent 65%);
  transform: translateZ(40px);
  pointer-events: none;
}

.work__id {
  position: absolute;
  left: 1.25rem;
  bottom: 1.1rem;
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 5rem);
  line-height: 1;
  color: color-mix(in srgb, var(--bone) 22%, transparent);
  transform: translateZ(60px);
}

.work__meta-top {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--bone-muted);
}

.work__meta {
  transform-style: preserve-3d;
  padding: 0.5rem;
}

.work__title {
  font-size: clamp(2rem, 5vw, 3.25rem);
  text-transform: uppercase;
  margin-bottom: 0.75rem;
  transform: translateZ(24px);
}

.work__summary {
  color: var(--bone-muted);
  font-weight: 300;
  max-width: 42ch;
}

.work__link {
  display: inline-block;
  margin-top: 1.15rem;
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--brass);
  border-bottom: 1px solid transparent;
  transition: border-color 0.25s ease;
}

.work__item:hover .work__link {
  border-color: var(--brass);
}

@keyframes orb-float {
  from { transform: translateZ(50px) translateY(0) scale(1); }
  to { transform: translateZ(70px) translateY(-12px) scale(1.06); }
}

@media (min-width: 900px) {
  .work__item {
    grid-template-columns: 1.35fr 1fr;
    align-items: end;
    gap: 2.5rem;
  }

  .work__item:nth-child(even) {
    grid-template-columns: 1fr 1.35fr;
  }

  .work__item:nth-child(even) .work__visual {
    order: 2;
  }
}
</style>
