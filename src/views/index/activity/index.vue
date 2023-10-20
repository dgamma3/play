<template>
  <div style="background: #181727;">
    <!-- 头部 -->
    <div class="activity-ui">
      <div style="display: flex; justify-content: space-between;align-items: center;">
        <img style="width: 25%;" src="../../../assets/img/img1/huodong.png" alt="">
        <!-- <p>
          <img class="activity-img" style="" src="../../../assets/img/img1/fanhui1.png" alt="">
        </p> -->
      </div>

    </div>
    <!-- 复制链接 -->
    <div class="activity-ui1" style="padding: 2%;">
      <div style="margin-top: 15px;">
        <div class="partner-field">
          <div class="partner-link">
            {{server_url}}?link_code={{user.invitation_code}}
          </div>
          <div class="partner-link-img" @click="copy"> 复制链接</div>
        </div>
      </div>
      <div class="activity-div">每天最多可被助力五次，每个用户只能助力一次</div>
    </div>
    <!--钻石  -->

    <div class="activity-ui">
      <div class="activity-zuan">
        <ul class="activity-zuan-ul" v-for="(item,id) in activityList" @click="suipian(item ,id)">
          <li>
            <img :src="item.img" alt="">
            <p>{{item.name}}个</p>
          </li>

        </ul>
      </div>
    </div>
    <!-- 抽奖 -->

    <div class="activity-ui2">
      <div class="activity-ui2-div">
        <div>
          <img style="width: 100%;" :src="hecheng0" alt="">
          <!-- <img  v-if="tu1" style="width: 100%;" src="../../../assets/img/img1/hecheng2.png" alt="">
          <img v-if="tu2" style="width: 100%;" src="../../../assets/img/img1/hecheng3.png" alt=""> -->
          <div class="activity-ui2-div-p1" @click="increase()">
            <!-- 添加 -->
          </div>
          <div class="activity-ui2-div-p" @click="synthesis()">
            <!-- 合成 -->
          </div>
          <div class="activity-ui2-div-p2" v-if="ifsynthesis">
            <!-- 左 -->
            <img style="width: 100%;" :src="img1" alt="">
          </div>
          <div class="activity-ui2-div-p3" v-if="ifsynthesis">
            <!-- 右 -->
            <img style="width: 100%;" :src="img1" alt="">
          </div>
        </div>

      </div>
    </div>
    <!-- 碎片 -->
    <div class="activity-ui">
      <div class="activity-zuan">
        <ul class="activity-zuan-ul">
          <li>
            <img src="../../../assets/img/img1/zi1.png" alt="">

          </li>
          <li>
            <img src="../../../assets/img/img1/lan1.png" alt="">

          </li>
          <li>
            <img src="../../../assets/img/img1/fen1.png" alt="">

          </li>
          <li>
            <img src="../../../assets/img/img1/hong1.png" alt="">

          </li>
          <li>
            <img src="../../../assets/img/img1/jin1.png" alt="">

          </li>
        </ul>
      </div>
    </div>
    <!-- 箱子 -->
    <div class="activity-ui3">
      <div class="activity-ui3-1" v-for="(item,id) in boxList">
        <span>
          <img :src="repair(item.img)" alt="">
        </span>

        <p style=" color: #fff;">{{item.name}}</p>
        <div class="activity-ui3-div">
          <img style="width: 30px; height: 30px;" :src="datalist[id].img1" alt="">
          <p>{{price}}</p>
          <p class="activity-ui3-p" style=" cursor:default;"  @click="clickGomai(item,id)">立即获得</p>
        </div>
        <div class="activity-ui3-opacity"> 
          <span  class="activity-ui3-span">*{{datalist[id].geshu}}</span>
          <p ><img src="../../../assets/img/img1/dakai.png" alt="" @click="open(item,id)"></p>
          <!-- <p v-else  ><img src="../../../assets/img/img1/zanwei.png" alt="" style=" cursor:default;" @click="open(item,id)"></p> -->
        </div>

      </div>




    </div>
    <!-- 弹出 -->
    <div>
      <el-dialog title="您赢了!" append-to-body :visible.sync="result_page" :close-on-click-modal="false"
        :lock-scroll="false" center v-if="ornaments_arr.length > 0"
        :class="'result-dialog result-dialog' + ornaments_arr[0].color">
        <div class="result-info">
          <img class="result-item" :src="img_url + ornaments_arr[0].img" />
          <svg class="result-bg" viewBox="0 0 806 990">
            <path fill-opacity=".07" d="M766.744 989.902L197.003 307.525 805.588.645z"></path>
            <path fill-opacity=".13" d="M624.926 646.62L94.815 946.72 199.353 381.5z"></path>
            <path fill-opacity=".02" d="M620.999 585.644L249.941 687.265 381.708 342.6z"></path>
            <path fill-opacity=".2" d="M788.776 729.591l-317.744 253.8L743.77 638.707z"></path>
            <path fill-opacity=".07" d="M181.021 672.364L.614 487.927l222.239 18.038z"></path>
          </svg>
          <svg class="result-polygon" viewBox="0 0 534 534">
            <path fill="none"
              d="M449.786 449.807l-182.785 75.716-182.787-75.716-75.713-182.79L84.214 84.225 267.001 8.51l182.785 75.715 75.713 182.792-75.713 182.79z">
            </path>
          </svg>
          <svg class="result-polygon result-polygon-lg" viewBox="0 0 722 722">
            <path fill="none"
              d="M612.723 612.746l-251.722 104.27-251.723-104.27L5.011 361.017l104.267-251.73L361.001 5.017l251.722 104.27 104.267 251.73-104.267 251.729z">
            </path>
          </svg>
          <div class="result-light"></div>
        </div>
        <div class="result-title"></div>
        <div class="result-name">{{ ornaments_arr[0].name }}</div>
        <div class="result-abrasion" v-if="ornaments_arr[0].appid == 730">
          {{ abrasion(ornaments_arr[0].abrasion)
        }}{{ quality(ornaments_arr[0].quality, 3) }}
        </div>
        <div class="result-abrasion">
          {{ quality2(ornaments_arr[0].quality2) }}
        </div>
        <div class="result-buttons">
          <button class="result-btn" @click="again">返回</button>
          <button class="result-btn result-btn2 price_box " @click="sell">
            出售<child-component v-html="symbol"></child-component>{{ ornaments_arr[0].open_price }}
          </button>
        </div>

      </el-dialog>
    </div>




  </div>
