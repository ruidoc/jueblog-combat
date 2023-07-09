import HomeView from '@/views/home/index.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/shortmsg',
    name: 'shortmsg',
    component: () => import('@/views/shortmsg/index.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/index.vue'),
  },
  {
    path: '/article/:id',
    name: 'article',
    component: () => import('@/views/article/detail.vue'),
  },
  {
    path: '/operate/:tag',
    name: 'operate',
    component: () => import('@/views/article/operate.vue'),
  },
]

export default routes
