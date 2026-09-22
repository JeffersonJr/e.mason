<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Bell, Search, ChevronDown, Building2, Shield, User } from 'lucide-vue-next'
import { useProfileStore } from '../../stores/profile'
import type { ProfileMode } from '../../types'
import Avatar from '../ui/Avatar.vue'
import Badge from '../ui/Badge.vue'
import './Header.css'

const pageNames: Record<string, string> = {
  '/': 'Dashboard',
  '/obreiros': 'Obreiros & Cargos',
  '/lojas': 'Lojas Subordinadas',
  '/carteirinhas': 'Carteirinhas Digitais',
  '/documentos': 'Documentos & Rituais',
  '/tesouraria': 'Tesouraria',
  '/site-builder': 'Site Builder',
  '/configuracoes': 'Configurações',
}

const modeOptions: { value: ProfileMode; label: string; sublabel: string; icon: any }[] = [
  { value: 'potencia', label: 'Potência (GOMB)', sublabel: 'Grão-Mestre · Visão Global', icon: Shield },
  { value: 'loja', label: 'Loja Luz e Progresso', sublabel: 'Venerável Mestre · Visão Local', icon: Building2 },
  { value: 'irmao', label: 'Ir. Jefferson Amorim', sublabel: '33° REAA · Membro', icon: User },
]

const notifications = ref([
  { id: 1, title: 'Inadimplência detectada', desc: 'Ir. Lucas Ferreira — 2 meses', time: '2h', read: false },
  { id: 2, title: 'Nova Loja solicitou vínculo', desc: 'Loja Oriente de Codó #012', time: '5h', read: false },
  { id: 3, title: 'Sessão Magna confirmada', desc: 'Abril 15, 2024 — 20h00', time: '1d', read: true },
])

const store = useProfileStore()
const route = useRoute()
const showModeMenu = ref(false)
const showNotifs = ref(false)

const pageName = computed(() => pageNames[route.path] || 'e.mason')
const currentMode = computed(() => modeOptions.find(m => m.value === store.mode)!)
const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)
</script>

<template>
  <header class="header">
    <!-- Left: Page title -->
    <div class="header__left">
      <div class="header__page-title">
        <h1>{{ pageName }}</h1>
        <div class="header__breadcrumb">
          <span>{{ currentMode.label }}</span>
          <span class="header__breadcrumb-sep">/</span>
          <span>{{ pageName }}</span>
        </div>
      </div>
    </div>

    <!-- Center: Search -->
    <div class="header__search-wrap">
      <div class="header__search">
        <Search :size="15" class="header__search-icon" />
        <input
          type="search"
          placeholder="Buscar irmão, loja, documento..."
          class="header__search-input"
          id="global-search"
        />
        <kbd class="header__search-kbd">⌘K</kbd>
      </div>
    </div>

    <!-- Right: Profile switcher + notifications + user -->
    <div class="header__right">
      <!-- Profile Mode Switcher -->
      <div class="header__mode-switcher" id="profile-mode-switcher">
        <button
          class="header__mode-btn"
          @click="showModeMenu = !showModeMenu; showNotifs = false"
        >
          <div :class="['header__mode-indicator', `header__mode-indicator--${store.mode}`]">
            <component :is="currentMode.icon" :size="15" />
          </div>
          <div class="header__mode-text">
            <span class="header__mode-label">{{ currentMode.label }}</span>
            <span class="header__mode-sub">{{ currentMode.sublabel }}</span>
          </div>
          <ChevronDown :size="14" :class="['header__chevron', showModeMenu ? 'header__chevron--open' : '']" />
        </button>

        <div v-if="showModeMenu" class="header__mode-dropdown" id="mode-dropdown">
          <div class="header__mode-dropdown-title">Alternar Perfil de Acesso</div>
          <button
            v-for="opt in modeOptions"
            :key="opt.value"
            :class="['header__mode-option', opt.value === store.mode ? 'header__mode-option--active' : '']"
            @click="store.setMode(opt.value); showModeMenu = false"
            :id="`mode-option-${opt.value}`"
          >
            <div :class="['header__mode-indicator', `header__mode-indicator--${opt.value}`]" style="width: 32px; height: 32px">
              <component :is="opt.icon" :size="15" />
            </div>
            <div>
              <div class="header__mode-option-label">{{ opt.label }}</div>
              <div class="header__mode-option-sub">{{ opt.sublabel }}</div>
            </div>
            <Badge v-if="opt.value === store.mode" variant="accent" size="sm">Ativo</Badge>
          </button>
        </div>
      </div>

      <!-- Notifications -->
      <div class="header__notif-wrap" id="notifications-btn">
        <button
          class="header__notif-btn"
          @click="showNotifs = !showNotifs; showModeMenu = false"
        >
          <Bell :size="18" />
          <span v-if="unreadCount > 0" class="header__notif-count">{{ unreadCount }}</span>
        </button>

        <div v-if="showNotifs" class="header__notif-dropdown" id="notifications-dropdown">
          <div class="header__notif-header">
            <span>Notificações</span>
            <Badge variant="accent" size="sm">{{ unreadCount }} novas</Badge>
          </div>
          <div
            v-for="n in notifications"
            :key="n.id"
            :class="['header__notif-item', !n.read ? 'header__notif-item--unread' : '']"
          >
            <div class="header__notif-dot" :style="{ background: n.read ? 'var(--color-border)' : 'var(--color-accent)' }"></div>
            <div class="header__notif-body">
              <div class="header__notif-title">{{ n.title }}</div>
              <div class="header__notif-desc">{{ n.desc }}</div>
            </div>
            <div class="header__notif-time">{{ n.time }}</div>
          </div>
          <button class="header__notif-all">Ver todas as notificações</button>
        </div>
      </div>

      <!-- User Avatar -->
      <div class="header__user" id="user-menu">
        <Avatar :initials="store.user.avatar" size="sm" gradient :status="store.user.status" />
      </div>
    </div>

    <!-- Overlay to close dropdowns -->
    <div
      v-if="showModeMenu || showNotifs"
      class="header__overlay"
      @click="showModeMenu = false; showNotifs = false"
    ></div>
  </header>
</template>