</template>
<script>
  import {
    ttGet,
    ttPost,
    ttWebSocket,
    abrasion,
    quality,
    quality2,
    color,
    repair,
  } from "@/utils/util.js";
  import {
    getStore,
    removeStore,
    setStore
  } from "@/utils/store.js";
  import {
    Logger
  } from "sass";
  export default {
    data() {
      return {
        ornaments_arr: [],
        price: '200',
        result_page: false, //结果页面
        img_url: this.$img_url,
        symbol: this.$getStore({
          name: "symbol"
        }),

        server_url: this.$server_url,
        hecheng0: require('@/assets/img/img1/hecheng1.png'),
        hecheng1: require('@/assets/img/img1/hecheng1.png'),
        hecheng2: require('@/assets/img/img1/hecheng2.png'),
        hecheng3: require('@/assets/img/img1/hecheng3.png'),
        activityList: [{
            name: '',
            img: require('@/assets/img/img1/zi.png'),
            img1: require('@/assets/img/img1/zizuan1.png'),
            id: '1'
          },
          {
            name: '',
            img: require('@/assets/img/img1/lan.png'),
            img1: require('@/assets/img/img1/lan2.png'),
            id: '2'
          },
          {
            name: '',
            img: require('@/assets/img/img1/fen.png'),
            img1: require('@/assets/img/img1/fen3.png'),
            id: '3'
          },
          {
            name: '',
            img: require('@/assets/img/img1/hong.png'),
            img1: require('@/assets/img/img1/hong4.png'),
            id: '4'
          },
          {
            name: '',
            img: require('@/assets/img/img1/jin.png'),
            img1: require('@/assets/img/img1/huang5.png'),
            id: '5'
          },


        ],

        input2: '',
        ifsynthesis: false,
        img1: '',
        name1: '',
        symbol: this.$getStore({
          name: 'symbol'
        }),
        loadingIndex: true,
        user: {},
        spread: [],
        invitation_code: '',
        datalist: [{
            name: '',
            id: '1',
            geshu: '',
            img: require('@/assets/img/img1/kapian2.png'),
            img1: require('@/assets/img/img1/zizuan1.png'),


          }, {
            name: '',
            id: '1',


            geshu: '',
            img: require('@/assets/img/img1/kapian2.png'),
            img1: require('@/assets/img/img1/lan2.png'),
          },
          {
            name: '',
            id: '1',


            geshu: '',
            img: require('@/assets/img/img1/kapian2.png'),
            img1: require('@/assets/img/img1/fen3.png'),
          },
          {
            name: '',
            id: '1',


            geshu: '',
            img: require('@/assets/img/img1/kapian2.png'),
            img1: require('@/assets/img/img1/hong4.png'),
          },
          {
            name: '网络明星',
            id: '1',


            geshu: '',
            img: require('@/assets/img/img1/kapian2.png'),
            img1: require('@/assets/img/img1/huang5.png'),
          },

        ],
        suipianId: '',
        boxList: '',
      }
    },
    mounted() {

    },
    created() {
      this.get_me()
      this.getSynthesis()

    },

    methods: {
      abrasion,
      quality,
      quality2,
      color,
      repair,
      //获取用户信息
      get_me() {
        let jwt_token = getStore({
          name: "jwt_token"
        });
        if (jwt_token) {
          ttGet("/api.php/user/user_info", "", (res) => {
            if (res.code == 200) {
              this.user = res.data.user;
              for (var i = 0; i < res.data.user.debris_level.length; i++) {
                this.activityList[i].name = res.data.user.debris_level[i]
                this.datalist[i].geshu = res.data.user.debris_level_box[i]
              }
            } else {
              removeStore({
                name: "jwt_token"
              });
            }
          });
        }
      },
      //复制推广链接
      copy() {
        let link_code = this.server_url + '?link_code=' + this.user.invitation_code;
        this.$copyText(link_code).then(
          () => {
            this.$message({
              message: '复制成功!',
              type: 'success'
            });
          },
          () => {
            this.$message({
              message: '复制失败!',
              type: 'warning'
            });
          }
        );
      },

      //increase 添加
      increase() {
        console.log(this.ifsynthesis);
        if (this.hecheng0 != this.hecheng1) {
          return
        }
        if (this.ifsynthesis != true) {
          this.ifsynthesis = true
          this.img1 = ''
        }

      },
      // synthesis合成
      synthesis() {

        this.hecheng0 = this.hecheng1
        if (this.ifsynthesis == false) {
          this.suipianId = ''
        }
        if (this.img1 != '' && this.suipianId != '') {

          let level_id = this.suipianId
          let num_id = 20
          let addnum_id = 10
          ttGet("/api.php/user/get_synthesis", {
            level: level_id,
            num: num_id,
            addnum: addnum_id
          }, (res) => {
            if (res.code == 200) {
              this.dataMsg = res.msg;
              if (res.msg == "合成成功") {
                // 合成成功
                this.hecheng0 = this.hecheng2
                this.ifsynthesis = false
                this.img1 = ''
                this.$message({
                  showClose: true,
                  message: this.dataMsg,
                  type: 'success'
                });
              }
              if (res.msg == "合成失败") {
                // 合成失败
                this.hecheng0 = this.hecheng3
                this.ifsynthesis = false
                this.img1 = ''
                this.$message({
                  showClose: true,
                  message: this.dataMsg,
                  type: 'error'
                });
              }
              this.activityList[level_id - 1].name = res.data.re[0]
              this.activityList[level_id].name = res.data.re[1]
              this.hecheng0 = this.hecheng0
            } else {
              this.$message({
                showClose: true,
                message: res.msg,
                type: 'error'
              });
            }
          });
        }


      },
      // suipian
      suipian(item,id) {
        if(id==4){
          return
        }
        console.log(id);
        this.img1 = item.img1
        this.name1 = item.name
        this.suipianId = item.id
      },
      // 盒子
      getSynthesis() {
        ttGet("/api.php/user/get_synthesis_box", "", (res) => {
          if (res.code == 200) {
            this.boxList = res.data.boxList

          } else {
            removeStore({
              name: "jwt_token"
            });
          }
        });
      },
      // 立即购买
      clickGomai(item,id) {

       console.log(this.activityList[id].name ,id+1);

        if (this.activityList[id].name <=199) {
          console.log(123);
          this.$message('相应碎片数量不够');
          return
        }
         console.log(item.id_code,"12@@@@@@@@@3");
        let box_id = item.id
        let level =id+1
        ttGet("/api.php/user/pay_synthesis_box", {
          box_id: box_id,
          level: level
        }, (res) => {
          if (res.code == 200) {

            this.activityList[level]-200
            this.activityList[level - 1].name = res.data.re[0]
            this.datalist[level - 1].geshu = res.data.re[1]
            this.$message({
              showClose: true,
              message: '兑换成功',
              type: 'warning'
            });
          }
          if (res.code == 400) {

            this.$message({
              showClose: true,
              message: res.msg,
              type: 'success'
            });
          }
        });
      },
      //开启箱子
      open(item ,id) {
        console.log(123);
        this.$router.push({path:'/box/'+item.id_code})
        // this.result_page = true;
        // let box_id = item.id
        //  let level = id+1
        // ttGet("/api.php/user/synthesis_open", {
        //   id: box_id,
        //  level:level
        // }, (res) => {
        //   if (res.code == 200) {
        //     this.datalist[id].geshu = this.datalist[id].geshu - 1
        //     this.ornaments_arr = res.data.ornaments_arr
        //   }
        // });
      },
      //
      again() {
        this.result_page = false;
      },
      //出售饰品
      sell() {
        let ornaments_arr = this.ornaments_arr;
        let record_id = [];
        for (let x in ornaments_arr) {
          record_id.push(ornaments_arr[x].record_id);
        }
        let loading = this.$loading({
          spinner: "el-icon-loading",
          background: "rgb(0 0 0 / 0%)",
        });
        ttPost("/api.php/user/sell", {
          record_id: record_id
        }, (res) => {
          loading.close();
          if (res.code == 200) {
            this.result_page = false;

            this.$emit("user_bean", {
              balance: res.data.balance
            });
            this.$message({
              message: res.msg,
              type: "success",
            });
          } else {
            this.$message({
              message: res.msg,
              type: "warning",
            });
          }
        });
      },
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
    margin-top: 15px;
  }

  .activity-ui {
    width: 90%;
    margin: 0 auto;
  }

  .el-select .el-input {
    width: 130px;
  }

  .el-input__inner {
    background-color: #1b192d;
    border: 1px solid #1b192d;

  }

  .input-with-select .el-input-group__prepend {
    background-color: #e22020;
  }

  .el-input__inner:hover {
    border-color: #1b192d;

  }

  .el-input-group__append {
    background-image: url("../../../assets/img/img1/lianjie.png");
    background-repeat: no-repeat
  }

  .el-input-group__append,
  .el-input-group__prepend {
    border: 1px solid #1b192d;
    background-color: #1b192d;
    color: #ccc;
  }

  // 抽奖
  .activity-ui2 {
    background: #181727;
    width: 90%;
    margin: auto;

    .activity-ui2-div {
      position: relative;
      height: 100%;
      width: 100%;

      .activity-ui2-div-p {
        position: absolute;
        background: #fff;
        opacity: 0;
      }

      .activity-ui2-div-p1 {
        position: absolute;
        background: #fff;
        opacity: 0;
      }
    }

    .activity-ui2-div-p2 {
      position: absolute;
      top: 0%;
      border: 1px solid;
      // background: red;
      // opacity: 0;
    }

    .activity-ui2-div-p3 {
      // background: red;
      position: absolute;
      top: 0%;
      border: 1px solid;
      // opacity: 0;

    }
  }


  .activity-ui3 {
    width: 90%;
    position: relative;
    margin: 4% auto;
    height: 235px;
    // background: pink;
    display: flex;
    justify-content: space-around;

    p {
      text-align: center;
      height: 40px;
      line-height: 40px;

    }

    .activity-ui3-div {
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: 20px;
      font-weight: 700;
      color: #ffaa3c;

      .activity-ui3-p {
        width: 100%;
        background-image: url("../../../assets/img/img1/huode.png");
        background-repeat: no-repeat;
        background-size: 100%;
        color: #fff;
      }
    }

    // 遮罩
    .activity-ui3-opacity {
      position: absolute;
      top: 0;
      width: 13%;
      height: 100%;
      background: #000;
      opacity: 0.8;

      p {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%
      }

      .activity-ui3-span {
        font-size: 20px;
        position: absolute;
        margin-top: 6%;
        width: 90%;
        display: block;
        color: #ffaa3c;
        ;
        text-align: end;
        font-weight: 700;
      }
    }

    //


  }

  .partner-field {
    align-items: center;
    display: flex;
    justify-content: space-between;
    background-color: #131528;
    // padding-left: 25px;
    // padding-right: 25px;
  }

  .partner-link {
    position: relative;
    // flex-grow: 1;
    padding-top: 3px;
    font-size: 12px;
    font-weight: 300;
    margin-right: 10px;
    overflow: hidden;
    color: #ffffff;
    // transform: scale(0.5);
  }

  .partner-link-img {
    height: 100%;
    width: 10%;
    text-align: center;
    color: #fff;

    background-image: url("../../../assets/img/img1/lianjie.png");
    background-repeat: no-repeat;
    background-size: 100%;

  }
 @media (min-width: 300px) {
    .activity-div {
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      color: #ccc;
    }

    .activity-img {
      width: 100%;
      margin-top: 5%;
      height: 25px;
    }

    .activity-ui1 {
      width: 90%;
      margin: 0 auto;
      height: 100px;

      background: #26233b;
    }

    .el-input__inner {
      height: 60px;
      line-height: 60px;
    }

    .activity-zuan {
      height: 80px;
      margin-top: 20px;
      background: #181727;
      display: flex;
      justify-content: space-around;
    }

    .activity-zuan-ul {
      display: flex;
      justify-content: space-around;
      align-items: center;

      img {
        width: 96%;
      }

      p {
        text-align: center;
        font-size: 12px;
        font-weight: 600;
        color: #ffaa3c;

      }
    }

    .activity-ui3 {
      background: #181727;
      width: 90%;
      flex-wrap: wrap;
      margin: 4% auto;
      height: 100%;
      justify-content: space-between;

      p {
        text-align: center;
        height: 30px;
        line-height: 30px;
      }

      img {
        width: 50%;
      }

      .activity-ui3-1 {
        width: 45%;
        margin-top: 4%;
        position: relative;
        background: #1c1e30;

        span {
          text-align: center;
          display: block;
        }
      }

      .activity-ui3-div {
        font-size: 15px;

        .activity-ui3-p {
          width: 100%;
          background-image: url("../../../assets/img/img1/huode.png");
          background-repeat: no-repeat;
          background-size: 100%;
          color: #fff;
        }
      }

      // 遮罩
      .activity-ui3-opacity {
        position: absolute;
        top: 0;
        width: 100%;
        height: 80%;

        .activity-ui3-span {
          font-size: 20px;
          margin-top: 6%;
          width: 90%;
        }
      }


    }

    // 抽奖
    .activity-ui2-div-p {
      top: 56%;
      left: 47%;
      width: 20px;
      height: 8px;
    }

    .activity-ui2-div-p1 {
      top: 25%;
      left: 48%;
      width: 13px;
      height: 10px;
    }

    .activity-ui2-div-p2 {

      width: 24px;
      left: 35%;
      height: 24px
    }

    .activity-ui2-div-p3 {
      left: 57%;
      width: 24px;
      height: 24px
    }

    .partner-field {
      height: 50px;
      line-height: 20px;
      font-size: 12px;


    }

    .partner-link-img {
      width: 27%;
      height: 50px;
      line-height: 50px // transform: scale(0.5);
    }
  }
  @media (min-width: 380px) {
    .activity-div {
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      color: #ccc;
    }

    .activity-img {
      width: 100%;
      margin-top: 5%;
      height: 25px;
    }

    .activity-ui1 {
      width: 90%;
      margin: 0 auto;
      height: 100px;

      background: #26233b;
    }

    .el-input__inner {
      height: 60px;
      line-height: 60px;
    }

    .activity-zuan {
      height: 80px;
      margin-top: 20px;
      background: #181727;
      display: flex;
      justify-content: space-around;
    }

    .activity-zuan-ul {
      display: flex;
      justify-content: space-around;
      align-items: center;

      img {
        width: 96%;
      }

      p {
        text-align: center;
        font-size: 12px;
        font-weight: 600;
        color: #ffaa3c;

      }
    }

    .activity-ui3 {
      background: #181727;
      width: 90%;
      flex-wrap: wrap;
      margin: 4% auto;
      height: 100%;
      justify-content: space-between;

      p {
        text-align: center;
        height: 30px;
        line-height: 30px;
      }

      img {
        width: 50%;
      }

      .activity-ui3-1 {
        width: 45%;
        margin-top: 4%;
        position: relative;
        background: #1c1e30;

        span {
          text-align: center;
          display: block;
        }
      }

      .activity-ui3-div {
        font-size: 15px;

        .activity-ui3-p {
          width: 100%;
          background-image: url("../../../assets/img/img1/huode.png");
          background-repeat: no-repeat;
          background-size: 100%;
          color: #fff;
        }
      }

      // 遮罩
      .activity-ui3-opacity {
        position: absolute;
        top: 0;
        width: 100%;
        height: 80%;

        .activity-ui3-span {
          font-size: 20px;
          margin-top: 6%;
          width: 90%;
        }
      }


    }

    // 抽奖
    .activity-ui2-div-p {
      top: 56%;
      left: 47%;
      width: 20px;
      height: 8px;
    }

    .activity-ui2-div-p1 {
      top: 25%;
      left: 48%;
      width: 13px;
      height: 10px;
    }

    .activity-ui2-div-p2 {

      width: 24px;
      left: 35%;
      height: 24px
    }

    .activity-ui2-div-p3 {
      left: 57%;
      width: 24px;
      height: 24px
    }

    .partner-field {
      height: 50px;
      line-height: 20px;
      font-size: 12px;


    }

    .partner-link-img {
      width: 27%;
      height: 50px;
      line-height: 50px // transform: scale(0.5);
    }
  }

  @media (min-width: 668px) {
    .activity-div {
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      color: #ccc;
    }

    .activity-img {
      width: 100%;
      margin-top: 5%;
      height: 25px;
    }

    .activity-ui1 {
      width: 90%;
      margin: 0 auto;
      height: 100px;

      background: #26233b;
    }

    .el-input__inner {
      height: 60px;
      line-height: 60px;
    }

    .activity-zuan {
      height: 133px;
      margin-top: 20px;
      background: #181727;
    }

    .activity-zuan-ul {
      display: flex;
      justify-content: space-around;
      align-items: center;

      img {
        width: 96%;
      }

      p {
        text-align: center;
        font-size: 12px;
        font-weight: 600;
        color: #ffaa3c;

      }
    }

    //
    .activity-ui3 {
      width: 90%;
      flex-wrap: wrap;
      margin: 4% auto;
      height: 100%;
      justify-content: space-between;

      p {
        text-align: center;
        height: 30px;
        line-height: 30px;
      }

      img {
        width: 50%;
      }

      .activity-ui3-1 {
        width: 41%;
        position: relative;

        span {
          text-align: center;
          display: block;
        }
      }

      .activity-ui3-div {
        font-size: 15px;

        .activity-ui3-p {
          width: 100%;
          background-image: url("../../../assets/img/img1/huode.png");
          background-repeat: no-repeat;
          background-size: 100%;
          color: #fff;
        }
      }

      // 遮罩
      .activity-ui3-opacity {
        position: absolute;
        top: 0;
        width: 100%;
        height: 88%;

        .activity-ui3-span {
          font-size: 20px;
          margin-top: 6%;
          width: 90%;
        }
      }

    }

    // 抽奖
    .activity-ui2-div-p {
      top: 58%;
      left: 48%;
      width: 25px;
      height: 10px;

    }

    .activity-ui2-div-p1 {
      top: 29%;
      left: 48%;
      width: 21px;
      height: 20px;
    }

    .activity-ui2-div-p2 {

      width: 45px;
      left: 37%;
      height: 45px;
    }

    .activity-ui2-div-p3 {

      left: 56%;
      width: 45px;
      height: 45px;
    }

    .partner-field {
      height: 40px;
      line-height: 40px;
    }

    .partner-link-img {
      height: 40px;
      line-height: 40px;
      width: 13%;
      font-size: 13px;
    }
  }

  @media (min-width: 992px) {
    .activity-div {
      height: 50px;
      line-height: 50px;
      font-size: 20px;
      color: #ccc;
    }

    .activity-img {
      width: 100%;
      margin-top: 5%;
      height: 25px;
    }

    .activity-ui1 {
      width: 90%;
      margin: 0 auto;
      height: 170px;

      background: #26233b;
    }

    .el-input__inner {
      height: 60px;
      line-height: 60px;
    }

    .activity-zuan {
      height: 230px;
      margin-top: 20px;
      background: #181727;
    }

    .activity-zuan-ul {
      display: flex;
      justify-content: space-around;
      align-items: center;

      img {
        width: 96%;
      }

      p {
        text-align: center;
        font-size: 30px;
        font-weight: 600;
        color: #ffaa3c;

      }
    }

    // 抽奖
    .activity-ui2-div-p {
      top: 58%;
      left: 48%;
      width: 30px;
      height: 15px;
    }

    .activity-ui2-div-p1 {
      top: 28%;
      left: 48%;
      width: 35px;
      height: 30px;
    }

    .activity-ui2-div-p2 {

      width: 55px;
      left: 38%;
      height: 55px;
    }

    .activity-ui2-div-p3 {

      left: 56%;
      width: 55px;
      height: 55px;
    }

    .partner-field {
      height: 60px;
      line-height: 60px;
    }

    .partner-link-img {
      width: 13%;
      font-size: 15px;
      height: 60px;
      line-height: 60px;
    }

    .activity-ui3 {
      width: 90%;
      flex-wrap: wrap;
      margin: 4% auto;
      height: 100%;
      justify-content: space-between;

      p {
        text-align: center;
        height: 30px;
        line-height: 30px;
      }

      img {
        width: 50%;
      }

      .activity-ui3-1 {
        width: 19%;
        position: relative;

        span {
          text-align: center;
          display: block;
        }
      }

      // 遮罩
      .activity-ui3-opacity {
        position: absolute;
        top: 0;
        width: 100%;
        height: 80%;

        .activity-ui3-span {
          font-size: 20px;
          margin-top: 6%;
          width: 90%;
        }
      }
    }
  }

  @media (min-width: 1200px) {
    .activity-div {
      height: 50px;
      line-height: 50px;
      font-size: 20px;
      color: #ccc;
    }

    .activity-img {
      width: 100%;
      margin-top: 5%;
      height: 25px;
    }

    .activity-ui1 {
      width: 90%;
      margin: 0 auto;
      height: 170px;

      background: #26233b;
    }

    .el-input__inner {
      height: 60px;
      line-height: 60px;
    }

    .activity-zuan {
      height: 230px;
      margin-top: 20px;
      background: #181727;
    }

    .activity-zuan-ul {
      display: flex;
      justify-content: space-around;
      align-items: center;

      img {
        width: 96%;
      }

      p {
        text-align: center;
        font-size: 30px;
        font-weight: 600;
        color: #ffaa3c;

      }
    }

    .activity-ui3 {
      width: 90%;
      flex-wrap: wrap;
      margin: 4% auto;
      height: 100%;

      p {
        text-align: center;
        height: 40px;
        line-height: 40px;
      }

      img {
        width: 100%;
      }

      .activity-ui3-1 {
        width: 17%;
        position: relative;

        span {
          text-align: center;
          display: block;
        }
      }

      .activity-ui3-div {
        font-size: 20px;

        .activity-ui3-p {
          width: 100%;
          background-image: url("../../../assets/img/img1/huode.png");
          background-repeat: no-repeat;
          background-size: 100%;
          color: #fff;
        }
      }

      // 遮罩
      .activity-ui3-opacity {
        position: absolute;
        top: 0;
        width: 100%;
        height: 82%;

        .activity-ui3-span {
          font-size: 20px;
          margin-top: 6%;
          width: 90%;
        }
      }

    }

    // 抽奖
    .activity-ui2-div-p {

      top: 58%;
      left: 48%;

      width: 40px;
      height: 16px;
      ;
    }

    .activity-ui2-div-p1 {
      top: 30%;
      left: 48%;
      width: 40px;
      height: 35px;
    }

    .activity-ui2-div-p2 {

      width: 60px;
      left: 38%;
      height: 60px;
    }

    .activity-ui2-div-p3 {

      left: 56%;
      width: 60px;
      height: 60px;
    }

    .partner-field {
      height: 66px;
      line-height: 66px;
    }

    .partner-link-img {
      width: 10%;
      font-size: 20px;
      height: 66px;
      line-height: 66px;
    }
  }

  @media (min-width: 1440px) {
    .activity-div {
      height: 50px;
      line-height: 50px;
      font-size: 20px;
      color: #ccc;
    }

    .activity-img {
      width: 100%;
      margin-top: 5%;
      height: 25px;
    }

    .activity-ui1 {
      width: 90%;
      margin: 0 auto;
      height: 170px;

      background: #26233b;
    }

    .el-input__inner {
      height: 60px;
      line-height: 60px;
    }

    .activity-zuan {
      height: 230px;
      margin-top: 20px;
      background: #181727;
    }

    .activity-zuan-ul {
      display: flex;
      justify-content: space-around;
      align-items: center;

      img {
        width: 96%;
      }

      p {
        text-align: center;
        font-size: 30px;
        font-weight: 600;
        color: #ffaa3c;

      }
    }

    //
    .activity-ui3 {
      width: 90%;
      flex-wrap: wrap;
      margin: 4% auto;
      height: 100%;

      p {
        text-align: center;
        height: 40px;
        line-height: 40px;
      }

      img {
        width: 100%;
      }

      .activity-ui3-1 {
        width: 15%;
        position: relative;

        span {
          text-align: center;
          display: block;
        }
      }

      .activity-ui3-div {
        font-size: 20px;

        .activity-ui3-p {
          width: 100%;
          background-image: url("../../../assets/img/img1/huode.png");
          background-repeat: no-repeat;
          background-size: 100%;
          color: #fff;
          background-repeat: no-repeat;
        }
      }

      // 遮罩
      .activity-ui3-opacity {
        position: absolute;
        top: 0;
        width: 100%;
        height: 86%;

        .activity-ui3-span {
          font-size: 20px;
          margin-top: 6%;
          width: 90%;
        }
      }

    }

    // 抽奖
    .activity-ui2-div-p {
      top: 57%;
      left: 48%;
      width: 50px;
      height: 20px;
      ;
    }

    .activity-ui2-div-p1 {
      top: 28%;
      left: 48%;
      width: 40px;
      height: 35px;
    }

    .activity-ui2-div-p2 {

      width: 60px;
      left: 37%;
      height: 60px;
    }

    .activity-ui2-div-p3 {

      left: 57%;
      width: 60px;
      height: 60px;
    }

    .partner-field {
      height: 76px;
      line-height: 76px;
    }

    .partner-link-img {
      width: 10%;
      font-size: 20px;
      height: 76px;
      line-height: 76px;
    }

  }

  @media only screen and (max-width: 1366px) {}

  @media only screen and (max-width: 1280px) {}

  @media only screen and (max-width: 479px) {}



  @media only screen and (max-width: 991px) {}

  @media only screen and (max-width: 767px) {}

  @media only screen and (max-width: 479px) {}


  .result-info {
    height: 270px;
    margin-bottom: 40px;
    position: relative;
    z-index: -1;

    &::before {
      content: "";
      position: absolute;
      z-index: -1;
      left: 50%;
      top: 50%;
      width: 2px;
      height: 2px;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 150px 100px #ddd;
    }

    &::after {
      content: "";
      position: absolute;
      z-index: -1;
      left: 50%;
    }
  }

  .result-item {
    max-width: 350px;
    transform: scale(0);
    animation: scale-up 1s forwards ease-out;
  }

  @keyframes scale-up {
    to {
      transform: scale(1);
    }
  }

  @-webkit-keyframes scale-up {
    to {
      transform: scale(1);
    }
  }

  .result-bg {
    position: absolute;
    z-index: -2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 624px;
    height: 422px;
    fill: #ddd;
  }

  .result-polygon {
    position: absolute;
    z-index: -1;
    top: 46%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    width: 266px;
    height: 266px;
    stroke-width: 4px;
    -webkit-animation: polygon-scale 1s forwards ease-out;
    animation: polygon-scale 1s forwards ease-out;
    stroke: #ddd;
  }

  .result-polygon-lg {
    width: 360px;
    height: 360px;
    stroke-width: 2px;
    -webkit-animation-duration: 1.2s;
    animation-duration: 1.2s;
    stroke: rgba(221, 221, 221, 0.18);
  }

  .result-light {
    background-image: url("~@/assets/img/case-light-white.png");
    position: absolute;
    z-index: -1;
    top: 46%;
    left: 50%;
    width: 440px;
    height: 456px;
    background-size: contain;
    -webkit-animation: spin 20s linear infinite;
    animation: spin 20s linear infinite;
  }

  .result-title {
    text-transform: capitalize;
    font-size: 18px;
    color: #eff0f5;
    font-weight: 500;
    line-height: 1.2;
    margin-bottom: 3px;
  }

  .result-name {
    color: #eff0f5;
    font-size: 21px;
    font-weight: 700;
    margin-bottom: 4px;
    line-height: 1.2;
  }

  .result-abrasion {
    color: #767786;
    font-size: 16px;
  }

  .result-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 45px 0 27px;
  }

  .result-btn {
    background-color: #3a34b0;
    align-items: center;
    color: #fff;
    display: flex;
    justify-content: center;
    max-width: 316px;
    border-radius: 4px;
    font-size: 17px;
    font-weight: 700;
    margin: 0 9px 18px;
    text-transform: none;
    padding-left: 25px;
    padding-right: 25px;
    width: auto;
    height: 60px;
    padding-top: 2px;
    border: 0;
  }



  @keyframes spin {
    from {
      transform: translate(-50%, -50%) rotate(0);
    }

    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  @-webkit-keyframes spin {
    from {
      transform: translate(-50%, -50%) rotate(0);
    }

    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
</style>
