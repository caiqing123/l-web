import { createRouter, createWebHashHistory } from 'vue-router';
import { useUserStore } from '@/store';
import NProgress from 'nprogress';
import tool from '@/utils/tool';
import 'nprogress/nprogress.css';
import routes from './webRouter';

const title = import.meta.env.VITE_APP_NAME;
const defaultRoutePath = '/';
const whiteRoute = ['login', 'mineDoc'];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const userStore = useUserStore();
  const toTitle = to.meta.title ? to.meta.title : to.name;
  document.title = `${toTitle} - ${title}`;
  const token = tool.local.get("user_token");

  // 登录状态下

  // 未登录的情况下允许访问的路由
  if (token) {
    if (to.name === 'login') {
      next({ path: defaultRoutePath });
      return;
    }
    //
    if (!userStore.user && userStore.user === undefined) {
      const data = await userStore.requestUserInfo();
      if (!data) {
        userStore.clearToken();
        next({ name: 'login', query: { redirect: to.fullPath } });
      } else {
        next({ path: to.path, query: to.query });
      }
    } else {
      next();
    }
  } else if (!whiteRoute.includes(to.name)) {
    next({ name: 'login', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});

router.onError((error) => {
  console.log(error);
  NProgress.done();
});

export default router;
