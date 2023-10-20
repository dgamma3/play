<template>
  <div>
    <div class="roll-inner">

      <div class="roll-top-line">
        <div class="roll-menu">
          <div :class="'roll-menu-link ' + [type == 0 ? 'active' : '']" @click="tab_switch(0)">
            <i class="el-icon-s-opportunity"></i>
            <span>进行中</span>
          </div>
          <div :class="'roll-menu-link ' + [type == 1 ? 'active' : '']" @click="tab_switch(1)">
            <i class="el-icon-s-release"></i>
            <span>已结束</span>
          </div>
          <div :class="'roll-menu-link ' + [type == 2 ? 'active' : '']" @click="tab_switch(2)">
            <i class="el-icon-s-custom"></i>
            <span>我参与的</span>
          </div>

          <!-- <div :class="'roll-menu-link ' + [type == 3 ? 'active' : '']" @click="tab_switch(3)">
            <i class="el-icon-upload"></i>
            <div class="tab-item-txt">我参与的</div>
          </div> -->
        </div>
        <div class="roll-select">
        <el-select v-model="rolltype" size="small" placeholder="请选择" @change="on_select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
        </div>
      </div>

      <!--  <div :class="'tab-item mobile_create_roll_btn  ' + [type == 3 ? 'active' : '']" @click="tab_switch(3)">
          <i class="el-icon-upload"></i>
          <div class="tab-item-txt">创建抽奖</div>
      </div> -->
      <template v-if="loadingIndex">
        <div class="text-center">
          <i class="el-icon-loading data-loading"></i>
        </div>
      </template>
      <template v-show="!loadingIndex">
        <template v-if="type == 3">
          <h2 class="room-title">
            <i class="iconfont ttskins-huiyuanzengpinguanli"></i>
            <span>创建抽奖</span>
          </h2>
          <el-form class="room-form" ref="luck_draw_form" :rules="luck_draw_rule" :model="luck_draw_form">
            <el-row class="room-form-items">
              <el-form-item label="你的Roll房名称" prop="name">
                <template slot="label">
                  <img src="@/assets/img/letter.svg" alt="">
                  <span>你的Roll房名称</span>
                </template>
                <el-input v-model="luck_draw_form.name" placeholder="XXXX"></el-input>
              </el-form-item>
              <el-form-item label="抽奖结束日期" prop="date">
                <template slot="label">
                  <img src="@/assets/img/calendar.svg" alt="">
                  <span>抽奖结束日期</span>
                </template>
                <el-date-picker v-model="luck_draw_form.date" type="datetime" align="center" value-format="timestamp"
                  placeholder="YYYY-MM-DD HH:MM:SS" style="width: 100%">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="加入Roll房门槛" prop="flow">
                <template slot="label">
                  <img src="@/assets/img/money-stroke.svg" alt="">
                  <span>加入Roll房门槛</span>
                </template>
                <el-input type="number" v-model.number="luck_draw_form.flow" :placeholder="symbol"></el-input>
              </el-form-item>
            </el-row>
          </el-form>
          <div class="room-content">
            <div class="room-content-search">
              <div class="room-content-search-wrap">
                <input type="text" class="room-content-search-input" placeholder="按名称搜索" v-model="search_name"
                  @input="search_input">
                <input type="number" class="room-content-search-input room-content-search-input2" placeholder="最小价格"
                  v-model.number="search_min_price" @input="search_input">
                <input type="number" class="room-content-search-input room-content-search-input2" placeholder="最大价格"
                  v-model.number="search_max_price" @input="search_input">
              </div>
            </div>
            <template v-if="loadingIndex2">
              <div class="text-center">
                <i class="el-icon-loading data-loading"></i>
              </div>
            </template>
            <template v-else>
              <div class="room-items">
                <div :class="'live-item live-item-bg-' + color(item.color, 4) + ' live-item-bg1'"
                  v-for="(item, index) in ornaments" @click="ornaments_operation(1, index)">
                  <div :class="color(item.color || 7, 3)">
                    <div class="o-item">
                      <div class="o-body">
                        <svg class="o-bg" viewBox="0 0 87.3 107.3">
                          <path d="M83.1 107.3l-61.8-74L87.3 0l-4.2 107.3z" fill-opacity=".04"></path>
                          <path d="M67.7 70.1l-57.5 32.6 11.3-61.3 46.2 28.7z" fill-opacity=".13"></path>
                          <path d="M67.3 63.5L27 74.5l14.3-37.4 26 26.4z" fill-opacity=".02"></path>
                          <path d="M85.5 79.1L51 106.6l29.6-37.4 4.9 9.9z" fill-opacity=".2"></path>
                          <path d="M19.6 72.9L0 52.9l24.1 2-4.5 18z" fill-opacity=".07"></path>
                        </svg>
                        <img class="o-img" :src="img_url + item.img" alt="">
                      </div>
                    </div>
                    <div class="live-item-quality">{{ quality(item.quality, 2) }}</div>
                    <div class="live-item-price price_box "><child-component v-html="symbol"></child-component>
                      {{ item.open_price }}</div>
                    <div class="o-name">{{ item.name }}</div>
                    <div class="o-abrasion" v-if="item.appid == 730">{{ abrasion(item.abrasion) }}</div>
                    <div class="o-abrasion" v-else>{{ quality2(item.quality2) }}</div>
                  </div>
                </div>
              </div>
            </template>
            <div class="room-selected-title">
              <svg class="icon-cubes" viewBox="0 0 46 46">
                <path
                  d="M2.482 0h15.736C19.588 0 20.7 1.11 20.7 2.48v15.737a2.481 2.481 0 0 1-2.482 2.482H2.482A2.481 2.481 0 0 1 0 18.218V2.48A2.481 2.481 0 0 1 2.482 0zM0 43.518V27.782A2.481 2.481 0 0 1 2.482 25.3h15.736c1.37 0 2.482 1.11 2.482 2.482v15.736A2.481 2.481 0 0 1 18.218 46H2.482A2.481 2.481 0 0 1 0 43.52zm25.3 0V27.782a2.481 2.481 0 0 1 2.482-2.482h15.736c1.37 0 2.482 1.11 2.482 2.482v15.736A2.481 2.481 0 0 1 43.518 46H27.782a2.481 2.481 0 0 1-2.482-2.48zM46 9.2v2.3h-9.2v9.2h-2.3v-9.2h-9.2V9.2h9.2V0h2.3v9.2z" />
                <path
                  d="M2.482 0h15.736C19.588 0 20.7 1.11 20.7 2.48v15.737a2.481 2.481 0 0 1-2.482 2.482H2.482A2.481 2.481 0 0 1 0 18.218V2.48A2.481 2.481 0 0 1 2.482 0zM0 43.518V27.782A2.481 2.481 0 0 1 2.482 25.3h15.736c1.37 0 2.482 1.11 2.482 2.482v15.736A2.481 2.481 0 0 1 18.218 46H2.482A2.481 2.481 0 0 1 0 43.52zm25.3 0V27.782a2.481 2.481 0 0 1 2.482-2.482h15.736c1.37 0 2.482 1.11 2.482 2.482v15.736A2.481 2.481 0 0 1 43.518 46H27.782a2.481 2.481 0 0 1-2.482-2.48zM46 9.2v2.3h-9.2v9.2h-2.3v-9.2h-9.2V9.2h9.2V0h2.3v9.2z" />
              </svg>
              <span>
                选择饰品
              </span>
              <span class="room-selected-num">{{ selected_num }}</span>
            </div>
            <div class="room-items">
              <div :class="'live-item live-item-bg-' + color(item.color, 4) + ' live-item-bg1'"
                v-for="(item, index) in ornaments_selected" @click="ornaments_operation(2, index)">
                <div :class="color(item.color || 7, 3)">
                  <div class="o-item">
                    <div class="o-body">
                      <svg class="o-bg" viewBox="0 0 87.3 107.3">
                        <path d="M83.1 107.3l-61.8-74L87.3 0l-4.2 107.3z" fill-opacity=".04"></path>
                        <path d="M67.7 70.1l-57.5 32.6 11.3-61.3 46.2 28.7z" fill-opacity=".13"></path>
                        <path d="M67.3 63.5L27 74.5l14.3-37.4 26 26.4z" fill-opacity=".02"></path>
                        <path d="M85.5 79.1L51 106.6l29.6-37.4 4.9 9.9z" fill-opacity=".2"></path>
                        <path d="M19.6 72.9L0 52.9l24.1 2-4.5 18z" fill-opacity=".07"></path>
                      </svg>
                      <img class="o-img" :src="img_url + item.img" alt="">
                    </div>
                  </div>
                  <div class="live-item-quality">{{ quality(item.quality, 2) }}</div>
                  <div class="live-item-price price_box "><child-component v-html="symbol"></child-component>
                    {{ item.open_price }}</div>
                  <div class="o-name">{{ item.name }}</div>
                  <div class="o-abrasion" v-if="item.appid == 730">{{ abrasion(item.abrasion) }}</div>
                  <div class="o-abrasion" v-else>{{ quality2(item.quality2) }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="room-bottom">
            <button class="room-button price_box " @click="create">创建抽奖 <child-component
                v-html="symbol"></child-component> {{ selected_price }}</button>
          </div>
        </template>

        <template v-else>
          <transition-group tag="div" class="roll-list" enter-active-class="animate__animated animate__flipInX">
            <div class="roll-item" :key="item.id" v-for="(item, index) in roll">
              <div class="roll-box">
                <div class="roll-head">
                  <template v-if="item.spread_id>0">
                    <router-link :to="'/profile/' + item.spread_id" target="_blank">
                      <img class="roll-avatar" :src="repair(item.portrait)" alt="">
                    </router-link>
                  </template>
                  <template v-else>
                    <img class="roll-avatar" :src="repair(item.portrait)" alt="">
                  </template>
                  <div class="roll-badge">{{ item.user_name }}</div>
                </div>

                <div class="roll-name">{{ item.name }}</div>

                <div class="roll-meta">
                  <div>
                    <strong>奖金池</strong>
                    <div class="roll-meta-price">
                      <child-component v-html="symbol"></child-component>
                      <span>{{ item.price }}</span>
                    </div>
                  </div>
                  <div>
                    <strong>饰品</strong>
                    <div>{{ item.num }}</div>
                  </div>
                  <div>
                    <strong>玩家</strong>
                    <div>{{ item.participate_in_num }}</div>
                  </div>
                </div>

                <div class="roll-arms">
                  <div class="roll-arms-item" v-for="(item, index) in item.first_three_pieces">
                    <div :class="'roll-arms-box live-item-bg-' + color(item.color, 4) + ' live-item-bg1'">
                      <div class="roll-item-badge roll-meta-price ">
                        <child-component v-html="symbol"></child-component>
                        <span>{{ item.price }}</span>
                      </div>
                      <div class="roll-arms-img" :style="{backgroundImage: 'url('+ img_url + item.img +')'}"></div>
                    </div>
                  </div>
                </div>

                <div class="roll-btn">
                  <router-link :to="'/roll/' + item.id">
                    <svg viewBox="0 0 64 38">
                      <path
                        d="M64 19.348s-18.3 18.49-32 18.49c-17.9 0-32-18.49-32-18.49S14.1.858 32 .858c13.7 0 32 18.49 32 18.49zm-20.6 0C43.4 12.983 38.3 7.83 32 7.83c-6.3 0-11.4 5.153-11.4 11.518 0 6.365 5.1 11.518 11.4 11.518 6.3 0 11.4-5.153 11.4-11.518zm-5.2 0c0 3.435-2.8 6.264-6.2 6.264-3.4 0-6.2-2.829-6.2-6.264s2.8-6.264 6.2-6.264c3.4 0 6.2 2.83 6.2 6.264z" />
                    </svg>
                    <span>查看Roll房</span>
                  </router-link>
                </div>

                <div class="roll-end-time">结束时间: <span>{{ item.end_time }}</span></div>
              </div>
            </div>
          </transition-group>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import { ttGet, ttPost, repair, abrasion, quality, quality2, color, rand } from "@/utils/util.js";

export default {
  data() {
    return {
      img_url: this.$img_url,
      symbol: this.$getStore({ name: 'symbol' }),
      loadingIndex: true,
      loadingIndex2: false,
      type: 0,
      roll: [],
      rolltype:0,
      options:[
        {label:"主播",value:1},
        {label:"官方",value:0},
        {label:"网站专属用户",value:2},
      ],
      luck_draw_form: {
        name: '',
        date: '',
        flow: '',
      },
      luck_draw_rule: {
        name: [
          { required: true, message: "请输入Roll房名称", trigger: "blur" }
        ],
        date: [
          { required: true, message: "请选择开始结束日期", trigger: "change" }
        ],
        spread_id: [
          { required: true, message: "所属人", trigger: "change" }
        ],
        flow: [
          { required: true, message: "请输入加入流水", trigger: "blur" },
          { type: 'number', message: '加入流水必须为数字' }
        ],
      },
      search_name: '',
      search_min_price: '',
      search_max_price: '',
      timer: '',
      ornaments: [],
      ornaments_selected: [],
    }
  },
  computed: {
    selected_price: function () {
      let selected_price = 0;
      let ornaments_selected = this.ornaments_selected;
      for (let x in ornaments_selected) {
        selected_price += Number(ornaments_selected[x].open_price || 0);
      }
      return selected_price.toFixed(2);
    },
    selected_num: function () {
      return this.ornaments_selected.length;
    },
  },
  mounted() {
    let type = this.$route.query.type;
    if (type) {
      this.type = type;
      let newQuery = JSON.parse(JSON.stringify(this.$route.query)) // 先拷贝一个一模一样的对象
      delete newQuery.type //再删除type
      this.$router.replace({ query: newQuery }) //再把新的替换了
    }
    this.get_roll();
  },
  methods: {
    abrasion, quality, quality2, color, repair,

    //获取所有Roll房
    get_roll() {
      let type = this.type;
      let rolltype = this.rolltype;
      ttGet("/api.php/roll/get_roll", { type: type,rolltype:rolltype }, (res) => {
        this.loadingIndex = false;
        if (res.code == 200) {
          this.roll = res.data.roll;
        } else {
          this.roll = [];
          this.$message({
            message: res.msg,
            type: 'warning'
          });
        }
      });
    },

    //切换tab
    tab_switch(type) {
      this.type = type;
      if (type != 3) {
        this.loadingIndex = true;
        this.get_roll();
      }
    },

    //选择主播还是官方
    on_select() {
      this.loadingIndex = true;
      this.get_roll();
    },
    //搜索饰品
    search_input() {
      let i = 0;
      let j = 10;
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        ++i;
        if (i == j) {
          this.page = 1;
          this.ornaments = [];
          this.get_ornaments();
          clearInterval(this.timer);
        }
      }, 100);
    },

    //获取商城商品
    get_ornaments() {
      let search_name = this.search_name;
      let search_min_price = this.search_min_price;
      let search_max_price = this.search_max_price;
      this.loadingIndex2 = true;
      ttGet("/api.php/roll/get_ornaments", {
        search_name: search_name,
        search_min_price: search_min_price,
        search_max_price: search_max_price
      }, (res) => {
        this.loadingIndex2 = false;
        if (res.code == 200) {
          this.ornaments = res.data.data;
        } else {
          this.ornaments = [];
          this.$message({
            message: res.msg,
            type: 'warning'
          });
        }
      });
    },

    //饰品操作
    ornaments_operation(type, index) {
      if (type == 1) { //选中
        this.ornaments_selected.push(this.ornaments[index]);
      } else {
        this.ornaments_selected.splice(index, 1);
      }
    },

    //创建抽奖
    create() {
      this.$refs.luck_draw_form.validate(valid => {
        if (valid) {
          let ornaments_selected = this.ornaments_selected;
          let ornaments_id_arr = [];
          for (let x in ornaments_selected) {
            ornaments_id_arr.push(ornaments_selected[x].id);
          }
          if (ornaments_id_arr.length == 0) {
            return this.$message({
              message: '最少选择一件饰品!',
              type: 'warning'
            });
          }
          let luck_draw_form = this.luck_draw_form;
          let loading = this.$loading({
            spinner: 'el-icon-loading',
            background: 'rgb(0 0 0 / 0%)'
          });
          ttPost("/api.php/roll/create", {
            name: luck_draw_form.name,
            date: luck_draw_form.date,
            flow: luck_draw_form.flow,
            ornaments_id_arr: ornaments_id_arr,
          }, (res) => {
            loading.close();
            if (res.code == 200) {
              this.tab_switch(0);
              this.$message({
                message: res.msg,
                type: 'success'
              });
            } else {
              this.$message({
                message: res.msg,
                type: 'warning'
              });
            }
          });
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.roll-top-line {
  display: flex;
  border-bottom: 1.5px solid #502387;
  justify-content: space-between;

  @include phone {
    margin-top: 10px;
  }
}

.roll-menu {
  display: flex;
}

.roll-menu-link {
  color: rgba(181, 128, 246, 0.9);
  padding: 12px 30px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  cursor: pointer;
  margin-right: 3px;
  min-width:110px;
  &:hover,
  &.active {
    color: rgba(255, 255, 255, 1);
    background: linear-gradient(269.34deg,
        #cd1ff8 -51.56%,
        #8b57fb 37.03%,
        #3648f3 103.07%);

    svg {
      color: #6d79bf;
    }
  }

  @include phone {
    font-size: 14px;
    padding: 10px 14px;
  }
}

.vue-view {
  margin-bottom: 70px;
}

.roll-inner {
  margin-top: 50px;
  min-height: 570px;
}

.room-title {
  color: #fff;
  margin: 0 0 40px;
  display: flex;
  align-items: center;
  font-size: 27px;
  text-transform: none;
  font-weight: 500;

  .ttskins-huiyuanzengpinguanli {
    position: relative;
    font-size: 30px;
    margin-right: 15px;
    color: #4b56bc;
  }
}


.roll-box {
  box-sizing: border-box;
  background: url(./../../../assets/img/roll-bg.png) center center / 100% 100% no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  color: rgb(255, 255, 255);
  font-size: 14px;
}

@-webkit-keyframes flipInX {
  0% {
      -webkit-transform: perspective(400px) rotate3d(1,0,0,90deg);
      transform: perspective(400px) rotateX(90deg);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
      opacity: 0
  }

  40% {
      -webkit-transform: perspective(400px) rotate3d(1,0,0,-20deg);
      transform: perspective(400px) rotateX(-20deg);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in
  }

  60% {
      -webkit-transform: perspective(400px) rotate3d(1,0,0,10deg);
      transform: perspective(400px) rotateX(10deg);
      opacity: 1
  }

  80% {
      -webkit-transform: perspective(400px) rotate3d(1,0,0,-5deg);
      transform: perspective(400px) rotateX(-5deg)
  }

  to {
      -webkit-transform: perspective(400px);
      transform: perspective(400px)
  }
}

@keyframes flipInX {
  0% {
      -webkit-transform: perspective(400px) rotate3d(1,0,0,90deg);
      transform: perspective(400px) rotateX(90deg);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
      opacity: 0
  }

  40% {
      -webkit-transform: perspective(400px) rotate3d(1,0,0,-20deg);
      transform: perspective(400px) rotateX(-20deg);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in
  }

  60% {
      -webkit-transform: perspective(400px) rotate3d(1,0,0,10deg);
      transform: perspective(400px) rotateX(10deg);
      opacity: 1
  }

  80% {
      -webkit-transform: perspective(400px) rotate3d(1,0,0,-5deg);
      transform: perspective(400px) rotateX(-5deg)
  }

  to {
      -webkit-transform: perspective(400px);
      transform: perspective(400px)
  }
}

.animate__animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both
}

.animate__animated.animate__flipInX {
  -webkit-backface-visibility: visible!important;
  backface-visibility: visible!important;
  -webkit-animation-name: flipInX;
  animation-name: flipInX;
}

.roll-list {
  margin-top: 10px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  align-content: start;

  .roll-item {
    width: 33.32%;
    padding: 20px;

    @include phone {
      width: 100%;
      padding: 10px;
    }

    @include ipad {
      width: 50%;
    }
    @include notebook {
      width: 50%;
    }
  }

  .roll-head {
    position: relative;
    margin-top: 10px;

    .roll-avatar {
      width: 100px;
      height: 100px;
      border-radius: 20px;
    }

    .roll-badge {
      position: absolute;
      left: 50%;
      bottom: -5px;
      transform: translate(-50%);
      background: rgba(239,35,113,.7);
      text-align: center;
      padding: 3px 10px;
      border-radius: 5px;
      font-size: 12px;
      white-space: nowrap;
    }
  }

  .roll-name {
    font-weight: 600;
    font-size: 18px;
    padding: 25px 0px 7px;
  }

  .roll-meta {
    display: flex;
    width: 100%;
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    padding: 10px 0;

    > div {
      flex: 1;
      position: relative;
      text-align: center;
      padding: 0 10px;

      &:before {
        content: '';
        position: absolute;
        height: 50%;
        top: 50%;
        left: 0;
        border-left: 1px solid rgba(255,255,255,.2);
        transform: translateY(-50%);
      }

      &:first-child {
        &::before {
          display: none;
        }
      }
    }

    strong {
      display: block;
      margin-bottom: 5px;
    }

    .roll-meta-price {
      span {
        color: #75dc9e;
      }
    }
  }

  .roll-arms {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 10px;

    .roll-arms-item {
      width: 33.32%;
      padding: 0 10px;
    }

    .roll-arms-box {
      position: relative;
      border: 1.5px solid rgba(87, 138, 239, 0.6);
      border-radius: 10px;
      border-radius: 0 14px 0 14px;
      padding: 4px;
      &:before {
        content: '';
        display: block;
        padding-bottom: 75%; // 自适应图片，img原图 高度 / 宽度 * 100%；
      }
    }

    .roll-item-badge {
      transform: scale(.8);
      text-align: center;
    }

    .roll-arms-img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 80%;
      transition: all .3s;

      &:hover {
        background-size: 90%;
      }
    }
  }

  .roll-btn {
    width: 60%;
    text-align: center;
    margin-top: 25px;
    padding: 12px 20px;
    cursor: pointer;
    border-radius: 4px;
    background: linear-gradient(269.34deg, #cd1ff8 -51.56%, #8b57fb 37.03%, #3648f3 103.07%);
    transition: all .3s;

    a {
      display: flex;
      color: #fff;
      font-weight: bold;
      justify-content: center;
    }

    svg {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }

    &:hover {
      opacity: .9;
      transform: scale(1.1);
    }
  }

  .roll-end-time {
    margin-top: 15px;
  }
}

.room {
  display: flex;
  flex-wrap: wrap;
  margin: -15px;
}

.room-item {
  flex: 0 0 20%;
  max-width: 20%;
  padding: 8px;
}

.room-card {
  border: 1px solid #189ee7;
  padding-bottom: 15px;
  overflow: hidden;
  box-shadow: inset 0 0 59px rgb(41 34 139 / 15%);
  background-color: #0f5e89;
}

.room-card-top {
  position: relative;
  z-index: 0;
  padding: 15px 15px 10px;
  text-align: center;
}

.room-card-top::after {
  content: '';
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.room-card-avatar {
  display: block;
  border-radius: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: -8px;
  width: 74px;
  height: 74px;
  cursor: pointer;
}

.room-card-badge {
  position: relative;
  z-index: 1;
  display: inline-flex;
  justify-content: center;
  height: 24px;
  min-width: 60px;
  font-size: 10px;
  color: #edeef3;
  margin-bottom: 10px;
  padding: 2px 5px 0;
  background-color: #111324;
  border-radius: 10px;
  align-items: center;
  text-transform: uppercase;
}

.room-card-badge span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 55px;
}

.room-card-name {
  font-size: 21px;
  color: #edeef3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.room-card-bg {
  position: absolute;
  z-index: -2;
  height: 120%;
  width: 100%;
  top: 50%;
  left: 0;
  transform: translateY(-60%);
}

.room-card1 {
  .room-card-top::after {
    background-image: radial-gradient(circle at center, rgba(220, 115, 49, .52), rgba(220, 115, 49, .1) 30%, rgba(220, 115, 49, 0) 60%), radial-gradient(circle at center, rgba(220, 115, 49, .6), rgba(220, 115, 49, .15) 40%, rgba(220, 115, 49, 0) 80%);
  }

  .room-card-bg {
    fill: #fb8b32;
  }
}

.room-card2 {
  .room-card-top::after {
    background-image: radial-gradient(circle at center, rgba(244, 53, 21, .52), rgba(244, 53, 21, .1) 30%, rgba(244, 53, 21, 0) 60%), radial-gradient(circle at center, rgba(200, 48, 32, .6), rgba(200, 48, 32, .15) 40%, rgba(200, 48, 32, 0) 80%);
  }

  .room-card-bg {
    fill: #f75044;
  }
}

.room-card3 {
  .room-card-top::after {
    background-image: radial-gradient(circle at center, rgba(241, 43, 141, .5), rgba(241, 43, 141, .1) 30%, rgba(241, 43, 141, 0) 60%), radial-gradient(circle at center, rgba(192, 42, 102, .6), rgba(192, 42, 102, .15) 40%, rgba(192, 42, 102, 0) 80%);
  }

  .room-card-bg {
    fill: #e13864;
  }
}

.room-card4 {
  .room-card-top::after {
    background-image: radial-gradient(circle at center, rgba(13, 66, 81, 0.73), rgba(94, 43, 241, .1) 30%, rgba(94, 43, 241, 0) 60%), radial-gradient(circle at center, rgba(81, 42, 192, .6), rgba(81, 42, 192, .15) 40%, rgba(81, 42, 192, 0) 80%);
  }

  .room-card-bg {
    fill: #6644f7;
  }
}

.room-card5 {
  .room-card-top::after {
    background-image: radial-gradient(circle at center, rgba(43, 66, 241, .73), rgba(43, 66, 241, .1) 30%, rgba(43, 66, 241, 0) 60%), radial-gradient(circle at center, rgba(42, 53, 192, .6), rgba(42, 53, 192, .15) 40%, rgba(42, 53, 192, 0) 80%);
  }

  .room-card-bg {
    fill: #4455f7;
  }
}

.room-card6 {
  .room-card-top::after {
    background-image: radial-gradient(circle at center, rgba(99, 165, 209, .5), rgba(99, 165, 209, .1) 30%, rgba(99, 165, 209, 0) 60%), radial-gradient(circle at center, rgba(99, 165, 209, .6), rgba(99, 165, 209, .1) 40%, rgba(99, 165, 209, 0) 80%);
  }

  .room-card-bg {
    fill: #63A5D1;
  }
}

.room-card7 {
  .room-card-top::after {
    background-image: radial-gradient(circle at center, rgba(187, 187, 187, .5), rgba(187, 187, 187, .1) 30%, rgba(187, 187, 187, 0) 60%), radial-gradient(circle at center, rgba(170, 170, 170, .6), rgba(170, 170, 170, .15) 40%, rgba(170, 170, 170, 0) 80%);
  }

  .room-card-bg {
    fill: #ddd;
  }
}

.room-card-content {
  padding-left: 15px;
  padding-right: 15px;
}

.room-card-metas {
  display: flex;
  margin-left: -3px;
  margin-right: -3px;
  padding-top: 10px;
  padding-bottom: 6px;
}

.room-card-meta {
  flex: 0 0 33.33%;
  max-width: 33.33%;
  text-align: center;
  font-size: 15px;
  font-weight: 300;
  line-height: 1.35;
  color: #fffefe;
  padding-left: 3px;
  padding-right: 3px;
}

.room-card-meta-value {
  font-size: 15px;
  font-weight: 700;
  color: #fff;
}

.room-card-items {
  display: flex;
  margin-left: -3px;
  margin-right: -3px;
}

.room-card-item {
  flex: 0 0 33.33%;
  max-width: 33.33%;
  padding-left: 3px;
  padding-right: 3px;
}

.live-item {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: relative;
  background-color: #131528;
  color: #cbccd6;
  line-height: 1.3;
  border-top-color: transparent;
  border-left-color: transparent;
  -o-user-select: none;
  user-select: none;
  padding: 5px;
  border-radius: 0;
  border: 0;
  cursor: pointer;
}

.live-item-badge {
  position: absolute;
  z-index: 9998;
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  height: 22px;
  border-radius: 10px;
  background-color: rgba(14, 15, 30, .5);
  left: 50%;
  right: auto;
  top: auto;
  bottom: 10px;
  transform: translateX(-50%);
  color: #edeef3;
  font-size: 12px;
}

.live-item-bg {
  display: block;
  width: auto;
  height: 75px;
  margin-left: auto;
  margin-right: auto;
}

.live-item-img {
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: saturate(150%);
  max-width: 80px;
}

.live-item1 {
  .live-item-wrap {
    background-image: radial-gradient(circle at center, rgba(252, 166, 17, .5), rgba(252, 166, 17, .1) 25%, rgba(252, 166, 17, 0) 40%), radial-gradient(circle at center, rgba(210, 154, 19, .48), rgba(210, 154, 19, .15) 30%, rgba(210, 154, 19, 0) 65%);
  }

  .live-item-bg {
    fill: #f7d744;
  }
}

.live-item2 {
  .live-item-wrap {
    background-image: radial-gradient(circle at center, rgba(244, 53, 21, .52), rgba(244, 53, 21, .1) 25%, rgba(244, 53, 21, 0) 40%), radial-gradient(circle at center, rgba(200, 48, 32, .6), rgba(200, 48, 32, .15) 30%, rgba(200, 48, 32, 0) 65%);
  }

  .live-item-bg {
    fill: #f75044;
  }
}

.live-item3 {
  .live-item-wrap {
    background-image: radial-gradient(circle at center, rgba(241, 43, 141, .5), rgba(241, 43, 141, .1) 25%, rgba(241, 43, 141, 0) 40%), radial-gradient(circle at center, rgba(192, 42, 102, .6), rgba(192, 42, 102, .15) 30%, rgba(192, 42, 102, 0) 65%);
  }

  .live-item-bg {
    fill: #e13864;
  }
}

.live-item4 {
  .live-item-wrap {
    background-image: radial-gradient(circle at center, rgba(94, 43, 241, .73), rgba(94, 43, 241, .1) 25%, rgba(94, 43, 241, 0) 40%), radial-gradient(circle at center, rgba(81, 42, 192, .6), rgba(81, 42, 192, .15) 30%, rgba(81, 42, 192, 0) 65%);
  }

  .live-item-bg {
    fill: #6644f7;
  }
}

.live-item5 {
  .live-item-wrap {
    background-image: radial-gradient(circle at center, rgba(43, 66, 241, .73), rgba(43, 66, 241, .1) 25%, rgba(43, 66, 241, 0) 40%), radial-gradient(circle at center, rgba(42, 53, 192, .6), rgba(42, 53, 192, .15) 30%, rgba(42, 53, 192, 0) 65%);
  }

  .live-item-bg {
    fill: #4455f7;
  }
}

.live-item6 {
  .live-item-wrap {
    background-image: radial-gradient(circle at center, rgba(99, 165, 209, .5), rgba(99, 165, 209, .1) 25%, rgba(99, 165, 209, 0) 40%), radial-gradient(circle at center, rgba(99, 165, 209, .6), rgba(99, 165, 209, .1) 30%, rgba(99, 165, 209, 0) 65%);
  }

  .live-item-bg {
    fill: #63A5D1;
  }
}

.live-item7 {
  .live-item-wrap {
    background-image: radial-gradient(circle at center, rgba(187, 187, 187, .5), rgba(187, 187, 187, .1) 25%, rgba(187, 187, 187, 0) 40%), radial-gradient(circle at center, rgba(170, 170, 170, .6), rgba(170, 170, 170, .15) 30%, rgba(170, 170, 170, 0) 65%);
  }

  .live-item-bg {
    fill: #ddd;
  }
}

.room-card-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 15px;
  padding-top: 4px;
  font-weight: 700;
  height: 44px;
  border-radius: 4px;
  line-height: 42px;
  text-transform: uppercase;
  margin-top: 6px;
  margin-bottom: 15px;
  background-color: #111324;
}

.room-card-icon {
  width: 20px;
  position: relative;
  top: -1px;
  margin-right: 5px;
  fill: #fff;
}

.room-card-time {
  color: #8d91ae;
  font-size: 13px;
  text-align: center;
}

.room-form {
  background-color: #0e0f1e;
  box-shadow: 0 24px 31px rgb(15 16 31 / 71%);

  .room-form-items {
    display: flex;

    .el-form-item {
      img {
        position: relative;
        top: -1px;
        margin-right: 15px;
      }
    }
  }

  ::v-deep {
    .el-form-item {
      padding: 40px 30px;
      flex: 1;
      margin-bottom: 0;
    }

    .el-form-item+.el-form-item {
      border-left: 1px solid #15172c;
    }

    .el-form-item__label {
      display: flex;
      align-items: center;
      color: #b8b9cc;
      font-size: 19px;
      margin-bottom: 15px;
    }

    .el-form-item__label::before {
      content: '' !important;
    }

    .el-input__inner {
      line-height: 1.15;
      background-color: #131528;
      height: 76px;
      padding-left: 26px;
      padding-right: 26px;
      font-size: 20px;
      width: 100%;
      color: #fff;
      border: 0;
      outline: 0;
      border-radius: 0
    }

    .el-input__inner::placeholder {
      color: #a8a8a8;
    }

    /* 谷歌 */
    .el-input__inner::-webkit-input-placeholder {
      color: #a8a8a8;
    }

    /* 火狐 */
    .el-input__inner:-moz-placeholder {
      color: #a8a8a8;
    }

    /*ie*/
    .el-input__inner:-ms-input-placeholder {
      color: #a8a8a8;
    }

    .el-icon-time::before {
      content: '';
    }
  }
}

.room-content {
  padding: 50px 30px;
  background-color: #1b1d35;
  margin-left: 0;
  margin-right: 0;
}

.room-content-search {
  margin-bottom: 40px;
}

.room-content-search-wrap {
  position: relative;
  display: flex;
}

.room-content-search-input {
  display: block;
  height: 88px;
  padding-left: 32px;
  padding-right: 80px;
  font-size: 24px;
  color: #fff;
  background-color: #1f213c;
  outline: 0;
  width: 100%;
  border: 0;
  font-weight: 400;
}

.room-content-search-input2 {
  width: 20%;
  margin-left: 20px;
}

.room-items {
  background-color: #191c34;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  margin-bottom: 40px;

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

    &.active {
      border: 1px solid #2d2d67 !important;
      box-shadow: inset 0 0 59px rgb(41 34 139 / 15%);
    }
  }

  .live-item-check {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -1px;
    left: -1px;
    width: 20px;
    height: 20px;
    background-color: #2d2d67;
    color: #a6a6cf;
  }

  .icon-check {
    width: 10px;
    height: 8px;
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

  .live-item-bg1 {
    background-size: 100% 100%;
    /* height: 75px; */
    /* margin-left: auto; */
    /* margin-right: auto; */
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
}

.room-selected-title {
  margin-top: 0;
  display: flex;
  align-items: center;
  font-size: 21px;
  font-weight: 400;
  color: #fff;
  margin-bottom: 30px
}

.icon-cubes {
  color: #7349cb;
  width: 24px;
  height: 24px;
  margin-right: 18px;
}

.room-selected-num {
  font-size: 30px;
  color: #7349cb;
  margin-left: 10px;
  padding-top: 5px;
}

.room-bottom {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 44px;
  padding-bottom: 72px;
  background-color: #0e0f1e;
}

.room-button {
  height: 82px;
  width: 350px;
  font-size: 22px;
  font-weight: 700;
  border-radius: 4px;
  background-color: #3a33ac;
  padding-top: 4px;
  color: #fff;
  text-transform: uppercase;
  border: 0;
  cursor: pointer;
}

@media (min-width: 480px) {
}

@media (min-width: 768px) {}

@media (min-width: 992px) {}

@media (min-width: 1200px) {}

@media (min-width: 1440px) {}


@media only screen and (max-width: 1439px) {
  .room-item {
    flex: 0 0 25%;
    max-width: 25%;
  }
}

@media only screen and (max-width: 1199px) {
  .room-item {
    flex: 0 0 33.33%;
    max-width: 33.33%;
  }

  .room-items {
    .live-item {
      flex-basis: 20%;
      max-width: 20%;
    }
  }
}

.mobile_create_roll_btn {
  display: none;
  margin-bottom: 30px;
}

@media only screen and (max-width: 991px) {
  .mobile_create_roll_btn {
    display: flex;
  }

  .ml-auto {
    display: none;
  }

  .room-item {
    flex: 0 0 50%;
    max-width: 50%;
  }

  .room-items {
    .live-item {
      flex-basis: 25%;
      max-width: 25%;
    }
  }
}

@media only screen and (max-width: 767px) {
  .room-items {
    .live-item {
      flex-basis: 50%;
      max-width: 50%;
    }
  }

  .room-item {
    flex: 0 0 100%;
    max-width: 100%;
  }

  .room-form {
    .room-form-items {
      display: block !important;
    }

    ::v-deep {
      .el-form-item {
        padding: 20px;
      }
    }
  }

  .room-content {
    padding: 20px;
  }

  .room-content-search-wrap {
    display: block !important;
  }

  .room-content-search-input {
    font-size: 18px;
    padding-left: 20px;
    padding-right: 60px;
    height: 70px;
    width: 100%;
    margin-left: 0;
    margin-bottom: 10px;
  }
}

@media only screen and (max-width: 479px) {

  .roll-select{
    width:100%;
    position:absolute;
    top:-40px;
  }
  .roll-select .el-select{width:90% !important;}
}
</style>
<style scoped>
.room-card-meta-value {
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3px;
}

.roll-meta-price {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.roll-meta-price /deep/ .symbol {
  width: 16px;
  margin-right: 5px;
  vertical-align: sub;
}

.room-card-meta-value /deep/ .symbol {
  margin-left: 10px;
  width: 16px;
  padding-top: 3px;
  margin-right: 5px;
}


.live-item-badge {
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3px;
}

.live-item-badge /deep/ .symbol {
  margin-left: 10px;
  width: 12px;
  padding-top: 1px;
  margin-right: 5px;
}


.room-button {
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3px;
  margin-bottom: 20px;
}

.room-button /deep/ .symbol {
  margin-left: 10px;
  width: 20px;
  padding-top: 4px;
  margin-right: 5px;
}





.live-item-price {
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3px;
}

.live-item-price /deep/ .symbol {
  margin-left: 10px;
  width: 16px;
  padding-top: 3px;
  margin-right: 5px;
}
</style>
