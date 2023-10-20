<template>
  <div class="top-box" style="position: fixed;top: 0;left: 0;width: 100%;z-index: 999;">
    <div style="display: flex;position: absolute;" :style="'left: ' + l_left + 'px'">
      <i v-if="!isCollapse" class="el-icon-s-fold top-box-i" @click="changeCollapse"></i>
      <i v-if="isCollapse" class="el-icon-s-unfold top-box-i" @click="changeCollapse"></i>
      <el-menu
        :default-active="active"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#FFFFFF"
        text-color="#000000"
        active-text-color="#ffd04b">
      </el-menu>
    </div>
    <div style="flex: 1;margin-right: 10px;">
      <div style="display: flex;float: right;">
<!--        <img src="../../../public/img/default_face.png" style="margin-top: 15px;width: 32px;height: 32px;">-->
        <span
          style="max-width: 100px;overflow: hidden;text-overflow: ellipsis;line-height: 60px;color: #000000;margin: 0 20px 0 5px;">
          {{account_name}}
        </span>
        <el-tooltip
          effect="dark"
          content="退出系统"
          placement="bottom">
          <div style="cursor: pointer;">
            <i class="el-icon-switch-button" style="color: #000000;font-size: 18px;margin-top: 20px;"
               @click="logout"></i>
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
  import {removeStore} from "@/utils/store.js";
  import {ttGet, ttPost} from "@/utils/util.js";

  export default {
    data() {
      return {
        isCollapse: false,
        active: '',
        l_left: 180,
        account_name: '',
      };
    },
    mounted() {
      let that = this;
      setInterval(function () {//定位当前菜单
        that.active = that.$router.currentRoute.path;
      }, 500);
      this.get_account_info();
    },
    methods: {
      changeCollapse() {
        this.isCollapse = !this.isCollapse;
        this.l_left = !this.isCollapse ? 180 : 65;
        this.$emit('changeCollapse');
      },

      //获取管理员信息
      get_account_info() {
        ttGet("/admin.php/system/get_account_info", '', (res) => {
          if (res.code == 200) {
            this.account_name = res.data.account.name;
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        });
      },

      //退出账号
      logout() {
        this.$confirm('退出系统, 是否继续?', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: "warning"
        }).then(() => {
          //退出操作，todo
          removeStore({name: 'login_token'});
          this.$router.push({path: '/cclladminlogin/login/login'});
        });
      },
    }
  };
</script>

<style lang="scss" scoped>
  .top-box {
    height: 60px;
    display: flex;
    background-color: #FFFFFF;
    border-bottom: 1px solid #eeeeee;
  }

  .top-box-i {
    width: 32px;
    height: 32px;
    font-size: 24px;
    margin: 16px 10px 0 15px;
    color: #000000;
    cursor: pointer;
    text-align: center;
  }

  .el-menu--horizontal .el-menu--popup .el-submenu__title {
    color: #FFFFFF !important;
  }

</style>
