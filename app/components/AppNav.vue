<script setup lang="ts">
const links = [
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/contact', label: 'Contact' },
]

const route = useRoute()
const scrolled = ref(false)
const open = ref(false)

onMounted(() => {
  const onScroll = () => {
    scrolled.value = window.scrollY > 40
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})

watch(() => route.fullPath, () => {
  open.value = false
})

const isActive = (to: string) => route.path === to || route.path.startsWith(`${to}/`)
</script>

<template>
  <header class="nav" :class="{ 'is-scrolled': scrolled, 'is-open': open }">
    <div class="nav__inner">
      <NuxtLink class="nav__brand" to="/">
        <span class="nav__mark">MK</span>
        <span class="nav__name">Munni Khan</span>
      </NuxtLink>

      <nav class="nav__links" aria-label="Primary">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          :class="{ 'is-active': isActive(link.to) }"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <NuxtLink class="nav__cta" to="/contact">
        Let’s talk
      </NuxtLink>

      <button
        class="nav__burger"
        type="button"
        :aria-expanded="open"
        aria-label="Toggle menu"
        @click="open = !open"
      >
        <span />
        <span />
      </button>
    </div>

    <div class="nav__drawer" :class="{ 'is-open': open }">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="text-3d-soft"
      >
        {{ link.label }}
      </NuxtLink>
      <NuxtLink to="/contact" class="text-3d-soft">Let’s talk</NuxtLink>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto;
  z-index: 100;
  padding: 1rem 0;
  transition: background 0.4s var(--ease-cinema), backdrop-filter 0.4s var(--ease-cinema);
}

.nav.is-scrolled,
.nav.is-open {
  background: rgba(7, 7, 8, 0.55);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--line);
}

.nav__inner {
  width: var(--content);
  margin-inline: auto;
  min-height: 3rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  z-index: 2;
  transform-style: preserve-3d;
  transition: transform 0.3s var(--ease-out);
}

.nav__brand:hover {
  transform: translateY(-1px);
}

.nav__mark {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid var(--brass);
  color: var(--brass);
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.35),
    0 3px 0 rgba(0, 0, 0, 0.35),
    0 8px 18px rgba(0, 0, 0, 0.35);
}

.nav__name {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-shadow:
    0 1px 0 rgba(255, 255, 255, 0.3),
    0 2px 0 rgba(255, 255, 255, 0.15),
    0 6px 14px rgba(0, 0, 0, 0.35);
}

.nav__links {
  margin-left: auto;
  display: none;
  gap: 1.75rem;
}

.nav__links a {
  font-size: 0.82rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--bone-muted);
  transition: color 0.25s ease;
}

.nav__links a:hover,
.nav__links a.is-active {
  color: var(--bone);
}

.nav__links a.is-active {
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.35);
}

.nav__cta {
  display: none;
  padding: 0.65rem 1.1rem;
  border: 1px solid var(--brass);
  color: var(--brass);
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.3),
    0 3px 0 rgba(0, 0, 0, 0.3);
}

.nav__cta:hover {
  background: var(--brass);
  color: var(--ink);
  transform: translateY(-2px);
}

.nav__burger {
  margin-left: auto;
  width: 2.5rem;
  height: 2.5rem;
  display: grid;
  place-content: center;
  gap: 0.4rem;
  z-index: 2;
}

.nav__burger span {
  display: block;
  width: 1.35rem;
  height: 1.5px;
  background: var(--bone);
  transition: transform 0.35s var(--ease-cinema);
}

.nav.is-open .nav__burger span:first-child {
  transform: translateY(2.75px) rotate(40deg);
}

.nav.is-open .nav__burger span:last-child {
  transform: translateY(-2.75px) rotate(-40deg);
}

.nav__drawer {
  position: fixed;
  inset: 0;
  padding: 6.5rem 1.5rem 2rem;
  display: grid;
  align-content: start;
  gap: 1.25rem;
  background:
    radial-gradient(ellipse at 20% 0%, rgba(255, 255, 255, 0.16), transparent 45%),
    var(--ink);
  opacity: 0;
  pointer-events: none;
  transform: translateY(-1rem) rotateX(8deg);
  transform-origin: top;
  transition: opacity 0.35s var(--ease-cinema), transform 0.35s var(--ease-cinema);
}

.nav__drawer.is-open {
  opacity: 1;
  pointer-events: auto;
  transform: none;
}

.nav__drawer a {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 12vw, 4rem);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-bottom: 1px solid var(--line);
  padding-bottom: 0.5rem;
}

@media (min-width: 900px) {
  .nav__links,
  .nav__cta {
    display: inline-flex;
  }

  .nav__burger,
  .nav__drawer {
    display: none;
  }
}
</style>
