import { ComputedRef, Ref } from 'vue'
export type LayoutKey = string
declare module "/Users/laksh/class/cs467/final-project-reftonull/frontend_nuxt/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}