<script setup lang="ts">
import { active } from '../utils'
import type { MenuData } from '@/api'
import { router } from '@/router'

defineProps<{
  menusData: MenuData[]
  reduced?: boolean
}>()
function selectMenu(label: string) {
  active.value = label
  router.push(label)
}
</script>

<template>
  <Menu :active="active" :manual-route="true" :reduced="reduced" @select="selectMenu">
    <template v-for="item in menusData" :key="item.label">
      <MenuItem v-if="!item.children" :label="item.path" :icon="useIcon(item.icon)">
        <template #default>
          {{ item.name }}
        </template>
      </MenuItem>
      <MenuItem v-else :label="item.path" :icon="useIcon(item.icon)">
        <template #default>
          {{ item.name }}
        </template>
        <template #group>
          <MenuItem v-for="menu in item.children" :key="menu.path" :icon="useIcon(menu.icon)" :label="menu.path">
            <template #default>
              {{ menu.name }}
            </template>
          </MenuItem>
        </template>
      </MenuItem>
    </template>
  </Menu>
</template>
