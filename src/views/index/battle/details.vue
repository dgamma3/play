<template>
  <div>
    <template v-if="loadingIndex">
      <div class="text-center">
        <i class="el-icon-loading data-loading"></i>
      </div>
    </template>
    <template v-else>
      <div class="battle">
        <div class="battle-container">
          <div class="battle-header">
            <h2 class="battle-title">
              <el-icon class="el-icon-star-on"></el-icon>
              <span>
                {{ battle.battle_type == "1" ? "欧皇" : "非酋" }}对战</span
              >
            </h2>
            <router-link v-if="isSmallScreen" class="battle-back" to="/battle">
              <span style="line-height: 30px;">返回</span>
            </router-link>
            <div class="battle-meta">
              <a href="#" class="battle-link">
                <svg class="icon-chain" viewBox="0 0 36 34">
                  <g>
                    <g>
                      <path
                        d="M34.318 5.92l-4.162-4.244a5.55 5.55 0 0 0-7.962 0L14.39 9.635a5.809 5.809 0 0 0-1.64 4.04c0 1.51.6 2.98 1.64 4.04l1 .98c.44.49 1.2.49 1.68 0 .481-.449.481-1.224 0-1.714l-.96-.98c-.6-.611-.92-1.428-.92-2.326 0-.897.32-1.714.92-2.326l7.803-8c1.24-1.265 3.321-1.265 4.561 0l4.162 4.286c1.24 1.265 1.24 3.387 0 4.653l-7.803 7.958c-.48.45-.48 1.225 0 1.715.24.244.52.367.84.367.28 0 .6-.123.84-.367l7.843-7.959c2.201-2.245 2.201-5.877-.04-8.081zm-13.725 9.347c-.48-.49-1.24-.49-1.68 0-.48.49-.48 1.265 0 1.714l.96.98c1.24 1.265 1.24 3.387 0 4.652l-7.803 8c-.6.612-1.4.939-2.28.939-.881 0-1.681-.327-2.281-.939l-4.162-4.245c-1.24-1.265-1.24-3.387 0-4.653l7.803-7.999c.48-.49.48-1.265 0-1.714-.48-.49-1.24-.49-1.68 0l-7.843 7.959c-2.201 2.244-2.201 5.877 0 8.122l4.161 4.244a5.581 5.581 0 0 0 3.961 1.674c1.52 0 2.921-.613 3.962-1.674l7.882-7.958c2.201-2.245 2.201-5.878 0-8.122z"
                      />
                    </g>
                  </g>
                </svg>
                <span class="battle-link-text" @click="copy">{{
                  this.server_url + "/battle/" + this.id
                }}</span>
              </a>
            </div>
            <div class="battle-meta">
              <router-link
                class="battle-back battle-back-create"
                :to="'/battle_create?original_battle_id=' + battle.id"
              >
                <span style="line-height: 30px;">创建相同链接</span>

                <span class="battle-cost-value"
                  ><child-component v-html="symbol"></child-component>
                  {{ battle.open_price }}</span
                >
              </router-link>
              <router-link
                v-if="!isSmallScreen"
                class="battle-back"
                to="/battle"
              >
                <span style="line-height: 30px;">返回</span>
              </router-link>
            </div>
          </div>
          <div class="battle-top">
            <div class="battle-top-inner">
              <div class="battle-round">
                <span>{{ round }} <span>的</span> {{ round_in_progress }}</span>
                <span>回合</span>
                <div class="battle-round-bg">
                  <svg viewBox="0 0 293.5 236.1">
                    <path
                      d="M34.6 194.8L171.9 0l121.6 136.1-258.9 58.7z"
                      fill="#6644f7"
                      fill-opacity=".039"
                    ></path>
                    <path
                      d="M173.9 236.1L59.5 119.8l153.6-12.2-39.2 128.5z"
                      fill="#6137fd"
                      fill-opacity=".05"
                    ></path>
                    <path
                      d="M200.9 219.3l-52-88.9 98.4 10.1-46.4 78.8z"
                      fill="#5a36f5"
                      fill-opacity=".051"
                    ></path>
                    <path
                      d="M87.7 215.1L0 150.5l108.2 46.6-20.5 18z"
                      fill="#6a41f2"
                      fill-opacity=".05"
                    ></path>
                    <path
                      d="M233.2 104.6l35.3-59.5 10.7 58.7-46 .8z"
                      fill="#633ffe"
                      fill-opacity=".071"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="battle-cases-wrap">
                <div class="battle-cases" style="display: block;">
                  <div class="slick-list">
                    <div
                      class="slick-track"
                      :style="
                        'opacity: 1; transform: translate3d(' +
                          shift_left +
                          'px, 0px, 0px);transition: transform .5s;'
                      "
                    >
                      <div
                        :class="
                          'battle-case ' +
                            [index + 1 == round_in_progress ? 'active' : '']
                        "
                        v-for="(item, index) in box"
                        @click="openBoxDialog(item)"
                      >
                        <div class="battle-case-price">
                          <child-component v-html="symbol"></child-component>
                          {{ item.price }}
                        </div>
                        <div class="product-case">
                          <img
                            class="product-case-case"
                            :src="img_url + item.img"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="battle-top-right">
                <div class="battle-cost">
                  <span class="battle-cost-label">总消耗</span>
                  <span class="battle-cost-wrap">
                    <template v-if="battle.deduction > 0">
                      <div class="battle-cost-value">
                        <child-component v-html="symbol"></child-component>
                        {{ (battle.open_price - battle.deduction).toFixed(2) }}
                      </div>
                      <div class="battle-cost-old">
                        <child-component v-html="symbol"></child-component>
                        {{ battle.open_price }}
                      </div>
                    </template>
                    <template v-else>
                      <span class="battle-cost-value"
                        ><child-component v-html="symbol"></child-component>
                        {{ battle.open_price }}</span
                      >
                    </template>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="battle-top-info"></div>
          <div :class="'battle-users battle-users-' + battle.value2">
            <div
              class="battle-user"
              v-for="(item, index) in battle.value2"
              :key="index"
            >
              <template v-if="user[index]">
                <div class="battle-user-content">
                  <template v-if="battle.status == 3">
                    <div
                      :class="
                        'battle-user-status ' +
                          [
                            user[index].id == battle.win
                              ? 'battle-user-win'
                              : 'battle-user-loss'
                          ]
                      "
                    >
                      <template v-if="user[index].id == battle.win">
                        <div class="battle-user-status-label">
                          <span>胜利者 !</span>
                        </div>
                        <div class="battle-user-status-value price_box ">
                          <child-component v-html="symbol"></child-component
                          ><span>{{ user[index].shipment.total }}</span>
                        </div>
                        <svg class="icon-arrow-down" viewBox="0 0 42 24">
                          <g>
                            <g>
                              <path
                                fill="#fff"
                                d="M0 2.646L2.53.002 21 18.768 39.47.002 42 2.646l-21 21.36z"
                              />
                            </g>
                          </g>
                        </svg>
                        <div class="battle-user-result-label">总赢</div>
                        <div class="battle-user-result-value price_box ">
                          <child-component v-html="symbol"></child-component
                          ><span>{{ battle.shipment_price }}</span>
                        </div>
                      </template>
                      <template v-else>
                        <div class="battle-user-status-label">
                          <span>失败者</span>
                        </div>
                        <div class="battle-user-status-value price_box ">
                          <child-component v-html="symbol"></child-component
                          ><span>{{ user[index].shipment.total }}</span>
                        </div>
                      </template>
                      <div class="battle-user-bg">
                        <svg viewBox="0 0 293.5 236.1">
                          <path
                            d="M34.6 194.8L171.9 0l121.6 136.1-258.9 58.7z"
                            fill-opacity=".039"
                          ></path>
                          <path
                            d="M173.9 236.1L59.5 119.8l153.6-12.2-39.2 128.5z"
                            fill-opacity=".129"
                          ></path>
                          <path
                            d="M200.9 219.3l-52-88.9 98.4 10.1-46.4 78.8z"
                            fill-opacity=".051"
                          ></path>
                          <path
                            d="M87.7 215.1L0 150.5l108.2 46.6-20.5 18z"
                            fill-opacity=".2"
                          ></path>
                          <path
                            d="M233.2 104.6l35.3-59.5 10.7 58.7-46 .8z"
                            fill-opacity=".071"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </template>
                  <template v-else-if="battle.status == 2">
                    <div
                      :class="
                        'battle-roulette ' +
                          [
                            roll_display
                              ? user[index].shipment.data[round_in_progress - 1]
                                  .max_price_status
                                ? 'battle-user-win'
                                : 'battle-user-loss'
                              : ''
                          ]
                      "
                    >
                      <div class="roulette-overlay-vert">
                        <div class="roulette-overlay-left"></div>
                        <div class="roulette-overlay-right"></div>
                      </div>
                      <div class="scene" height="130">
                        <div
                          class="roulette-container"
                          v-if="
                            user[index].shipment.data[round_in_progress - 1]
                          "
                          :style="
                            'transition: all ' +
                              roll_second +
                              's cubic-bezier(0, 1.03, 0.82, 1.02) 0s; transform: translateZ(-598px) rotateX(' +
                              roll +
                              'deg);'
                          "
                        >
                          <a
                            class="roulette-cell battle-roulette-item battle-roulette-item-win"
                            :style="
                              'width: 100%; opacity: 1; transition-duration: 0s; transition-timing-function: ease; transition-property: none; transform: rotateX(' +
                                12.4138 * index +
                                'deg) translateZ(598px);'
                            "
                            v-for="(item, index) in user[index].shipment.data[
                              round_in_progress - 1
                            ].box_ornaments"
                            :key="index"
                          >
                            <svg
                              class="battle-roulette-img-bg"
                              viewBox="0 0 313.1 384.8"
                            >
                              <path
                                d="M298 384.8L76.4 119.4 313.1 0 298 384.8z"
                                fill-opacity=".039"
                              ></path>
                              <path
                                d="M242.8 240.5L36.6 357.2l40.7-219.8 165.5 103.1z"
                                fill-opacity=".129"
                              ></path>
                              <path
                                d="M241.3 216.8L97 256.3l51.3-134.1 93 94.6z"
                                fill-opacity=".02"
                              ></path>
                              <path
                                d="M306.6 272.8L183 371.5l106.1-134.1 17.5 35.4z"
                                fill-opacity=".2"
                              ></path>
                              <path
                                d="M70.2 250.5L0 178.8l86.4 7-16.2 64.7z"
                                fill-opacity=".071"
                              ></path>
                            </svg>
                            <img
                              class="battle-roulette-img"
                              :src="img_url + item.img"
                            />
                            <div
                              :class="
                                'battle-roulette-info ' +
                                  [
                                    roll_display && index == 28
                                      ? 'fade-in-out'
                                      : ''
                                  ]
                              "
                            >
                              <div class="battle-roulette-title">
                                {{ item.name }}
                              </div>
                              <div
                                class="battle-roulette-name"
                                v-if="item.appid == 730"
                              >
                                {{ abrasion(item.abrasion) }}
                              </div>
                              <div class="battle-roulette-name" v-else>
                                {{ quality2(item.quality2) }}
                              </div>
                              <div class="battle-roulette-price price_box ">
                                <child-component
                                  v-html="symbol"
                                ></child-component>
                                {{ item.open_price }}
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <svg class="battle-roulette-bg" viewBox="0 0 709.7 821.3">
                        <path
                          d="M470.4 821.3L0 254.8 502.5 0l-32.1 821.3z"
                          fill="#4459f7"
                          fill-opacity=".02"
                        ></path>
                        <path
                          d="M506.1 298.4L68.3 547.6l86.3-469.3 351.5 220.1z"
                          fill="#3a40c2"
                          fill-opacity=".071"
                        ></path>
                        <path
                          d="M395.3 666.9L89 751.3l108.8-286.2 197.5 201.8z"
                          fill="#363ff5"
                          fill-opacity=".039"
                        ></path>
                        <path
                          d="M641.4 463.6L379 674.3l225.2-286.2 37.2 75.5z"
                          fill="#4145f2"
                          fill-opacity=".09"
                        ></path>
                        <path
                          d="M675.2 399.8l-149-153.1 183.5 15-34.5 138.1z"
                          opacity=".471"
                          fill="#483ffe"
                          fill-opacity=".059"
                        ></path>
                      </svg>
                    </div>
                  </template>
                  <template v-else>
                    <div class="battle-user-status battle-user-status-success">
                      <svg class="icon-check" viewBox="0 0 34 25">
                        <g>
                          <g>
                            <path
                              d="M30.802-.006l-18.66 18.674-8.944-8.931L0 12.944 10.564 23.5l1.579 1.502L13.72 23.5 34 3.16z"
                            />
                          </g>
                        </g>
                      </svg>
                      <span>{{ battle.status == 2 ? "操作中" : "准备" }}</span>
                      <div class="battle-user-bg">
                        <svg viewBox="0 0 293.5 236.1">
                          <path
                            d="M34.6 194.8L171.9 0l121.6 136.1-258.9 58.7z"
                            fill-opacity=".039"
                          ></path>
                          <path
                            d="M173.9 236.1L59.5 119.8l153.6-12.2-39.2 128.5z"
                            fill-opacity=".129"
                          ></path>
                          <path
                            d="M200.9 219.3l-52-88.9 98.4 10.1-46.4 78.8z"
                            fill-opacity=".051"
                          ></path>
                          <path
                            d="M87.7 215.1L0 150.5l108.2 46.6-20.5 18z"
                            fill-opacity=".2"
                          ></path>
                          <path
                            d="M233.2 104.6l35.3-59.5 10.7 58.7-46 .8z"
                            fill-opacity=".071"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </template>
                  <div class="battle-user-bottom">
                    <div class="battle-user-avatar-wrap">
                      <router-link
                        :to="'/profile/' + user[index].id2"
                        target="_blank"
                      >
                        <img
                          class="battle-user-avatar"
                          :src="repair(user[index].portrait)"
                        />
                        <div class="battle-user-bot" v-if="user[index].bot">
                          <img
                            class="battle-user-bot-icon"
                            src="@/assets/img/bot.svg"
                            alt="Bot"
                          />
						<div v-if="user[index].type==2" class="zhubo">主播</div>
                        </div>
                      </router-link>
                    </div>
                    <div class="battle-user-info">
                      <div class="battle-user-name">
                        <router-link
                          :to="'/profile/' + user[index].id2"
                          target="_blank"
                        >
                          {{ user[index].name }}
                        </router-link>
                      </div>
                      <div class="battle-user-chance">
                        <span v-if="!isSmallScreen">胜率：</span>
                        {{ (100 / battle.value2).toFixed(2) }}%
                      </div>
                    </div>
                    <div
                      v-if="
                        totalPrice[index] !== '' && totalPrice[index] !== '0.00'
                      "
                      class="battle-user-total-price"
                    >
                      <span v-if="!isSmallScreen">总价值 </span>
                      <div class="live-item-price price_box ">
                        <child-component v-html="symbol"></child-component>
                        <span>{{ totalPrice[index] }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="battle-user-content">
                  <div class="battle-user-status battle-user-status-danger">
                    <svg class="icon-update" viewBox="0 0 76 76">
                      <path
                        fill-rule="evenodd"
                        d="M70.339 42.218c-2.136 16.077-15.798 28.1-32.11 28.1-17.867 0-32.404-14.538-32.404-32.406 0-17.869 14.537-32.407 32.404-32.407 8.049 0 15.774 3.01 21.75 8.474l.802.733-6.816 4.09 18.227 8.871.615-20.007-7.042 4.192-.446-.459C58.276 4.152 48.345-.004 38.067-.004 17.073-.004-.008 17.078-.008 38.074c0 20.907 17.153 37.915 38.237 37.915 19.224 0 35.316-14.204 37.757-33.173l-5.647-.598z"
                      />
                    </svg>
                    <span>等待玩家</span>
                    <div class="battle-user-bg">
                      <svg viewBox="0 0 293.5 236.1">
                        <path
                          d="M34.6 194.8L171.9 0l121.6 136.1-258.9 58.7z"
                          fill-opacity=".039"
                        ></path>
                        <path
                          d="M173.9 236.1L59.5 119.8l153.6-12.2-39.2 128.5z"
                          fill-opacity=".129"
                        ></path>
                        <path
                          d="M200.9 219.3l-52-88.9 98.4 10.1-46.4 78.8z"
                          fill-opacity=".051"
                        ></path>
                        <path
                          d="M87.7 215.1L0 150.5l108.2 46.6-20.5 18z"
                          fill-opacity=".2"
                        ></path>
                        <path
                          d="M233.2 104.6l35.3-59.5 10.7 58.7-46 .8z"
                          fill-opacity=".071"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div class="battle-user-bottom">
                    <template v-if="oneself && !robot">
                      <button class="battle-user-btn" @click="join2">
                        邀请机器人
                      </button>
                    </template>
                    <template v-else>
                      <button class="battle-user-btn" @click="join">
                        加入
                      </button>
                    </template>
                  </div>
                </div>
              </template>
              <div class="battle-user-items">
                <template v-if="user[index] && user[index].shipment">
                  <div
                    :class="
                      'live-item live-item-bg live-item-bg-' +
                        color(item.ornaments.color, 4)
                    "
                    :key="index"
                    v-for="(item, index) in user[index].shipment.data"
                    v-if="
                      (round_in_progress > index && roll_display == true) ||
                        (round_in_progress - 1 > index &&
                          roll_display == false) ||
                        battle.status == 3
                    "
                  >
                    <div :class="color(item.ornaments.color, 3)">
                      <div class="o-item">
                        <div class="o-body">
                          <svg class="o-bg" viewBox="0 0 87.3 107.3">
                            <path
                              d="M83.1 107.3l-61.8-74L87.3 0l-4.2 107.3z"
                              fill-opacity=".04"
                            ></path>
                            <path
                              d="M67.7 70.1l-57.5 32.6 11.3-61.3 46.2 28.7z"
                              fill-opacity=".13"
                            ></path>
                            <path
                              d="M67.3 63.5L27 74.5l14.3-37.4 26 26.4z"
                              fill-opacity=".02"
                            ></path>
                            <path
                              d="M85.5 79.1L51 106.6l29.6-37.4 4.9 9.9z"
                              fill-opacity=".2"
                            ></path>
                            <path
                              d="M19.6 72.9L0 52.9l24.1 2-4.5 18z"
                              fill-opacity=".07"
                            ></path>
                          </svg>
                          <img
                            class="o-img"
                            :src="img_url + item.ornaments.img"
                            alt=""
                          />
                        </div>
                      </div>
                      <div class="live-item-quality">
                        {{ quality(item.ornaments.quality, 2) }}
                      </div>
                      <div class="o-name">{{ item.ornaments.name }}</div>
                      <div class="live-meta">
                        <div
                          class="o-abrasion"
                          v-if="item.ornaments.appid == 730"
                        >
                          {{ abrasion(item.ornaments.abrasion) }}
                        </div>
                        <div class="o-abrasion" v-else>
                          {{ quality2(item.ornaments.quality2) }}
                        </div>
                        <div class="live-item-price price_box ">
                          <child-component v-html="symbol"></child-component>
                          {{ item.open_price }}
                        </div>
                      </div>
                    </div>
                    <div class="hash_boxs">
                      <div class="hash_box">
                        <!-- roll点 -->
                        <div style="padding:5px 5px;">[{{ item.roll }}]</div>
                        <div style="padding:5px 5px;">
                          <span
                            :style="
                              isSmallScreen
                                ? 'padding:2px !important;cursor: pointer;'
                                : 'padding:5px !important;cursor: pointer;'
                            "
                            @click="checkHash(item.hash_id)"
                            >Hash</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <div
                  class="live-item live-item-empty"
                  v-for="(item, index) in 8"
                  :key="index"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <el-dialog
      :class="'result-dialog'"
      title="hash验证!"
      append-to-body
      :visible.sync="hash_page"
      :close-on-click-modal="false"
      :lock-scroll="false"
      center
    >
      <div class="hash-info">
        <div>
          Roll点：<span>{{ hash.roll }}</span>
        </div>
        <div>
          服务器种子：<span>{{ hash.web_seed }}</span>
        </div>
        <div>
          服务器种子HASH：<span>{{ hash.web_hash }}</span>
        </div>
        <div>
          用户种子：<span>{{ hash.user_seed }}</span>
        </div>
        <div>
          用户种子HASH：<span>{{ hash.user_hash }}</span>
        </div>
      </div>
    </el-dialog>
    <el-drawer
      class="battle-box-dialog"
      size="50%"
      append-to-body
      :visible.sync="showBoxDialog"
      :close-on-click-modal="false"
      :lock-scroll="false"
      direction="btt"
    >
      <template v-if="selectBox && selectBox.name" slot="title">
        <h2 class="battle-box-dialog-title">{{ selectBox.name }}</h2>
      </template>
      <div
        v-if="selectBox && selectBox.box_ornaments"
        class="battle-box-dialog-content"
      >
        <div class="battle-box-dialog-ornaments">
          <div
            class="battle-ornaments-item-wrap"
            v-for="item in selectBox.box_ornaments"
            :key="item.oid"
          >
            <div
              :class="
                'battle-ornaments-item battle-ornaments-item-bg battle-ornaments-item-bg-' +
                  color(item.color, 4)
              "
            >
              <div :class="color(item.color, 3)">
                <div class="battle-ornaments-item-probability">
                  <span>{{ item.probability }}%</span>
                </div>
                <div class="battle-ornaments-item-price">
                  <span class="price_box "
                    ><child-component v-html="symbol"></child-component>
                    {{ item.open_price }}</span
                  >
                </div>

                <div class="o-item">
                  <div class="o-body">
                    <svg class="o-bg" viewBox="0 0 87.3 107.3">
                      <path
                        d="M83.1 107.3l-61.8-74L87.3 0l-4.2 107.3z"
                        fill-opacity=".04"
                      ></path>
                      <path
                        d="M67.7 70.1l-57.5 32.6 11.3-61.3 46.2 28.7z"
                        fill-opacity=".13"
                      ></path>
                      <path
                        d="M67.3 63.5L27 74.5l14.3-37.4 26 26.4z"
                        fill-opacity=".02"
                      ></path>
                      <path
                        d="M85.5 79.1L51 106.6l29.6-37.4 4.9 9.9z"
                        fill-opacity=".2"
                      ></path>
                      <path
                        d="M19.6 72.9L0 52.9l24.1 2-4.5 18z"
                        fill-opacity=".07"
                      ></path>
                    </svg>
                    <img class="o-img" :src="img_url + item.img" alt="" />
                  </div>
                </div>

                <div
                  class="o-name"
                  style="display: block; width: 100%;float:left;    text-align: center;"
                >
                  {{ item.name }}
                </div>
                <div
                  class="battle-ornaments-item-quality-text"
                  v-if="item.appid == 730"
                >
                  {{ abrasion(item.abrasion) }}
                </div>
                <div class="battle-ornaments-item-quality-text" v-else>
                  {{ quality2(item.quality2) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>

    <div style="display: none;">
      <audio ref="audio" :src="process">你的浏览器不支持audio标签</audio>
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
  repair
} from "@/utils/util.js";

export default {
  data() {
    return {
      showBoxDialog: false,
      server_url: this.$server_url,
      symbol: this.$getStore({ name: "symbol" }),
      img_url: this.$img_url,
      loadingIndex: true,
      id: "",
      selectBox: null,
      battle: {},
      round: 0,
      box: [],
      user: [],
      oneself: false,
      robot: false,
      round_in_progress: 0,
      actual_round_in_progress: 0,
      roll_display: false,
      timer: "",
      timer2: "",
      roll: -135,
      roll_second: 0,
      process: this.$server_url + "/public/static/audio/process.mp3",
      hash: {
        web_seed: "",
        web_hash: "",
        user_seed: "",
        user_hash: "",
        roll: ""
      },
      hash_page: false,
      isSmallScreen: false
    };
  },
  computed: {
    // 判断是否是移动端
    checkScreenSize() {
      return window.innerWidth <= 768;
    },
    totalPrice() {
      const total = this.user.map(item => {
        if (!item.shipment) {
          return "";
        }

        const itemTotal = item.shipment.data.reduce((acc, cur, index) => {
          if (
            (this.round_in_progress > index && this.roll_display == true) ||
            (this.round_in_progress - 1 > index &&
              this.roll_display == false) ||
            this.battle.status == 3
          ) {
            const num = Number(cur.open_price);
            return acc + (isNaN(num) ? 0 : num);
          }

          return acc;
        }, 0);

        return itemTotal.toFixed(2);
      });

      return total;
    },
    shift_left: function() {
      let round_in_progress = this.round_in_progress;
      let status = this.battle.status;
      return round_in_progress > 1 && status == 2
        ? -(103 * (round_in_progress - 1))
        : 0;
    }
  },
  mounted() {
    // 监听窗口大小变化
    window.addEventListener("resize", this.handleResize);
    this.isSmallScreen = this.checkScreenSize;
    this.id = encodeURIComponent(this.$route.params.id);
    this.get_battle_details();
  },
  destroyed() {
    clearInterval(this.timer);
    clearInterval(this.timer2);
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
    openBoxDialog(item) {
      console.log("openboxDialog", item);
      this.showBoxDialog = true;

      this.getBoxDetail(item.ids);
    },

    getBoxDetail(id) {
      this.boxDetail = null;

      ttGet("/api.php/box/get_box_details", { id: id }, res => {
        if (res.code == 200) {
          this.selectBox = res.data.box || {};
          console.log(this.selectBox);
        } else {
          this.selectBox = [];
          this.$message({
            message: res.msg,
            type: "warning"
          });
        }
      });
    },

    //获取对战详情
    get_battle_details() {
      let id = this.id;
      ttGet("/api.php/battle/get_battle_details", { id: id }, res => {
        this.loadingIndex = false;
        if (res.code == 200) {
          let battle = res.data.battle;
          this.battle = battle;
          this.round_in_progress = res.data.round_in_progress;
          this.actual_round_in_progress = res.data.actual_round_in_progress;
          this.round = res.data.round;
          this.box = res.data.box;
          let user = res.data.user;
          this.oneself = res.data.oneself;
          this.robot = res.data.robot;
          let shipment = battle.shipment;
          for (let x in user) {
            user[x].shipment = shipment[user[x].id];
          }
          this.user = user;
          if (battle.status == 1) {
            if (!this.timer2) {
              this.timer2 = setInterval(() => {
                this.get_battle_details();
              }, 5000);
            }
          } else {
            clearInterval(this.timer2);
            this.calculation();
            this.timer = setInterval(() => {
              this.calculation();
            }, 8000);
          }
        } else {
          this.$message({
            message: res.msg,
            type: "warning"
          });
        }
      });
    },

    //计算
    calculation() {
      let round_in_progress = this.round_in_progress;
      let actual_round_in_progress = this.actual_round_in_progress;
      let round = this.round;
      setTimeout(() => {
        this.roll = 1000;
        this.roll_second = 6;
      }, 500);
      setTimeout(() => {
        this.roll = 375;
      }, 500);
      setTimeout(() => {
        this.roll_display = true;
      }, 6500);
      setTimeout(() => {
        if (round_in_progress < round) {
          this.roll = -135;
          this.roll_second = 0;
          this.roll_display = false;
          this.round_in_progress = ++round_in_progress;
        }
        this.actual_round_in_progress = ++actual_round_in_progress;
      }, 7800);
      if (actual_round_in_progress - round >= 0) {
        let win = this.battle.win;
        let user = this.user;
        let shipment_data = [];
        for (let x in user) {
          if (user[x].id != win) {
            shipment_data = shipment_data.concat(user[x].shipment.data);
            user[x].shipment.data = [];
          }
        }
        for (let y in user) {
          if (user[y].id == win) {
            user[y].shipment.data = user[y].shipment.data.concat(shipment_data);
            break;
          }
        }
        this.battle.status = 3;
        clearInterval(this.timer);
      } else {
        this.$refs.audio.play();
      }
    },

    //复制推广链接
    copy() {
      let battle_link = this.server_url + "/battle/" + this.id;
      this.$copyText(battle_link).then(
        () => {
          this.$message({
            message: "复制成功!",
            type: "success"
          });
        },
        () => {
          this.$message({
            message: "复制失败!",
            type: "warning"
          });
        }
      );
    },

    //加入对战
    join() {
      let id = this.id;
      let loading = this.$loading({
        spinner: "el-icon-loading",
        background: "rgb(0 0 0 / 0%)"
      });
      ttPost("/api.php/battle/join", { id: id }, res => {
        loading.close();
        if (res.code == 200) {
          this.$emit("user_bean", { balance: res.data.balance });
          this.get_battle_details();
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
      });
    },

    //邀请机器人
    join2() {
      let id = this.id;
      let loading = this.$loading({
        spinner: "el-icon-loading",
        background: "rgb(0 0 0 / 0%)"
      });
      ttPost("/api.php/battle/join2", { id: id }, res => {
        loading.close();
        if (res.code == 200) {
          this.get_battle_details();
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
      });
    },
    //验证hash
    checkHash(id) {
      let loading = this.$loading({
        spinner: "el-icon-loading",
        background: "rgb(0 0 0 / 0%)"
      });
      ttPost("/api.php/hash/get_hash_details", { hash_id: id }, res => {
        loading.close();
        if (res.code == 200) {
          this.hash_page = true;
          this.hash = res.data.hash_info;
        } else {
          this.$message({
            message: res.msg,
            type: "warning"
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "battle_details.scss";
</style>

<style scoped>
.price_box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3px;
}
.price_box /deep/ .symbol {
  margin-left: 10px;
  width: 18px;
  padding-top: 2px;
  margin-right: 5px;
  @media screen and (max-width: 768px) {
    margin-right: 2px !important;
  }
}

.battle-user-result-value {
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3px;
}
.battle-user-result-value /deep/ .symbol {
  margin-left: 10px;
  width: 32px;
  padding-top: 6px;
  margin-right: 5px;
}

.battle-cost-value {
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3px;
}
.battle-cost-value /deep/ .symbol {
  margin-left: 10px;
  width: 18px;
  padding-top: 2px;
  margin-right: 5px;
}

.battle-user-status-value {
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3px;
}
.battle-user-status-value /deep/ .symbol {
  margin-left: 10px;
  width: 22px;
  padding-top: 5px;
  margin-right: 5px;
}

.battle-case-price {
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3px;
}
.battle-case-price /deep/ .symbol {
  margin-left: 10px;
  width: 18px;
  padding-top: 2px;
  margin-right: 5px;
}

.live-item-price {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3px;
}
.live-item-price /deep/ .symbol {
  margin-left: 10px;
  width: 18px;
  padding-top: 2px;
  margin-right: 5px;
}

.o-name {
  line-height: 30px;
}
</style>
