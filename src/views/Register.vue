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
        <el-form
          :model="registerForm"
          status-icon
          :rules="rules"
          ref="registerForm"
          label-width="15%">
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="registerForm.username"
              placeholder="请输入用户名"
              prefix-icon="el-icon-user"
              maxlength="10"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="registerForm.email"
              placeholder="请输入邮箱地址"
              prefix-icon="el-icon-connection"
            />
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              v-model="registerForm.password"
              autocomplete="off"
              show-password
            />
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              placeholder="请再次输入密码"
              v-model="registerForm.checkPass"
              prefix-icon="el-icon-lock"
              autocomplete="off"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('registerForm')">提交</el-button>
            <el-button @click="resetForm('registerForm')">重置</el-button>
          </el-form-item>

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
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.pass) {
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
      src: '../static/img/background.jpg',
      registerForm: {
        username: '',
        password: '',
        checkPass: '',
        email: '',
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
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
.el-main {
  margin-top: 5%;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, .22), 0 0 6px rgba(0, 0, 0, .04);
  margin-right: 100px;
  /* height: 80%; */
}
</style>>
