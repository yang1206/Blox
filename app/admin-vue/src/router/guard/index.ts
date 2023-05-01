import type { Router } from 'vue-router'
import { createPageLoadingGuard } from './loading'
import { createPageTitleGuard } from './title'
import { createPermissionGuard } from './permission'

export function setupRouterGuard(router: Router) {
  createPageLoadingGuard(router)
  createPageTitleGuard(router)
  createPermissionGuard(router)
}
