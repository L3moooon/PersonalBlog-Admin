import webInfo from '/src/assets/icons/数据 (1).png'
import infoScan from '/src/assets/icons/数据.png'
import visitor from '/src/assets/icons/访客管理.png'
import buried from '/src/assets/icons/数据埋点.png'
import log from '/src/assets/icons/监控.png'
import workplace from '/src/assets/icons/控制台.png'
import user from '/src/assets/icons/管理员.png'
import role from '/src/assets/icons/角色3.png'
import article from '/src/assets/icons/文章管理.png'
import comment from '/src/assets/icons/评论 (1).png'
import web from '/src/assets/icons/网站.png'
import theme from '/src/assets/icons/主题.png'
import music from '/src/assets/icons/音乐盒-常态@1x.png'
import friendship from '/src/assets/icons/友情.png'

export const routes = [
  {
    path: '/',
    redirect: '/screen',
    component: () => import('@/layout/home.vue'),
    meta: {
      name: '网站数据',
      hidden: false,
      icon: webInfo
    },
    children: [
      {
        path: '/screen',
        component: () => import('@/view/dataOverview.vue'),
        meta: {
          name: '数据总览',
          hidden: false,
          icon: infoScan
        },
      },
      {
        path: '/visitor',
        component: () => import('@/view/visitor.vue'),
        meta: {
          name: '访客列表',
          hidden: false,
          icon: visitor
        },
      },
      {
        path: '/buried',
        component: () => import('@/view/buried.vue'),
        meta: {
          name: '埋点列表',
          hidden: false,
          icon: buried
        },
      },
      {
        path: '/log',
        component: () => import('@/view/log.vue'),
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
        path: '/user',
        component: () => import('@/view/administrator.vue'),
        meta: {
          name: '用户管理',
          hidden: false,
          icon: user
        },
      },
      {
        path: '/role',
        component: () => import('@/view/role.vue'),
        meta: {
          name: '角色管理',
          hidden: false,
          icon: role
        },
      },
      {
        path: '/article',
        component: () => import('@/view/article.vue'),
        meta: {
          name: '文章管理',
          hidden: false,
          icon: article
        },
      },
      {
        path: '/comment',
        component: () => import('@/view/comment.vue'),
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
    redirect: '/theme',
    component: () => import('@/layout/home.vue'),
    meta: {
      name: '前台设置',
      hidden: false,
      icon: web
    },
    children: [
      {
        path: '/theme',
        component: () => import('@/view/theme.vue'),
        meta: {
          name: '主题设置',
          hidden: false,
          icon: theme
        },
      },
      {
        path: '/music',
        component: () => import('@/view/music.vue'),
        meta: {
          name: '音乐盒设置',
          hidden: false,
          icon: music
        },
      },
      {
        path: '/friendship',
        component: () => import('@/view/friendship.vue'),
        meta: {
          name: '友链设置',
          hidden: false,
          icon: friendship
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
