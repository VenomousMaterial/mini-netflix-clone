import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import MovieView from '@/views/MovieView.vue'
import ErrorView from '@/views/ErrorView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/movie/:id',
    name: 'movie',
    component: MovieView
  },
  {
    path: '/404',
    name: 'error',
    component: ErrorView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
