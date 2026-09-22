<script setup lang="ts">
import {
  Users, DollarSign, Calendar, CheckCircle,
  AlertTriangle, TrendingUp, Send, MapPin, Plus, FileText, CreditCard,
} from 'lucide-vue-next'
import MetricCard from '../../components/ui/MetricCard.vue'
import Card from '../../components/ui/Card.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import DegreeBadge from '../../components/ui/DegreeBadge.vue'
import Button from '../../components/ui/Button.vue'
import Avatar from '../../components/ui/Avatar.vue'
import { mockMembers, mockActivities } from '../../data/mockData'
import './DashboardLoja.css'

const activityIcons: Record<string, any> = {
  session: Calendar,
  payment: AlertTriangle,
  new_member: Users,
  document: CheckCircle,
  communication: Send,
  degree: TrendingUp,
}

const presenceData = [
  { label: 'Última Telhação (Mar/24)', pct: 81, value: '38/47' },
  { label: 'Fevereiro 2024', pct: 74, value: '35/47' },
  { label: 'Janeiro 2024', pct: 87, value: '41/47' },
]
</script>

<template>
  <div class="dash-loja">
    <!-- Welcome -->
    <div class="loja-welcome">
      <div class="loja-welcome__left">
        <div class="loja-welcome__tag">
          <MapPin :size="11" />
          São Luís, MA — Loja #001
        </div>
        <h2 class="loja-welcome__title">Loja Luz e Progresso</h2>
        <p class="loja-welcome__sub">Telhação: <strong>Terças-feiras, 20h00</strong> · Próxima sessão em <strong>3 dias</strong></p>
      </div>
      <div class="loja-welcome__actions">
        <Button variant="accent">
          <template #icon><Plus :size="15" /></template>
          Registrar Presença
        </Button>
        <Button variant="outline">
          <template #icon><FileText :size="15" /></template>
          Abrir Ata
        </Button>
      </div>
    </div>

    <!-- Metrics -->
    <div>
      <div class="dash-section-title">Painel da Loja</div>
      <div class="dash-metrics-grid">
        <MetricCard
          label="Irmãos Ativos"
          value="42"
          :change="4.8"
          changeLabel="vs. mês anterior"
          accentColor="#4298B5"
        >
          <template #icon><Users :size="20" /></template>
        </MetricCard>
        <MetricCard
          label="Presença Última Sessão"
          value="81%"
          :change="7.2"
          changeLabel="vs. sessão anterior"
          accentColor="#00C288"
        >
          <template #icon><CheckCircle :size="20" /></template>
        </MetricCard>
        <MetricCard
          label="Caixa Local"
          value="R$ 4.820"
          :change="12.5"
          changeLabel="vs. mês anterior"
          accentColor="#00C288"
        >
          <template #icon><DollarSign :size="20" /></template>
        </MetricCard>
        <MetricCard
          label="Inadimplentes"
          value="5"
          :change="-20"
          changeLabel="vs. mês anterior"
          accentColor="#EF4444"
        >
          <template #icon><AlertTriangle :size="20" /></template>
        </MetricCard>
      </div>
    </div>

    <div class="dash-charts-grid">
      <!-- Atividade + Presença -->
      <Card padding="md">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <div>
            <div class="dash-section-title" style="margin-bottom: 2px;">Presença por Sessão</div>
            <div style="font-size: var(--font-size-xs); color: var(--color-text-muted);">Últimos 6 meses</div>
          </div>
        </div>
        <div style="width: 100%; height: 180px; position: relative; border-bottom: 1px dashed var(--color-border);">
          <!-- Mock Chart -->
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style="width: 100%; height: 100%;">
            <defs>
              <linearGradient id="presencaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stop-color="#00C288" stop-opacity="0.18" />
                <stop offset="95%" stop-color="#00C288" stop-opacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,100 L0,70 L20,40 L40,55 L60,30 L80,50 L100,20 L100,100 Z" fill="url(#presencaGrad)" />
            <polyline points="0,70 20,40 40,55 60,30 80,50 100,20" fill="none" stroke="#00C288" stroke-width="2" vector-effect="non-scaling-stroke" />
          </svg>
          <div style="display: flex; justify-content: space-between; position: absolute; bottom: -20px; width: 100%; font-size: 11px; color: var(--color-text-muted);">
            <span>Abr</span><span>Mai</span><span>Jun</span><span>Jul</span><span>Ago</span><span>Set</span>
          </div>
        </div>
      </Card>

      <!-- Next session + Presence rates -->
      <Card padding="md">
        <div class="dash-section-title" style="margin-bottom: 16px;">Próxima Telhação</div>
        <div class="next-session">
          <div class="next-session__date">
            <div class="next-session__date-box">
              <div class="next-session__day">24</div>
              <div class="next-session__month">Set</div>
            </div>
            <div>
              <div class="next-session__info-title">Sessão Ordinária</div>
              <div class="next-session__info-sub">Terça-feira, 20h00 — Grau Mestre</div>
            </div>
          </div>
          <div class="presence-bars">
            <div v-for="(p, i) in presenceData" :key="i" class="presence-bar-row">
              <div class="presence-bar-header">
                <span class="presence-bar-label">{{ p.label }}</span>
                <span class="presence-bar-pct">{{ p.pct }}% <span style="color: var(--color-text-muted); font-weight: 400;">({{ p.value }})</span></span>
              </div>
              <div class="presence-bar-track">
                <div class="presence-bar-fill" :style="{ width: `${p.pct}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>

    <!-- Members table + Quick actions -->
    <div class="dash-content-grid">
      <Card padding="md">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div class="dash-section-title">Obreiros & Cargos</div>
          <Button variant="ghost" size="sm">Ver todos</Button>
        </div>
        <div class="loja-members-table">
          <div v-for="m in mockMembers.slice(0, 7)" :key="m.id" class="loja-member-row">
            <Avatar :initials="m.avatar" size="sm" :status="m.status" />
            <div class="loja-member-info">
              <div class="loja-member-name">{{ m.name.replace('Ir. ', '') }}</div>
              <div class="loja-member-role">{{ m.office }}</div>
            </div>
            <DegreeBadge :degree="m.degree" />
            <StatusBadge :status="m.status" />
          </div>
        </div>
      </Card>

      <div style="display: flex; flex-direction: column; gap: var(--space-5);">
        <Card padding="md">
          <div class="dash-section-title" style="margin-bottom: 14px;">Ações Rápidas</div>
          <div class="quick-actions">
            <button class="quick-action-btn" id="qa-presenca">
              <div class="quick-action-icon"><CheckCircle :size="16" /></div>
              <div class="quick-action-label">Presença</div>
              <div class="quick-action-sub">Registrar sessão</div>
            </button>
            <button class="quick-action-btn" id="qa-boleto">
              <div class="quick-action-icon"><DollarSign :size="16" /></div>
              <div class="quick-action-label">Boleto</div>
              <div class="quick-action-sub">Emitir cobrança</div>
            </button>
            <button class="quick-action-btn" id="qa-ata">
              <div class="quick-action-icon"><FileText :size="16" /></div>
              <div class="quick-action-label">Nova Ata</div>
              <div class="quick-action-sub">Registrar sessão</div>
            </button>
            <button class="quick-action-btn" id="qa-carteirinha-loja">
              <div class="quick-action-icon"><CreditCard :size="16" /></div>
              <div class="quick-action-label">Carteirinha</div>
              <div class="quick-action-sub">Emitir para irmão</div>
            </button>
          </div>
        </Card>

        <Card padding="md">
          <div class="dash-section-title" style="margin-bottom: 14px;">Atividade Recente</div>
          <div class="activity-list">
            <div v-for="act in mockActivities.slice(0, 3)" :key="act.id" class="activity-item">
              <div :class="['activity-icon', `activity-icon--${act.type}`]">
                <component :is="activityIcons[act.type]" :size="16" />
              </div>
              <div class="activity-body">
                <div class="activity-title">{{ act.title }}</div>
                <div class="activity-desc">{{ act.description }}</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>
