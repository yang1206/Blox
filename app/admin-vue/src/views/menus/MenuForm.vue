<script setup lang="ts">
import { Form, Message } from 'vexip-ui'
import { MenuData, MenuDto, addMenu, editMenu } from '@/api'
import { isValidKey } from '@/utils'
const props = defineProps<{
  menuDatas?: MenuData[]
  menuData?: MenuData
  formtype: number
}>()
const emit = defineEmits(['close'])

const form = reactive<MenuDto>({
  name: '',
  icon: '',
  path: '',
  sort: 0,
  parent_id: 0,
  show: true,
  inlayout: true,
})
const formRef = ref<InstanceType<typeof Form>>()
const rules = {
  name: {
    required: true,
    message: '菜单名称不能为空',
  },
  icon: {
    required: true,
    message: '图标不能为空',
  },
  path: {
    required: true,
    message: '路由路径不能为空',
  },
  sort: {
    required: true,
    message: '排序值不能为空',
  },
  show: {
    required: true,
    message: '请选择是否展示',
  },
  inlayout: {
    require: true,
    message: '请选择是否在Layou布局中',
  },

}
const providedProps = {
  default: { clearable: true },
}
const reload = inject<() => void>('reload')
const handleSubmit = async () => {
  if (!props.menuData) {
    addMenu(form).then(() => {
      Message.success('新增成功')
    })
  }
  else {
    editMenu(props.menuData.id, form).then(() => {
      Message.success('编辑成功')
    })
  }
  emit('close')
  reload!()
}

onMounted(() => {
  if (props.menuData) {
    Object.keys(form).forEach((key) => {
      if (isValidKey(key, form))
        form[key] = props.menuData![key]
    })
  }
  if (props.formtype)
    formRef.value?.reset()
})
</script>

<template>
  <ConfigProvider :props="providedProps">
    <Form ref="formRef" :model="form" :rules="rules" max-w-500>
      <FormItem label="菜单名称" prop="name">
        <Input v-model:value="form.name" />
      </FormItem>
      <FormItem label="图标" prop="icon">
        <Input v-model:value="form.icon" />
      </FormItem>
      <FormItem label="路由" prop="path">
        <Input v-model:value="form.path" />
      </FormItem>
      <FormItem label="排序" prop="sort">
        <NumberInput v-model:value="form.sort" />
      </FormItem>
      <FormItem label="父级菜单" prop="parent_id">
        <Select v-model:value="form.parent_id" placeholder="最多支持二级，不选则代表父级菜单" :options="menuDatas" :key-config="{ label: 'name', value: 'id' }" />
      </FormItem>
      <FormItem label="是否展示" prop="show">
        <Switch v-model:value="form.show" />
      </FormItem>
      <FormItem label="是否在Layout中" prop="inlayout">
        <Switch v-model:value="form.inlayout" />
      </FormItem>
      <FormItem action>
        <FormReset />
        <FormSubmit @submit="handleSubmit" />
      </FormItem>
    </Form>
  </ConfigProvider>
</template>
