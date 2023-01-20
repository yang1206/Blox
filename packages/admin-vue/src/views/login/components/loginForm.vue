<script lang="ts" setup>
import type { Form } from 'vexip-ui'
import Motion from '../utils/motion'
import { loginRules } from '../utils/rules'
import { useUserStore } from '@/store'
import { getLocal, removeLocal, setLocal } from '@/utils'
import type { LoginForm } from '@/api/interface/user'
import { useFormValid } from '@/composables/useFormValid'
import { addDynamicRoutes, router } from '@/router'
const route = useRoute()
const query = route.query
const userStore = useUserStore()
const formRef = ref<InstanceType<typeof Form>>()
const isRemember = useStorage('isRemember', false)
const loginForm = reactive<LoginForm>({
  username: '',
  password: '',
})
const loadingState = ref(false)
const localLoginInfo = getLocal('loginInfo') as LoginForm
if (localLoginInfo) {
  loginForm.username = localLoginInfo.username || ''
  loginForm.password = localLoginInfo.password || ''
}
const handleSubmit = async () => {
  loadingState.value = true
  const validated = await useFormValid(formRef).validForm()
  if (validated) {
    if (isRemember)
      setLocal('loginInfo', loginForm)
  }
  if (isRemember.value)
    setLocal('loginInfo', loginForm)
  else removeLocal('loginInfo')
  userStore.asyncLogin(loginForm).then(async () => {
    await addDynamicRoutes()
    if (query.redirect) {
      const path = query.redirect as string
      Reflect.deleteProperty(query, 'redirect')
      router.push({ path, query })
    }
    else {
      router.push(localStorage.getItem('menuActive') as string || '/')
    }
    loadingState.value = false
    Notice.success('登录成功')
  }).catch(() => {
    loadingState.value = false
  })
}
</script>

<template>
  <Form ref="formRef" w-full :rules="loginRules" flex-1 :model="loginForm" hide-label>
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
        <FormSubmit :loading="loadingState" size="default" class="flex-1" type="success" @submit="handleSubmit">
          登 陆
        </FormSubmit>
        <!-- <FormReset class="flex-1" type="warning">
          重 置
        </FormReset> -->
      </FormItem>
    </Motion>
  </Form>
</template>
