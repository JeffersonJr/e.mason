<script setup lang="ts">
import './Badge.css'

export type BadgeVariant = 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'muted' | 'outline'
export type BadgeSize = 'sm' | 'md'

withDefaults(defineProps<{
  variant?: BadgeVariant
  size?: BadgeSize
  dot?: boolean
}>(), {
  variant: 'primary',
  size: 'md',
  dot: false
})
</script>

<template>
  <span :class="['badge', `badge--${variant}`, `badge--${size}`]">
    <span v-if="dot" class="badge__dot"></span>
    <slot></slot>
  </span>
</template>
