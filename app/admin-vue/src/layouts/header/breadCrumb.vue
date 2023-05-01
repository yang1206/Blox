<script setup lang="ts">
import { active } from '../utils'

const route = useRoute()
const router = useRouter()

const breadcrumbList = ref()
function initBreadcrumbList() {
  breadcrumbList.value = route.matched.filter(item => !!item.meta?.title)
}
function handleRedirect(path: string) {
  router.push(path)
  active.value = path
}
watch(
  route,
  () => {
    initBreadcrumbList()
  },
  { deep: true, immediate: true },
)
</script>

<template>
  <Breadcrumb>
    <template v-for="(item, index) in breadcrumbList" :key="index">
      <BreadcrumbItem>
        <span v-if="index === breadcrumbList.length - 1" class="h-20px flex cursor-text gap-5 lh-20px text-#97a8be">
          <TheIcon v-if="item.meta.icon" :icon="item.meta.icon" />
          {{ item.meta.title }}
        </span>
        <span v-else class="h-20px flex gap-5 font-600 lh-20px text-#666" @click="handleRedirect(item.redirect)">
          <TheIcon v-if="item.meta.icon" :icon="item.meta.icon" />
          {{ item.meta.title }}</span>
      </BreadcrumbItem>
    </template>
  </Breadcrumb>
</template>
