<script lang="ts" setup>
import { Form, Notice } from 'vexip-ui'
import Motion from '../utils/motion'
import { registerForm, registerRules } from '../utils/rules'
import { registerRequest } from '@/api'
import { useFormValid } from '@/composables/useFormValid'
const formRef = ref<InstanceType<typeof Form>>()
const handleSubmit = async () => {
  const validated = await useFormValid(formRef).validForm()
  if (validated) {
    registerRequest(registerForm).then((res) => {
      if (res.message === 'success')
        Notice.success('注册成功，去登陆吧！')
    })
  }
}
</script>

<template>
  <Form ref="formRef" w-full :rules="registerRules" :model="registerForm" hide-label>
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
        <!-- <FormReset class="flex-1" type="warning">
          重 置
        </FormReset> -->
      </FormItem>
    </Motion>
  </Form>
</template>
