<template xmlns:el-col="http://www.w3.org/1999/html">
  <div class="content">
    <ibird-nav />
    <div class="top">
      <div class="left">
        <div class="swiper-container">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide><el-image :src="img1"  fill="fill" /></swiper-slide>
          <swiper-slide><el-image :src="img2"  fill="fill" /></swiper-slide>
          <swiper-slide><el-image :src="img3"  fill="fill" /></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
       </swiper>
      </div>
      </div>

      <div class="right">
        <el-image class="phone-img"
                  :src="src2"
                  fill="fill"
        >
        </el-image>
        <span class="label1">下载iBird APP</span>
        <span class="label2">海量鸟类，一键识别</span>
        <el-button type="danger" round v-on:click="popBox" >立即下载</el-button>
      </div>
    </div>

    <div class="box">
      <div class="xuxian1"></div>
      <div class="text">热门动态</div>
      <div class="xuxian2"></div>
    </div>


    <div class="infinite-list-wrapper" style="overflow:auto">
      <ul
        class="list"
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled">
        <el-row v-for="(i, index) in countData" v-if="index%2==0" :key="index">
          <el-col   :span="10"  :offset="0" push="3">
            <ibird-moments style="box-shadow: none; border: 0.1px solid #e0e0e0;"
                           class="moment-card"
                           username="组件传参测试"
                           moment="还行"
            />
          </el-col>
          <el-col   :span="10"  :offset="0" v-if="index+1<countData.length" push="2">
            <ibird-moments style="box-shadow: none; border: 0.1px solid #e0e0e0;"
                           class="moment-card"
                           username="试一下"
                           moment="原来如此"
            />
          </el-col>
        </el-row>
      </ul>
      <button v-if="loading" @click="more" class="load-button" >查看更多 ∨</button>
      <p v-if="noMore" style="color: #555555;font-size: 14px;margin-top:30px;margin-bottom: 50px;">没有更多数据啦(^_^)</p >
    </div>
    <ibird-footer pos="relative"/>
    <!-- 弹出框 -->
    <div id="popLayer"></div>
    <div id="popBox">
      <div class="close">
        <el-button  icon="el-icon-close" v-on:click="closeBox" style="border: none;"></el-button>
      </div>
      <div class="content1">
        <div class="tip">扫描二维码，下载安卓APP吧</div>
        <img class="icon" alt="" :src="src3">
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/navbar'
import Footer from '../components/footer'
import MomentsCard from '../components/MomentsCard'
// 引入插件
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  components: {
    'ibird-nav': NavBar,
    'ibird-footer': Footer,
    'ibird-moments': MomentsCard,
    swiper,
    swiperSlide
  },
  data() {
    return {
      img1 : "../static/img/img1.jpg",
      img2 : "../static/img/img2.jpg",
      img3 : "../static/img/img3.jpg",
      src2 : "../static/img/phone.png",
      src3 : "../static/img/icon.png",
      count: [1,2,3,4,5,6,7,8,9,0],
      loading: false,
      // 默认显示条数
      cou: 4,
      swiperOption: {
        loop: true,
        slidesPerView: 1,//数量
        slidesPerGroup: 1,//分几组
        direction : 'horizontal',//设置水平还是垂直vertical
        autoplay: {
          delay: 3000,//延迟时长
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        // 显示分页
        pagination: {
          el: ".swiper-pagination",
          clickable: true //允许分页点击跳转
        },
        // 设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    noMore() {
      // 判断加载条数是否大于列表数据长度
      return this.cou > this.count.length;
    },
    disabled() {
      // 加载完成
      return this.loading || this.noMore;
    },
    countData() {  // 计算属性使用切片生成新数组
      let data = [];
      // 大于四条，使用切片，返回新数组
      if (this.count.length > 4) {
        data = this.count.slice(0, this.cou);
        return data;
      } else {
        // 否则使用原来数组，不进行切片处理
        data = this.count
        return data;
      }

    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    console.log("this is current swiper instance object", this.swiper);
    // this.swiper.slideTo(3, 1000, false);
  },
  methods:{
    load() {
      this.loading = true;
    },
    more() {
      // 每次点击加四条
      this.cou += 4;
      this.loading = false;
    },

    /*点击弹出按钮*/
    popBox: function() {
      var popBox = document.getElementById("popBox");
      var popLayer = document.getElementById("popLayer");
      popBox.style.display = "block";
      popLayer.style.display = "block";
    },
    /*点击关闭按钮*/
    closeBox: function() {
      var popBox = document.getElementById("popBox");
      var popLayer = document.getElementById("popLayer");
      popBox.style.display = "none";
      popLayer.style.display = "none";
    }
  }
};
</script>
<style scoped >
.top{
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.swiper-container{
  height: 380px;
  --swiper-pagination-color: #fd8282;/* 分页器颜色 */
  --swiper-navigation-color: #8d8b8b; /* 左右按钮颜色 */
  --swiper-navigation-size: 30px; /* 左右按钮大小 */
}
.left,.right{
  float: left;
  height: 380px;
}
.left{
  width: 700px;
  border: 1px solid #e0e0e0;
}
.right{
  width: 240px;
  border: 1px solid #e0e0e0;
}
.phone-img{
  display: inline-block;
  height: auto;
  max-width: 40%;
  margin-top: 50px;
  margin-bottom: 20px;
}
.label1{
  display: block;
  margin-bottom: 20px;
  color: #000000;
  font-family: 'Adobe 黑体 Std';
  font-size: 15px;
}
.label2{
  display: block;
  margin-bottom:20px;
  color: #3b3939;
  font-size: 13px;
  font-family: 'Adobe 黑体 Std';

}
/*中间过渡线*/
.box{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
}
.xuxian1{
  margin-top: 30px;
  height: 1px;
  width: 40%;
  border-top: 1px dashed #aaa8a8;
  float: left;
}
.text{
  margin-right: 50px;
  margin-left: 50px;
  color: black;
  float: left;
  font-size: 21px;
  margin-top: 18px;
}
.xuxian2{
  float: right;
  margin-top: 30px;
  height: 1px;
  width: 40%;
  border-top: 1px dashed #aaa8a8;
}

/*弹出框*/
/*背景层*/
#popLayer {
  display: none;
  background-color: #a7a4ac;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  -moz-opacity: 0.8;
  opacity:.80;
  filter: alpha(opacity=50);
}
/*弹出层*/
#popBox {
  display: none;
  background-color: #FFFFFF;
  z-index: 11;
  width: 300px;
  height: 300px;
  position:fixed;
  top:0;
  right:0;
  left:0;
  bottom:0;
  margin:auto;
}
#popBox .close{
  text-align: right;
}
/*关闭按钮*/
.tip{
  font-size: 16px;
}
.icon{
  margin-top: 15px;
  box-shadow: 0 0 0 1px hsla(240,0%,100%,.3) inset,
  0 .5em 1em rgba(0, 0, 0, 0.6);
  height: 200px;
  width: 200px;
}

.moment-card {
  margin-top: 15px;
}
.load-button{
  color: #ff99b6;
  background-color: transparent;
  border: 0.1px solid #ff99b6;
  height: 35px;
  width: 400px;
  font-size: 12px;
  margin-top:30px;
  margin-bottom: 50px;
  outline: none;
}
</style>
