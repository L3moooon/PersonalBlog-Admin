export const routes = [
  {
    path: '/',
    redirect: '/screen',
    component: () => import('@/layout/home.vue'),
    meta: {
      name: '网站数据',
      hidden: false
    },
    children: [
      {
        path: '/screen',
        component: () => import('@/view/dataOverview.vue'),
        meta: {
          name: '数据总览',
          hidden: false
        },
      },
      {
        path: '/visitor',
        component: () => import('@/view/visitor.vue'),
        meta: {
          name: '访客列表',
          hidden: false
        },
      },
      {
        path: '/buried',
        component: () => import('@/view/buried.vue'),
        meta: {
          name: '埋点列表',
          hidden: false
        },
      },
    ]
  },
  {
    path: '/workplace',
    component: () => import('@/layout/home.vue'),
    meta: {
      name: '控制台',
      hidden: false
    },
    children: [
      {
        path: '/user',
        component: () => import('@/view/user.vue'),
        meta: {
          name: '用户管理',
          hidden: false
        },
      },
      {
        path: '/article',
        component: () => import('@/view/article.vue'),
        meta: {
          name: '文章管理',
          hidden: false
        },
      },
      {
        path: '/comment',
        component: () => import('@/view/comment.vue'),
        meta: {
          name: '评论管理',
          hidden: false
        },
      },
    ]
  },

  {
    path: '/setting',
    redirect: '/theme',
    component: () => import('@/layout/home.vue'),
    meta: {
      name: '网站设置',
      hidden: false
    },
    children: [
      {
        path: '/theme',
        component: () => import('@/view/theme.vue'),
        meta: {
          name: '主题设置',
          hidden: false
        },
      },
      {
        path: '/music',
        component: () => import('@/view/music.vue'),
        meta: {
          name: '音乐盒设置',
          hidden: false
        },
      },
      {
        path: '/friendship',
        component: () => import('@/view/friendship.vue'),
        meta: {
          name: '友链设置',
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
    component: () => import('@/layout/notFound.vue')
  },
]
