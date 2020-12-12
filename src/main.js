// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入 element UI
import ElementUI from 'element-ui'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'element-ui/lib/theme-chalk/index.css'

// 引入swiper组件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
// 点击图片预览大图
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'
//main.js中引入并注册
import filters from "./utils/filters"
import vueCropper from 'vue-cropper'
import BaiduMap from 'vue-baidu-map'
import {check_login} from "./api/account";
//全局方法 Vue.filter() 统一注册自定义过滤器
Object.keys(filters).forEach(key => { //返回filters对象中属性名组成的数组
  Vue.filter(key, filters[key])
})
Vue.use(VueDirectiveImagePreviewer)
Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(vueCropper)
Vue.config.productionTip = false

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  // ak: 'YOUR_APP_KEY'
  ak: 'iAOwdWSIIwxZ0Phgo70U87B9OQ8tj47A'
})

router.beforeEach((to, from, next) => {
  /* 登录验证 */
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (check_login()){
      next();
    } else{
      console.log('该页面需要登录')
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

router.beforeResolve((to, from, next) => {
  /* 路由发生变化修改页面title */
  /* 在beforeEach后被调用 */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
