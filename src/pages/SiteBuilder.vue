<script setup lang="ts">
import { ref } from 'vue'
import {
  Monitor, Smartphone, Eye, Save, Plus, Settings,
  Image, Type, Layout, Columns, AlignLeft,
  Home, FileText, BookOpen, Phone, Globe, ArrowUp, ArrowDown, Trash2,
} from 'lucide-vue-next'
import Badge from '../components/ui/Badge.vue'
import Button from '../components/ui/Button.vue'
import MasonicHex from '../components/ui/MasonicHex.vue'
import './SiteBuilder.css'

type PreviewMode = 'desktop' | 'mobile'

const pages = [
  { id: 'home', label: 'Home', icon: Home, status: 'published' },
  { id: 'about', label: 'Sobre', icon: BookOpen, status: 'published' },
  { id: 'blog', label: 'Blog', icon: FileText, status: 'published' },
  { id: 'contact', label: 'Contato', icon: Phone, status: 'draft' },
  { id: 'members-portal', label: 'Portal do Irmão', icon: Globe, status: 'published' },
]

const blocks = [
  { id: 'hero', label: 'Hero / Banner', icon: Layout, type: 'layout' },
  { id: 'text', label: 'Bloco de Texto', icon: AlignLeft, type: 'content' },
  { id: 'columns', label: 'Colunas', icon: Columns, type: 'layout' },
  { id: 'image', label: 'Imagem', icon: Image, type: 'media' },
  { id: 'title', label: 'Título', icon: Type, type: 'content' },
]

const canvasBlocks = [
  { id: 'cb-1', type: 'hero' },
  { id: 'cb-2', type: 'columns' },
  { id: 'cb-3', type: 'text' },
]

const activePage = ref('home')
const previewMode = ref<PreviewMode>('desktop')
const selectedBlock = ref<string | null>('cb-1')
const showSaved = ref(false)

function handleSave() {
  showSaved.value = true
  setTimeout(() => showSaved.value = false, 2500)
}
</script>

