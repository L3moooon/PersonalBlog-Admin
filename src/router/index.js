import { createWebHistory, createRouter } from 'vue-router'
import { publicRoutes, anyRoutes } from './routes'
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
router.beforeEach(async (to, from, next) => {
  console.log(to);
  const token = useUserStore().token
  const menuList = useUserStore().menuList
  if (token) {
    console.log('有token');
    if (menuList.length) {
      console.log('有菜单', menuList);
      next()
    } else {
      console.log('没有菜单');
      try {
        await useUserStore().generateRoutes()
        console.log(menuList);
        next({ ...to, replace: true })
        // next()
      } catch (error) {
        useUserStore().logout()
        next({ path: '/login', query: { redirect: to.path } })
      }
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