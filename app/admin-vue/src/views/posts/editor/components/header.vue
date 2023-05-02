<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { postsForm, removePost, savePost } from '../store'
import themeSwitchVue from '@/layouts/header/theme-switch.vue'
import { router } from '@/router'
import { categoryRequest, tagsRequest } from '@/api'

const draweAactive = ref(false)
const cateQuery = useQuery({
  queryKey: ['category'],
  queryFn: categoryRequest,
})
const tagsQuery = useQuery({
  queryKey: ['tags'],
  queryFn: tagsRequest,
})
function back() {
  router.back()
}
</script>

<template>
  <header h-60px flex items-center justify-between p-8 color-coolgray dark:bg-dark>
    <div class="left flex gap-20">
      <div class="text-#000000 dark:bg-blue hover:color-#2599FB" i-carbon:close h-30 w-30 @click="back" />
      <input v-model="postsForm.title" v-auto-animate placeholder="请输入文章标题" class="title-input">
    </div>
    <div class="right flex items-center gap-30">
      <themeSwitchVue :size="5" />
      <Button type="primary" @click="savePost('publish')">
        发布
      </Button>
      <Dropdown mr-20 trigger="click">
        <div i-carbon:overflow-menu-horizontal cursor-pointer text-18 />
        <template #drop>
          <DropdownList>
            <DropdownItem name="显示" disabled>
              显示
            </DropdownItem>
            <DropdownItem name="设置" divided @select="draweAactive = true">
              设置
            </DropdownItem>
            <DropdownItem name="选项二" divided @select="savePost('draft')">
              保存为草稿
            </DropdownItem>
            <DropdownItem name="选项三" :disabled="!postsForm.id" @select="removePost(postsForm.id as string)">
              删除
            </DropdownItem>
          </DropdownList>
        </template>
      </Dropdown>
    </div>
  </header>
  <Drawer v-model:active="draweAactive" width="30%" transfer title="标题">
    <ConfigProvider :props="{ default: { clearable: true } }">
      <Form label-align="top" style="max-width: 450px;" :model="postsForm">
        <FormItem label="摘要" prop="summary">
          <Textarea v-model:value="postsForm.summary" />
        </FormItem>
        <FormItem label="是否推荐" prop="isRecommend">
          <Switch v-model:value="postsForm.isRecommend" />
        </FormItem>
        <FormItem label="选择分类" prop="category">
          <Select v-model:value="postsForm.category" :loading="cateQuery.isLoading.value" :key-config="{ label: 'name', value: 'id' }" :options="cateQuery.data.value?.data.list" />
        </FormItem>
        <FormItem label="选择标签" prop="tag">
          <Select v-model:value="postsForm.tag" :loading="tagsQuery.isLoading.value" option-check :key-config="{ label: 'name', value: 'id' }" multiple :options="tagsQuery.data.value?.data.list" />
        </FormItem>
        <FormItem label="文章封面" prop="coverUrl">
          <Input v-model:value="postsForm.coverUrl" placeholder="请输入图片url" />
        </FormItem>
      </Form>
    </ConfigProvider>
    <template #footer>
      <Button type="default" @click="() => { draweAactive = false }">
        取消
      </Button>
      <Button type="primary" @click="draweAactive = false">
        确认
      </Button>
    </template>
  </Drawer>
</template>

<style lang="scss" scoped>
.title-input {
  background-color: transparent;
  width: 280px;
  font-size: 14px;
  font-weight: 600;
  height: 30px;
  outline: none;
  border-radius: 0;
  border-bottom: 1px solid #D4D4D4;

  &:hover,
  :focus {
    border-bottom: 1px solid #2599FB;
  }
}
</style>
