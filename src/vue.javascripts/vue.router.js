
import Router from 'vue-router'
import Routes from './vue.router.routes'

const router = new Router({

  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  },
  routes: Routes
})

router.beforeEach( ( to, from, next ) => {

  let isLogin = sessionStorage.getItem('isLogin');
  let isRouterLogin = to.meta['isLogin'];
  if(isRouterLogin && !isLogin){
    sessionStorage.setItem('redirect',to.fullPath);
    next({ path: '/Login' });
  }else{
    next()
  }

});

export default router
