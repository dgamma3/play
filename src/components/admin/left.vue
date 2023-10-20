<template>
  <div class="avue-sidebar"
    :style="'position: fixed;z-index: 9999;height:100%;background-color: #20222a;width:' + (isCollapse ? '65px;' : '180px;')">
    <!-- logo -->
    <div class="logo">
      <!--      <img src="../../../public/img/logo.png"/>-->
      <div class="title" v-if="!isCollapse">管理后台</div>
    </div>
    <!-- 左侧菜单 -->
    <el-menu unique-opened :default-active="active" class="el-menu-vertical-demo" background-color="#20222a"
      text-color="#fff" :collapse="isCollapse" style="height: calc(100% - 60px);overflow: auto;"
      active-text-color="#ffd04b">
      <router-link to="/cclladminlogin/index/index">
        <el-menu-item index="/cclladminlogin/index/index">
          <i class="el-icon-house"></i>
          <span slot="title">控制台</span>
        </el-menu-item>
      </router-link>
      <el-submenu index="user">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span slot="title">用户管理</span>
        </template>
        <el-menu-item-group>
          <router-link to="/cclladminlogin/user/user">
            <el-menu-item index="/cclladminlogin/user/user"><i class="el-icon-user-solid"></i>会员管理</el-menu-item>
          </router-link>

          <router-link to="/cclladminlogin/user/spread">
            <el-menu-item index="/cclladminlogin/user/spread"><i class="el-icon-share"></i>推广等级</el-menu-item>
          </router-link>

          <router-link to="/cclladminlogin/user/ticket">
            <el-menu-item index="/cclladminlogin/user/ticket"><i class="el-icon-share"></i>工单管理</el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="ornaments">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">饰品管理</span>
        </template>
        <el-menu-item-group>
          <router-link to="/cclladminlogin/ornaments/ornaments_class">
            <el-menu-item index="/cclladminlogin/ornaments/ornaments_class"><i class="el-icon-collection-tag"></i>饰品分类
            </el-menu-item>
          </router-link>
          <router-link to="/cclladminlogin/ornaments/ornaments">
            <el-menu-item index="/cclladminlogin/ornaments/ornaments"><i class="el-icon-news"></i>饰品管理</el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="box">
        <template slot="title">
          <i class="el-icon-takeaway-box"></i>
          <span slot="title">箱子管理</span>
        </template>
        <el-menu-item-group>
          <router-link to="/cclladminlogin/box/box_class">
            <el-menu-item index="/cclladminlogin/box/box_class"><i
                class="el-icon-collection-tag"></i>箱子分类</el-menu-item>
          </router-link>
          <router-link to="/cclladminlogin/box/box">
            <el-menu-item index="/cclladminlogin/box/box"><i class="el-icon-box"></i>箱子管理</el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="roll">
        <template slot="title">
          <i class="el-icon-present"></i>
          <span slot="title">Roll房管理</span>
        </template>
        <el-menu-item-group>
          <router-link to="/cclladminlogin/roll/roll">
            <el-menu-item index="/cclladminlogin/roll/roll"><i class="el-icon-files"></i>Roll房管理</el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <!--      <el-submenu index="welfare">-->
      <!--        <template slot="title">-->
      <!--          <i class="el-icon-orange"></i>-->
      <!--          <span slot="title">福利管理</span>-->
      <!--        </template>-->
      <!--        <el-menu-item-group>-->
      <!--          <router-link to="/cclladminlogin/welfare/cdk">-->
      <!--            <el-menu-item index="/cclladminlogin/welfare/cdk"><i class="el-icon-paperclip"></i>CDK管理</el-menu-item>-->
      <!--          </router-link>-->
      <!--        </el-menu-item-group>-->
      <!--      </el-submenu>-->
      <el-submenu index="record">
        <template slot="title">
          <i class="el-icon-s-finance"></i>
          <span slot="title">记录管理</span>
        </template>
        <el-menu-item-group>
          <router-link to="/cclladminlogin/record/ornaments_record">
            <el-menu-item index="/cclladminlogin/record/ornaments_record"><i class="el-icon-monitor"></i>饰品记录
            </el-menu-item>
          </router-link>
          <router-link to="/cclladminlogin/record/balance_record">
            <el-menu-item index="/cclladminlogin/record/balance_record"><i class="el-icon-bank-card"></i>余额记录
            </el-menu-item>
          </router-link>
          <router-link to="/cclladminlogin/record/gold_record">
            <el-menu-item index="/cclladminlogin/record/gold_record"><i class="el-icon-data-line"></i>佣金记录
            </el-menu-item>
          </router-link>
          <router-link to="/cclladminlogin/record/zb_gold_record">
            <el-menu-item index="/cclladminlogin/record/zb_gold_record"><i class="el-icon-data-line"></i>主播佣金
            </el-menu-item>
          </router-link>
          <router-link to="/cclladminlogin/record/cdk">
            <el-menu-item index="/cclladminlogin/record/cdk"><i class="el-icon-data-line"></i>cdk充值
            </el-menu-item>
          </router-link>
          <router-link to="/cclladminlogin/record/statistics">
            <el-menu-item index="/cclladminlogin/record/statistics"><i class="el-icon-data-line"></i>用户统计
            </el-menu-item>
          </router-link>
          <router-link to="/cclladminlogin/record/user_recharge">
            <el-menu-item index="/cclladminlogin/record/user_recharge"><i class="el-icon-data-line"></i>充值统计
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="activity">
        <template slot="title">
          <i class="el-icon-price-tag"></i>
          <span slot="title">活动管理</span>
        </template>
        <el-menu-item-group>
          <router-link to="/cclladminlogin/activity/cdk">
            <el-menu-item index="/cclladminlogin/activity/cdk"><i class="el-icon-s-opportunity"></i>CDK管理
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="system">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">基本设置</span>
        </template>
        <el-menu-item-group>
          <router-link to="/cclladminlogin/system/site">
            <el-menu-item index="/cclladminlogin/system/site"><i class="el-icon-s-tools"></i>基本设置
            </el-menu-item>
          </router-link>
          <router-link to="/cclladminlogin/system/account">
            <el-menu-item index="/cclladminlogin/system/account"><i class="el-icon-s-custom"></i>管理员列表
            </el-menu-item>
          </router-link>
          <router-link to="/cclladminlogin/system/role">
            <el-menu-item index="/cclladminlogin/system/role"><i class="el-icon-s-custom"></i>角色列表
            </el-menu-item>
          </router-link>
          <router-link to="/cclladminlogin/system/account_info">
            <el-menu-item index="/cclladminlogin/system/account_info"><i class="el-icon-user-solid"></i>个人信息修改
            </el-menu-item>
          </router-link>
          <router-link to="/cclladminlogin/system/help">
            <el-menu-item index="/cclladminlogin/system/help"><i class="el-icon-info"></i>帮助文档
            </el-menu-item>
          </router-link>
          <router-link to="/cclladminlogin/system/recharge">
            <el-menu-item index="/cclladminlogin/system/recharge"><i class="el-icon-s-finance"></i>充值金额
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: false,
        active: '/cclladminlogin/index/index',
      };
    },
    created() {},
    mounted() {
      setInterval(() => {
        this.active = this.$router.currentRoute.path;
      }, 500);
    },
    computed: {
      nowTagValue() {
        return this.$router.path;
      }
    },
    methods: {
      changeCollapse() {
        this.isCollapse = !this.isCollapse;
        this.$emit('changeCollapse');
      },

      vaildActive(path) {
        // if (this.validIsOpen(item)) {
        //   return false;
        // }
        return this.nowTagValue === path;
      },
    }
  };
</script>

<style lang="scss" scoped>
  .title {
    text-align: center;
    color: #ffffff;
  }

  .el-menu {
    border-right: none !important;
  }

  .el-menu::-webkit-scrollbar {
    display: none
  }

  .avue-sidebar {
    padding-top: 0 !important;
  }

  .el-menu-vertical-demo .el-submenu__title,
  .el-menu-vertical-demo .el-menu-item {
    padding: 0 0 0 20px !important;
    text-align: left;
  }

  .el-menu-vertical-demo .el-menu-item-group .el-menu-item {
    padding: 0 0 0 30px !important;
    min-width: auto;
  }

  .el-menu-vertical-demo ::v-deep .el-menu-item-group__title {
    padding: 0 !important;
  }

  .el-menu-vertical-demo .el-submenu__title i,
  .el-menu-vertical-demo .el-menu-item i {
    margin-right: 5px !important;
  }

  .el-menu-vertical-demo .el-icon-arrow-down {
    margin: -4px !important;
  }

  .logo .title {
    padding: 20px 0;
  }
</style>