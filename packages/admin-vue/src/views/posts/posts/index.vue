<script setup lang="ts">
import { defineColumns } from 'vexip-ui'
import { LocalDate } from '@/utils'
import { postsRequest } from '@/api'
import { postsParams } from '@/api/interface/posts'
const params = reactive<postsParams>({ title: '', page: 1, size: 10, status: '' })
const tableData = ref()
const getTableList = async (params: postsParams) => {
  const { data } = await postsRequest(params)
  tableData.value = data.list
}
const dateChange = (val: any) => {
  params.updateTimeStart = val[0]
  params.updateTimeEnd = val[1]
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
        return LocalDate(row.publishTime)
      },
    },
    {
      name: '创建时间',
      key: 'createTime',
      accessor: (row) => {
        return LocalDate(row.createTime)
      },
    },
  ]),
)
// const resetParams = () => {
//   params = { page: 1, size: 10, status: '' }
//   console.log(params)

//   getTableList(params)
// }
onMounted(() => {
  getTableList(params)
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
          <FormItem label="创建时间" prop="">
            <DatePicker clearable is-range type="datetime" no-action style="max-width: 380px;" @change="dateChange" />
          </FormItem>
          <FormItem>
            <FormSubmit action @submit="getTableList(params)">
              搜索
            </FormSubmit>
          <!-- <Button @click="resetParams">
              重置
            </Button> -->
          </FormItem>
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
