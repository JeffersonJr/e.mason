<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, Plus, MapPin, Users, Calendar, Phone, Mail, ChevronRight, AlertTriangle, CheckCircle } from 'lucide-vue-next'
import Card from '../components/ui/Card.vue'
import Badge from '../components/ui/Badge.vue'
import Button from '../components/ui/Button.vue'
import { mockLodges } from '../data/mockData'
import type { Lodge } from '../types'
import './Lodges.css'

const search = ref('')
const selectedLodge = ref<Lodge | null>(null)

const filtered = computed(() => mockLodges.filter(l =>
  l.name.toLowerCase().includes(search.value.toLowerCase()) ||
  l.city.toLowerCase().includes(search.value.toLowerCase())
))

const regularLodgesCount = computed(() => mockLodges.filter(l => l.status === 'regular').length)
const irregularLodgesCount = computed(() => mockLodges.filter(l => l.status === 'irregular').length)
const totalMembers = computed(() => mockLodges.reduce((a, l) => a + l.totalMembers, 0))
</script>

<template>
  <div class="lodges-page page-enter">
    <div class="lodges-toolbar">
      <div class="lodges-search-wrap">
        <Search :size="15" class="lodges-search-icon" />
        <input
          type="search"
          placeholder="Buscar por nome, cidade..."
          v-model="search"
          class="lodges-search"
          id="lodges-search"
        />
      </div>
      <Button variant="accent" size="sm" id="add-lodge-btn">
        <template #icon><Plus :size="14" /></template>
        Registrar Nova Loja
      </Button>
    </div>

    <!-- Stats -->
    <div class="lodges-stats">
      <div class="lodge-stat-pill">
        <CheckCircle :size="14" style="color: var(--color-accent);" />
        <span>{{ regularLodgesCount }} Regulares</span>
      </div>
      <div class="lodge-stat-pill">
        <AlertTriangle :size="14" style="color: var(--color-danger);" />
        <span>{{ irregularLodgesCount }} Irregulares</span>
      </div>
      <div class="lodge-stat-pill">
        <Users :size="14" style="color: var(--color-primary);" />
        <span>{{ totalMembers }} Irmãos</span>
      </div>
    </div>

    <div :class="['lodges-content', selectedLodge ? 'lodges-content--split' : '']">
      <div class="lodges-grid-full">
        <div
          v-for="(lodge, idx) in filtered"
          :key="lodge.id"
          :class="['lodge-card-full', selectedLodge?.id === lodge.id ? 'lodge-card-full--selected' : '']"
          @click="selectedLodge = (lodge.id === selectedLodge?.id ? null : lodge)"
          :style="{ animationDelay: `${idx * 0.08}s` }"
        >
          <div class="lodge-card-full__top">
            <div class="lodge-card-full__header">
              <div>
                <div class="lodge-card-full__num">Loja #{{ lodge.number }}</div>
                <div class="lodge-card-full__name">{{ lodge.name }}</div>
              </div>
              <Badge
                :variant="lodge.status === 'regular' ? 'accent' : lodge.status === 'irregular' ? 'danger' : 'warning'"
              >
                {{ lodge.status === 'regular' ? 'Regular' : lodge.status === 'irregular' ? 'Irregular' : 'Dormente' }}
              </Badge>
            </div>

            <div class="lodge-card-full__location">
              <MapPin :size="12" />
              {{ lodge.city }}, {{ lodge.state }}
            </div>
          </div>

          <div class="lodge-card-full__stats">
            <div class="lodge-stat">
              <div class="lodge-stat__value">{{ lodge.totalMembers }}</div>
              <div class="lodge-stat__label">Total</div>
            </div>
            <div class="lodge-stat">
              <div class="lodge-stat__value" style="color: var(--color-accent);">{{ lodge.activeMembers }}</div>
              <div class="lodge-stat__label">Ativos</div>
            </div>
            <div class="lodge-stat">
              <div class="lodge-stat__value" :style="{ color: lodge.totalMembers - lodge.activeMembers > 0 ? 'var(--color-danger)' : 'var(--color-text-muted)' }">
                {{ lodge.totalMembers - lodge.activeMembers }}
              </div>
              <div class="lodge-stat__label">Inativ.</div>
            </div>
          </div>

          <div class="lodge-card-full__footer">
            <div class="lodge-card-full__venerable">
              <Users :size="11" />
              <span>Ven.: {{ lodge.venerableName }}</span>
            </div>
            <div class="lodge-card-full__meeting">
              <Calendar :size="11" />
              <span>{{ lodge.meetingDay }}, {{ lodge.meetingTime }}</span>
            </div>
            <ChevronRight :size="14" style="color: var(--color-text-muted); margin-left: auto;" />
          </div>
        </div>
      </div>

      <Card v-if="selectedLodge" padding="md" class="lodge-detail animate-slidein">
        <div class="lodge-detail__header">
          <div>
            <div style="font-size: var(--font-size-xs); color: var(--color-text-muted);">Loja #{{ selectedLodge.number }}</div>
            <div style="font-size: var(--font-size-lg); font-weight: var(--font-weight-bold); color: var(--color-text-primary); line-height: 1.3;">
              {{ selectedLodge.name }}
            </div>
          </div>
          <button @click="selectedLodge = null" class="lodge-detail__close">×</button>
        </div>

        <Badge :variant="selectedLodge.status === 'regular' ? 'accent' : 'danger'" dot>
          {{ selectedLodge.status === 'regular' ? 'Regular' : 'Irregular' }}
        </Badge>

        <div class="lodge-detail__info">
          <div class="lodge-detail__info-item">
            <div class="lodge-detail__info-icon"><MapPin :size="14" /></div>
            <div>
              <div class="lodge-detail__info-label">Localização</div>
              <div class="lodge-detail__info-value">{{ selectedLodge.city }}, {{ selectedLodge.state }}</div>
            </div>
          </div>
          <div class="lodge-detail__info-item">
            <div class="lodge-detail__info-icon"><Users :size="14" /></div>
            <div>
              <div class="lodge-detail__info-label">Venerável</div>
              <div class="lodge-detail__info-value">{{ selectedLodge.venerableName }}</div>
            </div>
          </div>
          <div class="lodge-detail__info-item">
            <div class="lodge-detail__info-icon"><Calendar :size="14" /></div>
            <div>
              <div class="lodge-detail__info-label">Telhação</div>
              <div class="lodge-detail__info-value">{{ selectedLodge.meetingDay }}, {{ selectedLodge.meetingTime }}</div>
            </div>
          </div>
          <div class="lodge-detail__info-item">
            <div class="lodge-detail__info-icon"><Mail :size="14" /></div>
            <div>
              <div class="lodge-detail__info-label">E-mail</div>
              <div class="lodge-detail__info-value">{{ selectedLodge.email }}</div>
            </div>
          </div>
          <div class="lodge-detail__info-item">
            <div class="lodge-detail__info-icon"><Phone :size="14" /></div>
            <div>
              <div class="lodge-detail__info-label">Telefone</div>
              <div class="lodge-detail__info-value">{{ selectedLodge.phone }}</div>
            </div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          <Button variant="primary" fullWidth>Ver Painel da Loja</Button>
          <Button variant="outline" fullWidth>Enviar Comunicado</Button>
        </div>
      </Card>
    </div>
  </div>
</template>
