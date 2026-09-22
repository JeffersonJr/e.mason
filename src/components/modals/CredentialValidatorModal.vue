<script setup lang="ts">
import { computed } from 'vue'
import { X, Shield, CheckCircle } from 'lucide-vue-next'
import type { Member } from '../../types'
import Avatar from '../ui/Avatar.vue'
import './CredentialValidatorModal.css'

const props = defineProps<{
  member: Member | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const timestampStr = computed(() => {
  const now = new Date()
  return `${now.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })} às ${now.toLocaleTimeString('pt-BR')}`
})

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
  <div v-if="member" class="validator-overlay" @click="emit('close')">
    <div class="validator-modal" @click.stop>
      <!-- Header -->
      <div class="validator-header">
        <button class="validator-close" @click="emit('close')" title="Fechar validador">
          <X :size="18" />
        </button>
        <div class="validator-shield-icon">
          <Shield :size="24" />
        </div>
        <div class="validator-sub-tag">SEGURANÇA E AUTENTICAÇÃO</div>
        <h2 class="validator-title">Validador de Credenciais</h2>
      </div>

      <!-- Body -->
      <div class="validator-body">
        <div class="validator-card-box">
          <div class="validator-check-badge">
            <CheckCircle :size="28" />
          </div>

          <div class="validator-cred-status">CREDENCIAL VÁLIDA</div>
          <h3 class="validator-auth-title">Identidade Autenticada</h3>
          <p class="validator-auth-desc">
            Confirmamos que o irmão abaixo é regular e está devidamente registrado nos arquivos da 
            <strong> {{ member.lodge || 'A.R.L.S. Loja Luz e Progresso Nº 001' }}</strong>.
          </p>

          <!-- Member Card Summary -->
          <div class="validator-member-inner">
            <Avatar :initials="member.avatar" size="lg" gradient />
            <div class="validator-member-info">
              <div class="validator-member-name">{{ member.name }}</div>
              <div class="validator-member-degree">
                {{ member.degree === 33 ? 'MESTRE DO REAL SEGREDO (33º)' : member.degree === 3 ? 'MESTRE MAÇOM' : member.degree === 2 ? 'COMPANHEIRO MAÇOM' : 'APRENDIZ MAÇOM' }}
              </div>
              <div class="validator-member-meta-row">
                <span>📄 CIM: <strong>{{ member.cim }}</strong></span>
                <span>📅 Início: <strong>{{ formatDate(member.joinedAt) }}</strong></span>
              </div>
            </div>
          </div>

          <!-- Official Stamp -->
          <div class="validator-stamp-box">
            Consultado em: <strong>{{ timestampStr }}</strong><br />
            <span class="validator-stamp-gold">A.R.L.S. LOJA LUZ E PROGRESSO Nº 001</span><br />
            Oriente de São Luís · MA · Brasil<br />
            Filiada ao Grande Oriente Maçônico do Brasil (GOMB)
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
