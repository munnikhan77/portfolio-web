<script setup lang="ts">
import { profile, timeline } from '~/data/portfolio'

const { onMove, onLeave } = useTilt(12)
</script>

<template>
  <section id="about" class="section about">
    <div class="container about__grid">
      <div class="about__intro reveal">
        <p class="section-label">About</p>
        <Title3D text="Portrait in code" size="lg" />
        <p class="section-lead">{{ profile.about[0] }}</p>
      </div>

      <div class="about__body">
        <p
          class="about__statement tilt-3d reveal reveal-delay-1"
          @mousemove="onMove"
          @mouseleave="onLeave"
        >
          {{ profile.about[1] }}
        </p>

        <ul class="about__timeline">
          <li
            v-for="(item, i) in timeline"
            :key="item.year"
            class="about__timeline-item tilt-3d reveal"
            :class="`reveal-delay-${i + 2}`"
            @mousemove="onMove"
            @mouseleave="onLeave"
          >
            <span>{{ item.year }}</span>
            <p>{{ item.text }}</p>
          </li>
        </ul>
      </div>
    </div>

    <div class="about__marquee" aria-hidden="true">
      <div class="about__marquee-track">
        <span v-for="n in 6" :key="n">Munni Khan — Web Developer —</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  overflow: hidden;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.72) 45%, rgba(0, 0, 0, 0.85) 100%);
  perspective: 1200px;
  transform-style: preserve-3d;
}

.about__grid {
  display: grid;
  gap: 3rem;
}

.about__intro {
  transform-style: preserve-3d;
}

.about__intro :deep(.title3d) {
  margin-bottom: 0.25rem;
}

.about__statement {
  font-size: clamp(1.25rem, 2.4vw, 1.65rem);
  font-weight: 300;
  line-height: 1.45;
  max-width: 28ch;
  color: var(--bone);
  padding: 1.25rem;
  border: 1px solid var(--line);
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(8px);
}

.about__timeline {
  list-style: none;
  margin: 2.5rem 0 0;
  padding: 0;
  display: grid;
  gap: 1rem;
}

.about__timeline-item {
  display: grid;
  grid-template-columns: 5.5rem 1fr;
  gap: 1rem;
  padding: 1.1rem 1rem;
  border: 1px solid var(--line);
  background: rgba(0, 0, 0, 0.28);
}

.about__timeline-item span {
  color: var(--brass);
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-shadow: 0 2px 0 rgba(255, 255, 255, 0.25);
}

.about__timeline-item p {
  color: var(--bone-muted);
  font-weight: 300;
}

.about__marquee {
  margin-top: clamp(3rem, 8vw, 5rem);
  border-block: 1px solid var(--line);
  overflow: hidden;
  perspective: 800px;
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}

.about__marquee-track {
  display: flex;
  width: max-content;
  gap: 1.5rem;
  padding-block: 1.1rem;
  animation: marquee 28s linear infinite;
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: color-mix(in srgb, var(--bone) 40%, transparent);
  white-space: nowrap;
  text-shadow:
    0 1px 0 rgba(255, 255, 255, 0.25),
    0 3px 0 rgba(255, 255, 255, 0.12),
    0 10px 24px rgba(0, 0, 0, 0.4);
  transform: rotateX(18deg);
  transform-origin: center;
}

@keyframes marquee {
  from { transform: rotateX(18deg) translateX(0); }
  to { transform: rotateX(18deg) translateX(-50%); }
}

@media (min-width: 900px) {
  .about__grid {
    grid-template-columns: 1.05fr 0.95fr;
    align-items: end;
    gap: 4rem;
  }
}
</style>
