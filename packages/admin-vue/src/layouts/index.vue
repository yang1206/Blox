<script setup lang="ts">
import { Confirm } from 'vexip-ui'
import Menu from './menu/index.vue'
import ThemeSwitch from './header/theme-switch.vue'
import BreadCrumb from './header/breadCrumb.vue'
import Tab from './tabs/index.vue'
import { useAppStore, usePermissionStore, useUserStore } from '@/store'
const asyncmenus = usePermissionStore().getmenus
const appStore = useAppStore()
const userInfo = useUserStore().userInfo
const isXsScreen = useMediaQuery('(min-width: 576px)')
const user = {
  name: userInfo.username,
  email: userInfo.email,
  avatar: userInfo.avatar,
}
const isDark = useDark()

const toggleDark = useToggle(isDark)
// 主题色
const sysColor = useStorage('color', '#339af0')
// 实体显示logo
const signType = useStorage<'aside' | 'header'>('signType', 'aside')
async function handleUserAction() {
  const isLogout = await Confirm.open('是否要退出登陆')
  if (isLogout)
    useUserStore().logout()
}
</script>

<template>
  <Layout
    v-auto-animate logo="https://s2.loli.net/2022/05/12/gxRJwmb1ClQPoGe.jpg" sign-name="博客后台管理" :color="sysColor" :sign-type="signType" :user="user" :config="['nav', 'theme', 'color']"
    aside-fixed="xs" :dark-mode="isDark" @user-action="handleUserAction" @toggle-theme="toggleDark()" @color-change="(color) => { sysColor = color }" @nav-change=" type => { signType = type } "
  >
    <!-- <template #header>
      <div dark:bg-dark>
        <BreadCrumb v-if="isXsScreen" />
        <Tab />
      </div>
    </template> -->
    <template #header-left="{ reduced, toggleReduce }">
      <div v-if="isXsScreen" style="display: flex; cursor: pointer;" @click="toggleReduce()">
        <Icon v-auto-animate scale="1.2">
          <div :class="reduced ? 'i-ant-design:menu-fold-outlined' : 'i-ant-design:menu-unfold-outlined'" />
        </Icon>
      </div>
    </template>
    <template #header-main>
      <div>
        <BreadCrumb v-if="isXsScreen" />
      </div>
    </template>
    <template #header-right>
      <!-- <span m-14 lh-2 cursor-pointer>
        <FullScreen v-slot="{ toggle }">
          <TheIcon icon="ic:outline-fullscreen" :size="2" @click="toggle('browser')" />
        </FullScreen>
      </span> -->
      <span lh-2 m-14 cursor-pointer>
        <ThemeSwitch />
      </span>
      <Linker to="https://github.com/yang1206/my-blog" style="display: flex; margin-right: 16px;">
        <Icon :scale="1.6">
          <div i-carbon:logo-github />
        </Icon>
      </Linker>
    </template>
    <template #aside-main="{ reduced }">
      <Menu :menus-data="asyncmenus" :reduced="reduced" />
    </template>
    <template #main>
      <div v-if="isXsScreen" fixed top-54px h-40px flex items-center w-full class="tabs">
        <Tab />
      </div>
      <main class="bg-#F3F5FA main" :class="isXsScreen ? 'pt-114px' : 'pt-74'" dark:bg-dark wh-full p-20px>
        <router-view v-slot="{ Component, route }">
          <transition name="fade-slide" mode="out-in" appear>
            <component :is="Component" v-if="appStore.reloadFlag" :key="route.path" />
          </transition>
        </router-view>
      </main>
    </template>
  </Layout>
</template>

<style scoped lang="scss">
:deep(.vxp-layout__logo) img{
  margin: 0 auto;
}
:deep(.vxp-layout__scroll){
  padding-top: 0;
}
.main .dark .dark\:bg-dark,
.dark [dark\:bg-dark=""] {
    background-color: rgba(18, 18, 18,1);
}
</style>
