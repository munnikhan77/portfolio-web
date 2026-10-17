export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  const { $lenis } = nuxtApp

  router.afterEach(() => {
    nextTick(() => {
      if ($lenis) {
        $lenis.scrollTo(0, { immediate: true })
        return
      }
      window.scrollTo(0, 0)
    })
  })
})
