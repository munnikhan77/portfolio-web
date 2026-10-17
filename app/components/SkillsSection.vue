<script setup lang="ts">
import { skills } from '~/data/portfolio'

const { onMove, onLeave } = useTilt(16)
</script>

<template>
  <section id="skills" class="section skills">
    <div class="container">
      <div class="skills__head reveal">
        <p class="section-label">Capabilities</p>
        <Title3D text="Tools of the cut" size="lg" />
        <p class="section-lead">
          A tight kit for building experiences that move in depth.
        </p>
      </div>

      <div class="skills__grid">
        <article
          v-for="(skill, i) in skills"
          :key="skill.group"
          class="skills__card tilt-3d reveal"
          :class="`reveal-delay-${i + 1}`"
          @mousemove="onMove"
          @mouseleave="onLeave"
        >
          <div class="skills__card-face">
            <h3 class="text-3d">{{ skill.group }}</h3>
            <ul>
              <li v-for="item in skill.items" :key="item">{{ item }}</li>
            </ul>
          </div>
          <div class="skills__card-edge" aria-hidden="true" />
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.82), rgba(0, 0, 0, 0.92));
  perspective: 1200px;
}

.skills__head {
  margin-bottom: clamp(2.5rem, 6vw, 4rem);
}

.skills__grid {
  display: grid;
  gap: 1.25rem;
  transform-style: preserve-3d;
}

.skills__card {
  position: relative;
  border: 1px solid var(--line);
  background: rgba(7, 7, 8, 0.55);
  backdrop-filter: blur(10px);
  transform-style: preserve-3d;
}

.skills__card-face {
  position: relative;
  z-index: 2;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  transform: translateZ(36px);
  background:
    radial-gradient(circle at var(--mx, 30%) var(--my, 20%), rgba(255, 255, 255, 0.16), transparent 42%);
}

.skills__card-edge {
  position: absolute;
  inset: 0;
  z-index: 1;
  transform: translateZ(-18px) scale(0.98);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.2), transparent 55%);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.skills__card h3 {
  margin-bottom: 1.25rem;
  font-size: clamp(2rem, 4vw, 2.8rem);
  text-transform: uppercase;
  color: var(--brass);
}

.skills__card ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.7rem;
}

.skills__card li {
  padding-bottom: 0.7rem;
  border-bottom: 1px solid var(--line);
  color: var(--bone-muted);
  font-weight: 300;
  transform: translateZ(8px);
  transition: transform 0.25s ease, color 0.25s ease;
}

.skills__card:hover li {
  color: var(--bone);
}

.skills__card li:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

@media (min-width: 800px) {
  .skills__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
