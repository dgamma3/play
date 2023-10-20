<template>
  <div>
    <div class="member">
      <!-- 会员 -->
      <div class="member-div">
        <!-- <div>成为会员</div> -->
        <div style="width: 70%; margin: auto;">
          <img style="width: 100%; height: 100%;" src="../../../assets/img/img1/huiyuan1.png" alt="">
        </div>
        <!--  <div style="height: 50%;width: 100%;text-align: center; position: relative;">
          <img @click="payMember()" class="member-div-img-img" src="../../../assets/img/img1/beijing.png" alt="">
          <p @click="payMember()" class="member-div-p">会员期$30/月</p></img>
        </div> -->
      </div>
      <div class="imglist">
        <!-- 昵称 -->
        <div class="member-div1">
          <div class="member-div-vip" style="position: relative;">
            <img v-if="user.vip_img !=''" class="member-div-img-0" :src="repair(user.vip_img)"
              style="position: absolute;" alt="">
            <img class="member-div-img" :src="repair(user.portrait)" style="position: absolute;" alt="">
            <p style="position: absolute; bottom: 5px;left: 56%;">vip{{member_level}}</p>
            <!-- <img class="member-div-img1" src="../../../assets/img/jiantou.png"> -->
          </div>
          <div class="member-div-vip1">
            <ul>
              <li style="margin-top: 20px;color: #fff;">昵称：<span
                  style="font-size: 12px; font-weight: 700 ; color: #fff;">
                  {{ user.name }}</span></li>
              <li class="el-progress">
                <div>
                  <el-progress class="el-progress-bar" color="#8130de" :show-text="false" :text-inside="true"
                    :stroke-width="25" :percentage="datalist1"></el-progress>
                </div>
              </li>
              <li style="margin-top: 10px; color: #fff;"> 成长值：{{ balance_sum }}/{{balance_sum1}} </li>
            </ul>
          </div>
        </div>
        <!-- 权限 -->
        <div class="member-div2">
          <div style="overflow-x:scroll;">
            <ul class="member-div2-header">
              <li>VIP特权</li>
              <li>VIP1</li>
              <li>VIP2</li>
              <li>VIP3</li>
              <li>VIP4</li>
              <li>VIP5</li>
              <li>VIP6</li>
              <li>VIP7</li>
              <li>VIP8</li>
            </ul>
            <div class="">
              <ul class="member-div2-fotter ">
                <li>头像图标</li>
                <li>白色专属图标</li>
                <li>绿色专属图标</li>
                <li>蓝色专属图标</li>
                <li>紫色专属图标</li>
                <li>红色专属图标</li>
                <li>金色专属图标</li>
                <li>金色专属图标</li>
                <li>金色专属图标</li>
              </ul>
              <ul class="member-div2-fotter">
                <li>金币奖励</li>
                <li>赠送3金币</li>
                <li>赠送10金币</li>
                <li>赠送20金币</li>
                <li>赠送50金币</li>
                <li>赠送70金币</li>
                <li>赠送120金币</li>
                <li>赠送150金币</li>
                <li>赠送280金币</li>
              </ul>
              <ul class="member-div2-fotter">
                <li>充值加送</li>
                <li>充值加送2%</li>
                <li>充值加送3%</li>
                <li>充值加送4%</li>
                <li>充值加送5%</li>
                <li>充值加送6%</li>
                <li>充值加送6%</li>
                <li>充值加送7%</li>
                <li>充值加送8%</li>
              </ul>
              <ul class="member-div2-fotter">
                <li>对外隐藏仓库</li>
                <li>不支持</li>
                <li>不支持</li>
                <li>隐藏</li>
                <li>隐藏</li>
                <li>隐藏</li>
                <li>隐藏</li>
                <li>隐藏</li>
                <li>隐藏</li>
              </ul>
              <!--  <ul class="member-div2-fotter">
                <li>竞技场表情包</li>
                <li>通用</li>
                <li>通用</li>
                <li>通用</li>
                <li>通用</li>
                <li>通用</li>
                <li>通用</li>
                <li>通用</li>
                <li>通用</li>
              </ul>
              <ul class="member-div2-fotter">
                <li>自定义ROLL</li>
                <li>白色专属图标</li>
                <li>绿色专属图标</li>
                <li>蓝色专属图标</li>
                <li>紫色专属图标</li>
                <li>红色专属图标</li>
                <li>金色专属图标</li>
                <li>金色专属图标</li>
                <li>金色专属图标</li>
              </ul>
              <ul class="member-div2-fotter">
                <li>VIP专属箱子</li>
                <li>通用</li>
                <li>通用</li>
                <li>通用</li>
                <li>通用</li>
                <li>通用</li>
                <li>通用</li>
                <li>通用</li>
                <li>通用</li>
              </ul>
              -->
              <ul class="member-div2-fotter">
                <li>领取等级奖励</li>
                <li id="member-div2-fotter-1" v-for="(item,index) in giveList" @click="clickLingqu(item ,index)">
                  <span v-if="item=='' ">去升级</span>
                  <span v-if="item.stat==0 ">领取</span>
                  <span v-if="item.stat==1 ">已领取</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getStore,
    setStore
  } from "@/utils/store.js";
  import {
    ttGet,
    ttPost,
    repair
  } from "@/utils/util.js";
  export default {
    data() {
      return {
        symbol: this.$getStore({
          name: 'symbol'
        }),
        user: {},
        giveList: [],
        // timeLineHeight: '',

        datalist1: '',
        member_level: '',
        balance_sum: '',
        balance_sum1: ''
      }
    },
    created() {

      this.get_user()
      this.getlinqu()
      // this.payQuery()
    },
    mounted() {

    },

    methods: {
      repair,
      getlinqu() {
        ttGet("/api.php/user/get_give", '', (res) => {
          if (res.code == 200) {
            this.giveList = res.data.giveList;
            if (this.giveList.length < 8) {
              for (var i = this.giveList.length; i < 8; i++) {
                this.giveList.push('')
              }
            }
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        });
      },

      //获取用户信息
      get_user() {
        ttGet("/api.php/user/user_info", '', (res) => {
          if (res.code == 200) {
            this.user = res.data.user;
            console.log(this.user, "123");
            // vip
            this.member_level = res.data.user.member_level
            // 充值多少
             this.balance_sum = res.data.user.balance_sum
            // this.balance_sum=15000
  //           if(this.member_level<14000){
  //            return
  //           }
            var list = [
              {
                money: "50.00",
                num: -2
              },
              {
                money: "300.00",
                num: 3
              },
              {
                money: "800.00",
                num: 8
              },

              {
                money: "2000.00",
                num: 20
              },
              {
                money: "3500.00",
                num: 35
              },
              {
                money: "5000.00",
                num: 50
              },
              {
                money: "8000.00",
                num: 80
              },
              {
                money: "14000.00",
                num: 140
              }
            ]
            this.balance_sum1 = list[res.data.user.member_level].money
            if (list[res.data.user.member_level] < 0) {
              this.datalist1 = this.balance_sum * (0 - list[res.data.user.member_level].num)
            } else {
              this.datalist1 = this.balance_sum / (list[res.data.user.member_level].num)
            }
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        });
      },

      // 购买会员
      payMember() {
        let jwt_token = getStore({
          name: "jwt_token"
        });
        if (jwt_token) {

          ttGet("/api.php/user/pay_member", {
            bean: 30
          }, (res) => {
            if (res.code == 200) {
              this.$emit("user_bean", {
                balance: res.data.balance
              });
              this.$notify({
                title: '购买成功',
                type: 'success',
                duration: 2000
              });

            } else {
              this.$notify({
                title: res.msg,
                type: 'error',
                duration: 3000
              });
            }
          });
        }
      },
      // 充值
      // payQuery() {
      //   var that = this;
      //   let timer = setInterval(function() {
      //     ttPost("/api.php/user/pay_query", {
      //       order: '215168472778310599'
      //     }, (res) => {

      //       if (res.code == 200) {
      //         clearInterval(timer);
      //         that.user.bean = res.data.balance;
      //         that.recharge_page2 = false;
      //         that.$message({
      //           message: res.msg,
      //           type: "success",
      //         });
      //       }
      //     });
      //   }, 5000);
      // },

      //领取
      clickLingqu(item, index) {

        if (item == '') {
          this.$emit("open_r", true);

          return
        }
        let jwt_token = getStore({
          name: "jwt_token"
        });
        if (jwt_token) {
          ttPost("/api.php/user/give_query", {
            id: item.id
          }, (res) => {
            console.log("123", item, "123123");
            if (res.code == 200) {
              this.$emit("user_bean", {
                balance: res.data.balance
              });
              this.$message({
                message: res.msg,
                type: "success",
              })
              this.getlinqu()
            }
            if (res.code == 400) {
              this.$message({
                message: res.msg,
              })
            }
          })

        } else {
          this.$message({
            message: '您还没有登录',
            type: "error",
          });
        }
      }
    }
  }
</script>
<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

  .member {
    width: 100%;
    // height: 800px;
  }

  .member-div {
    width: 70%;
    margin: auto;

  }

  .member-div1 {
    width: 70%;
    margin: 5% auto 0;
    height: 160px;
    background: #26233b;
    display: flex;


    .member-div-vip1 {


      ul li {
        height: 40px;
        line-height: 25px;

      }
    }
  }

  .member-div2 {
    margin-top: 20px;
    width: 70%;
    margin: 20px auto;
    // height: 500px;
    background: #1b192d;

    .member-div2-header {
      font-size: clamp(0.6rem, 0.489rem + 1.05vw, 1.2rem);
      //  display: flex;
      display: -webkit-box;
      justify-content: space-around;
      height: 50px;
      align-items: center;
      background: #26233b;
      color: #fff;
      font-weight: 600;

      li {
        height: 60px;
        //  line-height: 60px;
        color: #ccc;
        //  width: 30%;

        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #26233b;

      }
    }

    member-div2-fotter1 {
      margin-top: 15px;
    }

    .member-div2-fotter {
      //  display: flex;

      justify-content: space-around;
      font-size: clamp(0.2rem, 0.189rem + 1.05vw, 1rem);
      /* 通过动态计算首选值实现响应式字体变化 */
      display: -webkit-box;

      li {
        height: 50px;
        color: #ccc;
        // width: 30%;
        text-align: center;
        line-height: 50px;
      }
    }

    .member-div2-fotter li:nth-child(1) {
      color: #ffaa3c;
    }
  }

  #member-div2-fotter-1 {

    span {
      color: blueviolet;
    }

  }

  .el-progress {
    height: 15px;
    background: #1b192d;
    text-align: center;
    border-radius: 15px;


  }

  .el-progress-bar {
    // width: 98%;
    padding-right: 0;
    // background: #1b192d;


    .el-progress-bar__outer {
      background-color: #1b192d;
    }
  }

  // .imglist {
  //     width: 70%;
  //     margin: auto;
  //     height: 700px;
  //     background-image: url("../../../assets/img/dise1.png");
  // }
  .el-progress-bar {
    margin-right: -2px;
  }

  // 适配
  @media (min-width: 300px) {
    .member-div-img-img {
      width: 35%;
    }

    .member-div-p {
      position: absolute;
      top: 33%;
      font-size: 12px;
      left: 37%;
      color: #fff;
    }

    .member-div2-fotter {
      li {
        width: 30%;
      }
    }

    .member-div2-header {
      li {
        width: 30%;
      }
    }

    .member-div1 {
      width: 70%;
      margin: 5% auto 0;
      height: 100px;
      background: #26233b;
      display: flex;

      // justify-content: space-around;
      .member-div-vip {
        text-align: center;
        width: 42px;

        .member-div-img1 {
          width: 20px;
          height: 5px;
        }

        .member-div-img {
          position: absolute;
          width: 86%;
          left: 18%;
          top: 22%;
          border-radius: 44px
        }

        .member-div-img-0 {
          width: 167%;
          left: -9px;
          top: 6px;
          position: absolute;
          z-index: 9
        }

        .member-div-img1 {
          width: 30px;
          height: 10px;
        }


        .member-div-img1 {
          width: 20px;
          height: 5px;
        }

        p {
          font-size: 15px;
          font-weight: 700;
          color: #ffaa3c;
        }
      }

      .member-div-vip1 {
        width: 80%;
        margin-left: 20px;

        ul li {
          height: 25px;
          line-height: 15px;
          font-size: 13px
        }

        span {
          font-size: 15px;
        }
      }

      .el-progress-bar {
        // width: 70%;

        .el-progress-bar__outer {
          height: 25px;
          background-color: #1b192d;
        }
      }
    }
  }

  // 适配
  @media (min-width: 380px) {
    .member-div-img-img {
      width: 35%;
    }

    .member-div-p {
      position: absolute;
      top: 33%;
      font-size: 12px;
      left: 37%;
      color: #fff;
    }

    .member-div2-fotter {
      li {
        width: 30%;
      }
    }

    .member-div2-header {
      li {
        width: 30%;
      }
    }

    .member-div1 {
      width: 70%;
      margin: 5% auto 0;
      height: 100px;
      background: #26233b;
      display: flex;

      // justify-content: space-around;
      .member-div-vip {
        text-align: center;
        width: 42px;

        .member-div-img1 {
          width: 20px;
          height: 5px;
        }

        .member-div-img {
          position: absolute;
          width: 86%;
          left: 18%;
          top: 22%;
          border-radius: 44px
        }

        .member-div-img-0 {
          width: 167%;
          left: -9px;
          top: 6px;
          position: absolute;
          z-index: 9
        }

        .member-div-img1 {
          width: 30px;
          height: 10px;
        }


        .member-div-img1 {
          width: 20px;
          height: 5px;
        }

        p {
          font-size: 15px;
          font-weight: 700;
          color: #ffaa3c;
        }
      }

      .member-div-vip1 {
        width: 80%;
        margin-left: 20px;

        ul li {
          height: 25px;
          line-height: 15px;
          font-size: 13px
        }

        span {
          font-size: 15px;
        }
      }

      .el-progress-bar {
        // width: 70%;

        .el-progress-bar__outer {
          height: 25px;
          background-color: #1b192d;
        }
      }
    }
  }

  @media (min-width: 568px) {
    .member-div-img-img {
      width: 30%;
    }

    .member-div-p {
      position: absolute;
      top: 33%;
      font-size: 0.8rem;
      left: 40%;
      color: #fff;
    }

    .member-div-vip {
      text-align: center;
      width: 160px;

      .member-div-img1 {
        width: 20px;
        height: 5px;
      }

      .member-div-img {
        position: absolute;
        width: 42%;
        left: 18%;
        top: 22%;
        border-radius: 44px
      }

      .member-div-img-0 {
        width: 78%;
        left: 0px;
        top: 0px;
        position: absolute;
        z-index: 9
      }

      .member-div-img1 {
        width: 30px;
        height: 10px;
      }

      p {
        font-size: 15px;
        font-weight: 700;
        color: #ffaa3c;
      }
    }

  }

  @media (min-width: 768px) {
    .member-div-img-img {
      width: 30%;
    }

    .member-div-p {
      position: absolute;
      top: 33%;
      font-size: 1.2rem;
      left: 40%;
      color: #fff;
    }

    .member-div2-fotter {

      li {
        width: 20%;
      }
    }

    .member-div2-header {

      li {
        width: 20%;
      }
    }

    .member-div1 {
      width: 70%;
      margin: 5% auto 0;
      height: 120px;
      background: #26233b;
      display: flex;

      .member-div-vip {
        text-align: center;
        width: 160px;

        .member-div-img1 {
          width: 20px;
          height: 5px;
        }

        .member-div-img {
          position: absolute;
          width: 44%;
          left: 17%;
          top: 16%;
          border-radius: 44px
        }

        .member-div-img-0 {
          width: 78%;
          left: 0px;
          top: 0px;
          position: absolute;
          z-index: 9
        }

        .member-div-img1 {
          width: 30px;
          height: 10px;
        }

        p {
          font-size: 15px;
          font-weight: 700;
          color: #ffaa3c;
        }
      }

      .member-div-vip1 {
        width: 80%;
        margin-left: 20px;

        ul li {
          height: 25px;
          line-height: 15px;
          font-size: 13px
        }

        span {
          font-size: 15px;
        }
      }

      .el-progress-bar {
        // width: 70%;

        .el-progress-bar__outer {
          height: 25px;
          background-color: #1b192d;
        }
      }
    }

  }

  @media (min-width: 992px) {
    .member-div-img-img {
      width: 30%;
    }

    .member-div-p {
      position: absolute;
      top: 33%;
      font-size: 1.5rem;
      left: 40%;
      color: #fff;
    }

    .member-div2-fotter {

      li {
        width: 14.3%;
      }
    }

    .member-div2-header {
      li {
        width: 14.3%;
      }
    }

    .member-div1 {
      width: 70%;
      margin: 5% auto 0;
      height: 140px;
      background: #26233b;
      display: flex;

      .member-div-vip {
        width: 200px;
        text-align: center;

        .member-div-img {
          position: absolute;
          width: 45%;
          left: 18%;
          top: 18%;
          border-radius: 44px
        }

        .member-div-img-0 {
          width: 80%;
          left: 0px;
          top: 0px;
          position: absolute;
          z-index: 9
        }

        .member-div-img1 {
          width: 30px;
          height: 10px;
        }

        p {
          font-size: 20px;
          font-weight: 700;
          color: #ffaa3c;
        }
      }

      .member-div-vip1 {
        width: 80%;
        margin-left: 20px;

        ul li {
          height: 35px;
          line-height: 20px;
          font-size: 16px
        }

        span {
          font-size: 20px;
        }
      }

      .el-progress-bar {
        // width: 70%;

        .el-progress-bar__outer {
          height: 25px;
          background-color: #1b192d;
        }
      }
    }
  }

  @media (min-width: 1200px) {
    .member-div2-fotter {

      li {
        width: 14.3%;
      }

    }

    .member-div2-header {

      li {
        width: 14.3%;
      }
    }

    .member-div-img-img {
      width: 30%;
    }

    .member-div-p {
      position: absolute;
      top: 33%;
      font-size: 2rem;
      left: 40%;
      color: #fff;
    }

    .member-div1 .member-div-vip {
      width: 200px;
      text-align: center;

      .member-div-img {
        position: absolute;
        width: 45%;
        left: 18%;
        top: 18%;
        border-radius: 44px
      }

      .member-div-img-0 {
        width: 80%;
        left: 0px;
        position: absolute;
        z-index: 9
      }
    }

  }

  @media (min-width: 1440px) {
    .member-div2-fotter {
      li {
        width: 14.3%;
      }
    }

    .member-div2-header {
      li {
        //  line-height: 60px;
        width: 14.3%;
      }
    }

    //
    .member-div1 {
      width: 70%;
      margin: 5% auto 0;
      height: 160px;
      background: #26233b;
      display: flex;
      // justify-content: space-around;

      .member-div-vip {
        width: 200px;
        // height: 100%;
        // background: pink;
        text-align: center;

        .member-div-img {
          position: absolute;
          width: 43%;
          left: 18%;
          top: 14%;
          border-radius: 44px
        }

        .member-div-img-0 {
          width: 80%;
          left: 0px;
          top: -6px;
          position: absolute;
          z-index: 9
        }

        p {
          font-size: 25px;
          font-weight: 700;
          color: #ffaa3c;
        }
      }

      .member-div-vip1 {
        width: 80%;
        // height: 100%;
        margin-left: 20px;

        ul li {
          height: 35px;
          line-height: 25px;
          font-size: 20px
        }

        span {
          font-size: 25px;
        }
      }

      .el-progress-bar {
        // width: 70%;
        // background: #1b192d;


        .el-progress-bar__outer {
          height: 25px;
          background-color: #1b192d;
        }
      }
    }

    //
    .member-div-img-img {
      width: 30%;
    }

    .member-div-p {
      position: absolute;
      top: 33%;
      font-size: 2.3rem;
      left: 40%;
      color: #fff;
    }
  }

  @media only screen and (max-width: 1439px) {}

  @media only screen and (max-width: 1199px) {}

  @media only screen and (max-width: 991px) {}

  @media only screen and (max-width: 767px) {}

  @media only screen and (max-width: 479px) {}
</style>
