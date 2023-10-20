<template>
  <div>
    <div class="battle">
      <div class="battle-container">



        <div class="battle-content ">

          <div class="rankings">


            <div class="ranking-list relative">
              <div class="ranking-top">
                <img src="/static/img/rank-title-top.png" alt="" />
              </div>
              <div>
                <ul class="ranking-list-items">
                  <div>
                    <li class="ranking-list-item " v-for="(item, index) in battle_ranking_list" :key="index">
                      <div class="dis-flex">
                        <div class="rake">{{ index + 1 }}</div>
                        <div class="list-items-user">
                          <div>
                            <div class="i-avatar grade-0 size-small" style="width: 30px; height: 30px;">
                              <div class="avatar-bg">
                                <img :src="
                                    item.user
                                      ? baseUrl +
                                        '/public/uploads/' +
                                        item.user.portrait
                                      : '/static/img/avatar.jpg'
                                  " alt="图片" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="user-name">
                          {{ user ? user.name : "神秘用户" }}
                        </div>
                      </div>
                      <div class="user-price color-e9">
                        {{ user.balance }}
                      </div>
                    </li>



                  </div>
                </ul>
              </div>
              <div class="filght_number">
                <span class="filght-mine">我当前火力值</span><span> {{ my_num }}</span>
              </div>
            </div>
          </div>



          <!-- <template> -->
          <el-row>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="(image, index) in images" :key="index" class='jiangpin'>
              <img :src="image" alt="图片" class="image">
            </el-col>
          </el-row>
          <!-- </template> -->




        </div>

        <template v-if="loadingIndex">
          <div class="text-center">
            <i class="el-icon-loading data-loading"></i>
          </div>
        </template>
        <template v-else> </template>
      </div>
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
    repair
  } from "@/utils/util.js";
  import {
    baseUrl
  } from "@/config/env";
  export default {
    data() {
      return {
        images: [
          'https://www.clskins.com/public/uploads/portrait/20230927/54e5581d3d98de68aa587b4b0259dbd6.jpg',
          'https://www.clskins.com/public/uploads/portrait/20230927/54e5581d3d98de68aa587b4b0259dbd6.jpg',
          'https://www.clskins.com/public/uploads/portrait/20230927/54e5581d3d98de68aa587b4b0259dbd6.jpg',
          'https://www.clskins.com/public/uploads/portrait/20230927/54e5581d3d98de68aa587b4b0259dbd6.jpg',
          'https://www.clskins.com/public/uploads/portrait/20230927/54e5581d3d98de68aa587b4b0259dbd6.jpg',
          'https://www.clskins.com/public/uploads/portrait/20230927/54e5581d3d98de68aa587b4b0259dbd6.jpg',
          'https://www.clskins.com/public/uploads/portrait/20230927/54e5581d3d98de68aa587b4b0259dbd6.jpg',
          'https://www.clskins.com/public/uploads/portrait/20230927/54e5581d3d98de68aa587b4b0259dbd6.jpg',
          'https://www.clskins.com/public/uploads/portrait/20230927/54e5581d3d98de68aa587b4b0259dbd6.jpg',
          'https://www.clskins.com/public/uploads/portrait/20230927/54e5581d3d98de68aa587b4b0259dbd6.jpg'
        ],
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
        isSmallScreen: false
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
      this.get_battle_ranking();
      this.get_battle();
    },
    destroyed() {
      this.ws_close_manual = true;
      this.ws.close();
      window.removeEventListener("resize", this.handleResize);
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
      get_record() {
        let page_info = this.page_info;
        let query = this.query;
        ttGet("/api.php/play/get_play_ranking", {
          page: page_info.page,
          limit: page_info.limit,
          info: query.info,
        }, (res) => {
          this.loading = false;
          if (res.code == 200) {
            console.log(res.data.data);
            this.data = res.data.data.data;
            this.page_info.total = res.data.data.count;
            //let height = 50 + 61 * (res.data.data.length ? res.data.data.length : 1);
            //this.$refs.table.$el.style.height = height + 'px';
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        });
      },

      //获取对战数据
      get_battle() {
        let battle_type = this.battle_type;
        this.ws = ttWebSocket(
          "get_battle", {
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
  .image {
    width: 100%;
  }

  @media (min-width: 768px) {
    .image {
      width: 200px;
    }
  }
</style>
<style scoped>
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
</style>