<template>
  <div>
    <div class="profile">
      <div class="profile-inner" style="padding: 0 15px;">
        <div class="profile-header">
          <h2 class="profile-title">
            <svg class="icon-user" viewBox="0 0 30 34">
              <path
                d="M29.997 29.978v2.009a1.993 1.993 0 0 1-2.02 2.008H2.015a1.993 1.993 0 0 1-2.02-2.008v-1.972c0-2.98 1.18-5.795 3.324-7.926a11.523 11.523 0 0 1 3.754-2.47 13.312 13.312 0 0 1-.163-.16c-2.167-2.155-3.361-5.01-3.361-8.038 0-3.029 1.194-5.883 3.361-8.039C9.016 1.207 11.891.004 14.996.004c3.047 0 5.918 1.186 8.086 3.341 2.167 2.155 3.361 5.01 3.361 8.038 0 3.026-1.227 5.958-3.366 8.044a9.324 9.324 0 0 1-.16.154 11.512 11.512 0 0 1 3.756 2.47c2.112 2.1 3.324 4.99 3.324 7.927zm-23.862-5.09a7.184 7.184 0 0 0-2.137 5.127h21.959a7.183 7.183 0 0 0-2.138-5.127c-1.326-1.352-3.19-2.124-5.12-2.124h-7.406a7.27 7.27 0 0 0-5.158 2.125zM9.727 6.146a7.334 7.334 0 0 0-2.175 5.238c0 1.948.775 3.811 2.181 5.246a7.416 7.416 0 0 0 5.263 2.155c1.96 0 3.833-.77 5.276-2.168a7.33 7.33 0 0 0 2.169-5.233c0-1.946-.774-3.807-2.179-5.241a7.422 7.422 0 0 0-5.266-2.16 7.422 7.422 0 0 0-5.27 2.163z"/>
            </svg>
            <span>客户支持</span>
          </h2>
        </div>
        <template v-if="loadingIndex">
          <div class="text-center">
            <i class="el-icon-loading data-loading"></i>
          </div>
        </template>
        <template v-else>
          <el-collapse class="support-collapse" accordion>
            <template v-for="(item, index) in help">
              <el-collapse-item :title="item.title" >
                <div style="padding:10px" v-html="item.content"></div>
              </el-collapse-item>
            </template>
          </el-collapse>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import {ttGet, ttPost, htmlDecode} from "@/utils/util.js";

  export default {
    data() {
      return {
        img_url: this.$img_url,
        symbol: this.$getStore({name: 'symbol'}),
        loadingIndex: true,
        help: [],
      }
    },
    mounted() {
      this.get_support();
    },
    methods: {
      //获取客户支持
      get_support() {
        let id = this.id;
        ttGet("/api.php/user/get_support", {id: id}, (res) => {
          this.loadingIndex = false;
          if (res.code == 200) {
            this.help = res.data.help.map((item) => {
              item.content = htmlDecode(item.content);
              return item;
            });
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  .vue-view {
    margin-bottom: 70px;
  }

  .profile {
    margin-top: 30px;
  }

  .profile-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .profile-title {
    display: flex;
    align-items: center;
    margin: 3px 0 0;
    flex-grow: 1;
    font-size: 27px;
    color: #fff;
    font-weight: 500;
  }

  .icon-user {
    position: relative;
    width: 24px;
    height: 26px;
    margin-right: 20px;
    fill: #7349ca;
  }

  .support-collapse {
    border-top: 1px solid #1b1d35;
    border-bottom: 1px solid #1b1d35;

    ::v-deep {
      .el-collapse-item__header {
        background-color: transparent;
        color: #6a6d88;
        padding: 0 20px;
        font-size: 18px;
        height: 65px;
        line-height: inherit;
        border-bottom: 1px solid #1b1d35;
      }

      .el-collapse-item__header.is-active {
        background-color: #0d0e1d;
        color: #d4d6e7;
        border-bottom-color: transparent;
      }

      .el-collapse-item__wrap {
        background-color: #111225;
        border-bottom: 1px solid #1b1d35;
      }

      .el-collapse-item__content {
        color: #a4a6c1;
        padding: 20px;
        font-size: 16px;
      }
    }
  }

  @media (min-width: 480px) {
  }

  @media (min-width: 768px) {
  }

  @media (min-width: 992px) {
  }

  @media (min-width: 1200px) {
  }

  @media (min-width: 1440px) {
  }

  @media only screen and (max-width: 1439px) {
  }

  @media only screen and (max-width: 1199px) {
  }

  @media only screen and (max-width: 991px) {
  }

  @media only screen and (max-width: 767px) {
    .profile-inner {
      padding: 0;
    }
  }

  @media only screen and (max-width: 479px) {
  }
</style>
