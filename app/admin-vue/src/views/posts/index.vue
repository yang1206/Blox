<script setup lang="ts">
import { TagType, defineColumns } from 'vexip-ui'
import { useQuery } from '@tanstack/vue-query'
import { removePost } from './editor/composable'
import { LocalDate, getRandomColor } from '@/utils'
import { categoryRequest, postsRequest } from '@/api'
import type { postsParams } from '@/api/interface/posts'
const params = reactive<postsParams>({ title: '', page: 1, size: 10, status: '' })
// 存放表单数据
const tableData = ref()
const total = ref()
// 使用vue-query请求数据
const { isLoading } = useQuery({
  queryKey: ['posts', params],
  queryFn: async () => {
    const data = await postsRequest(params)
    // 这里使用新的变量存放数据，因为筛选数据时会改变data，而vue-query返回的data是不可变的
    tableData.value = data.data.list
    total.value = data.data.total
    return data
  },
})
const cateQuery = useQuery({
  queryKey: ['category'],
  queryFn: categoryRequest,
})
// const updateDateChange = (val: any) => {
//   params.updateTimeStart = val[0]
//   params.updateTimeEnd = val[1]
// }

// 站位用，datepicker暂时有bug必须关联value才能让clearable出现
const date = ref()
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
      order: 0,
    },
    {
      name: '阅读量',
      key: 'views',
      order: 5,
      sorter: true,
    },
    {
      name: '发布时间',
      key: 'publishTime',
      accessor: (row) => {
        if (row.publishTime)
          return LocalDate(row.publishTime)
        return '/'
      },
      order: 6,
      sorter: true,
    },
    {
      name: '创建时间',
      key: 'createTime',
      accessor: (row) => {
        if (row.createTime)
          return LocalDate(row.createTime)
        return '/'
      },
      order: 6,
      sorter: true,
    },
  ]),
)
</script>

<template>
  <Card>
    <Row justify="space-between">
      <Column>
        <Form :model="params" inline>
          <Space justify="space-between">
            <FormItem label="标题" prop="title">
              <Input v-model:value="params.title" width="200" clearable />
            </FormItem>
            <FormItem label="状态" prop="status">
              <Select v-model:value="params.status" style="min-width:120px" :options="statusOptions" />
            </FormItem>
            <FormItem label="分类" prop="category">
              <Select
                v-model:value="params.category" clearable :key-config="{ label: 'name', value: 'id' }"
                style="min-width:120px" :options="cateQuery.data.value?.data.list"
              />
            </FormItem>
            <!-- <FormItem label="创建时间" prop="">
                  <DatePicker clearable is-range type="datetime" style="max-width: 380px;" @change="updateDateChange" />
                </FormItem> -->
            <FormItem label="发布时间">
              <DatePicker
                v-model:value="date" min="2022" clearable no-action range style="min-width: 200px;"
                @change="publishDateChange"
              />
            </FormItem>

            <Space justify="end">
              <FormItem>
                <Button v-auto-animate type="primary" @click="$router.push('/posts/editor')">
                  新建
                </Button>
              </FormItem>
            </Space>
          </Space>
        </Form>
      </Column>
    </Row>
    <Row>
      <Column>
        <Table v-auto-animate v-loading="isLoading" use-y-bar highlight :current-page="params.page" :page-size="params.size" :columns="columns" :data="tableData">
          <TableColumn :order="2" id-key="status" name="状态">
            <template #default="{ row }">
              <Badge is-dot :type="row.status === 'draft' ? 'warning' : 'primary'" />
              {{ row.status === 'draft' ? '草稿' : '已发布' }}
            </template>
          </TableColumn>
          <TableColumn :order="3" id-key="catgory" name="分类">
            <template #default="{ row }">
              <Tag size="small" simple :color="getRandomColor(row.category)">
                {{ row.category }}
              </Tag>
            </template>
          </TableColumn>
          <TableColumn :order="4" :width="300" id-key="tags" name="标签">
            <template #default="{ row }">
              <Tag v-for="(item, index) in row.tags" :key="index" size="small" :type="getRandomColor(item) as TagType">
                {{ item }}
              </Tag>
            </template>
          </TableColumn>
          <TableColumn fixed="right" :width="200" :id-key="8" :order="7" name="操作">
            <template #default="{ row }">
              <Space :size="5">
                <Button
                  text type="primary" @click.stop="$router.push({
                    path: '/posts/editor',
                    query: {
                      id: row.id,
                    },
                  })"
                >
                  编辑
                </Button>
                <!-- <Button text type="warning" @click.stop="publish(row.id, row.status === 'draft' ? 'publish' : 'draft')">
                  {{ row.status === 'draft' ? '发布' : '下线' }}
                </Button> -->
                <Button text type="error" @click.stop="removePost(row.id)">
                  删除
                </Button>
              </Space>
            </template>
          </TableColumn>
        </Table>
      </Column>
    </Row>
    <Row mt-20 justify="center">
      <Pagination
        v-model:active="params.page" v-model:page-size="params.size" size="small" background
        :plugins="['total', 'size', 'jump']" :total="total"
      />
    </Row>
  </Card>
</template>
