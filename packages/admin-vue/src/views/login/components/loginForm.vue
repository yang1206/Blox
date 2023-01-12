<script lang="ts" setup>
import type { Form, Rule } from 'vexip-ui'
import Motion from '../utils/motion'
import { useUserStore } from '@/store'
import { getLocal, removeLocal, setLocal } from '@/utils'
import type { LoginForm } from '@/api/interface/user'
const userStore = useUserStore()
const formRef = ref<InstanceType<typeof Form>>()
const isRemember = useStorage('isRemember', false)
const loginForm = reactive<LoginForm>({
  username: '',
  password: '',
})
const localLoginInfo = getLocal('loginInfo') as LoginForm
if (localLoginInfo) {
  loginForm.username = localLoginInfo.username || ''
  loginForm.password = localLoginInfo.password || ''
}
const rules: { [key: string]: Rule } = {
  username: {
    required: true,
    message: '请输入账号',
  },
  password: {
    required: true,
    message: '请输入密码',
  },

}
const handleSubmit = async () => {
  const validated = await formRef.value?.validate()
  if (validated!.length <= 0) {
    if (isRemember)
      setLocal('loginInfo', loginForm)
  }
  if (isRemember.value)
    setLocal('loginInfo', loginForm)
  else removeLocal('loginInfo')
  userStore.asyncLogin(loginForm)
}
</script>

<template>
  <Form ref="formRef" :rules="rules" flex-1 :model="loginForm" hide-label>
    <Motion min-w-260 :delay="100">
      <FormItem label="username" prop="username">
        <Input clearable size="large" placeholder="请输入帐号">
          <template #prefix>
            <Icon>
              <div i-carbon:user />
            </Icon>
          </template>
        </Input>
      </FormItem>
    </Motion>
    <Motion min-w-260 :delay="150">
      <FormItem label="password" prop="password">
        <Input type="password" size="large" clearable plain-password placeholder="请输入密码">
          <template #prefix>
            <Icon>
              <div bg- i-carbon:locked />
            </Icon>
          </template>
        </Input>
      </FormItem>
    </Motion>
    <Motion min-w-260 :delay="180">
      <FormItem>
        <Checkbox v-model:checked="isRemember">
          记住密码
        </Checkbox>
      </FormItem>
    </Motion>
    <Motion min-w-260 :delay="200">
      <FormItem>
        <FormSubmit size="default" class="flex-1" type="success" @submit="handleSubmit">
          <template #icon>
            <Icon>
              <div i-carbon:checkmark />
            </Icon>
          </template>
          登 陆
        </FormSubmit>
        <FormReset class="flex-1" type="warning">
          重 置
        </FormReset>
      </FormItem>
    </Motion>
  </Form>
</template>
