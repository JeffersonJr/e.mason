<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Plus, Download, Eye, CreditCard } from 'lucide-vue-next'
import Card from '../components/ui/Card.vue'
import StatusBadge from '../components/ui/StatusBadge.vue'
import DegreeBadge from '../components/ui/DegreeBadge.vue'
import Button from '../components/ui/Button.vue'
import Avatar from '../components/ui/Avatar.vue'
import MemberProfileModal from '../components/modals/MemberProfileModal.vue'
import { mockMembers } from '../data/mockData'
import type { Member } from '../types'
import './Members.css'

const router = useRouter()
const search = ref('')
const officeGroup = ref('Todos')
const selectedMember = ref<Member | null>(null)
const profileModalMember = ref<Member | null>(null)

const officeGroups = ['Todos', 'Luzes', 'Cargos Administrativos', 'Irmãos']
const luzes = ['Venerável Mestre', '1º Vigilante', '2º Vigilante']
const cargosAdm = ['Secretário', 'Tesoureiro', 'Orador']

const filtered = computed(() => mockMembers.filter(m => {
  const matchSearch = m.name.toLowerCase().includes(search.value.toLowerCase()) ||
    (m.office || '').toLowerCase().includes(search.value.toLowerCase())
  const matchGroup = officeGroup.value === 'Todos'
    ? true
    : officeGroup.value === 'Luzes' ? luzes.includes(m.office || '')
    : officeGroup.value === 'Cargos Administrativos' ? cargosAdm.includes(m.office || '')
    : !luzes.includes(m.office || '') && !cargosAdm.includes(m.office || '')
  return matchSearch && matchGroup
}))

function handleOpenCarteirinha(member: Member) {
  router.push({ path: '/carteirinhas', query: { memberId: member.id } })
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR')
}

function getYear(dateStr: string) {
  return new Date(dateStr).getFullYear()
}
</script>

