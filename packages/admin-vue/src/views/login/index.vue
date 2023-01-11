<script setup lang="ts">
import type { Form, Rule } from 'vexip-ui'
import { loginRequest } from '@/api/module/user'
import { useUserStore } from '@/store'
const userStore = useUserStore()
const formRef = ref<InstanceType<typeof Form>>()
const loginForm = ref({
  username: '',
  password: '',
})
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
  if (validated!.length <= 0)
    userStore.asyncLogin(loginForm.value)
}
</script>

<template>
  <div class="login w-100vw h-100vh flex-center">
    <Form ref="formRef" :rules="rules" mx-300px :model="loginForm" hide-label>
      <FormItem label="username" prop="username">
        <Input placeholder="请输入帐号">
          <template #prefix>
            <Icon>
              <div i-carbon:user />
            </Icon>
          </template>
        </Input>
      </FormItem>
      <FormItem label="password" prop="password">
        <Input type="password" placeholder="请输入密码">
          <template #prefix>
            <Icon>
              <div bg- i-carbon:locked />
            </Icon>
          </template>
        </Input>
      </FormItem>
      <FormItem action>
        <FormSubmit type="success" @submit="handleSubmit">
          <template #icon>
            <Icon>
              <div i-carbon:checkmark />
            </Icon>
          </template>
          登 陆
        </FormSubmit>
        <FormReset type="warning">
          重 置
        </FormReset>
      </FormItem>
    </Form>
  </div>
</template>

<style scoped>
.login {
  background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
}
</style>
