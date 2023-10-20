<template>
  <div>
    <div class="battle">
      <div class="battle-container">
        <div class="battle-header">
          <h2 class="battle-title">
            <svg class="icon-fist" viewBox="0 0 44 47">
              <path
                d="M42.027 15.314c-.475-.737-.864-1.902-.864-2.588 0-.686-.557-1.699-1.236-2.25l-6.762-5.482c-.68-.552-1.661-1.003-2.18-1.003-.519 0-1.501-.448-2.184-.998L26.317.997c-.682-.549-1.955-.998-2.829-.998h-.223c-.875 0-2.126.475-2.781 1.056l-4.147 3.677c-.655.581-1.893 1.194-2.751 1.361l-.455.089c-.858.169-2.195.634-2.972 1.036l-.651.336c-.776.402-1.759 1.358-2.182 2.127l-3.523 6.39c-.424.768-.7 2.111-.613 2.986l.578 5.805c.087.874-.316 2.128-.895 2.786L.411 30.446a1.73 1.73 0 00.071 2.325l.633.637a1.587 1.587 0 002.246 0l.137-.138c.618-.621 1.838-1.129 2.712-1.129h1.787c.874 0 1.366-.683 1.094-1.518 0 0-3.179-9.761-2.484-11.558.695-1.797 1.986-8.885 8.242-9.384 6.256-.499 6.955.958 6.955.958.379.791.125 1.877-.566 2.415 0 0-.928.72 2.448 2.218 3.376 1.497 3.376.798 3.376.798 0-.879.682-1.813 1.515-2.078 0 0 .372-.119.273.98-.099 1.098-2.68 5.291-5.659 4.692-2.979-.599-4.915-1.838-4.915-1.838-.738-.471-1.364-1.531-1.391-2.355-.027-.824-.641-1.093-1.363-.6 0 0-1.169.799.519 3.295 1.689 2.496 3.601 7.493 3.601 7.493.313.82.821.818 1.129-.005l2.174-2.238c.518-.707 1.313-.672 1.767.078l2.893 1.571c.688.543 1.797 1.45 2.466 2.015 0 0 3.149 2.665 3.149 3.263 0 .6-4.17 3.993-4.865 4.292-.696.3-5.81-.249-6.653.6-.822.825-8.371 8.192-8.371 8.192a1.578 1.578 0 00-.017 2.241l.852.858a1.588 1.588 0 002.247 0L22 40.908c.618-.621 1.833-1.225 2.698-1.342l3.871-.524c.866-.118 2.17-.612 2.896-1.1l.336-.225a19.31 19.31 0 002.445-2.014l8.625-8.672c.618-.622 1.123-1.848 1.123-2.727v-4.342c0-.879-.389-2.2-.863-2.938l-1.104-1.71zm-16.939-6.2c-.648.588-1.844.808-2.656.485l-1.838-1.291c-.762-.432-.963-1.365-.448-2.075 0 0 2.108-2.902 2.704-2.503.596.399 3.575 2.463 3.708 3.195.132.732-1.47 2.189-1.47 2.189zm2 1.87c-.693-.256-.896-1.087-.454-1.844 0 0 .983-1.684 2.241-1.684s3.839 2.329 3.111 3.394c-.728 1.065-1.131 2.662-3.015 1.398l-1.883-1.264zm-.067 9.25c2.053-1.73 5.066-6.199 5.066-6.199a203.77 203.77 0 001.76-2.66s.124-.192 1.118.54c.993.732 1.63 1.922 1.63 1.922.414.773.405 2.034-.021 2.801l-5.965 6.012c-.59.647-1.735.907-2.545.577.001 0-3.095-1.262-1.043-2.993zm8.739 7.653c-.596 0-4.049-2.463-3.647-2.928.403-.466 5.664-6.03 5.664-6.03.601-.637 1.76-.895 2.573-.575 0 0 .374.149.441 2.477.066 2.331-4.435 7.056-5.031 7.056z"
              />
            </svg>
            <span>创建对战</span>
          </h2>
          <router-link class="battle-back" to="/battle">
            <span>返回</span>
          </router-link>
        </div>
        <div class="battle-top">
          <div class="battle-top-inner">
            <div class="battle-round-number">
              <span>{{ total_box_num }}</span>
              <span>回合</span>
            </div>
            <div style="display:flex;">
              <div class="battle-top-fields">
                <label v-if="!isSmallScreen">模式</label>
                <ul class="battle-button-group">
                  <li
                    :class="{ active: !battle_type }"
                    @click="setBattleType(false)"
                  >
                    非酋
                  </li>
                  <li
                    :class="{ active: battle_type }"
                    @click="setBattleType(true)"
                  >
                    欧皇
                  </li>
                </ul>
              </div>
              <!-- <label class="battle-toggle">
              <el-switch
                v-model="battle_type"
                active-text="欧皇模式"
                inactive-text="非酋模式">
              </el-switch>
            </label>   -->
              <div class="battle-top-fields">
                <label v-if="!isSmallScreen">玩家</label>
                <ul class="battle-button-group">
                  <li :class="{ active: value2 == 2 }" @click="num_switch(2)">
                    2
                  </li>
                  <li :class="{ active: value2 == 3 }" @click="num_switch(3)">
                    3
                  </li>
                  <li :class="{ active: value2 == 4 }" @click="num_switch(4)">
                    4
                  </li>
                </ul>
              </div>
            </div>
            <div class="battle-top-col">
              <!--  <div class="battle-referrals">
                <el-checkbox v-model="value3">只用于我的下级</el-checkbox>
                <input type="number" v-if="value3" class="battle-min-deposit-input" placeholder="最少充值"
                       v-model.number="value4">
              </div> -->
              <!--   <div class="battle-discount-wrap">
                <div class="battle-discount-top">优惠</div>
                <div class="battle-slider">
                  <el-slider ref="slider1" v-model="value5" :min="0" :max="100"></el-slider>
                </div>
              </div> -->
              <div class="battle-cost">
                <span>总消耗</span>
                <span class="battle-cost-value price_box">
                  <child-component v-html="symbol"></child-component>
                  <span>{{ total_box_price }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <template v-if="total_box_num == 0">
          <div class="battle-items empty" @click="add">
            <template v-if="loadingIndex">
              <div class="text-center">
                <i class="el-icon-loading data-loading"></i>
              </div>
            </template>
            <template v-else>
              <div class="battle-icon-add">
                <svg class="icon-plus-thin" viewBox="0 0 42 42">
                  <g>
                    <g>
                      <path
                        d="M21.696-.006C20.744 0 19.977.766 20.02 1.67l-.233 17.166-18.118.144c-.952.005-1.718.771-1.676 1.675-.006.953.752 1.71 1.657 1.658l18.118-.143-.191 18.165c-.006.952.752 1.71 1.657 1.657.476-.003.858-.195 1.193-.53.336-.336.528-.718.531-1.194l.19-18.165 17.119-.185c.476-.003.858-.196 1.193-.531.336-.335.528-.717.531-1.194.006-.952-.752-1.71-1.657-1.657l-17.166.233.185-17.118c-.042-.904-.8-1.662-1.657-1.657z"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <span class="battle-add-text">添加箱子</span>
            </template>
          </div>
        </template>
        <template v-else>
          <div class="battle-items">
            <div
              class="battle-item"
              v-for="(item, index) in box"
              v-if="item.num > 0"
            >
              <div class="product-card">
                <div class="product-card-counter">
                  <button
                    class="counter-control"
                    @click="box_num_switch('del', index)"
                  >
                    <svg class="icon-minus" viewBox="0 0 8.1 1.7">
                      <path
                        d="M7.3 0c.5 0 .8.4.8.8 0 .5-.4.8-.8.8H.8c-.4.1-.8-.3-.8-.8C0 .4.4 0 .8 0h6.5z"
                      />
                    </svg>
                  </button>
                  <div class="counter-value">{{ item.num }}</div>
                  <button
                    class="counter-control"
                    @click="box_num_switch('add', index)"
                  >
                    <svg class="icon-plus" viewBox="0 0 26 26">
                      <g>
                        <g>
                          <path
                            d="M25.986 13a1.742 1.742 0 0 1-1.743 1.745h-9.51v9.53a1.742 1.742 0 1 1-3.486 0v-9.53h-9.51c-.963 0-1.742-.782-1.743-1.745 0-.965.78-1.746 1.743-1.746h9.51v-9.53a1.743 1.743 0 1 1 3.486.002v9.529h9.51c.964 0 1.743.78 1.743 1.745z"
                          />
                        </g>
                      </g>
                    </svg>
                  </button>
                </div>
                <div class="product-case">
                  <img
                    class="product-case-case"
                    :src="img_url + item.img"
                    alt=""
                  />
                </div>
                <div class="product-card-name">{{ item.name }}</div>
                <div class="product-card-price price_box ">
                  <child-component v-html="symbol"></child-component>
                  <span>{{ (item.price * item.num).toFixed(2) }}</span>
                </div>
                <div class="product-card-remove" @click="box_num_del(index)">
                  <svg class="icon-cross" viewBox="0 0 32 32">
                    <g>
                      <g>
                        <path
                          d="M3.98 1.15l12.013 12.014L27.597 1.56a2.01 2.01 0 0 1 2.843 2.842L18.836 16.007l12.013 12.014a2 2 0 0 1-2.828 2.828L16.007 18.835 3.434 31.41a2.01 2.01 0 0 1-2.843-2.843l12.573-12.573L1.151 3.979a2 2 0 1 1 2.828-2.828z"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
                <svg class="product-card-bg" viewBox="0 0 280 290">
                  <path
                    fill="#6644f7"
                    fill-opacity=".039"
                    d="M57.761-25.849l229.11 325.245L489.883 72.093z"
                  ></path>
                  <path
                    fill="#6137fd"
                    fill-opacity=".129"
                    d="M290.188-94.806L99.178 99.384l256.415 20.39z"
                  ></path>
                  <path
                    fill="#5a36f5"
                    fill-opacity=".051"
                    d="M335.319-66.788l-86.826 148.5 164.224-16.949z"
                  ></path>
                  <path
                    fill="#6a41f2"
                    fill-opacity=".2"
                    d="M146.37-59.71L-.074 48.113l180.53-77.842z"
                  ></path>
                  <path
                    fill="#633ffe"
                    fill-opacity=".071"
                    d="M389.241 124.76l58.872 99.32 17.894-98.092z"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="battle-item" @click="add">
              <div class="product-card product-card-empty">
                <div class="battle-icon-add">
                  <svg class="icon-plus-thin" viewBox="0 0 42 42">
                    <g>
                      <g>
                        <path
                          d="M21.696-.006C20.744 0 19.977.766 20.02 1.67l-.233 17.166-18.118.144c-.952.005-1.718.771-1.676 1.675-.006.953.752 1.71 1.657 1.658l18.118-.143-.191 18.165c-.006.952.752 1.71 1.657 1.657.476-.003.858-.195 1.193-.53.336-.336.528-.718.531-1.194l.19-18.165 17.119-.185c.476-.003.858-.196 1.193-.531.336-.335.528-.717.531-1.194.006-.952-.752-1.71-1.657-1.657l-17.166.233.185-17.118c-.042-.904-.8-1.662-1.657-1.657z"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
                <span class="battle-add-text">添加箱子</span>
              </div>
            </div>
          </div>
        </template>
        <div class="battle-create">
          <button class="battle-create-btn" @click="create">
            <span>创建</span>
            <span class="price_box">
              <child-component v-html="symbol"></child-component>
              <span>{{ total_box_price }}</span>
            </span>
          </button>
        </div>
      </div>
    </div>
    <el-dialog
      class="battle-dialog"
      title="箱子"
      append-to-body
      :visible.sync="add_page"
      :close-on-click-modal="false"
      :lock-scroll="false"
      width="55%"
    >
      <template slot="title">
        <h2 class="battle-dialog-title">箱子</h2>
        <div class="battle-dialog-total">
          <span style="line-height:10px">总消耗</span>
          <span class="price_box"
            ><child-component v-html="symbol"></child-component>
            {{ total_box_price }}</span
          >
        </div>
        <button class="battle-dialog-clear" @click="clear_btn">清除</button>
      </template>
      <div class="battle-dialog-top">
        <div class="battle-dialog-filter-wrap">
          <div class="battle-dialog-filter">
            <button
              :class="
                'battle-dialog-btn ' + [section_index == index ? 'active' : '']
              "
              v-for="(item, index) in section"
              @click="section_switch(index)"
            >
              {{ item.name }}
            </button>
          </div>
        </div>
        <div class="battle-dialog-search">
          <input
            class="battle-dialog-search-input"
            v-model="name"
            type="text"
            placeholder="箱子名称"
            @input="name_input"
          />
          <button class="battle-dialog-search-btn">
            <svg class="icon-search" viewBox="0 0 30 30">
              <g>
                <g>
                  <path
                    d="M30 27.503l-2.48 2.496-7.42-7.466a12.435 12.435 0 0 1-12.452 1.68A12.586 12.586 0 0 1 0 12.61a12.56 12.56 0 0 1 3.664-8.913A12.409 12.409 0 0 1 12.521 0h.023c1.676 0 3.31.333 4.854.992 6.251 2.713 9.218 10.067 6.616 16.393-.376.914-.87 1.792-1.47 2.615zM12.521 3.526c-4.971 0-9.015 4.071-9.015 9.075s4.044 9.076 9.015 9.076c4.97 0 9.014-4.072 9.014-9.076 0-5.004-4.044-9.075-9.014-9.075z"
                  />
                </g>
              </g>
            </svg>
          </button>
        </div>
      </div>
      <div class="battle-dialog-content">
        <div class="battle-dialog-items-wrap">
          <div class="battle-dialog-items-wrap-content">
            <div class="battle-dialog-items">
              <div
                class="battle-dialog-item"
                v-for="(item, index) in box"
                v-if="item.price_status && item.name_status"
              >
                <div class="product-card">
                  <div class="product-case">
                    <img
                      class="product-case-case"
                      :src="img_url + item.img"
                      alt=""
                    />
                  </div>
                  <div class="product-card-name">{{ item.name }}</div>
                  <div class="product-card-price price_box ">
                    <child-component v-html="symbol"></child-component>
                    {{ item.price }}
                  </div>
                  <div v-if="item.num > 0" class="product-card-number">
                    x{{ item.num }}
                  </div>
                  <div
                    v-if="item.num > 0"
                    class="product-card-remove"
                    @click="box_num_switch('del', index)"
                  >
                    <svg class="icon-minus" viewBox="0 0 8.1 1.7">
                      <path
                        d="M7.3 0c.5 0 .8.4.8.8 0 .5-.4.8-.8.8H.8c-.4.1-.8-.3-.8-.8C0 .4.4 0 .8 0h6.5z"
                      />
                    </svg>
                  </div>
                  <div
                    class="product-card-icon-add"
                    @click="box_num_switch('add', index)"
                  >
                    <svg class="icon-plus-thin" viewBox="0 0 42 42">
                      <g>
                        <g>
                          <path
                            d="M21.696-.006C20.744 0 19.977.766 20.02 1.67l-.233 17.166-18.118.144c-.952.005-1.718.771-1.676 1.675-.006.953.752 1.71 1.657 1.658l18.118-.143-.191 18.165c-.006.952.752 1.71 1.657 1.657.476-.003.858-.195 1.193-.53.336-.336.528-.718.531-1.194l.19-18.165 17.119-.185c.476-.003.858-.196 1.193-.531.336-.335.528-.717.531-1.194.006-.952-.752-1.71-1.657-1.657l-17.166.233.185-17.118c-.042-.904-.8-1.662-1.657-1.657z"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <svg class="product-card-bg" viewBox="0 0 280 290">
                    <path
                      fill="#6644f7"
                      fill-opacity=".039"
                      d="M57.761-25.849l229.11 325.245L489.883 72.093z"
                    ></path>
                    <path
                      fill="#6137fd"
                      fill-opacity=".129"
                      d="M290.188-94.806L99.178 99.384l256.415 20.39z"
                    ></path>
                    <path
                      fill="#5a36f5"
                      fill-opacity=".051"
                      d="M335.319-66.788l-86.826 148.5 164.224-16.949z"
                    ></path>
                    <path
                      fill="#6a41f2"
                      fill-opacity=".2"
                      d="M146.37-59.71L-.074 48.113l180.53-77.842z"
                    ></path>
                    <path
                      fill="#633ffe"
                      fill-opacity=".071"
                      d="M389.241 124.76l58.872 99.32 17.894-98.092z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="battle-dialog-ready" @click="ready">准备</div>
      </div>
    </el-dialog>
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
  rand
} from "@/utils/util.js";

