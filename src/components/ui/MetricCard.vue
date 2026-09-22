<script setup lang="ts">
import { computed } from 'vue'
import Card from './Card.vue'

const props = defineProps<{
  label: string
  value: string | number
  change?: number
  changeLabel?: string
  accentColor?: string
  gradient?: boolean
}>()

const isPositive = computed(() => (props.change ?? 0) >= 0)
const iconStyle = computed(() => props.accentColor ? { background: `${props.accentColor}18`, color: props.accentColor } : {})
</script>

<template>
  <Card :class="['metric-card', gradient ? 'metric-card--gradient' : '']">
    <div class="metric-card__header">
      <div class="metric-card__icon-wrap" :style="iconStyle">
        <slot name="icon"></slot>
      </div>
      <span v-if="change !== undefined" :class="['metric-card__change', isPositive ? 'metric-card__change--up' : 'metric-card__change--down']">
        {{ isPositive ? '▲' : '▼' }} {{ Math.abs(change) }}%
      </span>
    </div>
    <div class="metric-card__value">{{ value }}</div>
    <div class="metric-card__label">{{ label }}</div>
    <div v-if="changeLabel" class="metric-card__change-label">{{ changeLabel }}</div>
  </Card>
</template>
