import { createRouter, createWebHistory } from 'vue-router'

import BaseLayout from '@/layout/BaseLayout.vue'
import JournalPageRenderer from '@/components/JournalPageRenderer.vue'
import { ROUTES } from '@/constants/path'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: ROUTES.DEFAULT,
      name: 'Homepage',
      component: BaseLayout,
      children: [
        {
          path: ROUTES.JOURNAL,
          name: 'Journal',
          component: JournalPageRenderer
        }
      ]
    }
  ]
})

export default router
