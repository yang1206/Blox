<script setup lang="ts">
const isRouterAlive = ref(true)
const reload = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}
provide('reload', reload)
</script>

<template>
  <router-view v-if="isRouterAlive" v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>
