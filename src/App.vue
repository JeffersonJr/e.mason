<script setup lang="ts">
import Sidebar from './components/layout/Sidebar.vue'
import Header from './components/layout/Header.vue'
import './App.css'
</script>

<template>
  <div class="app-shell">
    <Sidebar />
    <div class="app-main">
      <Header />
      <main class="app-content">
        <router-view />
      </main>
    </div>
  </div>
</template>
