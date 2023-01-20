<script setup lang="ts">
import { active } from '../utils'
const route = useRoute()
const router = useRouter()

const breadcrumbList = ref()
const initBreadcrumbList = () => {
  breadcrumbList.value = route.matched.filter(item => !!item.meta?.title)
}
const handleRedirect = (path: string) => {
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
        <span v-if="index === breadcrumbList.length - 1" class="text-#97a8be h-20px lh-20px cursor-text flex gap-5">
          <TheIcon v-if="item.meta.icon" :icon="item.meta.icon" />
          {{ item.meta.title }}
        </span>
        <span v-else class="text-#666 font-600 h-20px lh-20px flex gap-5" @click="handleRedirect(item.redirect)">
          <TheIcon v-if="item.meta.icon" :icon="item.meta.icon" />
          {{ item.meta.title }}</span>
      </BreadcrumbItem>
    </template>
  </Breadcrumb>
</template>
