# ibird-vue

这是中国海洋大学2020年秋季学期软件工程课程设计 ibird 项目的前端代码仓库

## 项目技术栈

Vue + ElementUI

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# install element-ui
npm i element-ui -S

# install axios
npm install axios
npm install --save axios vue-axios

# install a map components power by baidu-map
npm i --save vue-baidu-map

# install a img cropper components
npm install --save vue-cropper


# install local cache components
# npm install good-storage

* 增加了轮播图组件：3.1.3版本的vue-awesome-swiper，5.4.5版本的swiper
* 增加了点击图片预览大图组件vue-directive-image-previewer
```

## 项目组织

所有页面的相关代码写在 src 文件夹下

- static: 静态文件，如图片，抽空搬到 assets 里最好
- styles: .scss 文件，如果需要的话
- router: 项目路由
- assets: 放图片，字体之类的
- api: 前端接口函数
- utils: 组件 js，遵循 Vue 全局组件的写法，可以方便 api 内的函数调用
- views: 前端页面的代码
- components: 前端组件


## 指南

### 组件使用

```vue
<template>
    <div class="navbar">
    <ibird-nav />
    </div>
</template>

<script>
import NavBar from '../components/navbar'
export default {
    components: {
        "ibird-nav": NavBar
    },
    data(){
        return{

        }
    },
}
</script>
```

- 增加了个人动态卡片的子组件，使用方法（有问题提issue）:

```
# 这里是参数的类型和具体的含义
    username: {  # 将要显示的用户名
      type: String,
      default: "Ctwo"
    },
    avatar: {  # 头像
      type: String,
      default: "../static/img/avatar_default",
    },
    ptime: { # 时间
      type: String,
      default: "1分钟前",
    },
    thumbnail_img: {  # 发的图片的缩略图
      type: String,
      default: "../static/img/moments_test.jpg",
    },
    preview_img: {  # 发的图片的查看大图
      type: Array,
      default: () => {
        return ["../static/img/moments_test.jpg"]
      }
    },
    moment: {  # 分享内容
      type: String,
      default: "前端好难啊啊啊啊啊啊啊啊啊..."
    },
    location: {  # 地点
      type: String,
      default: "青岛-崂山区"
    },
    location_visible: {  # 是否显示地点
      type: Boolean,
      default: true
    },
    thumb: {  # 点赞
      type: Object,
      default: ()=>{
        return {
          thumb_num: 0,  # 点赞次数
          thumb_visible: true,  # 是否可见
          thumb_status: true,  # 赞（不赞是false）
        }
      }
    }

```

```vue
<template>
    <div>
    <ibird-moments
     :username=your_name
     ......
     />
    </div>
</template>
<script>
import MomentsCard from '../components/MomentsCard'
export default {
  components: {
    'ibird-moments': MomentsCard,
  },
}
</script>
```

### 跨域问题

要求后端和前端同时支持跨域

后端支持：
- 增加配置跨域 Options 请求的配置
```
access-control-allow-credentials: true
access-control-allow-methods: GET, POST, OPTIONS, DELETE
access-control-allow-origin: xxxx  // 允许的域名
access-control-allow-headers: DNT, X-Mx-ReqToken,Keep-Alive, User-Agent,X-Requested-With // 允许的 header 类型
```


- SameSite 属性（可选）
```
Chrome 51 开始，浏览器的 Cookie 新增加了一个SameSite属性，用来防止 CSRF 攻击和用户追踪。

SameSite 有3个值
1.Strict
Strict最为严格，完全禁止第三方 Cookie，跨站点时，任何情况下都不会发送 Cookie。
换言之，只有当前网页的 URL 与请求目标一致，才会带上 Cookie。
比如，当前网页有一个 GitHub 链接，用户点击跳转就不会带有 GitHub 的 Cookie，跳转过去总是未登陆状态。
2.Lax
规则稍稍放宽，大多数情况（AJAX，POST，Image，iframe）也是不发送第三方 Cookie，但是导航到目标网址的 Get 请求除外。
3.None
Chrome 计划将 Lax 变为默认设置。这时，网站可以选择显式关闭 SameSite 属性，将其设为None。
不过，前提是必须同时设置Secure属性（Cookie 只能通过 HTTPS 协议发送），否则无效。

```
前端支持：

```vue
// main.js
// 设置 axios 支持跨域
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;

// config/index.js
// 设置代理
// /api/login -> https://weparallelines.top/api/login
proxyTable: {
      '/api': {  // 拦截所有api里面url中以/api开头的接口
        target: 'https://weparallelines.top',  // 代理目标的域名
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/api': '/api'  // 重写以/api开头的这个部分为/api, 相当于不起作用, 但需要用的时候就在这里改
        }
      }
}
```

### 使用 Storage 避免反复请求接口

```
import storage from 'good-storage'
storage.set(key, val)

// 现已经有用户基本信息的本地缓存和登录状态的缓存
user_data : {
    "avatar": xxx,
    "username": xxx,
    "nickname": xxx
}
login: (username)
```




