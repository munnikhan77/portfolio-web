/** Entrance animation for each route page */
export function usePage3D(root: Ref<HTMLElement | null>) {
  const { $gsap } = useNuxtApp()
  let ctx: ReturnType<NonNullable<typeof $gsap>['context']> | null = null

  onMounted(() => {
    nextTick(() => {
      if (!$gsap || !root.value) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        root.value.querySelectorAll('.page3d-item').forEach((el) => {
          ;(el as HTMLElement).style.opacity = '1'
          ;(el as HTMLElement).style.transform = 'none'
        })
        return
      }

      ctx = $gsap.context(() => {
        const items = root.value!.querySelectorAll('.page3d-item')
        $gsap.fromTo(
          items,
          {
            opacity: 0,
            y: 60,
            z: -140,
            rotateX: 16,
            transformPerspective: 1200,
          },
          {
            opacity: 1,
            y: 0,
            z: 0,
            rotateX: 0,
            duration: 1.05,
            stagger: 0.09,
            ease: 'power3.out',
            clearProps: 'transform',
          },
        )
      }, root.value)
    })
  })

  onUnmounted(() => ctx?.revert())
}
