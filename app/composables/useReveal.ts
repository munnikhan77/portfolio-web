export function useReveal() {
  const observe = (root: ParentNode | null | undefined = document) => {
    if (!import.meta.client || !root) return

    const nodes = root.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)')
    if (!nodes.length) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )

    nodes.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }

  return { observe }
}
