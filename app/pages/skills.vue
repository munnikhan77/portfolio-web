<script setup lang="ts">
import { pagesEmotion, skills } from '~/data/portfolio'

useHead({ title: 'Skills — Munni Khan' })

const { onMove, onLeave } = useTilt(16)
const emo = pagesEmotion.skills
</script>

<template>
  <PageShell eyebrow="Skills / How I care" mood="skills">
    <EmotionMark :feeling="emo.feeling" :whisper="emo.whisper" />

    <div class="skills-page">
      <div class="skills-page__intro page3d-item">
        <div class="skills-page__head">
          <Title3D text="Hands with intent" size="xl" />
          <p class="skills-page__lead">
            These aren’t badges. They’re the ways I try to protect a feeling all the way to the screen.
          </p>
        </div>
        <ClientOnly>
          <SkillCube />
        </ClientOnly>
      </div>

      <div class="skills-page__grid">
        <article
          v-for="skill in skills"
          :key="skill.group"
          class="skills-card tilt-3d page3d-item"
          @mousemove="onMove"
          @mouseleave="onLeave"
        >
          <div class="skills-card__face">
            <span class="skills-card__feeling">{{ skill.feeling }}</span>
            <h2 class="text-3d">{{ skill.group }}</h2>
            <p class="skills-card__line">{{ skill.line }}</p>
            <ul>
              <li v-for="item in skill.items" :key="item">{{ item }}</li>
            </ul>
          </div>
          <div class="skills-card__edge" aria-hidden="true" />
        </article>
      </div>

      <p class="skills-page__closer page3d-item">{{ emo.closer }}</p>

      <div class="skills-page__cta page3d-item">
        <NuxtLink class="btn-3d skills-page__btn" to="/contact">Bring me a feeling</NuxtLink>
      </div>
    </div>
  </PageShell>
</template>

<style scoped>
.skills-page {
  display: grid;
  gap: 2.75rem;
}

.skills-page__intro {
  display: grid;
  gap: 2rem;
  align-items: center;
}

.skills-page__lead {
  margin-top: 1.1rem;
  max-width: 40ch;
  color: rgba(255, 255, 255, 0.65);
  font-weight: 300;
  font-size: 1.15rem;
  line-height: 1.5;
}

@media (min-width: 900px) {
  .skills-page__intro {
    grid-template-columns: 1fr auto;
    gap: 3rem;
  }
}

.skills-page__grid {
  display: grid;
  gap: 1.25rem;
}

.skills-card {
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: #0a0a0a;
  transform-style: preserve-3d;
  min-height: 18rem;
}

.skills-card:nth-child(2) {
  background: #fff;
  color: #000;
}

.skills-card:nth-child(2) h2,
.skills-card:nth-child(2) .skills-card__feeling {
  color: #000;
}

.skills-card:nth-child(2) .skills-card__line,
.skills-card:nth-child(2) li {
  color: rgba(0, 0, 0, 0.65);
}

.skills-card:nth-child(2) li {
  border-bottom-color: rgba(0, 0, 0, 0.12);
}

.skills-card:nth-child(2) .skills-card__face {
  background: radial-gradient(circle at var(--mx, 30%) var(--my, 20%), rgba(0, 0, 0, 0.08), transparent 42%);
}

.skills-card:nth-child(2) .skills-card__edge {
  border-color: rgba(0, 0, 0, 0.12);
  background: linear-gradient(145deg, rgba(0, 0, 0, 0.06), transparent 55%);
}

.skills-card__face {
  position: relative;
  z-index: 2;
  padding: 1.75rem;
  transform: translateZ(36px);
  background: radial-gradient(circle at var(--mx, 30%) var(--my, 20%), rgba(255, 255, 255, 0.1), transparent 42%);
}

.skills-card__edge {
  position: absolute;
  inset: 0;
  transform: translateZ(-16px) scale(0.98);
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.08), transparent 55%);
}

.skills-card__feeling {
  display: inline-block;
  margin-bottom: 0.85rem;
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
}

.skills-card h2 {
  margin-bottom: 0.75rem;
  font-size: clamp(2rem, 4vw, 2.8rem);
  text-transform: uppercase;
  color: #fff;
}

.skills-card__line {
  margin: 0 0 1.25rem;
  font-style: italic;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.55);
  max-width: 24ch;
  line-height: 1.4;
}

.skills-card ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.7rem;
}

.skills-card li {
  padding-bottom: 0.65rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.6);
  font-weight: 300;
}

.skills-card li:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.skills-page__closer {
  max-width: 36ch;
  font-style: italic;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.1rem;
}

.skills-page__btn {
  display: inline-flex;
  align-items: center;
  min-height: 2.9rem;
  padding: 0.7rem 1.2rem;
  background: #fff;
  color: #000;
  font-size: 0.76rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

@media (min-width: 800px) {
  .skills-page__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
