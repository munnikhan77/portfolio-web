<script setup lang="ts">
import { pagesEmotion, profile } from '~/data/portfolio'

useHead({ title: 'Contact — Munni Khan' })

const emo = pagesEmotion.contact
const stage = ref<HTMLElement | null>(null)

const tilt = reactive({
  rx: 12,
  ry: -22,
  rz: 0,
})

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let disposed = false
  let raf = 0
  const target = { x: 0, y: 0 }
  const smooth = { x: 0, y: 0 }

  const onMove = (e: PointerEvent) => {
    const el = stage.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    target.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    target.y = ((e.clientY - rect.top) / rect.height) * 2 - 1
  }

  const onLeave = () => {
    target.x = 0
    target.y = 0
  }

  window.addEventListener('pointermove', onMove, { passive: true })
  stage.value?.addEventListener('pointerleave', onLeave)

  const tick = () => {
    if (disposed) return
    smooth.x += (target.x - smooth.x) * 0.07
    smooth.y += (target.y - smooth.y) * 0.07

    // Base pose like the reference card + mouse pull
    const baseRy = -22
    const baseRx = 12
    tilt.ry = reduced ? baseRy : baseRy + smooth.x * 18
    tilt.rx = reduced ? baseRx : baseRx + smooth.y * -12
    tilt.rz = reduced ? 0 : smooth.x * -3

    raf = requestAnimationFrame(tick)
  }
  tick()

  onUnmounted(() => {
    disposed = true
    cancelAnimationFrame(raf)
    window.removeEventListener('pointermove', onMove)
    stage.value?.removeEventListener('pointerleave', onLeave)
  })
})
</script>

<template>
  <PageShell eyebrow="Contact / An open door" mood="contact">
    <EmotionMark :feeling="emo.feeling" :whisper="emo.whisper" />

    <div ref="stage" class="contact-stage page3d-item">
      <div
        class="contact-card"
        :style="{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) rotateZ(${tilt.rz}deg)`,
        }"
      >
        <div class="contact-card__media">
          <img src="/holo-portrait.png" alt="" width="900" height="900" draggable="false">
          <div class="contact-card__media-fade" />
        </div>

        <div class="contact-card__body">
          <div class="contact-card__meta">
            <span class="contact-card__label">Now open</span>
            <span class="contact-card__feeling">{{ emo.feeling }}</span>
          </div>

          <h1 class="contact-card__title">{{ profile.name }}</h1>
          <p class="contact-card__role">{{ profile.role }} · {{ profile.location }}</p>

          <p class="contact-card__invite">
            Write like we’re already mid-conversation.
          </p>

          <a class="contact-card__mail" :href="`mailto:${profile.email}`">
            {{ profile.email }}
          </a>
          <a class="contact-card__mail" :href="`tel:+977${profile.phone}`">
            +977 {{ profile.phone }}
          </a>
          <p class="contact-card__role">{{ profile.experience }} experience · {{ profile.education }}</p>

          <div class="contact-card__bar" aria-hidden="true">
            <i /><i /><i />
          </div>

          <div class="contact-card__socials">
            <a
              v-for="social in profile.socials"
              :key="social.label"
              class="contact-card__social"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ social.label }}
            </a>
          </div>

          <p class="contact-card__closer">{{ emo.closer }}</p>
        </div>

        <div class="contact-card__shine" aria-hidden="true" />
      </div>

      <div class="contact-stage__shadow" aria-hidden="true" />
    </div>
  </PageShell>
</template>

<style scoped>
.contact-stage {
  position: relative;
  min-height: min(72vh, 720px);
  display: grid;
  place-items: center;
  perspective: 1400px;
  perspective-origin: 50% 40%;
  padding: 1rem 0 3rem;
}

.contact-card {
  position: relative;
  width: min(100%, 340px);
  border-radius: 28px;
  overflow: hidden;
  transform-style: preserve-3d;
  will-change: transform;
  background: rgba(28, 28, 30, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.55),
    0 2px 0 rgba(255, 255, 255, 0.06) inset;
  backdrop-filter: blur(22px) saturate(1.2);
  -webkit-backdrop-filter: blur(22px) saturate(1.2);
  z-index: 2;
}

.contact-card__media {
  position: relative;
  aspect-ratio: 1.05;
  overflow: hidden;
  background: #000;
}

.contact-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform: scale(1.04);
}

.contact-card__media-fade {
  position: absolute;
  inset: auto 0 0;
  height: 45%;
  background: linear-gradient(180deg, transparent, rgba(20, 20, 22, 0.95));
  pointer-events: none;
}

.contact-card__body {
  position: relative;
  z-index: 2;
  padding: 0.35rem 1.25rem 1.35rem;
  transform: translateZ(28px);
}

.contact-card__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.65rem;
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
}

.contact-card__feeling {
  color: rgba(255, 255, 255, 0.75);
}

.contact-card__title {
  margin: 0;
  font-family: var(--font-brand);
  font-size: 1.85rem;
  font-weight: 400;
  letter-spacing: -0.03em;
  color: #fff;
  line-height: 1.1;
}

.contact-card__role {
  margin: 0.35rem 0 1rem;
  font-size: 0.9rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.55);
}

.contact-card__invite {
  margin: 0 0 0.85rem;
  font-size: 0.92rem;
  font-style: italic;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.62);
  line-height: 1.4;
}

.contact-card__mail {
  display: block;
  margin-bottom: 1.1rem;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #fff;
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.35);
  padding-bottom: 0.15rem;
  width: fit-content;
  transition: border-color 0.25s ease, color 0.25s ease;
}

.contact-card__mail:hover {
  border-color: #fff;
}

.contact-card__bar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 1rem;
}

.contact-card__bar i {
  display: block;
  height: 3px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
}

.contact-card__bar i:nth-child(2) {
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.08);
}

.contact-card__bar i:first-child {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0.18));
}

.contact-card__socials {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.95rem;
}

.contact-card__social {
  display: inline-flex;
  align-items: center;
  min-height: 2.2rem;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background 0.25s ease, border-color 0.25s ease;
}

.contact-card__social:hover {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.35);
}

.contact-card__closer {
  margin: 0;
  font-size: 0.82rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.42);
  line-height: 1.45;
}

.contact-card__shine {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    125deg,
    rgba(255, 255, 255, 0.14) 0%,
    transparent 32%,
    transparent 68%,
    rgba(255, 255, 255, 0.05) 100%
  );
  mix-blend-mode: screen;
  z-index: 3;
}

.contact-stage__shadow {
  position: absolute;
  width: min(70%, 280px);
  height: 48px;
  bottom: 8%;
  left: 50%;
  translate: -50% 0;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(0, 0, 0, 0.65), transparent 70%);
  filter: blur(10px);
  z-index: 1;
  pointer-events: none;
}

@media (min-width: 700px) {
  .contact-card {
    width: min(100%, 380px);
  }
}

@media (max-width: 600px) {
  .contact-stage {
    min-height: auto;
    padding-bottom: 2rem;
  }

  .contact-card {
    width: min(100%, 320px);
  }
}
</style>
