export function useDepthScroll(root: Ref<HTMLElement | null>) {
  const { $gsap } = useNuxtApp()
  let ctx: ReturnType<NonNullable<typeof $gsap>['context']> | null = null

  onMounted(() => {
    if (!$gsap || !root.value) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    ctx = $gsap.context(() => {
      $gsap.utils.toArray<HTMLElement>('[data-depth]:not(.reveal)').forEach((el) => {
        const depth = Number(el.dataset.depth || 1)
        $gsap.fromTo(
          el,
          {
            rotateX: 18 * depth,
            y: 80 * depth,
            z: -120 * depth,
            opacity: 0,
            transformPerspective: 1200,
          },
          {
            rotateX: 0,
            y: 0,
            z: 0,
            opacity: 1,
            duration: 1.25,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })

      $gsap.utils.toArray<HTMLElement>('[data-float]').forEach((el) => {
        $gsap.to(el, {
          y: Number(el.dataset.float || -40),
          rotateZ: Number(el.dataset.spin || 0),
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }, root.value)
  })

  onUnmounted(() => ctx?.revert())
}
