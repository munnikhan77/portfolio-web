<script setup lang="ts">
import { pagesEmotion, profile, timeline } from '~/data/portfolio'

useHead({ title: 'About — Munni Khan' })

const { onMove, onLeave } = useTilt(12)
const emo = pagesEmotion.about
</script>

<template>
  <PageShell eyebrow="About / A quiet introduction" mood="about">
    <EmotionMark :feeling="emo.feeling" :whisper="emo.whisper" />

    <div class="about-page">
      <div class="about-page__hero page3d-item">
        <Title3D text="I build for the feeling" size="xl" />
        <p class="about-page__lead">{{ profile.about[0] }}</p>
      </div>

      <blockquote
        class="about-page__belief tilt-3d page3d-item"
        @mousemove="onMove"
        @mouseleave="onLeave"
      >
        <p>“{{ profile.belief }}”</p>
      </blockquote>

      <p class="about-page__statement page3d-item">
        {{ profile.about[1] }}
      </p>

      <div class="about-page__life page3d-item">
        <h3>How I got here</h3>
        <ul>
          <li
            v-for="(item, i) in timeline"
            :key="item.year"
            class="tilt-3d"
            @mousemove="onMove"
            @mouseleave="onLeave"
          >
            <span>{{ item.year }}</span>
            <p>{{ item.text }}</p>
          </li>
        </ul>
      </div>

      <p class="about-page__closer page3d-item">{{ emo.closer }}</p>

      <div class="about-page__cta page3d-item">
        <NuxtLink class="btn-3d about-page__btn" to="/work">Feel the work</NuxtLink>
        <NuxtLink class="btn-3d about-page__btn about-page__btn--ghost" to="/contact">Say hello</NuxtLink>
      </div>
    </div>
  </PageShell>
</template>

<style scoped>
.about-page {
  display: grid;
  gap: 2.75rem;
  padding-bottom: 2rem;
}

.about-page__lead {
  margin-top: 1.25rem;
  max-width: 40ch;
  color: rgba(255, 255, 255, 0.68);
  font-weight: 300;
  font-size: 1.2rem;
  line-height: 1.55;
}

.about-page__belief {
  max-width: 22rem;
  padding: 1.75rem 1.5rem;
  border-left: 2px solid #fff;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.06), transparent 80%);
}

.about-page__belief p {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3.5vw, 2.2rem);
  line-height: 1.15;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.about-page__statement {
  max-width: 42ch;
  font-size: 1.15rem;
  font-weight: 300;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.72);
}

.about-page__life h3 {
  margin-bottom: 1.25rem;
  font-size: 0.72rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
  font-family: var(--font-body);
  font-weight: 500;
}

.about-page__life ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.85rem;
  max-width: 40rem;
}

.about-page__life li {
  display: grid;
  grid-template-columns: 5.5rem 1fr;
  gap: 1rem;
  padding: 1.15rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
}

.about-page__life span {
  color: #fff;
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.about-page__life p {
  color: rgba(255, 255, 255, 0.62);
  font-weight: 300;
}

.about-page__closer {
  max-width: 34ch;
  font-style: italic;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.55);
  font-size: 1.1rem;
}

.about-page__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
}

.about-page__btn {
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

.about-page__btn--ghost {
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.28);
}
</style>
