// 全局前置路由守卫 - 初始化的时候被调用、每次路由切换之前被调用
import router from './router/index';
import store from './store';
import {getStore} from "@/utils/store.js";
import {ttGet, ttPost} from "@/utils/util.js";

router.beforeEach((to, from, next) => {
  if (to.matched[0] && to.matched[0].meta.bg) document.querySelector('body').setAttribute('style', 'background-color: ' + to.matched[0].meta.bg + ';')
  // 判断是否需要鉴权
  switch (to.meta.isAuth) {
    case 2: //后台token验证
      const value = to.query.src || to.fullPath;
      const label = to.query.name || to.name;
      const meta = to.meta || router.$avueRouter.meta || {};
      const i18n = to.query.i18n;
      var login_token = getStore({name: 'login_token'});
      //没有登录去到登陆页面
      if (!login_token) next('/cclladminlogin/login/login');
      //验证登录token是否正确
      store.commit('ADD_TAG', {
        label: label,
        value: value,
        params: to.params,
        query: to.query,
        meta: (() => {
          if (!i18n) {
            return meta
          }
          return {
            i18n: i18n
          }
        })(),
        group: []
      });
      next(); // 放行
      break;
    case 1: //前台用户token验证
      break;
    default:
      next(); // 放行
      break;
  }
});

router.afterEach((to, from) => {
  //将滚动条恢复到最顶端
  window.scrollTo(0, 0);
})
