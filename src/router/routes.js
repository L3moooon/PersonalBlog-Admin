export const routes = [
  {
    path: '/',
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/layout/home.vue'),
        children: [
          //TODO 信息大屏(网站数据) 用户权限管理 文章管理 用户信息管理
        ]
      },

    ]
  },
  {
    //登录页
    path: '/login',
    component: () => import('@/layout/login.vue')
  },
  {
    path: '/404',
    component: () => import('@/layout/home.vue')
  },
]
