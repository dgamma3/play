<template>
  <div style="height: 100%;width: 100%;background-color: #FFFFFF;overflow: hidden;">
    <div style="background-color: #FFFFFF;height: 100%;overflow: hidden;">
      <div style="margin: 20px 10px 0 10px;">
        <el-form>
          <el-row>
            <el-col :span="4">
              <el-form-item label="用户信息:" label-width="80px">
                <el-input v-model="query.info" placeholder="请输入用户信息"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="类型:" label-width="80px">
                <el-select clearable v-model="query.type" placeholder="请选择">
                  <el-option label="充值" :value="1">
                  </el-option>
                  <el-option label="提取" :value="2">
                  </el-option>
                  <el-option label="福利" :value="3">
                  </el-option>
                  <el-option label="亏损" :value="4">
                  </el-option>
                  <el-option label="其他" :value="5">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="回复状态:" label-width="80px">
                <el-select clearable v-model="query.replies_status" placeholder="请选择">
                  <el-option label="待回复" :value="1">
                  </el-option>
                  <el-option label="已回复" :value="2">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="状态:" label-width="80px">
                <el-select clearable v-model="query.status" placeholder="请选择">
                  <el-option label="处理中" :value="1">
                  </el-option>
                  <el-option label="已完成" :value="2">
                  </el-option>
                  <el-option label="已关闭" :value="3">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label-width="20px">
                <el-button size="medium" type="primary" icon="el-icon-search" @click="search">搜索
                </el-button>
                <el-button size="medium" icon="el-icon-delete" @click="reset">重置
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div style="margin: 0 20px;overflow: auto;padding-bottom: 20px;">
        <template>
          <el-table v-loading="loading" :data="data_list" border height="100%" ref="table"
            :header-cell-style="{backgroundColor: '#fafafa',color:'#333333',fontWeight:'400',textAlign:'center'}"
            :row-style="{color:'#333333',fontWeight:'400',height:50+'px',textAlign:'center'}"
            :cell-style="{padding:5+'px'}" style="width: 100%;font-size: 14px;">
            <el-table-column align="center" type="selection" width="55">
            </el-table-column>
            <el-table-column align="center" prop="id" width="80" label="ID">
            </el-table-column>
            <el-table-column align="center" prop="info" label="用户信息" min-width="200" show-overflow-tooltip>
              <template slot-scope="d">
                <div style="display: flex;">
                  <img :src="repair(d.row.user_info.portrait)" style="width: 50px;height: 50px;cursor: pointer;" alt="">
                  <div style="margin-left: 15px;text-align: left;">
                    <div>
                      {{ d.row.user_info.name ? d.row.user_info.name : d.row.user_info.email }} | {{d.row.user_info.id}}
                      <template v-if="d.row.user_info.type == 2">
                        <el-tag size="mini">主播</el-tag>
                      </template>
                      <template v-else-if="d.row.user_info.type == 3">
                        <el-tag size="mini">推广</el-tag>
                      </template>
                      <template v-else-if="d.row.user_info.type == 4">
                        <el-tag size="mini">官方机器人</el-tag>
                      </template>
                    </div>
                    <div>上月充值/提取: {{d.row.lastchong}} / {{d.row.lastti}}</div>
                    <div>本月充值/提取: {{d.row.thischong}} / {{d.row.thisti}}</div>
                    <div>总充值/提取: {{d.row.chong}} / {{d.row.ti}}</div>
                    <!-- <div>steamid: {{ d.row.user_info.steamid ? d.row.user_info.steamid : '-' }}</div> -->
                    <!--                    <div><a :href="d.row.user_info.transaction_link" target="_blank">交易链接:
                        {{ d.row.user_info.transaction_link ? d.row.user_info.transaction_link : '-' }}</a></div> -->
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="left" prop="time" label="时间" min-width="140" show-overflow-tooltip>
              <template slot-scope="d">
                <div><span>反馈：{{ d.row.last_time }}</span></div>

                <div><span>创建：{{ d.row.time }}</span></div>
                <div>充值/注册天数: {{d.row.days}} / {{d.row.zcdays}}</div>
              </template>
            </el-table-column>

            <el-table-column align="left" prop="replies_status_name" label="回复状态" min-width="60" show-overflow-tooltip>
              <template slot-scope="d">
                <div v-if="d.row.replies_status_name == '待回复'" style="color: red;">{{d.row.replies_status_name}}</div>
                <div v-if="d.row.replies_status_name != '待回复'">{{d.row.replies_status_name}}</div>
              </template>
            </el-table-column>

            <el-table-column align="left" prop="type_name" label="类型" min-width="60" show-overflow-tooltip>
              <template slot-scope="d">
                <div><span>{{ d.row.type_name }}</span></div>
              </template>
            </el-table-column>

            <el-table-column align="left" prop="status_name" label="状态" min-width="60" show-overflow-tooltip>
              <template slot-scope="d">
                <div>{{d.row.status_name}}</div>
                <div v-if="d.row.status == 1">
                  <a href="javascript:;" style="color: #0000FF;" @click.stop="edit_status(d.$index, d.row, 2)">完成工单</a>
                </div>
                <div v-if="d.row.status != 3">
                  <a href="javascript:;" style="color: #0000FF;" @click.stop="edit_status(d.$index, d.row, 3)">关闭工单</a>
                </div>
              </template>
            </el-table-column>

            <el-table-column align="left" prop="content" label="内容" min-width="200" show-overflow-tooltip>
              <template slot-scope="d">
                <div>{{d.row.content}}</div>
              </template>
            </el-table-column>

            <el-table-column label="操作" align="center" min-width="170">
              <template slot-scope="d">
                <el-button size="mini" type="primary" @click.stop="edit(d.$index, d.row)">查看
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align: right;margin: 20px 0 0 0;">
            <el-pagination background @size-change="sizeChange" @current-change="currentChange"
              :current-page="page_info.page" :page-sizes="[10, 20, 50, 100, 200, 500]" :page-size="10"
              layout="total, sizes, prev, pager, next, jumper" :total="page_info.total">
            </el-pagination>
          </div>
        </template>
      </div>
    </div>
    <el-dialog :title="operation_title" append-to-body :visible.sync="operation_page" width="80%">
      <div style="margin: 0 20px;">
        <el-form ref="operation_form" :rules="operation_rule" :model="operation_form"
          style="max-height: 50vh; overflow: auto;">

          <div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="回复内容:" label-width="100px" prop="reply_content">
                  <el-input type="textarea" class="recharge-input ticket_content" v-model="operation_form.reply_content"
                    placeholder="回复内容" :rows="9"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-upload class="avatar-uploader" :action="server_url + '/api.php/user/ticket_img'"
                  :headers="{secret:secret,authorization: `Basic ${jwt_token}`}" :show-file-list="false"
                  :before-upload="avatar_upload" :on-success="avatar_success">
                  <div><img v-if="operation_form.reply_img" :src="img_url + operation_form.reply_img" class="avatar">
                  </div>
                  <div style="text-align: left; margin: 0; border: none; height: 20px; line-height: 20px;">上传图片</div>
                </el-upload>
              </el-col>
            </el-row>
            <div style="text-align: center;">
              <el-button type="primary" @click="reply_ticket" v-if="operation_type == 'edit'">保存</el-button>
            </div>
            <div style="border: 1px solid #666; margin-top: 10px;"></div>
          </div>

          <div v-if="operation_form.replies_list && operation_form.replies_list.length > 0"
            v-for="(replies, ii) in operation_form.replies_list">
            <div style="font-size: 16px; margin: 10px 0;" v-if="replies.type == 1">{{replies.aname}} （{{replies.time}}）
            </div>
            <div style="font-size: 16px; margin: 10px 0; color: red;" v-if="replies.type == 2">
              {{operation_form.user_info.name}} （{{replies.time}}）
            </div>
            <div>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="" label-width="100px" prop="content">
                    <div style="line-height: 20px;">{{ replies.content }}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="" label-width="100px" prop="img" v-if="replies.img">
                    <img :src="img_url + replies.img" style="max-height: 150px;">
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div style="border: 1px solid #666;"></div>
          </div>

          <el-row>
            <el-col :span="12">
              <el-form-item label="用户名称:" label-width="100px" prop="name">
                {{ operation_form.user_info.name }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="类型:" label-width="100px" prop="type_name">
                {{ operation_form.type_name }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="创建时间" label-width="100px" prop="time">
                {{ operation_form.time }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="最后反馈时间:" label-width="100px" prop="last_time">
                {{ operation_form.last_time }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="内容" label-width="100px" prop="content">
                <div style="line-height: 20px;">{{ operation_form.content }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="图片" label-width="100px" prop="img" v-if="operation_form.img">
                <img :src="img_url + operation_form.img" alt="" style="max-height: 150px;">
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {
    getStore,
    setStore
  } from "@/utils/store.js";
  import {
    ttGet,
    ttPost,
    repair
  } from "@/utils/util.js";
  import website from '@/config/website';

  export default {
    data() {
      return {
        server_url: this.$server_url,
        secret: website.clientSecret,
        token: getStore({
          name: 'login_token'
        }),
        img_url: this.$img_url,
        loading: true,
        page_info: {
          page: 1,
          limit: 10,
          total: 0,
        },

        query: {},
        data_list: [],
        operation_title: '',
        operation_type: '',
        operation_page: false,
        operation_index: '',
        operation_row: '',
        operation_form: {
          id: '',
          time: '',
          last_time: '',
          type_name: '',
          content: '',
          img: '',
          status_name: '',
          replies_status: '',
          replies_list: [],
          user_info: {},
          reply_content: '',
          reply_img: '',
          chong: '',
          ti: '',
          days: '',
          zcdays: '',
        },

        operation_rule: {
          reply_content: [{
            required: true,
            message: "请输入回复内容",
            trigger: "blur"
          }, ],
        },
      };
    },
    mounted() {
      this.get_ticket();
    },
    methods: {
      repair,
      //获取用户数据



      // 获取数据
      get_ticket() {
        let page_info = this.page_info;
        let query = this.query;
        ttGet("/admin.php/user/get_ticket", {
          page: page_info.page,
          limit: page_info.limit,
          info: query.info,
          type: query.type,
          status: query.status,
          replies_status: query.replies_status,
        }, (res) => {
          this.loading = false;
          if (res.code == 200) {
            this.data_list = res.data.data.data;
            this.page_info.total = res.data.data.count;
            let height = 50 + 103 * (res.data.data.data.length ? res.data.data.data.length : 1);
            this.$refs.table.$el.style.height = height + 'px';
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        });
      },

      //分页切换
      currentChange(page) {
        this.page_info.page = page;
        this.loading = true;
        this.get_ticket();
      },

      //条数切换
      sizeChange(limit) {
        this.page_info.page = 1;
        this.page_info.limit = limit;
        this.loading = true;
        this.get_ticket();
      },

      //条件搜索
      search() {
        this.page_info.page = 1;
        this.loading = true;
        this.get_ticket();
      },

      //重置条件
      reset() {
        this.page_info.page = 1;
        this.query = {};
        this.loading = true;
        this.get_ticket();
      },

      //编辑
      edit(operation_index, operation_row) {
        this.operation_index = operation_index;
        this.operation_row = operation_row;
        let loading = this.$loading({
          text: '查询中',
          spinner: "el-icon-loading"
        });
        ttGet("/admin.php/user/get_ticket_details", {
          id: operation_row.id
        }, (res) => {
          loading.close();
          if (res.code == 200) {
            this.operation_form = res.data.info;
            this.operation_title = '编辑';
            this.operation_type = 'edit';
            this.operation_page = true;
            this.operation_index = operation_index;
            this.operation_row = operation_row;
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        });
      },
      //编辑状态
      edit_status(operation_index, operation_row, status) {
        let msg = status == 2 ? '完成' : '关闭';
        this.$confirm("确定" + msg + "工单吗?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.operation_index = operation_index;
          this.operation_row = operation_row;
          let loading = this.$loading({
            text: '提交中',
            spinner: "el-icon-loading"
          });
          ttPost("/admin.php/user/edit_status", {
            id: this.operation_row.id,
            status: status,
          }, (res) => {
            loading.close();
            if (res.code == 200) {
              this.get_ticket();
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
        });
      },

      //关闭操作窗口
      close() {
        this.operation_page = false;
      },

      // 回复
      reply_ticket() {
        this.$refs.operation_form.validate(valid => {
          if (valid) {
            let loading = this.$loading({
              text: '提交中',
              spinner: "el-icon-loading"
            });
            ttPost("/admin.php/user/reply_ticket", {
              id: this.operation_form.id,
              content: this.operation_form.reply_content,
              img: this.operation_form.reply_img,
            }, (res) => {
              loading.close();
              if (res.code == 200) {
                this.operation_page = false;
                this.$message({
                  message: res.msg,
                  type: 'success'
                });
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
        this.$nextTick(() => {
          if (res.code == 200) {
            // this.operation_form.reply_img = res.data.img;
            this.$set(this.operation_form, 'reply_img', res.data.img)
            console.log(this.operation_form);
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
  };
</script>

<style lang="scss" scoped>
  .el-form-item {
    margin-bottom: 6px !important;
  }

  .my-dialog .el-dialog__header {
    padding: 0 0;
  }

  .my-table-home {
    margin-left: 20px;
    overflow: auto;
  }

  .my-table-home>table {
    font-size: 14px;
    line-height: 30px;
    text-align: left;
    border-collapse: collapse;
  }

  .my-table-home>table>tr {
    height: 30px;
    border-bottom: 1px dashed #EEEEEE;
  }

  .my-table-home>table td {
    max-width: 30%;
    white-space: nowrap;
    padding: 0 20px 0 0;
  }

  .syncBut {
    border-bottom: 3px solid #409EFF;
    color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>