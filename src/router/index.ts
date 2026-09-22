import { createRouter, createWebHistory } from 'vue-router'
// We will replace these with Vue components once they are created
import Dashboard from '../pages/Dashboard.vue'
import Members from '../pages/Members.vue'
import IdCards from '../pages/IdCards.vue'
import Documents from '../pages/Documents.vue'
import Finance from '../pages/Finance.vue'
import SiteBuilder from '../pages/SiteBuilder.vue'
import Lodges from '../pages/Lodges.vue'

const SettingsPlaceholder = {
  template: `
    <div class="placeholder-page">
      <div class="placeholder-page__icon">⚙️</div>
      <h2>Configurações</h2>
      <p>Módulo em desenvolvimento. Em breve disponível.</p>
    </div>
  `
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Dashboard },
    { path: '/obreiros', component: Members },
    { path: '/lojas', component: Lodges },
    { path: '/carteirinhas', component: IdCards },
    { path: '/documentos', component: Documents },
    { path: '/tesouraria', component: Finance },
    { path: '/site-builder', component: SiteBuilder },
    { path: '/configuracoes', component: SettingsPlaceholder },
  ]
})

export default router
