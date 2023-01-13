import type { Router } from 'vue-router'

export function createPageLoadingGuard(router: Router) {
  router.beforeEach(() => {
    Loading.open(10)
  })

  router.afterEach(() => {
    setTimeout(() => {
      Loading.open(100)
    }, 200)
  })

  router.onError(() => {
    Loading.open({
      percent: 80,
      maxPercent: 100,
      state: 'error',
    })
  })
}
