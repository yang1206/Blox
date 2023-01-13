<script setup lang="ts">
import { Moon, Sun } from '@vexip-ui/icons'
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <Switch
    :value="isDark" class="theme-switch" :open-icon="Moon" :close-icon="Sun" aria-label="theme"
    @change="toggleDark"
  />
</template>

<style>
.theme-switch {
  border: 1px solid var(--vxp-border-color-base);
}
</style>
