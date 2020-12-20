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
          <el-button class="main-button" :loading="false" type="primary" @click="submitForm('loginForm')">登录</el-button><br/>
          <el-button class="sub-button" @click="toBack()">取消</el-button>
          <el-button class="sub-button" @click="toRegister()">注册新账号</el-button>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {login} from '../api/account'
import storage from 'good-storage'

export default {
  components: {
  },
  data() {
    let validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    let validateName = (rule, value, callback) => {
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
              // 设置本地 session 缓存
              storage.set("login", this.loginForm.username);
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
    toRegister(){
      this.$router.push({
        path: '/register'
      })
    },
    toBack(){
      let redirect = decodeURIComponent(this.$route.query.redirect || '/');
      this.$router.push({
        path: redirect
      })
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
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
}
.main-button{
  background-color: rgba(51,153,0,.4);
  width: 83.5%;
}
.sub-button{
  background-color: rgba(27, 37, 49, 0.4);
  width: 40%;
}
.el-button+.el-button {
  margin-left: 2.5%;
}
.logo-img{
  width: 80px;
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>
