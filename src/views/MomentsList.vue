<template>
  <div>
    <ibird-nav />
    <div class="box">
      <div class="xuxian1"></div>
      <div class="text">全部动态</div>
      <div class="xuxian2"></div>
    </div>

    <div class="infinite-list-wrapper" style="overflow:auto">
      <ul
        class="list"
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled">
        <el-row v-for="(i, index) in countData" v-if="index % 2 === 0" :key="index">
          <el-col :span="10" :offset="0" :push="3">
            <ibird-moments style="box-shadow: none; border: 0.1px solid #e0e0e0;"
                           class="moment-card"
                           v-bind:username=moments[index].username
                           v-bind:moment=moments[index].content
                           v-bind:avatar=moments[index].avatar
                           v-bind:ptime=moments[index].create_time
                           v-bind:pid=moments[index].post_id
                           v-bind:location=moments[index].address
                           v-bind:thumb=
                             {thumb_num:moments[index].like,thumb_visible:true,thumb_status:moments[index].is_liked|false,}
            />
          </el-col>
          <el-col :span="10" :offset="0" v-if="index+1<countData.length" :push="2">
            <ibird-moments style="box-shadow: none; border: 0.1px solid #e0e0e0;"
                           class="moment-card"
                           v-bind:username=moments[index+1].username
                           v-bind:moment=moments[index+1].content
                           v-bind:avatar=moments[index+1].avatar
                           v-bind:ptime=moments[index+1].create_time
                           v-bind:pid=moments[index+1].post_id
                           v-bind:location=moments[index+1].address
                           v-bind:thumb=
                             {thumb_num:moments[index+1].like,thumb_visible:true,thumb_status:moments[index+1].is_liked|false,}
            />
          </el-col>
        </el-row>
      </ul>
<!--      <button v-if="loading" @click="more" class="load-button">查看更多 ∨</button>-->
      <p v-if="loading" style="color: #555555;font-size: 14px;margin-top:30px;margin-bottom: 50px;">加载中……</p>
      <p v-if="noMore" style="color: #555555;font-size: 14px;margin-top:30px;margin-bottom: 50px;">没有更多数据啦(^_^)</p>
    </div>
  </div>
</template>

<script>
import IbirdNav from "../components/navbar";
import MomentsCard from "../components/MomentsCard";
import {get_all_post} from "../api/post";

export default {
  name: "MonentList",
  components: {
    IbirdNav,
    'ibird-moments': MomentsCard,
  },
  data() {
    return {
      moments: [],
      loading: false,
      // 默认显示条数
      cou: 4,
      page: 1,
      hasnext: true,
    }
  },
  mounted() {
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
  computed: {
    noMore() {
      // 判断加载条数是否大于列表数据长度
      return !this.hasnext;
      //return this.cou > this.moments.length;
    },
    disabled() {
      // 加载完成
      return this.loading || this.noMore;
    },
    countData() {  // 计算属性使用切片生成新数组
      let data = [];
      // 大于四条，使用切片，返回新数组
      if (this.moments.length > 4) {
        data = this.moments.slice(0, this.cou);
        return data;
      } else {
        // 否则使用原来数组，不进行切片处理
        data = this.moments
        return data;
      }
    },
  },
  methods: {
    load() {
      //下拉加载
      if (!this.noMore){
        this.loading = true
        get_all_post(this.page).then((response)=>{
          if (response.data.code === 20000){
            //成功
            this.moments = this.moments.concat(response.data.data.post);
            this.cou += 4;
            this.page++;
            if (!response.data.data.hasnext) this.hasnext = false;
          }
          else {
            this.$message.error('加载失败：'+response.data.msg);
            this.hasnext = false;
          }
        }).catch((error)=>{
          this.$message.error('请求时出错！');
          console.log(error);
        })
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.box {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
}
ul{
  padding-left: 0;
}
.xuxian1 {
  margin-top: 30px;
  height: 1px;
  width: 40%;
  border-top: 1px dashed #aaa8a8;
  float: left;
}

.text {
  margin-right: 50px;
  margin-left: 50px;
  color: black;
  float: left;
  font-size: 21px;
  margin-top: 18px;
}

.xuxian2 {
  float: right;
  margin-top: 30px;
  height: 1px;
  width: 40%;
  border-top: 1px dashed #aaa8a8;
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
