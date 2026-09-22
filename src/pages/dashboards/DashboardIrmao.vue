<script setup lang="ts">
import { Calendar, DollarSign, CheckCircle, Clock, Star, CreditCard } from 'lucide-vue-next'
import Card from '../../components/ui/Card.vue'
import Badge from '../../components/ui/Badge.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import DegreeBadge from '../../components/ui/DegreeBadge.vue'
import Button from '../../components/ui/Button.vue'
import Avatar from '../../components/ui/Avatar.vue'
import MasonicHex from '../../components/ui/MasonicHex.vue'
import { currentUser } from '../../data/mockData'
import './DashboardIrmao.css'

const upcomingSessions = [
  { id: 1, date: '24 Set', title: 'Sessão Ordinária', lodge: 'Luz e Progresso', degree: '3º Grau', status: 'confirmed' },
  { id: 2, date: '08 Out', title: 'Sessão Magna', lodge: 'GOMB', degree: 'Todos', status: 'upcoming' },
  { id: 3, date: '29 Out', title: 'Sessão Ordinária', lodge: 'Luz e Progresso', degree: '2º e 3º', status: 'upcoming' },
]

const myDocs = [
  { id: 1, title: 'Carteirinha Digital', icon: CreditCard, action: 'Visualizar', color: '#4298B5' },
  { id: 2, title: 'Comprovante de Regularidade', icon: CheckCircle, action: 'Baixar', color: '#00C288' },
  { id: 3, title: 'Histórico de Presenças', icon: Clock, action: 'Ver detalhes', color: '#F59E0B' },
]
</script>

<template>
  <div class="dash-irmao">
    <!-- Profile hero -->
    <div class="irmao-hero">
      <div class="irmao-hero__bg">
        <!-- decorative hex pattern -->
        <div class="irmao-hero__hex-deco">
          <MasonicHex v-for="i in 5" :key="i" :size="80 - (i - 1) * 12" variant="gradient" class="irmao-hero__hex-item" />
        </div>
      </div>
      <div class="irmao-hero__content">
        <Avatar :initials="currentUser.avatar" size="xl" gradient />
        <div class="irmao-hero__info">
          <div class="irmao-hero__cim">CIM: {{ currentUser.cim }}</div>
          <h2 class="irmao-hero__name">{{ currentUser.name }}</h2>
          <div class="irmao-hero__role">{{ currentUser.role }} · {{ currentUser.lodge }}</div>
          <div class="irmao-hero__badges">
            <DegreeBadge :degree="currentUser.degree" />
            <StatusBadge :status="currentUser.status" />
            <Badge variant="primary" size="sm">Membro desde 2008</Badge>
          </div>
        </div>
        <div class="irmao-hero__actions">
          <Button variant="accent">
            <template #icon><CreditCard :size="15" /></template>
            Ver Carteirinha
          </Button>
        </div>
      </div>
    </div>

    <!-- Quick stats -->
    <div class="dash-metrics-grid dash-metrics-grid--3">
      <div class="irmao-stat-card">
        <div class="irmao-stat-card__icon" style="background: var(--color-primary-light); color: var(--color-primary);">
          <CheckCircle :size="20" />
        </div>
        <div class="irmao-stat-card__value">94%</div>
        <div class="irmao-stat-card__label">Assiduidade 2024</div>
        <div class="presence-bar-track" style="margin-top: 8px;">
          <div class="presence-bar-fill" style="width: 94%;"></div>
        </div>
      </div>
      <div class="irmao-stat-card">
        <div class="irmao-stat-card__icon" style="background: var(--color-accent-light); color: var(--color-accent);">
          <DollarSign :size="20" />
        </div>
        <div class="irmao-stat-card__value" style="color: var(--color-accent);">Em dia</div>
        <div class="irmao-stat-card__label">Status Financeiro</div>
        <div class="irmao-stat-card__sub">Última joia: 10 Set 2026</div>
      </div>
      <div class="irmao-stat-card">
        <div class="irmao-stat-card__icon" style="background: #fef9c3; color: #92400e;">
          <Star :size="20" />
        </div>
        <div class="irmao-stat-card__value">18 anos</div>
        <div class="irmao-stat-card__label">Tempo de Maçonaria</div>
        <div class="irmao-stat-card__sub">Iniciado em 15/03/2008</div>
      </div>
    </div>

    <div class="dash-content-grid">
      <!-- Upcoming sessions -->
      <Card padding="md">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div class="dash-section-title">Próximas Sessões</div>
          <Button variant="ghost" size="sm">Calendário completo</Button>
        </div>
        <div style="display: flex; flex-direction: column; gap: var(--space-3);">
          <div v-for="s in upcomingSessions" :key="s.id" class="session-card">
            <div class="session-card__date">
              <span>{{ s.date.split(' ')[0] }}</span>
              <span>{{ s.date.split(' ')[1] }}</span>
            </div>
            <div class="session-card__info">
              <div class="session-card__title">{{ s.title }}</div>
              <div class="session-card__meta">{{ s.lodge }} · {{ s.degree }}</div>
            </div>
            <Badge :variant="s.status === 'confirmed' ? 'accent' : 'muted'" size="sm">
              {{ s.status === 'confirmed' ? 'Confirmado' : 'Convocação' }}
            </Badge>
          </div>
        </div>
      </Card>

      <!-- Quick documents -->
      <div style="display: flex; flex-direction: column; gap: var(--space-5);">
        <Card padding="md">
          <div class="dash-section-title" style="margin-bottom: 14px;">Meus Documentos</div>
          <div style="display: flex; flex-direction: column; gap: var(--space-3);">
            <div v-for="d in myDocs" :key="d.id" class="irmao-doc-row">
              <div class="irmao-doc-icon" :style="{ background: `${d.color}18`, color: d.color }">
                <component :is="d.icon" :size="18" />
              </div>
              <div class="irmao-doc-label">{{ d.title }}</div>
              <Button variant="ghost" size="sm">{{ d.action }}</Button>
            </div>
          </div>
        </Card>

        <div class="alert-banner alert-banner--info">
          <Calendar :size="18" class="alert-banner__icon" />
          <div class="alert-banner__text">
            Sessão Ordinária em <strong>3 dias</strong> — Loja Luz e Progresso, Terça 20h00.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
