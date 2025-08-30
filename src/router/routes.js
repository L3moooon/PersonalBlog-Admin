import infoScan from '/src/assets/icons/数据.png'
import webInfo from '/src/assets/icons/data.png'
import visitor from '/src/assets/icons/访客管理.png'
import buried from '/src/assets/icons/数据埋点.png'
import log from '/src/assets/icons/监控.png'
import workplace from '/src/assets/icons/控制台.png'
import user from '/src/assets/icons/管理员.png'
import role from '/src/assets/icons/角色3.png'
import article from '/src/assets/icons/文章管理.png'
import comment from '/src/assets/icons/评论.png'
import web from '/src/assets/icons/网站.png'
import theme from '/src/assets/icons/主题.png'
import music from '/src/assets/icons/音乐盒-常态@1x.png'
import friendship from '/src/assets/icons/友情.png'

export const asyncRoutes = [
  {
    path: '/',
    redirect: 'overview',
    component: () => import('@/layout/home.vue'),
    meta: {
      hidden: true,
    },
    children: [
      {
        path: '/overview',
        component: () => import('@/views/overview.vue'),
        meta: {
          name: '首页',
          hidden: false,
          icon: infoScan
        },
      },
    ],
  },
  {
    path: '/data',
    redirect: '/data/visitor',
    component: () => import('@/layout/home.vue'),
    meta: {
      name: '网站数据',
      hidden: false,
      icon: webInfo
    },
    children: [
      {
        path: '/data/visitor',
        component: () => import('@/views/visitor.vue'),
        meta: {
          name: '访客列表',
          hidden: false,
          icon: visitor
        },
      },
      {
        path: '/data/buried',
        component: () => import('@/views/buried.vue'),
        meta: {
          name: '埋点列表',
          hidden: false,
          icon: buried
        },
      },
      {
        path: '/data/log',
        component: () => import('@/views/log.vue'),
        meta: {
          name: '监控日志',
          hidden: false,
          icon: log
        },
      },
    ]
  },
  {
    path: '/workplace',
    component: () => import('@/layout/home.vue'),
    meta: {
      name: '控制台',
      hidden: false,
      icon: workplace
    },
    children: [
      {
        path: '/workplace/user',
        component: () => import('@/views/administrator.vue'),
        meta: {
          name: '用户管理',
          hidden: false,
          icon: user
        },
      },
      {
        path: '/workplace/role',
        component: () => import('@/views/role.vue'),
        meta: {
          name: '角色管理',
          hidden: false,
          icon: role
        },
      },
      {
        path: '/workplace/article',
        component: () => import('@/views/article.vue'),
        meta: {
          name: '文章管理',
          hidden: false,
          icon: article
        },
      },
      {
        path: '/workplace/comment',
        component: () => import('@/views/comment.vue'),
        meta: {
          name: '评论管理',
          hidden: false,
          icon: comment
        },
      },
    ]
  },

  {
    path: '/setting',
    redirect: '/setting/theme',
    component: () => import('@/layout/home.vue'),
    meta: {
      name: '前台设置',
      hidden: false,
      icon: web
    },
    children: [
      {
        path: '/setting/theme',
        component: () => import('@/views/theme.vue'),
        meta: {
          name: '主题设置',
          hidden: false,
          icon: theme
        },
      },
      {
        path: '/setting/music',
        component: () => import('@/views/music.vue'),
        meta: {
          name: '音乐盒设置',
          hidden: false,
          icon: music
        },
      },
      {
        path: '/setting/friendship',
        component: () => import('@/views/friendship.vue'),
        meta: {
          name: '友链设置',
          hidden: false,
          icon: friendship
        },
      },
    ]
  },
]

export const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/layout/login.vue'),
    meta: {
      hidden: true
    },
  },
  {
    path: '/notfound',
    component: () => import('@/layout/notFound.vue'),
    meta: {
      hidden: true
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/notfound',
    meta: {
      hidden: true
    },
  }
]
export const routes = [...asyncRoutes, ...publicRoutes] // 实际项目中，asyncRoutes 需动态过滤