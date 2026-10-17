<script setup lang="ts">
const site = ref<HTMLElement | null>(null)
useDepthScroll(site)

const { observe } = useReveal()
onMounted(() => {
  nextTick(() => observe(document))
  const mo = new MutationObserver(() => observe(document))
  mo.observe(document.body, { childList: true, subtree: true })
  onUnmounted(() => mo.disconnect())
})
</script>

<template>
  <div ref="site" class="site">
    <AppNav />
    <main class="site__main">
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.site {
  position: relative;
  min-height: 100vh;
  background: #000;
  perspective: 1600px;
}

.site__main {
  position: relative;
  z-index: 1;
  min-height: 100svh;
  transform-style: preserve-3d;
}
</style>
