import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
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
      name: "Test",
      component: () => import('@/components/MomentsCard')
    }
  ]
})
