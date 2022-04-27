import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "/Users/laksh/class/cs467/final-project-reftonull/frontend_nuxt/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}