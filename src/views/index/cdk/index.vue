<template>
  <div class="cdk-bg" style="margin-top:20px;">
    <div class="MuiBox-root jss6688">
      <div style="
        height: calc(100% - 50px);
        overflow-y: auto;
        background-color: rgb(97, 28, 32);
      ">
        <div class="dialog-close" @click="dialogClose">
          <el-icon class="el-icon-close"></el-icon>
        </div>
        <div class="jss2340">
          <div class="jss2341">
            <div class="jss2360">
              <div class="jss2346">
                <div class="jss2378">
                  <img class="jss2379" :src="server_url + '/public/static/audio/hb.png'" />
                </div>
                <p class="MuiTypography-root jss2409 MuiTypography-body2 MuiTypography-noWrap">
                  <span class="MuiBox-root jss2424">赶紧来抢红包，开神器！！</span>
                </p>
                <div class="jss2375">
                  <div class="MuiFormControl-root MuiFormControl-fullWidth">
                    <div class="MuiInputBase-root jss2348 MuiInputBase-formControl">
                      <input v-model="cdk" aria-invalid="false" placeholder="输口令，领红包" type="text"
                        class="MuiInputBase-input jss2349 cdkValue" value="" />
                    </div>
                  </div>
                  <div class="MuiFormControl-root jss2376 MuiFormControl-marginNormal">
                    <button
                      class="cdkBtn MuiButtonBase-root MuiButton-root MuiButton-text jss2350 MuiButton-textSizeLarge MuiButton-sizeLarge MuiButton-fullWidth"
                      tabindex="0" @click="to_cdk">
                      <span class="MuiButton-label">
                        <div>打开</div>
                      </span><span class="MuiTouchRipple-root"></span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="jss2345">
                <div class="MuiBox-root jss2421">
                  <div class="MuiBox-root jss2422 jss2380">
                    <img class="jss2381"
                      src="data:image/png;base64,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" />
                  </div>
                  <div class="MuiBox-root jss2423 jss2385">

                    <div :key="item.id" v-for="item in data" class="MuiBox-root jss2427 jss2386">
                      <div class="MuiBox-root jss2428 jss2387">
                        <div class="MuiBox-root jss2429 jss2388">
                          <div class="jss2389" style="color: rgb(161, 67, 2)">
                            <div style="display: flex; align-items: center">
                              <svg class="MuiSvgIcon-root coin_SvgIcon__icon" focusable="false" viewBox="0 0 1024 1024"
                                aria-hidden="true" width="1em" height="1em" style="
                                    color: rgb(161, 67, 2);
                                    font-size: 16px;
                                    margin-right: 5px;
                                  ">
                                <path
                                  d="M512 0a512 512 0 1 1 0 1024A512 512 0 0 1 512 0z m0 66.752a445.248 445.248 0 1 0 0 890.496A445.248 445.248 0 0 0 512 66.752z m0 44.544a400.64 400.64 0 1 1 0 801.408A400.64 400.64 0 0 1 512 111.296z m200.32 222.592H363.52l17.856 23.936-47.488 332.288h118.4l17.856-132.8h200.96l6.144-60.416H481.856l11.712-102.592h213.248l5.504-60.416z"
                                  p-id="1239"></path>
                              </svg>
                              <span style="font-size: 14px">
                                {{ item.type >= 4 && item.type <= 6 ? '999999' : item.total }}
                              </span>
                            </div>
                          </div>
                          <div class="jss2390">
                            <div style="font-size: 12px; color: rgb(255, 255, 255)">
                              红包数量
                            </div>
                            <span v-if="(item.total - item.issued) > 0" class="MuiBox-root jss2430"
                              style="font-size: 12px; color: rgb(246, 192, 130)">
                              充足
                            </span>

                            <span v-else class="MuiBox-root jss2430" style="font-size: 12px; color: rgb(246, 192, 130)">
                              不足
                            </span>
                          </div>
                        </div>
                        <div class="MuiBox-root jss2431 jss2399">
                          <div class="MuiBox-root jss2432 jss2400">
                            {{ item.name }}
                            <span v-if="(item.total - item.issued) > 0" style="
                                  padding-left: 10px;
                                  font-size: 12px;
                                  color: rgb(227, 201, 126);
                                ">
                              开抢中...</span>
                            <span v-else style="
                                  padding-left: 10px;
                                  font-size: 12px;
                                  color: rgb(227, 201, 126);
                                ">
                              已抢光</span>
                          </div>
                          <div class="MuiBox-root jss2433 jss2401">
                            <span class="MuiBox-root jss2434">参与条件：</span>
                            <span v-show="item.type === 1" class="MuiBox-root jss2435">免费可领</span>
                            <span v-show="item.type === 2" class="MuiBox-root jss2435">充值 ￥{{ item.where_value }}
                              可领</span>
                            <span v-show="item.type === 4" class="MuiBox-root jss2435">亏损大于500可领</span>
                            <span v-show="item.type === 5" class="MuiBox-root jss2435">昨日充值大于300可领</span>
                            <span v-show="item.type === 6"
                              class="MuiBox-root jss2435">月累计充值达到￥{{ item.where_value }}可领</span>
                          </div>
                          <div v-if="item.type == 1" class="MuiBox-root jss2436 jss2403">
                            <span>活动时间：</span>
                            <span class="MuiBox-root jss2438"> 无限制 </span>
                          </div>
                          <div v-if="item.type == 2" class="MuiBox-root jss2436 jss2403">
                            <span>活动时间</span>
                            <span class="MuiBox-root jss2437">：{{ item.where_start_time_text }}</span>
                            <span class="MuiBox-root jss2438"> 至 </span>
                            <span class="MuiBox-root jss2439">{{ item.where_end_time_text }}</span>
                          </div>
                          <div v-if="item.type == 4" class="MuiBox-root jss2436 jss2403">
                            <span>亏损时间</span>
                            <span class="MuiBox-root jss2437">：{{ item.ks_start_time_text }}</span>
                            <span class="MuiBox-root jss2438"> 至 </span>
                            <span class="MuiBox-root jss2439">{{ item.ks_end_time_text }}</span>
                          </div>
                          <div v-if="item.type == 4" class="MuiBox-root jss2436 jss2403">
                            <span>领取时间</span>
                            <span class="MuiBox-root jss2437">：{{ item.where_start_time_text }}</span>
                            <span class="MuiBox-root jss2438"> 至 </span>
                            <span class="MuiBox-root jss2439">{{ item.where_end_time_text }}</span>
                          </div>
                          <div v-if="item.type == 5" class="MuiBox-root jss2436 jss2403">
                            <span>领取时间</span><span class="MuiBox-root jss2437">：长期</span>
                          </div>
                          <div v-if="item.type == 6" class="MuiBox-root jss2436 jss2403">
                            <span>领取时间</span><span class="MuiBox-root jss2437">：当月</span>
                          </div>
                        </div>
                      </div>
                      <div class="MuiBox-root jss2440 jss2391">
                        <div class="MuiBox-root jss2441">
                          <div class="MuiBox-root jss2506">
                            <div v-if="(item.total - item.issued) > 0" class="MuiBox-root jss2507 jss2491">
                              开抢中...
                            </div>
                            <div v-else class="MuiBox-root jss2507 jss2491">
                              已抢光
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <video muted="muted" id="startvideo" class="video" :src="server_url + '/public/static/audio/nuke720p.083a1090.webm'"
      type="video/webm" poster="false.png" autoplay="autoplay" loop="-1">
      <p>你的浏览器不支持video标签.</p>
    </video>
    <video muted="muted" id="startvideo1" class="video1"
      :src="server_url + '/public/static/audio/bandicam.988f2717.webm'" type="video/webm" poster="false.png"
      autoplay="autoplay" loop="-1">
      <p>你的浏览器不支持video标签.</p>
    </video>
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
  export default {
    mounted() {
      //获取四个视频的id
      var video = document.getElementById("startvideo");
      //调用video标签的播放函数
      video.play();
      var video1 = document.getElementById("startvideo1");
      //调用video标签的播放函数
      video1.play();
    },
    data() {
      return {
        server_url: this.$server_url,
        img_url: this.$img_url,
        symbol: getStore({
          name: "symbol"
        }),
        cdk: '',
        data: [],
      };
    },
    mounted() {
      this.get_cdk();
    },
    methods: {
      dialogClose() {
        this.$router.back();
      },
      //获取cdk
      get_cdk() {
        ttGet("/api.php/index/get_cdk", {}, (res) => {
          this.loading = false;
          if (res.code == 200) {
            this.data = res.data.data;
            //   console.log(this.data)
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        });
      },

      //cdk充值
      to_cdk() {
        let cdk = this.cdk;
        if (!cdk) {
          return this.$message({
            message: '请输入cdk!',
            type: 'warning'
          });
        }
        let loading = this.$loading({
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        var dates = new Date();
        var times = dates.getTime();
        var random = generateMixed(4);
        var sign = rsa_encrypt(times + "-" + cdk + "-" + random);
        ttPost("/api.php/user/to_cdk", {
          cdk: cdk,
          times: times,
          random: random,
          sign: sign
        }, (res) => {
          loading.close();
          if (res.code == 200) {
            let balance = res.data.balance;
            this.$emit('user_bean', {
              balance: balance
            });
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
  };
</script>
<style lang="scss" scoped>
  .dialog-close {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 999;
    color: rgba(255, 255, 255, .8);
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
  }

  .MuiFormControl-root {
    border: 0;
    margin: 0;
    display: inline-flex;
    padding: 0;
    position: relative;
    min-width: 0;
    flex-direction: column;
    vertical-align: top;
  }

  .MuiButtonBase-root {
    color: inherit;
    border: 0;
    cursor: pointer;
    margin: 0;
    display: inline-flex;
    outline: 0;
    padding: 0;
    position: relative;
    align-items: center;
    user-select: none;
    border-radius: 0;
    vertical-align: middle;
    -moz-appearance: none;
    justify-content: center;
    text-decoration: none;
    background-color: transparent;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
  }

  .MuiButton-root {
    color: #C3C3E2;
    padding: 6px 16px;
    font-size: 0.875rem;
    min-width: 64px;
    box-sizing: border-box;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 500;
    line-height: 1.75;
    border-radius: 5px;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
  }

  .cdk-bg {
    width: 100%;
    position: relative;
  }

  .video {
    position: fixed;
    object-fit: fill;
    top: 0px;
    left: 0px;
    z-index: 1;
  }

  .video1 {
    position: fixed;
    height: 100%;
    top: 0px;
    right: 300px;
    z-index: 2;
  }

  @media (max-width: 1200px) {
    .video1 {
      position: fixed;
      height: 100%;
      top: 100px;
      right: 0px;
      z-index: 2;
    }
  }

  @media (max-width: 720px) {
    .video1 {
      display: none;
    }

    .video {
      display: none;
    }
  }

  .jss6688 {
    position: relative;
    z-index: 5;
    width: 720px;
    display: block;
    height: auto;
    margin: 30px auto;
    margin-top: 0px;
  }

  @media screen and (max-width: 768px) {
    .jss6688 {
      z-index: 3;
      width: 100%;
      display: block;
    }
  }

  .jss2341 {
    width: 100%;
  }

  .jss2340 {
    width: 100%;
    position: relative;
    background: url(https://www.69skins.cn/public/static/audio/background.9000060e.png) no-repeat;
    background-size: 100% 100%;
  }

  .jss2340 {
    width: 100%;
    position: relative;
    background: url(/static/audio/background.9000060e.png) no-repeat;
    background-size: 100% 100%;
  }

  .jss2341 {
    width: 100%;
  }

  .jss2342 {
    color: rgba(255, 255, 255, .5);
    font-size: 14px;
    margin-top: 10px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 1.5;
  }

  .jss2343 {
    top: 0;
    z-index: 2;
    position: absolute;
    transform: rotateY(180deg);
    transition: all 0.5s ease-out 0s;
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }

  .jss2344 {
    width: 100%;
    display: block;
    user-select: none;
    pointer-events: none;
  }

  .jss2345 {
    padding: 0 10px 10px 10px;
    position: relative;
  }

  .jss2346 {
    color: white;
    width: 100%;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  .jss2347 {
    color: white;
    width: 100%;
    height: 164px;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  .jss2348 {
    color: #fff;
    width: 362px;
    border: 0px;
    height: 40px;
    outline: none;
    font-size: 14px;
    box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
    border-radius: 0;
    background-color: rgba(0, 0, 0, .3);
  }

  @media screen and (max-width: 768px) {
    .jss2348 {
      width: 81vw;
    }
  }

  .jss2349 {
    text-align: center;
  }

  .jss2350 {
    opacity: 0.9;
    font-size: 14px;
    text-transform: none;
    text-decoration: none;
  }

  .jss2350:hover {
    opacity: 1;
    box-shadow: none;
  }

  .jss2351 {
    color: #FFFFFF;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    text-decoration: underline;
  }

  .jss2352 {
    color: #303232;
    border: 1px solid #A14302;
    padding-left: 16px;
    border-radius: 4px;
    padding-right: 16px;
    background-color: #FED699;
  }

  .jss2353 {
    padding-top: 0;
  }

  .jss2354 {
    padding-left: 15px;
    padding-right: 15px;
  }

  .jss2355 .MuiTypography-body1 {
    overflow: hidden;
    font-size: 14px;
    word-break: break-all;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .jss2355 .MuiTypography-body2 {
    font-size: 12px;
  }

  .jss2356 {
    min-width: 46px;
  }

  .jss2357 {
    font-size: 14px;
    font-weight: bold;
    line-height: 20px;
  }

  .jss2358 {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .jss2359 {
    top: 53px;
    left: 50%;
    color: #FFFFFF;
    width: 100%;
    height: 40px;
    z-index: 1;
    position: absolute;
    font-size: 12px;
    transform: translateX(-50%);
    background: #1C1C1C;
    text-align: center;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    line-height: 40px;
  }

  .jss2360 {
    z-index: 2;
    position: relative;
    transform: rotateY(0deg);
    transition: all 0.5s ease-out 0s;
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }

  .jss2361 {
    z-index: 0;
    transform: rotateY(-180deg);
  }

  .jss2362 {
    z-index: 2;
    transform: rotateY(0deg);
  }

  .jss2363 {
    width: 100%;
    z-index: 2;
    transform: rotateY(0deg);
  }

  .jss2364 {
    top: -20px;
    left: 0;
    color: #FFB7A5;
    width: 100%;
    height: 100%;
    z-index: 0;
    position: absolute;
    transform: rotateY(180deg);
    box-sizing: border-box;
    transition: all 0.5s ease-out 0s;
    padding-top: 40px;
    padding-left: 16px;
    border-radius: 8px;
    padding-right: 16px;
    padding-bottom: 54px;
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }

  .jss2364 .MuiTypography-gutterBottom {
    margin-bottom: 32px;
  }

  .jss2365 {
    z-index: 2;
    transform: rotateY(0deg);
  }

  .jss2366 {
    width: 280px;
    margin: 0 auto;
  }

  .jss2367 {
    width: 150px;
    margin: 0 auto;
    padding: 10px;
    background-color: #fff;
  }

  .jss2367 img {
    width: 100%;
  }

  .jss2368 {
    color: #000;
    width: 75%;
    cursor: pointer;
    height: 42px;
    margin: 20px auto 0;
    display: block;
    text-align: center;
    line-height: 42px;
    border-radius: 5px;
    text-decoration: none;
    background-color: #fff;
  }

  .jss2368:hover {
    color: #fff;
    background-color: #E9B10E;
  }

  .jss2368:hover:not(.MuiButton-root) {
    color: #fff;
    text-decoration: none;
  }

  .jss2369 {
    width: 280px;
    height: 26px;
    padding: 0 10px;
    position: relative;
    font-size: 13px;
    background: linear-gradient(to right, transparent 10%, rgba(0, 0, 0, .2) 50%, transparent 85%);
    margin-top: 10px;
    overflow-y: auto;
    text-align: center;
    line-height: 26px;
    border-radius: 13px;
  }

  .jss2369::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  .jss2369::-webkit-scrollbar-thumb {
    width: 0px;
    height: 0px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  .jss2370 {
    width: 234px;
    margin: 0 auto;
  }

  .jss2371 {
    width: 280px;
    margin: 0 auto;
  }

  .jss2372 {
    height: 30px;
    display: flex;
    overflow-x: hidden;
    overflow-y: hidden;
    align-items: center;
    line-height: 30px;
    justify-content: center;
  }

  .jss2373 {
    height: 180px;
    overflow-x: hidden;
    overflow-y: auto;
    margin-right: -10px;
    padding-right: 10px;
  }

  .jss2373::-webkit-scrollbar {
    width: 4px;
    height: 0px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  .jss2373::-webkit-scrollbar-thumb {
    width: 5px;
    height: 44px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  .jss2374 {
    color: #FFC700;
    margin: 0 5px;
    overflow: hidden;
  }

  .jss2375 {
    display: flex;
    outline: none;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  .jss2376 {
    color: #FFFFFF;
    width: 200px;
    height: 40px;
    font-size: 14px;
    background: #E67000;
    text-align: center;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    line-height: 40px;
  }

  .jss2377 {
    color: #FF9378;
    margin: 0 5px;
    font-size: 14px;
    text-align: center;
  }

  .jss2378 {
    width: 398px;
    height: 37px;
    margin: 24px auto 0px;
    font-size: 0;
  }

  @media screen and (max-width: 768px) {
    .jss2378 {
      width: auto;
      height: auto;
      text-align: center;
    }
  }

  .jss2379 {
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    .jss2379 {
      width: 90%;
    }
  }

  .jss2380 {
    width: 490px;
    margin: 20px auto 14px;
    font-size: 0;
  }

  @media screen and (max-width: 768px) {
    .jss2380 {
      width: 90%;
    }
  }

  .jss2381 {
    width: 100%;
  }

  .jss2382 {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .jss2383 {
    width: 63px;
    height: 1px;
    background: linear-gradient(to right, #C02931, #FF9378);
    ;
    margin-top: 10px;
  }

  .jss2384 {
    width: 63px;
    height: 1px;
    background: linear-gradient(to right, #FF9378, #C02931);
    ;
    margin-top: 10px;
  }

  .jss2385 {
    height: 280px;
    padding: 10px 5px 0px 10px;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, .3);
  }

  .jss2385 {
    width: 97%;
    margin: 0 auto;
    overflow-x: hidden;
    overflow-y: auto;
  }

  @media screen and (max-width: 768px) {
    .jss2385 {
      height: 95vw;
      padding: 10px 5px 0px 10px;
      box-sizing: border-box;
      background-color: rgba(0, 0, 0, .3);
    }
  }

  .jss2385::-webkit-scrollbar {
    width: 4px;
    height: 0px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  .jss2385::-webkit-scrollbar-thumb {
    width: 5px;
    height: 44px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  .jss2386 {
    width: 660px;
    display: flex;
    padding: 15px;
    background: #743231;
    margin-bottom: 10px;
  }

  .jss2386:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  @media screen and (max-width: 768px) {
    .jss2386 {
      width: auto;
      display: block;
    }

    .jss2386:hover {
      background: #743231;
    }
  }

  .jss2387 {
    width: 100%;
    display: flex;
    margin-top: 5px;
    justify-content: space-between;
  }

  .MuiInputBase-input {
    font: inherit;
    color: currentColor;
    width: 100%;
    border: 0;
    height: 1.1876em;
    margin: 0;
    display: block;
    padding: 14px 0 7px;
    min-width: 0;
    background: none;
    box-sizing: content-box;
    animation-name: mui-auto-fill-cancel;
    letter-spacing: inherit;
    animation-duration: 10ms;
    -webkit-tap-highlight-color: transparent;
  }

  .jss2388 {
    width: 91px;
    height: 90px;
    position: relative;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALYAAAC0CAMAAAAO5iY9AAAAk1BMVEUAAAD/sYfqTDn3wYL/yor3wIPqTDn2wIL3wYLpSzj2wIP3wIPqTDn3wIP2wYL3wIP4woXtTTvpSzjqSzjpTDnpTDnsTjrqTTj5woTsTDnzUTrpSzj2wILynGzueFX1t3zucE/rXUPqUj30qHLylGbxjGHwhVztakzsZ0r2vYD0rXb1snnzpG/vfljudVLsZEjrWUAcuQ40AAAAG3RSTlMABpLyGPTz49nVx7+alpWCRyvf2dO9XFYtGxaOkXPkAAACUklEQVR42u3dyW7iQBhFYWMyQJgzJ67ygCdmeP+naywhuaUYbqs7nZSjc1YsP1392Et7TXWm40Gva769bm8wnna8P+tq5IC4rju68nSdybVxrOtJR059ZxzsTgz+emuc7Pb14taOqo/uC3t3nLyQ052cv++JcbjJ2RNx7hnye9fnzmRknG505rKdest8rNt83VPjeNNG9tg43riRPTCON2hk94zj9RrZjv8jjek2so3zwb4QbNgy2LBlsGHLYMOWwYYtgw1bBhu2DDZsGWzYMtiwZbBhy2DDlsGGLYMNWwYbtgz2T2HfD5/f2sV+ex7ee8Gxh+HLezvY7y/Dh0rsBacefRsZp4us/1hJT+y6JMxWxslWWZhUwkZ21bws3Jo9skU5r31N7Hr2fOOAPdrkp5Elu+4QF3Ztvqm1LeJDbRHsD80X2yz90uGjNNsu6qsQbIEPc7tamv/acmXz8ANYsnVJvM1tGn3+vjbfxkkgUmzNL8Mis+l6+U/jrlObFWEpuIL9V82TfRwWeWY36SpaSmi0Sjc2y4sw3ifiGERe8InND8l+sSjLOI53u/DYbnf8WZaLxT45aGegq9mtDPaFYMOWwYYtgw1bBhu2DDZsGWzYMtiwZbBhy2DDlsGGLYMNWwYbtgw2bBls2DLYsGWwYctgw5bBhi2DDVsGG7YMNmwZbNgy2LBlsGHLYMOWwYYtgw1bBhu2DDZsGWzYX593E7SwG68ftLC+5wctzPdmQQubeW2c26++q/sUtKynjle5W7a3X6mrZn6/Jc/Bm74/q8S/ANSqFXyBpyKnAAAAAElFTkSuQmCC) no-repeat center;
    margin-right: 16px;
    background-size: 100% 100%;
  }

  .jss2389 {
    top: 10px;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
  }

  .jss2390 {
    left: 50%;
    width: 100%;
    bottom: 8px;
    position: absolute;
    transform: translateX(-50%);
    text-align: center;
  }

  .jss2391 {
    cursor: pointer;
    margin-top: 10px;
  }

  @media screen and (max-width: 768px) {
    .jss2391 {
      margin-left: 115px;
    }
  }

  .jss2392 {
    color: #FFF;
    width: 90px;
    height: 30px;
    font-size: 12px;
    text-align: center;
    font-weight: 600;
    line-height: 30px;
    background-color: #BD3840;
  }

  .jss2393 {
    color: #FFF;
    width: 90px;
    height: 30px;
    font-size: 12px;
    text-align: center;
    font-weight: 600;
    line-height: 30px;
    background-color: #7f7f7f;
  }

  .jss2394 {
    color: #FFF;
    width: 90px;
    height: 30px;
    font-size: 12px;
    background: #f59a23;
    text-align: center;
    font-weight: 600;
    line-height: 30px;
  }

  .jss2395 {
    color: #FFF;
    width: 90px;
    height: 30px;
    font-size: 12px;
    background: #f59a23;
    text-align: center;
    font-weight: 600;
    line-height: 30px;
  }

  .jss2396 {
    color: #A14302;
    font-size: 15px;
    text-align: center;
    font-weight: 500;
    line-height: 18px;
  }

  .jss2397 {
    color: #F6C082;
    width: 100%;
    bottom: 8px;
    position: absolute;
    font-size: 12px;
    text-align: center;
  }

  .jss2398 {
    color: #FF9378;
    margin: 5px 0;
    font-size: 12px;
  }

  .jss2399 {
    flex: 1;
    color: #FF9378;
    margin-left: 8px;
  }

  .jss2400 {
    color: #fff;
    font-size: 16px;
  }

  .jss2401 {
    color: rgba(255, 255, 255, .5);
    margin: 20px 0 10px;
    display: flex;
    font-size: 12px;
    word-break: break-all;
    line-height: 20px;
  }

  @media screen and (max-width: 768px) {
    .jss2401 {
      display: block;
      margin-top: 10px;
    }
  }

  .jss2402 {
    display: flex;
    align-items: center;
  }

  @media screen and (max-width: 768px) {
    .jss2402 {
      display: block;
    }
  }

  .jss2403 {
    color: rgba(255, 255, 255, .5);
    font-size: 12px;
    margin-top: 4px;
    line-height: 20px;
  }

  .jss2404 {
    color: #FFFFFF;
    font-size: 16px;
    margin-top: 10px;
    font-weight: 500;
    line-height: 22px;
    margin-bottom: 11px;
  }

  .jss2405 {
    margin-bottom: 10px;
  }

  .jss2406 {
    color: #FF9378;
    font-size: 12px;
    margin-top: 10px;
    text-align: center;
  }

  .jss2407 {
    display: flex;
    padding: 8px 0;
  }

  .jss2408 {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .jss2409 {
    color: white;
    margin: 20px 0;
    overflow: hidden;
    font-size: 14px;
    text-align: center;
    line-height: 30px;
  }

  .jss2410 {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    position: absolute;
    background: rgba(0, 0, 0, .6);
  }

  .jss2411 {
    top: 50%;
    left: 50%;
    width: 400px;
    padding: 20px 30px 30px;
    position: absolute;
    transform: translate(-50%, -50%);
    background: #743231;
    box-sizing: border-box;
  }

  @media screen and (max-width: 768px) {
    .jss2411 {
      width: 90%;
    }
  }

  .jss2412 {
    color: #FFFFFF;
    font-size: 20px;
    text-align: center;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    margin-bottom: 30px;
  }

  .jss2413 {
    color: #FFFFFF;
    width: 200px;
    cursor: pointer;
    height: 40px;
    margin: 30px auto 0;
    font-size: 14px;
    background: #E67000;
    text-align: center;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    line-height: 40px;
  }

  .jss2414 {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    position: absolute;
    background: rgba(0, 0, 0, .6);
  }

  .jss2415 {
    top: 50%;
    left: 50%;
    width: 352px;
    padding: 10px;
    position: absolute;
    transform: translate(-50%, -50%);
    background: #A41E2B;
    box-sizing: border-box;
    border-radius: 8px;
  }

  .jss2416 {
    margin-bottom: 35px;
  }

  .jss2417 {
    color: #fff;
    font-size: 16px;
    text-align: center;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    line-height: 22px;
  }

  .jss2418 {
    top: 5px;
    right: 5px;
    width: 18px;
    cursor: pointer;
    height: 18px;
    opacity: 0.85;
    position: absolute;
  }

  .jss2418:hover {
    opacity: 1;
  }

  .jss2419 {
    width: 332px;
    height: 218px;
    background: #FED699;
    box-sizing: border-box;
    margin-top: 10px;
    overflow-y: auto;
    border-radius: 4px;
  }

  .jss2420 {
    width: 100%;
    height: 70px;
    padding: 15px;
  }

  .jss2442 {
    width: 100%;
    height: 100%;
    position: relative;
    background: url(/static/media/red_bj.d81c4238.png) no-repeat;
    background-size: 100% 100%;
  }

  .jss2443 {
    top: 30px;
    left: 50%;
    width: 356px;
    height: 100%;
    position: absolute;
    transform: translateX(-50%);
  }

  .jss2444 {
    top: 0;
    left: 0;
    color: #FFB7A5;
    width: 100%;
    height: 94%;
    z-index: 0;
    position: absolute;
    transform: rotateY(180deg);
    box-sizing: border-box;
    transition: all 0.5s ease-out 0s;
    padding-top: 40px;
    padding-left: 16px;
    border-radius: 8px;
    padding-right: 16px;
    padding-bottom: 54px;
    transform-style: preserve-3d;
    background-color: #C02931;
    backface-visibility: hidden;
  }

  .jss2444 .MuiTypography-gutterBottom {
    margin-bottom: 32px;
  }

  .jss2445 {
    top: 0;
    z-index: 2;
    position: absolute;
    transform: rotateY(180deg);
    transition: all 0.5s ease-out 0s;
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }

  .jss2446 {
    width: 100%;
    display: block;
    user-select: none;
    pointer-events: none;
  }

  .jss2447 {
    position: relative;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 30px;
    background-color: #C02931;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .jss2448 {
    top: 0;
    left: 0;
    color: white;
    width: 100%;
    display: flex;
    padding: 16px;
    position: absolute;
    box-sizing: border-box;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  .jss2449 {
    top: 0;
    left: 0;
    color: white;
    width: 100%;
    height: 164px;
    display: flex;
    position: absolute;
    box-sizing: border-box;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  .jss2450 {
    color: #A14302;
    width: 242px;
    border: 0px;
    height: 41px;
    outline: none;
    font-size: 16px;
    border-radius: 4px;
    background-color: #FFF9D7;
  }

  .jss2451 {
    text-align: center;
  }

  .jss2452 {
    color: #A14302;
    opacity: 0.9;
  }

  .jss2452:hover {
    opacity: 1;
    box-shadow: none;
  }

  .jss2453 {
    left: 0;
    color: #FFB7A5;
    width: 100%;
    bottom: 5px;
    position: absolute;
    font-size: 14px;
    text-align: center;
  }

  .jss2454 {
    color: #303232;
    border: 1px solid #A14302;
    padding-left: 16px;
    border-radius: 4px;
    padding-right: 16px;
    background-color: #FED699;
  }

  .jss2455 {
    padding-top: 0;
  }

  .jss2456 {
    padding-left: 0;
    padding-right: 60px;
  }

  .jss2457 .MuiTypography-body1 {
    overflow: hidden;
    font-size: 14px;
    word-break: break-all;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .jss2457 .MuiTypography-body2 {
    font-size: 12px;
  }

  .jss2458 {
    min-width: 46px;
  }

  .jss2459 {
    font-size: 14px;
    font-weight: bold;
    line-height: 20px;
  }

  .jss2460 {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .jss2461 {
    top: 42px;
    left: -38px;
    color: #FFB7A5;
    width: 318px;
    position: absolute;
    text-align: center;
    line-height: 18px;
  }

  .jss2462 {
    z-index: 2;
    position: relative;
    transform: rotateY(0deg);
    transition: all 0.5s ease-out 0s;
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }

  .jss2463 {
    z-index: 0;
    transform: rotateY(-180deg);
  }

  .jss2464 {
    z-index: 2;
    transform: rotateY(0deg);
  }

  .jss2465 {
    width: 100%;
    z-index: 2;
    transform: rotateY(0deg);
  }

  .jss2466 {
    top: -20px;
    left: 0;
    color: #FFB7A5;
    width: 100%;
    height: 100%;
    z-index: 0;
    position: absolute;
    transform: rotateY(180deg);
    box-sizing: border-box;
    transition: all 0.5s ease-out 0s;
    padding-top: 40px;
    padding-left: 16px;
    border-radius: 8px;
    padding-right: 16px;
    padding-bottom: 54px;
    transform-style: preserve-3d;
    background-color: #C02931;
    backface-visibility: hidden;
  }

  .jss2466 .MuiTypography-gutterBottom {
    margin-bottom: 32px;
  }

  .jss2467 {
    z-index: 2;
    transform: rotateY(0deg);
  }

  .jss2468 {
    width: 280px;
    margin: 0 auto;
  }

  .jss2469 {
    width: 150px;
    margin: 0 auto;
    padding: 10px;
    background-color: #fff;
  }

  .jss2469 img {
    width: 100%;
  }

  .jss2470 {
    color: #000;
    width: 75%;
    cursor: pointer;
    height: 42px;
    margin: 20px auto 0;
    display: block;
    text-align: center;
    line-height: 42px;
    border-radius: 5px;
    text-decoration: none;
    background-color: #fff;
  }

  .jss2470:hover {
    color: #fff;
    background-color: #E9B10E;
  }

  .jss2470:hover:not(.MuiButton-root) {
    color: #fff;
    text-decoration: none;
  }

  .jss2471 {
    width: 280px;
    height: 26px;
    padding: 0 10px;
    position: relative;
    font-size: 13px;
    background: rgba(0, 0, 0, 0.2);
    margin-top: 10px;
    overflow-y: auto;
    text-align: center;
    line-height: 26px;
    border-radius: 13px;
  }

  .jss2471::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  .jss2471::-webkit-scrollbar-thumb {
    width: 0px;
    height: 0px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  .jss2472 {
    width: 234px;
    margin: 0 auto;
  }

  .jss2473 {
    width: 280px;
    margin: 0 auto;
  }

  .jss2474 {
    height: 30px;
    display: flex;
    overflow-x: hidden;
    overflow-y: hidden;
    align-items: center;
    line-height: 30px;
  }

  .jss2475 {
    height: 180px;
    overflow-x: hidden;
    overflow-y: auto;
    margin-right: -10px;
    padding-right: 10px;
  }

  .jss2475::-webkit-scrollbar {
    width: 4px;
    height: 0px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  .jss2475::-webkit-scrollbar-thumb {
    width: 5px;
    height: 44px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  .jss2476 {
    color: #FFC700;
    margin: 0 5px;
    overflow: hidden;
  }

  .jss2478 {
    top: 124px;
    left: 50%;
    width: 70px;
    height: 70px;
    position: absolute;
    transform: translateX(-50%);
    border-radius: 50%;
  }

  .jss2479 {
    color: #FF9378;
    margin: 0 5px;
    font-size: 14px;
    text-align: center;
  }

  .jss2480 {
    width: 100%;
    padding-top: 40px;
    margin-bottom: 14px;
  }

  .jss2481 {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .jss2482 {
    width: 63px;
    height: 1px;
    background: linear-gradient(to right, #C02931, #FF9378);
    ;
    margin-top: 10px;
  }

  .jss2483 {
    width: 63px;
    height: 1px;
    background: linear-gradient(to right, #FF9378, #C02931);
    ;
    margin-top: 10px;
  }

  .jss2484 {
    width: 100%;
    height: 170px;
    box-sizing: border-box;
    margin-top: 10px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .jss2484::-webkit-scrollbar {
    width: 4px;
    height: 0px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  .jss2484::-webkit-scrollbar-thumb {
    width: 5px;
    height: 44px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  .jss2485 {
    cursor: pointer;
    padding: 10px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    margin-bottom: 10px;
  }

  .jss2485:hover {
    background: rgba(0, 0, 0, 0.2);
  }

  .jss2486 {
    width: 100%;
    display: flex;
    margin-top: 5px;
    justify-content: space-between;
  }

  .jss2487 {
    width: 98px;
    position: relative;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGEAAABdCAMAAACCYPhHAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAD5UExURUxpcffAgvbBgv+qgOpLOOpLN/bBgvS7f/B1UepLOOlLOPfBgvbAgulLOM2fbP/+a/7TL/3MLfnBJPW0JNKja/etEP7lHffGev/VTPe8Nv3ORuOUJP/94/OVCfGyOOqiLetcQv7aN/KfDv//Yv/gNP/wIP7lP//7dPrJFNmpcuazeP7vZ//6WP/cVv/vRe+KB/nMaO6jIP/8SP3YGfjBQdyBEMVQA/m3EP7oVfvIPtVzEf/+hPOpc+CKF/GVZ85lDv/9KduUPux5A9yGH/zgdP//mP/tN+54VNKXVeenQ/PDVO1qS/CGXeKvVtZ6HP7vrP/5yc+bY//vfUf56ukAAAAMdFJOUwDUkwatbI/9LOyjvDZsBh0AAAQASURBVGje7dZrU9pMGAZgtGhCS8lmkyUILJhDYyAhgXAKoKKIqLSo9f//mPfZYKmV2FdjnOmH3J8YZniuuZM9kMk8Cb+/w+XfG25nn89E59NuPqnsfooEvuSTy5coYjefZHa3AT6fbLbfxX7Cwv6WsJOwsLMlcAkL3JaQTzr/nqAobRZF+QhBadu2f3Z29o2lWFTL7WQFxXYc38ZEg1BKtaHV7XbLr+jyWmGuOy4m86BoDQkhQ8saeh5BAmSuJCLMBd0khn+veFaxWOzCfNK12pdCmHkCgiIIOnF9oXqP1i+hSGbS5BIEFYuObicgHAkC8f37anUSzu9atAPApVDCgUqwYytJdFDJXRWytIAYUvowmUwuBRzouiNqrqO8U2ibgj65r4a5W7AS4oQJOjZ13TVVzQyUdwqG6uiTNdBhq3VWP4JcOqqoq96MikC8W1ANVwDgHhrARhgewJsRJrpDHMnDIsXUbL1DUNolw1AREh+q1cAwGEE6rMOR4AxNTF3XpJJmtmML88BE0AEEsXonQTqdyknfXgsmMT3XdVVPk0wlnqDYQSB5YtgB37UfgZP+kgm24w9VilzTxJonluIJNqxGYqIOYsK8x4AOAP3Kw4MN8V3NBMEwPImq7ViCoOvEdOlMEkURjw5+Vej3l/O5bQeOj4i7MA1VkyhW4wmCLmKfznCxiyVJ+i2ctFgC3x/ihdoxPA1Hl/g/QQkYQUTiUQsODG087p/0p4MpELVWCdLyFxpWZ7OZhjyxHEdoMQIObkK63fWxSimxINq4VwqzWFAszmYS0jBS4gitlg3vwnENGD6Ei6H7DW65Ih4PpjflMOrCoBLCCBGClnGEEnva7ILz2RXKbtGi1RlPB4PB9WoUBgiNgqBJqPx2oVEql9cPAz6MYC3VKxe34/E0FOTaQRhkGNjzYEcg9GaBKyzD2eVyr9c7qNXqlcrFxcWjUCg8ErWRgRCWABi9vYMsL9n80QgEANYCKwEVChsCarBDRRRjPCWuIa96rEBYgXWohMJg+rNQCIl16mxHinHWUj7flOXVciOExO3t+Xo+I27qj+lINeVv+yH3eY9/4fRuNuSCvFqtbiDn5+fX15vxTwiQz5svnRr83udc5iskl93jI/97c81GOAxS2Ip8zcYDUIgSOH4vm2PDQyHM4dXpcRTTXCtRka+h2k/5OcAdn14dbub+FtbM9x9RDtdkTywSaTS5P2b/+H7458hnwi/nKgriAAJqk2aT456Mvno++y/CEwmo0+PjYy6iFwffn8LgFya/SnjmPc3rf/YGIWZSIRVSIRVSIRVSIRVSIRVSIRVSIRVSIRVS4UUh98FALpP9YCGb4T+2RI7PZPjsxxm5LJ/5D1CbFgrFU8TKAAAAAElFTkSuQmCC) no-repeat center;
    background-size: 100% 100%;
  }

  .jss2488 {
    margin-top: 10px;
  }

  .jss2489 {
    color: rgba(255, 249, 215, 0.6);
    height: 40px;
    font-size: 16px;
    text-align: center;
    line-height: 40px;
    border-radius: 20px;
    background-color: #BD3840;
  }

  .jss2490 {
    color: #FFF;
    height: 40px;
    font-size: 16px;
    text-align: center;
    line-height: 40px;
    border-radius: 20px;
    background-color: #7f7f7f;
  }

  .jss2491 {
    color: #FFF;
    width: 90px;
    height: 30px;
    font-size: 12px;
    background: #BD3840;
    text-align: center;
    font-weight: 600;
    line-height: 30px;
  }

  .jss2492 {
    color: #FFF;
    width: 90px;
    height: 30px;
    font-size: 12px;
    background: #E67000;
    text-align: center;
    font-weight: 600;
    line-height: 30px;
  }

  .jss2493 {
    color: #A14302;
    font-size: 15px;
    text-align: center;
    font-weight: 500;
    line-height: 18px;
  }

  .jss2494 {
    color: #F6C082;
    width: 100%;
    bottom: 8px;
    position: absolute;
    font-size: 12px;
    text-align: center;
  }

  .jss2495 {
    color: #FF9378;
    margin: 5px 0;
    font-size: 12px;
  }

  .jss2496 {
    flex: 1;
    color: #FF9378;
    margin-left: 8px;
  }

  .jss2497 {
    font-size: 16px;
    line-height: 30px;
  }

  .jss2498 {
    height: 40px;
    font-size: 12px;
    word-break: break-all;
    line-height: 20px;
  }

  .jss2499 {
    font-size: 12px;
    margin-top: 4px;
    line-height: 20px;
  }

  .jss2500 {
    color: #FFFFFF;
    font-size: 16px;
    margin-top: 10px;
    font-weight: 500;
    line-height: 22px;
    margin-bottom: 11px;
  }

  .jss2501 {
    margin-bottom: 10px;
  }

  .jss2502 {
    color: #FF9378;
    font-size: 12px;
  }

  .jss2503 {
    display: flex;
    padding: 8px 0;
  }

  .jss2504 {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .jss2505 {
    color: white;
    width: 320px;
    opacity: 0.7;
    overflow: hidden;
    font-size: 14px;
    text-align: center;
    line-height: 30px;
  }

  .MuiFormControl-marginNormal {
    margin-top: 16px;
    margin-bottom: 8px;
  }
</style>