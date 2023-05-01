<script setup lang="ts">
import { active } from '../utils'
import { contextmenu } from './contextmenu'
import { useTabStore } from '@/store'

const route = useRoute()
const router = useRouter()
const tabStore = useTabStore()
function handleTagClick(path: string) {
  tabStore.setActiveTab(path)
  router.push(path)
  active.value = path
}
// 鼠标中键也可以关闭标签
function mousedownEvent(event: MouseEvent, path: string) {
  if (event.button === 1 && tabStore.tabs.length > 1)
    tabStore.removeTab(path)
}
watch(
  () => route.path,
  () => {
    const { name, fullPath: path } = route
    const title = route.meta?.title as string || ''
    tabStore.addTab({ name: name as string, path, title })
  },
  { immediate: true },
)
</script>

<template>
  <div class="tabs" h-full w-full bg-white dark:bg-dark>
    <ScrollX v-auto-animate h-full>
      <Tag
        v-for="tab in tabStore.tabs"
        :key="tab.path"
        v-auto-animate
        :closable="tabStore.tabs.length > 1"
        size="default"
        :type="tabStore.activeTab === tab.path ? 'primary' : 'default'"
        class="z-100 m-10px cursor-pointer"
        @contextmenu.prevent="contextmenu($event, tab.path)"
        @close="tabStore.removeTab(tab.path)"
        @click="handleTagClick(tab.path)"
        @mousedown.stop="mousedownEvent($event, tab.path)"
      >
        {{ tab.title }}
      </Tag>
    </ScrollX>
  </div>
</template>

<style lang="scss" scoped>
.tabs .dark .dark\:bg-dark,
.dark [dark\:bg-dark=""] {
  background-color: #181a1b !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
</style>
