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
    component: () => import('@/views/short-msg/index.vue'),
  },
  {
    path: '/messages',
    name: 'messages',
    component: () => import('@/views/messages/index.vue'),
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
  {
    path: '/user/:id',
    name: 'user',
    component: () => import('@/views/user/index.vue'),
  },
]

export default routes
