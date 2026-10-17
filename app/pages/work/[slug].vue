<script setup lang="ts">
import { getProject, projects } from '~/data/portfolio'

const route = useRoute()
const slug = String(route.params.slug)
const project = getProject(slug)

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

useHead({ title: `${project.title} — Munni Khan` })

const { onMove, onLeave } = useTilt(12)
const idx = projects.findIndex((p) => p.slug === project.slug)
const next = projects[(idx + 1) % projects.length]
</script>

<template>
  <PageShell :eyebrow="`${project.category} / ${project.year}`" mood="case">
    <EmotionMark
      :feeling="project.emotion"
      :whisper="`The emotion that carried ${project.title}`"
    />

    <div class="case">
      <div class="case__hero page3d-item">
        <Title3D :text="project.title" size="xl" />
        <p class="case__summary">{{ project.summary }}</p>
      </div>

      <div
        class="case__stage tilt-3d page3d-item"
        :style="{ '--accent': project.accent }"
        @mousemove="onMove"
        @mouseleave="onLeave"
      >
        <span class="case__id text-3d">{{ project.id }}</span>
        <div class="case__orb" />
      </div>

      <div class="case__meta page3d-item">
        <div>
          <p class="case__label">Role</p>
          <p>{{ project.role }}</p>
        </div>
        <div>
          <p class="case__label">Stack</p>
          <p>{{ project.stack.join(' · ') }}</p>
        </div>
        <div>
          <p class="case__label">Emotion</p>
          <p>{{ project.emotion }}</p>
        </div>
      </div>

      <div class="case__body page3d-item">
        <p v-for="(para, i) in project.body" :key="i">{{ para }}</p>
      </div>

      <div class="case__nav page3d-item">
        <a
          v-if="project.url"
          class="btn-3d case__btn"
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit live site ↗
        </a>
        <NuxtLink class="btn-3d case__btn case__btn--ghost" to="/work">All feelings</NuxtLink>
        <NuxtLink class="btn-3d case__btn" :to="`/work/${next.slug}`">
          Next: {{ next.title }}
        </NuxtLink>
      </div>
    </div>
  </PageShell>
</template>

<style scoped>
.case {
  display: grid;
  gap: 2rem;
  padding-bottom: 2rem;
}

.case__summary {
  margin-top: 1.1rem;
  max-width: 42ch;
  color: rgba(255, 255, 255, 0.68);
  font-weight: 300;
  font-size: 1.15rem;
  line-height: 1.55;
}

.case__stage {
  position: relative;
  aspect-ratio: 16 / 9;
  border: 1px solid rgba(255, 255, 255, 0.14);
  overflow: hidden;
  background:
    radial-gradient(ellipse at 30% 25%, rgba(255, 255, 255, 0.14), transparent 50%),
    linear-gradient(145deg, var(--accent), #000 75%);
  transform-style: preserve-3d;
}

.case__id {
  position: absolute;
  left: 1.25rem;
  bottom: 1rem;
  font-family: var(--font-display);
  font-size: clamp(4rem, 12vw, 8rem);
  line-height: 1;
  color: rgba(255, 255, 255, 0.18);
  transform: translateZ(40px);
}

.case__orb {
  position: absolute;
  width: 40%;
  aspect-ratio: 1;
  right: 12%;
  top: 18%;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.2), transparent 60%);
  transform: translateZ(50px);
  animation: float 6s ease-in-out infinite alternate;
}

.case__meta {
  display: grid;
  gap: 1.25rem;
  padding: 1.25rem 0;
  border-block: 1px solid rgba(255, 255, 255, 0.16);
}

.case__label {
  margin-bottom: 0.35rem;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
}

.case__meta p:last-child {
  color: rgba(255, 255, 255, 0.75);
  font-weight: 300;
}

.case__body {
  display: grid;
  gap: 1.15rem;
  max-width: 48ch;
}

.case__body p {
  color: rgba(255, 255, 255, 0.68);
  font-weight: 300;
  font-size: 1.12rem;
  line-height: 1.65;
}

.case__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 1rem;
}

.case__btn {
  display: inline-flex;
  align-items: center;
  min-height: 2.9rem;
  padding: 0.7rem 1.2rem;
  background: #fff;
  color: #000;
  font-size: 0.76rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.case__btn--ghost {
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.28);
}

@keyframes float {
  from { transform: translateZ(50px) translateY(0); }
  to { transform: translateZ(70px) translateY(-14px); }
}

@media (min-width: 800px) {
  .case__meta {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