export default {
  data() {
    return {
      img_url: this.$img_url,
      symbol: this.$getStore({ name: "symbol" }),
      loadingIndex: true,
      value1: false, //对战类型 false公开的 true私人的
      battle_type: true, //对战类型 false公开的 true私人的
      value2: 2, //对战人数
      value3: false, //是否需为下级
      value4: "", //最少充值
      value5: 0, //优惠
      box: [], //所有箱子
      add_page: false, //添加箱子页面
      // section: [ //价值区间
      //   { name: '全部', min: 0, max: 0 },
      //   //  this.$getStore({name: 'symbol'}) +
      //   { name: '0 - ' + '5', min: 0, max: 5 },
      //   { name: '5 - ' + '20', min: 5, max: 20 },
      //   { name: '20 - ' + '100', min: 20, max: 100 },
      //   { name: '100+', min: 100, max: 0 },
      // ],
      section: [
        { name: "全部", value: 0 },
        { name: "主播推荐", value: 4 },
        { name: "高保底", value: 17 },
        { name: "新手推荐", value: 1 },
        { name: "经典55开", value: 16 },
        { name: "刺激37箱", value: 2 },
        { name: "幸运28箱", value: 15 },
        { name: "搏命19箱", value: 3 }
      ],
      section_index: 0,
      original_battle_id: "", //需要复制的参数
      name: "", //搜索名称
      isSmallScreen: false
    };
  },
  computed: {
    // 判断是否是移动端
    checkScreenSize() {
      return window.innerWidth <= 768;
    },
    total_box_price: function() {
      let total_box_price = 0;
      let box = this.box;
      let value2 = this.value2;
      let value5 = this.value5;
      for (let x in box) {
        total_box_price += Number(box[x].price * box[x].num);
      }
      let discount = Math.ceil(total_box_price * value5) / 100;
      discount = discount > total_box_price ? total_box_price : discount;
      let total_discount = discount * (value2 - 1);
      total_box_price += total_discount;
      return total_box_price.toFixed(2);
    },
    total_box_num: function() {
      let total_box_num = 0;
      let box = this.box;
      for (let x in box) {
        total_box_num += Number(box[x].num);
      }
      return total_box_num;
    }
  },
  mounted() {
    // 监听窗口大小变化
    window.addEventListener("resize", this.handleResize);
    this.isSmallScreen = this.checkScreenSize;
    let original_battle_id = this.$route.query.original_battle_id;
    if (original_battle_id) {
      this.original_battle_id = encodeURIComponent(original_battle_id);
      let newQuery = JSON.parse(JSON.stringify(this.$route.query)); // 先拷贝一个一模一样的对象
      delete newQuery.original_battle_id; //再删除参数
      this.$router.replace({ query: newQuery }); //再把新的替换了
    }
    this.get_box();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.isSmallScreen = this.checkScreenSize;
    },
    setBattleType(type) {
      this.battle_type = type;
    },

    clear_btn() {
      let box = this.box;
      for (let x in box) {
        this.box[x].num = 0;
      }
    },
    abrasion,
    quality,
    quality2,
    color,

    //获取所有箱子
    get_box() {
      let original_battle_id = this.original_battle_id;
      ttGet(
        "/api.php/battle/get_box",
        { original_battle_id: original_battle_id },
        res => {
          this.loadingIndex = false;
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
        }
      );
    },

    //对战人数切换
    num_switch(num) {
      this.value2 = num;
    },

    //箱子数量切换
    box_num_switch(type, index) {
      if (type === "add") {
        //添加
        let total_box_num = this.total_box_num;
        if (total_box_num >= 10) {
          this.$message({
            message: "您已达到最大回合数!",
            type: "warning"
          });
        } else {
          this.box[index].num = ++this.box[index].num;
        }
      } else {
        //减少
        let surplus = --this.box[index].num;
        if (surplus > 0) {
          this.box[index].num = surplus;
        } else {
          this.box[index].num = 0;
        }
      }
    },

    //箱子直接清空
    box_num_del(index) {
      this.box.splice(index, 1);
    },

    //添加箱子
    add() {
      this.add_page = true;
    },

    //准备
    ready() {
      this.add_page = false;
    },

    // //价值区间切换
    // section_switch(index) {
    //   this.section_index = index;
    //   let section = this.section[index];
    //   let box = this.box;
    //   for (let x in box) {
    //     let min_status = true;
    //     let max_status = true;
    //     if (section.min && box[x].price < section.min) min_status = false;
    //     if (section.max && box[x].price > section.max) max_status = false;
    //     if (min_status && max_status) {
    //       box[x].price_status = true;
    //     } else {
    //       box[x].price_status = false;
    //     }
    //   }
    // },
    //价值区间切换
    section_switch(index) {
      this.section_index = index;
      let section = this.section[index];
      let box = this.box;

      for (let x in box) {
        if (section.value === 0 || box[x].cid === section.value) {
          box[x].price_status = true;
        } else {
          box[x].price_status = false;
        }
      }
    },

    //饰品名称搜索
    name_input() {
      let box = this.box;
      for (let x in box) {
        let a = this.name.toLowerCase();
        let b = box[x].name.toLowerCase();
        if (b.search(a) != -1) {
          box[x].name_status = true;
        } else {
          box[x].name_status = false;
        }
      }
    },

    //创建对战房间
    create() {
      let battle_data = [];
      let box = this.box;
      for (let x in box) {
        if (box[x].num > 0) {
          battle_data.push({
            id: box[x].id,
            num: box[x].num
          });
        }
      }
      let value1 = this.value1;
      let value2 = this.value2;
      let value3 = this.value3;
      let value4 = this.value4;
      let value5 = this.value5;
      let battle_type = this.battle_type ? "1" : "0";
      let loading = this.$loading({
        spinner: "el-icon-loading",
        background: "rgb(0 0 0 / 0%)"
      });
      ttPost(
        "/api.php/battle/create",
        {
          battle_data: battle_data,
          value1: value1,
          value2: value2,
          value3: value3,
          value4: value4,
          battle_type: battle_type,
          value5: value5
        },
        res => {
          loading.close();
          if (res.code == 200) {
            this.$emit("user_bean", { balance: res.data.balance });
            this.$message({
              message: res.msg,
              type: "success"
            });
            setTimeout(() => {
              this.$router.push({ path: "/battle/" + res.data.battle_id });
            }, 500);
          } else {
            this.$message({
              message: res.msg,
              type: "warning"
            });
          }
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.vue-view {
  margin-top: 50px;
  margin-bottom: 90px;
  overflow: hidden;
  @include phone {
    margin-top: 0;
    margin-bottom: 0;
  }
}

.battle {
}

.battle-header {
  display: flex;
  align-items: center;
}

.battle-title {
  align-items: center;
  display: flex;
  flex-grow: 1;
  margin: 0;
  font-size: 27px;
  color: #fff;
  font-weight: 500;
  @include phone {
    font-size: 20px;
  }
}

.icon-fist {
  position: relative;
  margin-right: 17px;
  color: #7349ca;
  width: 28px;
  height: 28px;
}

.battle-back {
  font-size: 16px;
  color: #acaec5;
  padding: 15px 25px;
  line-height: 1;
  border: 1px solid #2e304e;
  border-radius: 2px;
  margin-left: 33px;
  white-space: nowrap;
  transition: color 0.15s, border-color 0.15s;
  @include phone {
    font-size: 14px;
    padding: 10px 20px;
  }
}

.battle-top {
  position: relative;
  margin-left: -15px;
  padding: 32px 0 0 15px;
  overflow: hidden;
  @include phone {
    padding: 10px 0 0 5px;
  }
}

.battle-top-inner {
  box-shadow: 0 18px 31px rgb(15 16 31 / 53%);
  display: flex;
  height: 98px;
  background-color: #101121;
}

.battle-top-fields {
  display: flex;
  align-items: center;
  padding: 0 0 0 20px;

  label {
    color: #aaacc1;
    font-size: 16px;
    margin-right: 15px;
  }
  @include phone {
    margin-bottom: 10px;
    display: flex;
  }
}

.battle-button-group {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: end;

  li {
    min-width: 24px;
    text-align: center;
    color: #7580e7;
    font-size: 14px;
    height: 34px;
    line-height: 34px;
    padding: 0 10px;
    cursor: pointer;
    border: 1px solid rgba(72, 85, 201, 0.6);
    box-sizing: content-box;
    transition: all 0.15s;

    & + li {
      border-left: none;
    }

    &.active {
      font-size: 15px;
      color: rgba(255, 255, 255, 0.9);
      background: #4854c9;
      padding: 0 14px;
    }

    &:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    &:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
}

.battle-round-number {
  border-right: 1px solid #15172c;
  display: flex;
  align-items: center;
  padding: 0 25px;
  font-weight: 300;
  font-size: 24px;
  color: #aaacc1;
  text-transform: uppercase;
  font-variant-numeric: tabular-nums;
  span {
    color: #5e5fb9;
    margin-right: 12px;
    line-height: 1;
  }

  @include phone {
    padding: 0 20px;
  }
}

.battle-toggle {
  display: flex;
  align-items: center;
  user-select: none;
  border-right: 1px solid #15172c;
  padding-left: 20px;
  padding-right: 20px;

  ::v-deep {
    .el-switch__label.is-active {
      color: #aaacc1 !important;
    }

    .el-switch__label--right {
      color: #5c5e79;
      margin-left: 15px;

      span {
        font-size: 16px !important;
      }
    }

    .el-switch__label--left {
      color: #5c5e79;
      margin-right: 15px;

      span {
        font-size: 16px !important;
      }
    }

    .el-switch__label--left {
      color: #5c5e79;
      margin-right: 15px;
    }

    .el-switch__core {
      background-color: #1e213b !important;
      border: 0;
      width: 46px !important;
      height: 26px;
      border-radius: 17px;
    }

    .el-switch__core::after {
      background-color: #bbb;
      left: 5px;
      top: 5px;
    }

    .el-switch.is-checked .el-switch__core::after {
      left: 90%;
      background-color: #5ac8ce;
    }
  }
}

.battle-players {
  border-right: 1px solid #15172c;
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
}

.battle-players-label {
  color: #aaacc1;
  font-size: 16px;
  text-transform: uppercase;
  margin-right: 15px;
}

.battle-players-btn {
  padding: 0;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  line-height: 1;
  border-radius: 8px;
  color: #9696e0;
  border: 1px solid rgba(94, 95, 185, 0.6);
  transition: border-color 0.15s, color 0.15s;

  &.active {
    color: rgba(255, 255, 255, 0.9);
    background: rgba(94, 95, 185, 0.6);
  }
}

.battle-top-col {
  display: flex;
  flex: 1;
}

.battle-referrals {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #aaacc1;
  text-transform: uppercase;
  padding: 20px;
  border-right: 1px solid #15172c;
}

.battle-referrals {
  ::v-deep {
    .el-checkbox {
      display: flex;
    }

    .el-checkbox__label {
      color: #84869b;
      font-size: 15px;
      position: relative;
      top: 3px;
      margin-right: 15px;
    }

    .el-checkbox__input {
      order: 1;
    }

    .el-checkbox__inner {
      flex-shrink: 0;
      position: relative;
      width: 22px;
      height: 22px;
      background-color: #191c34;
      border: 0;
    }

    .el-checkbox__inner::after {
    }

    .el-checkbox__inner::after {
      border: 2px solid #63bd87;
      -webkit-box-sizing: content-box;
      box-sizing: content-box;
      content: "";
      border-left: 0;
      border-top: 0;
      height: 20px;
      left: 8px;
      position: absolute;
      top: -6px;
      -webkit-transform: rotate(45deg) scaleY(0);
      transform: rotate(45deg) scaleY(0);
      width: 10px;
      -webkit-transition: -webkit-transform 0.15s ease-in 0.05s;
      transition: -webkit-transform 0.15s ease-in 0.05s;
      transition: transform 0.15s ease-in 0.05s,
        -webkit-transform 0.15s ease-in 0.05s;
      transition: transform 0.15s ease-in 0.05s,
        -webkit-transform 0.15s ease-in 0.05s;
      -webkit-transform-origin: center;
      transform-origin: center;
    }

    .el-checkbox__input.is-checked .el-checkbox__inner::after {
      -webkit-transform: rotate(45deg) scaleY(1);
      transform: rotate(45deg) scaleY(1);
    }
  }
}

.battle-min-deposit-input {
  width: 100%;
  height: 60px;
  color: #fff;
  font-size: 18px;
  background-color: #191c34;
  border: 0;
  outline: 0;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: 15px;
}

.battle-discount-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-right: 1px solid #15172c;
}

.battle-discount-top {
  width: 100%;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  color: #aaacc1;
  font-size: 12px;
}

.battle-slider {
  ::v-deep .el-slider__runway {
    height: 2px;
    background-color: #db513a;
    border-radius: 0;
    width: 200px;
    margin-left: auto;
    margin-right: auto;

    .el-slider__button-wrapper {
      top: -17px;
    }

    .el-slider__button {
      border-radius: 2px;
      border: 0;
      width: 5px;
      height: 17px;
    }

    .el-slider__bar {
      height: 2px;
      background: #03a688;
      border-radius: 0;
    }

    &::after {
      content: "";
      position: absolute;
      top: 2px;
      left: 0;
      right: 0;
      height: 22px;
      background: url("~@/assets/img/chance-bar-points.svg") left center/contain
        no-repeat;
    }
  }
}

.battle-cost {
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 2px;
  font-size: 16px;
  font-weight: 500;
  width: 204px;
  font-variant-numeric: tabular-nums;
  border-left: 1px solid #111322;
  background-color: #0d0e1a;
  border-left: 0;
  color: #ffffff;
}

.battle-cost-value {
  color: #63bd87;
  text-align: center;

  img {
    vertical-align: bottom;
  }
}

.battle-items {
  display: flex;
  flex-wrap: wrap;
  border-radius: 5px;
  margin: 20px -8px 50px;
  @include phone {
    margin: 20px -8px 20px;
  }
  &.empty {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(29, 33, 60, 0.32);
    margin-left: 0;
    margin-right: 0;
    height: 270px;
    cursor: pointer;

    &:hover {
      .battle-icon-add {
        color: #afb2cd;
        border: 2px solid rgba(86, 91, 143, 0.2);
      }

      .battle-add-text {
        color: #d9dae9;
      }
    }
  }

  .data-loading {
    margin-top: 0;
  }
}

.battle-icon-add {
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 50%;
  width: 56px;
  height: 56px;
  color: #737696;
  opacity: 1;
  border-radius: 12px;
  border: 2px solid rgba(54, 57, 89, 0.2);
  background-color: transparent;
  transform: none;
  transition: border-color 0.15s;
  margin-bottom: 28px;
}

.icon-plus-thin {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.battle-add-text {
  color: #aaacc1;
  font-size: 17px;
  text-transform: uppercase;
  transition: color 0.15s;
}

.battle-item {
  flex: 0 0 50%;
  max-width: 50%;
  padding-left: 6px;
  padding-right: 6px;
  margin-bottom: 12px;
}

.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 0;
  cursor: pointer;

  &:hover {
    .product-case-case {
      -webkit-transform: scale(1.08);
      transform: scale(1.08);
      transition: transform 0.3s ease, -webkit-transform 0.3s ease;
    }
  }

  &:not(.product-card-empty) {
    height: 100%;
    border-radius: 5px;
    padding: 18px 10px 25px;
    background-color: #1f223f;
    background-image: linear-gradient(
      -135deg,
      rgba(67, 42, 192, 0.4),
      rgba(67, 42, 192, 0) 50%
    );
    overflow: hidden;
  }
}

.product-card-empty {
  height: 284px;
  min-height: 100%;
  padding-top: 55px;
  padding-bottom: 55px;
  justify-content: center;
  background: rgba(29, 33, 60, 0.32);
  border-radius: 5px;

  &:hover {
    .battle-icon-add {
      color: #afb2cd;
      border: 2px solid rgba(86, 91, 143, 0.2);
    }

    .battle-add-text {
      color: #d9dae9;
    }
  }
}

.product-card-counter {
  justify-content: space-between;
  display: flex;
  width: 100%;
  max-width: 76px;
  margin-bottom: 22px;
}

.counter-control {
  border: 0;
  padding: 0;
  background-color: transparent;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 7px;
  transition: border-color 0.15s;
  color: rgba(255, 255, 255, 0.36);

  &:hover {
    border: 1px solid rgba(255, 102, 102, 0.15);
    color: #ff7092;
  }
}

.icon-minus {
  width: 8px;
  height: 2px;
}

.icon-plus {
  width: 10px;
  height: 10px;
}

.counter-value {
  margin-top: 2px;
  color: #dfdbef;
  font-weight: 500;
}

.product-case {
  transform-origin: center bottom;
  transform: scale(1);
  top: 3px;
  margin-bottom: 10px;
}

.product-case-case {
  display: block;
  margin: 0 auto;
  height: 140px;
}

.product-card-name {
  text-align: center;
  color: #acaec5;
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  font-size: 16px;
  margin-bottom: 4px;
}

.product-card-price {
  position: relative;
  text-align: center;
  font-weight: 700;
  font-size: 12px;
  color: #63bd87;
  font-variant-numeric: tabular-nums;
}

.product-card-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 1;
  top: 10px;
  border-radius: 7px;
  transition: border-color 0.15s;
  left: auto;
  right: 10px;
  width: 10px;
  height: 10px;
  border: 0;
  color: #ffc8ce;
}

.icon-cross {
  width: 8px;
  height: 8px;
}

.product-card-bg {
  position: absolute;
  z-index: -1;
  top: 0;
  width: 100%;
  height: 160px;
  transition: opacity 0.15s;
  opacity: 1;
  left: 65%;
  transform: translateX(-50%);
}

.battle-create {
  text-align: center;
  @include phone {
    margin-bottom: 10px;
  }
}

.battle-create-btn {
  display: inline-block;
  padding: 20px 25px 22px;
  border-radius: 4px;
  background-color: #4854c9;
  font-size: 15px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-variant-numeric: tabular-nums;
  border: 0;

  &:hover {
    color: #fff;
    background-color: #6975e6;
  }
}

@media (min-width: 480px) {
}

@media (min-width: 768px) {
  .battle-round-number {
    padding-left: 20px;
    padding-right: 20px;
  }

  .battle-toggle {
    padding-left: 20px;
    padding-right: 20px;
  }

  .battle-playerstoggle {
    padding-left: 20px;
    padding-right: 20px;
  }

  .battle-item {
    flex: 0 0 33.33333%;
    max-width: 33.33333%;
    padding-left: 8px;
    padding-right: 8px;
    margin-bottom: 16px;
  }
}

@media (min-width: 992px) {
  .battle-item {
    flex: 0 0 25%;
    max-width: 25%;
  }
}

@media (min-width: 1200px) {
  .battle-cost {
    width: 260px;
  }

  .battle-item {
    flex: 0 0 20%;
    max-width: 20%;
  }
}

@media (min-width: 1440px) {
  .battle-cost {
    width: 220px;
  }

  .battle-item {
    flex: 0 0 16.66667%;
    max-width: 16.66667%;
  }
}

@media only screen and (max-width: 1439px) {
  .battle-top-inner {
    flex-wrap: wrap;
    height: auto;
  }

  .battle-round-number {
    height: 98px;
  }

  .battle-top-col {
    width: 100%;
  }
}

@media only screen and (max-width: 1199px) {
}

@media only screen and (max-width: 991px) {
}

@media only screen and (max-width: 767px) {
  .battle-round-number {
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 10px;
    height: auto;
    width: 100%;
    font-size: 16px;
    border-right: 0;
    border-bottom: 1px solid #15172c;
  }

  .battle-toggle {
    order: 1;
    padding-bottom: 15px;
    border-right: 0;
    width: 100%;
    padding-top: 20px;
  }

  .battle-players {
    padding-bottom: 20px;
    width: 100%;
    padding-top: 20px;
  }

  .battle-top-col {
    flex-direction: column;
    order: 2;
  }

  .battle-slider {
    width: 100%;

    ::v-deep {
      .el-slider__runway {
        width: 100%;
      }

      .el-slider__runway::after {
        background-size: 100%;
      }
    }
  }

  .battle-cost {
    margin-left: 0;
    background-color: #101121;
    width: auto;
    flex-grow: 1;
    border-bottom: 1px solid #15172c;
    // height: 98px;
    @media screen and (max-width: 767px) {
      position: absolute;
      top: 15px;
      right: 0;
    }
  }

  .product-card-empty {
    height: 222px;
  }

  .product-case-case {
    height: 100px;
    margin-left: -5px;
    margin-right: -5px;
  }
}

@media only screen and (max-width: 479px) {
}
</style>

<style scoped>
.battle-cost-value {
  display: flex;
  justify-content: center;
  align-items: center;
}

.battle-cost-value /deep/ .symbol {
  width: 18px;
  padding-top: 1px;
  margin-right: 10px;
}

.price_box {
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
}

.price_box /deep/ .symbol {
  margin-left: 10px;
  width: 18px;
  padding-top: 2px;
  margin-right: 5px;
}

.product-card-price {
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
}

.product-card-price /deep/ .symbol {
  margin-left: 10px;
  width: 18px;
  padding-top: 2px;
  margin-right: 5px;
}
</style>
