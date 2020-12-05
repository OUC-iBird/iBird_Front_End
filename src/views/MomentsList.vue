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
        <el-row v-for="(i, index) in countData" v-if="index%2==0" :key="index">
          <el-col :span="10" :offset="0" push="3">
            <ibird-moments style="box-shadow: none; border: 0.1px solid #e0e0e0;"
                           class="moment-card"
                           username="组件传参测试"
                           moment="还行"
            />
          </el-col>
          <el-col :span="10" :offset="0" v-if="index+1<countData.length" push="2">
            <ibird-moments style="box-shadow: none; border: 0.1px solid #e0e0e0;"
                           class="moment-card"
                           username="试一下"
                           moment="原来如此"
            />
          </el-col>
        </el-row>
      </ul>
      <button v-if="loading" @click="more" class="load-button">查看更多 ∨</button>
      <p v-if="noMore" style="color: #555555;font-size: 14px;margin-top:30px;margin-bottom: 50px;">没有更多数据啦(^_^)</p>
    </div>
  </div>
</template>

<script>
import IbirdNav from "../components/navbar";
import MomentsCard from "../components/MomentsCard";

export default {
  name: "MonentList",
  components: {
    IbirdNav,
    'ibird-moments': MomentsCard,
  },
  data() {
    return {
      count: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      loading: false,
      // 默认显示条数
      cou: 4
    }
  },
  computed: {
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

    },
  },
  methods: {
    load() {
      this.loading = true;
    },
    more() {
      // 每次点击加四条
      this.cou += 4;
      this.loading = false;
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
