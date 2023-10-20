<template>
  <div>
    <div class="store">
      <div class="store-inner">
        <div class="store-header">
          <h2 class="store-title">
            <i class="el-icon-s-shop"></i>
            <span>商城</span>
            <span class="store-bean"><span class="price"><img src="../../../assets/img/zs.png" style="width:17px;height:17px;"> {{store_bean}}</span></span>
          </h2>
        </div>
        <div class="store-content">
          <div class="store-main">
            <div class="store-main-header">
              <!-- <div class="store-game">
                <button v-if="index==0" :class="'store-game-btn ' + [game_index == index ? 'active' : '']"
                        v-for="(item, index) in game" @click="game_switch(index)">
                  <img v-if="index==0" :src="item.img">
                  {{item.name}}
                </button>
              </div> -->
              <div class="store-sum">
                <button :class="'store-sum-btn ' + [sum_index == index ? 'active' : '']" v-for="(item, index) in sum"
                        @click="sum_switch(index)">
                  {{item.name}}
                </button>
              </div>
              <div class="store-sum">
                <button :class="'store-sum-btn ' + [sort_index == index ? 'active' : '']" v-for="(item, index) in sort"
                        @click="sort_switch(index)">
                  {{item.name}}
                </button>
              </div>
              <div class="store-search">
                <input type="text" v-model="name" class="store-search-input" placeholder="请输入饰品名称" @input="name_input">
                <button class="store-search-btn">
                  <svg class="icon-search" viewBox="0 0 30 30">
                    <g>
                      <g>
                        <path
                          d="M30 27.503l-2.48 2.496-7.42-7.466a12.435 12.435 0 0 1-12.452 1.68A12.586 12.586 0 0 1 0 12.61a12.56 12.56 0 0 1 3.664-8.913A12.409 12.409 0 0 1 12.521 0h.023c1.676 0 3.31.333 4.854.992 6.251 2.713 9.218 10.067 6.616 16.393-.376.914-.87 1.792-1.47 2.615zM12.521 3.526c-4.971 0-9.015 4.071-9.015 9.075s4.044 9.076 9.015 9.076c4.97 0 9.014-4.072 9.014-9.076 0-5.004-4.044-9.075-9.014-9.075z"/>
                      </g>
                    </g>
                  </svg>
                </button>
              </div>
            </div>
            <template v-if="loadingIndex">
              <div class="text-center">
                <i class="el-icon-loading data-loading"></i>
              </div>
            </template>
            <template v-else>
              <el-pagination
                @current-change="currentChange"
                @size-change="sizeChange"
                :current-page="pageInfo.pageNum"
                :page-size="50"
                layout="total, prev, pager, next"
                :total="pageInfo.total">
              </el-pagination>
              <div class="store-items">
                <div 
                :class="'live-item live-item-bg live-item-bg-'+color(item.color, 4)"
                 v-for="(item, index) in ornaments" @click="pay(index)" :key="index">
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
                    <div class="live-item-price"><img src="../../../assets/img/zs.png" style="width:17px;height:17px;"> {{item.pay_price}}</div>
                    <div class="o-name">{{item.name}}</div>
                    <div class="o-abrasion" v-if="item.appid == 730">{{ abrasion(item.abrasion) }}</div>
                    <div class="o-abrasion" v-else>{{ quality2(item.quality2) }}</div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {ttGet, ttPost, ttWebSocket, abrasion, quality, quality2, color, rand} from "@/utils/util.js";

  export default {
    data() {
      return {
        loadingIndex: true,
        img_url: this.$img_url,
        symbol: this.$getStore({name: 'symbol'}),
        game: [
          {type: 'csgo', name: 'CSGO', appid: 730, img: require('@/assets/img/csgo.svg')},
          {type: 'data2', name: 'DOTA2', appid: 570, img: require('@/assets/img/dota-2.svg')},
        ],
        game_index: 0,
        sum: [
          {name: '全部', min: 0, max: 0},
          {name: '0 - 5', min: 0, max: 5},
          {name: '5 - 20', min: 5, max: 20},
          {name: '20 - 100', min: 20, max: 100},
          {name: '100+', min: 100, max: 0},
        ],
        sum_index: 0,
        sort: [
          {name: '价格降序', type: 1},
          {name: '价格升序', type: 2},
        ],
        sort_index: 0,
        name: '',
        loading_status: false,
        pageInfo: {
          pageNum: 1,
          pageSize: 50,
          total: 0,
        },
        ornaments: [],
        store_bean: '0.00',
        timer: null
      }
    },
    mounted() {
      this.get_store_bean();
      this.get_ornaments();
    },
    methods: {
      abrasion, quality, quality2, color,

      //获取商城余额
      get_store_bean() {
        ttGet("/api.php/user/get_store_bean", '', (res) => {
          this.loadingIndex = false;
          if (res.code == 200) {
            this.store_bean = res.data.store_bean;
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        });
      },

      //获取商城商品
      get_ornaments() {
        let pageNum = this.pageInfo.pageNum;
        let pageSize = this.pageInfo.pageSize;
        let appid = this.game[this.game_index].appid;
        let min = this.sum[this.sum_index].min;
        let max = this.sum[this.sum_index].max;
        let sort_type = this.sort[this.sort_index].type;
        let name = this.name;
        this.loadingIndex = true;
        ttGet("/api.php/store/get_ornaments", {pageNum: pageNum, pageSize: pageSize, appid: appid, min: min, max: max, name: name, sort_type: sort_type}, (res) => {
          this.loadingIndex = false;
          if (res.code == 200) {
            this.ornaments = res.data.data.data;
            this.pageInfo.total = res.data.data.count;
          } else {
            this.ornaments = [];
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        });
      },

      //切换游戏
      game_switch(index) {
        this.game_index = index;
        this.pageInfo.pageNum = 1;
        this.ornaments = [];
        this.get_ornaments();
      },

      //切换价值
      sum_switch(index) {
        this.sum_index = index;
        this.pageInfo.pageNum = 1;
        this.ornaments = [];
        this.get_ornaments();
      },

      //切换排序
      sort_switch(index) {
        this.sort_index = index;
        this.pageInfo.pageNum = 1;
        this.ornaments = [];
        this.get_ornaments();
      },

      //饰品名称搜索
      name_input() {
        let i = 0;
        let j = 10;
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          ++i;
          if (i == j) {
            this.pageInfo.pageNum = 1;
            this.ornaments = [];
            this.get_ornaments();
            clearInterval(this.timer);
          }
        }, 100);
      },

      //购买饰品
      pay(index) {
        let item_ornaments = this.ornaments[index];
        this.$confirm("确定购买" + item_ornaments.name + "(￥ " + item_ornaments.pay_price + ")?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info",
          customClass: "fore-end-confirm"
        }).then(() => {
          let loading = this.$loading({
            spinner: 'el-icon-loading',
            background: 'rgb(0 0 0 / 0%)'
          });
          ttPost("/api.php/store/ornaments_pay", {
            id: item_ornaments.id,
          }, (res) => {
            loading.close();
            if (res.code == 200) {
              this.store_bean = res.data.surplus;
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
        }).catch(() => {

        });
      },

      //分页切换
      currentChange(page) {
        this.pageInfo.pageNum = page;
        this.get_ornaments();
      },

      //条数切换
      sizeChange(limit) {
        this.pageInfo.pageNum = 1;
        this.pageInfo.pageSize = limit;
        this.get_ornaments();
      },
    }
  }
</script>

 
<style lang="scss" scoped>
@import 'store_index.scss';
</style>