<script setup lang="ts">
import LoginForm from './components/loginForm.vue'
import registerForm from './components/registerForm.vue'
import Motion from './utils/motion'
import ThemeSwitch from '@/layouts/header/theme-switch.vue'
const isLogin = ref(true)
</script>

<template>
  <div class="login dark:bg-dark wh-full flex-center">
    <div absolute top-15 right-25>
      <ThemeSwitch />
    </div>
    <div m-auto p-15 f-c-c min-w-345 rounded-10 card-shadow bg-white dark:bg-dark bg-opacity-60 flex>
      <div w-380 hidden md:block py-35>
        <img src="@/assets/img/login_banner.webp" w-full alt="login_banner">
      </div>
      <div w-320 flex-col px-20 py-35>
        <LoginForm v-if="isLogin" />
        <registerForm v-else />
        <Motion :delay="250">
          <Button min-w-250 :type="isLogin ? 'info' : 'success'" @click="isLogin = !isLogin">
            {{ isLogin ? '去注册' : '去登陆' }}
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

.dark .dark\:bg-dark {
  background: linear-gradient(to bottom, #323232 0%, #3F3F3F 40%, #1C1C1C 150%), linear-gradient(to top, rgba(255, 255, 255, 0.40) 0%, rgba(0, 0, 0, 0.25) 200%);
  background-blend-mode: multiply;
}
</style>
