import { defineStore } from 'pinia'
import { Loading } from 'vexip-ui'

const isDark = useDark({ disableTransition: false })
export const useAppStore = defineStore('app', {
  state() {
    return {
      isDark,
      reloadFlag: <boolean> true,
    }
  },
  actions: {
    async reloadPage() {
      Loading.open(10)
      this.reloadFlag = false
      await nextTick()
      this.reloadFlag = true

      setTimeout(() => {
        document.documentElement.scrollTo({ left: 0, top: 0 })
        Loading.open(100)
      }, 100)
    },
    toggleDark(event: MouseEvent) {
      // @ts-expect-error experimental API
      const isAppearanceTransition = document.startViewTransition
        && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (!isAppearanceTransition) {
        this.isDark = !this.isDark
        return
      }

      const x = event.clientX
      const y = event.clientY
      const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y),
      )
      // @ts-expect-error: Transition API
      const transition = document.startViewTransition(async () => {
        this.isDark = !this.isDark
        await nextTick()
      })
      transition.ready
        .then(() => {
          const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ]
          document.documentElement.animate(
            {
              clipPath: this.isDark
                ? [...clipPath].reverse()
                : clipPath,
            },
            {
              duration: 400,
              easing: 'ease-out',
              pseudoElement: this.isDark
                ? '::view-transition-old(root)'
                : '::view-transition-new(root)',
            },
          )
        })
    },
  },
})
