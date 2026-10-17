<script setup lang="ts">
import { profile } from '~/data/portfolio'

const { onMove, onLeave } = useTilt(12)
const pose = usePointer3D(16)
</script>

<template>
  <section id="contact" class="section contact">
    <div class="container contact__wrap">
      <div class="contact__copy reveal">
        <p class="section-label">Contact</p>
        <h2
          class="contact__title"
          :style="{
            transform: `perspective(900px) rotateX(${pose.rx}deg) rotateY(${pose.ry}deg) translateZ(${pose.tz}px)`,
          }"
        >
          <span class="contact__title-line text-3d" data-text="Let’s make">Let’s make</span>
          <span class="contact__title-line contact__title-line--outline" data-text="the next scene">the next scene</span>
        </h2>
        <p class="section-lead">
          Have a brand, product, or wild idea? Reach out by email or phone.
        </p>
      </div>

      <div
        class="contact__actions tilt-3d reveal reveal-delay-2"
        @mousemove="onMove"
        @mouseleave="onLeave"
      >
        <a class="contact__mail text-3d-soft" :href="`mailto:${profile.email}`">
          {{ profile.email }}
        </a>
        <a class="contact__mail text-3d-soft" :href="`tel:+977${profile.phone}`">
          +977 {{ profile.phone }}
        </a>

        <div class="contact__socials">
          <a
            v-for="social in profile.socials"
            :key="social.label"
            class="btn-3d contact__social"
            :href="social.href"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ social.label }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  min-height: 80vh;
  display: grid;
  align-items: center;
  perspective: 1200px;
  background:
    radial-gradient(ellipse at 70% 20%, rgba(255, 255, 255, 0.1), transparent 40%),
    radial-gradient(ellipse at 20% 90%, rgba(168, 90, 58, 0.1), transparent 45%),
    rgba(0, 0, 0, 0.88);
}

.contact__wrap {
  display: grid;
  gap: 3rem;
  transform-style: preserve-3d;
}

.contact__title {
  margin: 0 0 1.25rem;
  font-size: clamp(3.4rem, 10vw, 7.2rem);
  text-transform: uppercase;
  max-width: 11ch;
  transform-style: preserve-3d;
  transform-origin: left center;
  will-change: transform;
}

.contact__title-line {
  position: relative;
  display: block;
  line-height: 0.92;
}

.contact__title-line--outline {
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.85);
  text-shadow:
    0 1px 0 rgba(255, 255, 255, 0.3),
    0 2px 0 rgba(255, 255, 255, 0.2),
    0 4px 0 rgba(255, 255, 255, 0.12),
    0 12px 30px rgba(0, 0, 0, 0.45);
}

.contact__actions {
  padding: 1.5rem;
  border: 1px solid var(--line);
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  transform-style: preserve-3d;
}

.contact__mail {
  display: inline-block;
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 4vw, 2.6rem);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border-bottom: 1px solid var(--brass);
  color: var(--brass);
  padding-bottom: 0.2rem;
  transform: translateZ(24px);
  transition: color 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
}

.contact__mail:hover {
  color: var(--brass-hot);
  border-color: var(--brass-hot);
  transform: translateZ(36px) translateY(-2px);
}

.contact__socials {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 1.75rem;
  transform: translateZ(18px);
}

.contact__social {
  display: inline-flex;
  padding: 0.65rem 1rem;
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--bone);
  border: 1px solid var(--line);
  background: rgba(0, 0, 0, 0.35);
}

.contact__social:hover {
  border-color: var(--brass);
  color: var(--brass);
}

@media (min-width: 900px) {
  .contact__wrap {
    grid-template-columns: 1.3fr 1fr;
    align-items: end;
  }
}
</style>
