<template>
  <div>
    <div class="battle">
      <div class="battle-container">
        <div class="battle-content">
          <div class="rankings">
            <div class="ranking-list relative">
              <div class="ranking-top pri-title">
                奖品展示
              </div>
              <div>
                <ul class="ranking-list-items">
                  <div class="prize-list">
                    <div class="prize">
                      <div class="pri-img"><img src="https://www.clskins.com/public/uploads/play/001.png" alt=""></div>
                      <div>第一名</div>
                      <div class="pri-desc">iPhone 15 Pro Max （国行）</div>
                    </div>
                    <div class="prize">
                      <div class="pri-img"><img src="https://www.clskins.com/public/uploads/play/001.png" alt=""></div>
                      <div>第二名</div>
                      <div class="pri-desc">iPhone 15 （国行）</div>
                    </div>
                  </div>
                  <div class="prize-list">
                    <div class="prize">
                      <div class="pri-img"><img src="https://www.clskins.com/public/uploads/play/002.png" alt=""></div>
                      <div>第三名</div>
                      <div class="pri-desc">Play Station 5 (国行)</div>
                    </div>
                    <div class="prize">
                      <div class="pri-img"><img src="https://www.clskins.com/public/uploads/play/003.png" alt=""></div>
                      <div>第四名</div>
                      <div class="pri-desc">Razer雷蛇黑寡妇蜘蛛V4键盘</div>
                    </div>
                  </div>
                  <div class="prize-list">
                    <div class="prize">
                      <div class="pri-img"><img src="https://www.clskins.com/public/uploads/play/003.png" alt=""></div>
                      <div>第五名</div>
                      <div class="pri-desc">Razer雷蛇黑寡妇蜘蛛V4键盘</div>
                    </div>
                    <div class="prize">
                      <div class="pri-img"><img src="https://www.clskins.com/public/uploads/play/003.png" alt=""></div>
                      <div>第六名</div>
                      <div class="pri-desc">Razer雷蛇黑寡妇蜘蛛V4键盘</div>
                    </div>
                  </div>
                  <div class="prize-list">
                    <div class="prize">
                      <div class="pri-img"><img src="https://www.clskins.com/public/uploads/play/004.png" alt=""></div>
                      <div>第七名 -- 第十名</div>
                      <div class="pri-desc">Razer雷蛇巴塞利斯蛇V3鼠标</div>
                    </div>
                    <!--                    <div class="prize">
                                <div class="pri-img"><img src="/static/img/2.jpg" alt=""></div>
                                <div class="pri-desc">占位占位位占位占位</div>
                              </div> -->
                  </div>
                </ul>
              </div>
            </div>
          </div>

          <div class="rankings">
            <div class="ranking-list relative">

              <div class="ranking-top pri-title">
                国庆七天乐
              </div>
              <br>
              <div class="miaoshu">
                亲爱的玩家们，国庆节已经到来，为了庆祝这个特殊的日子，Clskins特别为您准备了一场活动！在这个活动中，您将有机会赢取丰厚的奖品。
                <br>
                活动期间，我们将根据玩家在七天内累计的火力值进行排名，排名越高，奖励越丰厚！而火力值的算法非常简单，就是下面的公式。
              </div>
              <br>
              <div>
                火力值 = 开箱花费 + 对战花费*0.5 + TOP升级花费
              </div>
              <br>


              <div class="miaoshu">活动时间：2023-10-01 00:00:00 至 2023-10-07 23:50:00</div>
              <br>
              <div>
                祝您国庆快乐，游戏愉快！GLHF！

              </div>
              <div class="guoqing"><img src="https://www.clskins.com/public/uploads/play/005.png" alt=""></div>

              <div class="guize"></div>
            </div>
          </div>
          <div class="rankings">
            <div class="ranking-list relative">
              <div class="ranking-top">
                <img src="/static/img/rank-title-top.png" alt="" />
              </div>
              <div>
                <ul class="ranking-list-items">
                  <div>
                    <li class="ranking-list-item " v-for="(item, index) in play_charts" :key="index">
                      <div class="dis-flex">
                        <div class="rake">{{ index + 1 }}</div>
                        <div class="list-items-user">
                          <div>
                            <div class="i-avatar grade-0 size-small" style="width: 30px; height: 30px;">
                              <div class="avatar-bg">
                                <img
                                  :src=" item.portrait ? baseUrl + '/public/uploads/' + item.portrait : '/static/img/avatar.jpg'"
                                  alt="图片" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="user-name">
                          {{ item.name ? item.name : "神秘用户" }}
                        </div>
                      </div>
                      <div class="user-price color-e9">
                        {{ item.power }}
                      </div>
                    </li>
                  </div>
                </ul>
              </div>
              <br />
              <br />
              <div class="filght_number">
                <span class="filght-mine">您当前火力值为</span>
                <br />
                <br />
                <span class="huoli"> {{ my_num }}</span>
                <br />
                <br />
                <span>以上榜单非实时榜单</span>
                <br />
                <!--                <br/> -->
                <span>榜单每5分钟更新一次</span>
                <div class="paihangbang"></div>
              </div>
            </div>
          </div>
        </div>

        <!--        <template v-if="loadingIndex">
          <div class="text-center">
            <i class="el-icon-loading data-loading"></i>
          </div>
        </template>
        <template v-else> </template> -->
      </div>
    </div>

    <el-drawer v-if="drawer" :visible.sync="drawer" :title="boxtitle" direction="btt" custom-class="drawer-box">
      <el-row justify="space-between">
        <template v-for="(item, index) in new_box_ornaments">
          <el-col class="my-box" :xs="24" :sm="8" :md="6" :lg="4" :xl="3" v-for="(item2, index2) in item.arr"
            :key="index2">
            <div :class="
                'live-item live-item-bg live-item-bg-' +
                  color(item2.color, 4) +
                  ' ' +
                  color(item2.color, 3)
              ">
              <div class="o-item" style="width:100%;">
                <div class="o-body">
                  <div class="o-info">
                    <div class="o-price">
                      <img src="@/assets/img/star.png" />{{ item2.open_price }}
                    </div>
                    <div class="o-probability">
                      {{ fixTwo(item2.probability) }}%
                    </div>
                  </div>
                  <svg class="o-bg" viewBox="0 0 87.3 107.3">
                    <path d="M83.1 107.3l-61.8-74L87.3 0l-4.2 107.3z" fill-opacity=".04"></path>
                    <path d="M67.7 70.1l-57.5 32.6 11.3-61.3 46.2 28.7z" fill-opacity=".13"></path>
                    <path d="M67.3 63.5L27 74.5l14.3-37.4 26 26.4z" fill-opacity=".02"></path>
                    <path d="M85.5 79.1L51 106.6l29.6-37.4 4.9 9.9z" fill-opacity=".2"></path>
                    <path d="M19.6 72.9L0 52.9l24.1 2-4.5 18z" fill-opacity=".07"></path>
                  </svg>
                  <img class="o-img" :src="img_url + item2.img" alt="" />
                </div>
              </div>
              <div class="o-name">{{ item2.name }}</div>
              <div class="o-abrasion" v-if="item2.appid == 730">
                {{ abrasion(item2.abrasion) }}{{ quality(item2.quality, 3) }}
              </div>
              <div class="o-abrasion" v-if="item2.appid == 570">
                {{ quality2(item2.quality2) }}
              </div>
            </div>
          </el-col>
        </template>
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
    repair
  } from "@/utils/util.js";
  import {
    baseUrl
  } from "@/config/env";
  export default {
    data() {
      return {
        baseUrl: baseUrl,
        ranking_type: 0,
        my_num: 0,
        battle_ranking_list: [],
        yestday_ranking_one: [],
        img_url: this.$img_url,
        symbol: this.$getStore({
          name: "symbol"
        }),
        loadingIndex: true,
        battle: [],
        battle_type: 1,
        ws: {},
        ws_close_manual: false, //是否手动关闭
        boxs: [],
        box: [],
        prizes: [{
            value: 1,
            label: "第1名",
            content: "800C"
          },
          {
            value: 2,
            label: "第2名",
            content: "500C"
          },
          {
            value: 3,
            label: "第3名",
            content: "300C"
          },
          {
            value: 4,
            label: "第4-10名",
            content: "50C"
          }
        ],
        boxtitle: "",
        drawer: false,
        new_box_ornaments: [],
        isSmallScreen: false,
        play_charts: []
      };
    },
    components: {},
    computed: {
      // 判断是否是移动端
      checkScreenSize() {
        return window.innerWidth <= 768;
      }
    },
    mounted() {
      // 监听窗口大小变化
      window.addEventListener("resize", this.handleResize);
      this.isSmallScreen = this.checkScreenSize;
      this.get_box();
      //this.get_battle_ranking();
      this.get_play_charts();
      //this.get_battle();
    },

    methods: {
      abrasion,
      quality,
      quality2,
      color,
      repair,
      handleResize() {
        this.isSmallScreen = this.checkScreenSize;
      },
      fixTwo(val) {
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
          "/api.php/battle/get_battle_ranking", {
            ranking_type: this.ranking_type
          },
          res => {
            //console.log(res);
            if (res.code == 200) {
              this.battle_ranking_list = res.data.ranking_list;
              this.yestday_ranking_one = res.data.yestday_ranking_one;
              this.my_num = res.data.my_num;
            } else {
              this.$message({
                message: res.msg,
                type: "warning"
              });
            }
          },
          res => {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        );
      },
      get_play_charts() {
        //console.log("get_battle_ranking");
        ttPost(
          "/api.php/play/get_play_charts", {},
          res => {
            console.log(res.data);
            if (res.code == 200) {
              this.play_charts = res.data.dd;
              this.my_num = res.data.my_num;
            } else {
              this.$message({
                message: res.msg,
                type: "warning"
              });
            }
          },
          res => {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        );
      },

      //获取对战数据
      get_battle() {
        let battle_type = this.battle_type;
        console.log('get_battle  battle_type', battle_type);
        this.ws = ttWebSocket(
          "get_battle", {
            battle_type: battle_type
          },
          res => {
            this.loadingIndex = false;
            console.log('get_battle  res', res);
            if (res.code == 200) {
              this.battle = res.data.battle;
              this.battle.forEach(item => {
                item.total = item.difference + item.user.length;
              });
            } else {
              this.$message({
                message: res.msg,
                type: "warning"
              });
            }
          },
          res => {
            res(this.ws_close_manual);
          }
        );
      },

      //获取对战数据（Tab2，Tab3）
      get_battle_tab() {
        let battle_type = this.battle_type;
        ttPost(
          "/api.php/common/get_battle", {
            battle_type: battle_type
          },
          res => {
            this.loadingIndex = false;
            if (res.code == 200) {
              this.battle = res.data.battle;
              this.battle.forEach(item => {
                item.total = item.difference + item.user.length;
              });
            } else {
              this.$message({
                message: res.msg,
                type: "warning"
              });
            }
          },
          res => {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        );
      },



      //获取箱子
      get_box() {
        ttGet(
          "/api.php/battle/get_box", {},
          res => {
            if (res.code == 200) {
              this.box = res.data.box.map(item => {
                item.price_status = true;
                item.name_status = true;
                return item;
              });
            } else {
              this.$message({
                message: res.msg,
                type: "warning"
              });
            }
          },
          res => {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        );
      },
      //打开箱子
      openBox(id, name) {
        ttGet(
          "/api.php/box/get_box_details", {
            id: id
          },
          res => {
            if (res.code == 200) {
              this.drawer = true;
              this.boxtitle = name;
              this.new_box_ornaments = res.data.new_box_ornaments;
            } else {
              this.$message({
                message: res.msg,
                type: "warning"
              });
            }
          },
          res => {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        );
      },
      openBattle(id) {
        this.$router.push("/battle/" + id);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "play.scss";
</style>
<style scoped>
  .pri-title {
    padding-top: 20px;
  }

  .prize-list {
    width: 100%;
    overflow: hidden;
    padding: 15px 0;
  }

  .prize-list .prize {
    width: 44%;
    margin-left: 4%;
    float: left;
  }

  .prize-list .prize .pri-img img {
    width: 100%;
    height: 140px;
  }

  .prize-list .prize .pri-desc {
    font-size: 12px;
    padding-top: 5px;
  }



  .price_box {
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

  .my-box {
    display: flex;
    justify-items: center;
    justify-content: center;
  }

  .luck-boxs {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 20px;
    flex-wrap: nowrap;
  }

  .luck-card {
    margin-right: 50px;
    position: relative;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #fff;
  }

  .luck-case-img {
    width: 100px;
    cursor: pointer;
  }

  .luck-img {
    width: 100%;
  }

  .item-img {
    position: absolute;
    top: 20%;
    width: 70%;
    left: 15%;
    z-index: 100;
  }

  .luck-card-name {
    padding: 5px 0;
    font-size: 14px;
    width: 100px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
  }

  .luck-card .luck-img:hover {
    position: relative;
    opacity: 0.2;
  }

  .luck-card-price {
    display: flex;
    width: 100%;
    height: 24px;
    justify-content: center;
    align-items: center;
  }

  .jlsm {
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

  .live-item {
    display: inline-block;
    width: 250px;
    height: 250px;
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

  .o-body {
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .live-item .o-img {
    height: 50%;
  }

  .o-info {
    width: 100%;
    display: flex;
    height: 30px;
    align-items: center;
  }

  .o-price {
    width: 50%;
    display: flex;
    height: 30px;
    text-align: center;
    align-items: center;
    justify-items: center;
    justify-content: center;
    font-weight: 600;
    color: #ffc83c;
  }

  .o-price img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }

  .o-probability {
    font-size: 12px;
    width: 50%;
    text-align: center;
  }

  .paihangbang {
    height: 78px;
  }

  .huoli {
    font-size: 30px;
  }

  /* .guize{
  height: 0px;
} */
  .miaoshu {
    text-align: left;
    padding: 0 20px;
  }

  .guoqing img {
    width: 100%;
    padding: 35px 20px;
  }
</style>