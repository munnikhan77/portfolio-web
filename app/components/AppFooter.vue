<script setup lang="ts">
const year = new Date().getFullYear()
const { $lenis } = useNuxtApp()

const toTop = () => {
  if ($lenis) {
    $lenis.scrollTo(0, { duration: 1.4 })
    return
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <p class="footer__brand text-3d-soft">Munni Khan</p>
      <p class="footer__note">© {{ year }} — Crafted with cinematic intent.</p>
      <button type="button" class="footer__top" @click="toTop">Back to top</button>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  z-index: 1;
  border-top: 1px solid var(--line);
  padding: 1.5rem 0 2rem;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(10px);
}

.footer__inner {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.5rem;
  align-items: center;
  justify-content: space-between;
}

.footer__brand {
  font-family: var(--font-display);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.footer__note,
.footer__top {
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  color: var(--bone-muted);
}

.footer__top {
  text-transform: uppercase;
  transition: color 0.25s ease;
}

.footer__top:hover {
  color: var(--brass);
}
</style>
