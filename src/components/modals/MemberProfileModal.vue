<script setup lang="ts">
import { X, CreditCard, Download, ShieldCheck, Mail, Clock, Award } from 'lucide-vue-next'
import type { Member } from '../../types'
import Badge from '../ui/Badge.vue'
import StatusBadge from '../ui/StatusBadge.vue'
import DegreeBadge from '../ui/DegreeBadge.vue'
import Button from '../ui/Button.vue'
import Avatar from '../ui/Avatar.vue'
import './MemberProfileModal.css'

const props = defineProps<{
  member: Member | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'openCarteirinha', member: Member): void
}>()

function formatDate(dateStr?: string) {
  if (!dateStr) return '09 de Agosto de 2020'
  try {
    const parts = dateStr.split('-')
    if (parts.length === 3) {
      const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]))
      return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
    }
    return dateStr
  } catch {
    return dateStr
  }
}
</script>

<template>
  <div v-if="member" class="profile-modal-overlay" @click="emit('close')">
    <div class="profile-modal-drawer" @click.stop>
      <!-- Hero Header -->
      <div class="profile-drawer-hero">
        <button class="profile-drawer-close" @click="emit('close')" title="Fechar perfil">
          <X :size="18" />
        </button>
        
        <div class="profile-hero-top">
          <div class="profile-hero-avatar-wrap">
            <Avatar :initials="member.avatar" size="xl" gradient />
          </div>
          <div class="profile-hero-meta">
            <div class="profile-hero-cim">CIM: {{ member.cim }}</div>
            <h2 class="profile-hero-name">{{ member.name }}</h2>
            <div class="profile-hero-office">{{ member.office || member.role }} · {{ member.lodge || 'Loja Luz e Progresso Nº 001' }}</div>
            <div class="profile-hero-badges">
              <DegreeBadge :degree="member.degree" />
              <StatusBadge :status="member.status" />
              <Badge variant="primary" size="sm">Filiado ao G.O.M.B.</Badge>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons Bar -->
      <div class="profile-drawer-actions">
        <Button 
          variant="accent" 
          size="sm" 
          @click="emit('close'); emit('openCarteirinha', member)"
        >
          <template #icon><CreditCard :size="15" /></template>
          Emitir Carteirinha
        </Button>
        <Button variant="outline" size="sm">
          <template #icon><Download :size="15" /></template>
          Comprovante de Regularidade
        </Button>
      </div>

      <!-- Body Content -->
      <div class="profile-drawer-body">
        <!-- Dados Maçônicos -->
        <div class="profile-section-card">
          <div class="profile-section-header">
            <Award :size="18" class="profile-section-icon" />
            <span>Dados Maçônicos & Cadastro</span>
          </div>
          <div class="profile-info-grid">
            <div class="profile-info-item">
              <span class="profile-info-label">CIM Número</span>
              <span class="profile-info-value">{{ member.cim }}</span>
            </div>
            <div class="profile-info-item">
              <span class="profile-info-label">Grau Atual</span>
              <span class="profile-info-value">
                {{ member.degree === 33 ? '33º Mestre do Real Segredo' : member.degree === 3 ? '3º Grau — Mestre Maçom' : member.degree === 2 ? '2º Grau — Companheiro' : '1º Grau — Aprendiz' }}
              </span>
            </div>
            <div class="profile-info-item">
              <span class="profile-info-label">Cargo na Loja</span>
              <span class="profile-info-value">{{ member.office || member.role }}</span>
            </div>
            <div class="profile-info-item">
              <span class="profile-info-label">Loja Simbólica</span>
              <span class="profile-info-value">{{ member.lodge || 'Loja Luz e Progresso Nº 001' }}</span>
            </div>
            <div class="profile-info-item">
              <span class="profile-info-label">Potência Filiada</span>
              <span class="profile-info-value">G.O.M.B. (Grande Oriente)</span>
            </div>
            <div class="profile-info-item">
              <span class="profile-info-label">Oriente</span>
              <span class="profile-info-value">São Luís — MA</span>
            </div>
          </div>
        </div>

        <!-- Histórico Maçônico -->
        <div class="profile-section-card">
          <div class="profile-section-header">
            <Clock :size="18" class="profile-section-icon" />
            <span>Histórico de Graus & Datas</span>
          </div>
          <div class="profile-timeline">
            <div class="profile-timeline-node">
              <span class="profile-timeline-title">Iniciação no 1º Grau (Aprendiz)</span>
              <span class="profile-timeline-sub">{{ formatDate(member.joinedAt) }} — Loja Luz e Progresso Nº 001</span>
            </div>
            <div v-if="member.degree >= 2" class="profile-timeline-node">
              <span class="profile-timeline-title">Elevação ao 2º Grau (Companheiro)</span>
              <span class="profile-timeline-sub">14 de Março de 2022 — Loja Luz e Progresso Nº 001</span>
            </div>
            <div v-if="member.degree >= 3" class="profile-timeline-node">
              <span class="profile-timeline-title">Exaltação ao 3º Grau (Mestre Maçom)</span>
              <span class="profile-timeline-sub">20 de Novembro de 2023 — Loja Luz e Progresso Nº 001</span>
            </div>
          </div>
        </div>

        <!-- Dados Pessoais & Contato -->
        <div class="profile-section-card">
          <div class="profile-section-header">
            <Mail :size="18" class="profile-section-icon" />
            <span>Contato & Dados Pessoais</span>
          </div>
          <div class="profile-info-grid">
            <div class="profile-info-item">
              <span class="profile-info-label">E-mail Oficial</span>
              <span class="profile-info-value">{{ member.email }}</span>
            </div>
            <div class="profile-info-item">
              <span class="profile-info-label">Telefone / WhatsApp</span>
              <span class="profile-info-value">{{ member.phone }}</span>
            </div>
            <div class="profile-info-item">
              <span class="profile-info-label">Profissão / Especialidade</span>
              <span class="profile-info-value">{{ member.specialty || 'Engenharia / Administração' }}</span>
            </div>
            <div class="profile-info-item">
              <span class="profile-info-label">Data de Nascimento</span>
              <span class="profile-info-value">15/06/1984 (42 anos)</span>
            </div>
          </div>
        </div>

        <!-- Situação Administrativa -->
        <div class="profile-section-card">
          <div class="profile-section-header">
            <ShieldCheck :size="18" class="profile-section-icon" />
            <span>Situação Administrativa & Assiduidade</span>
          </div>
          <div class="profile-info-grid">
            <div class="profile-info-item">
              <span class="profile-info-label">Status de Quitação</span>
              <span class="profile-info-value" :style="{ color: member.status === 'adimplente' ? '#00C288' : '#EF4444' }">
                {{ member.status === 'adimplente' ? '● Quitado / Adimplente 2026' : '● Pendência Financeira' }}
              </span>
            </div>
            <div class="profile-info-item">
              <span class="profile-info-label">Assiduidade Telhações</span>
              <span class="profile-info-value">92% de presenças (2024-2026)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
