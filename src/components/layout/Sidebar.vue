<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  LayoutDashboard, Users, CreditCard, FolderOpen,
  Globe, DollarSign, Settings, ChevronRight,
  Building2, Shield, LogOut, Zap,
} from 'lucide-vue-next'
import { useProfileStore } from '../../stores/profile'
import type { ProfileMode } from '../../types'
import MasonicHex from '../ui/MasonicHex.vue'
import Avatar from '../ui/Avatar.vue'
import './Sidebar.css'

interface NavItem {
  id: string
  label: string
  icon: any
  path: string
  badge?: number
  accessLevels: ProfileMode[]
  section?: string
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/', accessLevels: ['potencia', 'loja', 'irmao'], section: 'principal' },
  { id: 'members', label: 'Obreiros & Cargos', icon: Users, path: '/obreiros', accessLevels: ['potencia', 'loja', 'irmao'], section: 'principal' },
  { id: 'lodges', label: 'Lojas Subordinadas', icon: Building2, path: '/lojas', accessLevels: ['potencia'], section: 'principal' },
  { id: 'idcards', label: 'Carteirinhas', icon: CreditCard, path: '/carteirinhas', accessLevels: ['potencia', 'loja', 'irmao'], section: 'principal' },
  { id: 'documents', label: 'Documentos & Rituais', icon: FolderOpen, path: '/documentos', accessLevels: ['potencia', 'loja', 'irmao'], section: 'principal' },
  { id: 'finance', label: 'Tesouraria', icon: DollarSign, path: '/tesouraria', accessLevels: ['potencia', 'loja'], section: 'principal' },
  { id: 'sitebuilder', label: 'Site Builder', icon: Globe, path: '/site-builder', accessLevels: ['potencia', 'loja'], section: 'cms' },
  { id: 'settings', label: 'Configurações', icon: Settings, path: '/configuracoes', accessLevels: ['potencia', 'loja'], section: 'sistema' },
]

const modeLabels: Record<ProfileMode, { label: string; sublabel: string }> = {
  potencia: { label: 'GOMB', sublabel: 'Grande Oriente' },
  loja: { label: 'Loja Luz e Progresso', sublabel: 'Venerável: Ir. Carlos E.' },
  irmao: { label: 'Ir. Jefferson Amorim', sublabel: 'CIM: GOMB-2024-001337' },
}

const store = useProfileStore()
const collapsed = ref(false)

const visibleItems = computed(() => navItems.filter(item => item.accessLevels.includes(store.mode)))

const sections = computed(() => ({
  principal: visibleItems.value.filter(i => i.section === 'principal'),
  cms: visibleItems.value.filter(i => i.section === 'cms'),
  sistema: visibleItems.value.filter(i => i.section === 'sistema'),
}))

const currentModeInfo = computed(() => modeLabels[store.mode])
</script>

<template>
  <aside :class="['sidebar', collapsed ? 'sidebar--collapsed' : '']">
    <!-- Logo -->
    <div class="sidebar__logo">
      <MasonicHex :size="collapsed ? 34 : 38" variant="gradient" animated>
        <svg viewBox="0 0 24 24" fill="white" width="55%" height="55%">
          <path d="M12 2L22 7.5V16.5L12 22L2 16.5V7.5L12 2ZM12 4.311L4 8.5V15.5L12 19.689L20 15.5V8.5L12 4.311Z" />
        </svg>
      </MasonicHex>
      <div v-if="!collapsed" class="sidebar__logo-text">
        <span class="sidebar__logo-name">e.mason</span>
        <span class="sidebar__logo-powered">powered by Evolves</span>
      </div>
      <button class="sidebar__toggle" @click="collapsed = !collapsed" :title="collapsed ? 'Expandir' : 'Recolher'">
        <ChevronRight :size="14" :style="{ transform: collapsed ? 'none' : 'rotate(180deg)', transition: 'transform 0.25s' }" />
      </button>
    </div>

    <!-- Context info -->
    <div v-if="!collapsed" class="sidebar__context">
      <div class="sidebar__context-badge">
        <Shield :size="12" />
        <span>{{ store.mode === 'potencia' ? 'Potência' : store.mode === 'loja' ? 'Loja' : 'Irmão' }}</span>
      </div>
      <div class="sidebar__context-name">{{ currentModeInfo.label }}</div>
      <div class="sidebar__context-sub">{{ currentModeInfo.sublabel }}</div>
    </div>

    <!-- Navigation -->
    <nav class="sidebar__nav">
      <!-- Main section -->
      <div v-if="sections.principal.length > 0" class="sidebar__section">
        <span v-if="!collapsed" class="sidebar__section-label">Principal</span>
        <router-link
          v-for="item in sections.principal"
          :key="item.id"
          :to="item.path"
          class="sidebar__item"
          active-class="sidebar__item--active"
          :title="collapsed ? item.label : undefined"
        >
          <span class="sidebar__item-icon"><component :is="item.icon" :size="18" /></span>
          <span v-if="!collapsed" class="sidebar__item-label">{{ item.label }}</span>
          <span v-if="!collapsed && item.badge" class="sidebar__item-badge">{{ item.badge }}</span>
        </router-link>
      </div>

      <!-- CMS section -->
      <div v-if="sections.cms.length > 0" class="sidebar__section">
        <span v-if="!collapsed" class="sidebar__section-label">CMS & Publicação</span>
        <router-link
          v-for="item in sections.cms"
          :key="item.id"
          :to="item.path"
          class="sidebar__item"
          active-class="sidebar__item--active"
          :title="collapsed ? item.label : undefined"
        >
          <span class="sidebar__item-icon"><component :is="item.icon" :size="18" /></span>
          <span v-if="!collapsed" class="sidebar__item-label">{{ item.label }}</span>
        </router-link>
      </div>

      <!-- Sistema section -->
      <div v-if="sections.sistema.length > 0" class="sidebar__section">
        <span v-if="!collapsed" class="sidebar__section-label">Sistema</span>
        <router-link
          v-for="item in sections.sistema"
          :key="item.id"
          :to="item.path"
          class="sidebar__item"
          active-class="sidebar__item--active"
          :title="collapsed ? item.label : undefined"
        >
          <span class="sidebar__item-icon"><component :is="item.icon" :size="18" /></span>
          <span v-if="!collapsed" class="sidebar__item-label">{{ item.label }}</span>
        </router-link>
      </div>
    </nav>

    <!-- Upgrade Banner -->
    <div v-if="!collapsed && store.mode === 'loja'" class="sidebar__promo">
      <div class="sidebar__promo-icon"><Zap :size="14" /></div>
      <div>
        <div class="sidebar__promo-title">Plano Loja Pro</div>
        <div class="sidebar__promo-sub">Recursos avançados disponíveis</div>
      </div>
    </div>

    <!-- User Footer -->
    <div class="sidebar__footer">
      <Avatar :initials="store.user.avatar" size="sm" gradient />
      <div v-if="!collapsed" class="sidebar__footer-info">
        <div class="sidebar__footer-name">{{ store.user.name.replace('Ir. ', '') }}</div>
        <div class="sidebar__footer-role">{{ store.user.role }}</div>
      </div>
      <button v-if="!collapsed" class="sidebar__footer-logout" title="Sair">
        <LogOut :size="15" />
      </button>
    </div>
  </aside>
</template>
