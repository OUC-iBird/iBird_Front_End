import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/identify',
      meta: {
        title: "IBird"
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Register')
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/HomePage')
    },
    {
      path: '/identify',
      name: "Identification",
      component: () => import('@/views/BirdIdentify')
    },
    {
      path: '/center',
      name: "UserCenter",
      component: () => import('@/views/PersonalCenter')
    },
    {
      path: "/test",
      name: "test",
      component: () => import('@/views/test')
    },
    {
      path: "/404",
      name: "NotFound",
      component: () => import('@/views/404')
    },
    {
      path: "*",
      redirect: "/404"
    }
  ]
})
