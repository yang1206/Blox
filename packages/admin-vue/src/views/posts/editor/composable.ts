import { cratePost, deletePost, getPostById, updatePost } from '@/api'
import { createPosts } from '@/api/interface/posts'
import { router } from '@/router'

export const postsForm = ref<Partial<createPosts>>({})

export const resetForm = () => {
  postsForm.value = {}
}

/**
 * 新增文章
 * @param data
 */
export const newPost = async (data: Partial<createPosts>) => {
  data.tag = JSON.stringify(data.tag) as any
  const { status } = await cratePost(data)
  if (status === 201) {
    Message.open({
      type: 'success',
      content: '保存成功',
    })
  }
  // router.back()
}

export const upPost = async (id: string, data: Partial<createPosts>) => {
  data.tag = JSON.stringify(data.tag) as any
  const { status } = await updatePost(id, data)
  if (status === 200)
    Message.success('保存成功')
  // router.back()
}

export const savePost = (status: 'draft' | 'publish') => {
  if (!postsForm.value.category)
    Message.error('请选择分类')
  else if (!postsForm.value.tag)
    Message.error('请选择标签')
  else if (!postsForm.value.title)
    Message.error('请填写标题')
  else
    postsForm.value.status = status
  if (postsForm.value.id)
    upPost(postsForm.value.id, postsForm.value)
  else
    newPost(postsForm.value)
}

export const publish = async (id: string, status: 'draft' | 'publish') => {
  if (window.confirm('确认要切换状态吗')) {
    const { status: code } = await updatePost(id, { status })
    if (code === 200)
      Message.success('切换成功')
  }
}

export const removePost = async (id: string) => {
  if (window.confirm('确认要删除吗')) {
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
export const getEchoData = async (id: string) => {
  const { data } = await getPostById(id)
  // Object.keys(postsForm.value).forEach((key) => {
  //   postsForm.value[key] = data[key]
  // })
  // postsForm.value = Object.assign(data, postsForm.value)
  postsForm.value.id = data.id
  postsForm.value.title = data.title
  postsForm.value.content = data.content
  postsForm.value.coverUrl = data.coverUrl
  postsForm.value.status = data.status
  postsForm.value.isRecommend = !!data.isRecommend
  postsForm.value.contentHtml = data.contentHtml
  postsForm.value.category = data.category.id
  postsForm.value.summary = data.summary
  postsForm.value.tag = data.tags.map(item => item.id)
}
