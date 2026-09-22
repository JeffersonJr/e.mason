<script setup lang="ts">
import { computed } from 'vue'
import Badge from './Badge.vue'

const props = defineProps<{
  degree: number
}>()

const labels: Record<number, string> = {
  1: '1º Aprendiz',
  2: '2º Comp.',
  3: '3º Mestre',
  33: '33° REAA',
}

const label = computed(() => labels[props.degree] || `${props.degree}º Grau`)
</script>

<template>
  <Badge variant="outline" size="sm">
    {{ label }}
  </Badge>
</template>
