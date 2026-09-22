<script setup lang="ts">
import './Avatar.css'

withDefaults(defineProps<{
  initials: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  status?: 'adimplente' | 'inadimplente' | 'licenciado'
  gradient?: boolean
}>(), {
  size: 'md',
  gradient: false
})
</script>

<template>
  <div :class="['avatar', `avatar--${size}`, gradient ? 'avatar--gradient' : '']" :title="initials">
    <span class="avatar__initials">{{ initials }}</span>
    <span v-if="status" :class="['avatar__status', `avatar__status--${status}`]"></span>
  </div>
</template>
