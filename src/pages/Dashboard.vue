<script setup lang="ts">
import { useProfileStore } from '../stores/profile'
import DashboardPotencia from './dashboards/DashboardPotencia.vue'
import DashboardLoja from './dashboards/DashboardLoja.vue'
import DashboardIrmao from './dashboards/DashboardIrmao.vue'
import './Dashboard.css'

const store = useProfileStore()
</script>

<template>
  <div class="dashboard page-enter">
    <DashboardPotencia v-if="store.mode === 'potencia'" />
    <DashboardLoja v-if="store.mode === 'loja'" />
    <DashboardIrmao v-if="store.mode === 'irmao'" />
  </div>
</template>
