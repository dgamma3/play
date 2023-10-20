<template>
  <div>
    <div class="profile">
      <div class="profile-inner" style="padding: 0 15px;">
        <div class="profile-header">
          <h2 class="profile-title">
            <svg class="icon-cubes-2" viewBox="0 0 44 46">
              <path fill="#6d79bf"
                    d="M0-.006h19.566v19.388H0zm6.136 13.25h7.236v-7.17H6.136zM0 26.609h19.566v19.388H0zm6.136 13.25h7.236v-7.17H6.136zM24.44-.006h19.566v19.388H24.441zm6.136 13.25h7.236v-7.17h-7.236zM24.44 26.609h19.566v19.388H24.441zm6.136 13.25h7.236v-7.17h-7.236z"/>
            </svg>
            <span>历史最佳</span>
          </h2>
        </div>
        <template v-if="loadingIndex">
          <div class="text-center">
            <i class="el-icon-loading data-loading"></i>
          </div>
        </template>
        <template v-else>
          <h3 class="top-wins-section-title">盲盒开箱</h3>
          <div class="top-wins-content">
            <div class="top-wins-tabs-wrap">
              <div class="top-wins-tabs">
                <button :class="'top-wins-tab ' + [date == 1 ? 'active' : '']" @click="date_switch(1, 1)">今日最佳
                </button>
                <button :class="'top-wins-tab ' + [date == 2 ? 'active' : '']" @click="date_switch(1, 2)">本周最佳
                </button>
                <button :class="'top-wins-tab ' + [date == 3 ? 'active' : '']" @click="date_switch(1, 3)">本月最佳
                </button>
              </div>
            </div>
            <div class="top-wins-winners">
              <div v-if="history[1]" :class="'top-wins-winner top-wins-winner2 ' + color(history[1].ornaments.color, 3)"
                   @mouseover="mouse_over(1, 1)" @mouseleave="mouse_leave(1, 1)">
                <div class="live-item">
                  <div class="o-body">
                    <svg class="o-bg" viewBox="0 0 87 107">
                      <path d="M83.1 107.3l-61.8-74L87.3 0l-4.2 107.3z" fill-opacity=".04"></path>
                      <path d="M67.7 70.1l-57.5 32.6 11.3-61.3 46.2 28.7z" fill-opacity=".13"></path>
                      <path d="M67.3 63.5L27 74.5l14.3-37.4 26 26.4z" fill-opacity=".02"></path>
                      <path d="M85.5 79.1L51 106.6l29.6-37.4 4.9 9.9z" fill-opacity=".2"></path>
                      <path d="M19.6 72.9L0 52.9l24.1 2-4.5 18z" fill-opacity=".07"></path>
                    </svg>
                    <router-link :to="history[1].url">
                      <img :class="'o-img ' + [history[1].move == true ? 'hide' : '']"
                           :src="img_url + history[1].ornaments.img" alt="">
                      <img :class="'o-img3 ' + [history[1].move == false ? 'hide' : '']"
                           :src="img_url + history[1].box_img"
                           alt="">
                    </router-link>
                  </div>
                  <div class="o-bottom">
                    <div class="o-bottom-left">
                      <div class="o-user-info2">
                        <img class="o-user-avatar" :src="repair(history[1].user.portrait)">
                      </div>
                      <div class="o-price2 price_box "><child-component v-html="symbol"></child-component> {{ history[1].price }}</div>
                    </div>
                    <div class="o-bottom-right">
                      <div class="o-name">{{ history[1].ornaments.name }}</div>
                      <div class="o-abrasion" v-if="history[1].ornaments.appid == 730">{{
                          abrasion(history[1].ornaments.abrasion)
                        }}{{
                          quality(history[1].ornaments.quality, 3)
                        }}
                      </div>
                      <div class="o-abrasion" v-else>{{
                          quality2(history[1].ornaments.quality2)
                        }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="top-wins-winner-place">
                  <span>2</span>
                  <svg class="icon-polygon" viewBox="0 0 91 91">
                    <g>
                      <g>
                        <path
                          d="M77.663 77.662L45.5 90.985 13.337 77.662.014 45.5l13.323-32.162L45.5.014l32.163 13.323 13.322 32.162z"/>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
              <div v-if="history[0]" :class="'top-wins-winner top-wins-winner1 ' + color(history[0].ornaments.color, 3)"
                   @mouseover="mouse_over(1, 0)" @mouseleave="mouse_leave(1, 0)">
                <div class="live-item">
                  <div class="o-body">
                    <svg class="o-bg" viewBox="0 0 87 107">
                      <path d="M83.1 107.3l-61.8-74L87.3 0l-4.2 107.3z" fill-opacity=".04"></path>
                      <path d="M67.7 70.1l-57.5 32.6 11.3-61.3 46.2 28.7z" fill-opacity=".13"></path>
                      <path d="M67.3 63.5L27 74.5l14.3-37.4 26 26.4z" fill-opacity=".02"></path>
                      <path d="M85.5 79.1L51 106.6l29.6-37.4 4.9 9.9z" fill-opacity=".2"></path>
                      <path d="M19.6 72.9L0 52.9l24.1 2-4.5 18z" fill-opacity=".07"></path>
                    </svg>
                    <router-link :to="history[0].url">
                      <img :class="'o-img ' + [history[0].move == true ? 'hide' : '']"
                           :src="img_url + history[0].ornaments.img" alt="">
                      <img :class="'o-img3 ' + [history[0].move == false ? 'hide' : '']"
                           :src="img_url + history[0].box_img"
                           alt="">
                    </router-link>
                  </div>
                  <div class="o-bottom">
                    <div class="o-bottom-left">
                      <div class="o-user-info2">
                        <img class="o-user-avatar" :src="repair(history[0].user.portrait)">
                      </div>
                      <div class="o-price2 price_box "><child-component v-html="symbol"></child-component> {{ history[0].price }}</div>
                    </div>
                    <div class="o-bottom-right">
                      <div class="o-name">{{ history[0].ornaments.name }}</div>
                      <div class="o-abrasion" v-if="history[0].ornaments.appid == 730">{{
                          abrasion(history[0].ornaments.abrasion)
                        }}{{
                          quality(history[0].ornaments.quality, 3)
                        }}
                      </div>
                      <div class="o-abrasion" v-else>{{
                          quality2(history[0].ornaments.quality2)
                        }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="top-wins-winner-place">
                  <span>1</span>
                  <svg class="icon-polygon" viewBox="0 0 91 91">
                    <g>
                      <g>
                        <path
                          d="M77.663 77.662L45.5 90.985 13.337 77.662.014 45.5l13.323-32.162L45.5.014l32.163 13.323 13.322 32.162z"/>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
              <div v-if="history[2]" :class="'top-wins-winner top-wins-winner3 ' + color(history[2].ornaments.color, 3)"
                   @mouseover="mouse_over(1, 2)" @mouseleave="mouse_leave(1, 2)">
                <div class="live-item">
                  <div class="o-body">
                    <svg class="o-bg" viewBox="0 0 87 107">
                      <path d="M83.1 107.3l-61.8-74L87.3 0l-4.2 107.3z" fill-opacity=".04"></path>
                      <path d="M67.7 70.1l-57.5 32.6 11.3-61.3 46.2 28.7z" fill-opacity=".13"></path>
                      <path d="M67.3 63.5L27 74.5l14.3-37.4 26 26.4z" fill-opacity=".02"></path>
                      <path d="M85.5 79.1L51 106.6l29.6-37.4 4.9 9.9z" fill-opacity=".2"></path>
                      <path d="M19.6 72.9L0 52.9l24.1 2-4.5 18z" fill-opacity=".07"></path>
                    </svg>
                    <router-link :to="history[2].url">
                      <img :class="'o-img ' + [history[2].move == true ? 'hide' : '']"
                           :src="img_url + history[2].ornaments.img" alt="">
                      <img :class="'o-img3 ' + [history[2].move == false ? 'hide' : '']"
                           :src="img_url + history[2].box_img"
                           alt="">
                    </router-link>
                  </div>
                  <div class="o-bottom">
                    <div class="o-bottom-left">
                      <div class="o-user-info2">
                        <img class="o-user-avatar" :src="repair(history[2].user.portrait)">
                      </div>
                      <div class="o-price2 price_box "><child-component v-html="symbol"></child-component> {{ history[2].price }}</div>
                    </div>
                    <div class="o-bottom-right">
                      <div class="o-name">{{ history[2].ornaments.name }}</div>
                      <div class="o-abrasion" v-if="history[2].ornaments.appid == 730">{{
                          abrasion(history[2].ornaments.abrasion)
                        }}{{
                          quality(history[2].ornaments.quality, 3)
                        }}
                      </div>
                      <div class="o-abrasion" v-else>{{
                          quality2(history[2].ornaments.quality2)
                        }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="top-wins-winner-place">
                  <span>3</span>
                  <svg class="icon-polygon" viewBox="0 0 91 91">
                    <g>
                      <g>
                        <path
                          d="M77.663 77.662L45.5 90.985 13.337 77.662.014 45.5l13.323-32.162L45.5.014l32.163 13.323 13.322 32.162z"/>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            <div class="top-wins-items">
              <div :class="'top-wins-item ' + color(item.ornaments.color, 3)" v-for="(item, index) in history"
                   @mouseover="mouse_over(1, index)" @mouseleave="mouse_leave(1, index)" v-if="index > 2">
                <div :class="'live-item ' + [item.move == true ? 'active' : '']">
                  <div class="o-price price_box "><child-component v-html="symbol"></child-component> {{ item.price }}</div>
                  <div class="o-body">
                    <svg class="o-bg" viewBox="0 0 87 107">
                      <path d="M83.1 107.3l-61.8-74L87.3 0l-4.2 107.3z" fill-opacity=".04"></path>
                      <path d="M67.7 70.1l-57.5 32.6 11.3-61.3 46.2 28.7z" fill-opacity=".13"></path>
                      <path d="M67.3 63.5L27 74.5l14.3-37.4 26 26.4z" fill-opacity=".02"></path>
                      <path d="M85.5 79.1L51 106.6l29.6-37.4 4.9 9.9z" fill-opacity=".2"></path>
                      <path d="M19.6 72.9L0 52.9l24.1 2-4.5 18z" fill-opacity=".07"></path>
                    </svg>
                    <img :class="'o-img ' + [item.move == true ? 'hide' : '']" :src="img_url + item.ornaments.img"
                         alt="">
                  </div>
                  <div :class="'o-name ' + [item.move == true ? 'hide' : '']">{{ item.ornaments.name }}</div>
                  <div :class="'o-abrasion ' + [item.move == true ? 'hide' : '']" v-if="item.ornaments.appid == 730">{{
                      abrasion(item.ornaments.abrasion)
                    }}{{
                      quality(item.ornaments.quality, 3)
                    }}
                  </div>
                  <div :class="'o-abrasion ' + [item.move == true ? 'hide' : '']" v-else>{{
                      quality2(item.ornaments.quality2)
                    }}
                  </div>
                  <div :class="'o-overlay ' + [item.move == true ? 'active' : '']">
                    <div class="o-overlay-case-wrap">
                      <div class="o-overlay-case">
                        <img class="o-img2" :src="img_url + item.box_img" alt="">
                      </div>
                      <div class="o-user-info">
                        <img class="o-user-avatar" :src="repair(item.user.portrait)">
                      </div>
                    </div>
                    <router-link class="o-open" :to="item.url">打开</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3 class="top-wins-section-title">幸运开箱</h3>
          <div class="top-wins-content top-wins-section">
            <div class="top-wins-tabs-wrap">
              <div class="top-wins-tabs">
                <button :class="'top-wins-tab ' + [date2 == 1 ? 'active' : '']" @click="date_switch(2, 1)">今日最佳
                </button>
                <button :class="'top-wins-tab ' + [date2 == 2 ? 'active' : '']" @click="date_switch(2, 2)">本周最佳
                </button>
                <button :class="'top-wins-tab ' + [date2 == 3 ? 'active' : '']" @click="date_switch(2, 3)">本月最佳
                </button>
              </div>
            </div>
            <div class="top-wins-winners">
              <div v-if="history2[1]" :class="'top-wins-winner top-wins-winner2 ' + color(history2[1].ornaments.color, 3)"
                   @mouseover="mouse_over(2, 1)" @mouseleave="mouse_leave(2, 1)">
                <div class="live-item">
                  <div class="o-body">
                    <svg class="o-bg" viewBox="0 0 87 107">
                      <path d="M83.1 107.3l-61.8-74L87.3 0l-4.2 107.3z" fill-opacity=".04"></path>
                      <path d="M67.7 70.1l-57.5 32.6 11.3-61.3 46.2 28.7z" fill-opacity=".13"></path>
                      <path d="M67.3 63.5L27 74.5l14.3-37.4 26 26.4z" fill-opacity=".02"></path>
                      <path d="M85.5 79.1L51 106.6l29.6-37.4 4.9 9.9z" fill-opacity=".2"></path>
                      <path d="M19.6 72.9L0 52.9l24.1 2-4.5 18z" fill-opacity=".07"></path>
                    </svg>
                    <router-link :to="history2[1].url">
                      <img :class="'o-img ' + [history2[1].move == true ? 'hide' : '']"
                           :src="img_url + history2[1].ornaments.img" alt="">
                      <img :class="'o-img3 ' + [history2[1].move == false ? 'hide' : '']"
                           :src="img_url + history2[1].box_img"
                           alt="">
                    </router-link>
                  </div>
                  <div class="o-bottom">
                    <div class="o-bottom-left">
                      <div class="o-user-info2">
                        <img class="o-user-avatar" :src="repair(history2[1].user.portrait)">
                      </div>
                      <div class="o-price2 price_box "><child-component v-html="symbol"></child-component> {{ history2[1].price }}</div>
                    </div>
                    <div class="o-bottom-right">
                      <div class="o-name">{{ history2[1].ornaments.name }}</div>
                      <div class="o-abrasion" v-if="history2[1].ornaments.appid == 730">{{
                          abrasion(history2[1].ornaments.abrasion)
                        }}{{
                          quality(history2[1].ornaments.quality, 3)
                        }}
                      </div>
                      <div class="o-abrasion" v-else>{{
                          quality2(history2[1].ornaments.quality2)
                        }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="top-wins-winner-place">
                  <span>2</span>
                  <svg class="icon-polygon" viewBox="0 0 91 91">
                    <g>
                      <g>
                        <path
                          d="M77.663 77.662L45.5 90.985 13.337 77.662.014 45.5l13.323-32.162L45.5.014l32.163 13.323 13.322 32.162z"/>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
              <div v-if="history2[0]" :class="'top-wins-winner top-wins-winner1 ' + color(history2[0].ornaments.color, 3)"
                   @mouseover="mouse_over(2, 0)" @mouseleave="mouse_leave(2, 0)">
                <div class="live-item">
                  <div class="o-body">
                    <svg class="o-bg" viewBox="0 0 87 107">
                      <path d="M83.1 107.3l-61.8-74L87.3 0l-4.2 107.3z" fill-opacity=".04"></path>
                      <path d="M67.7 70.1l-57.5 32.6 11.3-61.3 46.2 28.7z" fill-opacity=".13"></path>
                      <path d="M67.3 63.5L27 74.5l14.3-37.4 26 26.4z" fill-opacity=".02"></path>
                      <path d="M85.5 79.1L51 106.6l29.6-37.4 4.9 9.9z" fill-opacity=".2"></path>
                      <path d="M19.6 72.9L0 52.9l24.1 2-4.5 18z" fill-opacity=".07"></path>
                    </svg>
                    <router-link :to="history2[0].url">
                      <img :class="'o-img ' + [history2[0].move == true ? 'hide' : '']"
                           :src="img_url + history2[0].ornaments.img" alt="">
                      <img :class="'o-img3 ' + [history2[0].move == false ? 'hide' : '']"
                           :src="img_url + history2[0].box_img"
                           alt="">
                    </router-link>
                  </div>
                  <div class="o-bottom">
                    <div class="o-bottom-left">
                      <div class="o-user-info2">
                        <img class="o-user-avatar" :src="repair(history2[0].user.portrait)">
                      </div>
                      <div class="o-price2 price_box "><child-component v-html="symbol"></child-component> {{ history2[0].price }}</div>
                    </div>
                    <div class="o-bottom-right">
                      <div class="o-name">{{ history2[0].ornaments.name }}</div>
                      <div class="o-abrasion" v-if="history2[0].ornaments.appid == 730">{{
                          abrasion(history2[0].ornaments.abrasion)
                        }}{{
                          quality(history2[0].ornaments.quality, 3)
                        }}
                      </div>
                      <div class="o-abrasion" v-else>{{
                          quality2(history2[0].ornaments.quality2)
                        }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="top-wins-winner-place">
                  <span>1</span>
                  <svg class="icon-polygon" viewBox="0 0 91 91">
                    <g>
                      <g>
                        <path
                          d="M77.663 77.662L45.5 90.985 13.337 77.662.014 45.5l13.323-32.162L45.5.014l32.163 13.323 13.322 32.162z"/>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
              <div v-if="history2[2]" :class="'top-wins-winner top-wins-winner3 ' + color(history2[2].ornaments.color, 3)"
                   @mouseover="mouse_over(2, 2)" @mouseleave="mouse_leave(2, 2)">
                <div class="live-item">
                  <div class="o-body">
                    <svg class="o-bg" viewBox="0 0 87 107">
                      <path d="M83.1 107.3l-61.8-74L87.3 0l-4.2 107.3z" fill-opacity=".04"></path>
                      <path d="M67.7 70.1l-57.5 32.6 11.3-61.3 46.2 28.7z" fill-opacity=".13"></path>
                      <path d="M67.3 63.5L27 74.5l14.3-37.4 26 26.4z" fill-opacity=".02"></path>
                      <path d="M85.5 79.1L51 106.6l29.6-37.4 4.9 9.9z" fill-opacity=".2"></path>
                      <path d="M19.6 72.9L0 52.9l24.1 2-4.5 18z" fill-opacity=".07"></path>
                    </svg>
                    <router-link :to="history2[2].url">
                      <img :class="'o-img ' + [history2[2].move == true ? 'hide' : '']"
                           :src="img_url + history2[2].ornaments.img" alt="">
                      <img :class="'o-img3 ' + [history2[2].move == false ? 'hide' : '']"
                           :src="img_url + history2[2].box_img"
                           alt="">
                    </router-link>
                  </div>
                  <div class="o-bottom">
                    <div class="o-bottom-left">
                      <div class="o-user-info2">
                        <img class="o-user-avatar" :src="repair(history2[2].user.portrait)">
                      </div>
                      <div class="o-price2 price_box "><child-component v-html="symbol"></child-component> {{ history2[2].price }}</div>
                    </div>
                    <div class="o-bottom-right">
                      <div class="o-name">{{ history2[2].ornaments.name }}</div>
                      <div class="o-abrasion" v-if="history2[2].ornaments.appid == 730">{{
                          abrasion(history2[2].ornaments.abrasion)
                        }}{{
                          quality(history2[2].ornaments.quality, 3)
                        }}
                      </div>
                      <div class="o-abrasion" v-else>{{
                          quality2(history2[2].ornaments.quality2)
                        }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="top-wins-winner-place">
                  <span>3</span>
                  <svg class="icon-polygon" viewBox="0 0 91 91">
                    <g>
                      <g>
                        <path
                          d="M77.663 77.662L45.5 90.985 13.337 77.662.014 45.5l13.323-32.162L45.5.014l32.163 13.323 13.322 32.162z"/>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            <div class="top-wins-items">
              <div :class="'top-wins-item ' + color(item.ornaments.color, 3)" v-for="(item, index) in history2"
                   @mouseover="mouse_over(2, index)" @mouseleave="mouse_leave(2, index)" v-if="index > 2">
                <div :class="'live-item ' + [item.move == true ? 'active' : '']">
                  <div class="o-price price_box "><child-component v-html="symbol"></child-component> {{ item.price }}</div>
                  <div class="o-body">
                    <svg class="o-bg" viewBox="0 0 87 107">
                      <path d="M83.1 107.3l-61.8-74L87.3 0l-4.2 107.3z" fill-opacity=".04"></path>
                      <path d="M67.7 70.1l-57.5 32.6 11.3-61.3 46.2 28.7z" fill-opacity=".13"></path>
                      <path d="M67.3 63.5L27 74.5l14.3-37.4 26 26.4z" fill-opacity=".02"></path>
                      <path d="M85.5 79.1L51 106.6l29.6-37.4 4.9 9.9z" fill-opacity=".2"></path>
                      <path d="M19.6 72.9L0 52.9l24.1 2-4.5 18z" fill-opacity=".07"></path>
                    </svg>
                    <img :class="'o-img ' + [item.move == true ? 'hide' : '']" :src="img_url + item.ornaments.img"
                         alt="">
                  </div>
                  <div :class="'o-name ' + [item.move == true ? 'hide' : '']">{{ item.ornaments.name }}</div>
                  <div :class="'o-abrasion ' + [item.move == true ? 'hide' : '']" v-if="item.ornaments.appid == 730">{{
                      abrasion(item.ornaments.abrasion)
                    }}{{
                      quality(item.ornaments.quality, 3)
                    }}
                  </div>
                  <div :class="'o-abrasion ' + [item.move == true ? 'hide' : '']" v-else>{{
                      quality2(item.ornaments.quality2)
                    }}
                  </div>
                  <div :class="'o-overlay ' + [item.move == true ? 'active' : '']">
                    <div class="o-overlay-case-wrap">
                      <div class="o-overlay-case">
                        <img class="o-img2" :src="img_url + item.box_img" alt="">
                      </div>
                      <div class="o-user-info">
                        <img class="o-user-avatar" :src="repair(item.user.portrait)">
                      </div>
                    </div>
                    <router-link class="o-open" :to="item.url">打开</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3 class="top-wins-section-title">玩家对战</h3>
          <div class="top-wins-content top-wins-section" v-if="history3.length > 3">
            <div class="top-wins-tabs-wrap">
              <div class="top-wins-tabs">
                <button :class="'top-wins-tab ' + [date3 == 1 ? 'active' : '']" @click="date_switch(3, 1)">今日最佳
                </button>
                <button :class="'top-wins-tab ' + [date3 == 2 ? 'active' : '']" @click="date_switch(3, 2)">本周最佳
                </button>
                <button :class="'top-wins-tab ' + [date3 == 3 ? 'active' : '']" @click="date_switch(3, 3)">本月最佳
                </button>
              </div>
            </div>
            <div class="top-wins-winners">
              <div v-if="history3[1]" class="top-wins-winner top-wins-winner2">
                <router-link :to="history3[1].url">
                  <div class="win-card">
                    <div class="win-card-profit price_box "><child-component v-html="symbol"></child-component> {{ history3[1].shipment_price }}</div>
                    <div class="win-card-label">出货金额</div>
                    <div class="win-card-avatar-wrap">
                      <img :src="repair(history3[0].user.portrait)" class="win-card-avatar">
                    </div>
                    <div class="win-card-bottom">
                      <div class="win-card-bottom-left">
                        <div class="win-card-value price_box "><child-component v-html="symbol"></child-component> {{ history3[1].open_price }}</div>
                        <div class="win-card-label">成本</div>
                      </div>
                      <div class="win-card-bottom-right">
                        <div class="win-card-value">{{ history3[1].value2 }}</div>
                        <div class="win-card-label">玩家</div>
                      </div>
                    </div>
                  </div>
                </router-link>
                <div class="top-wins-winner-place">
                  <span>2</span>
                  <svg class="icon-polygon" viewBox="0 0 91 91">
                    <g>
                      <g>
                        <path
                          d="M77.663 77.662L45.5 90.985 13.337 77.662.014 45.5l13.323-32.162L45.5.014l32.163 13.323 13.322 32.162z"/>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
              <div v-if="history3[0]" class="top-wins-winner top-wins-winner1">
                <router-link :to="history3[0].url">
                  <div class="win-card">
                    <div class="win-card-profit price_box "><child-component v-html="symbol"></child-component> {{ history3[0].shipment_price }}</div>
                    <div class="win-card-label">出货金额</div>
                    <div class="win-card-avatar-wrap">
                      <img :src="repair(history3[0].user.portrait)" class="win-card-avatar">
                    </div>
                    <div class="win-card-bottom">
                      <div class="win-card-bottom-left">
                        <div class="win-card-value price_box "><child-component v-html="symbol"></child-component> {{ history3[0].open_price }}</div>
                        <div class="win-card-label">成本</div>
                      </div>
                      <div class="win-card-bottom-right">
                        <div class="win-card-value">{{ history3[0].value2 }}</div>
                        <div class="win-card-label">玩家</div>
                      </div>
                    </div>
                  </div>
                </router-link>
                <div class="top-wins-winner-place">
                  <span>1</span>
                  <svg class="icon-polygon" viewBox="0 0 91 91">
                    <g>
                      <g>
                        <path
                          d="M77.663 77.662L45.5 90.985 13.337 77.662.014 45.5l13.323-32.162L45.5.014l32.163 13.323 13.322 32.162z"/>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
              <div v-if="history3[2]" class="top-wins-winner top-wins-winner3">
                <router-link :to="history3[2].url">
                  <div class="win-card">
                    <div class="win-card-profit price_box "><child-component v-html="symbol"></child-component> {{ history3[2].shipment_price }}</div>
                    <div class="win-card-label">出货金额</div>
                    <div class="win-card-avatar-wrap">
                      <img :src="repair(history3[2].user.portrait)" class="win-card-avatar">
                    </div>
                    <div class="win-card-bottom">
                      <div class="win-card-bottom-left">
                        <div class="win-card-value price_box "><child-component v-html="symbol"></child-component> {{ history3[2].open_price }}</div>
                        <div class="win-card-label">成本</div>
                      </div>
                      <div class="win-card-bottom-right">
                        <div class="win-card-value">{{ history3[2].value2 }}</div>
                        <div class="win-card-label">玩家</div>
                      </div>
                    </div>
                  </div>
                </router-link>
                <div class="top-wins-winner-place">
                  <span>3</span>
                  <svg class="icon-polygon" viewBox="0 0 91 91">
                    <g>
                      <g>
                        <path
                          d="M77.663 77.662L45.5 90.985 13.337 77.662.014 45.5l13.323-32.162L45.5.014l32.163 13.323 13.322 32.162z"/>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            <div class="top-wins-items">
              <div class="top-wins-item" v-for="(item, index) in history3" v-if="index > 2">
                <router-link :to="history3[2].url">
                  <div class="win-card">
                    <div class="win-card-profit price_box "><child-component v-html="symbol"></child-component> {{ history3[2].shipment_price }}</div>
                    <div class="win-card-label">出货金额</div>
                    <div class="win-card-avatar-wrap">
                      <img :src="repair(history3[2].user.portrait)" class="win-card-avatar">
                    </div>
                    <div class="win-card-bottom">
                      <div class="win-card-bottom-left">
                        <div class="win-card-value price_box "><child-component v-html="symbol"></child-component> {{ history3[2].open_price }}</div>
                        <div class="win-card-label">成本</div>
                      </div>
                      <div class="win-card-bottom-right">
                        <div class="win-card-value">{{ history3[2].value2 }}</div>
                        <div class="win-card-label">玩家</div>
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {ttGet, ttPost, abrasion, quality, quality2, color, repair} from "@/utils/util.js";

export default {
  data() {
    return {
      img_url: this.$img_url,
      symbol: this.$getStore({name: 'symbol'}),
      loadingIndex: true,
      date: 1,
      history: [],
      date2: 1,
      history2: [],
      date3: 1,
      history3: [],
    }
  },
  mounted() {
    this.get_history();
    this.get_history2();
    this.get_history3();
  },
  methods: {
    abrasion, quality, quality2, color, repair,

    //获取盲盒开箱历史最佳
    get_history() {
      let date = this.date;
      ttGet("/api.php/user/get_history", {type: 1, date: date}, (res) => {
        this.loadingIndex = false;
        if (res.code == 200) {
          this.history = res.data.history.map((item) => {
            item.move = false;
            return item;
          });
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          });
        }
      });
    },

    //获取幸运开箱历史最佳
    get_history2() {
      let date2 = this.date2;
      ttGet("/api.php/user/get_history", {type: 2, date2: date2}, (res) => {
        this.loadingIndex = false;
        if (res.code == 200) {
          this.history2 = res.data.history.map((item) => {
            item.move = false;
            return item;
          });
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          });
        }
      });
    },

    //获取对战开箱历史最佳
    get_history3() {
      let date3 = this.date3;
      ttGet("/api.php/user/get_history", {type: 3, date3: date3}, (res) => {
        this.loadingIndex = false;
        if (res.code == 200) {
          this.history3 = res.data.history.map((item) => {
            item.move = false;
            return item;
          });
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          });
        }
      });
    },

    //切换
    date_switch(type, date) {
      switch (Number(type)) {
        case 1:
          this.date = date;
          this.get_history();
          break;
        case 2:
          this.date2 = date;
          this.get_history2();
          break;
        case 3:
          this.date3 = date;
          this.get_history3();
          break;
      }
    },

    //移入
    mouse_over(type, index) {
      switch (Number(type)) {
        case 1:
          this.history[index].move = true;
          break;
        case 2:
          this.history2[index].move = true;
          break;
        case 3:
          this.history3[index].move = true;
          break;
      }
    },

    //移出
    mouse_leave(type, index) {
      switch (Number(type)) {
        case 1:
          this.history[index].move = false;
          break;
        case 2:
          this.history2[index].move = false;
          break;
        case 3:
          this.history3[index].move = false;
          break;
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.vue-view {
  margin-bottom: 70px;
}

.profile {
  margin-top: 30px;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.profile-title {
  display: flex;
  align-items: center;
  margin: 3px 0 0;
  flex-grow: 1;
  font-size: 27px;
  color: #fff;
  font-weight: 500;
}

.icon-cubes-2 {
  position: relative;
  width: 24px;
  height: 26px;
  margin-right: 20px;
  fill: #7349ca;
}

.top-wins-content {
  background-color: #131528;
  border-radius: 5px;
}

.top-wins-section-title {
  position: relative;
  z-index: 0;
  margin: 50px;
  color: #fff;
  font-size: 24px;
  font-weight: 500;
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 196px;
    height: 106px;
    background: url("~@/assets/img/heading-bg.svg") center/contain no-repeat;
    transform: translate(-55%, -55%);
  }

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 2px;
    border-radius: 50%;
    background-color: rgba(58, 62, 95, .5);
    box-shadow: 0 0 30px 10px #3a3e5f;
  }
}

.top-wins-section {
  margin-top: 60px;
}

.top-wins-tabs-wrap {
  position: relative;
  z-index: 0;
  -ms-touch-action: auto;
  touch-action: auto;
  height: auto;
}

.top-wins-tabs {
  display: flex;
}

.top-wins-tab {
  border: 0;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 82px;
  padding-top: 4px;
  color: #4c4f6b;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: .04em;
  border-bottom: 1px solid transparent;
  white-space: nowrap;
  transition: color .15s;

  &.active {
    color: #a5a7ff;
    border-bottom-color: #6265d9;
  }

  &:not(:last-child) {
    margin-right: 46px;
  }
}

.top-wins-winners {
  display: flex;
  justify-content: center;
  background-color: #101120;
  min-height: 560px;
}

.top-wins-winner {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px 20px 0;
  width: 240px;
}

.top-wins-winner2 {
  &::after {
    content: '';
    order: 1;
    opacity: .13;
    height: 50px;
    background-image: linear-gradient(16deg, #424d56 0, #849dab 100%);
  }
}

.top-wins-winner1 {
  &::after {
    content: '';
    order: 1;
    opacity: .13;
    height: 80px;
    background-image: linear-gradient(16deg, #3f3a2e 0, #e3d55c 100%);
  }
}

.top-wins-winner3 {
  &::after {
    content: '';
    order: 1;
    opacity: .13;
    height: 30px;
    background-image: linear-gradient(16deg, #6d564c 0, #c38155 100%);
  }
}

.top-wins-items {
  display: flex;
  flex-wrap: wrap;
  padding: 30px 21px 22px;
}

.top-wins-item {
  flex: 0 0 12.5%;
  max-width: 12.5%;
  padding-left: 4px;
  padding-right: 4px;
  margin-bottom: 8px;
}

.live-item {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: relative;
  background-color: #131528;
  font-size: 11px;
  color: #cbccd6;
  line-height: 1.3;
  border-top-color: transparent;
  border-left-color: transparent;
  user-select: none;
  background-color: rgba(23, 26, 48, .65);
  border-radius: 5px;
  padding: 20px 25px 25px;
  border: 0;
  transition: box-shadow .15s;
  height: 100%;

  &.active {
    background-color: #1e203b;
    box-shadow: 0 16px 34px rgba(17, 19, 35, .96);
  }
}

.o-price {
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  z-index: 2;
  font-size: 13px;
  font-weight: 700;
  color: #7bdca2;
  text-align: right;
  margin-bottom: 10px;
  margin-right: -10px;
}

.o-bottom {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.o-body {
  margin-bottom: 6px;
  width: 100%;
}

.o-img {
  max-width: calc(100% + 20px);
}

.o-bg {
  width: 88px;
  height: 108px;
}

.o-overlay {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  visibility: hidden;
  opacity: 0;
  align-items: stretch;
  justify-content: center;
  z-index: 2;
  padding: 20px 0 18px;
  border-radius: 5px;

  &.active {
    visibility: visible;
    opacity: 1;
  }
}

.hide {
  opacity: 0 !important;
}

.o-overlay-case-wrap {
  position: relative;
  padding: 0 15px 20px;
  overflow: hidden;
}

.o-overlay-case {
  z-index: 1;
  position: relative;
  top: 0;
  left: 0;
  transform: none;
  opacity: 1;
  margin-left: -5px;
  margin-right: -5px;

  img {
    max-width: 100%;
    height: auto;
    filter: contrast(1);
    display: block;
    margin: 0 auto;
  }
}

.o-user-info {
  position: absolute;
  z-index: 1;
  bottom: 20px;
  right: 15px;
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, .8));
}

.o-user-avatar {
  display: block;
  width: 50px;
  height: 50px;
  margin-bottom: 0;
  border-radius: 12px;
  -webkit-clip-path: polygon(0 50%, 15% 15%, 50% 0, 85% 15%, 100% 50%, 85% 85%, 50% 100%, 15% 85%);
  clip-path: polygon(0 50%, 15% 15%, 50% 0, 85% 15%, 100% 50%, 85% 85%, 50% 100%, 15% 85%);
}

.o-open {
  border: 0;
  cursor: pointer;
  border-radius: 4px;
  padding-top: 3px;
  text-transform: uppercase;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 18px;
  margin-right: 18px;
  height: 42px;
  background-color: #3a34b0;
  color: #fff;
  font-weight: 700;
  font-size: 13px;
  transition: background-color .15s;
}

.top-wins-winner {
  .live-item {
    background-color: transparent;
    border: 0;
    padding-bottom: 5px;
    height: auto;
  }

  .o-user-avatar {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    margin-bottom: 4px;
  }
}

.o-price2 {
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  z-index: 2;
  font-weight: 700;
  color: #7bdca2;
  margin-bottom: 0;
  font-size: 16px;
}

.o-bottom-right {
  text-align: right;
}

.o-img3 {
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  opacity: 1;
  width: 160px;
  transform: translate(-50%, -50%);
  display: block;
  margin: 0 auto;
  cursor: pointer;
}

.icon-polygon {
  transform: translate(-50%, -50%);
  position: absolute;
  z-index: -2;
  top: calc(50% - 1px);
  left: 50%;
  width: 30px;
  height: 30px;
  font-size: 13px;
}

.top-wins-winner-place {
  position: relative;
  z-index: 0;
  margin-bottom: -10px;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  color: #fff;

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    box-shadow: 0 0 20px 10px #a1a5c6;
  }

  &::after {
    content: '';
    position: absolute;
    z-index: -3;
    top: 50%;
    left: 50%;
    width: 122px;
    height: 112px;
    background: center/contain no-repeat;
  }
}

.top-wins-winner2 {
  .top-wins-winner-place {
    &::before {
      box-shadow: 0 0 20px 10px #a1a5c6;
    }

    &::after {
      background-image: url("~@/assets/img/place-triangles-2.svg");
      transform: translate(-45%, -60%);
    }

    .icon-polygon {
      color: #a1a5c6;
    }
  }
}

.top-wins-winner1 {
  .top-wins-winner-place {
    &::before {
      box-shadow: 0 0 20px 10px #cfad38;
    }

    &::after {
      background-image: url("~@/assets/img/place-triangles-1.svg");
      transform: translate(-45%, -60%);
    }

    .icon-polygon {
      color: #cfad38;
    }
  }
}

.top-wins-winner3 {
  .top-wins-winner-place {
    &::before {
      box-shadow: 0 0 20px 10px #ad7747;
    }

    &::after {
      background-image: url("~@/assets/img/place-triangles-3.svg");
      transform: translate(-45%, -60%);
    }

    .icon-polygon {
      color: #ad7747;
    }
  }
}

.win-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  border-radius: 5px;
  text-align: center;
  padding: 20px 0 10px;
}

.win-card-profit {
  color: #7bdca2;
  font-weight: 700;
  line-height: 1.25;
  font-size: 18px;
}

.win-card-label {
  font-size: 10px;
  color: #4b4d5f;
  font-weight: 500;
}

.win-card-avatar-wrap {
  position: relative;
  z-index: 0;
  display: inline-block;
  flex-shrink: 0;
  margin-top: 15px;
  margin-bottom: -8px;

  &::before {
    top: 50%;
    border-radius: 50%;
    content: '';
    position: absolute;
    z-index: -1;
    left: 50%;
    width: 2px;
    height: 2px;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 45px 30px #5f4de5;
  }

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 50%;
    -webkit-clip-path: polygon(0 50%, 15% 15%, 50% 0, 85% 15%, 100% 50%, 85% 85%, 50% 100%, 15% 85%);
    clip-path: polygon(0 50%, 15% 15%, 50% 0, 85% 15%, 100% 50%, 85% 85%, 50% 100%, 15% 85%);
    background-color: #5f4de5;
  }
}

.win-card-avatar {
  display: block;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  -webkit-clip-path: polygon(0 50%, 15% 15%, 50% 0, 85% 15%, 100% 50%, 85% 85%, 50% 100%, 15% 85%);
  clip-path: polygon(0 50%, 15% 15%, 50% 0, 85% 15%, 100% 50%, 85% 85%, 50% 100%, 15% 85%);
  width: 92px;
  height: 92px;
}

.win-card-bottom {
  display: flex;
  align-self: stretch;
  justify-content: space-between;
  align-items: flex-end;
}

.win-card-bottom-left {
  text-align: left;
}

.win-card-value {
  font-weight: 500;
  color: #cbccd6;
  line-height: 1.25;
  font-size: 19px;
}

.win-card-label {
  color: #4b4d5f;
  font-weight: 500;
  font-size: 10px;
}

.win-card-bottom-right {
  text-align: right;
}

.top-wins-item {
  .win-card {
    background-color: #171a30;
    padding: 25px 20px 20px;
  }

  .win-card-profit {
    font-size: 15px;
  }

  .win-card-label {
    font-size: 9px;
  }

  .win-card-avatar-wrap {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .win-card-avatar {
    width: 70px;
    height: 70px;
  }

  .win-card-value {
    font-size: 15px;
  }
}

.top-wins-item .win-card:hover {
  background-color: #1e203b;
  box-shadow: 0 16px 34px rgb(17 19 35 / 96%);
}

@media (min-width: 480px) {
}

@media (min-width: 768px) {
  .top-wins-tabs {
    justify-content: center;
  }

  .top-wins-winners {
    min-height: 305px;
  }
}

@media (min-width: 992px) {
}

@media (min-width: 1200px) {
}

@media (min-width: 1440px) {
}

@media only screen and (max-width: 1439px) {
  .top-wins-item {
    flex: 0 0 14.28571%;
    max-width: 14.28571%;
  }
}

@media only screen and (max-width: 1199px) {
  .top-wins-item {
    flex: 0 0 20%;
    max-width: 20%;
  }
}

@media only screen and (max-width: 991px) {
  .top-wins-item {
    flex: 0 0 25%;
    max-width: 25%;
  }
}

@media only screen and (max-width: 767px) {
  .profile-inner {
    padding: 0;
  }

  .top-wins-tab {
    height: 70px;
    font-size: 12px;

    &:not(:last-child) {
      margin-right: 20px;
    }
  }

  .top-wins-items {
    padding: 20px 11px 12px;
  }

  .top-wins-item {
    flex: 0 0 50%;
    max-width: 50%;
  }

  .top-wins-winners {
    flex-wrap: wrap;
  }

  .top-wins-winner1 {
    order: -1;
  }

  .top-wins-section-title {
    margin-bottom: 30px;
    font-size: 16px;
  }
}

@media only screen and (max-width: 479px) {
}
</style>
