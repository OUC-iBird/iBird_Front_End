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

现已完成顶部导航栏的初步UI（功能未绑定），使用方法:

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