<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, Download, Eye, Lock, FileText, Book, Bell, FileCheck } from 'lucide-vue-next'
import Card from '../components/ui/Card.vue'
import Badge from '../components/ui/Badge.vue'
import Button from '../components/ui/Button.vue'
import { mockDocuments } from '../data/mockData'
import { useProfileStore } from '../stores/profile'
import type { Document } from '../types'
import './Documents.css'

const categoryIcons: Record<string, any> = {
  regulamento: FileText,
  ritual: Book,
  comunicado: Bell,
  ata: FileCheck,
  estatuto: FileText,
}

const categoryLabels: Record<string, string> = {
  regulamento: 'Regulamento',
  ritual: 'Ritual',
  comunicado: 'Comunicado',
  ata: 'Ata',
  estatuto: 'Estatuto',
}

const categoryColors: Record<string, string> = {
  regulamento: '#4298B5',
  ritual: '#6d28d9',
  comunicado: '#d97706',
  ata: '#00C288',
  estatuto: '#0F172A',
}

const store = useProfileStore()
const search = ref('')

// Main view: 'docs' or 'rituais'
const mainView = ref<'docs' | 'rituais'>('docs')

// Doc filters
const activeDocCategory = ref<string>('all')

// Ritual filters
const activeRitualDegree = ref<string>('all')
const activeRite = ref<string>('all')

const previewDoc = ref<Document | null>(null)

// Simulate user degree based on mode
const userDegree = computed(() => store.mode === 'potencia' ? 33 : store.mode === 'loja' ? 3 : 1)

const filtered = computed(() => {
  return mockDocuments.filter(d => {
    const matchSearch = d.title.toLowerCase().includes(search.value.toLowerCase()) ||
      d.tags.some(t => t.toLowerCase().includes(search.value.toLowerCase()))
      
    if (!matchSearch) return false

    if (mainView.value === 'docs') {
      if (d.category === 'ritual') return false
      if (activeDocCategory.value !== 'all' && d.category !== activeDocCategory.value) return false
      return true
    } else {
      if (d.category !== 'ritual') return false
      if (activeRitualDegree.value !== 'all' && d.degreeName !== activeRitualDegree.value) return false
      if (activeRitualDegree.value === 'Graus Filosóficos' && activeRite.value !== 'all' && d.rite !== activeRite.value) return false
      return true
    }
  })
})

const docCategories = computed(() => ['all', ...Array.from(new Set(mockDocuments.filter(d => d.category !== 'ritual').map(d => d.category)))])

const ritualDegrees = ['all', 'Aprendiz', 'Companheiro', 'Mestre', 'Mestre Instalado', 'Graus Filosóficos']
const philosophicalRites = ['all', 'REAA', 'Emulação', 'Arco Real', 'RER']

function docCatCount(cat: string) {
  if (cat === 'all') return mockDocuments.filter(d => d.category !== 'ritual').length
  return mockDocuments.filter(d => d.category === cat).length
}

