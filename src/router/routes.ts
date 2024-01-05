import HomeView from '@/pages/home/index.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/shortmsg',
    name: 'shortmsg',
    component: () => import('@/pages/short-msg/index.vue'),
  },
  {
    path: '/messages',
    name: 'messages',
    component: () => import('@/pages/messages/index.vue'),
  },
  {
    path: '/article/:id',
    name: 'article',
    component: () => import('@/pages/article/detail.vue'),
  },
  {
    path: '/operate/:tag',
    name: 'operate',
    component: () => import('@/pages/article/operate.vue'),
  },
  {
    path: '/user/:id',
    name: 'user',
    component: () => import('@/pages/user/index.vue'),
  },
  {
    path: '/setting/:tag',
    name: 'setting',
    component: () => import('@/pages/setting/index.vue'),
  },
  {
    path: '/mobile',
    name: 'mobile',
    component: () => import('@/pages/other/mobile.vue'),
  },
]

export default routes
