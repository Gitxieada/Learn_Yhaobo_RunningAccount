<template>
  <el-card class="login-card">
    <template #header>
      <div class="card-header">
        <span>欢迎使用企业财务流水管理系统</span>
      </div>
    </template>
    <div @keypress.enter="onSubmit">
      <el-form label-position="right" label-width="auto" :model="loginForm">
        <el-form-item label="用户名">
          <el-input v-model="loginForm.username" clearable autofocus></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.password" show-password clearable></el-input>
        </el-form-item>
        <el-form-item label-width="0">
          <el-button type="success" @click="onSubmit" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import userApi from "@/api/rbac/userApi";

export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loading: false
    };
  },
  methods: {
    onSubmit() {
      this.loading = true;
      userApi
        .login({ ...this.loginForm })
        .then(result => {
          sessionStorage.setItem("username", result.data.username);
          sessionStorage.setItem("groupId", result.data.groupId);
          let redirect = this.$route.query.redirect;
          if (redirect) {
            this.$router.replace({ path: redirect + "" });
          } else {
            this.$router.replace({ path: "/" });
          }
        })
        .catch(() => (this.loading = false));
    }
  }
};
</script>

<style> 

.login-card {
  width: 473px;
  margin: 15% auto;
  /*color: black;*/
  text-align: center;
}
 
</style>