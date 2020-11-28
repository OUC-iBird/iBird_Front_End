<template>
  <div>
    <ibird-nav/>
    <el-container>
      <el-aside width="50%">
        <el-image
          :src="src"
          style="width: 90%; height: 380px; float: left"
        >
        </el-image>
      </el-aside>
      <el-main class="form-card">
        <h1> iBird </h1>
        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="15%">
          <el-form-item label="用户名" prop="username">
            <el-input
              placeholder="请输入用户名"
              prefix-icon="el-icon-user"
              maxlength="10"
              v-model="loginForm.username"
            />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              v-model="loginForm.password"
              autocomplete="off"
              show-password
            />
          </el-form-item>
          <el-button
            :loading="false"
            class="login-btn"
            type="primary"
            @click="submitForm('loginForm')"
          >
            登录
          </el-button>

          <el-link
            icon="el-icon-edit"
            href="/register">
            注册
          </el-link>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import NavBar from "../components/navbar";

export default {
  components: {
    "ibird-nav": NavBar
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
      src: '../static/img/background.jpg',
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
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<style scoped>
.el-main {
  /*height: 80%;*/
  margin-top: 5%;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, .22), 0 0 6px rgba(0, 0, 0, .04);
  margin-right: 100px;
}

.el-button {
  float: left;
  margin-left: 100px
}

.el-link {
  top: 10px;
  position: relative;

}

</style>
