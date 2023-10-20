<template>
  <div ref="is_show_width">
    <div class="lucky" >

      <div class="lucky-inner">
        <div class="lucky-header">
          <h2 class="lucky-title">
            <i class="iconfont ttskins-zhuanpanjieguo"></i>
            <span>选择百分比</span>
          </h2>
          <div class="lucky-head-buttons">
            <button class="lucky-head-sound" @click="mute">
              <template v-if="mute_status">
                <svg class="icon-sound-mute" viewBox="0 0 24 36">
                  <path
                    fill-rule="evenodd"
                    d="M3.565 27C1.596 27 0 25.388 0 23.4V12.599c0-1.988 1.596-3.6 3.565-3.6h6.485L19.754.834a3.548 3.548 0 012.283-.835h1.137c1.969 0 3.565 1.612 3.565 3.6V32.4c0 1.988-1.596 3.6-3.565 3.6h-1.137a3.548 3.548 0 01-2.283-.835L10.05 27H3.565z"
                  />
                </svg>
              </template>
              <template v-else>
                <svg class="icon-mute" viewBox="0 0 44 36">
                  <path
                    fill-rule="evenodd"
                    d="M3.565 27C1.596 27 0 25.388 0 23.4V12.599c0-1.988 1.596-3.6 3.565-3.6h6.485L19.754.834a3.548 3.548 0 012.283-.835h1.137c1.969 0 3.565 1.612 3.565 3.6V32.4c0 1.988-1.596 3.6-3.565 3.6h-1.137a3.548 3.548 0 01-2.283-.835L10.05 27H3.565zM34 9a2 2 0 012 2v15a2 2 0 01-4 0V11a2 2 0 012-2zM42 5a2 2 0 012 2v23a2 2 0 01-4 0V7a2 2 0 012-2z"
                  />
                </svg>
              </template>
            </button>
           <!--  <router-link class="lucky-back" to="/lucky"> 返回 </router-link> -->
          </div>
        </div>
        <div class="lucky-header2">
          <el-tooltip
            popper-class="lucky-tooltip"
            effect="dark"
            content="请注意：成功率不是相乘计算的。例如，开箱一次30%成功率，不表示开箱三次有90%的成功率。"
            placement="top"
          >
            <div class="lucky-title2">
              <span>所要饰品的胜出机会</span>
              <svg class="icon-question" viewBox="0 0 30 30">
                <g>
                  <g>
                    <path
                      d="M30 15c0 8.283-6.716 15-15 15-8.284 0-15-6.717-15-15C0 6.714 6.716 0 15 0c8.284 0 15 6.715 15 15zm-12.763 6.918c0-1.165-.98-2.144-2.144-2.144-1.165 0-2.145.98-2.145 2.144 0 1.164.98 2.144 2.145 2.144 1.164 0 2.144-.98 2.144-2.144zm3.414-11.884c0-2.462-2.091-4.182-5.506-4.182-2.276 0-4.393.926-5.796 2.567l2.144 2.409c.82-.98 1.932-1.641 3.255-1.641 1.456 0 2.065.687 2.065 1.508 0 1.826-3.865 2.197-3.865 5.347 0 .926.318 1.72.874 2.33l2.885-.847c-.265-.24-.476-.689-.476-1.112 0-2.224 4.42-2.515 4.42-6.38z"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </el-tooltip>
        </div>
        <div class="lucky-main">
          <div class="lucky-new-box" :style="'background:'+bgurl+';'">
        <div class="header">Top升级</div>
        <div v-if="is_show" class="upgrade-success">
          <div class="area-title-shengji">升级目标</div>
          <div class="upgrade-add">
            <div class="add-acc">
              <div  @click="openDialog()" v-if="ornaments.img">
                <img width="80" height="80" :src="img_url + ornaments.img" alt="" class="area-add" style="vertical-align: bottom;" />
              </div>
              <div  @click="openDialog()" v-if="!ornaments.img">
                <img width="120" height="120" src="/static/img/select_btn.png" alt="" class="area-add" style="vertical-align: bottom;" />
              </div>
              <p class="area-tips" style="color: rgba(255,255,255,.6) margin: 4px 0 20px 0;">请选择升级目标</p>
            </div>
          </div>
        </div>
        <div
          class="new-box-center"
          style="transform: scale(1); width: 280px; height: 280px"
        >
          <img
            src="../../../assets/img/bg-circle.png"
            alt=""
            class="bg-circle"
          />

          <div  class="circle">
            <radial-indicator
              :percentNum="probability"
              speed="3"
              size="180"
              color="#932d9d"
              :dushu="dushu"
              :zhanting="zhanting"
              @animationFinished="animationFinished"
              backgroundColor="#aca3e5"
              content=""
              icon="mail"
            />

          </div>
        </div>
        <div v-if="is_show" class="upgrade-fail">
          <div style="text-align:center;">
            <img class="lucky-bottom-item-img" src="@/assets/img/fail.png" style="width:100px;height:100px;" />
          </div>
        </div>



        <div class="lucky-slider">
            <div class="slider-box">
              <el-input-number v-model="probability" :min="1" :max="75" @change="onSliderChange" class="luck-probability" :disabled="!btn_status">

              </el-input-number>%
            </div>
          </div>

          <div style="clear:both"></div>
          <div class="product_box">
            <div class="product_box_left">
              <div class="area-title-shengji">升级目标</div>
              <div class="upgrade-add">
                <div class="add-acc">
                  <div v-if="ornaments.img" @click="openDialog()"><img     width="80"    height="80"   :src="img_url + ornaments.img"   alt=""   class="area-add"   /> </div>
                  <div v-else @click="openDialog()"><img     width="120"    height="120"   src="/static/img/select_btn.png"   alt=""   class="area-add"   /> </div>
                  <p  class="area-tips">请选择升级目标</p>
                </div>
              </div>
            </div>
            <div class="product_box_center"> VS</div>
            <div class="product_box_right">
              <img class="lucky-bottom-item-img" src="@/assets/img/fail.png" style="width:100px;height:100px;" />
            </div>
        </div>


          <div class="lucky-open-wrap" style="margin-top:40px;" v-show="!open_status">
          <div class="lucky-open-btn" @click="open">
            <span>试试运气</span>
            &nbsp;
            <span class="price_box"><child-component v-html="symbol"></child-component>{{ price }}</span>
          </div>
        </div>
      </div>


    </div>

      </div>
      <div class="lucky-open-bottom" v-show="open_status">
        <div class="lucky-inner">
          <div class="lucky-roulette">
            <div class="lucky-roulette-loader">
              <span>打开</span>
              <img src="@/assets/img/loader.svg" />
            </div>
            <div ref="loaders_wrap_weight" class="lucky-roulette-items-wrap">
              <div
                class="lucky-roulette-items"  :style="  roll ? 'transition: all 8s cubic-bezier(0.15, 0.89, 0.19, 0.99) 0s; transform: translateX(' + translate_x + 'px);'  : ''  "  >
                <div  class="lucky-roulette-item"  :key="index"   v-for="(item, index) in ornaments_img" >
                  <img class="lucky-roulette-img" :src="item" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




    </div>



    <el-dialog
      :class="'result-dialog result-dialog' + item_ornaments.color"  title="您获得"   append-to-body   :visible.sync="result_page" :close-on-click-modal="false"  :lock-scroll="false"   center
    >
              <div class="mgs_box">
                {{msg}}
              </div>

              <div class="result-info">
                <img class="result-item" :src="img_url + item_ornaments.img" />
                <svg class="result-bg" viewBox="0 0 806 990">
                  <path   fill-opacity=".07"  d="M766.744 989.902L197.003 307.525 805.588.645z"  ></path>
                  <path  fill-opacity=".13"  d="M624.926 646.62L94.815 946.72 199.353 381.5z"   ></path>
                  <path  fill-opacity=".02"  d="M620.999 585.644L249.941 687.265 381.708 342.6z" ></path>
                  <path  fill-opacity=".2" d="M788.776 729.591l-317.744 253.8L743.77 638.707z" ></path>
                  <path  fill-opacity=".07"  d="M181.021 672.364L.614 487.927l222.239 18.038z"  ></path>
                </svg>
                <svg class="result-polygon" viewBox="0 0 534 534">
                  <path   fill="none"  d="M449.786 449.807l-182.785 75.716-182.787-75.716-75.713-182.79L84.214 84.225 267.001 8.51l182.785 75.715 75.713 182.792-75.713 182.79z"   ></path>
                </svg>
                <svg class="result-polygon result-polygon-lg" viewBox="0 0 722 722">
                  <path   fill="none"   d="M612.723 612.746l-251.722 104.27-251.723-104.27L5.011 361.017l104.267-251.73L361.001 5.017l251.722 104.27 104.267 251.73-104.267 251.729z"  ></path>
                </svg>
                <!-- <div class="result-light"></div> -->
              </div>
              <div class="result-title"></div>
              <div class="result-name">{{ item_ornaments.name }}</div>
              <div class="result-abrasion" v-if="item_ornaments.appid == 730">
                {{ abrasion(item_ornaments.abrasion)
                }}{{ quality(item_ornaments.quality, 3) }}
              </div>
              <div class="result-abrasion" v-else>
                {{ quality2(item_ornaments.quality2) }}
              </div>
              <div class="hash-info-title">
                <div style="margin:auto;">Roll点:<span>{{hash.roll}}</span>
                <el-button style="padding:5px 6px !important;font-size:12px;background-color: #3a34b0;color:#ffffff" @click="checkHash()">hash验证</el-button>
                </div>
              </div>
              <div class="hash-info" :style="'display:'+hash_display">
                <div>服务器种子：<span>{{hash.web_seed}}</span></div>
                <div>服务器种子HASH：<span>{{hash.web_hash}}</span></div>
                <div>用户种子：<span>{{hash.user_seed}}</span></div>
                <div>用户种子HASH：<span>{{hash.user_hash}}</span></div>
              </div>
              <div class="result-buttons">
                <button class="result-btn" @click="again">再试一次</button>
                <button class="result-btn result-btn2 price_box " @click="sell">
                  出售 <img src="../../../assets/img/zs.png" style="width:17px;height:17px;margin: 0 1px 0 6px;">{{ item_ornaments.open_price }}
                </button>
              </div>
    </el-dialog>

	<dialog-list
	    :dialogVisible="dialogVisible"
      @onSelect="onSelect(arguments)"
	    @closeForm="closeDialog"
	/>
    <div style="display: none">
      <audio ref="audio" :src="tick" loop="loop">
        你的浏览器不支持audio标签
      </audio>
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
  rand,
} from "@/utils/util.js";
import RadialIndicator from "../../../components/radialIndicator.vue";

