<script setup lang="ts">
import LoginForm from './components/loginForm.vue'
import registerForm from './components/registerForm.vue'
import Motion from './utils/motion'
const isLogin = ref(true)
</script>

<template>
  <div class="login wh-full flex-center">
    <div m-auto p-15 f-c-c min-w-345 rounded-10 card-shadow bg-white dark:bg-dark bg-opacity-60 flex>
      <div w-380 hidden md:block px-20 py-35>
        <img src="@/assets/img/login_banner.webp" w-full alt="login_banner">
      </div>
      <div w-320 flex-col px-20 py-35>
        <LoginForm v-if="isLogin" />
        <registerForm v-else />
        <Motion min-w-260 :delay="250">
          <Button w-260 :type="isLogin ? 'info' : 'success'" @click="isLogin = !isLogin">
            {{ isLogin ? '注册' : '登陆' }}
          </Button>
        </Motion>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login {
  background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
}
</style>
