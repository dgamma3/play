<template>


  <div style="position:relative;z-index:999;">
    <div class="header" ref="allWidth">
      <div class="logo">
        <router-link to="/">
          <img :src="logo" />
        </router-link>
      </div>

      <div class="navbar">
        <el-menu mode="horizontal" unique-opened :default-active="active" :class="
            'fixed-nav-content page-menu ' + [page ? 'page-menu-visible' : '']
          " text-color="#fff" active-text-color="#8792f1" style="padding-left: 0px;">
          <router-link to="/play" class="router_link">
            <el-menu-item index="/play">
              <i class="el-icon-s-goods"></i>
              <span slot="title">国庆活动</span>
            </el-menu-item>
          </router-link>

          <router-link to="/" class="router_link">
            <el-menu-item index="/">
              <i class="el-icon-coordinate "></i>
              <span slot="title">BOX开箱</span>
            </el-menu-item>
          </router-link>
          <router-link to="/battle" class="router_link">
            <el-menu-item index="/battle">
              <i class="el-icon-star-on"></i>
              <span slot="title">Box对战</span>
            </el-menu-item>
          </router-link>
          <router-link to="/lucky" class="router_link">
            <el-menu-item index="/lucky">
              <i class="el-icon-s-marketing"></i>
              <span slot="title">Top升级</span>
            </el-menu-item>
          </router-link>
          <router-link to="/roll" class="router_link">
            <el-menu-item index="/roll">
              <i class="el-icon-s-home"></i>
              <span slot="title">Roll房</span>
            </el-menu-item>
          </router-link>
          <router-link to="/store" class="router_link">
            <el-menu-item index="/store">
              <i class="el-icon-s-shop"></i>
              <span slot="title">商城</span>
            </el-menu-item>
          </router-link>
          <router-link to="/benefits" class="router_link">
            <el-menu-item index="/benefits">
              <i class="el-icon-s-goods"></i>
              <span slot="title">福利活动</span>
            </el-menu-item>
          </router-link>
          <!--     <router-link to="/official" class="router_link">
          <el-menu-item index="/official">
            <i class="el-icon-present"></i>
            <span slot="title">福利中心</span>
          </el-menu-item>
        </router-link> -->
          <div class="page-nav-right"></div>
        </el-menu>
      </div>

      <div class="user-info" v-if="user.id">
        <router-link class="user-info-view" to="/user_info">
          <img class="user-info-img" :src="repair(user.portrait)" alt="" />
          <div class="user-info-info">
            <!--  <div class="user-info-name">{{ user.name }}</div> -->
            <div style="display:flex; flex-direction:column; ">
              <div class="user-info-bean price">
                <child-component v-html="symbol"></child-component>
                {{ user.bean }}
              </div>
              <div class="user-info-bean user-stroe-bean">
                <img src="../../assets/img/zs.png"
                  style="width:17px;height:17px;padding-top: 2px;padding-left: 2px; margin-right: 6px;" />
                {{ user.store_bean }}
              </div>
            </div>
          </div>
        </router-link>

        <div>
          <button class="user-info-recharge" @click="recharge">充值</button>
        </div>

        <div class="user-info-dropdown">
          <div class="user-info-dropdown-content">
            <router-link class="user-info-dropdown-link" to="/user_info">
              <i class="el-icon-suitcase-1" style="margin-right: 10px;"></i>
              <span>我的背包</span>
            </router-link>
            <!-- <router-link class="user-info-dropdown-link" to="/user_info/all">
              <svg viewBox="0 0 38 24" style="width: 18px;height: 12px;fill: #5561d5;">
                <g>
                  <g>
                    <path
                      d="M38 11.998C38 18.615 33.223 24 27.381 24c-4.237 0-6.828-2.549-8.382-5.261-1.555 2.712-4.146 5.26-8.383 5.26C4.775 24 0 18.616 0 12 0 5.38 4.775-.004 10.617-.004 14.106-.02 17.324 1.896 19 4.991c1.675-3.095 4.893-5.012 8.382-4.994 5.842 0 10.617 5.384 10.617 12.001zm-27.383 7.48c4.48 0 5.873-6.185 6.096-7.49-.162-1.387-1.26-7.429-6.096-7.429-3.343 0-6.096 3.36-6.096 7.48 0 4.12 2.703 7.48 6.096 7.48zm16.765 0c3.393 0 6.096-3.318 6.096-7.438 0-4.12-2.703-7.48-6.096-7.48-4.786 0-5.903 6.082-6.097 7.428.224 1.367 1.616 7.532 6.097 7.532z" />
                  </g>
                </g>
              </svg>
              <span>所有饰品</span>
            </router-link> -->
            <router-link class="user-info-dropdown-link" to="/user_info/extract_history">
              <i class="el-icon-odometer" style="margin-right: 10px;"></i>
              <span>提取记录</span>
            </router-link>
            <a class="user-info-dropdown-link" href="javascript:;" @click="recharge">
              <i class="el-icon-money" style="margin-right: 10px;"></i>
              <span>充值余额</span>
            </a>
            <router-link class="user-info-dropdown-link" to="/user_info/recharge_record">
              <i class="el-icon-bank-card" style="margin-right: 10px;"></i>
              <span>充值记录</span>
            </router-link>
            <router-link class="user-info-dropdown-link" to="/user_info/partner_history">
              <i class="el-icon-school" style="margin-right: 10px;"></i>
              <span>合作伙伴历史</span>
            </router-link>
            <router-link class="user-info-dropdown-link nav-guoqing " to="/user_tickets">
              <i class="el-icon-sugar" style="margin-right: 10px;"></i>
              <span>我的工单</span>
            </router-link>


            <div class="user-info-dropdown-link" @click="log_out">
              <i class="el-icon-switch-button" style="margin-right: 10px;"></i>
              <span>退出</span>
            </div>
          </div>
        </div>

        <!-- <div class="mobile_recharge_box">

          <div class="user-info-bean price"> <child-component v-html="symbol"></child-component> {{ user.bean }}</div>

          <div class="user-info-right mobile_recharge_btn" @click="recharge"> 充值 </div>
        </div> -->
      </div>

      <div class="login-wrapper" v-else>
        <button class="login-btn" @click="user_login">登录/注册</button>
      </div>
    </div>

    <div class="m-user-info">
      <div v-if="user.id" class="m-user-info-float m-user-info-float-auth" @click="toggleUserInfoSidebar(true)">
        <img :src="repair(user.portrait)" alt="" />
      </div>
      <div v-else class="m-user-info-float m-user-info-float-login" @click="user_login">
        <div>登录</div>
        <div class="m-user-info-float-split">or</div>
        <div>注册</div>
      </div>

      <!-- <div :class="{ 'm-user-info-sidebar': true, active: showUserInfoSidebar }"> -->
      <div class="m-user-info-sidebar">
        <transition name="fade">
          <div v-if="showUserInfoSidebar" class="m-user-info-sidebar-mask" @click="toggleUserInfoSidebar(false)"></div>
        </transition>

        <transition name="slide-fade">
          <div v-if="showUserInfoSidebar" class="m-user-info-sidebar-content">

            <div class="m-user-info-avatar">
              <router-link to="/user_info">
                <img :src="repair(user.portrait)" alt="" />
              </router-link>
            </div>
            <div class="m-user-info-name">{{ user.name }}</div>

            <div class="power"><img src="@/assets/img/huoyan.png" class="huoyan">{{ user.power}}</div>

            <ul class="m-user-info-property">
              <li class="m-user-info-price">
                <child-component v-html="symbol"></child-component>
                <strong>{{ user.bean }}</strong>
              </li>
              <li class="m-user-info-bean">
                <img src="../../assets/img/zs.png" />
                <strong>{{ user.store_bean }}</strong>
              </li>
            </ul>

            <button class="m-user-info-recharge" @click="recharge">
              充 值
            </button>
            <div class="rechage-price">月充值：{{ user.rechage_price_month}}</div>
            <div class="ti-price">月提取：{{ user.ti_price_month}}</div>


            <ul class="m-user-info-tool" @click="toggleUserInfoSidebar(false)">
              <li>
                <router-link to="/user_info">
                  <i class="el-icon-suitcase-1"></i>
                  <span>我的背包</span>
                </router-link>
              </li>
              <li>
                <router-link to="/user_info/all">
                  <svg viewBox="0 0 38 24">
                    <g>
                      <g>
                        <path
                          d="M38 11.998C38 18.615 33.223 24 27.381 24c-4.237 0-6.828-2.549-8.382-5.261-1.555 2.712-4.146 5.26-8.383 5.26C4.775 24 0 18.616 0 12 0 5.38 4.775-.004 10.617-.004 14.106-.02 17.324 1.896 19 4.991c1.675-3.095 4.893-5.012 8.382-4.994 5.842 0 10.617 5.384 10.617 12.001zm-27.383 7.48c4.48 0 5.873-6.185 6.096-7.49-.162-1.387-1.26-7.429-6.096-7.429-3.343 0-6.096 3.36-6.096 7.48 0 4.12 2.703 7.48 6.096 7.48zm16.765 0c3.393 0 6.096-3.318 6.096-7.438 0-4.12-2.703-7.48-6.096-7.48-4.786 0-5.903 6.082-6.097 7.428.224 1.367 1.616 7.532 6.097 7.532z" />
                      </g>
                    </g>
                  </svg>
                  <span>所有饰品</span>
                </router-link>
              </li>
              <li>
                <router-link to="/user_info/extract_history">
                  <i class="el-icon-odometer"></i>
                  <span>提取记录</span>
                </router-link>
              </li>
              <li>
                <a href="javascript:;" @click="recharge">
                  <i class="el-icon-money"></i>
                  <span>充值余额</span>
                </a>
              </li>
              <li>
                <router-link to="/user_info/recharge_record">
                  <i class="el-icon-bank-card"></i>
                  <span>充值记录</span>
                </router-link>
              </li>
              <li>
                <router-link to="/user_info/partner_history">
                  <i class="el-icon-school"></i>
                  <span>合作伙伴历史</span>
                </router-link>
              </li>
              <li>
                <router-link class="nav-play" to="/user_tickets">
                  <i class="el-icon-sugar" style="margin-right: 10px;"></i>
                  <span>我的工单</span>
                </router-link>
              </li>
              <li>
                <div @click="log_out">
                  <i class="el-icon-switch-button"></i>
                  <span>退出</span>
                </div>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>

    <!-- <div class="fixed-nav">
      <el-menu class="fixed-nav-content" unique-opened :default-active="active"
        :class="'page-menu1 ' + [page ? 'page-menu-visible' : '']" text-color="#fff" active-text-color="#8792f1">
        <router-link to="/">
          <el-menu-item index="/">
            <i style="font-size: 20px; " class="el-icon-coordinate "></i>
            <span slot="title">BOX开箱</span>
          </el-menu-item>
        </router-link>
        <router-link to="/battle">
          <el-menu-item index="/battle">
            <i class="el-icon-star-on"></i>
            <span slot="title">Box对战</span>
          </el-menu-item>
        </router-link>
        <router-link to="/lucky">
          <el-menu-item index="/lucky">
            <i class="el-icon-s-marketing"></i>
            <span slot="title">Top升级</span>
          </el-menu-item>
        </router-link>
        <router-link to="/roll">
          <el-menu-item index="/roll">
            <i class="el-icon-s-home"></i>
            <span slot="title">Roll房</span>
          </el-menu-item>
        </router-link>
        <router-link to="/store">
          <el-menu-item index="/store">
            <i class="el-icon-s-shop"></i>
            <span slot="title">商城</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </div> -->

    <div class="broadcast">
      <marquee direction="left" height="30" id="m" onmouseout="m.start()" onMouseOver="m.stop()" scrollamount="2"
        align="center">
        <p>公告：{{ site.notice }}</p>
      </marquee>
    </div>

    <div ref="realtime" class="realtime-warp">
      <div ref="realtimeBox" class="realtime-box" :style="realtimeStyle">
        <div v-for="(item, index) in box_record" :key="index"
          v-if="(profit_status && item.profit_status) || !profit_status" :class="[
            'realtime-contain',
            `realtime-${color(item.ornaments.color, 4)}`
          ]" style="margin-left: -20px;">
          <router-link :to="'/profile/' + item.user.id">
            <i v-if="item.type == 2" class="iconfont ttskins-duizhan realtime-type"></i>
            <i v-else-if="item.type == 3" class="iconfont ttskins-zhuanpanjieguo realtime-type"></i>
            <div class="realtime-quality">
              {{ quality(item.ornaments.quality, 2) }}
            </div>

            <img class="realtime-arms-img" :src="img_url + item.ornaments.img" alt="" />
            <div class="realtime-arms-name">
              <div class="realtime-name">{{ item.ornaments.name }}</div>

              <div class="realtime-quality-text" v-if="item.ornaments.appid == 730">
                {{ abrasion(item.ornaments.abrasion) }}
              </div>
              <div class="realtime-quality-text" v-else>
                {{ quality2(item.ornaments.quality2) }}
              </div>
            </div>

            <div class="realtime-user">
              <img v-if="item.user.portrait" :src="repair(item.user.portrait)" />
              <p v-if="item.user.name">{{ item.user.name }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- <div v-if="is_open_top_box" class="zuijin_box" style="display: flex;">
      <div class="live__buttons">
        <div class="live__btn-wrapper" @click="box_record_profit(true)">
          <button
            :class="'live__btn live__btn--top align-items-center ' + [this.profit_status == true ? 'live__btn--active' : '']"><span
              class="live__btn-text">最佳</span>
            <div class="live__btn-icon">
              <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 16" width="18" height="16">
                <path
                  d="M9 .425a.563.563 0 0 0-.5353.3882L6.8204 5.875H1.4979a.562.562 0 0 0-.5347.3882.5649.5649 0 0 0 .2043.6299l4.3052 3.1281-1.6435 5.0611a.563.563 0 0 0 .5347.7368.5623.5623 0 0 0 .331-.1077L9 12.5833l4.3051 3.1281a.5653.5653 0 0 0 .3311.1077.563.563 0 0 0 .5347-.7368l-1.6443-5.0611 4.3059-3.1281a.5643.5643 0 0 0 .2043-.63.5623.5623 0 0 0-.5346-.3881h-5.3226L9.5355.8132A.563.563 0 0 0 9 .425Zm-1.4326.723c-2.301.4473-4.2283 1.9449-5.258 3.977h1.2964c.81-1.2893 2.065-2.2636 3.5515-2.7144l.4101-1.2627Zm2.8653 0 .4101 1.2626c1.4865.4508 2.7415 1.4251 3.5515 2.7144h1.2964c-1.0297-2.0321-2.957-3.5297-5.258-3.977Zm6.0534 6.9235-1.1294.8203c-.0798 1.293-.5466 2.48-1.2868 3.452l.4072 1.2531c1.2484-1.3391 2.023-3.1255 2.023-5.0969 0-.144-.005-.2867-.014-.4285ZM1.514 8.0723A6.7245 6.7245 0 0 0 1.5 8.5c0 1.9714.7746 3.7574 2.023 5.0969l.4065-1.2524c-.7399-.972-1.2063-2.1589-1.2861-3.452L1.514 8.0724Zm5.8938 6.5947-1.1228.8159C7.1276 15.8133 8.0416 16 9 16c.9586 0 1.8725-.1863 2.7151-.5171l-1.1228-.8159c-.5092.1331-1.0417.208-1.5922.208s-1.083-.0749-1.5923-.208Z"
                  fill="#5F616F"></path>
              </svg>
            </div>
          </button>
        </div>
        <div class="live__btn-wrapper" @click="box_record_profit(false)">
          <button :class="'live__btn live__btn--all ' + [this.profit_status == false ? 'live__btn--active' : '']">
            <span class="live__btn-text">所有</span>
            <div class="live__btn-icon">
              <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 19" width="18" height="19">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M9.5345 5.6644c0-1.8233 1.4781-3.3014 3.3014-3.3014 1.8233 0 3.3014 1.4781 3.3014 3.3014 0 1.8233-1.4781 3.3014-3.3014 3.3014-1.8233 0-3.3014-1.478-3.3014-3.3014ZM1.863 13.3357c0-1.8233 1.4781-3.3014 3.3014-3.3014 1.8233 0 3.3014 1.4781 3.3014 3.3014 0 1.8233-1.478 3.3014-3.3014 3.3014-1.8233 0-3.3014-1.4781-3.3014-3.3014Zm8.6715-3.3014c-.5523 0-1 .4477-1 1v3.6028c0 1.1045.8954 2 2 2h2.6028c1.1045 0 2-.8955 2-2v-3.6028c0-.5523-.4477-1-1-1h-4.6028ZM1.863 3.363c0-.5522.4478-1 1-1h4.6028c.5523 0 1 .4478 1 1v3.6028c0 1.1046-.8954 2-2 2H3.863c-1.1045 0-2-.8954-2-2V3.363Z"
                  fill="#5F616F"></path>
              </svg>
            </div>
          </button>
        </div>
      </div>

      <div class="drop">
        <div v-if="new_max.ornaments && Object.keys(new_max).length > 0" class="o-list o-list-bg o-list-bg-hong"
          style="order: -100;" @mouseover="mouse_over2" @mouseleave="mouse_leave2">
          <router-link :to="'/profile/' + new_max.user.id">
            <div class="o-item" style="background-color: rgb(63 63 63 / 20%);"
              :style="new_max.move == true ? 'background-color: rgb(0 0 0 / 30%);' : ''">
              <div class="o-header">
                <div class="o-header-left">
                  <div style="font-size: 12px;color: rgb(182 182 48);">{{ new_max.time }}</div>
                  <template v-if="new_max.type == 2">
                    <i class="iconfont ttskins-duizhan" style="color: #f7dd73;"></i>
                  </template>
                  <template v-else-if="new_max.type == 3">
                    <i class="iconfont ttskins-zhuanpanjieguo" style="color: #f7dd73;"></i>
                  </template>
                </div>
                <div class="o-header-right">{{ quality(new_max.ornaments.quality, 2) }}</div>
              </div>
              <div class="o-body">
                <svg class="o-bg" viewBox="0 0 87 107">
                  <path d="M83.1 107.3l-61.8-74L87.3 0l-4.2 107.3z" fill-opacity=".04"></path>
                  <path d="M67.7 70.1l-57.5 32.6 11.3-61.3 46.2 28.7z" fill-opacity=".13"></path>
                  <path d="M67.3 63.5L27 74.5l14.3-37.4 26 26.4z" fill-opacity=".02"></path>
                  <path d="M85.5 79.1L51 106.6l29.6-37.4 4.9 9.9z" fill-opacity=".2"></path>
                  <path d="M19.6 72.9L0 52.9l24.1 2-4.5 18z" fill-opacity=".07"></path>
                </svg>
                <template v-if="new_max.move == true">
                  <img class="o-img2" :src="img_url + new_max.box_img" alt="">
                  <div class="o-user-info">
                    <img class="o-user-avatar" :src="repair(new_max.user.portrait)" />
                    <div class="o-user-name">{{ new_max.user.name }}</div>
                  </div>
                </template>
                <template v-else>
                  <img class="o-img" :src="img_url + new_max.ornaments.img" alt="">
                </template>
              </div>
              <div class="o-name">{{ new_max.ornaments.name }}</div>
              <div class="o-abrasion" v-if="new_max.ornaments.appid == 730">{{ abrasion(new_max.ornaments.abrasion) }}
              </div>
              <div class="o-abrasion" v-else>{{ quality2(new_max.ornaments.quality2) }}</div>
            </div>
          </router-link>
        </div>
        <div :class="'o-list o-list-bg o-list-bg-' + color(item.ornaments.color, 4)" :style="'order: ' + item.order + ';'"
          v-for="(item, index) in box_record" :key="index" v-if="(profit_status && item.profit_status) || !profit_status"
          @mouseover="mouse_over(index)" @mouseleave="mouse_leave(index)">
          <router-link :to="'/profile/' + item.user.id">
            <div class="o-item" :style="item.move == true ? 'background-color: rgb(0 0 0 / 30%);' : ''">
              <div class="o-header">
                <div class="o-header-left">
                  <template v-if="item.type == 2">
                    <i class="iconfont ttskins-duizhan" style="color: #f7dd73;"></i>
                  </template>
                  <template v-else-if="item.type == 3">
                    <i class="iconfont ttskins-zhuanpanjieguo" style="color: #f7dd73;"></i>
                  </template>
                </div>
                <div class="o-header-right">{{ quality(item.ornaments.quality, 2) }}</div>
              </div>
              <div class="o-body">
                <svg class="o-bg" viewBox="0 0 87 107">
                  <path d="M83.1 107.3l-61.8-74L87.3 0l-4.2 107.3z" fill-opacity=".04"></path>
                  <path d="M67.7 70.1l-57.5 32.6 11.3-61.3 46.2 28.7z" fill-opacity=".13"></path>
                  <path d="M67.3 63.5L27 74.5l14.3-37.4 26 26.4z" fill-opacity=".02"></path>
                  <path d="M85.5 79.1L51 106.6l29.6-37.4 4.9 9.9z" fill-opacity=".2"></path>
                  <path d="M19.6 72.9L0 52.9l24.1 2-4.5 18z" fill-opacity=".07"></path>
                </svg>
                <template v-if="item.move == true">
                  <img class="o-img2" :src="img_url + item.box_img" alt="">
                  <div class="o-user-info">
                    <img class="o-user-avatar" :src="repair(item.user.portrait)" />
                    <div class="o-user-name">{{ item.user.name }}</div>
                  </div>
                </template>
                <template v-else>
                  <img class="o-img" :src="img_url + item.ornaments.img" alt="">
                </template>
              </div>
              <div class="o-name">{{ item.ornaments.name }}</div>
              <div class="o-abrasion" v-if="item.ornaments.appid == 730">{{ abrasion(item.ornaments.abrasion) }}
              </div>
              <div class="o-abrasion" v-else>{{ quality2(item.ornaments.quality2) }}</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div style=" color: #fff; text-align: center;line-height: 40px" v-if="is_open_top_box"
      @click="is_open_top_box = false">
      &#9650;
    </div>
    <div style=" color: #fff; text-align: center; line-height: 40px;" v-if="!is_open_top_box"
      @click="is_open_top_box = true">
      &#9660;
    </div> -->

    <div class="page-nav-right">
      <a v-if="site.qq_group" :href="site.qq_group" target="_blank" style="display: flex; align-items: center;">
        <img class="partner-ui" src="../../assets/img/img1/jiaru.png" alt="" />
        <span class="page-nav-right-title">加入Q群</span>
      </a>
      <router-link to="/partner" style="display: flex;align-items: center;">
        <img class="partner-ui" src="../../assets/img/img1/hezuo.png" alt="" />
        <span class="page-nav-right-title">合作伙伴</span>
      </router-link>

      <router-link to="/support" @click.native="page_close" style="display: flex;align-items: center;">
        <img class="partner-ui" src="../../assets/img/img1/kehu.png" alt="" />
        <span class="page-nav-right-title">客户支持</span>
      </router-link>
      <div class="user-info-dropdown-link" @click="log_out" v-if="this.get_all_width < 990">
        <svg viewBox="0 0 29 25">
          <g>
            <g>
              <path
                d="M17.265.005v8.26h-2.778V2.787H2.771v19.387h11.675V16.7h2.777V25H-.007V.005zm2.818 17.483l3.607-3.615H10.057V11.09H23.69l-3.607-3.615 1.949-1.953 6.01 5.983.954.997-.953.998-5.97 5.983z" />
            </g>
          </g>
        </svg>
        <span style="font-size: 15px; font-weight: 600;">退出</span>
      </div>
    </div>

    <template>
      <div id="left-nav-box" class="left-nav-box eft-nav-box1" :style="'right:' + show_left_num">
        <div class="left-nav-btn" @click="showRight()">
          <i :class="'el-icon-arrow-' + fangxiang"></i>
        </div>
        <div id="red-btn" class="red-envelope icon-btn" @click="rechargeDo" style="top: 30%;">
          <img src="../../assets/img/welfare.acdbf64.png" alt="" />
          <p>福利中心</p>
        </div>
        <div id="ann-btn" class="announcement-icon icon-btn" @click="showGg">
          <img src="../../assets/img/acc.abc991d.png" alt="" />
          <p>公告</p>
        </div>
        <div class="online-service icon-btn">
          <img src="../../assets/img/customer.3e31bb6.png" @click="dump2qq" alt="" />
          <p>在线客服</p>
        </div>
        <div class="joinQQ icon-btn">
          <img src="../../assets/img/qqgroup.15ca4bf.png" @click="dump2qqQun" alt="" />
          <p>官方Q群</p>
        </div>
        <div class="joinQQ icon-btn do-recharge" style="display:none;">
          <img ass="user-info-wallet" src="@/assets/img/wallet.png" alt="" @click="recharge" />
          <p>充值</p>
        </div>
      </div>
    </template>

    <el-dialog class="recharge-dialog" append-to-body :visible.sync="recharge_page" :close-on-click-modal="false"
      :lock-scroll="false">
      <div class="recharge-info">
        <el-radio-group v-model="recharge_type" style="margin-bottom: 20px;">
          <!-- <el-radio-button label="CDK"></el-radio-button> -->
          <p style="color:#fff;text-align: center; font-size: 28px;">
            支付宝/微信充值
          </p>
        </el-radio-group>
        <template v-if="recharge_type == '支付宝充值'">
          <div v-if="pay_type == 'cdk充值'" class="recharge-arr">
            <div style="width: 100%;text-align: center;">
              <img src="../../assets/img/ewcode.jpg" alt="" style="width:150px;height:150px;">
            </div>
            <div style="color:#fff;margin:auto;text-align:center;"></div>
          </div>
          <div v-else class="recharge-arr">
            <button :class="
                'recharge-arr-btn ' +
                  [recharge_arr_index == index ? 'active' : '']
              " v-for="(item, index) in recharge_arr" @click="recharge_arr_switch(index)" :key="index">
              <div class="price_box ">
                <child-component v-html="symbol"></child-component>
                {{ item.amount }}
              </div>
              <div v-if="item.give_ratio > 0" style="font-size: 12px;">
                充值赠送 {{ item.give_ratio }}%
              </div>
              <div v-if="item.extra_give > 0" style="font-size: 12px;">
                额外赠送 <child-component v-html="symbol"></child-component>{{ item.extra_give }}
              </div>
            </button>>
          </div>
          <el-radio-group v-model="pay_type" style="margin-bottom: 20px; margin-top: 20px;">
            <!-- <el-radio-button  name label="支付宝渠道1"></el-radio-button> -->
            <!-- <el-radio-button style=""  name label="支付宝渠道1"></el-radio-button> -->
            <!-- //jiujia -->
            <el-radio-button style="" name label="支付渠道2"></el-radio-button>
            <!-- //zfk -->
            <el-radio-button style="" name label="cdk充值"></el-radio-button>
            <!-- cdk -->
          </el-radio-group>
          <button class="recharge-btn" style="width:80%;margin-left:10%" @click="to_recharge">
            充值
          </button>
        </template>
        <template v-else>
          <input class="recharge-input" type="text" v-model="cdk" placeholder="请输入CDK" />
          <button type="info" class="recharge-btn" style="width:80%; " @click="to_cdk">
            充值
          </button>
        </template>
      </div>
    </el-dialog>

    <el-dialog class="recharge-dialog" append-to-body :visible.sync="xieyi_show">
      <div class="recharge-info" style="padding:10px">
        <p style="color:#fff;text-align: center; font-size: 28px;">充值协议</p>
        <p style="text-align:left">本人已满18岁且具有完全民事行为能力</p>
        <p style="text-align:left">
          本人仅在经济承受范围内消费，且将为消费行为承担后果对
        </p>
        <p style="text-align:left">
          本人已知通过充值购买的虚拟物品不可退货或换货，且不根据七天无理由退换货主张权利
        </p>
        <p style="text-align:left">
          本人已知饰品发起提取流程后，通常在24小时完成
        </p>
        <p style="text-align:left">
          本人已知饰品发起提取流程后，通常在24小时完成
        </p>
        <div style="margin:auto;text-align: center;">
          <button type="info" @click="tongyi_xieyi_ok" style="width:80%;margin-left: 10%;" class="recharge-btn">
            已阅读并同意协议
          </button>
        </div>
      </div>
    </el-dialog>

    <!--cdk充值-->
    <el-dialog class="recharge-dialog pay-img" append-to-body title="cdk充值" :visible.sync="cdk_page"
      :close-on-click-modal="false" :lock-scroll="false">
      <div>
        <el-form ref="cdk_form" :rules="cdk_rule" :model="cdk_form">
          <el-row>
            <el-col :span="24">
              <el-form-item label="cdkkey" prop="cdkey">
                <el-input class="recharge-input" v-model="cdk_form.cdkey" placeholder="请输入CDKEY"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <button class="recharge-btn recharge-btn3" @click="cdk_submit">确定充值</button>
    </el-dialog>
    <!--cdk充值-->
    <el-dialog class="recharge-dialog pay-img" append-to-body :title="title" :visible.sync="recharge_page2"
      :close-on-click-modal="false" :lock-scroll="false">
      <div class="recharge-info">
        <img :src="pay_img" alt="">
      </div>
      <div style="color:#fff;margin:auto;text-align:center;">{{title}}</div>
    </el-dialog>
    <el-dialog align="center" class="recharge-dialog" title="" append-to-body :visible.sync="login_page"
      :close-on-click-modal="false" :lock-scroll="false" width="50%">
      <div class="left-img-box">
      </div>
      <div class="recharge-info">
        <img :src="pay_img" alt="" />
      </div>
      <div style="color:#fff;margin:auto;text-align:center;">{{ title }}</div>
    </el-dialog>
    <el-dialog align="center" class="recharge-dialog" title="" append-to-body :visible.sync="login_page"
      :close-on-click-modal="false" :lock-scroll="false" width="50%">
      <div class="left-img-box"></div>
      <div class="recharge-info1">
        <el-form ref="login_form" :rules="login_rule" :model="login_form">
          <el-row>
            <el-col :span="24">
              <el-form-item prop="phone">
                <el-input class="recharge-input" v-model="login_form.phone" placeholder="手机号码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="password">
                <el-input type="password" v-model="login_form.password" placeholder="登录密码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <button class="recharge-btn recharge-btn3" @click="login">登录</button>
        <div class="login-option">
          <div @click="user_forgot">忘记密码?</div>
          <div @click="user_register">注册账号>></div>
        </div>
        <div class="steam-login">
          <i class="iconfont ttskins-steam" @click="steam_login"></i>
          <div class="steam-login-txt">Steam登录</div>
        </div>
        <div class="login-tips">中国大陆用户访问 Steam 需要借助游戏加速器</div>
      </div>
    </el-dialog>
    <el-dialog align="center" class="recharge-dialog" title="忘记密码" append-to-body :visible.sync="forgot_page"
      :close-on-click-modal="false" :lock-scroll="false" width="500px">
      <div class="recharge-info">
        <el-form ref="forgot_form" :rules="forgot_rule" :model="forgot_form">
          <el-row>
            <el-col :span="24">
              <el-form-item prop="phone">
                <el-input v-model="forgot_form.phone" placeholder="手机号码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="password">
                <el-input type="password" v-model="forgot_form.password" placeholder="新密码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="vif">
                <el-input v-model="forgot_form.vif" placeholder="验证码">
                  <el-button slot="append" icon="el-icon-s-promotion" @click="get_vif2"></el-button>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <button class="recharge-btn recharge-btn3" @click="forgot">
          重置密码
        </button>
        <div class="login-option">
          <div @click="user_login">又想起来了>></div>
        </div>
      </div>
    </el-dialog>
    <el-dialog class="announcement-dialog" :visible.sync="gonggao_page" append-to-body width="500px">
      <div class="con">
        <div style="color:#fff;" class="ann-content">{{ site.notice }}</div>
      </div>
    </el-dialog>
    <el-dialog align="center" class="recharge-dialog" title="手机注册" append-to-body :visible.sync="register_page"
      :close-on-click-modal="false" :lock-scroll="false" width="500px">
      <div class="recharge-info">
        <el-form ref="register_form" :rules="register_rule" :model="register_form">
          <el-row>
            <el-col :span="24">
              <el-form-item prop="phone">
                <el-input v-model="register_form.phone" placeholder="手机号码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="password">
                <el-input type="password" v-model="register_form.password" placeholder="登录密码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="vif">
                <el-input v-model="register_form.vif" placeholder="验证码">
                  <el-button slot="append" icon="el-icon-s-promotion" @click="get_vif"></el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <el-input type="text" v-model="register_form.invitation_code" placeholder="邀请码 可不填"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <button class="recharge-btn recharge-btn3" @click="register">
          注册
        </button>
        <div class="login-option">
          <div @click="user_login">已有账号?点击登录>></div>
        </div>
      </div>
    </el-dialog>
    <!-- <div class="fixed-nav1"> -->
    <!-- <el-menu  unique-opened :default-active="active" :class="'page-menu1 ' + [page ? 'page-menu-visible' : '']"
          text-color="#fff" active-text-color="#8792f1" >
          <router-link to="/store" >
            <el-menu-item index="/store"  >
              <i class="iconfont ttskins-shangcheng"></i>
              <span slot="title">商城</span>
            </el-menu-item>
          </router-link>
          <router-link to="/signin"  >
            <el-menu-item index="/signin">
              <i style="font-size: 20px; " class="el-icon-s-claim "></i>
              <span slot="title">签到</span>
            </el-menu-item>
          </router-link>
          <router-link to="/activity" >
            <el-menu-item index="/activity">
              <i style="font-size: 20px; " class="el-icon-s-claim "></i>
              <span slot="title">玩家活动</span>
            </el-menu-item>
          </router-link>
          <router-link to="/membervip"  >
            <el-menu-item index="/membervip">
              <i style="font-size: 20px; " class="el-icon-s-claim "></i>
              <span slot="title">VIP</span>
            </el-menu-item>
          </router-link>
        </el-menu> -->
    <!-- </div> -->
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
    repair,
    rsa_encrypt,
    generateMixed
  } from "@/utils/util.js";
  import {
    getStore,
    removeStore,
    setStore
  } from "@/utils/store.js";
  // import { computed, onMounted } from "vue";
  export default {
    data() {
      return {
        isSmallScreen: false,

        realtimeStyle: {},
        showUserInfoSidebar: false,

        xieyi_show: false,
        tongyi_xieyi: false,
        is_open_top_box: true,
        activeId: 0,
        server_url: this.$server_url,
        img_url: this.$img_url,
        symbol: getStore({
          name: "symbol"
        }),
        site: {},
        recharge_arr: [],
        recharge_arr_index: 0,
        active: "/",
        logo: "",
        game_type: 1,
        box_record_status: false,
        box_record: [],
        profit_status: false,
        new_max: {},
        user: {},
        page: false,
        recharge_page: false,
        recharge_page2: false,
        recharge_type: "支付宝充值",
        pay_type: "支付渠道2",
        pay_img: "",
        cdk: "",
        right_is_show: true,
        show_left_num: "0rem",
        get_all_width: 0,
        fangxiang: "right",
        login_page: false,
        login_form: {
          phone: "",
          password: ""
        },
        login_rule: {
          phone: [{
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
          }],
          password: [{
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }]
        },
        forgot_page: false,
        forgot_form: {
          phone: "",
          password: "",
          vif: ""
        },
        forgot_rule: {
          phone: [{
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
          }],
          password: [{
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }],
          vif: [{
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }]
        },
        register_page: false,
        register_form: {
          phone: "",
          password: "",
          vif: "",
          invitation_code: "",
          link_code: ""
        },
        register_rule: {
          phone: [{
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
          }],
          password: [{
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }],
          vif: [{
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }]
        },
        gonggao_page: false, //公告
        menu_status: false,
        mobile_menu_status: false,
        ws: {},
        ws_close_manual: false, //是否手动关闭
        // 轮播
        roll_height: "300",
        link_code: "",
        title: "支付宝付款",
        cdk_form: {
          cdkkey: ""
        },
        cdk_page: false,
        cdk_rule: {
          cdkey: [{
            required: true,
            message: "请输入cdkkey",
            trigger: "blur",
          }, ],
        },
        recharge_display: ""
        //
      };
    },
    computed: {
      checkScreenSize() {
        return window.innerWidth <= 768;
      }
    },

    watch: {
      box_record: {
        handler(value) {
          const wrapWidth = this.$refs.realtime.clientWidth;
          const boxWidth = this.$refs.realtimeBox.clientWidth;
          var speed = 100;
          const left = wrapWidth - boxWidth;
          if (left >= 0) {
            return {
              left: 0,
              transitionDuration: "unset"
            };
          }

          this.realtimeStyle = {
            left: left + "px",
            transitionDuration: Math.floor((Math.abs(left) / speed) * 1000) + "ms"
          };
        },
        deep: true,
        immerent: true
      }
    },
    mounted() {
      // 监听窗口大小变化
      window.addEventListener("resize", this.handleResize);
      this.isSmallScreen = this.checkScreenSize;
      this.get_global();

      this.get_all_width = this.$refs.allWidth.clientWidth;
      window.onresize = () => {
        this.get_all_width = this.$refs.allWidth.clientWidth;
      };

      //选中记录
      setInterval(() => {
        this.active = this.$router.currentRoute.path;
      }, 500);
      //开箱记录
      this.get_box_record();
      this.log_get_box_record();
      //邀请码
      let invitation_code = this.$route.query.invitation_code;
      if (invitation_code) {
        this.register_form.invitation_code = invitation_code;
      }
      //邀请码
      let link_code = this.$route.query.link_code;
      if (link_code) {
        this.link_code = link_code;
      }
      //登录jwt
      let jwt_token = this.$route.query.jwt_token;
      if (jwt_token) {
        setStore({
          name: "jwt_token",
          content: jwt_token
        });
        let newQuery = JSON.parse(JSON.stringify(this.$route.query)); // 先拷贝一个一模一样的对象
        delete newQuery.jwt_token; //再删除jwt_token
        this.$router.replace({
          query: newQuery
        }); //再把新的替换了
      }
      this.get_me();
    },
    destroyed() {
      this.ws_close_manual = false;
      this.ws.close();
      window.removeEventListener("resize", this.handleResize);
    },

    methods: {
      abrasion,
      quality,
      quality2,
      color,
      repair,
      // 判断是否是移动端
      handleResize() {
        this.isSmallScreen = this.checkScreenSize;
      },
      toggleUserInfoSidebar(status) {
        this.showUserInfoSidebar = status;
        console.log("s", status);
      },

      //获取全局设置
      get_global() {
        ttGet("/api.php/common/get_global", "", res => {
          if (res.code == 200) {
            console.log("=================");
            console.log(res.data.site.symbol);
            setStore({
              name: "symbol",
              content: res.data.site.symbol
            });
            setStore({
              name: "site",
              content: res.data.site
            });
            this.site = res.data.site;
            this.recharge_arr = res.data.recharge;
            this.symbol = res.data.site.symbol;
            document.title = res.data.site.web_name;
            this.logo = this.server_url + "/public/uploads/" + res.data.site.logo;
            document
              .querySelector('meta[name="keywords"]')
              .setAttribute("content", res.data.site.keywords);
            document
              .querySelector('meta[name="description"]')
              .setAttribute("content", res.data.site.description);
            document
              .querySelector('link[rel="icon"]')
              .setAttribute(
                "href",
                this.server_url + "/public/uploads/" + res.data.site.ico
              );
          }
        });
      },

      //获取用户信息
      get_me() {
        let jwt_token = getStore({
          name: "jwt_token"
        });
        if (jwt_token) {
          ttGet("/api.php/user/user_info", "", res => {
            if (res.code == 200) {
              this.user = res.data.user;
              console.log(this.user.invitation_code, "@@@@@@@");
            } else {
              removeStore({
                name: "jwt_token"
              });
            }
          });
        }
      },

      //游戏类型切换
      game_type_change() {
        let game_type = this.game_type;
        this.$emit("game_type_change", {
          game_type: game_type
        });
      },
      // recharge(){
      // 	  this.recharge_page = true;
      // 	  this.$emit("recharge", { recharge_page: recharge_page });
      // },
      log_get_box_record() {
        ttGet("/api.php/index/get_box_record", {}, res => {
          this.box_record_status = true;
          if (res.code == 200) {
            let new_max = res.data.new_max || {};
            new_max.move = false;
            this.new_max = new_max;
            let new_list = this.box_record.concat(res.data.list);
            let length = new_list.length;
            for (let x in new_list) {
              let index = length - (length + Number(x));
              new_list[x].order = index;
              new_list[x].move = false;
            }
            this.box_record = new_list;
            // setTimeout(() => {
            //   if (length > 35) {
            //     new_list.splice(0, 35);
            //     for (let x in new_list) {
            //       let index = length - (length + Number(x));
            //       new_list[x].order = index;
            //     }
            //     this.box_record = new_list;
            //   }
            // }, 500);
          } else {
            this.$message({
              message: res.msg,
              type: "warning"
            });
          }
        });
      },
      //调用开箱记录
      get_box_record() {
        let profit_status = this.profit_status;
        this.ws = ttWebSocket(
          "get_box_record", {
            profit_status: profit_status
          },
          res => {
            this.box_record_status = true;
            if (res.code == 200) {
              let new_max = res.data.new_max;
              new_max.move = false;
              this.new_max = new_max;
              let new_list = this.box_record.concat(res.data.list);
              // console.log('>>> ws', this.box_record, res.data.list)
              let length = new_list.length;
              for (let x in new_list) {
                let index = length - (length + Number(x));
                new_list[x].order = index;
                new_list[x].move = false;
              }
              this.box_record = new_list;

              // setTimeout(() => {
              //   if (length > 35) {
              //     new_list.splice(0, 35);
              //     for (let x in new_list) {
              //       let index = length - (length + Number(x));
              //       new_list[x].order = index;
              //     }
              //     this.box_record = new_list;
              //   }
              // }, 500);
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

      //移入
      mouse_over(index) {
        this.box_record[index].move = true;
      },

      //移出
      mouse_leave(index) {
        this.box_record[index].move = false;
      },

      //移入
      mouse_over2(index) {
        this.new_max.move = true;
      },

      //移出
      mouse_leave2(index) {
        this.new_max.move = false;
      },

      //切换开箱记录类型
      box_record_profit(profit_status) {
        // this.ws_close_manual = true;
        // this.ws.close();
        this.profit_status = profit_status;
        this.box_record_status = false;

        // this.box_record = [];
        // this.get_box_record();
      },

      dump2qq() {
        window.open(
          "http://wpa.qq.com/msgrd?v=3&uin=" +
          this.site.qq_kefu +
          "&site=qq&menu=yes"
        );
      },
      dump2qqQun() {
        window.open(this.site.qq_group);
      },
      showGg() {
        this.gonggao_page = true;
      },
      //悬浮隐藏和显示
      showRight() {
        let is_show = this.right_is_show;
        console.log("是否：" + is_show);
        if (is_show) {
          this.right_is_show = false;
          if (this.get_all_width <= 720) {
            this.show_left_num = "-4rem";
          } else {
            this.show_left_num = "-7rem";
          }

          this.fangxiang = "left";
        } else {
          this.right_is_show = true;
          this.show_left_num = "0rem";
          this.fangxiang = "right";
        }
      },

      //账号登录
      user_login() {
        console.log("登陆操作");
        this.login_form = {
          phone: "",
          password: ""
        };
        this.login_page = true;
        this.forgot_page = false;
        this.register_page = false;
      },

      //登录
      login() {
        this.$refs.login_form.validate(valid => {
          if (valid) {
            let login_form = this.login_form;
            let loading = this.$loading({
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            ttPost(
              "/api.php/login/login", {
                phone: login_form.phone,
                password: login_form.password
              },
              res => {
                loading.close();
                if (res.code == 200) {
                  setStore({
                    name: "jwt_token",
                    content: res.data.jwt_token
                  });
                  this.get_me();
                  this.login_page = false;
                  this.$message({
                    message: res.msg,
                    type: "success"
                  });
                  //location.reload();
                } else {
                  this.$message({
                    message: res.msg,
                    type: "warning"
                  });
                }
              }
            );
          }
        });
      },

      //用户忘记密码
      user_forgot() {
        this.forgot_form = {
          phone: "",
          password: "",
          vif: ""
        };
        this.login_page = false;
        this.forgot_page = true;
      },

      //用户忘记密码获取验证码
      get_vif2() {
        let phone = this.forgot_form.phone;
        if (!phone) {
          return this.$message({
            message: "请输入手机号码",
            type: "warning"
          });
        }
        let loading = this.$loading({
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        ttPost(
          "/api.php/login/get_vif2", {
            phone: phone
          },
          res => {
            loading.close();
            if (res.code == 200) {
              this.$message({
                message: res.msg,
                type: "success"
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

      //重置密码
      forgot() {
        this.$refs.forgot_form.validate(valid => {
          if (valid) {
            let forgot_form = this.forgot_form;
            let loading = this.$loading({
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            ttPost(
              "/api.php/login/forgot", {
                phone: forgot_form.phone,
                password: forgot_form.password,
                vif: forgot_form.vif
              },
              res => {
                loading.close();
                if (res.code == 200) {
                  this.user_login();
                  this.$message({
                    message: res.msg,
                    type: "success",
                    customClass: "hierarchy"
                  });
                } else {
                  this.$message({
                    message: res.msg,
                    type: "warning"
                  });
                }
              }
            );
          }
        });
      },

      //用户注册
      user_register() {
        this.register_form = {
          phone: "",
          password: "",
          vif: ""
        };
        this.login_page = false;
        this.register_page = true;
      },

      //用户注册获取验证码
      get_vif() {
        let phone = this.register_form.phone;
        if (!phone) {
          return this.$message({
            message: "请输入手机号码",
            type: "warning"
          });
        }
        let loading = this.$loading({
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        ttPost(
          "/api.php/login/get_vif", {
            phone: phone
          },
          res => {
            loading.close();
            if (res.code == 200) {
              this.$message({
                message: res.msg,
                type: "success"
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

      //注册账号
      register() {
        this.$refs.register_form.validate(valid => {
          if (valid) {
            let register_form = this.register_form;
            let loading = this.$loading({
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            ttPost(
              "/api.php/login/register", {
                phone: register_form.phone,
                password: register_form.password,
                vif: register_form.vif,
                invitation_code: register_form.invitation_code,
                code: this.link_code
              },
              res => {
                loading.close();
                if (res.code == 200) {
                  setStore({
                    name: "jwt_token",
                    content: res.data.jwt_token
                  });
                  this.get_me();
                  this.register_page = false;
                  this.$message({
                    message: res.msg,
                    type: "success"
                  });
                } else {
                  this.$message({
                    message: res.msg,
                    type: "warning"
                  });
                }
              }
            );
          }
        });
      },

      //steam账号登录
      steam_login() {
        let loading = this.$loading({
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        ttPost("/api.php/login/steam_login", "", res => {
          loading.close();
          if (res.code == 200) {
            this.login_page = false;
            window.location.href = res.data.auth_url;
          } else {
            this.$message({
              message: res.msg,
              type: "warning"
            });
          }
        });
      },

      //退出登录
      log_out() {
        removeStore({
          name: "jwt_token"
        });
        this.user = {};
        // this.page = false;
      },

      //页面显示
      // page_show() {

      //   this.page = true;

      // },

      //页面关闭

      tongyi_xieyi_ok() {
        let token = getStore({
          name: "jwt_token"
        });

        if (token) {
          this.xieyi_show = false;
          this.tongyi_xieyi = true;
          this.recharge_page = true;
        } else {
          this.$message({
            message: "您还没有登录",
            type: "error"
          });
        }
      },

      //打开充值页面
      recharge() {
        let token = getStore({
          name: "jwt_token"
        });

        if (token) {
          if (this.user.shimin_status != 2) {
            this.$message({
              message: "请先完成实名认证！",
              type: "error"
            });
          } else {
            this.xieyi_show = true;
          }
        } else {
          this.$message({
            message: "您还没有登录",
            type: "error"
          });
        }
      },
      //打开充值页面
      rechargeDo() {
        this.$router.push("/official");
        // this.recharge_type = "CDK";
        // let token = getStore({
        //   name: "jwt_token",
        // });

        // if (token) {
        //   // this.recharge_page = true;

        // } else {
        //   this.$message({
        //     message: "您还没有登录",
        //     type: "error",
        //   });
        // }
      },

      //切换充值金额
      recharge_arr_switch(index) {
        this.recharge_arr_index = index;
      },

      //去充值
      to_recharge() {
        let id = this.recharge_arr[this.recharge_arr_index].id;
        if (!id) {
          return this.$message({
            message: "请选择正确的充值金额!",
            type: "warning"
          });
        }
        let loading = this.$loading({
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });

        //支付渠道 1= 九家支付  2=富信网络  3=早发卡
        //var pay_type = this.pay_type == "支付宝渠道1"?"2":"1";
        var pay_type;
        console.log(this.pay_type)
        switch (this.pay_type) {
          case "支付宝渠道1":
            pay_type = 1;
            break;
          case "支付渠道2":
            pay_type = 3;
            break;
          case "cdk充值":
            pay_type = 99;
            break;
        }
        if (pay_type == 99) {
          this.cdk_page = true;
        } else {
          ttPost(
            "/api.php/user/to_recharge", {
              id: id,
              pay_type: pay_type,
            },
            (res) => {
              loading.close();
              if (res.code == 200) {
                let pay_type = res.data.pay_type;
                let order = res.data.order;
                if (res.data.ifZfb == 1) {
                  this.title = "支付宝支付";
                } else {
                  this.title = "微信支付";
                }
                if (pay_type == 1) {
                  let jumpUrl = res.data.jumpUrl;
                  console.log('跳转' + jumpUrl);
                  window.location.href = jumpUrl;
                } else if (pay_type == 2 || pay_type == 3) {
                  console.log("paywwwwwwwww");
                  this.recharge_page = false;
                  this.recharge_page2 = true;
                  this.pay_img = res.data.pay_img;
                  var that = this;
                  let timer = setInterval(function() {
                    ttPost(
                      "/api.php/user/pay_query", {
                        order: order,
                      },
                      (res) => {
                        //console.log('用户',that.user)
                        if (res.code == 200) {
                          clearInterval(timer);
                          that.user.bean = res.data.balance;
                          that.recharge_page2 = false;
                          that.$message({
                            message: res.msg,
                            type: "success",
                          });
                        }
                      }
                    );
                  }, 5000);
                }
              } else {
                this.$message({
                  message: res.msg,
                  type: "warning",
                });
              }
            }
          );
        }
      },
      //cdk充值
      to_cdk() {
        let cdk = this.cdk;
        if (!cdk) {
          return this.$message({
            message: "请输入cdk!",
            type: "warning",
          });
        }
        let loading = this.$loading({
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        ttPost(
          "/api.php/user/to_cdk", {
            cdk: cdk,
          },
          (res) => {
            loading.close();
            if (res.code == 200) {
              this.user.bean = res.data.balance;
              this.recharge_page = false;
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
          }
        );
      },
      //自定义的CDK充值
      cdk_submit() {
        this.$refs.cdk_form.validate((valid) => {
          if (valid) {
            let cdk_form = this.cdk_form;
            let loading = this.$loading({
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)",
            });
            var dates = new Date();
            var times = dates.getTime();
            var random = generateMixed(4);
            var sign = rsa_encrypt(times + "-" + cdk_form.cdkey + "-" + random);
            ttPost(
              "/api.php/cdkey/cdk_back", {
                cdkey: cdk_form.cdkey,
                times: times,
                random: random,
                sign: sign
              },
              (res) => {
                loading.close();
                if (res.code == 200) {
                  this.$message({
                    message: "充值成功",
                    type: "success",
                  });
                  this.recharge_page = false;
                  this.cdk_page = false;
                  this.user.bean = res.data.surplus;
                } else {
                  this.$message({
                    message: res.msg,
                    type: "warning",
                  });
                }
              }
            );
          }
        });
      }
    },
  };
</script>

<style lang="scss" scoped>
  @import "navbar.scss";
</style>

<style scoped>
  .rechage-price {
    padding-left: 12px;
    font-size: 14px;
    margin-bottom: 5px;
  }

  .ti-price {
    padding-left: 12px;
    font-size: 14px;
  }


  .m-user-info-price /deep/ .symbol {
    width: 16px;
    vertical-align: bottom;
  }

  /deep/ .el-dialog {
    width: 30.5rem;
    min-height: 35.25rem;

    border-radius: 0.9375rem;
    box-sizing: border-box;
    padding-top: 2.0625rem;
    padding-left: 2.0625rem;
    padding-right: 2.0625rem;
    background: linear-gradient(180deg,
        rgba(16, 16, 16, 0.61) 0,
        rgba(0, 0, 0, 0.9));
    position: relative;
  }

  .user-info-bean {}



  .user-info-bean /deep/ .symbol {
    width: 15px;
    padding-top: 5px;
    float: left;
    margin-right: 5px;
  }

  .recharge-arr-btn /deep/ .symbol {
    width: 18px;
    padding-top: 0px;
    float: left;
  }

  .mobile_recharge_box {
    display: none;
  }

  @media only screen and (max-width: 980px) {
    .mobile_recharge_box {
      display: flex;
      flex-direction: column;
      margin-top: 15px;
      margin-left: 10px;
    }

    .mobile_recharge_btn {
      display: block;
      font-size: 12px;
      height: 24px;
      line-height: 24px;
      margin-right: 10px;
      margin-top: 0px;
    }

    .user-info-info {
      display: none;
    }
  }

  .page-nav-right {
    display: none;
  }


  .power {
    margin-bottom: 20px;
    text-align: center;
  }


  .power img {
    width: 28px;
    padding-top: 3px;
    margin-right: 5px;
    /* top: -15px; */
  }
</style>