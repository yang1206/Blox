<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {
  color: undefined,
})

interface Props {
  icon: string
  size?: number
  color?: string
}

const iconCom = computed(() =>
  useIcon(props.icon, { size: props.size, color: props.color }),
)
</script>

<template>
  <component :is="iconCom" />
</template>