// import Circle from '../../../components/radialIndicator.vue';
import dialogList from "./dialogList.vue";

export default {
  components:{
    // Circle,
    RadialIndicator,
    dialogList
  },
  // watch: {
  //  //  如果需要第一次就执行监听 则需要设置：immediate: true
  //  imationFinished: {
  //     handler(newVal,oldVal) {
  //       console.log('oldVal:',oldVal)
  //       console.log('newVal:',newVal)
  //       this.imationFinished= newVal;
  //     },
  //     // immediate: true
  //   },
  // },

  watch: {
   /* probability:{
      handler(newValue, oldValue){
        console.log("newValue:"+newValue);
        if(newValue < 1){
            this.probability = 1;
        }
        if(newValue > 85){
              this.probability = 85;
        }
      },
       deep: true,
    } */
  },
  data() {
    return {
      img_url: this.$img_url,
      symbol: this.$getStore({ name: "symbol" }),
      fail: require("@/assets/img/fail.png"),
      dialogVisible:false,
      id: "",
      mute_status: false,
      probability: 20,
      dushu: 0,
      is_show:true,
      is_show_width:1280,
      bgurl:'@/assets/img/shengjibeijing.png',
      zhanting: 4,
      ornaments: {},
      imationFinished:false,
      ornaments_arr: [],
      ornaments_index: 0,
      open_status: false, //开启状态 用于显示滚动页面
      roll: false, //滚动状态 开启后开始滚动
      result_page: false, //结果页面
      result_msg_page: false, //结果页面
      msg:"",
      hash:{web_seed:"",web_hash:"",user_seed:"",user_hash:"",roll:""},
      hash_display:'none',
      btn_status: true, //按钮状态 为真时才能点击开启
      item_ornaments: {},
      screen_width: 0,
      tick: this.$server_url + "/public/static/audio/tick.mp3",
      circleBg: "../../../asset/img/bg-circle.png",
      mark: {
          0: '0',
          5: '5',
          25: '25',
          50: '50',
          85: {
            style: {
              color: '#1989FA'
            },
            label: this.$createElement('strong', '85%')
          }
        }
    };
  },
  computed: {
    price: function () {
      let price = 0.0;
      if (this.ornaments.open_price) {
        let probability = this.probability;
        let open_price = this.ornaments.open_price;
        price = Number((open_price * probability) / 100);
      }
      price = Math.ceil(price * 100) / 100 * 1.25;
      return price.toFixed(2);
    },
    ornaments_img: function () {
      let ornaments_img = [];
      if (this.ornaments.img) {
        for (let i = 0; i < 20; i++) {
          ornaments_img.push(this.img_url + this.ornaments.img);
          ornaments_img.push(this.fail);
        }
      }
      return ornaments_img;
    },
    translate_x: function () {
      let width = 290;
      let translate_x = 0;
      let screen_width = this.screen_width;
      let loaders_wrap_weight = this.$refs.loaders_wrap_weight.clientWidth;
      let differ = screen_width - loaders_wrap_weight;
      if (this.item_ornaments.origin == 1) {
        translate_x = screen_width / 2 - (width * 26 + width / 2) - differ / 2;
      } else {
        translate_x = screen_width / 2 - (width * 27 + width / 2) - differ / 2;
      }
      return translate_x;
    },
  },
  mounted() {
    //获取屏幕尺寸
    this.screen_width = document.body.clientWidth;
    this.is_show_width =document.body.clientWidth;

    window.onresize = () => {
      //屏幕尺寸变化
      return (() => {
        this.screen_width = document.body.clientWidth;
        this.is_show_width =document.body.clientWidth;
      })();
    };
    if(this.is_show_width>1280){
      this.is_show = true;
      this.bgurl='@assets/img/shengjibeijing.png';
    }else{
      this.is_show = false;
      this.bgurl='none';
    }
    if(this.is_show_width<1440){
      this.bgurl='none';
    }
    if(this.$route.params.id){
     this.id = encodeURIComponent(this.$route.params.id);
     this.get_ornaments_details();
    }
  },
  methods: {
    abrasion,
    quality,
    quality2,
    color,


    openDialog() {
    	this.dialogVisible = true;
    },
    closeDialog() {
    	this.dialogVisible = false;
    },
    onSelect(obj){
      console.log(obj);
     this.id = obj[0];
     this.get_ornaments_details();
    },
    onSliderChange(oop){
      console.log('触发了'+oop);
      if(oop<1){
        this.probability = 1;
        this.animationFinished();
      }
      if(oop>85){
        console.log("dkl");
        this.probability = 85;
        this.animationFinished();
      }
    },
    animationFinished(){
      console.log('子组件触发此方法'+this.probability)
      let oop =this.probability;
      if(oop<1){
        this.probability = 1;
        this.animationFinished();
      }
      if(oop>85){
        this.probability = 85;
        this.animationFinished();
      }
    },
    //设置声音
    mute() {
      this.mute_status = !this.mute_status;
    },

    //获取饰品详情
    get_ornaments_details() {
      let id = this.id;
      ttGet("/api.php/lucky/get_ornaments_details", { id: id }, (res) => {
        if (res.code == 200) {
          this.ornaments_arr = res.data.data;
          this.ornaments = res.data.data[0];
        } else {
          this.$message({
            message: res.msg,
            type: "warning",
          });
        }
      });
    },

    //饰品切换
    ornaments_switch(index) {
      if (this.open_status) return false; //开启状态禁止切换
      this.ornaments_index = index;
      this.ornaments = this.ornaments_arr[index];
    },

    //开启饰品
    open() {
      if (!this.btn_status) return false;
      this.btn_status = false;
      this.hash_display = 'none';
      let probability = this.probability;
      let id = this.ornaments.id;
      let loading = this.$loading({
        spinner: "el-icon-loading",
        background: "rgb(0 0 0 / 0%)",
      });
      ttPost(
        "/api.php/lucky/open",
        { id: id, probability: probability },
        (res) => {
          loading.close();
          if (res.code == 200) {
            let lotNum =this.probability;
            this.hash = res.data.hash;
            let randNum = res.data.proportion;
            this.dushu = randNum/100*360+360*16;
            if(res.data.is_ok==true){
              this.msg = "恭喜你";
              //let randNum = rand(1,(lotNum-1));//中奖的转圈，增加1，免得落在界限上
            }else{
              this.msg = "很遗憾，升级失败，祝下次好运。补偿饰品";
              //let randDoNum = rand(lotNum+1,99);//不中奖的转圈增加1，免得落在界限上

            }
            this.zhanting =8;
            // this.open_status = true;
            this.item_ornaments = res.data.item_ornaments;
            this.$emit("user_bean", { balance: res.data.balance });
            setTimeout(() => {
              // this.roll = true;
            }, 500);
            setTimeout(() => {
              if (this.$refs.audio) {
                this.$refs.audio.volume = 1;
                this.$refs.audio.playbackRate = 3.5;
                this.$refs.audio.play();
              }
            }, 500);
            setTimeout(() => {
              if (this.$refs.audio) {
                this.$refs.audio.playbackRate = 3.2;
              }
            }, 2000);
            setTimeout(() => {
              if (this.$refs.audio) {
                this.$refs.audio.playbackRate = 3;
                this.$refs.audio.volume = 0.8;
              }
            }, 3000);
            setTimeout(() => {
              if (this.$refs.audio) {
                this.$refs.audio.playbackRate = 2.8;
                this.$refs.audio.volume = 0.6;
              }
            }, 4000);
            setTimeout(() => {
              if (this.$refs.audio) {
                this.$refs.audio.playbackRate = 2;
              }
            }, 5000);
            setTimeout(() => {
              if (this.$refs.audio) {
                this.$refs.audio.playbackRate = 1.5;
              }
            }, 6000);
            setTimeout(() => {
              if (this.$refs.audio) {
                this.$refs.audio.playbackRate = 1;
              }
            }, 7000);
            setTimeout(() => {
              if (this.$refs.audio) {
                this.$refs.audio.pause();
              }
            }, 8100);
            setTimeout(() => {
              this.result_page = true;
              this.open_status = false;

              this.roll = false;
              this.dushu = 0;
              this.zhanting = 0;
              this.btn_status = true;
            }, 9000);
          } else {
            setTimeout(() => {
              this.dushu = 0;
              this.zhanting = 0;
            }, 5000);

            this.$message({
              message: res.msg,
              type: "warning",
            });
          }
        }
      );
    },

    //再试一次
    again() {
      this.result_page = false;
      this.result_msg_page = false;
      this.hash_display = 'none';
    },

    //出售饰品
    sell() {
      let record_id = this.item_ornaments.record_id;
      let loading = this.$loading({
        spinner: "el-icon-loading",
        background: "rgb(0 0 0 / 0%)",
      });
      ttPost("/api.php/user/sell", { record_id: record_id }, (res) => {
        loading.close();
        if (res.code == 200) {
          this.result_page = false;
          this.$emit("user_bean", { balance: res.data.balance });
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

    //验证hash
    checkHash(){
      this.hash_display = '';
    }
  },
};
</script>

<style lang="scss" scoped>
    @import "lucky_details.scss";
</style>

<style scoped>


 .price_box { float: right; display:flex; justify-content:center; align-items:center;  margin-top: 3px;  }
 .price_box  /deep/  .symbol{ margin-left: 10px; width: 18px; padding-top: 2px; margin-right: 5px;  }



 .result-btn { float: right; display:flex; justify-content:center; align-items:center;  margin-top: 3px;  }
 .result-btn  /deep/  .symbol{ margin-left: 10px; width: 18px; padding-top: 4px; margin-right: 5px;  }


 .live-item-price span{ float: right; display:flex; justify-content:center; align-items:center;  margin-top: 3px;  }
 .live-item-price  /deep/  .symbol{ margin-left: 10px; width: 18px; padding-top: 0px; margin-right: 5px;  }

.mgs_box{width:100%;height:40px;text-align: center;line-height:40px;color:#ff0000;}
 </style>
