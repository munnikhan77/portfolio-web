export function useTilt(strength = 14) {
  const onMove = (e: MouseEvent) => {
    const el = e.currentTarget as HTMLElement
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rx = (0.5 - y) * strength
    const ry = (x - 0.5) * strength
    el.style.setProperty('--rx', `${rx}deg`)
    el.style.setProperty('--ry', `${ry}deg`)
    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
    el.style.setProperty('--tz', `${18 + Math.abs(x - 0.5) * 24}px`)
  }

  const onLeave = (e: MouseEvent) => {
    const el = e.currentTarget as HTMLElement
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--tz', '0px')
  }

  return { onMove, onLeave }
}

/** Spring-based 3D tracking for titles / blocks */
export function usePointer3D(strength = 18) {
  const pose = reactive({ rx: 0, ry: 0, tz: 0 })

  onMounted(() => {
    const target = { x: 0, y: 0 }
    const smooth = { x: 0, y: 0, vx: 0, vy: 0 }
    let raf = 0

    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    const tick = () => {
      const ax = (target.x - smooth.x) * 0.07
      const ay = (target.y - smooth.y) * 0.07
      smooth.vx = (smooth.vx + ax) * 0.87
      smooth.vy = (smooth.vy + ay) * 0.87
      smooth.x += smooth.vx
      smooth.y += smooth.vy
      pose.ry = smooth.x * strength
      pose.rx = smooth.y * -(strength * 0.65)
      pose.tz = 20 + Math.abs(smooth.x) * 36
      raf = requestAnimationFrame(tick)
    }
    tick()

    onUnmounted(() => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
    })
  })

  return pose
}
