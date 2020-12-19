<template>
  <div >
    <div class="background" :style="backgroundImg">
    </div>
    <el-container class="front">
      <el-main class="form-card" >
        <el-image class="logo-img"
                  :src="src"
                  fill="fill"
        >
        </el-image>
        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" >
          <el-form-item  prop="username">
            <el-input
              placeholder="请输入用户名"
              prefix-icon="el-icon-user"
              maxlength="20"
              v-model="loginForm.username"
            />
          </el-form-item>
          <el-form-item  prop="password">
            <el-input
              type="password"
              placeholder="请输入密码"
              maxlength="20"
              prefix-icon="el-icon-lock"
              v-model="loginForm.password"
              autocomplete="off"
              show-password
            />
          </el-form-item>
          <el-button
            :loading="false"
            type="primary"
            @click="submitForm('loginForm')"
          >
            登录
          </el-button>
          <span class="tip">还没有注册？</span>
          <el-link href="/register" style="color: #ffffff;">
            点击此处
          </el-link>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {login} from '../api/account'
import axios from 'axios'
export default {
  components: {

  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    var validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    return {
      src : "../static/img/logo.png",
      backgroundImg:{
        backgroundImage:"url("+require("@/assets/bg.jpg")+")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      },
      loginForm: {
        password: '',
        username: ''
      },
      rules: {
        username: [
          {validator: validateName, trigger: 'blur'}
        ],
        password: [
          {validator: validatePass, trigger: 'blur'}
        ],
      },
    }
  },

  methods: {
    //提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login({
            username: this.loginForm.username,
            password: this.loginForm.password
          }).then((response)=>{
            if (response.data.code === 20000){
              //成功并保存登录状态
              this.$message.success('登录成功！');
              let redirect = decodeURIComponent(this.$route.query.redirect || '/');
              this.$router.push({
                path: redirect
              })
            }
            else {
              this.$message.error('登录失败：'+response.data.msg);
            }
          }).catch((error)=>{
            this.$message.error('请求时出错！');
            console.log(error);
          })
        } else {
          console.log('error submit!!');
          this.$message.error('提交时出错！');
          return false;
        }
      });
    },
  }
}
</script>

<style scoped>
.background{
  width:100%;
  height:100%;
  z-index:-1;
  position: absolute;
}
.front{
  z-index:1;
  width: 30%;
  height: 100%;
  position:relative;
  left:50%;
  padding-top: 80px;
}
.el-main {
  height: 100%;
  border:none;
  border-radius:5px;
  box-shadow: 0 0 0 1px hsla(240,0%,100%,.3) inset,
  0 .5em 1em rgba(0, 0, 0, 0.6);
  background-color: rgba(100,100,100,.2);
  position:relative;
  left:-50%;
}
.el-button{
  color:white;
  border:none;
  border-radius: 20px;
  box-shadow: 0 0 0 1px hsla(240,0%,100%,.3) inset,
  0 .5em 1em rgba(0, 0, 0, 0.6);
  background-color: rgba(51,153,0,.4);
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  display: block;
}
.tip{
  position: relative;
  margin-bottom: 20px;
  font-size: 12px;
  color: #d5d2d2;
  margin-left: 110px;
}
.el-link{
  margin-bottom: 20px;
  float: right;
  display: block;
  font-size: 12px;
  top: 1.2px;
  margin-right: 110px;
}
.logo-img{
  width: 80px;
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>
