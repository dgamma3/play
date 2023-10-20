<template>
  <div class="tickets">
    <div class=""><button class="add_ticket" @click="show_ticket_from">创建工单</button></div>
    <el-dialog class="link-dialog link-dialog-clskins" title="创建工单" append-to-body :visible.sync="ticket_page"
      :close-on-click-modal="false" :lock-scroll="false">
      <div class="link-info">
        <el-form ref="operation_form" :rules="operation_rule" :model="operation_form">
          <el-col :span="24" class="ticket_type">
            <el-radio v-model="operation_form.type" :label="1" checked="checked">充值</el-radio>
            <el-radio v-model="operation_form.type" :label="2">提取</el-radio>
            <el-radio v-model="operation_form.type" :label="3">福利红包</el-radio>
            <el-radio v-model="operation_form.type" :label="4">亏损</el-radio>
            <el-radio v-model="operation_form.type" :label="5">其他</el-radio>
          </el-col>
          <el-input type="textarea" class="recharge-input ticket_content" v-model="operation_form.content"
            placeholder="请详细描述遇到的问题" :rows="9"></el-input>
          <el-upload class="avatar-uploader" :action="server_url + '/api.php/user/ticket_img'"
            :headers="{secret:secret,authorization: `Basic ${jwt_token}`}" :show-file-list="false"
            :before-upload="avatar_upload" :on-success="avatar_success">
            <div><img v-if="operation_form.img" :src="img_url + operation_form.img" class="avatar"></div>
            <div style="text-align: left; margin: 10px 0 0 0;"><i class="avatar-uploader-icon"
                style="border: none; color: #fff;">上传图片</i></div>
          </el-upload>
        </el-form>
        <button class="recharge-btn save_from_btn" @click="add_ticket">提交</button>
      </div>
    </el-dialog>


    <el-table class="level-table-cl" v-loading="loading" :data="data" ref="table">
      <el-table-column label="操作" align="center" width="80">
        <template slot-scope="{row}">
          <!--          <el-button size="mini" type="primary" @click.stop="show_detail(row.$index, row)">查看
          </el-button> -->
          <el-tag type="primary" effect="dark" @click.stop="show_detail(row.$index, row)">查看</el-tag>
          <!--<el-button size="mini" type="danger" @click.stop="del(row.$index, row)">删除
          </el-button>-->
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status_name" width="100">
      </el-table-column>
      <el-table-column label="回复状态" prop="replies_status_name" width="100">
        <template slot-scope="{row}">
          <span v-if="row.replies_status_name == '已回复'"><el-tag type="success"
              effect="dark">{{row.replies_status_name}}</el-tag></span>
          <span v-else-if="row.replies_status_name != '已回复'"><el-tag type="danger"
              effect="dark">{{row.replies_status_name}}</el-tag></span>
        </template>
      </el-table-column>
      <el-table-column label="类型" prop="type_name" width="100">
      </el-table-column>
      <el-table-column label="时间" prop="datetime" width="200">
      </el-table-column>
      <el-table-column label="工单内容" prop="content">
      </el-table-column>
    </el-table>

    <el-dialog class="link-dialog-detail link-dialog-clskins" title="工单详情" append-to-body
      :visible.sync="ticket_detail_page" :close-on-click-modal="false" :lock-scroll="false">
      <div class="link-info">

        <el-form ref="reply_data" :rules="reply_rule" :model="reply_data">
          <el-input type="textarea" class="recharge-input ticket_content" v-model="reply_data.content"
            placeholder="回复内容" :rows="9"></el-input>
          <el-upload class="avatar-uploader" :action="server_url + '/api.php/user/ticket_img'"
            :headers="{secret:secret,authorization: `Basic ${jwt_token}`}" :show-file-list="false"
            :before-upload="avatar_upload" :on-success="avatar_success_1">
            <div><img v-if="reply_data.img" :src="img_url + reply_data.img" class="avatar"></div>
            <!-- <div style="text-align: left; margin: 10px 0 0 0;">上传图片</div> -->
            <el-button type="success" style="">上传图片</el-button>

          </el-upload>
        </el-form>
        <el-button type="primary" @click="reply_ticket" style="margin-top:15px;">提交</el-button>
        <!-- <button class="recharge-btn save_from_btn" @click="reply_ticket">回复</button> -->

        <div style="border: 1px solid #666; margin-top: 20px;"></div>

        <div style="margin-bottom: 20px;" v-if="ticket_detail.replies_list && ticket_detail.replies_list.length > 0"
          v-for="(replies, ii) in ticket_detail.replies_list">
          <div style="font-size: 14px; margin: 10px 0;color:#E6A23C" v-if="replies.type == 1">{{replies.aname}}
            （{{replies.time}}）
          </div>
          <div style="font-size: 14px; margin: 10px 0; color:#8b57fb;" v-if="replies.type == 2">
            {{ticket_detail.user_info.name}} （{{replies.time}}）
          </div>
          <div>
            <el-row>
              <el-col :span="12">
                <div style="line-height: 20px;">{{ replies.content }}</div>
              </el-col>
              <el-col :span="12">
                <img v-if="replies.img" :src="img_url + replies.img" alt="" style="max-height: 150px;">
              </el-col>
            </el-row>
          </div>
          <div style="border: 1px solid #666;"></div>
        </div>

        <el-row>
          <el-col :span="12">
            类型:{{ ticket_detail.type_name }}
          </el-col>
          <el-col :span="12">
            创建时间:{{ ticket_detail.time }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div style="line-height: 20px;">{{ ticket_detail.content }}</div>
          </el-col>
          <el-col :span="12">
            <img v-if="ticket_detail.img" :src="img_url + ticket_detail.img" alt="" style="max-height: 150px;">
          </el-col>
        </el-row>

      </div>
    </el-dialog>
  </div>
</template>

<style>
  .avatar-uploader .el-upload {
    border: none !important;
  }

  .avatar-uploader-icon {
    font-size: 24px;
    color: #8c939d;
    width: 40px;
    height: 280px;
    line-height: 28px;
    text-align: center;
  }




  .el-textarea__inner {
    background: -webkit-gradient(linear, left top, left bottom, from(rgba(33, 33, 38, 0.6)), to(rgba(33, 33, 38, 0.6))), url(/static/img/beijing.8f2d4f2.png) no-repeat center top/cover !important;
    background: linear-gradient(rgba(33, 33, 38, 0.6), rgba(33, 33, 38, 0.6)), url(/static/img/beijing.8f2d4f2.png) no-repeat center top/cover !important;
  }

  .el-radio {
    color: white;
    margin-bottom: 10px;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .tickets {
    /* width: 1440px; */
    margin: 20px 0;
    text-align: -webkit-center;
  }

  .ticket_table {
    background-color: #99a9bf;
  }

  .el-table thead {
    background-color: #99a9bf;
  }

  .add_ticket {
    display: block;
    font-size: 14px;
    color: #e3e6fc;
    font-weight: 500;
    padding: 8px 20px;
    border-radius: 4px;
    border: none;
    min-width: 100px;
    background: linear-gradient(269.34deg, #cd1ff8 -51.56%, #8b57fb 37.03%, #3648f3 103.07%);
    margin-bottom: 30px;
  }

  colgroup {
    background-color: #99a9bf;
  }

  .live-item-chance {
    display: flex;
    justify-content: space-between;
    width: 80px;
  }

  /* 这里开始是改造的 */
  ul.icon-list {
    overflow: hidden;
    list-style: none;
    padding: 0 !important;
    border: 1px solid #eaeefb;
    /*    border-radius: 4px;
      border-right: none; */

  }

  /* [class*=" icon-"], [class^=icon-] {
      font-family: icomoon!important;
      speak: none;
      font-style: normal;
      font-weight: 400;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
  } */
  .icon-list li {
    float: left;
    width: 25%;
    text-align: center;
    height: 120px;
    line-height: 120px;
    color: #666;
    font-size: 13px;
    border: 1px solid #eee;
    /* border-bottom: 1px solid #eee; */
    /* margin-right: -1px; */
    /* margin-bottom: -1px; */
  }

  .icon-list li span {
    line-height: normal;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    color: #99a9bf;
    transition: color .15s linear;
  }

  .icon-list li:after,
  .icon-list li span {
    display: inline-block;
    vertical-align: middle;
  }

  .icon-list li i {
    display: block;
    font-size: 32px;
    margin-bottom: 15px;
    color: #a9aeb9;
    transition: color .15s linear;
  }

  .icon-list li .icon-name {
    display: inline-block;
    padding: 0 3px;
    height: 1em;
  }

  .icon-list li span {
    line-height: normal;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    color: #99a9bf;
    transition: color .15s linear;
  }

  .avatar-uploader .el-upload {
    border: none !important;
  }

  .level-table-cl tr {
    /* background-color: #080808 !important; */
  }



  .el-table thead {
    /* background-color: #131528 !important; */
    background-color: none;
    /* color:red; */
  }

  .el-table td.el-table__cell,
  .el-table th.el-table__cell.is-leaf {
    border-bottom: 0;
  }

  .has-gutter {
    background-color: none;
    color: red;
  }

  .clskins {
    background: -webkit-gradient(linear, left top, left bottom, from(rgba(33, 33, 38, 0.6)), to(rgba(33, 33, 38, 0.6))), url(/static/img/beijing.8f2d4f2.png) no-repeat center top/cover !important;
    background: linear-gradient(rgba(33, 33, 38, 0.6), rgba(33, 33, 38, 0.6)), url(/static/img/beijing.8f2d4f2.png) no-repeat center top/cover !important;
  }

  .level-table {
    max-width: 1440px;
  }


  .level-table-cl tr {
    background-color: #080808 !important;
  }

  /*  .level-table-cl tr:hover {
      background-color: red !important;
  } */

  .level-table-cl tr:focus {
    background-color: #080808 !important;
  }

  .level-table-cl tr:active {
    background-color: red !important;
  }

  .link-dialog-clskins .el-dialog {
    background: -webkit-gradient(linear, left top, left bottom, from(rgba(33, 33, 38, 0.6)), to(rgba(33, 33, 38, 0.6))), url(/static/img/beijing.8f2d4f2.png) no-repeat center top/cover;
    background: linear-gradient(rgba(33, 33, 38, 0.6), rgba(33, 33, 38, 0.6)), url(/static/img/beijing.8f2d4f2.png) no-repeat center top/cover;
  }
</style>
<style lang="scss" scoped>
  @import "user_info.scss";



  .zhubo_price_box .symbol {
    height: 16px;
  }

  .clskins {
    background: -webkit-gradient(linear, left top, left bottom, from(rgba(33, 33, 38, 0.6)), to(rgba(33, 33, 38, 0.6))), url(/static/img/beijing.8f2d4f2.png) no-repeat center top/cover !important;
    background: linear-gradient(rgba(33, 33, 38, 0.6), rgba(33, 33, 38, 0.6)), url(/static/img/beijing.8f2d4f2.png) no-repeat center top/cover !important;
  }

  .level-table-cl {
    max-width: 1440px;
  }

  .level-table-cl tr {
    background-color: #080808 !important;
  }

  .el-table tr {
    // background-color: #131528 !important;
  }

  .el-table tr:hover {
    // background-color: #131500 !important;
  }

  .avatar-uploader-icon {
    font-size: 24px;
    color: #8c939d;
    width: 40px;
    height: 280px;
    line-height: 28px;
    text-align: center;
  }

  .live-item-chance {
    display: flex;
    justify-content: space-between;
    width: 80px;
  }

  /* 这里开始是改造的 */
  ul.icon-list {
    overflow: hidden;
    list-style: none;
    padding: 0 !important;
    border: 1px solid #eaeefb;
    /*    border-radius: 4px;
      border-right: none; */

  }

  /* [class*=" icon-"], [class^=icon-] {
      font-family: icomoon!important;
      speak: none;
      font-style: normal;
      font-weight: 400;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
  } */
  .icon-list li {
    float: left;
    width: 25%;
    text-align: center;
    height: 120px;
    line-height: 120px;
    color: #666;
    font-size: 13px;
    border: 1px solid #eee;
    /* border-bottom: 1px solid #eee; */
    /* margin-right: -1px; */
    /* margin-bottom: -1px; */
  }

  .icon-list li span {
    line-height: normal;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    color: #99a9bf;
    transition: color .15s linear;
  }

  .icon-list li:after,
  .icon-list li span {
    display: inline-block;
    vertical-align: middle;
  }

  .icon-list li i {
    display: block;
    font-size: 32px;
    margin-bottom: 15px;
    color: #a9aeb9;
    transition: color .15s linear;
  }

  .icon-list li .icon-name {
    display: inline-block;
    padding: 0 3px;
    height: 1em;
  }

  .icon-list li span {
    line-height: normal;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    color: #99a9bf;
    transition: color .15s linear;
  }

  .avatar-uploader .el-upload {
    border: none !important;
  }

  .el-table__body-wrapper {
    width: 1440px;
  }
</style>


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
        img_url: this.$img_url,
        server_url: this.$server_url,
        symbol: this.$getStore({
          name: 'symbol'
        }),
        secret: website.clientSecret,
        jwt_token: getStore({
          name: 'jwt_token'
        }),
        user: {
          type: 0
        },
        ticket_page: false,
        ticket_detail_page: false,
        type: '',
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
        month_gold: 0,
        content: [],


        loading: true,
        data: [],
        operation_form: {
          content: '',
          type: 1,
          img: '',
        },
        operation_rule: {
          type: [{
            required: true,
            message: "请选择工单类型",
            trigger: "blur"
          }],
          content: [{
            required: true,
            message: "请填写工单内容",
            trigger: "change"
          }],
        },

        ticket_detail: {},
        reply_data: {
          id: '',
          content: '',
          img: '',
        },

        reply_rule: {
          content: [{
            required: true,
            message: "请输入回复内容",
            trigger: "blur"
          }, ],
        },

        _this_ii: '',
        _this_row: {},
      }
    },

    mounted() {
      this.get_ticket();
    },
    watch: {

    },
    computed: {

    },
    methods: {
      abrasion,
      quality,
      quality2,
      color,
      repair,

      show_ticket_from() {
        this.ticket_page = true;
      },

      add_ticket() {
        this.$nextTick(() => {
          this.$refs.operation_form.validate(valid => {
            if (valid) {
              if (!this.operation_form.content) {
                this.$message({
                  message: '请输入内容',
                  type: 'warning'
                });
                return;
              }
              // 提交表单数据的逻辑
              let operation_form = this.operation_form;
              let loading = this.$loading({
                text: '提交中',
                spinner: "el-icon-loading"
              });
              ttPost("/api.php/user/add_ticket", {
                type: operation_form.type,
                content: operation_form.content,
                img: operation_form.img,
              }, (res) => {
                loading.close();
                if (res.code == 200) {
                  this.$message({
                    message: res.msg,
                    type: 'success'
                  });
                  this.ticket_page = false;
                  this.get_ticket();
                } else {
                  this.$message({
                    message: res.msg,
                    type: 'warning'
                  });
                }
              });
            }
          });
        });
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
          this.operation_form.img = res.data.img;
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

      //图片上传成功
      avatar_success_1(res, file) {
        if (res.code == 200) {
          this.reply_data.img = res.data.img;
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

      get_ticket() {
        let loading = this.$loading({
          text: '查询中111',
          spinner: "el-icon-loading"
        });
        ttPost("/api.php/user/get_ticket", {}, (res) => {
          loading.close();
          if (res.code == 200) {
            this.data = res.data.data;
            this.loading = false;
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        })
      },

      show_detail(ii, row) {
        this._this_ii = ii;
        this._this_row = row;
        let loading = this.$loading({
          text: '查询中',
          spinner: "el-icon-loading"
        });
        ttPost("/api.php/user/get_ticket_detail", {
          id: row.id
        }, (res) => {
          loading.close();
          if (res.code == 200) {
            this.reply_data.id = row.id;
            this.ticket_detail = res.data.info;
            this.loading = false;
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        })

        this.ticket_detail_page = true;
      },
      del() {},

      // 回复
      reply_ticket() {
        this.$nextTick(() => {
          this.$refs.reply_data.validate(valid => {
            if (valid) {
              let loading = this.$loading({
                text: '提交中',
                spinner: "el-icon-loading"
              });
              if (!this.reply_data.content) {
                this.$message({
                  message: '请输入要回复的内容',
                  type: 'warning'
                });
                return;
              }
              ttPost("/api.php/user/reply_ticket", {
                id: this.reply_data.id,
                content: this.reply_data.content,
                img: this.reply_data.img,
              }, (res) => {
                loading.close();
                if (res.code == 200) {
                  this.$message({
                    message: res.msg,
                    type: 'success'
                  });
                  // this.show_detail(this._this_ii, this._this_row);
                  setTimeout(function() {
                    window.location.href = window.location.href;
                  }, 1000);
                } else {
                  this.$message({
                    message: res.msg,
                    type: 'warning'
                  });
                }
              });
            }
          });
        });
      },

    }
  }
</script>