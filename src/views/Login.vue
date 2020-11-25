<template>
<el-container>
  <el-aside width="50%">
    <el-image
    :src="src" 
    style="width: 90%; height: 380px;"
    >

    </el-image>
    </el-aside>
  <el-main>
    <h1> iBird </h1>
    
    <el-form ref="login_form" :model="login_form" label-width="40px" label-position="left">
        <el-form-item label="姓名">
          <el-input
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
            v-model="login_form.username"
          />
        </el-form-item>
        <el-form-item label="密码">
          <el-input 
          placeholder="请输入密码" 
          prefix-icon="el-icon-lock" 
          v-model="login_form.password" 
          show-password />
        </el-form-item>
          <el-button
            :loading="false"
            class="login-btn"
            type="primary"
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
</template>

<script>
export default {
  data() {
      return {
        src: '../static/img/background.jpg',
        login_form: {
          password: "",
          username: ""
        }
      }
    },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style scoped>
.el-main {
  height: 80%;
  margin-top: 5%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
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
