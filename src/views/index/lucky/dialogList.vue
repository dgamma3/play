<template>
	<el-dialog
	  title="选择物品"
    :visible.sync="dialogVisible"
	  class="lucky-dialogs"
	  :before-close="closeForm"
	  draggable
	>
    <el-main style="height: calc(100vh - 220px);">
    <div class="lucky">
      <div class="lucky-inner">
        <div class="lucky-header">
          <h2 class="lucky-title">
            <i class="el-icon-s-marketing"></i>
            <span>Top升级</span>
          </h2>
        </div>
        <div class="lucky-top">
          <template v-if="screen_width > 1199">
            <div class="lucky-top-items">
              <div :class="'lucky-top-item ' + [ornaments_class_index == index ? 'active' : '']"
                   v-for="(item, index) in ornaments_class" @click="ornaments_class_switch(index)"
                    :key="index"
                    >
                <img class="lucky-top-item-img" :src="img_url + item.img">
              </div>
            </div>
          </template>
          <template v-else>
            <el-carousel :autoplay="false" indicator-position="none" :loop="false" arrow="always" type="card">
              <el-carousel-item v-for="(item, index) in ornaments_class"
                    :key="index"
                    >
                <div :class="'lucky-top-item ' + [ornaments_class_index == index ? 'active' : '']"
                     @click="ornaments_class_switch(index)">
                  <img class="lucky-top-item-img" :src="img_url + item.img">
                </div>
              </el-carousel-item>
            </el-carousel>
          </template>
          <div class="lucky-top-category" v-if="ornaments_class[ornaments_class_index]">
            <div class="lucky-top-category-label">武器类型</div>
            <button :class="'lucky-top-category-btn ' + [category_index == 0 ? 'active' : '']"
                    @click="category_switch(0)">全部
            </button>
            <button :class="'lucky-top-category-btn ' + [category_index == index + 1 ? 'active' : '']"
                    v-for="(item, index) in ornaments_class[ornaments_class_index].children"
                    :key="index"

                    @click="category_switch(index + 1)">{{item.name}}
            </button>
          </div>
        </div>



        <div class="lucky-items-header">
          <div class="flex">
            <div class="lucky-items-label">

              <span>选择物品</span>
            </div>
            <div class="lucky-random" @click="random">   <span>随机</span>   </div>

            <div  :class="'lucky-random price_select_box ' +  (index == price_select_index?' check_price_select_box':'')"    @click="price_select_click(index)" v-for="(item,index) in price_select_list " :key="index"><span>{{item}}</span></div>


            <select class="price_select_select" v-model="price_select_index" @change="price_select($event)">

              <option v-for="(item,index) in price_select_list" :key="index" :value="index">
                  {{item}}
              </option>
          </select>

          </div>
          <div :class="'lucky-search ' + [input_page ? 'active' : '']">
            <input class="lucky-search-input" type="text" v-model="name" @input="name_search" placeholder="按名称搜索">
            <button class="lucky-search-btn" @click="input_switch">

            </button>
          </div>
        </div>
        <template v-if="loadingIndex">
          <div class="text-center">
            <i class="el-icon-loading data-loading"></i>
          </div>
        </template>
        <template v-else>
          <div class="lucky-items">
            <div
              class="live-item-wrap"
              v-for="(item, index) in ornaments" v-show="item.show"
              :key="index"
            >
              <div :class="'live-item live-item-bg live-item-bg-'+color(item.color, 4)">

                  <div @click="doSelect(item.id)">
                  <div :class="color(item.color, 3)">
                    <div class="live-item-quality-text" v-if="item.appid == 730">
                      {{ abrasion(item.abrasion)}}
                    </div>
                    <div class="live-item-quality-text" v-else>{{ quality2(item.quality2) }}</div>

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
                    <div class="live-item-price " style="width:100%;display: flex; justify-content: center;">
                      <span class="price_box "><child-component v-html="symbol"></child-component> {{item.max_open_price}}</span>
                      <template v-if="item.min_open_price != item.max_open_price">
                        <span class="live-item-price-boundary">-</span>
                        <span class="price_box "><child-component v-html="symbol"></child-component> {{item.min_open_price}}</span>
                      </template>
                    </div>

                    <div class="o-name" style="display: block; width: 100%;float:left;    text-align: center;">{{item.name}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    </el-main>
	</el-dialog>
</template>

<script>
  import {ttGet, ttPost, ttWebSocket, abrasion, quality, quality2, color, rand} from "@/utils/util.js";

  export default {
    props: ["dialogVisible"],
    data() {
      return {
        // abrasion_select_list:[],
        price_select_list:["全部","0-50","50-100","100-500","500-1000","1000+"],
        price_select_index:0,
        img_url: this.$img_url,
        symbol: this.$getStore({name: 'symbol'}),
        ornaments_class: [],
        ornaments_class_index: 0,
        category_index: 0,
        loadingIndex: true,
        name: '',
        ornaments: [],
        input_page: false,
        screen_width: 0,
      }
    },
    mounted() {
      //获取屏幕尺寸
      this.screen_width = document.body.clientWidth;
      window.onresize = () => {
        //屏幕尺寸变化
        return (() => {
          this.screen_width = document.body.clientWidth;
        })();
      }
      this.get_ornaments_class();
    },
    methods: {
      abrasion, quality, quality2, color,
      closeForm(){
        this.$emit("closeForm");
      },
      doSelect(id){
        this.$emit("onSelect",id);
        this.$emit("closeForm");
      },
      price_select(event){
        console.log(event)
        //this.price_select_index = index;
        console.log(this.price_select_index)
        let loading = this.$loading({
          spinner: 'el-icon-loading',
          background: 'rgb(0 0 0 / 0%)'
        });
        this.get_ornaments(loading)
      },
      price_select_click(index){
        this.price_select_index = index;
        let loading = this.$loading({
          spinner: 'el-icon-loading',
          background: 'rgb(0 0 0 / 0%)'
        });
        this.get_ornaments(loading)
      },

      //获取饰品分类
      get_ornaments_class() {
        ttGet("/api.php/lucky/get_ornaments_class", '', (res) => {
          if (res.code == 200) {
            this.ornaments_class = res.data.data;
            this.get_ornaments();
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        });
      },

      //分类切换
      ornaments_class_switch(index) {
        this.ornaments_class_index = index;
        this.category_index = 0;
        let loading = this.$loading({
          spinner: 'el-icon-loading',
          background: 'rgb(0 0 0 / 0%)'
        });
        this.get_ornaments(loading);
      },

      //分类下级切换
      category_switch(index) {
        this.category_index = index;
        let ornaments = this.ornaments;
        if (index > 0) {
          let cid = this.ornaments_class[this.ornaments_class_index].children[index - 1].id;
          for (let x in ornaments) {
            if (ornaments[x].cid == cid) {
              ornaments[x].show = true;
            } else {
              ornaments[x].show = false;
            }
          }
        } else {
          for (let x in ornaments) {
            ornaments[x].show = true;
          }
        }
      },

      //获取饰品
      get_ornaments(loading) {
        let name = this.name;
        let class_id = this.ornaments_class[this.ornaments_class_index].id;
        ttGet("/api.php/lucky/get_ornaments", {
          name: name,
          class_id: class_id,
          price_type: this.price_select_index
        }, (res) => {
          this.loadingIndex = false;
          if (loading) loading.close();
          if (res.code == 200) {
            let ornaments = res.data.data;
            for (let x in ornaments) {
              ornaments[x].show = true;
            }
            this.ornaments = ornaments;
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        });
      },

      //名称搜索
      name_search() {
        let name = this.name;
        let ornaments = this.ornaments;
        if (name) {
          for (let x in ornaments) {
            if (ornaments[x].name.search(name) != -1) {
              ornaments[x].show = true;
            } else {
              ornaments[x].show = false;
            }
          }
        } else {
          for (let x in ornaments) {
            ornaments[x].show = true;
          }
        }
      },

      //随机选择饰品
      random() {
        //获取当前显示的数据
        let id_arr = [];
        let ornaments = this.ornaments;
        for (let x in ornaments) {
          if (ornaments[x].show) {
            id_arr.push(ornaments[x].id);
          }
        }
        if (id_arr.length > 0) {
          let index = rand(0, id_arr.length);
          let id = id_arr[index];
          this.$router.push({path: '/lucky/' + id});
        }
      },

      //input显示隐藏切换
      input_switch() {
        this.input_page = !this.input_page;
      },
    }
  }
</script>

<style lang="scss" scoped>
@import 'lucky_dialog.scss';
</style>


<style scoped>

.lucky-top{ display: none;}
 .live-item-price span   { float: right; display:flex; justify-content:center; align-items:center;  margin-top: 3px;  }
 .live-item-price  /deep/  .symbol{ margin-left: 10px; width: 18px; padding-top: 2px; margin-right: 5px;  }
 .price_select_box{margin-left: 10px;}
 .check_price_select_box{background: #3A51BC; color: #fff;}
 .price_select_select{float: right; width: 150px; text-align: center; margin-left: 20px ;display: none;}
 @media only screen and (max-width: 479px) {
  .price_select_box{ display: none;}
  .price_select_select{ display: block;}
  }
 </style>
