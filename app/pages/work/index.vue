<script setup lang="ts">
import { pagesEmotion, projects } from '~/data/portfolio'

useHead({ title: 'Work — Munni Khan' })

const { onMove, onLeave } = useTilt(14)
const emo = pagesEmotion.work
</script>

<template>
  <PageShell eyebrow="Work / What I stayed for" mood="work">
    <EmotionMark :feeling="emo.feeling" :whisper="emo.whisper" />

    <div class="work-page">
      <div class="work-page__head page3d-item">
        <Title3D text="Made with feeling" size="xl" />
        <p class="work-page__lead">
          Not a gallery of features — a collection of nights, doubts, and the moments that finally clicked.
        </p>
      </div>

      <div class="work-page__grid">
        <NuxtLink
          v-for="project in projects"
          :key="project.slug"
          :to="`/work/${project.slug}`"
          class="work-card tilt-3d page3d-item"
          @mousemove="onMove"
          @mouseleave="onLeave"
        >
          <div class="work-card__visual" :style="{ '--accent': project.accent }">
            <span class="work-card__emotion">{{ project.emotion }}</span>
            <span class="work-card__id text-3d">{{ project.id }}</span>
            <div class="work-card__shine" />
          </div>
          <div class="work-card__meta">
            <div class="work-card__top">
              <span>{{ project.category }}</span>
              <span>{{ project.year }}</span>
            </div>
            <h2 class="text-3d">{{ project.title }}</h2>
            <p>{{ project.summary }}</p>
            <span class="work-card__link">Step inside →</span>
          </div>
        </NuxtLink>
      </div>

      <p class="work-page__closer page3d-item">{{ emo.closer }}</p>
    </div>
  </PageShell>
</template>

<style scoped>
.work-page {
  display: grid;
  gap: 2.5rem;
}

.work-page__lead {
  margin-top: 1.1rem;
  max-width: 40ch;
  color: rgba(255, 255, 255, 0.65);
  font-weight: 300;
  font-size: 1.15rem;
  line-height: 1.5;
}

.work-page__grid {
  display: grid;
  gap: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.work-card {
  display: grid;
  gap: 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1.75rem 0;
  transform-style: preserve-3d;
  transition: background 0.35s ease;
}

.work-card:hover {
  background: rgba(255, 255, 255, 0.03);
}

.work-card__visual {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background:
    radial-gradient(ellipse at 30% 20%, rgba(255, 255, 255, 0.12), transparent 45%),
    linear-gradient(145deg, var(--accent), #000 70%);
  transform: translateZ(28px);
}

.work-card__emotion {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 2;
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 0.35rem 0.65rem;
  backdrop-filter: blur(6px);
}

.work-card__id {
  position: absolute;
  left: 1rem;
  bottom: 0.75rem;
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  line-height: 1;
  color: rgba(255, 255, 255, 0.2);
}

.work-card__shine {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--mx, 50%) var(--my, 40%), rgba(255, 255, 255, 0.16), transparent 40%);
  pointer-events: none;
}

.work-card__meta {
  transform: translateZ(20px);
  padding: 0.35rem 0.25rem 0.5rem;
}

.work-card__top {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.6rem;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
}

.work-card h2 {
  margin-bottom: 0.55rem;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  text-transform: uppercase;
}

.work-card p {
  color: rgba(255, 255, 255, 0.62);
  font-weight: 300;
  max-width: 42ch;
  line-height: 1.5;
}

.work-card__link {
  display: inline-block;
  margin-top: 1rem;
  font-size: 0.76rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #fff;
}

.work-page__closer {
  max-width: 36ch;
  font-style: italic;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.1rem;
}

@media (min-width: 900px) {
  .work-card {
    grid-template-columns: 1.2fr 1fr;
    align-items: end;
  }
}
</style>
