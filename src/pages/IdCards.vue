<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Download, Printer, QrCode, ChevronLeft, ChevronRight, CreditCard, Smartphone, RotateCw, ShieldCheck, Search } from 'lucide-vue-next'
import Card from '../components/ui/Card.vue'
import StatusBadge from '../components/ui/StatusBadge.vue'
import DegreeBadge from '../components/ui/DegreeBadge.vue'
import Button from '../components/ui/Button.vue'
import Avatar from '../components/ui/Avatar.vue'
import CredentialValidatorModal from '../components/modals/CredentialValidatorModal.vue'
import { mockMembers, currentUser } from '../data/mockData'
import type { Member } from '../types'
import './IdCards.css'

const props = defineProps<{
  initialMember?: Member | null
}>()

const cardMode = ref<'vertical' | 'horizontal'>('vertical')
const selectedIdx = ref(0)
const isFlipped = ref(false)
const showValidator = ref(false)
const searchTerm = ref('')

if (props.initialMember) {
  const idx = mockMembers.findIndex(m => m.id === props.initialMember!.id)
  if (idx >= 0) {
    selectedIdx.value = idx
  }
}

const filteredMembers = computed(() => {
  return mockMembers.filter(m =>
    m.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    m.cim.includes(searchTerm.value) ||
    (m.office || '').toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const currentMember = computed(() => {
  return filteredMembers.value[selectedIdx.value] || mockMembers[0] || {
    ...currentUser,
    avatar: currentUser.avatar,
    office: currentUser.role,
    cim: currentUser.cim,
    phone: currentUser.phone,
    email: currentUser.email,
    joinedAt: currentUser.joinedAt,
    lodge: currentUser.lodge || '',
    specialty: currentUser.specialty,
  }
})

const degreeLabels: Record<number, string> = {
  1: 'Aprendiz Maçom',
  2: 'Companheiro Maçom',
  3: 'Mestre Maçom',
  33: 'REAA – 33° Grau',
}

function handlePrint() {
  window.print()
}

// QRCode simulation
function getQrPattern(size: number) {
  const cells = 10
  const pattern = Array.from({ length: cells * cells }, (_, i) => {
    const row = Math.floor(i / cells)
    const col = i % cells
    const isCorner = (row < 3 && col < 3) || (row < 3 && col >= cells - 3) || (row >= cells - 3 && col < 3)
    return isCorner || Math.random() > 0.45
  })
  return { cells, pattern }
}
const qrPattern = getQrPattern(100)
</script>

<template>
  <div class="idcards-page page-enter">
    <!-- Toolbar -->
    <div class="idcards-toolbar">
      <div class="idcards-mode-tabs">
        <button
          :class="['idcards-mode-tab', cardMode === 'vertical' ? 'idcards-mode-tab--active' : '']"
          @click="cardMode = 'vertical'"
          id="card-mode-vertical"
        >
          <Smartphone :size="16" />
          Digital (Vertical)
        </button>
        <button
          :class="['idcards-mode-tab', cardMode === 'horizontal' ? 'idcards-mode-tab--active' : '']"
          @click="cardMode = 'horizontal'"
          id="card-mode-horizontal"
        >
          <CreditCard :size="16" />
          Impressão PVC (Horizontal)
        </button>
      </div>
      <div style="display: flex; gap: 8px; margin-left: auto; flex-wrap: wrap;">
        <Button variant="outline" size="sm" @click="showValidator = true">
          <template #icon><ShieldCheck :size="14" /></template>
          Validar Autenticidade
        </Button>
        <Button variant="outline" size="sm" @click="handlePrint">
          <template #icon><Printer :size="14" /></template>
          Imprimir
        </Button>
        <Button variant="accent" size="sm" @click="handlePrint">
          <template #icon><Download :size="14" /></template>
          Baixar PDF
        </Button>
      </div>
    </div>

    <div class="idcards-content">
      <!-- Member selector -->
      <Card padding="none" class="idcards-selector">
        <div class="idcards-selector-header">
          <div class="idcards-selector-title">Selecionar Irmão</div>
          <div class="idcards-selector-count">{{ filteredMembers.length }} membros</div>
        </div>
        
        <div class="idcards-search-box">
          <Search :size="14" style="color: var(--color-text-secondary); margin-right: 6px;" />
          <input
            type="text"
            placeholder="Buscar por nome, CIM ou cargo..."
            v-model="searchTerm"
            @input="selectedIdx = 0"
            class="idcards-search-input"
          />
        </div>

        <div class="idcards-selector-list">
          <button
            v-for="(m, idx) in filteredMembers"
            :key="m.id"
            :class="['idcards-selector-item', idx === selectedIdx ? 'idcards-selector-item--active' : '']"
            @click="selectedIdx = idx; isFlipped = false"
            :id="`select-member-${m.id}`"
          >
            <Avatar :initials="m.avatar" size="sm" :status="m.status" />
            <div class="idcards-selector-info">
              <div class="idcards-selector-name">{{ m.name.replace('Ir. ', '') }}</div>
              <div class="idcards-selector-role">{{ m.office }}</div>
            </div>
            <DegreeBadge :degree="m.degree" />
          </button>
          <div v-if="filteredMembers.length === 0" style="padding: 24px; text-align: center; color: var(--color-text-secondary); font-size: 0.85rem;">
            Nenhum membro encontrado.
          </div>
        </div>
      </Card>

      <!-- Card preview -->
      <div class="idcards-preview-area">
        
        <!-- VERTICAL CARD -->
        <div v-if="cardMode === 'vertical'" :class="['card-flip-container', isFlipped ? 'flipped' : '']" @click="isFlipped = !isFlipped">
          <div class="card-flip-inner">
            <!-- FRONT SIDE -->
            <div class="card-flip-front">
              <svg class="card-watermark-seal" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="3" />
                <polygon points="50,15 80,75 20,75" fill="none" stroke="currentColor" stroke-width="2.5" />
                <polygon points="50,85 20,25 80,25" fill="none" stroke="currentColor" stroke-width="2.5" />
              </svg>
              
              <div class="card-ref-header">
                <div class="card-ref-header-left">
                  <div class="card-ref-logo">
                    <svg viewBox="0 0 100 100" style="width: 100%; height: 100%; border-radius: 50%; background: #FAF7F2;">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#B45309" stroke-width="4" />
                      <polygon points="50,20 75,70 25,70" fill="none" stroke="#B45309" stroke-width="3" />
                    </svg>
                  </div>
                  <div>
                    <div class="card-ref-title">GOMB</div>
                    <div class="card-ref-subtitle">MARANHÃO E BALSAS</div>
                  </div>
                </div>
                <div class="card-ref-badge">REGULAR</div>
              </div>

              <div class="card-ref-photo-box">
                <div style="width: 105px; height: 125px; margin: 0 auto;">
                  <Avatar :initials="currentMember.avatar" size="xl" gradient />
                </div>
              </div>

              <div class="card-ref-name">{{ currentMember.name }}</div>
              <div class="card-ref-degree">{{ degreeLabels[currentMember.degree] || `${currentMember.degree}º Grau` }} - {{ currentMember.office }}</div>

              <div class="card-ref-grid">
                <div class="card-ref-field">
                  <span class="card-ref-label">CIM</span>
                  <span class="card-ref-val">{{ currentMember.cim }}</span>
                </div>
                <div class="card-ref-field">
                  <span class="card-ref-label">Iniciação</span>
                  <span class="card-ref-val">{{ new Date(currentMember.joinedAt).toLocaleDateString('pt-BR') }}</span>
                </div>
                <div class="card-ref-field card-ref-full-col">
                  <span class="card-ref-label">Loja</span>
                  <span class="card-ref-val">{{ currentMember.lodge || 'A.R.L.S. União Fraternal Nº 001' }}</span>
                </div>
              </div>

              <div class="card-ref-footer">
                <span class="card-ref-motto">LIBERTAS QUAE SERA TAMEN</span>
                <span class="card-ref-affil">COMAB</span>
              </div>
            </div>

            <!-- BACK SIDE -->
            <div class="card-flip-back">
              <div class="card-back-header">
                CERTIFICADO DE REGULARIDADE MAÇÔNICA
              </div>

              <div style="font-size: 0.62rem; color: #1E293B; margin-top: 12px; line-height: 1.4;">
                Certificamos que o Irmão <strong>{{ currentMember.name }}</strong> é membro ativo e regular do quadro de obreiros desta augusta oficina, no gozo pleno de seus direitos maçônicos.
              </div>

              <div class="card-back-qr-box" @click.stop="showValidator = true">
                <!-- QR Code SVG Simulation -->
                <svg width="90" height="90" viewBox="0 0 90 90" style="display: block; border-radius: 6px; background: #fff; padding: 4px;">
                  <rect width="90" height="90" fill="white" />
                  <template v-for="(filled, i) in qrPattern.pattern" :key="i">
                    <rect
                      v-if="filled"
                      :x="(i % qrPattern.cells) * (90/qrPattern.cells) + 0.5"
                      :y="Math.floor(i / qrPattern.cells) * (90/qrPattern.cells) + 0.5"
                      :width="(90/qrPattern.cells) - 1"
                      :height="(90/qrPattern.cells) - 1"
                      fill="#0F172A"
                      rx="1"
                    />
                  </template>
                </svg>
              </div>
              <div class="card-back-qr-sub">Escaneie o código acima para validar a autenticidade desta credencial digital.</div>

              <div class="card-back-signatures">
                <div>
                  <div class="card-back-sig-line" />
                  <div class="card-back-sig-title">Ir. Venerável Mestre</div>
                  <div class="card-back-sig-sub">Venerável Mestre</div>
                </div>
                <div>
                  <div class="card-back-sig-line" />
                  <div class="card-back-sig-title">Ir. Secretário</div>
                  <div class="card-back-sig-sub">Guardador dos Selos</div>
                </div>
              </div>
              
              <div class="card-ref-footer" style="margin-top: 12px;">
                <span class="card-ref-affil">Validade: 31/12/2026</span>
              </div>
            </div>
          </div>
        </div>

        <!-- HORIZONTAL CARD -->
        <div v-else class="horizontal-cards-pair">
          <!-- Front PVC -->
          <div class="h-card-frame">
            <svg class="card-watermark-seal" viewBox="0 0 100 100" style="left: 70%; top: 50%;">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="3" />
              <polygon points="50,15 80,75 20,75" fill="none" stroke="currentColor" stroke-width="2.5" />
              <polygon points="50,85 20,25 80,25" fill="none" stroke="currentColor" stroke-width="2.5" />
            </svg>

            <div class="h-card-left-col">
              <Avatar :initials="currentMember.avatar" size="xl" gradient />
              <div class="card-ref-badge" style="margin-top: 12px;">REGULAR</div>
            </div>
            
            <div class="h-card-right-col">
              <div class="card-ref-header" style="padding-bottom: 6px; margin-bottom: 8px;">
                <div class="card-ref-header-left">
                  <div class="card-ref-logo">
                    <svg viewBox="0 0 100 100" style="width: 100%; height: 100%; border-radius: 50%; background: #FAF7F2;">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#B45309" stroke-width="4" />
                    </svg>
                  </div>
                  <div>
                    <div class="card-ref-title">GOMB</div>
                    <div class="card-ref-subtitle">GRANDE ORIENTE DO MARANHÃO E BALSAS</div>
                  </div>
                </div>
              </div>

              <div class="card-ref-name" style="font-size: 1.25rem;">{{ currentMember.name }}</div>
              <div class="card-ref-degree">{{ degreeLabels[currentMember.degree] || `${currentMember.degree}º Grau` }} - {{ currentMember.office }}</div>

              <div class="card-ref-grid" style="margin-top: auto; padding: 8px 12px;">
                <div class="card-ref-field">
                  <span class="card-ref-label">CIM</span>
                  <span class="card-ref-val">{{ currentMember.cim }}</span>
                </div>
                <div class="card-ref-field">
                  <span class="card-ref-label">Iniciação</span>
                  <span class="card-ref-val">{{ new Date(currentMember.joinedAt).toLocaleDateString('pt-BR') }}</span>
                </div>
                <div class="card-ref-field card-ref-full-col">
                  <span class="card-ref-label">Loja</span>
                  <span class="card-ref-val">{{ currentMember.lodge || 'A.R.L.S. União Fraternal Nº 001' }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Back PVC -->
          <div class="h-card-frame" style="flex-direction: row-reverse;">
            <div class="h-card-left-col" @click="showValidator = true" style="cursor: pointer; background: white; padding: 8px; border-radius: 12px; height: fit-content; border: 1px solid #E2D9C8; align-self: center;">
              <!-- QR Code SVG Simulation -->
              <svg width="90" height="90" viewBox="0 0 90 90" style="display: block; border-radius: 6px; background: #fff; padding: 4px;">
                <rect width="90" height="90" fill="white" />
                <template v-for="(filled, i) in qrPattern.pattern" :key="i">
                  <rect
                    v-if="filled"
                    :x="(i % qrPattern.cells) * (90/qrPattern.cells) + 0.5"
                    :y="Math.floor(i / qrPattern.cells) * (90/qrPattern.cells) + 0.5"
                    :width="(90/qrPattern.cells) - 1"
                    :height="(90/qrPattern.cells) - 1"
                    fill="#0F172A"
                    rx="1"
                  />
                </template>
              </svg>
              <div style="font-size: 0.45rem; text-align: center; margin-top: 4px; color: #64748B;">SCAN PARA VALIDAR</div>
            </div>
            
            <div class="h-card-right-col">
              <div class="card-back-header">CERTIFICADO DE IDENTIDADE MAÇÔNICA</div>
              <div style="font-size: 0.62rem; color: #1E293B; margin-top: 12px; line-height: 1.4;">
                O titular desta credencial está em pleno gozo de seus direitos maçônicos perante o Grande Oriente e a {{ currentMember.lodge || 'sua Loja' }}.
              </div>
              
              <div class="card-back-signatures" style="margin-top: auto;">
                <div>
                  <div class="card-back-sig-line" />
                  <div class="card-back-sig-title">Ir. Venerável Mestre</div>
                </div>
                <div>
                  <div class="card-back-sig-line" />
                  <div class="card-back-sig-title">Ir. Secretário</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="idcards-nav">
          <Button
            variant="outline"
            size="sm"
            @click="selectedIdx = Math.max(0, selectedIdx - 1); isFlipped = false"
            :disabled="selectedIdx === 0"
          >
            <template #icon><ChevronLeft :size="14" /></template>
            Anterior
          </Button>
          <span class="idcards-nav-count">{{ selectedIdx + 1 }} / {{ filteredMembers.length }}</span>
          <Button
            variant="outline"
            size="sm"
            @click="selectedIdx = Math.min(filteredMembers.length - 1, selectedIdx + 1); isFlipped = false"
            :disabled="selectedIdx === filteredMembers.length - 1"
          >
            <template #iconRight><ChevronRight :size="14" /></template>
            Próximo
          </Button>
        </div>
      </div>

      <!-- Info panel -->
      <Card padding="md" class="idcards-info-panel">
        <div class="idcards-info-title">Dados da Carteirinha Maçônica</div>
        <div class="idcards-info-grid">
          <div class="idcards-info-item">
            <div class="idcards-info-label">Portador</div>
            <div class="idcards-info-value">{{ currentMember.name }}</div>
          </div>
          <div class="idcards-info-item">
            <div class="idcards-info-label">CIM</div>
            <div class="idcards-info-value"><code>{{ currentMember.cim }}</code></div>
          </div>
          <div class="idcards-info-item">
            <div class="idcards-info-label">Cargo</div>
            <div class="idcards-info-value">{{ currentMember.office }}</div>
          </div>
          <div class="idcards-info-item">
            <div class="idcards-info-label">Grau</div>
            <div class="idcards-info-value">{{ degreeLabels[currentMember.degree] || `${currentMember.degree}º Grau` }}</div>
          </div>
          <div class="idcards-info-item">
            <div class="idcards-info-label">Status Quitação</div>
            <StatusBadge :status="currentMember.status" />
          </div>
          <div class="idcards-info-item">
            <div class="idcards-info-label">Validade</div>
            <div class="idcards-info-value">31/12/2026</div>
          </div>
        </div>

        <div class="idcards-qr-info">
          <div class="idcards-qr-title">Verificação de Autenticidade</div>
          <div class="idcards-qr-sub">
            A carteirinha digital possui validação via QR Code dinâmico conectado diretamente aos servidores do Grande Oriente.
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 16px;">
          <Button v-if="cardMode === 'vertical'" variant="outline" fullWidth @click="isFlipped = !isFlipped">
            <template #icon><RotateCw :size="15" /></template>
            {{ isFlipped ? 'Ver Frente da Carteirinha' : 'Girar Carteirinha (Ver Verso)' }}
          </Button>
          <Button variant="primary" fullWidth @click="showValidator = true">
            <template #icon><QrCode :size="15" /></template>
            Simular Leitura do QR Code
          </Button>
        </div>
      </Card>
    </div>

    <!-- Credential Validator Modal -->
    <CredentialValidatorModal
      v-if="showValidator"
      :member="currentMember"
      @close="showValidator = false"
    />
  </div>
</template>
