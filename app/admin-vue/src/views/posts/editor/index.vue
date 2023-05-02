<script setup lang="ts">
import { Confirm } from 'vexip-ui'
import editorHeader from './components/header.vue'
import MdEditor from './components/Editor'
import { getEchoData, resetForm } from './store'
import { router } from '@/router'
// 拦截浏览器退出或刷新
// window.onbeforeunload = function () {
//   return '确认关闭？如果有内容变更，请先保存!'
// }
onBeforeRouteLeave(async (to, form, next) => {
  if (await Confirm.open('确认关闭？如果有内容变更，请先保存!')) {
    // 离开页面前清空数据
    resetForm()
    next()
  }
  else { router.forward() }
})
const route = useRoute()
if (route.query.id)
  getEchoData(route.query.id as string)

useHead({
  title: route.query.id ? '编辑文章' : '新增文章',
})
</script>

<template>
  <main id="editor" class="bg-#fff">
    <editorHeader />
    <MdEditor />
  </main>
</template>

<style lang="scss" scoped>
.md-editor {
  height: calc(100vh - 60px);
}
</style>
