<template>
  <div>
    <div class="roll-inner">
      <div class="tab">
        <div class="tab-item" @click="tab_switch(0)">
          <i class="iconfont ttskins-choujiang"></i>
          <div class="tab-item-txt">进行中</div>
        </div>
        <div class="tab-item" @click="tab_switch(1)">
          <i class="iconfont ttskins-liwuxianxing"></i>
          <div class="tab-item-txt">已结束</div>
        </div>
        <div class="tab-item" @click="tab_switch(2)">
          <i class="iconfont ttskins-icon"></i>
          <div class="tab-item-txt">我参与的</div>
        </div>
<!--        <div class="tab-item ml-auto" @click="tab_switch(3)">
          <i class="iconfont ttskins-huiyuanzengpinguanli"></i>
          <div class="tab-item-txt">创建抽奖</div>
        </div> -->
      </div>

      <div :class="'tab-item mobile_create_roll_btn  ' + [type == 3 ? 'active' : '']" @click="tab_switch(3)">
          <i class="el-icon-upload"></i>
          <div class="tab-item-txt">创建抽奖</div>
      </div>
      <template v-if="loadingIndex">
        <div class="text-center">
          <i class="el-icon-loading data-loading"></i>
        </div>
      </template>
      <template v-else>
        <div class="roll-title-wrap">
          <div class="roll-title">
            {{roll.name}}
          </div>
        </div>
        <div class="roll-main">
          <div class="roll-left">
            <div class="roll-avatar-wrap">
