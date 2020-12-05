import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/identify',

    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login'),
      meta: {
        title: "登录"
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Register'),
      meta: {
        title: "注册"
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/HomePage'),
      meta: {
        title: "主页"
      }
    },
    {
      path: '/identify',
      name: "Identification",
      component: () => import('@/views/BirdIdentify'),
      meta: {
        title: "iBird"
      }
    },
    {
      path: '/center',
      name: "UserCenter",
      component: () => import('@/views/PersonalCenter'),
      meta: {
        title: "个人中心"
      }
    },
    {
      path: "/404",
      name: "NotFound",
      component: () => import('@/views/404'),
      meta: {
        title: "404"
      }
    },
    {
      path: '/publish',
      name: "Publish",
      component: () => import('@/views/Publish'),
      meta: {
        title: "发布"
      }
    },
    {
      path: '/map',
      name: "Map",
      component: () => import('@/views/Map'),
      meta:{
        title: "地图"
      }
    },
    {
      path: '/moments',
      name: "MomentsList",
      component: () => import('@/views/MomentsList'),
      meta:{
        title: "动态列表"
      }
    },
    {
      path: "*",
      redirect: "/404"
    }
  ]
})
