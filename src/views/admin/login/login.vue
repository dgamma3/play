<template>
  <div id="login-body" style="position: fixed;">
    <div style="display: flex;width: 100%;height: 100%;overflow: hidden;">
      <div class="login-modal">
        <div class="login-title">开箱网后台登录</div>
        <el-form class="login-form"
                 :rules="loginRules"
                 ref="loginForm"
                 :model="loginForm"
                 label-width="0">
          <el-form-item prop="username">
            <el-input
              placeholder="请输入用户名"
              prefix-icon="el-icon-user"
              v-model="loginForm.username">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              v-model="loginForm.password">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       style="width: 100%;margin-top: 30px;"
                       @click.native.prevent="login"
                       class="login-submit">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {setStore} from "@/utils/store.js";
  import {ttGet, ttPost} from "@/utils/util.js";

  export default {
    data() {
      return {
        loginForm: {
          //用户名
          username: "",
          //密码
          password: "",
        },
        loginRules: {
          username: [
            {required: true, message: "请输入用户名", trigger: "blur"}
          ],
          password: [
            {required: true, message: "请输入密码", trigger: "blur"}
          ]
        },
      };
    },
    watch: {},
    computed: {},
    mounted() {
    },
    methods: {
      login() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            const loading = this.$loading({
              text: '登录中',
              spinner: "el-icon-loading"
            });
            ttPost("/admin.php/login/login", this.loginForm, (res) => {
              loading.close();
              if (res.code == 200) {
                setStore({name: 'login_token', content: res.data.cache_key});
                this.$message({
                  message: res.msg,
                  type: 'success'
                });
                setTimeout(() => {
                  this.$router.push({path: '/cclladminlogin/index/index'});
                }, 500);
              } else {
                this.$message({
                  message: res.msg,
                  type: 'warning'
                });
              }
            });
          }
        });
      },
    }
  };
</script>

<style lang="scss" scoped>
  #login-body {
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("~@/assets/img/4df728c0293c8f3bd50d5bd7e4aed6e1.jpeg");
    background-repeat: no-repeat;
  }

  .name {
    line-height: 50px;
    font-size: 30px;
    font-weight: 700;
    color: #FFFFFF;
    margin-left: 10px;
  }

  .login-modal {
    position: relative;
    width: 420px;
    height: 360px;
    margin: -225px auto 0;
    top: 50%;
    background-color: #FFFFFF;
    border-radius: 5px;
  }

  .login-title {
    height: 100px;
    line-height: 100px;
    font-weight: 600;
    text-align: center;
    font-size: 26px;
    color: #000c17;
  }

  .login-form {
    margin: 20px 40px;
  }
</style>
