<script lang='ts' setup>
withDefaults(defineProps<Props>(), {
  size: 1,
})
interface Props {
  name: string
  size?: number
}
defineOptions({
  name: 'UIcon',
})
</script>

<template>
  <Icon :scale="size">
    <div w-5em h-5em :class="`i-${name}`" />
  </Icon>
</template>
