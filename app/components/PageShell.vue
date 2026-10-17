<script setup lang="ts">
const props = defineProps<{
  eyebrow?: string
  mood?: 'about' | 'work' | 'skills' | 'contact' | 'case'
}>()

const root = ref<HTMLElement | null>(null)
usePage3D(root)

const { observe } = useReveal()
onMounted(() => {
  nextTick(() => observe(root.value || document))
})
</script>

<template>
  <div ref="root" class="page-shell" :class="mood ? `page-mood--${mood}` : ''">
    <div class="page-shell__glow" aria-hidden="true" />
    <div class="page-shell__scan" aria-hidden="true" />
    <div class="page-shell__inner">
      <p v-if="eyebrow" class="page-shell__eyebrow page3d-item">{{ eyebrow }}</p>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.page-shell {
  position: relative;
  min-height: 100svh;
  padding: calc(var(--nav-h) + 2rem) 0 4rem;
  overflow: hidden;
  perspective: 1400px;
  background: #000;
}

.page-shell__glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse 55% 40% at 80% 10%, rgba(255, 255, 255, 0.08), transparent 55%),
    radial-gradient(ellipse 45% 35% at 10% 80%, rgba(255, 255, 255, 0.04), transparent 50%);
}

.page-shell__scan {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.35;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent 3px,
    rgba(255, 255, 255, 0.015) 3px,
    rgba(255, 255, 255, 0.015) 4px
  );
  mask-image: linear-gradient(180deg, #000, transparent 85%);
}

.page-shell__inner {
  position: relative;
  z-index: 1;
  width: var(--content);
  margin-inline: auto;
  transform-style: preserve-3d;
}

.page-shell__eyebrow {
  margin-bottom: 1rem;
  font-size: 0.72rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #fff;
}

.page-shell :deep(.page3d-item) {
  transform-style: preserve-3d;
}
</style>
