<template>
  <div style="width: 100%;background: #181727; ">
    <div style="width:90%; margin: auto; ">
      <!-- 标题 -->
      <div style="border-bottom: 1px solid;">
        <img width="30%" src="../../../assets/img/img1/qiandao.png" alt="">
        <!-- <p style="text-shadow:4px 0px 5px blue;font-size: 40px; color: #fff;"> 每日签到</p> -->
      </div>
      <!-- 每日签到列表 -->
      <div>
        <div>
          <div class="week-p">
            <p class="vue-p">一</p>
            <p class="vue-p">二</p>
            <p class="vue-p">三</p>
            <p class="vue-p">四</p>
            <p class="vue-p">五</p>
            <p class="vue-p">六</p>
            <p class="vue-p">日</p>
          </div>
          <div>
            <div>

              <ul class="days">
                <!-- 循环-->
                <li v-for="dayobject in days">
                  <!--本月-->
                  <div style="margin: 2% 5%; ">
                    <p v-if="dayobject.day.getMonth() + 1 != currentMonth" class="other-month">{{ dayobject.day.getDate()
                    }}</p>

                    <!--判断天数是否正确-->
                    <!--  v-if="dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate()"  -->
                    <span v-else>
                      <span style="font-size: 20px;"
                        v-if="dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate()"
                        class="active">{{ dayobject.day.getDate() }}</span>
                      <span style="font-size: 20px;" v-else>{{ dayobject.day.getDate() }}</span>
                    </span>
                    <p v-if="dayobject.day.getMonth() == new Date().getMonth()" class="choosen-month" style="color:#ccc">
                      {{ currentMonth }}月</p>
                  </div>

                  <!--  -->
                  <div v-if="dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate()">
                    <div>
                      <a style="color: #fff;">
                        <p class="sharp-img " v-if="qiandao1" @click.once=clickList(dayobject.day.getDate())>签到</p>
                        <p class="sharp-img " v-if="qiandao">已签到</p>
                      </a>
                    </div>
                  </div>
                  <div style="text-align: center; " v-if="dayobject.day.getMonth() == new Date().getMonth()">
                    <img style="width: 30% ; height: 30%; " src="../../../assets/img/img1/jinbi.png" alt="">

                  </div>
                  <div class="div-img" v-if="dayobject.day.getMonth() == new Date().getMonth()">
                    <img src="../../../assets/img/img1/jinbi2.png" alt="">
                    <span v-if="dayobject.day.getDate() <= 7">0.12</span> 
                    <span v-else-if="dayobject.day.getDate() <= 16">0.18</span>
                    <span v-else-if="dayobject.day.getDate() <= 23">0.24</span>
                    <span v-else>0.30</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--底部  -->
    <!-- <div style="width: 100%; height: 300px;background: #1d1c30;">
      <div class="dibu-div">
        <div class="dibu-div-ui">
          <img style="width: 50px ;height: 50px; " src="../../../assets/img/acc.abc991d.png" alt="">
          <p>你可以用最优惠的价格获得喜欢的皮肤</p>
          <p>所有交易均通过Steam机器人自动进行</p>
          <p style="font-size: 12px;">Limited Partnership,39/5 Granton Cranton,edinburgh,United Kingdom</p>
        </div>
        <div style="width: 30%;border-right: 1px solid #ccc;">
          <p>
            <img style="width: 50px ;height: 20px; " src="../../../assets/img/acc.abc991d.png" alt="">
          </p>
          <p>
            <img style="width: 50px ;height: 20px; " src="../../../assets/img/acc.abc991d.png" alt="">
          </p>
          <p>
            <img style="width: 50px ;height: 20px; " src="../../../assets/img/acc.abc991d.png" alt="">
          </p>
          <p>
            <img style="width: 50px ;height: 20px; " src="../../../assets/img/acc.abc991d.png" alt="">
          </p>
        </div>
       
        <div>
          <p>
            <img style="width: 50px ;height: 20px;margin-left: 30px; " src="../../../assets/img/acc.abc991d.png" alt="">
          </p>
          <div class="dibu-div-a">
            <p>
              <a href="#">服务条款</a>
            </p>
            <p>
              <a href="#">常见问题</a>
            </p>
            <p>
              <a href="#">隐私政策</a>
            </p>
            <p>
              <a href="#">站点地图</a>
            </p>
            <p>
              <a href="#">往来</a>
            </p>

          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
  
