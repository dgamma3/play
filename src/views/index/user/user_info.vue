<template>
  <div>
    <template v-if="loadingIndex">
      <div class="text-center">
        <i class="el-icon-loading data-loading"></i>
      </div>
    </template>
    <template v-else>
      <div class="account-inner">
        <div class="account-header">
          <div class="account-user">
            <div class="account-avatar-wrap" style="position: relative;">
              <el-upload class="avatar-uploader" :action="server_url + '/api.php/user/portrait_set'"
                :headers="{secret:secret,authorization: `Basic ${jwt_token}`}" :show-file-list="false"
                :before-upload="avatar_upload" :on-success="avatar_success">

                <img class="account-avatar" v-if="user.portrait" :src="repair(user.portrait)" alt="">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <!-- <img v-if="user.vip_img !=''" style="position: absolute; top: -40px;left: -40px;width: 204%":src="repair(user.vip_img)" alt=""> -->
            </div>
            <div class="account-info">
              <div class="account-name">
                {{ user.name }}
                <span style="color:#cccccc;line-height:60px;padding-right: 10px;font-size: 12px;"
                  v-if="user.shimin_status == 2">{{user.username}}[已实名]</span>
                <span style="color:#cccccc;line-height:60px;padding-right: 10px;font-size: 12px;"
                  v-if="user.shimin_status != 2"> [未实名]</span>
              </div>
              <div class="account-balance">
                <span class="price_box "><child-component v-html="symbol"></child-component> {{ user.bean }}</span>
                <span class="price_box "><img src="@/assets/img/huoyan.png" class="huoyan">
                  {{ user.power }}</span>
                <!--                <button class="account-add-balance">-->
                <!--                  <svg class="icon-plus-circle" viewBox="0 0 32.81 32.688">-->
                <!--                    <path-->
                <!--                      d="M3408.93,69.341a16.415,16.415,0,1,0,16.42-16.35A16.388,16.388,0,0,0,3408.93,69.341Zm18.57-6.383v4.7h4.74a1.684,1.684,0,0,1,0,3.367h-4.74v4.72a1.675,1.675,0,0,1-1.73,1.625,1.612,1.612,0,0,1-1.65-1.625v-4.72h-4.71a1.684,1.684,0,1,1,0-3.367h4.71v-4.7A1.69,1.69,0,0,1,3427.5,62.958Z"-->
                <!--                      transform="translate(-3408.94 -53)"/>-->
                <!--                  </svg>-->
                <!--                </button>-->
              </div>
            </div>
            <div class="account-user-right">


              <button class="account-edit-btn" @click="seed_show = true">
                <svg class="icon-pencil" viewBox="0 0 32 32">
                  <g>
                    <g>
                      <path
                        d="M31.295 4.818c.454.453.704 1.056.704 1.698 0 .642-.25 1.245-.704 1.698l-21.95 21.95a.815.815 0 0 1-.41.218L.93 31.983a.801.801 0 0 1-.942-.942l1.602-8.006a.792.792 0 0 1 .218-.41L23.757.678a2.403 2.403 0 0 1 3.398 0zm-5.136.995a.8.8 0 0 0-1.132 0L7.412 23.427a.8.8 0 1 0 1.132 1.132L26.159 6.945a.8.8 0 0 0 0-1.132z" />
                    </g>
                  </g>
                </svg>
                <span>修改种子</span>
              </button>


              <button class="account-edit-btn" @click="idcode_show = true" v-if="user.shimin_status != 2">
                <svg class="icon-pencil" viewBox="0 0 32 32">
                  <g>
                    <g>
                      <path
                        d="M31.295 4.818c.454.453.704 1.056.704 1.698 0 .642-.25 1.245-.704 1.698l-21.95 21.95a.815.815 0 0 1-.41.218L.93 31.983a.801.801 0 0 1-.942-.942l1.602-8.006a.792.792 0 0 1 .218-.41L23.757.678a2.403 2.403 0 0 1 3.398 0zm-5.136.995a.8.8 0 0 0-1.132 0L7.412 23.427a.8.8 0 1 0 1.132 1.132L26.159 6.945a.8.8 0 0 0 0-1.132z" />
                    </g>
                  </g>
                </svg>
                <span>实名认证</span>
              </button>


              <button class="account-edit-btn" @click="name_edit">
                <svg class="icon-pencil" viewBox="0 0 32 32">
                  <g>
                    <g>
                      <path
                        d="M31.295 4.818c.454.453.704 1.056.704 1.698 0 .642-.25 1.245-.704 1.698l-21.95 21.95a.815.815 0 0 1-.41.218L.93 31.983a.801.801 0 0 1-.942-.942l1.602-8.006a.792.792 0 0 1 .218-.41L23.757.678a2.403 2.403 0 0 1 3.398 0zm-5.136.995a.8.8 0 0 0-1.132 0L7.412 23.427a.8.8 0 1 0 1.132 1.132L26.159 6.945a.8.8 0 0 0 0-1.132z" />
                    </g>
                  </g>
                </svg>
                <span>修改名称</span>
              </button>



              <button class="account-edit-btn" @click="link_edit">
                <svg class="icon-pencil" viewBox="0 0 32 32">
                  <g>
                    <g>
                      <path
                        d="M31.295 4.818c.454.453.704 1.056.704 1.698 0 .642-.25 1.245-.704 1.698l-21.95 21.95a.815.815 0 0 1-.41.218L.93 31.983a.801.801 0 0 1-.942-.942l1.602-8.006a.792.792 0 0 1 .218-.41L23.757.678a2.403 2.403 0 0 1 3.398 0zm-5.136.995a.8.8 0 0 0-1.132 0L7.412 23.427a.8.8 0 1 0 1.132 1.132L26.159 6.945a.8.8 0 0 0 0-1.132z" />
                    </g>
                  </g>
                </svg>
                <span>修改交易链接</span>
              </button>
              <button class="account-edit-btn" @click="superior_invitation_code_edit">
                <svg class="icon-pencil" viewBox="0 0 32 32">
                  <g>
                    <g>
                      <path
                        d="M31.295 4.818c.454.453.704 1.056.704 1.698 0 .642-.25 1.245-.704 1.698l-21.95 21.95a.815.815 0 0 1-.41.218L.93 31.983a.801.801 0 0 1-.942-.942l1.602-8.006a.792.792 0 0 1 .218-.41L23.757.678a2.403 2.403 0 0 1 3.398 0zm-5.136.995a.8.8 0 0 0-1.132 0L7.412 23.427a.8.8 0 1 0 1.132 1.132L26.159 6.945a.8.8 0 0 0 0-1.132z" />
                    </g>
                  </g>
                </svg>
                <span>上级推广代码</span>
              </button>
            </div>
          </div>
        </div>
        <div class="account-content">
          <div class="account-tabs">
            <div class="account-tabs-buttons">
              <div :class="'account-tabs-btn ' + [type == '' || type == 'all' ? 'active' : '']"
                @click="type_switch('')">
                <svg class="icon icon-user" viewBox="0 0 30 34">
                  <path
                    d="M29.997 29.978v2.009a1.993 1.993 0 0 1-2.02 2.008H2.015a1.993 1.993 0 0 1-2.02-2.008v-1.972c0-2.98 1.18-5.795 3.324-7.926a11.523 11.523 0 0 1 3.754-2.47 13.312 13.312 0 0 1-.163-.16c-2.167-2.155-3.361-5.01-3.361-8.038 0-3.029 1.194-5.883 3.361-8.039C9.016 1.207 11.891.004 14.996.004c3.047 0 5.918 1.186 8.086 3.341 2.167 2.155 3.361 5.01 3.361 8.038 0 3.026-1.227 5.958-3.366 8.044a9.324 9.324 0 0 1-.16.154 11.512 11.512 0 0 1 3.756 2.47c2.112 2.1 3.324 4.99 3.324 7.927zm-23.862-5.09a7.184 7.184 0 0 0-2.137 5.127h21.959a7.183 7.183 0 0 0-2.138-5.127c-1.326-1.352-3.19-2.124-5.12-2.124h-7.406a7.27 7.27 0 0 0-5.158 2.125zM9.727 6.146a7.334 7.334 0 0 0-2.175 5.238c0 1.948.775 3.811 2.181 5.246a7.416 7.416 0 0 0 5.263 2.155c1.96 0 3.833-.77 5.276-2.168a7.33 7.33 0 0 0 2.169-5.233c0-1.946-.774-3.807-2.179-5.241a7.422 7.422 0 0 0-5.266-2.16 7.422 7.422 0 0 0-5.27 2.163z" />
                </svg>
                <span>库存</span>
              </div>
              <div :class="'account-tabs-btn ' + [type == 'extract_history' ? 'active' : '']"
                @click="type_switch('extract_history')">
                <svg class="icon icon-history-2" viewBox="0 0 34 40">
                  <g>
                    <g>
                      <path
                        d="M34 22.34C34 32.07 26.366 40 17 40 7.633 40 .04 32.113 0 22.425v-.085-.086c0-4.415 1.609-8.616 4.497-11.873.62-.686 1.65-.729 2.27-.086.66.643.701 1.672.082 2.357A14.41 14.41 0 0 0 3.3 20.625h2.394c.908 0 1.61.772 1.61 1.672 0 .943-.744 1.672-1.61 1.672H3.3c.785 6.686 5.942 11.958 12.38 12.601v-2.657c0-.944.742-1.672 1.609-1.672.907 0 1.609.772 1.609 1.672v2.572c6.19-.9 11.058-6.044 11.8-12.474h-2.434c-.907 0-1.609-.771-1.609-1.671 0-.944.743-1.672 1.61-1.672h2.434c-.495-4.844-3.219-9.044-7.386-11.145a1.72 1.72 0 0 1-.784-2.143l1.155-3-11.8 3.943L16.71 18.44l1.403-3.086c.371-.857 1.361-1.2 2.145-.814.826.385 1.156 1.414.784 2.228l-2.847 6.258c-.247.6-.825.944-1.444.944s-1.197-.344-1.444-.944L8.169 8.023c-.206-.429-.206-.943-.04-1.414.164-.43.536-.815.99-.943L25.954.094c.577-.215 1.237-.043 1.691.47.413.473.537 1.158.33 1.758l-1.898 4.93C31.03 10.38 34 16.038 34 22.34z" />
                    </g>
                  </g>
                </svg>
                <span>提取</span>
              </div>
              <div :class="'account-tabs-btn ' + [type == 'recharge_record' ? 'active' : '']"
                @click="type_switch('recharge_record')">
                <svg class="icon icon-enter" viewBox="0 0 44 34">
                  <g>
                    <g>
                      <path
                        d="M39.524 34H13.238a4.535 4.535 0 0 1-3.163-1.288 4.35 4.35 0 0 1-1.313-3.117v-2.87H4.475c-.473 0-.932-.19-1.26-.52a1.72 1.72 0 0 1 .009-2.475 1.772 1.772 0 0 1 1.251-.513h4.287v-4.464H1.779c-.473 0-.932-.19-1.26-.52a1.72 1.72 0 0 1 .009-2.475 1.772 1.772 0 0 1 1.251-.512h6.983v-4.464H4.475c-.473 0-.932-.19-1.259-.521a1.72 1.72 0 0 1 .008-2.475 1.773 1.773 0 0 1 1.251-.512h4.287v-2.87c0-1.176.466-2.283 1.313-3.117a4.535 4.535 0 0 1 3.163-1.288h26.286c1.18 0 2.333.47 3.163 1.288A4.349 4.349 0 0 1 44 4.404v25.19a4.35 4.35 0 0 1-1.313 3.118A4.535 4.535 0 0 1 39.524 34zm-27.203-7.275v2.87a.89.89 0 0 0 .271.636c.168.166.404.26.646.26h26.286a.926.926 0 0 0 .646-.26.89.89 0 0 0 .271-.636V4.405a.89.89 0 0 0-.271-.637.925.925 0 0 0-.646-.26H13.238a.925.925 0 0 0-.646.26.89.89 0 0 0-.271.636v2.87h4.96c.474 0 .933.19 1.26.52a1.722 1.722 0 0 1-.008 2.475 1.773 1.773 0 0 1-1.251.513H12.32v4.464h15.92l-1.527-1.756a1.731 1.731 0 0 1-.42-1.272c.036-.464.253-.889.612-1.198a1.794 1.794 0 0 1 1.293-.417c.47.035.902.25 1.216.603l4.047 4.653c.277.32.426.727.421 1.145.005.41-.144.815-.42 1.135l-4.045 4.651c-.317.357-.748.571-1.219.606a1.787 1.787 0 0 1-1.289-.413 1.755 1.755 0 0 1-.615-1.201 1.731 1.731 0 0 1 .418-1.271l1.528-1.758h-15.92v4.464h4.96c.474 0 .933.19 1.26.521a1.72 1.72 0 0 1-.008 2.475 1.771 1.771 0 0 1-1.251.512z" />
                    </g>
                  </g>
                </svg>
                <span>充值</span>
              </div>
              <div :class="'account-tabs-btn ' + [type == 'partner_history' ? 'active' : '']"
                @click="type_switch('partner_history')">
                <svg class="icon icon-users" viewBox="0 0 45 34">
                  <g>
                    <g>
                      <path
                        d="M22.5 7.555c0 4.173-3.358 7.555-7.5 7.555-4.142 0-7.5-3.383-7.5-7.555S10.858 0 15 0c4.142 0 7.5 3.383 7.5 7.556zm-3.75 0c0-2.085-1.679-3.778-3.75-3.778-2.071 0-3.75 1.693-3.75 3.778 0 2.088 1.679 3.778 3.75 3.778 2.071 0 3.75-1.69 3.75-3.778zM30 26.444V34H0v-7.556c0-4.173 3.358-7.555 7.5-7.555h15c4.142 0 7.5 3.387 7.5 7.555zm-3.75 0c0-2.085-1.679-3.778-3.75-3.778h-15c-2.071 0-3.75 1.693-3.75 3.778v3.778h22.5zm18.75 0V34H33.75v-3.778h7.5v-3.778c0-2.085-1.679-3.778-3.75-3.778h-3.75V18.89h3.75c4.142 0 7.5 3.387 7.5 7.555zM26.264 1.04C27.368.396 28.634 0 30 0c4.141 0 7.5 3.383 7.5 7.555S34.141 15.11 30 15.11c-1.366 0-2.632-.394-3.736-1.04l1.868-3.258c.553.323 1.184.52 1.867.52 2.072.001 3.75-1.689 3.75-3.777 0-2.085-1.678-3.778-3.75-3.778a3.7 3.7 0 0 0-1.867.52z" />
                    </g>
                  </g>
                </svg>
                <span>合作</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="type == '' || type == 'all'" class="account-items">
          <div class="account-items-header">
            <label class="account-toggle">
              <el-switch v-model="value1" @change="value1_switch" active-text="所有饰品" inactive-text="有效的饰品">
              </el-switch>
            </label>
            <!--            <h2 class="account-items-title">-->
            <!--              <span>您的饰品</span>-->
            <!--            </h2>-->
            <div class="account-items-buttons">
              <button class="account-items-btn" @click="select_all">全选</button>
              <!--  <button :class="'account-items-btn ' + [!selected_status ? 'disabled' : '']" @click="deposit">存入选定
                <child-component v-html="symbol"></child-component>{{ selected_price }}
              </button>-->
              <button :class="'account-items-btn price_box  '  " @click="diamond_to_gold_show = true">
                钻石兑金币
              </button>
              <button :class="'account-items-btn ' + [!selected_status ? 'disabled' : '']" @click="send_shop">
                出售<img
                  src="data:image/png;base64,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"
                  style="width: 17px; height: 17px; padding-top: 2px; padding-left: 2px;">
              </button>
            </div>
          </div>
          <template v-if="loadingIndex2">
            <div class="text-center">
              <i class="el-icon-loading data-loading"></i>
            </div>
          </template>
          <template v-else>
            <div class="account-items-items">
              <div
                :class="'live-item live-item-bg live-item-bg-'+color(item.ornaments.color, 4)+' '+ [item.selected ? 'active' : '']"
                v-for="(item, index) in ornaments" @click="ornaments_switch(index)" v-if="item.ornaments" :key="index">
                <div class="live-item-check" v-if="item.selected">
                  <svg class="icon-check" viewBox="0 0 34 25">
                    <g>
                      <g>
                        <path
                          d="M30.802-.006l-18.66 18.674-8.944-8.931L0 12.944 10.564 23.5l1.579 1.502L13.72 23.5 34 3.16z" />
                      </g>
                    </g>
                  </svg>
                </div>
                <div :class="color(item.ornaments.color || 7, 3)">
                  <div class="o-item">
                    <div class="o-body">
                      <svg class="o-bg" viewBox="0 0 87.3 107.3">
                        <path d="M83.1 107.3l-61.8-74L87.3 0l-4.2 107.3z" fill-opacity=".04"></path>
                        <path d="M67.7 70.1l-57.5 32.6 11.3-61.3 46.2 28.7z" fill-opacity=".13"></path>
                        <path d="M67.3 63.5L27 74.5l14.3-37.4 26 26.4z" fill-opacity=".02"></path>
                        <path d="M85.5 79.1L51 106.6l29.6-37.4 4.9 9.9z" fill-opacity=".2"></path>
                        <path d="M19.6 72.9L0 52.9l24.1 2-4.5 18z" fill-opacity=".07"></path>
                      </svg>
                      <img class="o-img" :src="img_url + item.ornaments.img" alt="">
                    </div>
                  </div>
                  <div class="live-item-quality">{{ quality(item.ornaments.quality, 2) }}</div>
                  <div class="live-item-price price_box "><child-component v-html="symbol"></child-component>
                    {{ item.price }}
                  </div>
                  <div class="o-name">{{ item.ornaments.name }}</div>
                  <div class="o-abrasion" v-if="item.ornaments.appid == 730">{{
                      abrasion(item.ornaments.abrasion)
                    }}
                  </div>
                  <div class="o-abrasion" v-else>{{ quality2(item.ornaments.quality2) }}</div>

                  <div class="live-item-chance" v-if="item.type == 3">
                    <span>{{ item.probability }}%</span>
                    Percent
                  </div>
                  <div class="live-item-buttons">
                    <template v-if="item.status == 0">
                      <button class="live-item-btn" @click.stop="extract(index)">提取</button>
                      <button class="live-item-btn" @click.stop="sell(index)">出售</button>
                    </template>
                    <template v-else-if="item.status == 1">
                      <button class="live-item-btn disabled">已经卖掉的</button>
                    </template>
                    <template v-else-if="item.status == 2">
                      <button class="live-item-btn disabled">提取中</button>
                    </template>
                    <template v-else-if="item.status == 3">
                      <button class="live-item-btn disabled">正在发货</button>
                    </template>
                    <template v-else-if="item.status == 4">
                      <button class="live-item-btn disabled">已收货</button>
                    </template>
                  </div>
                </div>
              </div>
            </div>
            <div class="more" v-if="page_status" @click="more">
              <i class="el-icon-bottom"></i>
            </div>
          </template>
        </div>
        <div v-if="type == 'extract_history'">
          <table class="level-table">
            <colgroup>
              <col width="33%">
              <col width="33%">
              <col width="33%">
            </colgroup>
            <tbody>
              <tr class="level-table-header">
                <th class="level-table-col-title">饰品信息</th>
                <th class="level-table-col-title">提取时间</th>
                <th class="level-table-col-title">订单号码</th>
                <th class="level-table-col-title">饰品状态</th>
              </tr>
              <tr class="level-table-row2" v-for="(item, index) in extract_history">
                <td class="level-table-cell">
                  <span>{{ item.ornaments.name }}</span>
                  <div class="o-abrasion" v-if="item.ornaments.appid == 730">{{ abrasion(item.ornaments.abrasion) }}
                  </div>
                  <div class="o-abrasion" v-else>{{ quality2(item.ornaments.quality2) }}</div>
                </td>
                <td class="level-table-cell">
                  <span>{{ item.ti_time }}</span>
                </td>
                <td class="level-table-cell">
                  <span>{{ item.orderId }}</span>
                </td>
                <td class="level-table-cell">
                  <template v-if="item.status == 2"><span>提取中</span></template>
                  <template v-else-if="item.status == 3">正在发货</template>
                  <template v-else-if="item.status == 4">已收货</template>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="more" v-if="page2_status" @click="more2">
            <i class="el-icon-bottom"></i>
          </div>
        </div>
        <div v-if="type == 'recharge_record'">
          <table class="level-table">
            <colgroup>
              <col width="25%">
              <col width="25%">
              <col width="25%">
              <col width="25%">
            </colgroup>
            <tbody>
              <tr class="level-table-header">
                <th class="level-table-col-title">充值单号</th>
                <th class="level-table-col-title">充值金额</th>
                <th class="level-table-col-title">支付时间</th>
                <th class="level-table-col-title">支付状态</th>
              </tr>
              <tr class="level-table-row2" v-for="(item, index) in recharge_record" :key="index">
                <td class="level-table-cell">
                  <span>{{ item.order }}</span>
                </td>
                <td class="level-table-cell ">
                  <span class="live-item-price price_box "><child-component v-html="symbol"></child-component>
                    {{ item.money }}</span>
                </td>
                <td class="level-table-cell">
                  <span>{{ item.add_time }}</span>
                </td>
                <td class="level-table-cell">
                  <template v-if="item.status == 1"><span>已支付</span></template>
                  <template v-else>未支付</template>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="more" v-if="page3_status" @click="more3">
            <i class="el-icon-bottom"></i>
          </div>
        </div>
        <div v-if="type == 'partner_history'">

          <template v-if="user.type == 2">
            <div style="color:#fff;line-height:30px;">今日佣金：{{ today_gold }}
              本月佣金：{{ month_gold }}</div>
          </template>
          <table class="level-table">
            <colgroup>
              <col width="33.3%">
              <col width="33.3%">
              <col width="33.3%">

            </colgroup>
            <tbody>
              <tr class="level-table-header">
                <th class="level-table-col-title">用户信息</th>
                <th class="level-table-col-title">充值金额</th>
                <!-- <th class="level-table-col-title">您的收入</th> -->
                <th class="level-table-col-title">充值时间</th>
              </tr>
              <tr class="level-table-row2" v-for="(item, index) in partner_history" :key="index">
                <td class="level-table-cell">
                  <span>{{ item.user.name }}(ID:{{ item.user.id }})</span>
                </td>
                <td class="level-table-cell">
                  <span class="zhubo_price_box"><child-component v-html="symbol"></child-component>
                    {{ item.money }}</span>
                </td>
                <!-- <td class="level-table-cell">
                  <span class="price_box "><child-component v-html="symbol"></child-component> {{ item.gold }}</span>
                </td> -->
                <td class="level-table-cell">
                  <span>{{ item.time }}</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="more" v-if="page4_status" @click="more4">
            <i class="el-icon-bottom"></i>
          </div>
        </div>
      </div>
    </template>
    <el-dialog class="link-dialog" title="实名认证" append-to-body :visible.sync="idcode_show" :close-on-click-modal="false"
      :lock-scroll="false">
      <div class="link-info">
        <el-input class="recharge-input" v-model="user.username" placeholder="请输入姓名"> </el-input>
        <el-input class="recharge-input" v-model="user.idcode" placeholder="请输入身份证号码"> </el-input>
        <button class="recharge-btn save_from_btn" @click="idcode_set">保存</button>
      </div>
    </el-dialog>
    <el-dialog class="link-dialog" title="请扫描二维码完成实名认证" append-to-body :visible.sync="idcode_qrcode_show"
      :close-on-click-modal="false" :lock-scroll="false">
      <div class="link-info" style="text-align: center;">
        <img :src="img_url + idcode_qrcode_url" alt="" style="width: 150px; height: 150px;">
        <button class="recharge-btn save_from_btn" @click="idcode_qrcode_set">我已完成认证</button>
      </div>
    </el-dialog>

    <el-dialog class="link-dialog" title="兑换金币" append-to-body :visible.sync="diamond_to_gold_show"
      :close-on-click-modal="false" :lock-scroll="false">
      <div class="link-info">
        <p style="line-height:24px">可兑换钻石：{{ user.store_bean }}
          <span> <img
              src="data:image/png;base64,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"
              style="width: 17px; height: 17px; padding-top: 2px; padding-left: 2px;"></span>
        </p>
        <el-input class="recharge-input" v-model="diamond_to_gold_money" placeholder="请输入要兑换数量"> </el-input>
        <button class="recharge-btn save_from_btn" @click="diamond_to_gold">确认兑换</button>
      </div>
    </el-dialog>
    <el-dialog class="link-dialog" title="修改名称" append-to-body :visible.sync="name_page" :close-on-click-modal="false"
      :lock-scroll="false">
      <div class="link-info">
        <el-input class="recharge-input" v-model="user.name" placeholder="请输入名称"> </el-input>
        <button class="recharge-btn save_from_btn" @click="name_set">保存</button>
      </div>
    </el-dialog>
    <el-dialog class="link-dialog" title="修改交易链接" append-to-body :visible.sync="link_page" :close-on-click-modal="false"
      :lock-scroll="false">
      <div class="link-info">
        <el-input class="recharge-input" v-model="user.transaction_link" placeholder="请输入交易链接">
          <a slot="append" class="recharge-btn recharge-btn2"
            href="https://steamcommunity.com/id/me/tradeoffers/privacy#trade_offer_access_url"
            target="_blank">获取交易链接</a>
        </el-input>

        <el-input class="recharge-input" v-model="vif" placeholder="请输入验证码" v-if="user.phone"> <button slot="append"
            class="recharge-btn recharge-btn2" @click="get_vif">获取验证码</button> </el-input>
        <button class="recharge-btn save_from_btn" @click="link_set">保存</button>

      </div>
    </el-dialog>
    <el-dialog class="link-dialog" title="上级推广代码" append-to-body :visible.sync="superior_invitation_code_page"
      :close-on-click-modal="false" :lock-scroll="false">
      <div class="link-info">
        <p>我的邀请码：{{ user.invitation_code }}</p>
        <!-- //关闭修改邀请码 -->
        <!-- <input v-if="user.superior_id == 0 " class="recharge-input" v-model="user.superior_invitation_code" placeholder="请输入上级推广代码">
        <button  v-if="user.superior_id == 0 " class="recharge-btn  " @click="superior_invitation_code_set">保存</button> -->
      </div>
    </el-dialog>
    <el-dialog class="link-dialog" title="修改种子" append-to-body :visible.sync="seed_show" :close-on-click-modal="false"
      :lock-scroll="false">
      <div class="link-info">
        <el-input class="recharge-input" v-model="user.seed" placeholder="请输入种子"> </el-input>
        说明：请输入4到10位的字符或者数字
        <button class="recharge-btn save_from_btn" @click="iseed_set">保存</button>
      </div>
    </el-dialog>
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
    repair
  } from "@/utils/util.js";
  import website from '@/config/website';
  import {
    getStore,
    setStore
  } from "@/utils/store.js";

  export default {
    data() {
      return {
        diamond_to_gold_show: false,
        diamond_to_gold_money: 0, //要兑换的金额
        idcode_show: false,
        idcode_qrcode_show: false,
        idcode_qrcode_url: '',
        seed_show: false,
        server_url: this.$server_url,
        symbol: this.$getStore({
          name: 'symbol'
        }),
        secret: website.clientSecret,
        jwt_token: getStore({
          name: 'jwt_token'
        }),
        img_url: this.$img_url,
        loadingIndex: true,
        loadingIndex2: true,
        user: {
          type: 0
        },
        vif: '',
        name_page: false,
        link_page: false,
        superior_invitation_code_page: false,
        type: '',
        ornaments: [],
        value1: false,
        page: 1,
        page_status: false,
        extract_history: [],
        page2: 1,
        page2_status: false,
        recharge_record: [],
        page3: 1,
        page3_status: false,
        partner_history: [],
        page4: 1,
        page4_status: false,
        today_gold: 0,
        month_gold: 0
      }
    },
    mounted() {
      let type = this.$route.params.type;
      this.type = type || '';
      this.get_user();
      switch (this.type) {
        case '':
          this.value1 = false;
          this.page = 1;
          this.ornaments = [];
          this.get_ornaments();
          break;
        case 'all':
          this.value1 = true;
          this.page = 1;
          this.ornaments = [];
          this.get_ornaments();
          break;
        case 'extract_history':
          this.page2 = 1;
          this.extract_history = [];
          this.get_extract_history();
          break;
        case 'recharge_record':
          this.page3 = 1;
          this.recharge_record = [];
          this.get_recharge_record();
          break;
        case 'partner_history':
          this.page4 = 1;
          this.partner_history = [];
          this.get_partner_history();
          break;
      }
    },
    watch: {
      $route(newVal) {
        let type = newVal.params.type;
        this.type = type || '';
        switch (this.type) {
          case '':
            this.value1 = false;
            this.page = 1;
            this.ornaments = [];
            this.get_ornaments();
            break;
          case 'all':
            this.value1 = true;
            this.page = 1;
            this.ornaments = [];
            this.get_ornaments();
            break;
          case 'extract_history':
            this.page2 = 1;
            this.extract_history = [];
            this.get_extract_history();
            break;
          case 'recharge_record':
            this.page3 = 1;
            this.recharge_record = [];
            this.get_recharge_record();
            break;
          case 'partner_history':
            this.page4 = 1;
            this.partner_history = [];
            this.get_partner_history();
            break;
        }
      },
    },
    computed: {
      selected_status: function() {
        let selected_status = false;
        let ornaments = this.ornaments;
        for (let x in ornaments) {
          if (ornaments[x].selected) {
            selected_status = true;
            break;
          }
        }
        return selected_status;
      },
      selected_price: function() {
        let selected_price = 0;
        let ornaments = this.ornaments;
        for (let x in ornaments) {
          if (ornaments[x].selected) selected_price += Number(ornaments[x].price);
        }
        return selected_price.toFixed(2);
      },
    },
    methods: {
      abrasion,
      quality,
      quality2,
      color,
      repair,

      //钻石兑换金币
      diamond_to_gold() {
        console.log("=====钻石兑换金币====")

        let loading = this.$loading({
          spinner: 'el-icon-loading',
          background: 'rgb(0 0 0 / 0%)'
        });
        ttPost("/api.php/user/diamond_to_gold", {
          money: this.diamond_to_gold_money
        }, (res) => {
          loading.close();

          if (res.code == 200) {
            this.diamond_to_gold_show = false;
            this.user.bean = Number(res.data.balance).toFixed(2);
            this.$emit('user_bean', {
              balance: res.data.balance
            });
            this.user.store_bean = Number(res.data.store_bean).toFixed(2);
            this.$emit('user_store_bean', {
              user_store_bean: res.data.store_bean
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


      },
      //获取用户信息
      get_user() {
        ttGet("/api.php/user/user_info", '', (res) => {
          this.loadingIndex = false;
          if (res.code == 200) {
            this.user = res.data.user;
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        });
      },

      //切换饰品类型
      value1_switch() {
        this.page = 1;
        this.ornaments = [];
        this.get_ornaments();
      },

      //获取饰品
      get_ornaments() {
        let value1 = this.value1;
        let page = this.page;
        this.loadingIndex2 = true;
        ttGet("/api.php/user/get_ornaments", {
          value1: value1,
          page: page
        }, (res) => {
          this.loadingIndex2 = false;
          if (res.code == 200) {
            let ornaments = res.data.ornaments.map((item) => {
              item.selected = false;
              return item;
            });
            this.ornaments = this.ornaments.concat(ornaments);
            this.page_status = ornaments.length == 50 ? true : false;
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        });
      },

      //查看更多
      more() {
        this.page = ++this.page;
        this.page_status = false;
        this.get_ornaments();
      },

      //类型切换
      type_switch(type) {
        this.$router.push({
          path: '/user_info' + (type ? '/' + type : '')
        });
      },

      //饰品选择
      ornaments_switch(index) {
        if (!this.value1 && this.ornaments[index].status == 0) {
          this.ornaments[index].selected = !this.ornaments[index].selected;
        }
      },

      //全选饰品
      select_all() {
        if (this.value1) return;
        let ornaments = this.ornaments;
        for (let x in ornaments) {
          if (ornaments[x].status == 0) {
            ornaments[x].selected = !ornaments[x].selected;
          }
        }
      },

      //存入
      deposit() {
        let ornaments = this.ornaments;
        let record_id = [];
        for (let x in ornaments) {
          if (ornaments[x].selected) record_id.push(ornaments[x].record_id);
        }
        if (record_id.length == 0) return;
        let loading = this.$loading({
          spinner: 'el-icon-loading',
          background: 'rgb(0 0 0 / 0%)'
        });
        ttPost("/api.php/user/deposit", {
          record_id: record_id
        }, (res) => {
          loading.close();
          if (res.code == 200) {
            this.page = 1;
            this.ornaments = [];
            this.get_ornaments();
            this.user.bean = Number(res.data.balance).toFixed(2);
            this.$emit('user_bean', {
              balance: res.data.balance
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
      },

      //提取
      extract(index) {
        let record_id = this.ornaments[index].record_id;
        let loading = this.$loading({
          spinner: 'el-icon-loading',
          background: 'rgb(0 0 0 / 0%)'
        });
        ttPost("/api.php/user/extract", {
          record_id: record_id
        }, (res) => {
          loading.close();
          if (res.code == 200) {
            this.page = 1;
            this.ornaments = [];
            this.get_ornaments();
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
      },

      //卖出
      sell(index) {
        let ornaments = this.ornaments;
        let record_id = [];
        if (index == 'selected') {
          for (let x in ornaments) {
            if (ornaments[x].selected) record_id.push(ornaments[x].record_id);
          }
        } else {
          record_id = this.ornaments[index].record_id;
        }
        if (record_id.length == 0) return;
        let loading = this.$loading({
          spinner: 'el-icon-loading',
          background: 'rgb(0 0 0 / 0%)'
        });
        ttPost("/api.php/user/sell", {
          record_id: record_id
        }, (res) => {
          loading.close();
          if (res.code == 200) {
            this.page = 1;
            this.ornaments = [];
            this.get_ornaments();
            /*   this.user.bean = Number(res.data.balance).toFixed(2);
              this.$emit('user_bean', {
                balance: res.data.balance
              }); */
            this.user.store_bean = Number(res.data.store_bean).toFixed(2);
            this.$emit('user_store_bean', {
              user_store_bean: res.data.store_bean
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
      },

      //兑换商城余额
      send_shop() {
        let ornaments = this.ornaments;
        let record_id = [];
        for (let x in ornaments) {
          if (ornaments[x].selected) record_id.push(ornaments[x].record_id);
        }
        if (record_id.length == 0) return;
        let loading = this.$loading({
          spinner: 'el-icon-loading',
          background: 'rgb(0 0 0 / 0%)'
        });
        ttPost("/api.php/user/send_shop", {
          record_id: record_id
        }, (res) => {
          loading.close();
          if (res.code == 200) {
            this.page = 1;
            this.ornaments = [];
            // this.user.store_bean = Number(res.data.surplus).toFixed(2);
            this.$emit('user_store_bean', {
              user_store_bean: res.data.store_bean
            });
            this.get_ornaments();
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
      },

      //修改昵称
      name_edit() {
        this.name_page = true;
      },

      //保存名称
      idcode_set() {
        let idcode = this.user.idcode;
        let username = this.user.username;
        if (!username) {
          return this.$message({
            message: '请输入姓名名称!',
            type: 'warning'
          });
        }

        if (!idcode) {
          return this.$message({
            message: '请输入身份证号码!',
            type: 'warning'
          });
        }

        let loading = this.$loading({
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        ttPost("/api.php/user/idcode_set", {
          username: username,
          idcode: idcode
        }, (res) => {
          loading.close();
          if (res.code == 200) {
            this.user.idcode = idcode;
            this.user.username = username;
            this.idcode_qrcode_url = res.data.qrcode;
            this.idcode_show = false;
            this.idcode_qrcode_show = true;
            /*this.$message({
              message: res.msg,
              type: 'success'
            });*/
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        });
      },
      idcode_qrcode_set() {
        this.idcode_qrcode_show = false;
      },
      //保存名称
      name_set() {
        let name = this.user.name;
        if (!name) {
          return this.$message({
            message: '请输入名称!',
            type: 'warning'
          });
        }
        let loading = this.$loading({
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        ttPost("/api.php/user/name_set", {
          name: name
        }, (res) => {
          loading.close();
          if (res.code == 200) {
            this.user.name = name;
            this.name_page = false;
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
      },

      //修改交易链接
      link_edit() {
        this.link_page = true;
      },

      //保存交易链接
      link_set() {
        let transaction_link = this.user.transaction_link;
        let phone = this.user.phone;
        let vif = this.vif;
        if (!transaction_link) {
          return this.$message({
            message: '请输入交易链接!',
            type: 'warning'
          });
        }
        if (phone && !vif) {
          return this.$message({
            message: '请输入验证码!',
            type: 'warning'
          });
        }
        let loading = this.$loading({
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        ttPost("/api.php/user/link_set", {
          transaction_link: transaction_link,
          vif: vif
        }, (res) => {
          loading.close();
          if (res.code == 200) {
            this.link_page = false;
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
      },

      //用户注册获取验证码
      get_vif() {
        let loading = this.$loading({
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        ttPost("/api.php/user/get_vif", '', (res) => {
          loading.close();
          if (res.code == 200) {
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
      },

      //上级推广代码
      superior_invitation_code_edit() {
        this.superior_invitation_code_page = true;
      },

      //保存上级推广代码
      superior_invitation_code_set() {
        let superior_invitation_code = this.user.superior_invitation_code;
        if (!superior_invitation_code) {
          return this.$message({
            message: '请输入上级推广代码!',
            type: 'warning'
          });
        }
        let loading = this.$loading({
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        ttPost("/api.php/user/superior_invitation_code_set", {
          superior_invitation_code: superior_invitation_code
        }, (res) => {
          loading.close();
          if (res.code == 200) {
            this.superior_invitation_code_page = false;
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
      },

      //获取用户提取历史
      get_extract_history() {
        let page2 = this.page2;
        this.loadingIndex2 = true;
        ttGet("/api.php/user/get_extract_history", {
          page: page2
        }, (res) => {
          this.loadingIndex2 = false;
          if (res.code == 200) {
            this.extract_history = this.extract_history.concat(res.data.extract_history);
            this.page2_status = res.data.extract_history.length == 50 ? true : false;
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        });
      },

      //查看更多
      more2() {
        this.page2 = ++this.page2;
        this.page2_status = false;
        this.get_extract_history();
      },

      //获取用户充值记录
      get_recharge_record() {
        let page3 = this.page3;
        this.loadingIndex2 = true;
        ttGet("/api.php/user/get_recharge_record", {
          page: page3
        }, (res) => {
          this.loadingIndex2 = false;
          if (res.code == 200) {
            this.recharge_record = this.recharge_record.concat(res.data.recharge_record);
            this.page3_status = res.data.recharge_record.length == 50 ? true : false;
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        });
      },

      //查看更多
      more3() {
        this.page3 = ++this.page3;
        this.page3_status = false;
        this.get_recharge_record();
      },

      //获取合作伙伴记录
      get_partner_history() {
        let page4 = this.page4;
        this.loadingIndex2 = true;
        ttGet("/api.php/user/get_partner_history", {
          page: page4
        }, (res) => {
          this.loadingIndex2 = false;
          if (res.code == 200) {
            this.partner_history = this.partner_history.concat(res.data.partner_history);
            this.page4_status = res.data.partner_history.length == 50 ? true : false;
            this.today_gold = res.data.today_gold;
            this.month_gold = res.data.month_gold;
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        });
      },

      //查看更多
      more4() {
        this.page4 = ++this.page4;
        this.page4_status = false;
        this.get_partner_history();
      },

      //图片上传检查
      avatar_upload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isLt2M;
      },

      //图片上传成功
      avatar_success(res, file) {
        if (res.code == 200) {
          this.user.portrait = res.data.img;
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
      },


      //保存种子
      iseed_set() {
        let seed = this.user.seed;
        if (!seed) {
          return this.$message({
            message: '请输入种子!',
            type: 'warning'
          });
        }
        let loading = this.$loading({
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        ttPost("/api.php/user/seed_set", {
          seed: seed,
        }, (res) => {
          loading.close();
          if (res.code == 200) {
            this.seed_show = false;
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
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>

<style lang="scss" scoped>
  @import "user_info.scss";

  .zhubo_price_box .symbol {
    height: 16px;
  }
</style>
<style scoped>
  .account-balance /deep/ .symbol {
    width: 28px;
    padding-top: 3px;
    margin-right: 10px;
    float: left;
  }

  .account-balance /deep/ .huoyan {
    width: 28px;
    padding-top: 3px;
    margin-left: 10px;
    margin-right: 5px;
  }

  .account-items-btn /deep/ .symbol {
    width: 16px;
    margin-top: -2px;
    margin-right: 5px;
    margin-left: 10px;
    float: left;
  }



  .live-item-price {
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3px;
    margin-bottom: 20px;
  }

  .live-item-price /deep/ .symbol {
    margin-left: 10px;
    width: 16px;
    padding-top: 3px;
    margin-right: 5px;
  }

  .live-item-chance {
    display: flex;
    justify-content: space-between;
    width: 80px;
  }
</style>