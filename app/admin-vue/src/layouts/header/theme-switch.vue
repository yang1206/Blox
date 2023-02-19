<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), {
  size: 1.5,
})
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <TheIcon class="cursor-pointer dark-text-white" :size="size" :icon="isDark ? 'line-md:sunny-outline-to-moon-loop-transition' : 'line-md:sunny-outline-loop'" @click.stop="toggleDark()" />
</template>
