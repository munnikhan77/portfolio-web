<script setup lang="ts">
defineProps<{
  feeling: string
  whisper: string
}>()

const pose = usePointer3D(10)
</script>

<template>
  <div class="emotion">
    <p
      class="emotion__ghost"
      aria-hidden="true"
      :style="{
        transform: `translate3d(${pose.ry * 1.2}px, ${pose.rx * -1.1}px, 0) rotateZ(${pose.ry * 0.08}deg)`,
      }"
    >
      {{ feeling }}
    </p>
    <div class="emotion__fore page3d-item">
      <span class="emotion__label">Feeling</span>
      <h2 class="emotion__word text-3d-soft">{{ feeling }}</h2>
      <p class="emotion__whisper">{{ whisper }}</p>
    </div>
  </div>
</template>

<style scoped>
.emotion {
  position: relative;
  min-height: clamp(8rem, 22vh, 12rem);
  margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
  overflow: hidden;
}

.emotion__ghost {
  position: absolute;
  left: -2%;
  top: 50%;
  translate: 0 -50%;
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(5rem, 18vw, 11rem);
  line-height: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
  will-change: transform;
}

.emotion__fore {
  position: relative;
  z-index: 1;
  max-width: 28rem;
  padding-top: 1.5rem;
}

.emotion__label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.68rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
}

.emotion__word {
  margin: 0 0 0.75rem;
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 6vw, 3.8rem);
  text-transform: uppercase;
  line-height: 0.95;
}

.emotion__whisper {
  margin: 0;
  max-width: 28ch;
  color: rgba(255, 255, 255, 0.62);
  font-weight: 300;
  font-size: 1.15rem;
  line-height: 1.45;
  font-style: italic;
}
</style>
