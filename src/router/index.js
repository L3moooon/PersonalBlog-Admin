import { createWebHistory, createRouter } from 'vue-router'
import { routes, asyncRoutes, publicRoutes } from './routes'
import { ElMessage } from 'element-plus'

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 }
  },
})
//全局前置守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (token) {
    next()
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next('/login')
      ElMessage({
        type: "warning",
        message: "请先登录",
      });
    }
  }
})

export default router