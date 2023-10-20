<template>
  <div>
    <div class="member">
      <div class="member-inner">
        <div class="member-title">成为优质会员</div>
        <div class="member-subtitle">优质会员提供极致的用户体验，包括体面的额度功能和奖金。</div>
        <button class="member-btn" @click="pay">会员期 <child-component v-html="symbol"></child-component>{{price_total}} / 月</button>
        <div class="member-cards">
          <div class="member-card" v-for="(item, index) in vip_service">
            <div class="member-card-item">
              <div class="member-card-icon-wrap">
                <img :src="item.img" alt="">
              </div>
              <template v-if="item.disabled == 1">
                <button class="member-card-btn actived">
                  <span class="member-card-del">包括</span>
                  <span class="member-card-btn-icon">
                    <svg class="icon-check" viewBox="0 0 34 25"> <g> <g> <path
                      d="M30.802-.006l-18.66 18.674-8.944-8.931L0 12.944 10.564 23.5l1.579 1.502L13.72 23.5 34 3.16z"/> </g> </g> </svg>
                  </span>
                </button>
                <div class="member-card-title">{{item.name}}</div>
                <div class="member-card-desc">{{item.desc}}</div>
              </template>
              <template v-else-if="item.active == 1">
                <button class="member-card-btn active" @click="del(index)">
                  <span class="member-card-del price_box ">删除 (-<child-component v-html="symbol"></child-component>15)</span>
                  <span class="member-card-btn-icon">
                    <svg class="icon-minus" viewBox="0 0 8.1 1.7"> <path
                      d="M7.3 0c.5 0 .8.4.8.8 0 .5-.4.8-.8.8H.8c-.4.1-.8-.3-.8-.8C0 .4.4 0 .8 0h6.5z"/>
                    </svg>
                  </span>
                </button>
                <div class="member-card-title">{{item.name}}</div>
                <div class="member-card-desc">{{item.desc}}</div>
              </template>
              <template v-else>
                <button class="member-card-btn" @click="add(index)">
                  <span class="member-card-del price_box ">添加 <child-component v-html="symbol"></child-component>15</span>
                  <span class="member-card-btn-icon">
                    <svg class="icon-plus" viewBox="0 0 22 22"> <g> <g> <path
                      d="M2 9h7V2a2 2 0 0 1 4 0v7h7a2 2 0 0 1 0 4h-7v7a2 2 0 0 1-4 0v-7H2a2 2 0 1 1 0-4z"/> </g> </g>
                    </svg>
                  </span>
                </button>
                <div class="member-card-title">{{item.name}}</div>
                <div class="member-card-desc">{{item.desc}}</div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      class="msg-dialog"
      title="请确认"
      append-to-body
      :visible.sync="msg_page"
      :close-on-click-modal="false">
      <div><span class="price price_box "><child-component v-html="symbol"></child-component>{{price_total}}</span> 将从你的余额中扣除1个月的优质会员费。请注意：</div>
      <div class="msg-info">
        <div><span class="icon-gou">✓</span><span>在此阶段，你将无法添加删除其它优质会员的功能。</span></div>
        <div><span class="icon-gou">✓</span><span>你可以在当前会员期结束后，延长会员期。</span></div>
        <div><span class="icon-gou">✓</span><span>优质会员不允许浏览其他优质会员的私人资料。</span></div>
        <div><span class="icon-gou">✓</span><span>在对战中的胜出者不会被隐藏。</span></div>
        <div><span class="icon-gou">✓</span><span>订购优质会员并不会提升胜率。</span></div>
        <div><span class="icon-gou">✓</span><span>优质会员费用不设退款。</span></div>
      </div>
      <button class="msg-cancel" @click="msg_cancel">取消</button>
      <button class="msg-confirm" @click="msg_confirm">确认和入会</button>
    </el-dialog>
  </div>
</template>