<!--              <template v-if="roll.spread_id">
                <router-link :to="'/profile/' + roll.spread_id" target="_blank">
                  <img class="roll-avatar"
                       :src="repair(roll.portrait)"
                       alt="">
                </router-link>
              </template>
              <template v-else>
                <img class="roll-avatar"
                     :src="repair(roll.portrait)"
                     alt="">
              </template> -->
              <template v-if="roll.spread_id>0">
                <router-link :to="'/profile/' + roll.spread_id" target="_blank">
                  <img class="roll-avatar" :src="repair(roll.portrait)" alt="">
                </router-link>
              </template>
              <template v-else>
                <img class="roll-avatar" :src="repair(roll.portrait)" alt="">
              </template>
              <div class="roll-badge"><span>{{roll.user_name}}</span></div>
            </div>
            <div class="occupy"></div>
            <div class="roll-btn" v-if="roll.end_status == 0">进行中</div>
            <div class="roll-btn" v-else-if="roll.end_status == 1">已结束</div>
            <div class="roll-btn" v-else-if="roll.end_status == 2">开启失败</div>
          </div>
          <div class="roll-content">
            <div class="roll-title-wrap2">
              <div class="roll-title2">
                {{roll.name}}
              </div>
              <div class="roll-subtitle">
                <template v-if="roll.end_status == 1">该抽奖已结束。以下是中奖者和参加者名单。</template>
                <template v-else-if="roll.joined == 1">
                  你是这次抽奖的参与者
                </template>
                <template v-else>
                  要参加抽奖, 你需要至少存入 {{roll.flow}}
                  <template v-if="roll.invitation_code">
                    并使用推广代码 <span class="code" @click="copy">{{roll.invitation_code}}</span>
                    <svg class="icon-copy" viewBox="0 0 44 44" @click="copy">
                      <g>
                        <g>
                          <path
                            d="M14.667 33V11.002c0-1.014.815-1.836 1.834-1.836h9.165v3.667h-7.333V33zM29.333 9.166h12.832c1.013 0 1.835.827 1.835 1.836v31.162A1.831 1.831 0 0 1 42.165 44H16.501a1.838 1.838 0 0 1-1.834-1.836v-5.497h3.666v3.666h22v-27.5h-11zm-27.498 27.5A1.831 1.831 0 0 1 0 34.837V1.83C0 .819.815 0 1.835 0h25.663c1.014 0 1.835.817 1.835 1.83v1.835a1.835 1.835 0 0 0-3.666 0v.002h-22V33h5.498a1.835 1.835 0 0 0 0 3.667zm7.332 0V33h1.835c1.011 0 1.831.814 1.831 1.833a1.835 1.835 0 0 1-1.831 1.834zm16.5-31.164a1.835 1.835 0 0 0 3.666 0V3.667h-3.667z"/>
                        </g>
                      </g>
                    </svg>
                  </template>
                </template>
              </div>
              <template v-if="roll.end_status != 1 && roll.joined != 1">
                <button class="roll-btn2" @click="join_roll">加入</button>
              </template>
            </div>
            <div class="roll-bottom">
              <div class="roll-bottom-item">
                <img class="roll-bottom-img" src="@/assets/img/time.png" alt="">
                <span>开始时间: {{roll.start_time}}</span>
              </div>
              <div class="roll-bottom-item">
                <img class="roll-bottom-img" src="@/assets/img/time.png" alt="">
                <span>结束时间: {{roll.end_time}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="roll-pool">
          <div class="roll-pool-header">
            <div class="roll-pool-header-item">
              <strong>饰品</strong>
              <span>{{roll.num}}</span>
            </div>
            <div class="roll-pool-header-item">
              <strong>总价值</strong>
              <span class="price_box"><child-component v-html="symbol"></child-component>{{roll.price}}</span>
            </div>
          </div>
          <div class="roll-pool-items">
            <div :class="'live-item live-item-bg-'+color(item.color, 4)+' live-item-bg' " v-for="(item, index) in roll.roll_ornaments">
              <div :class="'live-item-body ' + color(item.color, 3)">
                <div class="live-item-price-name">饰品价格</div>
                <div class="live-item-price price_box "><child-component v-html="symbol"></child-component> {{item.price}}</div>
                <div class="o-item2">
                  <img class="o-img2" :src="img_url + item.img" alt="">
                  <svg class="o-bg" viewBox="0 0 87.3 107.3">
                    <path d="M83.1 107.3l-61.8-74L87.3 0l-4.2 107.3z" fill-opacity=".04"></path>
                    <path d="M67.7 70.1l-57.5 32.6 11.3-61.3 46.2 28.7z" fill-opacity=".13"></path>
                    <path d="M67.3 63.5L27 74.5l14.3-37.4 26 26.4z" fill-opacity=".02"></path>
                    <path d="M85.5 79.1L51 106.6l29.6-37.4 4.9 9.9z" fill-opacity=".2"></path>
                    <path d="M19.6 72.9L0 52.9l24.1 2-4.5 18z" fill-opacity=".07"></path>
                  </svg>
                </div>
                <template v-if="roll.end_status == 1 && item.user_id">
                  <router-link :to="'/profile/' + item.user_id" target="_blank">
                    <img class="o-user-img" :src="repair(item.user_portrait)" alt="">
                  </router-link>
                  <div class="o-user-name">{{item.user_name || '未中取'}}</div>
                </template>
                <div class="o-name">{{item.name}}</div>
                <div class="o-abrasion" v-if="item.appid == 730">{{ abrasion(item.abrasion) }}{{ quality(item.quality,
                  3) }}
                </div>
                <div class="o-abrasion" v-else>{{ quality2(item.quality2) }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="roll-pool">
          <div class="roll-pool-header">
            <div class="roll-pool-header-item">
              <strong>参与者</strong>
              <template v-if="roll.participate_in_num > 50">
                <span>显示{{roll.participate_in_num}}名参加抽奖者中的前50位参加者</span>
              </template>
              <template v-else>
                <span>{{roll.participate_in_num}}</span>
              </template>
            </div>
          </div>
          <div class="roll-pool-players">
            <div class="roll-pool-player" v-for="(item, index) in roll.participate_in">
              <router-link :to="'/profile/' + item.id" target="_blank">
                <img class="roll-pool-player-img" :src="repair(item.portrait)">
              </router-link>
            </div>
          </div>
        </div>
      </template>
    </div>
    <el-dialog
      class="msg-dialog"
      title="提示"
      append-to-body
      :visible.sync="join_msg_page"
      :close-on-click-modal="false">
      <span>{{join_msg_content}}</span>
    </el-dialog>
  </div>
</template>

<script>
  import {ttGet, ttPost, ttWebSocket, abrasion, quality, quality2, color, repair} from "@/utils/util.js";

  export default {
    data() {
      return {
        img_url: this.$img_url,
        symbol: this.$getStore({name: 'symbol'}),
        loadingIndex: true,
        id: '',
        roll: {},
        join_msg_page: false,
        join_msg_content: ''
      }
    },
    mounted() {
      this.id = encodeURIComponent(this.$route.params.id);
      this.get_roll_details();
    },
    methods: {
      abrasion, quality, quality2, color, repair,

      //获取Roll房详情
      get_roll_details() {
        let id = this.id;
        ttGet("/api.php/roll/get_roll_details", {id: id}, (res) => {
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
        this.$router.push({path: '/roll', query: {type: type}});
      },

      //复制推广代码
      copy() {
        this.$copyText(this.roll.invitation_code).then(
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

      //加入roll房
      join_roll() {
        let id = this.id;
        let loading = this.$loading({
          spinner: 'el-icon-loading',
          background: 'rgb(0 0 0 / 0%)'
        });
        ttGet("/api.php/roll/join_roll", {id: id}, (res) => {
          loading.close();
          if (res.code == 200) {
            this.get_roll_details();
            this.join_msg_page = true;
            this.join_msg_content = res.msg;
          } else {
            this.join_msg_page = true;
            this.join_msg_content = res.msg;
          }
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  .vue-view {
    margin-bottom: 70px;
  }

  .roll-inner {
    margin-top: 50px;
  }

  .tab {
    display: flex;
    background-color: #111324;
    margin-bottom: 40px;
  }

  .tab-item {
    display: flex;
    text-transform: uppercase;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    height: 80px;
    padding-left: 30px;
    padding-right: 30px;
    color: #9ca1c7;
    font-weight: 500;
    font-size: 16px;
    border-bottom: 1px solid transparent;
    border-top: 1px solid transparent;
    background-color: #111324;
    text-align: left;
    cursor: pointer;

    .iconfont {
      margin-right: 5px;
    }
  }

  .tab-item.active {
    color: #fff;
    border-bottom-color: #4b56bc;
  }

  .roll-title-wrap {
    display: none;
  }

  .roll-title {
    margin-top: 0;
    font-weight: 400;
    color: #5562e2;
    font-size: 2.4rem;
    margin-bottom: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .roll-main {
    display: flex;
    border: 1px solid #2d2d67;
    background-color: #15172c;
    box-shadow: inset 0 0 59px rgb(41 34 139 / 15%);
  }

  .roll-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 300px;
    min-height: 300px;
    padding: 40px 30px;
    background:  #15172c;
  }

  .roll-avatar-wrap {
    position: relative;
    margin-top: 50px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    background-image: linear-gradient(to bottom, rgba(75, 86, 188, .25), rgba(75, 86, 188, 0) 60px);
  }

  .roll-avatar-wrap, .roll-avatar {
    width: 100px;
    height: 100px;
    border-radius: 22px;
  }

  .roll-badge {
    display: flex;
    align-items: center;
    height: 30px;
    padding-left: 10px;
    padding-right: 10px;
    position: absolute;
    top: calc(100% - 10px);
    font-size: 13px;
    justify-content: center;
    border-radius: 10px;
    padding-top: 2px;
    width: 100%;
    text-transform: uppercase;
    text-align: center;
    background-color: #cb8928;
    color: #ffffff;
  }

  .roll-badge span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .roll-btn {
    font-weight: 700;
    padding-top: 2px;
    width: 100%;
    text-transform: uppercase;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    border-radius: 4px;
    background-color: #121322;
    color: #8589a5;
    cursor: default;
    font-size: 15px;
    max-width: 240px;
  }

  .roll-content {
    display: flex;
    flex-direction: column;
    padding: 45px;
    flex-grow: 1;
  }

  .roll-title2 {
    margin-top: 0;
    font-weight: 400;
    color: #5562e2;
    font-size: 2.4rem;
    margin-bottom: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .roll-subtitle {
    color: #fff;
    font-size: 1.2rem;
    font-weight: 300;
  }

  .roll-btn2 {
    color: #fff;
    text-transform: uppercase;
    font-size: 22px;
    font-weight: 700;
    border-radius: 4px;
    background-color: #3a33ac;
    padding-top: 4px;
    height: 50px;
    margin-top: 20px;
    margin-bottom: 10px;
    width: 200px;
    line-height: 1.15;
    border: none;
  }

  .roll-bottom {
    display: flex;
    align-items: center;
    margin-top: auto;
  }

  .roll-bottom-item {
    display: flex;
    align-items: center;
    font-size: 13px;
    margin-right: 44px;
    color: #8d91ae;
  }

  .roll-bottom-img {
    position: relative;
    top: -1px;
    margin-right: 10px;
    width: 20px
  }

  .occupy {
    font-size: 27px;
    margin-bottom: 30px;
    margin-top: 30px;
    text-align: center;
  }

  .roll-pool-header {
    display: flex;
    font-size: 18px;
    padding-left: 36px;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  .roll-pool-header-item {
    strong {
      color: #ffffff;
    }

    span {
      display: inline-block;
      margin-left: 5px;
      color: #f9a328;
    }

    & + &::before {
      content: '|';
      margin-left: 15px;
      margin-right: 13px;
      color: #4b56bc;
    }
  }

  .roll-pool-items {
    display: flex;
    flex-wrap: wrap;
    margin: -4px;
  }

  .live-item {
    padding: 4px;
    flex: 0 0 12.5%;
    max-width: 12.5%;
  }

  .live-item-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1;
    padding: 25px 20px 20px;
    border-radius: 5px;
    text-align: center;
    // background-color: #1b1e38;
  }

  // .live-item-body:hover {
  //   // background-color: #202343;
  // }

  .live-item-price-name {
    font-size: 10px;
    color: #4b4d5f;
    font-weight: 500;
  }

  .live-item-price {
    font-size: 15px;
    color: #7bdca2;
    font-weight: 700;
    line-height: 1.25;
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
    position: absolute;
    z-index: -2;
    top: -6px;
    left: 50%;
    width: 88px;
    height: 108px;
    transform: translateX(-50%);
  }

  .o-item2 {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    max-width: 100%;
    height: 116px;
  }

  .o-img2 {
    width: calc(100% + 10px);
    max-width: 100%;
    max-height: 100%;
  }

  .roll-pool-players {
    display: flex;
    flex-wrap: wrap;
    margin: -15px;
  }

  .roll-pool-player {
    padding: 8px;
  }

  .roll-pool-player-img {
    display: block;
    border-radius: 20px;
    width: 74px;
    height: 74px;
  }

  .code {
    color: #adff2f;
    text-transform: uppercase;
    cursor: pointer;
  }

  .icon-copy {
    width: 19px;
    vertical-align: middle;
    fill: #707290;
    cursor: pointer;
  }

  .o-user-img {
    position: relative;
    z-index: 1;
    -webkit-clip-path: none;
    clip-path: none;
    width: 50px;
    height: 50px;
    border-radius: 8px;
    margin-top: -20px;
  }

  .o-user-name {
    margin-bottom: 6px;
    color: rgba(255, 255, 255, .6);
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    overflow: hidden;
    font-size: 14px;
  }

  @media (min-width: 480px) {
  }

  @media (min-width: 768px) {
  }

  @media (min-width: 992px) {
  }

  @media (min-width: 1200px) {
  }

  @media (min-width: 1440px) {
  }

  @media only screen and (max-width: 1439px) {
  }

  @media only screen and (max-width: 1199px) {
    .live-item {
      flex-basis: 20%;
      max-width: 20%;
    }
  }
  .mobile_create_roll_btn{ display: none; margin-bottom: 30px;}
  @media only screen and (max-width: 991px) {
    .mobile_create_roll_btn{ display: flex;  }
    .roll-main {
      display: block;
    }

    .roll-left {
      width: 100%;
      height: 300px;
      padding: 30px;
    }

    .live-item {
      flex-basis: 25%;
      max-width: 25%;
    }

    .tab-item-txt {
      //display: none;
    }

    .roll-title-wrap {
      display: block;
      text-align: center;
      margin-bottom: 24px;
    }

    .roll-title-wrap2 {
      text-align: center;
    }

    .roll-content {
      padding: 25px;
    }

    .roll-bottom {
      flex-direction: column;
      align-items: center;
    }

    .roll-bottom-item + .roll-bottom-item {
      margin-top: 10px;
    }
  }

  @media only screen and (max-width: 767px) {
    .live-item {
      flex-basis: 50%;
      max-width: 50%;
    }

    .roll-inner {
      padding: 0;
    }
  }

  @media only screen and (max-width: 479px) {
  }
</style>

<style scoped>


 .price_box  { float: right; display:flex; justify-content:center; align-items:center;  margin-top: 3px;  }
 .price_box   /deep/  .symbol{ margin-left: 10px; width: 16px; padding-top: 3px; margin-right: 5px;  }

  .roll-subtitle { float: right; display:flex; justify-content:center; align-items:center;  margin-top: 3px;  }
  .roll-subtitle  /deep/  .symbol{ margin-left: 10px; width: 16px; padding-top: 3px; margin-right: 5px;  }

  .live-item-price { float: right; display:flex; justify-content:center; align-items:center;  margin-top: 3px;  }
  .live-item-price  /deep/  .symbol{ margin-left: 10px; width: 16px; padding-top: 3px; margin-right: 5px;  }


 </style>
