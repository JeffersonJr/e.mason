import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ProfileMode, UserProfile } from '../types'
import { currentUser } from '../data/mockData'

export const useProfileStore = defineStore('profile', () => {
  const mode = ref<ProfileMode>('potencia')
  const activeLodgeId = ref('loj-001')
  const user = ref<UserProfile>(currentUser)

  function setMode(newMode: ProfileMode) {
    mode.value = newMode
  }

  function setActiveLodgeId(id: string) {
    activeLodgeId.value = id
  }

  return { mode, activeLodgeId, user, setMode, setActiveLodgeId }
})
