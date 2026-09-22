<script setup lang="ts">
import './Card.css'

withDefaults(defineProps<{
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  onClick?: (payload: MouseEvent) => void
}>(), {
  hover: false,
  padding: 'md'
})
</script>

<template>
  <div
    :class="['card', `card--pad-${padding}`, hover ? 'card--hover' : '', onClick ? 'card--clickable' : '']"
    @click="onClick"
    :role="onClick ? 'button' : undefined"
    :tabindex="onClick ? 0 : undefined"
  >
    <slot></slot>
  </div>
</template>
