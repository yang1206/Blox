<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { Confirm, Message } from 'vexip-ui'
import MenuForm from './MenuForm.vue'
import { menuRequest, menuRequestById } from '@/api'
import { LocalDate } from '@/utils'

const menusDatas = ref()
const { data } = useQuery({
  queryKey: ['menu'],
  queryFn: async () => {
    const data = await menuRequest()
    menusDatas.value = data.data
    return data
  },
})
const menu = ref()
const formtype = ref()
const active = ref(false)
function addMenu() {
  formtype.value = 1
  active.value = true
}
async function editMenu(id: number) {
  formtype.value = 0
  menu.value = (await menuRequestById(id)).data
  active.value = true
}
async function delMenu(id: number) {
  const isConfirm = await Confirm.open('确认删除吗？')
  if (isConfirm) {
    delMenu(id).then(() => {
      Message.success('删除成功')
    })
  }
}
</script>

<template>
  <Card>
    <Row justify="space-between">
      <Button style="margin-bottom: 10px" type="primary" @click="addMenu">
        新建
      </Button>
    </Row>
    <Row>
      <Table :data="menusDatas">
        <TableColumn name="id" id-key="id" fixed />
        <TableColumn name="名称" id-key="name" />
        <TableColumn name="图标" id-key="icon">
          <template #default="{ row }">
            <TheIcon :size="1.2" :icon="row.icon" />
          </template>
        </TableColumn>
        <TableColumn name="路由" id-key="path" />
        <TableColumn name="排序" id-key="sort" />
        <TableColumn name="是否展示" id-key="show" />
        <TableColumn name="是否在Layout中" id-key="inlayout" />
        <TableColumn name="创建时间" id-key="createTime">
          <template #default="{ row }">
            {{ LocalDate(row.createTime) }}
          </template>
        </TableColumn>
        <TableColumn name="操作" id-key="o">
          <template #default="{ row }">
            <Space :size="5">
              <Button text type="primary" @click="editMenu(row.id)">
                编辑
              </Button>
              <Button text type="error" @click="delMenu(row.id)">
                删除
              </Button>
            </Space>
          </template>
        </TableColumn>
      </Table>
    </Row>
    <Modal v-model:active="active" no-footer transfer :title="formtype ? '新增' : '编辑'" width="800">
      <div flex-center>
        <MenuForm v-if="active" :menu-datas="data?.data" :formtype="formtype" :menu-data="menu" @close="async () => { active = false; await nextTick() }" />
      </div>
    </Modal>
  </card>
</template>
