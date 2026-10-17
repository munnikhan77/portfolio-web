<script setup lang="ts">
const props = withDefaults(defineProps<{
  text: string
  outline?: boolean
  as?: 'h2' | 'h3' | 'p'
  size?: 'md' | 'lg' | 'xl'
}>(), {
  outline: false,
  as: 'h2',
  size: 'lg',
})

const pose = usePointer3D(props.size === 'xl' ? 20 : 14)
</script>

<template>
  <component
    :is="as"
    class="title3d"
    :class="[`title3d--${size}`, { 'title3d--outline': outline }]"
    :style="{
      transform: `perspective(900px) rotateX(${pose.rx}deg) rotateY(${pose.ry}deg) translateZ(${pose.tz}px)`,
    }"
  >
    <span class="title3d__text" :data-text="text">{{ text }}</span>
  </component>
</template>

<style scoped>
.title3d {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: 0.02em;
  line-height: 0.9;
  text-transform: uppercase;
  transform-style: preserve-3d;
  transform-origin: left center;
  will-change: transform;
}

.title3d--md { font-size: clamp(2rem, 4vw, 3rem); }
.title3d--lg { font-size: clamp(3.2rem, 8vw, 5.8rem); max-width: 12ch; }
.title3d--xl { font-size: clamp(3.8rem, 10vw, 7.5rem); max-width: 11ch; }

.title3d__text {
  position: relative;
  display: inline-block;
  color: #fff;
  transform-style: preserve-3d;
  text-shadow:
    0 1px 0 #d8d8d8,
    0 2px 0 #bdbdbd,
    0 3px 0 #a3a3a3,
    0 4px 0 #888,
    0 5px 0 #6e6e6e,
    0 7px 16px rgba(0, 0, 0, 0.55),
    0 16px 40px rgba(0, 0, 0, 0.4);
}

.title3d__text::before {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.25);
  transform: translateZ(10px);
  pointer-events: none;
}

.title3d--outline .title3d__text {
  color: transparent;
  -webkit-text-stroke: 1.6px rgba(255, 255, 255, 0.9);
  text-shadow:
    0 1px 0 rgba(255, 255, 255, 0.2),
    0 2px 0 rgba(255, 255, 255, 0.12),
    0 3px 0 rgba(255, 255, 255, 0.08),
    0 5px 0 rgba(255, 255, 255, 0.05),
    0 10px 28px rgba(0, 0, 0, 0.5);
}
</style>
