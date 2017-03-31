import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/pages/Index'
import Page1Index from '@/components/pages/page1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      components: {
        mainpage: Index
      }
    },
    {
      path: '/page1',
      components: {
        mainpage: Index
      },
      children: [
        {
          path: 'index',
          components: {
            pcontent: Page1Index
          }
        }
      ]

    }

  ]
})



