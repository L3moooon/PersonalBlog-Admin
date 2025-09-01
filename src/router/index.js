import { createWebHistory, createRouter } from 'vue-router'
import { publicRoutes } from './routes'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'
const router = createRouter({
  history: createWebHistory(),
  routes: publicRoutes,
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 }
  },
})
//全局前置守卫
router.beforeEach((to, from, next) => {
  const token = useUserStore().token
  const name = useUserStore().user.name
  if (token) {
    if (!name) {
      useUserStore().login()
      next({ ...to })
    } else {
      next()
    }
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