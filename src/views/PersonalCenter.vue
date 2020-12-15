<template>
  <div class="content">
    <ibird-nav />
    <div class="center-banner">
      <el-image
        :src="src"
        fill="fill"
        class="banner-img">

      </el-image>
    </div>
    <div class="avatar-img">
      <el-avatar :size="130" :src="avatarUrl" style="border: 2px solid #ffffff;">
      </el-avatar>
    </div>
    <div class="user-name">
      <span>{{nickname}}</span>
    </div>

    <el-tabs
      tab-position="right"
      class="card-selector"
    >

      <el-tab-pane>

        <span slot="label"><el-image class="icon-img"
                                     :src="src1"
                                     fill="fill"
        >
        </el-image><p class="tip">个人动态</p></span>
        <div class="infinite-list-wrapper" style="overflow:auto">
          <ul
            class="list"
            v-infinite-scroll="loadMoments"
            infinite-scroll-disabled="moments_disabled">
            <el-row v-for="(i,index) in moments_countData" :key="index" class="card1-item">
              <el-col :span="20" :push="4">
                <ibird-moments
                  class="moment-card"
                  v-bind:username=moments[index].username
                  v-bind:moment=moments[index].content
                  v-bind:avatar=moments[index].avatar
                  v-bind:ptime=moments[index].create_time
                  v-bind:pid=moments[index].post_id
                  v-bind:location=moments[index].address
                  v-bind:thumb=
                    {thumb_num:moments[index].like,thumb_visible:true,thumb_status:moments[index].is_liked|false,}
                /></el-col>
            </el-row>
          </ul>
          <p v-if="moments_loading" style="color: #555555;font-size: 14px;margin-top:30px;margin-bottom: 50px;">加载中……</p>
          <p v-if="moments_noMore" style="color: #555555;font-size: 14px;margin-top:30px;margin-bottom: 50px;">没有更多数据啦(^_^)</p>
        </div>
      </el-tab-pane>
      <el-tab-pane class="card2">
        <span slot="label"><el-image class="icon-img"
                                     :src="src2"
                                     fill="fill"
                                     style="height: 14px;width: 14px;"
        >
        </el-image><p class="tip">个人相册</p></span>
        <div class="title"><p class="title-text">PHOTO GALLERY</p></div>
        <div class="gallery" style="height: 450px;">
          <el-scrollbar style="height: 100%;" ref="gcScrollbar" class="table_device">
            <ul
              class="list"
              v-infinite-scroll="load"
              infinite-scroll-disabled="disabled"
              style="padding: 0"
            >
              <div class="home">
                <div class="bannerArr">
                  <div class="img-item" v-for="(i,index) in moments_countData" :key="index" >
                    <img v-image-preview class="img" :src="banners[index]"/>
                  </div>
                </div>
              </div>
              <!--            <li v-for="i in count" class="list-item" style="height: 20px">{{ i }}</li>-->
            </ul>
            <p v-if="loading">加载中...</p>
            <p v-if="noMore">没有更多了</p>
          </el-scrollbar>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
