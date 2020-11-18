<template>
  <div class="register-container">
    <el-alert
      v-if="nodeEnv !== 'development'"
      title="beautiful boys and girls欢迎加入vue-admin-beautifulQQ群：972435319"
      type="success"
      :closable="false"
      style="position: fixed"
    ></el-alert>
    <el-row>
      <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="16">
        <div style="color: transparent">占位符</div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
        <el-form
          ref="registerForm"
          :model="form"
          class="register-form"
          :rules="registerRules"
          size="mini"
        >
          <el-form-item prop="username">
            <el-input
              v-model.trim="form.username"
              v-focus
              style="margin-top: 20px"
              type="text"
              placeholder="请输入用户名"
              auto-complete="off"
            >
              <vab-icon slot="prefix" :icon="['fas', 'user-alt']"></vab-icon>
            </el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input
              v-model.trim="form.phone"
              type="text"
              placeholder="请输入手机号"
              maxlength="11"
              show-word-limit
              autocomplete="off"
            >
              <vab-icon slot="prefix" :icon="['fas', 'mobile-alt']"></vab-icon>
            </el-input>
          </el-form-item>
          <el-form-item prop="phoneCode" style="position: relative">
            <el-input
              v-model.trim="form.phoneCode"
              type="text"
              placeholder="手机验证码"
            >
              <vab-icon
                slot="prefix"
                :icon="['fas', 'envelope-open']"
              ></vab-icon>
            </el-input>
            <el-button
              type="primary"
              class="show-pwd phone-code"
              :disabled="isGetphone"
              @click="getPhoneCode"
            >
              这里是验证码
            </el-button>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="form.password"
              type="password"
              placeholder="设置密码"
              autocomplete="new-password"
            >
              <vab-icon slot="prefix" :icon="['fas', 'unlock']"></vab-icon>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="register-btn"
              type="primary"
              @click.native.prevent="handleReister"
            >
              注册
            </el-button>
            <router-link to="/login">
              <div style="margin-top: 20px">登录</div>
            </router-link>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
