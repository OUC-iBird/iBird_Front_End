<template>
  <div>
    <div class="background" :style="backgroundImg">
    </div>
    <el-container class="front">
      <el-main class="form-card">
        <el-image class="logo-img"
                  :src="src"
                  fill="fill"
        >
        </el-image>
        <el-form
          :model="registerForm"
          status-icon
          :rules="rules"
          ref="registerForm"
          >
          <el-form-item prop="username">
            <el-input
              v-model="registerForm.username"
              placeholder="请输入用户名"
              prefix-icon="el-icon-user"
              maxlength="20"
              show-word-limit
            />
          </el-form-item>

          <el-form-item prop="email">
            <el-input
              v-model="registerForm.email"
              placeholder="请输入邮箱地址"
              prefix-icon="el-icon-connection"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              maxlength="20"
              v-model="registerForm.password"
              autocomplete="off"
              show-password
            />
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input
              type="password"
              placeholder="请再次输入密码"
              maxlength="20"
              v-model="registerForm.checkPass"
              prefix-icon="el-icon-lock"
              autocomplete="off"
              show-password
            />
          </el-form-item>
          <el-button class="reset" @click="toLogin()">返回</el-button>
          <el-button class="submit" type="primary" @click="submitForm('registerForm')">注册</el-button>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>


<script>
import {register} from "../api/account";

export default {
  components: {
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'));
      } else {
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
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
    var validateEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入邮箱地址"));
      } else {
        var regex = /^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
        if (!regex.test(value)) {
          callback(new Error("请输入有效的邮箱地址"));
        } else {
          callback();
        }
      }
    };
    return {
      src : "../static/img/logo.png",
      registerForm: {
        username: '',
        password: '',
        checkPass: '',
        email: '',
      },
      backgroundImg:{
        backgroundImage:"url("+require("@/assets/bg.jpg")+")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      },
      rules: {
        username: [
          {validator: validateName, trigger: 'blur'}
        ],
        password: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        email: [
          {validator: validateEmail, trigger: 'blur'}
        ],
      },
    };
  },
  methods: {
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          register({
            username: this.registerForm.username,
            password: this.registerForm.password,
            email: this.registerForm.email
          }).then((response)=>{
            if (response.data.code === 20000){
              //成功并跳转到登录页
              this.$message.success('注册成功！');
              this.$router.push({path: '/login'});
            }
            else {
              this.$message.error('注册失败：'+response.data.msg);
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toLogin(){
      this.$router.push({
        path: '/login'
      })
    },
  }
}
</script>

<style scoped>
.el-main {
  height: 80%;
  border:none;
  border-radius:5px;
  box-shadow: 0 0 0 1px hsla(240,0%,100%,.3) inset,
  0 .5em 1em rgba(0, 0, 0, 0.6);
  background-color: rgba(100,100,100,.2);
  position:relative;
  left:-50%;
}
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
.logo-img{
  width: 80px;
  margin-bottom: 20px;
  margin-top: 20px;
}
.el-button{
  color:white;
  border:none;
  border-radius: 20px;
  box-shadow: 0 0 0 1px hsla(240,0%,100%,.3) inset,
  0 .5em 1em rgba(0, 0, 0, 0.6);
  margin-top: 10px;
  margin-bottom: 10px;
  width: 40%;
  position: relative;
}
.reset{
  background-color: rgba(27, 37, 49, 0.4);
}
.submit{
  background-color: rgba(51,153,0,.4);
}
</style>>