import NavBar from '../components/navbar'
import MomentsCard from '../components/MomentsCard'
import {get_my_gallery} from "../api/gallary"
// 引入插件
import "@/assets/css/scrollbar.css"
import {change_avatar, change_nickname, get_status} from "../api/account";
import {get_all_post, get_my_post} from "../api/post";
export default {
  components: {
    'ibird-nav': NavBar,
    'ibird-moments': MomentsCard
  },
  data() {
    return {
      banners: [],
      src : "../static/img/banner.png",
      src1: "../static/img/bell.png",
      src2: "../static/img/camera.png",
      avatarUrl: "../static/img/profile.jpg",
      nickname:'Ctwo',
      moments_cou: 4,
      moments: [],
      moments_page: 1,
      moments_loading: false,
      moments_hasnext: true,
      loading: false,
    }
  },
  computed: {
    noMore() {
      return this.count >= 20
    },
    disabled() {
      return this.noMore || this.loading
    },

    moments_noMore () {
      //return this.moments_cou > this.moments.length
      return !this.moments_hasnext;
    },
    moments_disabled(){
      return this.moments_noMore || this.moments_loading
    },
    moments_countData() {  // 计算属性使用切片生成新数组
      let data = [];
      console.log('countdata'+this.moments_cou)
      console.log(this.moments.length)
      // 大于x条，使用切片，返回新数组
      if (this.moments.length > 4) {
        data = this.moments.slice(0, this.moments_cou);
        return data;
      } else {
        // 否则使用原来数组，不进行切片处理
        data = this.moments
        return data;
      }
    },
  },
  mounted() {
    this.getUserInfo();
    // this.moments.push({
    //   "username": "leo123",
    //   "avatar": "avatar/default.jpg",
    //   "content": "Hello World",
    //   "create_time": "2020-12-10 11:49:01",
    //   "address": "",
    //   "like": 2333,
    //   "post_id": 1,
    //   "is_liked": false
    // });this.moments.push({
    //   "username": "testuser",
    //   "avatar": "avatar/default.jpg",
    //   "content": "摸了",
    //   "create_time": "2020-12-10 11:49:01",
    //   "address": "",
    //   "like": 0,
    //   "post_id": 1,
    //   "is_liked": true
    // });this.moments.push({
    //   "username": "哈哈哈",
    //   "avatar": "avatar/default.jpg",
    //   "content": "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
    //   "create_time": "2020-12-10 11:49:01",
    //   "address": "",
    //   "like": 0,
    //   "post_id": 1,
    // });this.moments.push({
    //   "username": "ibird",
    //   "avatar": "avatar/default.jpg",
    //   "content": "没人比我更懂鸟",
    //   "create_time": "2020-12-10 11:49:01",
    //   "address": "鸟鸟",
    //   "like": 0,
    //   "post_id": 1,
    //   "is_liked": false
    // });this.moments.push({
    //   "username": "leo123",
    //   "avatar": "avatar/default.jpg",
    //   "content": "Hello World",
    //   "create_time": "2020-12-10 11:49:01",
    //   "address": "",
    //   "like": 0,
    //   "post_id": 1,
    //   "is_liked": false
    // });
  },
  methods: {
    load() {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 2000)
    },
    loadMoments () {
      // this.moments_loading = true
      // setTimeout(() => {
      //   console.log('loaddata'+this.moments_cou)
      //   this.moments_cou += 4
      //   this.moments_loading = false
      // }, 2000)
      if (!this.noMore){
        this.moments_loading = true
        get_my_post(this.moments_page).then((response)=>{
          if (response.data.code === 20000){
            //成功
            this.moments = this.moments.concat(response.data.data.post);
            this.cou += 4;
            this.moments_page++;
            if (!response.data.data.hasnext) this.moments_hasnext = false;
          }
          else {
            this.$message.error('加载失败：'+response.data.msg);
            this.moments_hasnext = false;
          }
        }).catch((error)=>{
          this.$message.error('请求时出错！');
          console.log(error);
        })
        this.moments_loading = false
      }
    },
    getUserInfo(){
      get_status().then((response)=>{
        if (response.data.code === 20000){
          //成功
          if (response.data.data.login){
            this.nickname = response.data.data.nickname;
            this.avatarUrl = response.data.data.avatar;
          }
        }
        else {
          console.log('信息获取失败：'+response.data.msg);
        }
      }).catch((error)=>{
        console.log(error);
      })
    },
    changeAvatar(url){
      change_avatar({
        avatar: url,
      }).then((response)=>{
        if (response.data.code === 20000){
          //成功
          this.$message.success('头像修改成功！');
          this.getUserInfo();
        }
        else {
          this.$message.error('头像修改失败：'+response.data.msg);
        }
      }).catch((error)=>{
        this.$message.error('请求时出错！');
        console.log(error);
      })
    },
    changeNickname(name){
      change_nickname({
        nickname: name,
      }).then((response)=>{
        if (response.data.code === 20000){
          //成功
          this.$message.success('昵称修改成功！');
          this.getUserInfo();
        }
        else {
          this.$message.error('昵称修改失败：'+response.data.msg);
        }
      }).catch((error)=>{
        this.$message.error('请求时出错！');
        console.log(error);
      })
    },
  }
}
</script>

<style scoped>
ul{
  padding-left: 0;
}
.card-selector{
  padding-left: 8%;
}
.card1-item{
  position: relative;
}
.card1{
  margin-bottom: 50px;
}
.card2{
  width: 580px;
  float: right;
}
.title{
  border:none;
  border-radius:5px;
  box-shadow: 0 0 0 1px hsla(240,0%,100%,.3) inset,
  0 .5em 1em rgba(0, 0, 0, 0.6);
  background-color: rgba(100,100,100,.2);
  width: 580px;
  position: relative;
  background-color: #ca917d;
  font-family: 'Algerian';
  font-size: 22px;
  display: table;
  color: #f1eeee;
  height: 100%;
  border-bottom: 1px solid #f1eeee;
}
.title-text{
  vertical-align: center;
  margin-right: 330px;
}
.gallery {
  width: 580px;
  height: 400px;
  margin-bottom: 100px;
  background-color: #ca917d;
}
.home {
  margin-left: 42px;
  width: 500px;
  height: 100%;
  position: relative;
  background-color: rgba(53, 52, 54, 0.5);
}
.bannerArr{
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
}
.img-item{
  width: 160px;
  height: 160px;
  padding: 5px;
  margin: 3px;
  box-sizing: border-box;

  border:none;
  border-radius:5px;
  box-shadow: 0 0 0 1px hsla(240,0%,100%,.3) inset,
  0 .5em 1em rgba(0, 0, 0, 0.6);
  background-color: rgba(100,100,100,.2);
}
.img{
  width: 100%;
  height: 100%;
  border: 1px solid #E3E3E3;
}
.card-selector {
  margin-top: 30px;
  position: relative;
  width: 65%;
  display: inline-block;
}

.banner-img {
  width: 76%;
  margin-top: 20px;
}

.avatar-img {
  position: relative;
  margin-top: -100px;
}
.user-name > span {
  font-size: 28px;
}
.moment-card {
  margin-top: 20px;
}

.tip{
  display: inline-block;
  vertical-align: middle;
}
.icon-img{
  vertical-align: middle;
  height: 16px;
  width: 16px;
  margin-right: 5px;
}
.user-name{
  margin-bottom: 20px;
}
</style>
