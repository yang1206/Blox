<script setup lang="ts">
import { defineColumns } from 'vexip-ui'
import { useQuery } from '@tanstack/vue-query'
import { LocalDate } from '@/utils'
import { categoryRequest, postsRequest } from '@/api'
import type { postsParams } from '@/api/interface/posts'
const params = reactive<postsParams>({ title: '', page: 1, size: 10, status: '' })
// 存放表单数据
const tableData = ref()
const categoryData = ref()
// 使用vue-query请求数据
useQuery({
  queryKey: ['posts', params],
  queryFn: async () => {
    const data = await postsRequest(params)
    // 这里使用新的变量存放数据，因为筛选数据时会改变data，而vue-query返回的data是不可变的
    tableData.value = data.data.list
    return data
  },
})
const updateDateChange = (val: any) => {
  params.updateTimeStart = val[0]
  params.updateTimeEnd = val[1]
}
const publishDateChange = (val: any) => {
  params.publishTimeStart = val[0]
  params.publishTimeEnd = val[1]
}
const statusOptions = ref([
  {
    value: '',
    label: '全部',
  },
  {
    value: 'draft',
    label: '草稿',
  },
  {
    value: 'publish',
    label: '已发布',
  },
])
const columns = ref(
  defineColumns([
    {
      name: '标题',
      key: 'title',
    },
    {
      name: '状态',
      key: 'status',
      accessor: (row) => {
        if (row.status === 'draft')
          return '未发布'
        else return '已发布'
      },
    },
    {
      name: '分类',
      key: 'category',
    },
    {
      name: '标签',
      key: 'tags',
    },
    {
      name: '阅读量',
      key: 'views',
    },
    {
      name: '发布时间',
      key: 'publishTime',
      accessor: (row) => {
        if (row.publishTime)
          return LocalDate(row.publishTime)
        return '/'
      },
    },
    {
      name: '创建时间',
      key: 'createTime',
      accessor: (row) => {
        if (row.createTime)
          return LocalDate(row.createTime)
        return '/'
      },
    },
  ]),
)
onMounted(async () => {
  const data = await categoryRequest()
  categoryData.value = [...data.data.list]
})
</script>

<template>
  <Card>
    <Row>
      <Form :model="params" inline>
        <Space>
          <FormItem label="标题" prop="title">
            <Input v-model:value="params.title" width="200" clearable />
          </FormItem>
          <FormItem label="状态" prop="status">
            <Select v-model:value="params.status" style="width:120px" :options="statusOptions" />
          </FormItem>
          <FormItem label="分类" prop="category">
            <Select v-model:value="params.category" clearable :key-config="{ label: 'name', value: 'id' }" style="width:120px" :options="categoryData" />
          </FormItem>
          <!-- <FormItem label="创建时间" prop="">
            <DatePicker clearable is-range type="datetime" style="max-width: 380px;" @change="updateDateChange" />
          </FormItem> -->
          <FormItem label="发布时间" prop="">
            <DatePicker placeholder="发布时间" min="2022" clearable is-range style="max-width: 380px;" @change="publishDateChange" />
          </FormItem>
          <!-- <FormItem>
            <Button>重置</Button>
          </FormItem> -->
        </Space>
      </Form>
    </Row>
    <Row>
      <Table v-auto-animate :columns="columns" :data="tableData">
        <!-- <TableColumn name="标题" id-key="title" /> -->
      </Table>
    </Row>
  </Card>
</template>
