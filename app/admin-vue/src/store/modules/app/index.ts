import { defineStore } from 'pinia'
import { Loading } from 'vexip-ui'

export const useAppStore = defineStore('app', {
  state() {
    return {
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
  },
})
