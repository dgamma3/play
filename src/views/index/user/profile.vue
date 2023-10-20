<template>
  <div>
    <template v-if="loadingIndex">
      <div class="text-center">
        <i class="el-icon-loading data-loading"></i>
      </div>
    </template>
    <template v-else>
      <div class="profile">
        <div class="profile-inner" style="padding: 0 15px;">
          <div class="profile-header">
            <h2 class="profile-title">
              <svg class="icon-user" viewBox="0 0 30 34">
                <path
                  d="M29.997 29.978v2.009a1.993 1.993 0 0 1-2.02 2.008H2.015a1.993 1.993 0 0 1-2.02-2.008v-1.972c0-2.98 1.18-5.795 3.324-7.926a11.523 11.523 0 0 1 3.754-2.47 13.312 13.312 0 0 1-.163-.16c-2.167-2.155-3.361-5.01-3.361-8.038 0-3.029 1.194-5.883 3.361-8.039C9.016 1.207 11.891.004 14.996.004c3.047 0 5.918 1.186 8.086 3.341 2.167 2.155 3.361 5.01 3.361 8.038 0 3.026-1.227 5.958-3.366 8.044a9.324 9.324 0 0 1-.16.154 11.512 11.512 0 0 1 3.756 2.47c2.112 2.1 3.324 4.99 3.324 7.927zm-23.862-5.09a7.184 7.184 0 0 0-2.137 5.127h21.959a7.183 7.183 0 0 0-2.138-5.127c-1.326-1.352-3.19-2.124-5.12-2.124h-7.406a7.27 7.27 0 0 0-5.158 2.125zM9.727 6.146a7.334 7.334 0 0 0-2.175 5.238c0 1.948.775 3.811 2.181 5.246a7.416 7.416 0 0 0 5.263 2.155c1.96 0 3.833-.77 5.276-2.168a7.33 7.33 0 0 0 2.169-5.233c0-1.946-.774-3.807-2.179-5.241a7.422 7.422 0 0 0-5.266-2.16 7.422 7.422 0 0 0-5.27 2.163z"/>
              </svg>
              <span>个人资料页</span>
            </h2>
            <!-- <router-link class="profile-member" to="/member">
              <span>成为优质会员</span>
              <svg class="icon-member" viewBox="0 0 33 31">
                <g>
                  <g>
                    <path
                      d="M32.665 10.056l-14.93 20.336-.037.038a1.495 1.495 0 0 1-.304.28 1.739 1.739 0 0 1-.347.188l-.117.036a1.388 1.388 0 0 1-.112.03 1.242 1.242 0 0 1-.307.036c-.116 0-.238-.015-.357-.045l-.066-.017a2.241 2.241 0 0 1-.028-.008l-.08-.025a1.03 1.03 0 0 1-.128-.057 1.5 1.5 0 0 1-.225-.128l-.078-.058a1.697 1.697 0 0 1-.236-.226l-.08-.097L.28 9.971l-.016-.038a1.768 1.768 0 0 1-.154-.32L.078 9.51a1.786 1.786 0 0 1-.07-.384l-.003-.044a1.82 1.82 0 0 1 .06-.544l.015-.055c.038-.126.086-.242.146-.351l.008-.023.06-.093L5.125.726A1.587 1.587 0 0 1 6.44 0h20.13c.52 0 1.01.27 1.312.724l.001.002 4.83 7.291c.405.61.386 1.45-.047 2.039zm-11.262 9.776l6.696-9.12h-3.62zm-9.455-9.12l4.555 13.506 4.556-13.506zm-4.671-7.29L4.714 7.29H9l3.664-3.868zm4.327 16.41l-3.076-9.12h-3.62zM19.44 7.29l-2.937-3.1-2.936 3.1zm.904-3.868l3.664 3.868h4.285L25.73 3.422z"/>
                  </g>
                </g>
              </svg>
            </router-link> -->
          </div>
        </div>
        <div :class="'profile-info ' + [user.vip_status == 1 ? 'profile-vip' : '']">
          <div class="profile-info-wrap">
            <img class="profile-avatar" :src="repair(user.portrait)" alt="">
            <img class="profile-member-img" v-if="user.vip_status == 1" src="@/assets/img/prem.svg" alt="">
          </div>
          <div class="profile-name">{{user.name}}</div>
        </div>
        <div class="profile-inner">
          <div class="profile-items">
            <div class="profile-items-header">
              <h2 class="profile-items-title">
                <span>历史记录</span>
              </h2>
            </div>
            <div class="profile-item">
              <div :class="'live-item live-item-bg live-item-bg-'+color(item.ornaments.color, 4)" v-for="(item, index) in box_record">
                <router-link :to="item.url">
                  <div :class="color(item.ornaments.color, 3)">
                    <div class="o-item">
                      <div class="o-body">
                        <svg class="o-bg" viewBox="0 0 87.3 107.3">
                          <path d="M83.1 107.3l-61.8-74L87.3 0l-4.2 107.3z" fill-opacity=".04"></path>
                          <path d="M67.7 70.1l-57.5 32.6 11.3-61.3 46.2 28.7z" fill-opacity=".13"></path>
                          <path d="M67.3 63.5L27 74.5l14.3-37.4 26 26.4z" fill-opacity=".02"></path>
                          <path d="M85.5 79.1L51 106.6l29.6-37.4 4.9 9.9z" fill-opacity=".2"></path>
                          <path d="M19.6 72.9L0 52.9l24.1 2-4.5 18z" fill-opacity=".07"></path>
                        </svg>
                        <img class="o-img" :src="img_url + item.ornaments.img" alt="">
                      </div>
                    </div>
                    <div class="live-item-quality">{{ quality(item.ornaments.quality, 2) }}</div>
                    <div class="live-item-price price_box "><child-component v-html="symbol"></child-component> {{item.price}}</div>
                    <div class="o-name">{{item.ornaments.name}}</div>
                    <div class="o-abrasion" v-if="item.ornaments.appid == 730">{{ abrasion(item.ornaments.abrasion) }}</div>
                    <div class="o-abrasion" v-else>{{ quality2(item.ornaments.quality2) }}</div>
                    <div class="live-item-chance" v-if="item.type == 3">
                      <span>{{item.probability}}%</span>
                      Percent
                    </div>
                    <img class="o-box" :src="img_url + item.box_img">
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import {ttGet, ttPost, ttWebSocket, abrasion, quality, quality2, color, repair} from "@/utils/util.js";

  export default {
    data() {
      return {
        img_url: this.$img_url,
        symbol: this.$getStore({name: 'symbol'}),
        loadingIndex: true,
        id: '',
        user: {},
        box_record: []
      }
    },
    mounted() {
      this.id = encodeURIComponent(this.$route.params.id);
      this.get_profile();
    },
    watch: {
      $route(newVal) {
        this.id = encodeURIComponent(newVal.params.id);
        this.loadingIndex = true;
        this.get_profile();
      },
    },
    methods: {
      abrasion, quality, quality2, color, repair,

      //获取用户信息
      get_profile() {
        let id = this.id;
        ttGet("/api.php/user/get_profile", {id: id}, (res) => {
          this.loadingIndex = false;
          if (res.code == 200) {
            this.user = res.data.user;
            this.box_record = res.data.box_record;
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

  .profile-member {
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 16px;
    line-height: 1;
    padding: 13px 12px 12px 16px;
    border-radius: 3px;
    background-image: linear-gradient(-111deg, #5c0feb 0, #ce40ed 100%);
  }

  .icon-member {
    width: 16px;
    height: 16px;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    fill: currentColor;
    margin-left: 10px;
  }

  .profile-info {
    position: relative;
    z-index: 0;
    padding-top: 50px;
    padding-bottom: 40px;
    background: url("~@/assets/img/profile-triangles.png") center bottom/1000px auto no-repeat #0e0f1e;
    height: 258px;
    text-align: center;
  }

  .profile-info-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 82px;
    height: 82px;
    margin: 0 auto 10px;
    border-radius: 22px;
    background-color: #0e0f1e;
  }

  .profile-vip {
    .profile-info-wrap {
      border: 2px solid #5f4de5;
    }
  }

  .profile-vip::after {
    content: '';
    position: absolute;
    z-index: -1;
    bottom: 0;
    left: 50%;
    width: 417px;
    height: 281px;
    background: url("~@/assets/img/profile-premium.png") center bottom/contain no-repeat;
    transform: translateX(-50%);
  }

  .profile-avatar {
    display: block;
    border-radius: 22px;
    width: 100%;
    height: 100%;
    height: auto;
    filter: contrast(1);
  }

  .profile-member-img {
    position: absolute;
    top: -8px;
    right: -10px;
    border-radius: 50%;
    width: 28px;
  }

  .profile-name {
    font-size: 23px;
    color: #edeef3;
  }

  .profile-items {
    padding-top: 40px;
  }

  .profile-items-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
  }

  .profile-items-title {
    position: relative;
    z-index: 0;
    margin: 0;
    color: #fff;
    font-size: 24px;
    text-transform: uppercase;
    font-weight: 500;
  }

  .profile-items-title::before {
    width: 196px;
    height: 106px;
    background: url("~@/assets/img/heading-bg.svg") center/contain no-repeat;
    transform: translate(-55%,-55%);
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 50%;
    content: '';
  }

  .profile-items-title::after {
    transform: translate(-50%,-50%);
    width: 100px;
    height: 2px;
    border-radius: 50%;
    background-color: rgba(58,62,95,.5);
    box-shadow: 0 0 30px 10px #3a3e5f;
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 50%;
    content: '';
  }

  .profile-item {
    display: flex;
    flex-wrap: wrap;
    border-left: 1px solid #1e2138;
    margin-bottom: 60px;
    border-top: 1px solid #1e2138;
  }

  .live-item {
    display: flex;
    flex-direction: column;
    flex: 0 0 14.28571%;
    max-width: 14.28571%;
    border: 1px solid #1e2138;
    border-left-color: transparent;
    border-top-color: transparent;
    background-color: #15172c;
    text-align: left;
    padding: 20px;
    position: relative;
  }

  .live-item-probability {
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    padding: 5px 10px;
    background-color: rgba(48, 52, 88, .23);
    font-size: 10px;
    color: #a1a3b6;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .live-item-quality {
    margin-top: -13px;
    margin-bottom: 5px;
    margin-left: 0;
    font-size: 8px;
    color: #f9a328;
    white-space: nowrap;
    line-height: 1;
    z-index: 2;
  }

  .live-item-price {
    font-size: 13px;
    font-weight: 700;
    color: #7bdca2;
    margin-bottom: 3px;
  }

  .live-item-img {
    width: 100%;
    max-width: 120px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: -10px;
  }

  .o-body {
    width: 100%;
    max-width: 120px;
    margin-left: auto;
    margin-right: auto;
  }

  .o-bg {
    width: 88px;
    height: 108px;
  }

  .o-item {
    padding: 0;
  }

  .live-item-chance {
    font-size: 7px;
    color: #898ece;
    line-height: 1.1;
    position: absolute;
    right: 15px;
    bottom: 36px;

    span {
      display: block;
      font-size: 10px;
      font-weight: 700;
    }
  }

  .o-box {
    position: absolute;
    right: 10px;
    bottom: 12px;
    z-index: 2;
    width: 40%;
    -webkit-transform: translateY(10px);
    transform: translateY(10px);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    opacity: 0;
    -webkit-transition: opacity .3s ease,-webkit-transform .3s ease;
    transition: opacity .3s ease,-webkit-transform .3s ease;
    transition: transform .3s ease,opacity .3s ease;
    transition: transform .3s ease,opacity .3s ease,-webkit-transform .3s ease;
  }

  .live-item:hover .o-box {
    -webkit-transform: none;
    transform: none;
    opacity: 1;
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
    .live-item {
      flex-basis: 20%;
      max-width: 20%;
    }
  }

  @media only screen and (max-width: 991px) {
    .live-item {
      flex-basis: 25%;
      max-width: 25%;
    }
  }

  @media only screen and (max-width: 767px) {
    .live-item {
      flex-basis: 50%;
      max-width: 50%;
    }

    .profile-inner {
      padding: 0;
    }
  }

  @media only screen and (max-width: 479px) {
  }
</style>
<style scoped>

.live-item-price { float: right; display:flex; justify-content:center; align-items:center;  margin-top: 3px; margin-bottom: 30px; }
 .live-item-price  /deep/  .symbol{ margin-left: 10px; width: 16px; padding-top: 3px; margin-right: 5px;  }
 .live-item-chance{    display: flex;
    justify-content: space-between;width: 80px;
    }
 
 </style>