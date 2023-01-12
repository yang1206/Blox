<script lang="ts" setup>
import type { Form, Rule } from 'vexip-ui'
import Motion from '../utils/motion'
import type { RegisterForm } from '@/api/interface/user'
const formRef = ref<InstanceType<typeof Form>>()
const registerForm = reactive<RegisterForm>({
  username: '',
  password: '',
  confirm_password: '',
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
  confirm_password: [
    {
      required: true,
      message: '请确认密码',
    },
    {
      validator: (val: string) => {
        if (val !== registerForm.password)
          return false
        return true
      },
      message: '两次密码不一致',
    },
  ],

}
const handleSubmit = async () => {
  const validated = await formRef.value?.validate()
}
</script>

<template>
  <Form ref="formRef" :rules="rules" flex-1 :model="registerForm" hide-label>
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
      <FormItem prop="confirm_password">
        <Input type="password" size="large" clearable placeholder="请确认密码">
          <template #prefix>
            <Icon>
              <div bg- i-carbon:locked />
            </Icon>
          </template>
        </Input>
      </FormItem>
    </Motion>
    <Motion min-w-260 :delay="200">
      <FormItem>
        <FormSubmit size="default" class="flex-1" type="info" @submit="handleSubmit">
          <template #icon>
            <Icon>
              <div i-carbon:checkmark />
            </Icon>
          </template>
          注册
        </FormSubmit>
        <FormReset class="flex-1" type="warning">
          重 置
        </FormReset>
      </FormItem>
    </Motion>
  </Form>
</template>
