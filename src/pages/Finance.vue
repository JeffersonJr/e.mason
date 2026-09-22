<script setup lang="ts">
import { ref, computed } from 'vue'
import { DollarSign, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Plus, Download } from 'lucide-vue-next'
import MetricCard from '../components/ui/MetricCard.vue'
import Card from '../components/ui/Card.vue'
import Badge from '../components/ui/Badge.vue'
import Button from '../components/ui/Button.vue'
import { mockFinancial } from '../data/mockData'
import './Finance.css'

const typeFilter = ref<'all' | 'credit' | 'debit'>('all')

const total = computed(() => mockFinancial.reduce((acc, e) => e.type === 'credit' ? acc + e.amount : acc - e.amount, 0))
const totalCredit = computed(() => mockFinancial.filter(e => e.type === 'credit').reduce((acc, e) => acc + e.amount, 0))
const totalDebit = computed(() => mockFinancial.filter(e => e.type === 'debit').reduce((acc, e) => acc + e.amount, 0))

const filtered = computed(() => mockFinancial.filter(e => typeFilter.value === 'all' || e.type === typeFilter.value))

function formatMoney(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR')
}
</script>

<template>
  <div class="finance-page page-enter">
    <!-- Metrics -->
    <div class="dash-metrics-grid">
      <MetricCard
        label="Saldo em Caixa"
        :value="formatMoney(total)"
        :change="12.5"
        changeLabel="vs. mês anterior"
        accentColor="#00C288"
      >
        <template #icon><DollarSign :size="20" /></template>
      </MetricCard>
      <MetricCard
        label="Receitas (Mês)"
        :value="formatMoney(totalCredit)"
        :change="5.2"
        changeLabel="vs. mês anterior"
        accentColor="#4298B5"
      >
        <template #icon><TrendingUp :size="20" /></template>
      </MetricCard>
      <MetricCard
        label="Despesas (Mês)"
        :value="formatMoney(totalDebit)"
        :change="-3.1"
        changeLabel="vs. mês anterior"
        accentColor="#EF4444"
      >
        <template #icon><TrendingDown :size="20" /></template>
      </MetricCard>
      <MetricCard
        label="Pendências"
        value="R$ 150,00"
        :change="-50"
        changeLabel="vs. mês anterior"
        accentColor="#F59E0B"
      >
        <template #icon><DollarSign :size="20" /></template>
      </MetricCard>
    </div>

    <!-- Chart -->
    <Card padding="md">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <div>
          <div class="dash-section-title" style="margin-bottom: 2px;">Fluxo de Caixa</div>
          <div style="font-size: var(--font-size-xs); color: var(--color-text-muted);">Receitas vs. Despesas — últimos 6 meses</div>
        </div>
        <div style="display: flex; gap: 12px; align-items: center;">
          <div style="display: flex; align-items: center; gap: 6px; font-size: 0.75rem; color: var(--color-text-muted);">
            <div style="width: 10px; height: 10px; border-radius: 50%; background: var(--color-accent);"></div> Receitas
          </div>
          <div style="display: flex; align-items: center; gap: 6px; font-size: 0.75rem; color: var(--color-text-muted);">
            <div style="width: 10px; height: 10px; border-radius: 50%; background: var(--color-danger);"></div> Despesas
          </div>
        </div>
      </div>
      
      <!-- Mock Area Chart -->
      <div style="width: 100%; height: 220px; position: relative;">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style="width: 100%; height: 100%;">
          <defs>
            <linearGradient id="receitaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stop-color="#00C288" stop-opacity="0.18" />
              <stop offset="95%" stop-color="#00C288" stop-opacity="0" />
            </linearGradient>
            <linearGradient id="despesaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stop-color="#EF4444" stop-opacity="0.12" />
              <stop offset="95%" stop-color="#EF4444" stop-opacity="0" />
            </linearGradient>
          </defs>
          <!-- Chart background grid -->
          <line x1="0" y1="20" x2="100" y2="20" stroke="var(--color-border)" stroke-width="0.5" stroke-dasharray="2 2" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="var(--color-border)" stroke-width="0.5" stroke-dasharray="2 2" />
          <line x1="0" y1="80" x2="100" y2="80" stroke="var(--color-border)" stroke-width="0.5" stroke-dasharray="2 2" />

          <!-- Receitas -->
          <path d="M0,100 L0,50 L20,40 L40,60 L60,30 L80,20 L100,15 L100,100 Z" fill="url(#receitaGrad)" />
          <polyline points="0,50 20,40 40,60 60,30 80,20 100,15" fill="none" stroke="#00C288" stroke-width="2" vector-effect="non-scaling-stroke" />
          
          <!-- Despesas -->
          <path d="M0,100 L0,80 L20,60 L40,40 L60,70 L80,65 L100,70 L100,100 Z" fill="url(#despesaGrad)" />
          <polyline points="0,80 20,60 40,40 60,70 80,65 100,70" fill="none" stroke="#EF4444" stroke-width="2" vector-effect="non-scaling-stroke" />
        </svg>
        <div style="display: flex; justify-content: space-between; position: absolute; bottom: 0; width: 100%; font-size: 11px; color: var(--color-text-muted);">
          <span>Out</span><span>Nov</span><span>Dez</span><span>Jan</span><span>Fev</span><span>Mar</span>
        </div>
      </div>
    </Card>

    <!-- Transactions -->
    <Card padding="none">
      <div class="finance-table-header">
        <div class="dash-section-title">Extrato de Lançamentos</div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <div class="finance-type-tabs">
            <button
              v-for="t in ['all', 'credit', 'debit'] as const"
              :key="t"
              :class="['finance-type-tab', typeFilter === t ? 'finance-type-tab--active' : '']"
              @click="typeFilter = t"
              :id="`finance-filter-${t}`"
            >
              {{ t === 'all' ? 'Todos' : t === 'credit' ? 'Receitas' : 'Despesas' }}
            </button>
          </div>
          <Button variant="outline" size="sm">
            <template #icon><Download :size="14" /></template>
            Exportar
          </Button>
          <Button variant="accent" size="sm" id="new-entry-btn">
            <template #icon><Plus :size="14" /></template>
            Novo Lançamento
          </Button>
        </div>
      </div>

      <table class="finance-table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Membro</th>
            <th>Data</th>
            <th>Status</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, idx) in filtered" :key="entry.id" class="finance-row" :style="{ animationDelay: `${idx * 0.05}s` }">
            <td>
              <div class="finance-entry">
                <div :class="['finance-entry-icon', `finance-entry-icon--${entry.type}`]">
                  <ArrowUpRight v-if="entry.type === 'credit'" :size="14" />
                  <ArrowDownRight v-else :size="14" />
                </div>
                <div class="finance-entry-desc">{{ entry.description }}</div>
              </div>
            </td>
            <td>
              <Badge variant="muted" size="sm">{{ entry.category }}</Badge>
            </td>
            <td class="finance-member">{{ entry.member || '—' }}</td>
            <td class="finance-date">{{ formatDate(entry.date) }}</td>
            <td>
              <Badge
                size="sm"
                :variant="entry.status === 'paid' ? 'accent' : entry.status === 'pending' ? 'warning' : 'danger'"
                dot
              >
                {{ entry.status === 'paid' ? 'Pago' : entry.status === 'pending' ? 'Pendente' : 'Atrasado' }}
              </Badge>
            </td>
            <td>
              <span :class="['finance-amount', `finance-amount--${entry.type}`]">
                {{ entry.type === 'credit' ? '+' : '-' }}{{ formatMoney(entry.amount) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  </div>
</template>
