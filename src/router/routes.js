export const routes = [
  {
    path: '/',
    component: () => import('@/layout/home.vue'),
    meta: {
      name: '首页',
      hidden: false
    },
    children: [
      {
        path: 'data',
        component: () => import('@/view/data.vue'),
        meta: {
          name: '数据总览',
          hidden: false
        },
      },
      {
        path: 'user',
        component: () => import('@/view/user.vue'),
        meta: {
          name: '用户权限管理',
          hidden: false
        },
      },
      {
        path: 'article',
        component: () => import('@/view/article.vue'),
        meta: {
          name: '文章管理',
          hidden: false
        },
      },
    ]
  },
  {
    //登录页
    path: '/login',
    meta: {
      hidden: true
    },
    component: () => import('@/layout/login.vue')
  },
  {
    path: '/404',
    meta: {
      hidden: true
    },
    component: () => import('@/layout/home.vue')
  },
]
