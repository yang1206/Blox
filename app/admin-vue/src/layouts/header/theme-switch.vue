<script setup lang="ts">
import { useAppStore } from '@/store'

withDefaults(defineProps<{ size?: number }>(), {
  size: 1.5,
})

const isDark = useDark()

const { toggleDark } = useAppStore()
</script>

<template>
  <TheIcon class="cursor-pointer dark-text-white hover:text-primary" :size="size" :icon="isDark ? 'line-md:sunny-outline-to-moon-loop-transition' : 'line-md:sunny-outline-loop'" @click.stop="toggleDark" />
</template>