<template>
  <div class="site-builder page-enter">
    <!-- Top bar -->
    <div class="sb-topbar">
      <div class="sb-topbar-left">
        <div class="sb-site-url">
          <Globe :size="14" />
          <span>luzeprogresso.gomb.org.br</span>
          <Badge variant="accent" size="sm">Publicado</Badge>
        </div>
      </div>

      <div class="sb-topbar-center">
        <div class="sb-preview-switcher">
          <button
            :class="['sb-preview-btn', previewMode === 'desktop' ? 'sb-preview-btn--active' : '']"
            @click="previewMode = 'desktop'"
            id="preview-desktop"
          >
            <Monitor :size="15" />
            Desktop
          </button>
          <button
            :class="['sb-preview-btn', previewMode === 'mobile' ? 'sb-preview-btn--active' : '']"
            @click="previewMode = 'mobile'"
            id="preview-mobile"
          >
            <Smartphone :size="15" />
            Mobile
          </button>
        </div>
      </div>

      <div class="sb-topbar-right">
        <Button variant="ghost" size="sm" id="preview-site-btn">
          <template #icon><Eye :size="14" /></template>
          Preview
        </Button>
        <Button
          :variant="showSaved ? 'accent' : 'primary'"
          size="sm"
          @click="handleSave"
          id="save-site-btn"
        >
          <template #icon><Save :size="14" /></template>
          {{ showSaved ? '✓ Salvo!' : 'Salvar' }}
        </Button>
      </div>
    </div>

    <div class="sb-workspace">
      <!-- Left: Pages & Blocks -->
      <div class="sb-sidebar">
        <!-- Pages -->
        <div class="sb-panel">
          <div class="sb-panel-header">
            <span>Páginas</span>
            <button class="sb-panel-add" id="add-page-btn"><Plus :size="13" /></button>
          </div>
          <div class="sb-pages-list">
            <button
              v-for="page in pages"
              :key="page.id"
              :class="['sb-page-item', activePage === page.id ? 'sb-page-item--active' : '']"
              @click="activePage = page.id"
              :id="`page-${page.id}`"
            >
              <span class="sb-page-icon"><component :is="page.icon" :size="14" /></span>
              <span class="sb-page-label">{{ page.label }}</span>
              <Badge
                size="sm"
                :variant="page.status === 'published' ? 'accent' : 'warning'"
              >
                {{ page.status === 'published' ? 'Pub.' : 'Rascunho' }}
              </Badge>
            </button>
          </div>
        </div>

        <!-- Block library -->
        <div class="sb-panel">
          <div class="sb-panel-header">
            <span>Adicionar Bloco</span>
          </div>
          <div class="sb-blocks-grid">
            <button v-for="block in blocks" :key="block.id" class="sb-block-item" :id="`block-${block.id}`" draggable="true">
              <div class="sb-block-icon"><component :is="block.icon" :size="16" /></div>
              <div class="sb-block-label">{{ block.label }}</div>
            </button>
          </div>
        </div>
      </div>

      <!-- Center: Canvas -->
      <div class="sb-canvas-area">
        <div :class="['sb-canvas', previewMode === 'mobile' ? 'sb-canvas--mobile' : '']">
          <!-- Simulated browser chrome -->
          <div class="sb-browser-chrome">
            <div class="sb-browser-dots">
              <div style="background: #ff5f57;"></div>
              <div style="background: #febc2e;"></div>
              <div style="background: #28c840;"></div>
            </div>
            <div class="sb-browser-url">
              🔒 {{ activePage === 'home' ? '' : activePage + '.' }}luzeprogresso.gomb.org.br
            </div>
          </div>

          <div class="sb-canvas-content">
            <!-- Simulated nav -->
            <div class="canvas-nav">
              <div class="canvas-nav__brand">
                <MasonicHex :size="22" variant="gradient" />
                <span>Luz e Progresso</span>
              </div>
              <div class="canvas-nav__links">
                <div v-for="l in ['Início', 'Sobre', 'Blog', 'Contato']" :key="l" class="canvas-nav__link">{{ l }}</div>
              </div>
              <div class="canvas-nav__cta">Portal</div>
            </div>

            <!-- Blocks -->
            <div
              v-for="block in canvasBlocks"
              :key="block.id"
              :class="['canvas-block', selectedBlock === block.id ? 'canvas-block--selected' : '']"
              @click="selectedBlock = block.id"
            >
              <div v-if="selectedBlock === block.id" class="canvas-block__controls">
                <div class="canvas-block__label">{{ block.type }}</div>
                <div class="canvas-block__actions">
                  <button class="canvas-block__action-btn" title="Mover para cima"><ArrowUp :size="12" /></button>
                  <button class="canvas-block__action-btn" title="Mover para baixo"><ArrowDown :size="12" /></button>
                  <button class="canvas-block__action-btn" title="Configurações"><Settings :size="12" /></button>
                  <button class="canvas-block__action-btn canvas-block__action-btn--danger" title="Remover"><Trash2 :size="12" /></button>
                </div>
              </div>

              <!-- Render specific block preview based on type -->
              <div v-if="block.type === 'hero'" class="canvas-hero-preview">
                <div class="canvas-hero-preview__content">
                  <div class="canvas-hero-preview__badge">Grande Oriente do Maranhão e Balsas</div>
                  <div class="canvas-hero-preview__title">Bem-vindo à<br />Loja Luz e Progresso</div>
                  <div class="canvas-hero-preview__sub">Fraternidade, igualdade e progresso — desde 1965.</div>
                  <div class="canvas-hero-preview__actions">
                    <div class="canvas-hero-preview__btn canvas-hero-preview__btn--accent">Conheça a Loja</div>
                    <div class="canvas-hero-preview__btn canvas-hero-preview__btn--outline">Contato</div>
                  </div>
                </div>
              </div>
              
              <div v-if="block.type === 'columns'" class="canvas-columns-preview">
                <div v-for="(t, i) in ['Fraternidade', 'Igualdade', 'Liberdade']" :key="i" class="canvas-col-card">
                  <div class="canvas-col-card__icon">
                    <MasonicHex :size="32" :variant="i === 1 ? 'accent' : 'gradient'" />
                  </div>
                  <div class="canvas-col-card__title">{{ t }}</div>
                  <div class="canvas-col-card__desc">Pilar fundamental da maçonaria moderna e humanista.</div>
                </div>
              </div>
              
              <div v-if="block.type === 'text'" class="canvas-text-preview">
                <div class="canvas-text-preview__title">Nossa História</div>
                <div class="canvas-text-preview__body">
                  Fundada em 22 de agosto de 1965, a Loja Luz e Progresso tem sido um farol de sabedoria e fraternidade na capital maranhense. Com quase seis décadas de existência, nossa loja tem formado homens íntegros e contribuído para a construção de uma sociedade mais justa.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Properties -->
      <div class="sb-properties">
        <div class="sb-properties-header">
          <span>Propriedades</span>
          <Badge v-if="selectedBlock" variant="primary" size="sm">
            {{ canvasBlocks.find(b => b.id === selectedBlock)?.type || 'bloco' }}
          </Badge>
        </div>

        <div v-if="selectedBlock" class="sb-properties-content">
          <div class="sb-prop-section">
            <div class="sb-prop-section-title">Layout</div>
            <div class="sb-prop-group">
              <label class="sb-prop-label">Padding</label>
              <select class="sb-prop-select">
                <option>Médio (40px)</option>
                <option>Pequeno (20px)</option>
                <option>Grande (80px)</option>
                <option>Nenhum</option>
              </select>
            </div>
            <div class="sb-prop-group">
              <label class="sb-prop-label">Alinhamento</label>
              <div class="sb-prop-align">
                <button v-for="(arrow, i) in ['←', '=', '→']" :key="i" :class="['sb-prop-align-btn', i === 1 ? 'sb-prop-align-btn--active' : '']">
                  {{ arrow }}
                </button>
              </div>
            </div>
          </div>

          <div class="sb-prop-section">
            <div class="sb-prop-section-title">Aparência</div>
            <div class="sb-prop-group">
              <label class="sb-prop-label">Cor de Fundo</label>
              <div class="sb-prop-colors">
                <div
                  v-for="(color, i) in ['#FFFFFF', '#F8FAFC', '#4298B5', '#0f2233', 'gradient']"
                  :key="i"
                  :class="['sb-prop-color', i === 2 ? 'sb-prop-color--active' : '']"
                  :style="{
                    background: color === 'gradient' ? 'linear-gradient(135deg, #4298B5, #00C288)' : color,
                    border: color === '#FFFFFF' ? '1.5px solid var(--color-border)' : 'none',
                  }"
                ></div>
              </div>
            </div>
            <div class="sb-prop-group">
              <label class="sb-prop-label">Altura mínima</label>
              <input type="text" value="500px" class="sb-prop-input" />
            </div>
          </div>

          <div class="sb-prop-section">
            <div class="sb-prop-section-title">Tipografia</div>
            <div class="sb-prop-group">
              <label class="sb-prop-label">Fonte</label>
              <select class="sb-prop-select">
                <option>Plus Jakarta Sans</option>
                <option>Inter</option>
                <option>Merriweather</option>
              </select>
            </div>
          </div>

          <Button variant="primary" fullWidth size="sm">Aplicar Alterações</Button>
        </div>
        <div v-else class="sb-properties-empty">
          <div class="sb-properties-empty__icon">🎨</div>
          <div>Selecione um bloco para editar suas propriedades</div>
        </div>
      </div>
    </div>
  </div>
</template>
