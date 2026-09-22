<script setup lang="ts">
import { computed } from 'vue'
import Badge, { type BadgeVariant } from './Badge.vue'

const props = defineProps<{
  status: 'adimplente' | 'inadimplente' | 'licenciado'
}>()

const map: Record<string, { variant: BadgeVariant, label: string }> = {
  adimplente: { variant: 'success', label: 'Adimplente' },
  inadimplente: { variant: 'danger', label: 'Inadimplente' },
  licenciado: { variant: 'warning', label: 'Licenciado' },
}

const badgeProps = computed(() => map[props.status])
</script>

<template>
  <Badge :variant="badgeProps.variant" dot>{{ badgeProps.label }}</Badge>
</template>
