<template>
<el-container>
  <el-aside width="50%">
    <el-image
    :src="src" 
    style="width: 100%; height: 380px;"
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
      label-width="100px">
      <el-form-item label="用户名" prop="checkName">
        <el-input
        v-model="registerForm.username"
        prefix-icon="el-icon-user"
        maxlength="10"
        show-word-limit>
        </el-input>
      </el-form-item>
      
      <el-form-item label="邮箱">
        <el-input
        v-model="registerForm.email"
        prefix-icon="el-icon-connection"
        >
        </el-input>
      </el-form-item>
      
      <el-form-item label="密码" prop="pass">
        <el-input 
        type="password"
        prefix-icon="el-icon-lock"
        v-model="registerForm.pass" 
        autocomplete="off"
        show-password
        >
        </el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input 
        type="password" 
        v-model="registerForm.checkPass" 
        prefix-icon="el-icon-lock"
        autocomplete="off"
        show-password>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('registerForm')">提交</el-button>
        <el-button @click="resetForm('registerForm')">重置</el-button>
      </el-form-item>

    </el-form>
  </el-main>
</el-container>
</template>


<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.registerForm.checkPass !== '') {
            this.$refs.registerForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validateName = (rule, value, callback) => {
        if (value === ''){
          callback(new Error("请输入用户名"));
        }
      };
      return {
        src: '../static/img/background.jpg',
        registerForm: {
          pass: '',
          checkPass: '',
          username: '',
          email: '',
        },
        rules: {
          checkName: [
            { validator: validateName, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
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
  box-shadow: 2px 2px 4px rgba(0, 0, 0, .22), 0 0 6px rgba(0, 0, 0, .04);
  margin-left: 20px;
  margin-right: 100px;
  /* height: 80%; */
  margin-top: -2%;
}
</style>>