<template>
  <div class="members-page page-enter">
    <!-- Header actions -->
    <div class="members-toolbar">
      <div class="members-search-wrap">
        <Search :size="15" class="members-search-icon" />
        <input
          type="search"
          placeholder="Buscar por nome ou cargo..."
          v-model="search"
          class="members-search"
          id="members-search"
        />
      </div>
      <div class="members-filters">
        <button
          v-for="g in officeGroups"
          :key="g"
          :class="['members-filter-chip', officeGroup === g ? 'members-filter-chip--active' : '']"
          @click="officeGroup = g"
          :id="`filter-group-${g.replace(/\s/g, '-').toLowerCase()}`"
        >
          {{ g }}
        </button>
      </div>
      <div class="members-actions">
        <Button variant="outline" size="sm" id="export-btn">
          <template #icon><Download :size="14" /></template>
          Exportar
        </Button>
        <Button variant="accent" size="sm" id="add-member-btn">
          <template #icon><Plus :size="14" /></template>
          Novo Irmão
        </Button>
      </div>
    </div>

    <!-- Stats bar -->
    <div class="members-stats-bar">
      <div class="members-stat">
        <div class="members-stat__num">{{ mockMembers.length }}</div>
        <div class="members-stat__label">Total de Irmãos</div>
      </div>
      <div class="members-stat-divider"></div>
      <div class="members-stat">
        <div class="members-stat__num" style="color: var(--color-accent);">{{ mockMembers.filter(m => m.status === 'adimplente').length }}</div>
        <div class="members-stat__label">Adimplentes</div>
      </div>
      <div class="members-stat-divider"></div>
      <div class="members-stat">
        <div class="members-stat__num" style="color: var(--color-danger);">{{ mockMembers.filter(m => m.status === 'inadimplente').length }}</div>
        <div class="members-stat__label">Inadimplentes</div>
      </div>
      <div class="members-stat-divider"></div>
      <div class="members-stat">
        <div class="members-stat__num" style="color: var(--color-warning);">{{ mockMembers.filter(m => m.status === 'licenciado').length }}</div>
        <div class="members-stat__label">Licenciados</div>
      </div>
      <div class="members-stat-divider"></div>
      <div class="members-stat">
        <div class="members-stat__num">{{ filtered.length }}</div>
        <div class="members-stat__label">Exibindo</div>
      </div>
    </div>

    <div :class="['members-content', selectedMember ? 'members-content--split' : '']">
      <!-- Table -->
      <Card padding="none" class="members-table-card">
        <table class="members-table">
          <thead>
            <tr>
              <th>Irmão</th>
              <th>Cargo / Função</th>
              <th>Grau</th>
              <th>CIM</th>
              <th>Status</th>
              <th>Membro desde</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(m, idx) in filtered"
              :key="m.id"
              :class="['members-row', selectedMember?.id === m.id ? 'members-row--selected' : '']"
              @click="selectedMember = (m.id === selectedMember?.id ? null : m)"
              :style="{ animationDelay: `${idx * 0.04}s` }"
            >
              <td>
                <div class="member-name-cell">
                  <Avatar :initials="m.avatar" size="sm" :status="m.status" />
                  <div>
                    <div class="member-full-name">{{ m.name }}</div>
                    <div class="member-email">{{ m.email }}</div>
                  </div>
                </div>
              </td>
              <td>
                <div class="member-office">
                  {{ m.office }}
                  <span v-if="m.specialty" class="member-specialty">· {{ m.specialty }}</span>
                </div>
              </td>
              <td><DegreeBadge :degree="m.degree" /></td>
              <td><code class="member-cim">{{ m.cim }}</code></td>
              <td><StatusBadge :status="m.status" /></td>
              <td class="member-date">{{ getYear(m.joinedAt) }}</td>
              <td>
                <div class="member-actions" @click.stop>
                  <button
                    class="member-action-btn"
                    title="Ver Perfil Completo"
                    :id="`view-member-${m.id}`"
                    @click="profileModalMember = m"
                  >
                    <Eye :size="14" />
                  </button>
                  <button
                    class="member-action-btn"
                    title="Emitir Carteirinha"
                    :id="`carteirinha-member-${m.id}`"
                    @click="handleOpenCarteirinha(m)"
                  >
                    <CreditCard :size="14" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="filtered.length === 0" class="members-empty">
          <div class="members-empty__icon">🔍</div>
          <div>Nenhum irmão encontrado para os filtros selecionados.</div>
        </div>
      </Card>

      <!-- Detail panel -->
      <div v-if="selectedMember" class="member-detail-panel animate-slidein">
        <div class="member-detail-header">
          <Avatar :initials="selectedMember.avatar" size="lg" gradient />
          <div>
            <div class="member-detail-name">{{ selectedMember.name }}</div>
            <div class="member-detail-role">{{ selectedMember.office }}</div>
          </div>
          <button class="member-detail-close" @click="selectedMember = null">×</button>
        </div>

        <div class="member-detail-badges">
          <DegreeBadge :degree="selectedMember.degree" />
          <StatusBadge :status="selectedMember.status" />
        </div>

        <div class="member-detail-section">
          <div class="member-detail-label">CIM</div>
          <div class="member-detail-value"><code>{{ selectedMember.cim }}</code></div>
        </div>

        <div class="member-detail-section">
          <div class="member-detail-label">Loja</div>
          <div class="member-detail-value">{{ selectedMember.lodge }}</div>
        </div>

        <div class="member-detail-section">
          <div class="member-detail-label">E-mail</div>
          <div class="member-detail-value">{{ selectedMember.email }}</div>
        </div>

        <div class="member-detail-section">
          <div class="member-detail-label">Telefone</div>
          <div class="member-detail-value">{{ selectedMember.phone }}</div>
        </div>

        <div class="member-detail-section">
          <div class="member-detail-label">Membro desde</div>
          <div class="member-detail-value">{{ formatDate(selectedMember.joinedAt) }}</div>
        </div>

        <div v-if="selectedMember.specialty" class="member-detail-section">
          <div class="member-detail-label">Especialidade</div>
          <div class="member-detail-value">{{ selectedMember.specialty }}</div>
        </div>

        <div style="margin-top: auto; display: flex; flex-direction: column; gap: 8px;">
          <Button
            variant="primary"
            fullWidth
            @click="profileModalMember = selectedMember"
          >
            <template #icon><Eye :size="15" /></template>
            Ver Perfil Completo
          </Button>
          <Button
            variant="outline"
            fullWidth
            @click="handleOpenCarteirinha(selectedMember)"
          >
            <template #icon><CreditCard :size="15" /></template>
            Emitir Carteirinha
          </Button>
        </div>
      </div>
    </div>

    <!-- Member Profile Drawer Modal -->
    <MemberProfileModal
      v-if="profileModalMember"
      :member="profileModalMember"
      @close="profileModalMember = null"
      @open-carteirinha="handleOpenCarteirinha"
    />
  </div>
</template>
