<script setup lang="ts">
import { GithubB, Indent, Outdent } from '@vexip-ui/icons'
import Menu from './menu/index.vue'
import ThemeSwitch from './header/theme-switch.vue'
import BreadCrumb from './header/breadCrumb.vue'
import Tab from './tabs/index.vue'
import { useAppStore, usePermissionStore, useUserStore } from '@/store'
const asyncmenus = usePermissionStore().menuInfo
const appStore = useAppStore()
const userInfo = useUserStore().userInfo
const isXsScreen = useMediaQuery('(min-width: 768px)')
const user = {
  name: userInfo.username,
  email: userInfo.email,
  avatar: userInfo.avatar,
}
function handleUserAction(label: string) {
  useUserStore().logout()
}
</script>

<template>
  <Layout
    logo="https://s2.loli.net/2022/05/12/gxRJwmb1ClQPoGe.jpg" sign-name="博客后台管理" :user="user" :config="['nav', 'color']"
    aside-fixed="md" @user-action="handleUserAction"
  >
    <!-- <template #header>
      <div dark:bg-dark>
        <BreadCrumb v-if="isXsScreen" />
        <Tab />
      </div>
    </template> -->
    <template #header-left="{ reduced, toggleReduce }">
      <div v-if="isXsScreen" style="display: flex; cursor: pointer;" @click="toggleReduce()">
        <Icon :icon="reduced ? Indent : Outdent" />
      </div>
    </template>
    <template #header-main>
      <div>
        <BreadCrumb v-if="isXsScreen" />
      </div>
    </template>
    <template #header-right>
      <span lh-2 m-14 cursor-pointer>
        <ThemeSwitch />
      </span>
      <Linker to="https://github.com/yang1206/my-blog" style="display: flex; margin-right: 16px;">
        <Icon :scale="1.6">
          <GithubB />
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
      <main class="bg-rgba(245,246,251,1) main" :class="isXsScreen ? 'pt-94px' : 'pt-54'" dark:bg-dark wh-full>
        <router-view v-slot="{ Component, route }">
          <component :is="Component" v-if="appStore.reloadFlag" :key="route.path" />
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
