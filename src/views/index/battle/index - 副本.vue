<template>
  <div>

    <div class="battle">
      <div class="battle-container">

        <div class="battle-header">
          <h2 class="battle-title">
            <el-icon class="el-icon-star-on"></el-icon>
            <span>Box对战</span>
          </h2>
          <router-link class="battle-create" to="/battle_create">
            <span>创建对战</span>
            <svg class="icon-plus" viewBox="0 0 26 26">
              <g>
                <g>
                  <path
                    d="M25.986 13a1.742 1.742 0 0 1-1.743 1.745h-9.51v9.53a1.742 1.742 0 1 1-3.486 0v-9.53h-9.51c-.963 0-1.742-.782-1.743-1.745 0-.965.78-1.746 1.743-1.746h9.51v-9.53a1.743 1.743 0 1 1 3.486.002v9.529h9.51c.964 0 1.743.78 1.743 1.745z" />
                </g>
              </g>
            </svg>
          </router-link>
        </div>

        <div class="battle-top-line">
          <div class="battle-menu">
            <div :class="'battle-menu-link ' + [battle_type == 1 ? 'active' : '']" @click="battle_switch(1)">
              <el-icon class="el-icon-star-on"></el-icon>
              <span>对战实况</span>
            </div>
            <div :class="'battle-menu-link ' + [battle_type == 2 ? 'active' : '']" @click="battle_switch(2)">
              <el-icon class="el-icon-user-solid"></el-icon>
              <span>我参与的</span>
            </div>
            <div :class="'battle-menu-link ' + [battle_type == 3 ? 'active' : '']" @click="battle_switch(3)">
              <el-icon class="el-icon-s-help"></el-icon>
              <span>全部对战</span>
            </div>
          </div>
        </div>
        <div class="example-showcase">
        <el-scrollbar>
            <div class="scrollbar-flex-content">
              <div class="luck-boxs" v-for="(item, index) in box" v-if="item.price_status && item.name_status">
                <div class="luck-card case-discount" @click="openBox(item.id,item.name)">

                  <div class="luck-case-img is-down case-animation">
                    <img class="luck-img" :src="img_url + item.img" alt="">
                    <!-- <img src="@/assets/img/gun.png" class="item-img"> -->
                  </div>
                  <div class="luck-card-name">{{ item.name }}</div>
                  <div class="luck-card-price ">
                  <img src="@/assets/img/jb.png" style="width:20px;height:20px;margin-right:10px;"> {{item.price }}</div>
                </div>
              </div>
            </div>
          </el-scrollbar>
        </div>
        <div class="battle-content">

          <div class="rankings">

            <div class="ranking-no-one-bg">

              <!-- <div class="ranking-avatar">
                <img class="avatar" :src="yestday_ranking_one.user ? baseUrl + '/public/uploads/' + yestday_ranking_one.user.portrait : '/static/img/avatar.jpg'" alt="" />
              </div> -->
              <div class="ranking-no-one  shine-show-star">
                <div class="ranking-no-one-content">
                  <div class="userWin">
                    <img
                      :src="yestday_ranking_one.user ? baseUrl + '/public/uploads/' + yestday_ranking_one.user.portrait : '/static/img/avatar.jpg'"
                      alt="" class="avatar"><!---->
                  </div>
                </div>
                <div class="color-c3 mb6 star-text"> {{ yestday_ranking_one.user ? yestday_ranking_one.user.name : "神秘用户"
                }}
                </div>
                <div class="color-e9"><span class="price"> {{ yestday_ranking_one.count_num }} </span></div>

              </div>
              <div class="jlsm">
                <div style="display: flex; align-items: center">
                    <el-popover
                      trigger="hover"
                      :width="300"
                      popper-style="padding: 20px;background: rgba(33,19,66,.9) !important;"
                      popper-class="popover-box"
                    >
                      <template #reference>
                        <el-button type="text" style="color: rgb(255, 115, 115);">
                          对战排行榜奖励
                          <img src="@/assets/img/question.png" style="width:14px;height:14px;margin-left:2px;" >
                        </el-button>
                      </template>
                      <template #default>
                        <div class="demo-rich-conent" >
                          <div v-for="(item,index) in prizes" class="prize-box">
                            <div class="prize-index">
                              <img  v-if="item.value == 1" src="@/assets/img/prize_01.png" style="width:25px;height:26px;" >

                              <img  v-else-if="item.value == 2" src="@/assets/img/prize_02.png" style="width:25px;height:26px;" >

                              <img  v-else-if="item.value == 3" src="@/assets/img/prize_03.png" style="width:25px;height:26px;" >

                              <template v-else>
                              {{item.label}}
                              </template>
                            </div>
                            <div class="prize-content">
                              {{item.content}}
                            </div>

                          </div>
                        </div>
                      </template>
                    </el-popover>
                  </div>
              </div>
            </div>
            <div>

            </div>
            <div class="rank-title-txt dis-cen">
              <div @click="switch_ranking_type(0)" :class="'table-title-one ' + (ranking_type == 0 ? ' active' : '')">
                今日战力排行榜 </div>
              <div @click="switch_ranking_type(1)" :class="'table-title-two ' + (ranking_type == 1 ? ' active' : '')">
                今日胜利次数榜 </div>
            </div>

            <div class="ranking-list relative">
              <div class="ranking-top">
                <img src="/static/img/rank-title-top.png" alt="">
              </div>
              <div>
                <ul class="ranking-list-items">
                  <div>
                    <li class="ranking-list-item " v-for="(item, index) in battle_ranking_list" :key="index">
                      <div class="dis-flex">
                        <div class="rake"> {{ index + 1 }} </div>
                        <div class="list-items-user">
                          <div>
                            <div class="i-avatar grade-0 size-small" style="width: 30px; height: 30px;">
                              <div class="avatar-bg"><img
                                  :src="item.user ? baseUrl + '/public/uploads/' + item.user.portrait : '/static/img/avatar.jpg'"
                                  alt="图片">
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="user-name"> {{ item.user ? item.user.name : "神秘用户" }} </div>
                      </div>
                      <div class="user-price color-e9"> {{ item.count_num }} </div>
                    </li>

                  </div>
                </ul>

              </div>
              <div class="filght_number"><span class="filght-mine">我的今日战力值</span><span> {{ my_num }}</span></div>
            </div>
          </div>
          <transition-group tag="div" class="battle-list" enter-active-class="animate__animated animate__flipInX">
            <div :key="item.battle_ids" v-for="(item, index) in battle" class="battle-item" @click="openBattle(item.battle_id)">
              <section :class="{
                'battle-box': true,
                'battle-box-wait-1': item.battle_type === '1' && item.status == '1',  // 欧皇
                'battle-box-wait-2': item.battle_type !== '1' && item.status == '1',  // 非酋
                'battle-box-start': item.status == '2',
                'battle-box-end': item.status == '3',
              }">
                <div class="battle-box-head">
                  <div class="battle-box-status">
                    <!-- 0已结束 1等待中 2对战中 -->
                    <div v-if="item.status == 2">
                      <el-icon class="el-icon-d-arrow-right"></el-icon>
                      <span>进行中</span>
                    </div>
                    <div v-else-if="item.status == 1">
                      <!-- <img src="/static/img/battle_ing.png" alt="" /><span>等待中</span> -->
                      <el-icon class="el-icon-time"></el-icon>
                      <span>等待中</span>
                    </div>
                    <div v-else="item.status == 3">
                      <el-icon class="el-icon-circle-check-outline"></el-icon>
                      <span>已结束</span>
                    </div>
                  </div>
                  <div class="battle-box-title">
                    <div v-if="item.battle_type == '1' && item.status != '3'"> 欧皇对战 </div>
                    <div v-if="item.battle_type != '1' && item.status != '3'"> 非酋对战 </div>
                    <div v-if="item.battle_type == '1' && item.status == '3'"> 欧皇对战 </div>
                    <div v-if="item.battle_type != '1' && item.status == '3'"> 非酋对战 </div>
                  </div>
                  <div class="battle-box-times">
                    <span>{{ item.num }}局</span>
                  </div>
                </div>

                <section class="battle-box-main">

                  <section class="tx">
                    <div class="battle-box-seat">
                      <div v-for="(user_item, user_index) in item.user" :key="user_index">
                        <img v-if="user_index !== 0" src="https://hicsgo.oss-cn-hangzhou.aliyuncs.com/fight/vs.png" alt="" class="vs" />
                        <div class="rants">
                          <img :src="repair(user_item.portrait)" alt="" class="txdetal" />
                        </div>
                      </div>

                      <div v-if="Number(item.difference) > 0" v-for="(difference_item, difference_index) in (Array.from(new Array(Number(item.difference))))" :key="difference_index">
                        <img src="https://hicsgo.oss-cn-hangzhou.aliyuncs.com/fight/vs.png" alt="" class="vs" />
                        <div class="rants">
                          <router-link :to="'/battle/' + item.battle_id">
                            <img v-if="item.battle_type == '1' && item.status != '3'" src="/static/img/lu2.png" alt=""
                              class="bg" />
                            <img v-if="item.battle_type != '1' && item.status != '3'" src="/static/img/lu.png" alt=""
                              class="bg" />
                            <img v-if="item.status == '3'" src="/static/img/lu3.png" alt="" class="bg" />
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </section>

                  <div class="scrollDiv">
                    <div class="neibott">
                      <div class="prize-wrap" :key="box_index" v-for="(box_item, box_index) in item.box">
                        <!--宝箱和数量-->
                        <!-- <router-link class="product-card" :to="'/battle/' + item.battle_id"
                              >  </router-link> -->
                        <img :src="img_url + box_item.img" :alt="box_item.name" />
                        <span>{{ box_item.num }}</span>
                      </div>
                    </div>
                  </div>
                </section>

                <section class="bottosbox">

                  <div class="pattern">
                    <p>
                      <!---->
                      <!-- <img
                      src="https://hicsgo.oss-cn-hangzhou.aliyuncs.com/money.png"
                      alt=""
                      class="mons"/> -->
                      <span class="price_box">
                        <template v-if="item.deduction > 0">
                          <child-component v-html="symbol"></child-component> {{ (item.open_price -
                            item.deduction).toFixed(2) }}
                        </template>
                        <template v-else>
                          <child-component v-html="symbol"></child-component> {{ item.open_price }}
                        </template>
                      </span>
                    </p>
                    <div>
                      <router-link style="display:flex;color:rgb(248 181 0);white-space: nowrap;" :to="'/battle/' + item.battle_id">
                        <span>查看</span>
                        <img src="https://hicsgo.oss-cn-hangzhou.aliyuncs.com/fight/play-look.png" alt="" style="margin-left: 5px; float:right; margin-top: 2px; margin-bottom: 2px;" />
                      </router-link>
                    </div>
                  </div>
                </section>
              </section>
            </div>
          </transition-group>
        </div>

        <template v-if="loadingIndex">
          <div class="text-center">
            <i class="el-icon-loading data-loading"></i>
          </div>
        </template>
        <template v-else> </template>
      </div>
    </div>

    <el-drawer
      v-if="drawer"
      :visible.sync="drawer"
      :title="boxtitle"
      direction="btt"
      custom-class="drawer-box"
     >

         <el-row justify="space-between">
           <el-col class="my-box" :xs="24" :sm="8" :md="6" :lg="4" :xl="3" v-for="(item, index) in new_box_ornaments" :key="index">
           <div :class="'live-item live-item-bg live-item-bg-'+color(item.arr[0].color, 4)+' '+color(item.arr[0].color, 3)" >

               <div class="o-item" style="width:100%;">
                 <div class="o-body">
                  <div class="o-info">
                  <div class="o-price"><img src="@/assets/img/star.png" >{{item.arr[0].open_price}}</div>
                  <div class="o-probability">{{ fixTwo(item.total_probability) }}%</div>
                  </div>
                   <svg class="o-bg" viewBox="0 0 87.3 107.3">
                     <path
                       d="M83.1 107.3l-61.8-74L87.3 0l-4.2 107.3z"
                       fill-opacity=".04"
                     ></path>
                     <path
                       d="M67.7 70.1l-57.5 32.6 11.3-61.3 46.2 28.7z"
                       fill-opacity=".13"
                     ></path>
                     <path
                       d="M67.3 63.5L27 74.5l14.3-37.4 26 26.4z"
                       fill-opacity=".02"
                     ></path>
                     <path
                       d="M85.5 79.1L51 106.6l29.6-37.4 4.9 9.9z"
                       fill-opacity=".2"
                     ></path>
                     <path
                       d="M19.6 72.9L0 52.9l24.1 2-4.5 18z"
                       fill-opacity=".07"
                     ></path>
                   </svg>
                   <img
                     class="o-img"
                     :src="img_url + item.arr[0].img"
                     alt=""
                   />
                 </div>
               </div>
               <div class="o-name">{{ item.arr[0].name }}</div>
               <div class="o-abrasion" v-if="item.arr[0].appid == 730">
                 {{ abrasion(item.arr[0].abrasion)
                 }}{{ quality(item.arr[0].quality, 3) }}
               </div>
               <div class="o-abrasion" v-if="item.arr[0].appid == 570">
                 {{ quality2(item.arr[0].quality2) }}
               </div>
             </div>
             </el-col>
           </el-row>
     </el-drawer>
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
import { baseUrl } from "@/config/env";
export default {
  data() {
    return {
      baseUrl: baseUrl,
      ranking_type: 0,
      my_num: 0,
      battle_ranking_list: [],
      yestday_ranking_one: [],
      img_url: this.$img_url,
      symbol: this.$getStore({ name: "symbol" }),
      loadingIndex: true,
      battle: [],
      battle_type: 1,
      ws: {},
      ws_close_manual: false, //是否手动关闭
      boxs:[],
      box:[],
      prizes:[
        {value:1,label:"第1名",content:"800C"},
        {value:2,label:"第2名",content:"500C"},
        {value:3,label:"第3名",content:"300C"},
        {value:4,label:"第4-10名",content:"50C"},
      ],
      boxtitle:"",
      drawer:false,
      new_box_ornaments:[]
    };
  },
  components:{
  },
  computed: {},
  mounted() {
    this.get_box();
    this.get_battle_ranking();
    this.get_battle();
    },
  destroyed() {
    this.ws_close_manual = true;
    this.ws.close();
  },
  methods: {
    abrasion,
    quality,
    quality2,
    color,
    repair,
    fixTwo(val){
      val = parseFloat(val);
      return val.toFixed(2);
    },
    switch_ranking_type(type) {
      this.ranking_type = type;
      this.get_battle_ranking();
    },
    get_battle_ranking() {
      //console.log("get_battle_ranking");
      ttPost(
        "/api.php/battle/get_battle_ranking",
        { ranking_type: this.ranking_type },
        (res) => {
          //console.log(res);
          if (res.code == 200) {
            this.battle_ranking_list = res.data.ranking_list;
            this.yestday_ranking_one = res.data.yestday_ranking_one;
            this.my_num = res.data.my_num;
          } else {
            this.$message({
              message: res.msg,
              type: "warning",
            });
          }
        },
        (res) => {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      );

    },

    //获取对战数据
    get_battle() {
      let battle_type = this.battle_type;
      this.ws = ttWebSocket(
        "get_battle", { battle_type: battle_type },
        (res) => {
          this.loadingIndex = false;
          if (res.code == 200) {
            this.battle = res.data.battle;
          } else {
            this.$message({ message: res.msg, type: "warning", });
          }
        },
        (res) => {
          res(this.ws_close_manual);
        }
      );
    },

    //获取对战数据（Tab2，Tab3）
    get_battle_tab() {
      let battle_type = this.battle_type;
      ttPost(
        "/api.php/common/get_battle",
        { battle_type: battle_type },
        (res) => {
          this.loadingIndex = false;
          if (res.code == 200) {
            this.battle = res.data.battle;
          } else {
            this.$message({
              message: res.msg,
              type: "warning",
            });
          }
        },
        (res) => {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      );
    },

    //对战数据切换
    battle_switch(type) {
      this.battle_type = type;
      this.ws_close_manual = true;
      this.ws.close();
      this.loadingIndex = false;
      // this.battle = [];
      if (type == 1) this.get_battle();
      else if (type == 2 || type == 3) this.get_battle_tab();
    },

    //获取箱子
    get_box(){
      ttGet(
        "/api.php/battle/get_box",
        {},
        (res) => {
          if (res.code == 200) {
              this.box = res.data.box.map((item) => {
                item.price_status = true;
                item.name_status = true;
                return item;
              });
          } else {
            this.$message({
              message: res.msg,
              type: "warning",
            });
          }
        },
        (res) => {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      );
    },
    //打开箱子
    openBox(id,name){

        ttGet(
          "/api.php/box/get_box_details",
          {id:id},
          (res) => {
            if (res.code == 200) {
              this.drawer = true;
              this.boxtitle = name;
              this.new_box_ornaments = res.data.new_box_ornaments;
            } else {
              this.$message({
                message: res.msg,
                type: "warning",
              });
            }
          },
          (res) => {
            this.$message({
              message: res.msg,
              type: "error",
            });
          }
        );
    },
    openBattle(id){
      this.$router.push("/battle/" + id);
    }
  },
};
</script>




<style lang="scss" scoped>
@import "battle_index.scss";
</style>
<style scoped> .price_box {
   float: right;
   display: flex;
   justify-content: center;
   align-items: center;
   margin-top: 3px;
 }

 .price_box /deep/ .symbol {
   width: 20px;
   padding-top: 5px;
   margin-right: 5px;
 }

 .battle_box {
   background-size: 100% 100%;
   background-repeat: no-repeat;
   display: flex;
 }

 .Dz .bottosbox .pattern {
   margin-top: -6px;
 }
 .example-showcase {
     padding: 0rem;
     background-color: var(--bg-color);
 }
 .scrollbar-flex-content {
   display: flex;
 }
 .scrollbar-demo-item {
   flex-shrink: 0;
   display: flex;
   align-items: center;
   justify-content: center;
   width: 100px;
   height: 50px;
   margin: 0px;
   text-align: center;
   border-radius: 4px;
   background: var(--el-color-danger-light-9);
   color: var(--el-color-danger);
 }
 .my-box{
   display: flex;
   justify-items: center;
  justify-content: center;
 }
 .luck-boxs{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  flex-wrap: nowrap;
}
.luck-card{
  margin-right: 50px;
  position: relative;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
}
.luck-case-img{
  width: 100px;
  cursor: pointer;
}
.luck-img{
  width: 100%;
}
.item-img{
  position: absolute;
  top: 20%;
  width: 70%;
  left: 15%;
  z-index: 100;
}
.luck-card-name{
  padding: 5px 0;
  font-size: 14px;
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}
.luck-card .luck-img:hover {
  position:relative;
  opacity:.2
}
.luck-card-price{
  display: flex;
  width:100%;
  height:24px;
  justify-content: center;
  align-items: center;
}
.jlsm{
  position: relative;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 14px;
  padding-bottom: 16px;
}

.live-item{
  display:inline-block;
  width: 250px;
  height:250px;
  background: center no-repeat;
  background-image: none;
  background-size: auto;
  background-size: 100% 100%;
  position: relative;
  color: #fff;
  text-align: center;
  vertical-align: top;
  /* margin:10px auto; */
}
.o-body{
  width:100%;
  height:100%;
  text-align: center;
}
.live-item .o-img{
   height: 50%;
 }
 .o-info{
   width:100%;
   display:flex;
   height:30px;
   align-items:center;
 }
 .o-price{
   width:50%;
   display:flex;
   height:30px;
   text-align:center;
   align-items:center;
   justify-items: center;
   justify-content: center;
  font-weight: 600;
  color: #ffc83c;
 }
 .o-price img{
   width:20px;
   height:20px;
   margin-right:5px;
 }
 .o-probability{
   font-size:12px;
   width:50%;
   text-align:center;
 }

 @media only screen and (max-width: 400px) {
  .battle-item {
    width: 100%;
    padding: 10px 0px;
  }
}
</style>

