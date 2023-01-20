<script setup lang="ts">
defineOptions({
  name: '404',
})
</script>

<template>
  <div class="flex-center dark:bg-dark  flex-col h-100vh">
    <img src="@/assets/img/404.webp" width="500">
    <div class="ml-12">
      <p
        v-motion
        class="font-medium text-40 mb-4 dark:text-white"
        :initial="{
          opacity: 0,
          y: 100,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 100,
          },
        }"
      >
        404
      </p>
      <p
        v-motion
        class="mb-4 text-20 text-gray-500"
        :initial="{
          opacity: 0,
          y: 100,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 300,
          },
        }"
      >
        抱歉，你访问的页面不存在
      </p>
      <Button
        v-motion
        type="primary"
        :initial="{
          opacity: 0,
          y: 100,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 500,
          },
        }"
        @click="$router.push('/')"
      >
        返回首页
      </Button>
    </div>
  </div>
</template>
