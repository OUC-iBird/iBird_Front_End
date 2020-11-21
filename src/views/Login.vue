<template>
  <el-container>
    <el-aside width="1000px">Aside</el-aside>
    <el-main style="margin-right: 100px">
      <h1> LoginForm </h1>
      <el-form ref="form" :model="form" label-width="40px" label-position="left">
        <el-form-item label="姓名">
          <el-input
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
          />
        </el-form-item>
        <el-form-item label="密码">
          <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="input" show-password/>
        </el-form-item>
        <el-button
          :loading="loading"
          class="login-btn"
          type="primary"
        >
          登录
        </el-button>

        <router-link to="/register">
          <div style="margin-top: 20px">注册</div>
        </router-link>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style>

</style>