const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="documents-page page-enter">
    <!-- Toolbar -->
    <div class="docs-toolbar">
      <div class="docs-search-wrap">
        <Search :size="15" class="docs-search-icon" />
        <input
          type="search"
          placeholder="Buscar documentos, rituais, tags..."
          v-model="search"
          class="docs-search"
          id="docs-search"
        />
      </div>
      <div style="display: flex; gap: 8px; margin-left: auto;">
        <Button v-if="store.mode !== 'irmao'" variant="accent" size="sm" id="upload-doc-btn">
          <template #icon><Download :size="14" /></template>
          + Publicar Documento
        </Button>
      </div>
    </div>

    <!-- Main Tabs -->
    <div style="display: flex; gap: 12px; margin-bottom: 16px;">
      <Button 
        :variant="mainView === 'docs' ? 'primary' : 'outline'" 
        @click="mainView = 'docs'; previewDoc = null"
      >
        Documentos Oficiais
      </Button>
      <Button 
        :variant="mainView === 'rituais' ? 'primary' : 'outline'" 
        @click="mainView = 'rituais'; previewDoc = null"
      >
        Rituais e Liturgia
      </Button>
    </div>

    <!-- Categories / Filters -->
    <div class="docs-categories" style="flex-direction: column; align-items: flex-start; gap: 12px;">
      <div v-if="mainView === 'docs'" style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button
          v-for="cat in docCategories"
          :key="cat"
          :class="['docs-category-chip', activeDocCategory === cat ? 'docs-category-chip--active' : '']"
          @click="activeDocCategory = cat"
          :id="`doc-category-${cat}`"
          :style="activeDocCategory === cat && cat !== 'all' ? { borderColor: categoryColors[cat], color: categoryColors[cat], background: `${categoryColors[cat]}12` } : {}"
        >
          <span v-if="cat !== 'all'" :style="{ color: categoryColors[cat] }">
            <component :is="categoryIcons[cat]" :size="18" />
          </span>
          {{ cat === 'all' ? 'Todos' : categoryLabels[cat] }}
          <span class="docs-category-count">{{ docCatCount(cat) }}</span>
        </button>
      </div>
      
      <div v-else style="display: flex; flex-direction: column; gap: 12px; width: 100%;">
        <!-- Degree filter -->
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button
            v-for="deg in ritualDegrees"
            :key="deg"
            :class="['docs-category-chip', activeRitualDegree === deg ? 'docs-category-chip--active' : '']"
            @click="activeRitualDegree = deg"
            :style="activeRitualDegree === deg ? { borderColor: categoryColors['ritual'], color: categoryColors['ritual'], background: `${categoryColors['ritual']}12` } : {}"
          >
            {{ deg === 'all' ? 'Todos os Graus' : deg }}
          </button>
        </div>

        <!-- Rite filter if Filosóficos -->
        <div v-if="activeRitualDegree === 'Graus Filosóficos'" style="display: flex; gap: 8px; flex-wrap: wrap; padding: 8px 12px; background: var(--color-surface-2); border-radius: 8px;">
          <span style="font-size: 0.85rem; font-weight: 600; color: var(--color-text-muted); display: flex; align-items: center;">Rito:</span>
          <button
            v-for="rite in philosophicalRites"
            :key="rite"
            :class="['docs-category-chip', activeRite === rite ? 'docs-category-chip--active' : '']"
            @click="activeRite = rite"
            :style="activeRite === rite ? { borderColor: 'var(--color-primary)', color: 'var(--color-primary)' } : { padding: '4px 12px', fontSize: '0.8rem' }"
          >
            {{ rite === 'all' ? 'Todos' : rite }}
          </button>
        </div>
      </div>
    </div>

    <div :class="['docs-content', previewDoc ? 'docs-content--split' : '']">
      <!-- Documents grid -->
      <div class="docs-grid">
        <div
          v-for="(doc, idx) in filtered"
          :key="doc.id"
          :class="['doc-card', (doc.minDegree > userDegree) ? 'doc-card--restricted' : '']"
          :style="{ animationDelay: `${idx * 0.06}s` }"
          @click="() => { if (!(doc.minDegree > userDegree)) previewDoc = (doc.id === previewDoc?.id ? null : doc) }"
        >
          <!-- Restricted overlay -->
          <div v-if="doc.minDegree > userDegree" class="doc-card__lock-overlay">
            <Lock :size="24" />
            <div class="doc-card__lock-text">Grau {{ doc.minDegree }}° Necessário</div>
          </div>

          <div class="doc-card__header" :style="{ filter: doc.minDegree > userDegree ? 'blur(2px)' : 'none' }">
            <div
              class="doc-card__icon"
              :style="{
                background: `${categoryColors[doc.category]}15`,
                color: categoryColors[doc.category]
              }"
            >
              <component :is="categoryIcons[doc.category]" :size="18" />
            </div>
            <div class="doc-card__meta">
              <Badge
                size="sm"
                :variant="doc.category === 'ritual' ? 'primary' : doc.category === 'comunicado' ? 'warning' : 'muted'"
              >
                {{ categoryLabels[doc.category] }}
              </Badge>
              <Badge v-if="doc.restricted" size="sm" variant="danger">Restrito</Badge>
            </div>
          </div>

          <div :style="{ filter: doc.minDegree > userDegree ? 'blur(3px)' : 'none' }">
            <div class="doc-card__title">{{ doc.title }}</div>
            <div class="doc-card__tags">
              <span v-for="tag in doc.tags.slice(0, 3)" :key="tag" class="doc-tag">#{{ tag }}</span>
            </div>
          </div>

          <div class="doc-card__footer" :style="{ filter: doc.minDegree > userDegree ? 'blur(2px)' : 'none' }">
            <div class="doc-card__info">
              <span>{{ doc.fileSize }}</span>
              <span class="doc-card__sep">·</span>
              <span>{{ new Date(doc.uploadedAt).toLocaleDateString('pt-BR') }}</span>
            </div>
            <div v-if="!(doc.minDegree > userDegree)" class="doc-card__actions">
              <button class="doc-action-btn" title="Visualizar" :id="`view-doc-${doc.id}`">
                <Eye :size="13" />
              </button>
              <button class="doc-action-btn" title="Baixar" :id="`download-doc-${doc.id}`">
                <Download :size="13" />
              </button>
            </div>
          </div>

          <!-- Watermark simulation for restricted -->
          <div v-if="doc.minDegree > userDegree" class="doc-card__watermark-pattern">
            <div v-for="i in 6" :key="i" class="doc-watermark-text">CONFIDENCIAL</div>
          </div>
        </div>

        <div v-if="filtered.length === 0" class="docs-empty">
          <div class="docs-empty__icon">📂</div>
          <div>Nenhum documento encontrado.</div>
        </div>
      </div>

      <!-- Preview panel -->
      <Card v-if="previewDoc" padding="md" class="docs-preview-panel animate-slidein">
        <div class="docs-preview-header">
          <div
            class="docs-preview-icon"
            :style="{
              background: `${categoryColors[previewDoc.category]}15`,
              color: categoryColors[previewDoc.category]
            }"
          >
            <component :is="categoryIcons[previewDoc.category]" :size="18" />
          </div>
          <div>
            <Badge size="sm" variant="muted">{{ categoryLabels[previewDoc.category] }}</Badge>
            <div class="docs-preview-title">{{ previewDoc.title }}</div>
          </div>
          <button class="docs-preview-close" @click="previewDoc = null">×</button>
        </div>

        <div class="docs-preview-meta">
          <div class="docs-preview-meta-item">
            <span class="docs-preview-meta-label">Tamanho</span>
            <span>{{ previewDoc.fileSize }}</span>
          </div>
          <div class="docs-preview-meta-item">
            <span class="docs-preview-meta-label">Publicado por</span>
            <span>{{ previewDoc.uploadedBy }}</span>
          </div>
          <div class="docs-preview-meta-item">
            <span class="docs-preview-meta-label">Data</span>
            <span>{{ new Date(previewDoc.uploadedAt).toLocaleDateString('pt-BR') }}</span>
          </div>
          <div class="docs-preview-meta-item">
            <span class="docs-preview-meta-label">Grau mínimo</span>
            <span>{{ previewDoc.minDegree }}° Grau</span>
          </div>
        </div>

        <div class="docs-preview-tags">
          <span v-for="tag in previewDoc.tags" :key="tag" class="doc-tag">#{{ tag }}</span>
        </div>

        <!-- Simulated preview -->
        <div class="docs-preview-body">
          <div class="docs-preview-watermark">
            CONFIDENCIAL · GOMB · {{ currentYear }}
          </div>
          <div class="docs-preview-lines">
            <div v-for="i in 8" :key="i" class="docs-preview-line" :style="{ width: `${70 + Math.random() * 30}%` }"></div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          <Button variant="primary" fullWidth>
            <template #icon><Eye :size="15" /></template>
            Visualizar Completo
          </Button>
          <Button variant="outline" fullWidth>
            <template #icon><Download :size="15" /></template>
            Baixar PDF
          </Button>
        </div>
      </Card>
    </div>
  </div>
</template>
