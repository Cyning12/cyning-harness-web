import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ObsView from '../views/ObsView.vue'
import DocsView from '../views/DocsView.vue'
import WikiGraphView from '../views/WikiGraphView.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/obs', name: 'obs', component: ObsView },
    { path: '/docs', name: 'docs', component: DocsView },
    { path: '/wiki-graph', name: 'wiki-graph', component: WikiGraphView },
  ],
})