<script>
  import {ttGet, ttPost} from "@/utils/util.js";

  export default {
    data() {
      return {
        vip_service: [
          {
            id: 1,
            name: '独特的优质会员标识',
            desc: '您将在个人资料页上获得一个标识，并在实时掉落饰品的推送时，在他所获得的奖品名单中显示您是优质会员。',
            img: require('@/assets/img/member-card-1.svg'),
            price: 15,
            active: 1,
            disabled: 0,
          },
          {
            id: 2,
            name: '私人资料',
            desc: '优质会员允许把自己的个人资料排除在实时掉落的推送之外，以保护你的隐私。',
            img: require('@/assets/img/member-card-2.svg'),
            price: 15,
            active: 1,
            disabled: 0,
          },
          {
            id: 3,
            name: '免费赠品',
            desc: '优质会员将可以免费自动参加我们所有的赠品活动。',
            img: require('@/assets/img/member-card-3.svg'),
            price: 15,
            active: 1,
            disabled: 0,
          },
          {
            id: 4,
            name: '优质会员箱子',
            desc: '我们有一套仅提供给优质会员使用的特殊箱子。',
            img: require('@/assets/img/member-card-4.svg'),
            price: 5,
            active: 1,
            disabled: 1,
          }
        ],
        symbol: this.$getStore({name: 'symbol'}),
        msg_page: false,
      }
    },
    computed: {
      price_total: function () {
        let price_total = 0;
        let vip_service = this.vip_service;
        for (let x in vip_service){
          if (vip_service[x].active){
            price_total += vip_service[x].price;
          }
        }
        if (price_total == 50) price_total -= 5;
        return price_total.toFixed(2);
      }
    },
    mounted() {
    },
    methods: {
      //删除会员权益
      del(index) {
        this.vip_service[index].active = 0;
      },

      //添加会员权益
      add(index) {
        this.vip_service[index].active = 1;
      },

      //购买会员
      pay() {
        this.msg_page = true;
      },

      //取消购买
      msg_cancel() {
        this.msg_page = false;
      },

      //支付确认
      msg_confirm() {
        let loading = this.$loading({
          spinner: 'el-icon-loading',
          background: 'rgb(0 0 0 / 0%)'
        });
        ttPost("/api.php/user/member_pay", {invitation_code: invitation_code}, (res) => {
          loading.close();
          if (res.code == 200) {
            this.user.invitation_code = invitation_code;
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
    }
  }
</script>

<style lang="scss" scoped>
  .member {
    position: relative;
    z-index: 0;
    padding-top: 370px;
    padding-bottom: 90px;
    text-align: center;
    background-color: #0d0e1d;
    overflow: hidden;

    &::before {
      top: 0;
      content: '';
      position: absolute;
      z-index: -1;
      left: 50%;
      width: 100%;
      max-width: 1414px;
      padding-bottom: 56.5371%;
      transform: translateX(-50%);
      background: url("~@/assets/img/premium-bg.png") center top/contain no-repeat;
    }
  }

  .member-title {
    margin: 0 0 25px;
    font-size: 38px;
    color: #fff;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: .26316em;
  }

  .member-subtitle {
    max-width: 460px;
    color: #56567e;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: .02em;
    margin: 0 auto 55px;
    line-height: 1.7;
  }

  .member-btn {
    display: inline-flex;
    align-items: center;
    padding: 0.95455em 60px 0.81818em;
    border-radius: 4px;
    font-size: 22px;
    color: #e3e6fc;
    background-color: #3a33ad;
    text-transform: uppercase;
    line-height: 1.5;
    cursor: pointer;
    border: 0;
  }

  .member-btn:hover {
    box-shadow: 0 4px 48px rgb(93 86 208 / 34%);
    background-color: #5d56d0;
    color: #fff;
  }

  .member-cards {
    display: flex;
    justify-content: center;
    margin-top: 100px;
    margin-left: -15px;
    margin-right: -15px;
    flex-wrap: wrap;
  }

  .member-card {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 330px;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 30px;
  }

  .member-card-item {
    padding: 10px 40px 40px;
    border-radius: 4px;
    background-color: #121324;
    text-align: center;
    width: 100%;
    height: 100%;
  }

  .member-card-icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    margin: 0 -20px -12px;
    height: 180px;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url("~@/assets/img/member-card-triangles.svg") center/contain no-repeat;
    }

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 2px;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      background: rgba(71, 207, 183, .3);
      box-shadow: 0 0 60px 25px #47cfb7;
    }
  }

  .member-card-title {
    font-size: 16px;
    text-transform: uppercase;
    color: #fff;
    font-weight: 700;
    margin-bottom: 18px;
    line-height: 1.2;
  }

  .member-card-desc {
    font-size: 15px;
    color: #6f7087;
  }

  .member-card-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 52px;
    border-radius: 5px;
    padding: 3px 20px 0;
    background-color: #36929a;
    color: #e0fffe;
    font-weight: 700;
    margin-bottom: 34px;
    text-transform: uppercase;
    letter-spacing: .04em;
    border: 0;
  }

  .member-card-btn:hover {
    background-color: #4bbcc6;
    color: #fff;
  }

  .member-card-btn.active {
    background-color: rgba(28, 71, 83, .2);
    color: #3eb3a4;
  }

  .member-card-btn.active:hover {
    background-color: #1c4753;
    color: #5fd6c7;
  }

  .member-card-btn.actived {
    border: 1px solid #47cfb7;
    cursor: default;
    background-color: rgba(28, 71, 83, .2);
    color: #79ecdd;
  }

  .member-card-btn-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex-shrink: 0;
    top: -2px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: currentColor;
  }

  .icon-minus {
    width: 11px;
    height: 11px;
    fill: #121324;
  }

  .member-card-del {
    font-size: 14px;
    margin-top: -3px;
  }

  .icon-check {
    width: 13px;
    height: 13px;
    fill: #121324;
  }

  .icon-plus {
    width: 11px;
    height: 11px;
    fill: #36919a;
  }

  .price {
    color: #7bdca2;
    font-weight: 500;
  }

  .msg-info {
    margin: 30px 15px;
    font-size: 14px;
    line-height: 20px;
  }

  .icon-gou {
    color: #7bdca2;
    font-weight: 600;
    margin-right: 10px;
  }

  .msg-cancel {

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
  }

  @media only screen and (max-width: 991px) {
  }

  @media only screen and (max-width: 767px){
    .member::before {
      height: 543px;
      padding-bottom: 0;
      background: url("~@/assets/img/premium-mobile-bg.png") center top no-repeat;
    }

    .member-card {
      margin-bottom: 15px;
    }

    .member {
      padding-top: 240px;
      padding-bottom: 15px;
    }
  }

  @media only screen and (max-width: 479px){
  }
</style>
