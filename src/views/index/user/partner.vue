<template>
  <div>
    <template v-if="loadingIndex">
      <div class="text-center">
        <i class="el-icon-loading data-loading"></i>
      </div>
    </template>
    <template v-else>
      <div class="partner">
        <div class="partner-inner">
          <div class="partner-header">
            <h2 class="partner-title">
              <svg class="icon-partner" viewBox="0 0 59 55">
                <g>
                  <g>
                    <path
                      d="M58.994 34.105v18.357c0 1.396-1.157 2.533-2.578 2.533H2.593c-1.422 0-2.58-1.137-2.58-2.533V34.105c0-.189.025-.353.05-.48.476-7.253 5.106-9.948 8.654-11.052a14.044 14.044 0 0 1-2.723-8.31c0-7.865 6.515-14.264 14.521-14.264 3.293 0 6.414 1.078 8.956 3.064A14.567 14.567 0 0 1 38.455 0c8.009 0 14.522 6.4 14.522 14.263 0 3.024-.976 5.935-2.748 8.34.711.224 1.38.482 2.013.775 4.09 1.955 6.322 5.363 6.659 10.14l.066.185zm-29.92-19.854c0 2.167.742 4.185 2.15 5.861l.256.285a10.135 10.135 0 0 0 1.717 1.485c.093.05.21.12.334.212 2.902 1.766 6.685 1.816 9.627.13l.048-.067.54-.289c2.511-1.644 4.092-4.524 4.092-7.624 0-5.08-4.209-9.214-9.383-9.214a9.496 9.496 0 0 0-6.652 2.729v1.125l-.972.01c-1.165 1.593-1.77 3.43-1.757 5.357zm7.578 28.696l1.803 2.36 1.803-2.36-1.803-13.312zm-13.577-8.126V49.93h12.499l-3.66-4.793c-.361-.407-.569-1.094-.492-1.793l2.111-15.674a14.956 14.956 0 0 1-2.117-.95c-6.926.989-8.341 3.845-8.341 8.102zm2.972-27.96a9.42 9.42 0 0 0-5.532-1.814c-5.173 0-9.381 4.134-9.381 9.215 0 3.145 1.604 6.025 4.291 7.703a8.944 8.944 0 0 0 3.465 1.374c1.015.199 2.249.2 3.197.01 1.302-.223 2.456-.672 3.484-1.344.167-.1.327-.204.481-.314a14.009 14.009 0 0 1-2.136-7.41c0-2.652.732-5.186 2.131-7.42zM5.153 34.822V49.93h12.802V34.087c0-.188.024-.355.05-.482.128-1.933.558-3.64 1.286-5.114a14.154 14.154 0 0 1-1.328-.18 14.017 14.017 0 0 1-4.469-1.59c-6.902.977-8.341 3.951-8.341 8.1zM41.337 49.93h12.48V34.803c0-3.553-1.14-5.612-3.808-6.885-1.167-.537-2.655-.933-4.513-1.198-.686.373-1.394.69-2.119.949l2.108 15.63c.077.691-.098 1.33-.49 1.84z"/>
                    <path
                      d="M58.994 34.105v18.357c0 1.396-1.157 2.533-2.578 2.533H2.593c-1.422 0-2.58-1.137-2.58-2.533V34.105c0-.189.025-.353.05-.48.476-7.253 5.106-9.948 8.654-11.052a14.044 14.044 0 0 1-2.723-8.31c0-7.865 6.515-14.264 14.521-14.264 3.293 0 6.414 1.078 8.956 3.064A14.567 14.567 0 0 1 38.455 0c8.009 0 14.522 6.4 14.522 14.263 0 3.024-.976 5.935-2.748 8.34.711.224 1.38.482 2.013.775 4.09 1.955 6.322 5.363 6.659 10.14l.066.185zm-29.92-19.854c0 2.167.742 4.185 2.15 5.861l.256.285a10.135 10.135 0 0 0 1.717 1.485c.093.05.21.12.334.212 2.902 1.766 6.685 1.816 9.627.13l.048-.067.54-.289c2.511-1.644 4.092-4.524 4.092-7.624 0-5.08-4.209-9.214-9.383-9.214a9.496 9.496 0 0 0-6.652 2.729v1.125l-.972.01c-1.165 1.593-1.77 3.43-1.757 5.357zm7.578 28.696l1.803 2.36 1.803-2.36-1.803-13.312zm-13.577-8.126V49.93h12.499l-3.66-4.793c-.361-.407-.569-1.094-.492-1.793l2.111-15.674a14.956 14.956 0 0 1-2.117-.95c-6.926.989-8.341 3.845-8.341 8.102zm2.972-27.96a9.42 9.42 0 0 0-5.532-1.814c-5.173 0-9.381 4.134-9.381 9.215 0 3.145 1.604 6.025 4.291 7.703a8.944 8.944 0 0 0 3.465 1.374c1.015.199 2.249.2 3.197.01 1.302-.223 2.456-.672 3.484-1.344.167-.1.327-.204.481-.314a14.009 14.009 0 0 1-2.136-7.41c0-2.652.732-5.186 2.131-7.42zM5.153 34.822V49.93h12.802V34.087c0-.188.024-.355.05-.482.128-1.933.558-3.64 1.286-5.114a14.154 14.154 0 0 1-1.328-.18 14.017 14.017 0 0 1-4.469-1.59c-6.902.977-8.341 3.951-8.341 8.1zM41.337 49.93h12.48V34.803c0-3.553-1.14-5.612-3.808-6.885-1.167-.537-2.655-.933-4.513-1.198-.686.373-1.394.69-2.119.949l2.108 15.63c.077.691-.098 1.33-.49 1.84z"/>
                  </g>
                </g>
              </svg>
              <span>合作伙伴</span>
            </h2>
          </div>
          <div class="partner-meta">
            <div class="partner-meta-item">
              <div class="partner-meta-label">
                <svg class="icon-chain" viewBox="0 0 37 37">
                  <g>
                    <g>
                      <path
                        d="M37 10.445c0 1.742-.68 3.382-1.915 4.617l-9.42 9.418a6.47 6.47 0 0 1-7.368 1.325c-.585-.315-1.253-.713-1.865-1.325L12.95 21l3.27-3.27 3.48 3.481c.368.367.855.57 1.371.57.517 0 1.004-.203 1.371-.57l9.372-9.371a1.941 1.941 0 0 0 0-2.742L27.887 5.17a1.941 1.941 0 0 0-2.742 0l-4.298 4.297-.16-.098c-1.273-.79-2.733-1.24-4.339-1.338L15.823 8l6.1-6.098a6.538 6.538 0 0 1 9.233 0l3.929 3.928A6.487 6.487 0 0 1 37 10.445zM20.63 28.951l.547.016-6.115 6.115a6.488 6.488 0 0 1-4.616 1.915 6.489 6.489 0 0 1-4.617-1.915L1.9 31.154a6.535 6.535 0 0 1 0-9.233l9.467-9.419c1.947-1.946 4.908-2.479 7.368-1.324.585.315 1.254.713 1.865 1.325l3.481 3.48-3.269 3.269-3.481-3.48a1.941 1.941 0 0 0-2.742 0L5.17 25.19a1.94 1.94 0 0 0 0 2.742L9.1 31.86c.367.367.854.57 1.37.57.517 0 1.004-.202 1.37-.57l4.3-4.348.162.104a8.59 8.59 0 0 0 4.328 1.335z"/>
                    </g>
                  </g>
                </svg>
                <span>您的合作伙伴链接:</span>
              </div>
              <div class="partner-field">
                <div class="partner-link">
                  {{server_url}}?invitation_code={{user.invitation_code}}
                </div>
                <svg class="icon-copy" viewBox="0 0 44 44" @click="copy">
                  <g>
                    <g>
                      <path
                        d="M14.667 33V11.002c0-1.014.815-1.836 1.834-1.836h9.165v3.667h-7.333V33zM29.333 9.166h12.832c1.013 0 1.835.827 1.835 1.836v31.162A1.831 1.831 0 0 1 42.165 44H16.501a1.838 1.838 0 0 1-1.834-1.836v-5.497h3.666v3.666h22v-27.5h-11zm-27.498 27.5A1.831 1.831 0 0 1 0 34.837V1.83C0 .819.815 0 1.835 0h25.663c1.014 0 1.835.817 1.835 1.83v1.835a1.835 1.835 0 0 0-3.666 0v.002h-22V33h5.498a1.835 1.835 0 0 0 0 3.667zm7.332 0V33h1.835c1.011 0 1.831.814 1.831 1.833a1.835 1.835 0 0 1-1.831 1.834zm16.5-31.164a1.835 1.835 0 0 0 3.666 0V3.667h-3.667z"/>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
            <div class="partner-meta-item">
              <div class="partner-meta-label">
                <svg class="icon-fire" viewBox="0 0 26 34">
                  <g>
                    <g>
                      <path
                        d="M13 22.317C10.678 24.673 9.367 28.567 9.067 34 3.409 32.532 0 27.938 0 22.596 0 13.6 7.297 11.646 6.452 0c1.592.026 8.024 3.663 9.225 12.298 1.257-1.228 1.898-5.296 1.656-6.96C23.042 9.606 26 15.084 26 21.196c0 6.05-3.383 11.18-9.068 12.779-.303-5.42-1.613-9.305-3.932-11.657z"/>
                    </g>
                  </g>
                </svg>
                <span>推广代码:</span>
              </div>
              <div class="partner-code">
                <input class="partner-input" type="text" v-model="invitation_code">
                <svg class="icon-check" viewBox="0 0 23 18" @click="preserve">
                  <g>
                    <g>
                      <path
                        d="M20.356.775L8.558 12.528 2.972 6.981.377 9.579l6.9 6.863 1.281 1.217 1.281-1.217L22.951 3.341z"/>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div class="partner-section">
            <h3 class="partner-section-title">
              您的水平
            </h3>
            <table class="level-table">
              <colgroup>
                <col width="10%">
                <col width="30%">
                <col width="20%">
                <col width="20%">
                <col width="20%">
              </colgroup>
              <tbody>
              <tr class="level-table-header">
                <th class="level-table-col-title">水平</th>
                <th class="level-table-col-title">到下一级水平</th>
                <th class="level-table-col-title">您的比例</th>
                <th class="level-table-col-title">转介存入</th>
                <th class="level-table-col-title">您的收入</th>
              </tr>
              <tr class="level-table-row">
                <td class="level-table-cell">
                  <div class="level level-primary">
                    <svg class="icon-level" viewBox="0 0 95 110">
                      <path
                        d="M47.5 0l13.7 31.2L95 27.5 74.9 55 95 82.5l-33.8-3.7L47.5 110 33.8 78.8 0 82.5 20.1 55 0 27.5l33.8 3.7L47.5 0z"/>
                      <path
                        d="M47.5 0l13.7 31.2L95 27.5 74.9 55 95 82.5l-33.8-3.7L47.5 110 33.8 78.8 0 82.5 20.1 55 0 27.5l33.8 3.7L47.5 0z"/>
                      <path
                        d="M47.5 0l13.7 31.2L95 27.5 74.9 55 95 82.5l-33.8-3.7L47.5 110 33.8 78.8 0 82.5 20.1 55 0 27.5l33.8 3.7L47.5 0z"/>
                    </svg>
                    <div class="level-number">{{user.spread_grade}}</div>
                  </div>
                </td>
                <td class="level-table-cell">
                  <span class="price_box "><child-component v-html="symbol"></child-component>{{user.total}} / <child-component v-html="symbol"></child-component>{{user.next_where}}</span>
                </td>
                <td class="level-table-cell">
                  <div>{{user.commission}}%</div>
                  <div class="level-table-cell-sub">来自转介的存款</div>
                </td>
                <td class="level-table-cell">
                  <span class="price_box "><child-component v-html="symbol"></child-component>{{user.total}}</span>
                </td>
                <td class="level-table-cell">
                  <span class="level-table-gold price_box "><child-component v-html="symbol"></child-component>{{user.gold}}</span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="partner-section">
            <h3 class="partner-section-title">
              合作伙伴的水平
            </h3>
            <table class="level-table">
              <colgroup>
                <col width="10%">
                <col width="45%">
                <col width="45%">
              </colgroup>
              <tbody>
              <tr class="level-table-header">
                <th class="level-table-col-title">水平</th>
                <th class="level-table-col-title">到这个水平</th>
                <th class="level-table-col-title">返佣金额</th>
              </tr>
              <tr class="level-table-row2" v-for="(item, index) in spread">
                <td class="level-table-cell">
                  <div class="level">
                    <svg class="icon-level" viewBox="0 0 95 110">
                      <path
                        d="M47.5 0l13.7 31.2L95 27.5 74.9 55 95 82.5l-33.8-3.7L47.5 110 33.8 78.8 0 82.5 20.1 55 0 27.5l33.8 3.7L47.5 0z"/>
                      <path
                        d="M47.5 0l13.7 31.2L95 27.5 74.9 55 95 82.5l-33.8-3.7L47.5 110 33.8 78.8 0 82.5 20.1 55 0 27.5l33.8 3.7L47.5 0z"/>
                      <path
                        d="M47.5 0l13.7 31.2L95 27.5 74.9 55 95 82.5l-33.8-3.7L47.5 110 33.8 78.8 0 82.5 20.1 55 0 27.5l33.8 3.7L47.5 0z"/>
                    </svg>
                    <div class="level-number">{{item.level}}</div>
                  </div>
                </td>
                <td class="level-table-cell">
                  <span class="price_box "><child-component v-html="symbol"></child-component>{{item.where}}</span>
                </td>
                <td class="level-table-cell">
                  <span class="price_box "><child-component v-html="symbol"></child-component>{{item.commission}}%</span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import {ttGet, ttPost} from "@/utils/util.js";

  export default {
    data() {
      return {
        server_url: this.$server_url,
        symbol: this.$getStore({name: 'symbol'}),
        loadingIndex: true,
        user: {},
        spread: [],
        invitation_code: ''
      }
    },
    mounted() {
      this.get_partner();
    },
    methods: {
      //获取合作伙伴信息
      get_partner() {
        ttGet("/api.php/user/get_partner", '', (res) => {
          this.loadingIndex = false;
          if (res.code == 200) {
            this.user = res.data.user;
            this.invitation_code = res.data.user.invitation_code;
            this.spread = res.data.spread;
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        });
      },

      //复制推广链接
      copy() {
        let partner_link = this.server_url + '?invitation_code=' + this.user.invitation_code;
        this.$copyText(partner_link).then(
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

      //保存推广代码
      preserve() {
        let invitation_code = this.invitation_code;
        if (!invitation_code) {
          return this.$message({
            message: '请输入推广代码!',
            type: 'warning'
          });
        }
        let loading = this.$loading({
          spinner: 'el-icon-loading',
          background: 'rgb(0 0 0 / 0%)'
        });
        ttPost("/api.php/user/partner_set", {invitation_code: invitation_code}, (res) => {
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
  .vue-view {
    margin-bottom: 70px;
  }

  .partner {
    margin-top: 30px;
  }

  .partner-header {
    margin: 0 0 40px;
    display: flex;
    align-items: center;
    font-size: 27px;
    color: #fff;
    font-weight: 500;
  }

  .partner-title {
    display: flex;
    align-items: center;
    margin: 3px 0 0;
    flex-grow: 1;
    font-size: 27px;
    color: #fff;
    font-weight: 500;
  }

  .icon-partner {
    position: relative;
    width: 24px;
    height: 26px;
    margin-right: 20px;
    fill: #7349ca;
  }

  .partner-meta {
    display: flex;
    background-color: #0e0f1e;
    padding: 45px 50px 50px;
    margin-bottom: 50px;
    box-shadow: 0 24px 31px rgb(15 16 31 / 71%);
  }

  .partner-meta-item {
    flex: 2;
  }

  .partner-meta-item:first-child {
    flex: 3;
    margin-right: 50px;
  }

  .partner-meta-label {
    display: flex;
    align-items: center;
    color: #b8b9cc;
    font-size: 19px;
    font-weight: 500;
    margin-bottom: 15px;
  }

  .icon-chain {
    position: relative;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    fill: #9898aa;
  }

  .partner-field {
    align-items: center;
    display: flex;
    height: 76px;
    background-color: #131528;
    padding-left: 25px;
    padding-right: 25px;
  }

  .partner-link {
    position: relative;
    flex-grow: 1;
    padding-top: 3px;
    font-size: .8rem;
    font-weight: 300;
    margin-right: 10px;
    overflow: hidden;
    color: #ffffff;
  }

  .icon-copy {
    width: 22px;
    height: 22px;
    vertical-align: middle;
    fill: #707290;
    cursor: pointer;
  }

  .icon-copy:hover {
    fill: #8d8ea6;
  }

  .icon-fire {
    position: relative;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    fill: #9898aa;
  }

  .partner-code {
    align-items: center;
    display: flex;
    height: 76px;
    background-color: #131528;
    position: relative;
    padding: 0;
  }

  .partner-input {
    color: #fff;
    background-color: transparent;
    border: 0;
    width: 100%;
    height: 100%;
    font-size: 19px;
    font-weight: 300;
    text-transform: lowercase;
    outline: 0;
    padding-left: 25px;
    padding-right: 25px;
  }

  .partner-input:focus {
    outline: 0;
    box-shadow: 0 0 0 2px rgb(106 119 255 / 70%);
  }

  .icon-check {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    fill: #9898aa;
    position: absolute;
    z-index: 1;
    top: 50%;
    right: 25px;
    transform: translateY(-50%);
    cursor: pointer;
  }

  .partner-section:not(:last-child) {
    margin-bottom: 55px;
  }

  .partner-section-title {
    position: relative;
    z-index: 0;
    font-size: 24px;
    text-transform: uppercase;
    margin: 0px 0px 40px;
    color: rgb(255, 255, 255);
    font-weight: 500;
    text-align: center;

    &::after, &::before {
      content: "";
      position: absolute;
      z-index: -1;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &::before {
      width: 196px;
      height: 106px;
      background: url("~@/assets/img/heading-bg.svg") center center / contain no-repeat;
      transform: translate(-55%, -55%);
    }

    &::after {
      transform: translate(-50%, -50%);
      width: 100px;
      height: 2px;
      border-radius: 50%;
      background-color: rgba(58, 62, 95, 0.5);
      box-shadow: rgb(58 62 95) 0px 0px 30px 10px;
    }
  }

  .level-table {
    width: 100%;
    max-width: 100%;
    border-spacing: 0px 2px;
    color: rgb(218, 219, 234);
    font-size: 25px;
    font-weight: 300;
    text-align: center;
    border-collapse: collapse;
  }

  .level-table-header {
    background-color: rgb(17, 19, 36);
  }

  .level-table-col-title {
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 700;
    color: rgb(93, 95, 114);
    padding-top: 24px;
    padding-bottom: 22px;
  }

  .level-table-row {
    background-color: rgb(14, 15, 30);
  }

  .level-table-row2 {
    position: relative;
    background-color: #131528;
  }

  .level-table-cell {
    position: relative;
    padding-top: 32px;
    padding-bottom: 32px;
    line-height: 1.2;
    white-space: nowrap;
  }

  .level-table-cell:first-child {
    padding: 0px;
    width: 1px;
  }

  .level-table-cell-sub {
    color: rgb(93, 95, 114);
    margin-top: 4px;
    font-size: 12px;
    text-transform: uppercase;
    line-height: 1;
    font-weight: 500;
  }

  .level-table-gold {
    color: rgb(112, 211, 152);
  }

  .level {
    position: relative;
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100px;
    background: url("~@/assets/img/level-bg.svg") left center / contain no-repeat;

    &::before {
      content: "";
      position: absolute;
      z-index: -1;
      bottom: 0px;
      left: 0px;
      width: 100%;
      height: 100px;
      background-image: linear-gradient(to top, rgb(19, 21, 40), rgba(19, 21, 40, 0));
    }

    &::after {
      content: "";
      position: absolute;
      z-index: -1;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 2px;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      box-shadow: rgb(67 42 192) 0px 0px 40px 20px;
    }

    .icon-level {
      width: 48px;
      height: 56px;
      fill: rgb(101, 83, 253);
    }
  }

  .level-primary {
    background: url("~@/assets/img/level-bg-main.svg") left center / contain no-repeat;

    &::before {
      background-image: linear-gradient(to top, rgb(14, 15, 30), rgba(14, 15, 30, 0));
    }

    &::after {
      box-shadow: rgb(12 187 185) 0px 0px 40px 20px;
    }

    .icon-level {
      fill: rgb(77, 189, 190);
    }
  }

  .level-number {
    position: absolute;
    z-index: 1;
    top: calc(50% + 1px);
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    font-weight: 700;
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
    .partner-meta {
      display: block;
    }

    .partner-meta-item:first-child {
      margin-bottom: 30px;
      margin-right: 0px;
    }
  }

  @media only screen and (max-width: 767px){
  }

  @media only screen and (max-width: 479px){
  }
</style>

<style scoped>

 
.price_box /deep/ {   display:flex; justify-content:center; align-items:center;  margin-top: -4px;  }
.price_box  /deep/  .symbol{ margin-left: 10px; width: 24px; padding-top: 2px; margin-right: 5px;  }
.level-table-cell{text-align: center;}

</style>