<script>
import {
  ttGet,
} from "@/utils/util.js";
import { getStore } from "@/utils/store.js";
export default {
  data() {
    return {
      dataList: [],
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      days: [],
      qiandao1: true,
      qiandao: false,

    }
  },

  created() {
    let that = this;
    that.initData(null);
    that.isSign();
  },
  methods: {
    isSign() {
      let jwt_token = getStore({ name: "jwt_token" });
      console.log(123);
      if (jwt_token) {
        console.log(456);
        ttGet("/api.php/user/is_sign_in", {}, (res) => {
          console.log(489);
          if (res.code == 200) {
            console.log(res.data.check, 123)
            if (res.data.check < 1) {
              this.qiandao1 = true
              this.qiandao = false
            } else {
              this.qiandao1 = false
              this.qiandao = true
            }
          }
        });
      }

    },
// 签到金额在此修改
    clickList(e) {

      let token = getStore({ name: "jwt_token" });

      if (token) {
        this.recharge_page = true;
      } else {
        this.$message({
          message: '您还没有登录',
          type: "error",
        });
      }
      console.log(12333333333333333);
      var list = 0
      if (e <= 7) {
        console.log(0.12);
        list = 0.12

      } else if (e <= 16) {
        list = 0.18

      } else if (e <= 23) {
        list = 0.24

      } else {
        list = 0.30

      }
      let jwt_token = getStore({ name: "jwt_token" });
      if (jwt_token) {

        ttGet("/api.php/user/sign_in", { bean: list }, (res) => {
          // let balance = res.data.balance;
          if (res.code == 200) {
            this.$emit("user_bean", { balance: res.data.balance });
            console.log(res, "123123131")
            this.$notify({
              title: '签到成功',
              message: ' 获得 ' + list + '金币',
              type: 'success',
              duration: 3000
            });
            this.qiandao1 = false
            this.qiandao = true

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
    initData: function (cur) {
      let that = this;
      let leftcount = 0;
      let date;
      if (cur) {
        date = new Date(cur);
      } else {
        let now = new Date();
        let d = new Date(that.formatDate(now.getFullYear(), now.getMonth(), 1));
        d.setDate(35);
        date = new Date(that.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
      }
      // that.currentDay = date.getDate();
      // that.currentYear = date.getFullYear();
      that.currentMonth = date.getMonth() + 1;
      // that.currentWeek = date.getDay(); // 1...6,0
      if (that.currentWeek == 0) {
        that.currentWeek = 7;
      }
      let str = that.formatDate(that.currentYear, that.currentMonth, that.currentDay);
      that.days.length = 0;
      //初始化
      for (let i = that.currentWeek - 1; i >= 0; i--) {
        let d = new Date(str);

        d.setDate(d.getDate() - i);
        let dayobject = {};
        dayobject.day = d;
        that.days.push(dayobject);

      }

      for (let i = 1; i <= 35 - that.currentWeek; i++) {
        let d = new Date(str);
        d.setDate(d.getDate() + i);
        let dayobject = {};
        dayobject.day = d;
        that.days.push(dayobject);
        
      }

    },
    // pickPre: function (year, month) {
    //   let that = this;
    //   let d = new Date(that.formatDate(year, month, 1));
    //   d.setDate(0);
    //   that.initData(that.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    // },
    pickNext: function (year, month) {
      let that = this;
      let d = new Date(that.formatDate(year, month, 1));
      d.setDate(35);
      that.initData(that.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },
    // pickYear: function (year, month) {
    //   alert(year + "," + month);
    // },
    // 返回 类似 2016-01-02 格式的字符串
    formatDate: function (year, month, day) {
      let y = year;
      let m = month;
      if (m < 10) m = "0" + m;
      let d = day;
      if (d < 10) d = "0" + d;
      return y + "-" + m + "-" + d
    },
  }

}
</script>
  
<style lang="scss" scoped>
.vue-p {
  width: 13%;
  height: 50px;
  // background: pink;
  text-align: center;
  line-height: 50px;
  background: #1b192d;
}

.week-p {
  display: flex;
  width: 100%;
  height: 70px;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  background: #26233b;
}

* {
  margin: 0;
  padding: 0;
}

/*日历*/
.year-month {
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.choosen-year {
  padding: 0 20px;
  font-size: 16px;
  font-weight: 200;
}

.choosen-month {
  // text-align: center;
  font-size: 12px;
  // font-weight: 200;
}

.arrow {
  width: 3%;
  height: 25px;
}

.arrow1 {
  margin-left: 44px;
}

.arrow2 {
  margin-right: 44px;
}

.month ul li {
  color: #999;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 3px;
  list-style: none;
}

.weekdays {
  margin: 0;
  color: #FFFFFF;
  // background: #A4A7B0;
  width: 96.6%;
  margin-top: 26px;
  height: 34px;
  line-height: 34px;
  margin-left: 2.2%;
}

.weekdays li {
  display: inline-block;
  text-align: center;
  color: #ccc;
  font-size: 14px;
  font-weight: 100;
  width: 12.7%;
}

.days {
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  border: 0.1px solid;
  // height: 800px;
  background: #1e1d32;
}

.days li {
  position: relative;
  // height: 145px;
  list-style-type: none;
  display: inline-block;
  width: 13%;
  // background: #11616f;
  margin-top: 5px;
  font-size: 12.78px;
  color: #FFFFFF;
  font-weight: 200;
  border: 0.1px solid #2c3e50;
}

.days li .other-month {
  display: none;
}

// .sharp:before {
//   content: "";
//   /*不需要展现文字等内容,所以设置为空字符 */
//   width: 0px;
//   border-bottom: 25px solid transparent;
//   border-top: 25px solid transparent;
//   border-right: 25px solid #6d3cf8;
//   ;
//   position: absolute;
//   left: -25px;
//   top: 0px;
// }

// .sharp {
//   width: 50%;
//   height: 50px;
//   font-weight: 700;
//   // font-size: 15px;
//   // background: #6d3cf8;
//   display: inline-block;
//   position: absolute;
//   margin-left: auto;
//   margin-right: auto;
//   left: 0;
//   right: 0;
//   top: 33%;
//   line-height: 50px;
//   // color:#FFFFFF;

//   text-align: center;
// }

// .sharp:after {
//   content: "";
//   /*不需要展现文字等内容,所以设置为空字符*/
//   width: 0px;
//   border-bottom: 25px solid transparent;
//   border-top: 25px solid transparent;
//   border-left-width: 25px;
//   border-left-style: solid;
//   // background: linear-gradient(to right, #c34bb8, #6d3cf8);
//   border-left-color: #6d3cf8;

//   position: absolute;
//   right: -25px;
//   top: 0px;
// }

#sharpContainer {
  background: #131222;
  position: relative;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  opacity: .8;
}

.div-img {
  // font-size: clamp(0.9rem, 0.489rem + 1.05vw, 1.2rem);

  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 15%;
    height: 15%;
  }

  span {
    color: #ffaa3c
  }

}

// 底图
.dibu-div {
  width: 70%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1d1c30;
  height: 300px;
  color: #fff;

  .dibu-div-ui {
    border-right: 1px solid #ccc;
    width: 35%;
  }
}

.dibu-div-a {
  display: flex;
  color: #ccc;
  flex-wrap: wrap;
  width: 190px;

  p {
    margin-left: 30px;
  }
}

.sharp-img {
  background-image: url("../../../assets/img/img1/beijing.png");
  background-size: 100% 90%;
  background-repeat: no-repeat;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50%;

  // font-size: clamp(0.5rem, 0.489rem + 1.05vw, 1.2rem);
  font-size: clamp(0.5rem, 2vmin, 1rem);
  color: #fff;
  font-weight: 600;

}

// 适配
@media (min-width: 380px) {
  .div-img {
    font-size: 0.1rem;
  }
}

@media (min-width: 768px) {
  .div-img {
    font-size: 0.5rem;
  }
}

@media (min-width: 992px) {
  .div-img {
    font-size: 0.7rem;
  }
}

@media (min-width: 1200px) {
  .div-img {
    font-size: 1.5rem;
  }
}

@media (min-width: 1440px) {
  .div-img {
    font-size: 2rem;
  }
}

@media only screen and (max-width: 1439px) {
  .div-img {
    font-size: 2rem;
  }
}

@media only screen and (max-width: 1199px) {
  .div-img {
    font-size: 1.5rem;
  }
}

@media only screen and (max-width: 991px) {
  .div-img {
    font-size: 1rem;
  }
}

@media only screen and (max-width: 767px) {
  .div-img {
    font-size: 0.7rem;
  }
}

@media only screen and (max-width: 479px) {
  .div-img {
    font-size: 0.5rem;
  }
}
</style>
  