<script setup lang="ts">
import {
  Building2, Users, TrendingUp, AlertTriangle,
  CheckCircle, Calendar, MapPin, Send, ArrowRight, User, BarChart3,
} from 'lucide-vue-next'
import MetricCard from '../../components/ui/MetricCard.vue'
import Card from '../../components/ui/Card.vue'
import Badge from '../../components/ui/Badge.vue'
import Button from '../../components/ui/Button.vue'
import { mockLodges, mockActivities, adimplenciaData } from '../../data/mockData'
import './DashboardPotencia.css'

function formatDate(str: string) {
  const d = new Date(str)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
}

const activityIcons: Record<string, any> = {
  session: Calendar,
  payment: AlertTriangle,
  new_member: Users,
  document: CheckCircle,
  communication: Send,
  degree: TrendingUp,
}
</script>

<template>
  <div class="dash-potencia">
    <!-- Welcome banner -->
    <div class="potencia-welcome">
      <div class="potencia-welcome__text">
        <div class="potencia-welcome__greeting">Bom dia, Grão-Mestre 👋</div>
        <h2 class="potencia-welcome__title">Grande Oriente do Maranhão e Balsas</h2>
        <p class="potencia-welcome__sub">Visão consolidada — 5 Lojas · 149 Irmãos · Setembro 2026</p>
      </div>
      <div class="potencia-welcome__actions">
        <Button variant="primary">
          <template #icon><Send :size="15" /></template>
          Enviar Comunicado
        </Button>
        <Button variant="outline">
          <template #icon><Building2 :size="15" /></template>
          Nova Loja
        </Button>
      </div>
    </div>

    <!-- Alert -->
    <div class="alert-banner alert-banner--warning">
      <AlertTriangle :size="18" class="alert-banner__icon" />
      <div class="alert-banner__text">
        <strong>Atenção:</strong> Loja Maçonaria e Virtude (#004 — Timon) está com status <strong>Irregular</strong>. Pendências administrativas desde Jan/2024.
      </div>
      <button class="alert-banner__action">Ver detalhes →</button>
    </div>

    <!-- Metrics -->
    <div>
      <div class="dash-section-title">Visão Global</div>
      <div class="dash-metrics-grid">
        <MetricCard
          label="Total de Lojas"
          value="5"
          :change="0"
          changeLabel="Nenhuma mudança"
          accentColor="#4298B5"
        >
          <template #icon><Building2 :size="20" /></template>
        </MetricCard>
        <MetricCard
          label="Irmãos Cadastrados"
          value="149"
          :change="2.1"
          changeLabel="vs. mês anterior"
          accentColor="#00C288"
        >
          <template #icon><Users :size="20" /></template>
        </MetricCard>
        <MetricCard
          label="Taxa de Adimplência"
          value="88,6%"
          :change="1.4"
          changeLabel="vs. trimestre"
          accentColor="#00C288"
        >
          <template #icon><TrendingUp :size="20" /></template>
        </MetricCard>
        <MetricCard
          label="Lojas Irregulares"
          value="1"
          :change="-100"
          changeLabel="Requer ação"
          accentColor="#EF4444"
        >
          <template #icon><AlertTriangle :size="20" /></template>
        </MetricCard>
      </div>
    </div>

    <!-- Charts -->
    <div class="dash-charts-grid">
      <Card padding="md">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <div>
            <div class="dash-section-title" style="margin-bottom: 2px;">Atividade das Lojas</div>
            <div style="font-size: var(--font-size-xs); color: var(--color-text-muted);">Sessões realizadas por mês</div>
          </div>
          <Badge variant="accent">Últimos 6 meses</Badge>
        </div>
        
        <!-- Mock Area Chart -->
        <div style="width: 100%; height: 200px; position: relative;">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style="width: 100%; height: 100%;">
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stop-color="#4298B5" stop-opacity="0.18" />
                <stop offset="95%" stop-color="#4298B5" stop-opacity="0" />
              </linearGradient>
              <linearGradient id="areaGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stop-color="#00C288" stop-opacity="0.18" />
                <stop offset="95%" stop-color="#00C288" stop-opacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,100 L0,80 L20,60 L40,65 L60,40 L80,50 L100,30 L100,100 Z" fill="url(#areaGrad)" />
            <polyline points="0,80 20,60 40,65 60,40 80,50 100,30" fill="none" stroke="#4298B5" stroke-width="2" vector-effect="non-scaling-stroke" />
            
            <path d="M0,100 L0,90 L20,85 L40,75 L60,80 L80,60 L100,65 L100,100 Z" fill="url(#areaGrad2)" />
            <polyline points="0,90 20,85 40,75 60,80 80,60 100,65" fill="none" stroke="#00C288" stroke-width="2" vector-effect="non-scaling-stroke" />
          </svg>
          <div style="display: flex; justify-content: space-between; position: absolute; bottom: 0; width: 100%; font-size: 11px; color: var(--color-text-muted);">
            <span>Abr</span><span>Mai</span><span>Jun</span><span>Jul</span><span>Ago</span><span>Set</span>
          </div>
        </div>
      </Card>

      <Card padding="md">
        <div class="dash-section-title" style="margin-bottom: 16px;">Adimplência Global</div>
        <div class="adimplencia-ring">
          <div style="width: 140px; height: 140px; border-radius: 50%; border: 20px solid #4298B5; border-right-color: #00C288; border-bottom-color: #EF4444; transform: rotate(45deg);">
          </div>
          <div class="adimplencia-legend">
            <div v-for="(item, i) in adimplenciaData" :key="i" class="adimplencia-item">
              <div class="adimplencia-dot" :style="{ background: item.color }"></div>
              <div class="adimplencia-item-label">{{ item.name }}</div>
              <div class="adimplencia-item-value">{{ item.value }}</div>
            </div>
          </div>
        </div>
      </Card>
    </div>

    <!-- Lodges Grid -->
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <div class="dash-section-title">Lojas Subordinadas</div>
        <Button variant="ghost" size="sm">
          <template #iconRight><ArrowRight :size="14" /></template>
          Ver todas
        </Button>
      </div>
      <div class="lodges-grid">
        <div v-for="lodge in mockLodges" :key="lodge.id" class="lodge-card">
          <div class="lodge-card__header">
            <div>
              <div class="lodge-card__num">Loja #{{ lodge.number }}</div>
              <div class="lodge-card__name">{{ lodge.name }}</div>
              <div class="lodge-card__location">
                <MapPin :size="11" style="display: inline; margin-right: 3px;" />
                {{ lodge.city }}, {{ lodge.state }}
              </div>
            </div>
            <Badge
              :variant="lodge.status === 'regular' ? 'accent' : lodge.status === 'irregular' ? 'danger' : 'warning'"
              size="sm"
            >
              {{ lodge.status === 'regular' ? 'Regular' : lodge.status === 'irregular' ? 'Irregular' : 'Dormente' }}
            </Badge>
          </div>
          <div class="lodge-card__stats">
            <div class="lodge-stat">
              <div class="lodge-stat__value">{{ lodge.totalMembers }}</div>
              <div class="lodge-stat__label">Total</div>
            </div>
            <div class="lodge-stat">
              <div class="lodge-stat__value" style="color: var(--color-accent);">{{ lodge.activeMembers }}</div>
              <div class="lodge-stat__label">Ativos</div>
            </div>
            <div class="lodge-stat">
              <div class="lodge-stat__value" style="color: var(--color-text-muted);">{{ lodge.meetingDay.substring(0, 3) }}.</div>
              <div class="lodge-stat__label">Telhação</div>
            </div>
          </div>
          <div class="lodge-card__venerable">
            <User :size="11" />
            Ven.: {{ lodge.venerableName.replace('Ir. ', '') }}
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom row -->
    <div class="dash-content-grid">
      <!-- Activity Feed -->
      <Card padding="md">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div class="dash-section-title">Atividade Recente</div>
          <Button variant="ghost" size="sm">Ver tudo</Button>
        </div>
        <div class="activity-list">
          <div v-for="act in mockActivities" :key="act.id" class="activity-item">
            <div :class="['activity-icon', `activity-icon--${act.type}`]">
              <component :is="activityIcons[act.type]" :size="16" />
            </div>
            <div class="activity-body">
              <div class="activity-title">{{ act.title }}</div>
              <div class="activity-desc">{{ act.description }}</div>
            </div>
            <div class="activity-meta">
              <div class="activity-time">{{ formatDate(act.date) }}</div>
              <Badge v-if="act.lodge" variant="muted" size="sm">{{ act.lodge.replace('Loja ', '') }}</Badge>
            </div>
          </div>
        </div>
      </Card>

      <!-- Quick Actions -->
      <div style="display: flex; flex-direction: column; gap: var(--space-5);">
        <Card padding="md">
          <div class="dash-section-title" style="margin-bottom: 16px;">Ações Rápidas</div>
          <div class="quick-actions">
            <button class="quick-action-btn" id="qa-comunicado">
              <div class="quick-action-icon"><Send :size="16" /></div>
              <div class="quick-action-label">Comunicado</div>
              <div class="quick-action-sub">Enviar para lojas</div>
            </button>
            <button class="quick-action-btn" id="qa-nova-loja">
              <div class="quick-action-icon"><Building2 :size="16" /></div>
              <div class="quick-action-label">Nova Loja</div>
              <div class="quick-action-sub">Registrar oficina</div>
            </button>
            <button class="quick-action-btn" id="qa-relatorio">
              <div class="quick-action-icon"><BarChart3 :size="16" /></div>
              <div class="quick-action-label">Relatório</div>
              <div class="quick-action-sub">Exportar dados</div>
            </button>
            <button class="quick-action-btn" id="qa-carteirinha">
              <div class="quick-action-icon"><Users :size="16" /></div>
              <div class="quick-action-label">Carteirinhas</div>
              <div class="quick-action-sub">Emitir em lote</div>
            </button>
          </div>
        </Card>

        <Card padding="md">
          <div class="dash-section-title" style="margin-bottom: 16px;">Membros por Loja</div>
          <!-- Mock Bar Chart -->
          <div style="display: flex; align-items: flex-end; gap: 8px; height: 160px; padding-top: 20px;">
            <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; gap: 4px;">
              <div style="width: 14px; background: #4298B5; border-radius: 4px 4px 0 0; height: 100px;"></div>
              <div style="font-size: 9px; color: var(--color-text-muted);">Luz & Pro...</div>
            </div>
            <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; gap: 4px;">
              <div style="width: 14px; background: #4298B5; border-radius: 4px 4px 0 0; height: 120px;"></div>
              <div style="font-size: 9px; color: var(--color-text-muted);">União F...</div>
            </div>
            <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; gap: 4px;">
              <div style="width: 14px; background: #4298B5; border-radius: 4px 4px 0 0; height: 80px;"></div>
              <div style="font-size: 9px; color: var(--color-text-muted);">Luz do ...</div>
            </div>
            <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; gap: 4px;">
              <div style="width: 14px; background: #4298B5; border-radius: 4px 4px 0 0; height: 90px;"></div>
              <div style="font-size: 9px; color: var(--color-text-muted);">Estrela ...</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>
