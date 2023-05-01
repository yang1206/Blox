import { Confirm, Message } from 'vexip-ui'
import { cratePost, deletePost, getPostById, updatePost } from '@/api'
import { createPosts } from '@/api/interface/posts'
import { router } from '@/router'
import { isValidKey } from '@/utils'

export const postsForm = ref<Partial<createPosts>>({})

export function resetForm() {
  postsForm.value = {}
}

/**
 * 新增文章
 * @param data
 */
export async function newPost(data: Partial<createPosts>) {
  data.tag = JSON.stringify(data.tag) as any
  data.toc = JSON.stringify(data.toc) as any
  const { status } = await cratePost(data)
  if (status === 201) {
    Message.open({
      type: 'success',
      content: '保存成功',
    })
  }
  // router.back()
}

export async function upPost(id: string, data: Partial<createPosts>) {
  data.tag = JSON.stringify(data.tag) as any
  data.toc = JSON.stringify(data.toc) as any
  const { status } = await updatePost(id, data)
  if (status === 200)
    Message.success('保存成功')
  // router.back()
}

export function savePost(status: 'draft' | 'publish') {
  if (!postsForm.value.category) { Message.error('请选择分类') }
  else if (!postsForm.value.tag) { Message.error('请选择标签') }
  else if (!postsForm.value.title) { Message.error('请填写标题') }
  else {
    postsForm.value.status = status
    if (postsForm.value.id)
      upPost(postsForm.value.id, postsForm.value)
    else
      newPost(postsForm.value)
  }
}

export async function publish(id: string, status: 'draft' | 'publish') {
  if (await Confirm.open('确认要切换状态吗')) {
    const { status: code } = await updatePost(id, { status })
    if (code === 200)
      Message.success('切换成功')
  }
}

export async function removePost(id: string) {
  if (await Confirm.open('确认要删除吗')) {
    if (id) {
      const { status } = await deletePost(id)
      if (status === 200)
        Message.success('删除成功')
      router.back()
    }
  }

  else { Message.warning('取消删除') }
}

/**
 * 获取编辑回显数据
 * @param id
 */
export async function getEchoData(id: string) {
  const { data } = await getPostById(id)
  postsForm.value.isRecommend = !!data.isRecommend
  postsForm.value.category = data.category.id
  postsForm.value.tag = data.tags.map(item => item.id)
  Object.keys(postsForm.value).forEach((key) => {
    if (isValidKey(key, postsForm.value))
      (key !== 'tag' || key !== 'category' || key !== 'isRecommend') ?? (postsForm.value[key] = data[key])
  })
  postsForm.value = Object.assign(data, postsForm.value)
}
