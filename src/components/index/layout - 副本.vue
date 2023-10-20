<template>
  <div class="page-content">
    <navbar ref="navbar" @game_type_change="game_type_change"></navbar>
    <div class="bg-all">
      <!-- 页面展示容器 -->
      <template v-if="site.status == '1'">
      <keep-alive>
        <router-view
          ref="content"
          @user_store_bean="user_store_bean"
          @user_bean="user_bean"
          @get_game_type="get_game_type"
          @open_r="open_r"
          class="vue-view"
          v-if="$route.meta.keepAlive"
        />
      </keep-alive>
      <router-view
        ref="content"
        @user_store_bean="user_store_bean"
        @user_bean="user_bean"
        @get_game_type="get_game_type"
        @open_r="open_r"
        class="vue-view"
        v-if="!$route.meta.keepAlive"
      />
    </template>
    <template v-else>
      <el-row>
        <el-col :span="24">
          <div style="margin:auto;color:#fff;font-size: 18px;min-height:150px;line-height:150px;text-align: center;">网站维护中，敬请期待.........</div>
        </el-col>
      </el-row>

    </template>
    </div>
    <bottom></bottom>
    <!-- <tabbar></tabbar> -->
  </div>
</template>

<script>
import {
  ttGet,
} from "@/utils/util.js";
import navbar from "./navbar";
import bottom from "./bottom";
import tabbar from "./tabbar";

export default {
  components: {
    navbar,
    bottom,
    tabbar
  },
  name: "layout",
  data() {
    return {
      site:{status:0},
      user:{},
    };
  },
  mounted() {

      ttGet("/api.php/index/get_site", "", (res) => {
        if (res.code == 200) {
          this.site = res.data.site;
          }
      });

        let jwt_token = getStore({
          name: "jwt_token",
        });
        if (jwt_token) {
          ttGet("/api.php/user/user_info", "", (res) => {
            if (res.code == 200) {
              this.user = res.data.user;
              console.log(this.user.invitation_code, "@@@@@@@");
            } else {
              removeStore({
                name: "jwt_token",
              });
            }
          });
        }

  },
  created() {},
  methods: {
    //头部修改游戏分类触发
    game_type_change(res) {

        this.$router.push({ path: "/" });
        let timeid = setInterval(() => {
          if (this.$refs.content.game_type_change) {
            this.$refs.content.game_type_change(res);
            clearInterval(timeid);
          }
        }, 100);
    },

    //获取游戏类型
    get_game_type(res) {
      res({ game_type: this.$refs.navbar.game_type });
    },

    //修改用户余额
    user_bean(res) {
      this.$refs.navbar.user.bean = Number(res.balance).toFixed(2);
    },

    //修改用户余额
    open_r(res) {
      this.$refs.navbar.recharge_page = res;
    },

    user_store_bean(res) {
      this.$refs.navbar.user.store_bean = Number(res.user_store_bean).toFixed(
        2
      );
    }
  }
};
</script>

<style lang="scss" scoped>
body {
  background-color: #15172c;
}

.vue-view {
}
</style>
