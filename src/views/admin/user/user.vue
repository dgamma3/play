<template>
  <div style="height: 100%;width: 100%;background-color: #FFFFFF;overflow: hidden;">
    <div style="background-color: #FFFFFF;height: 100%;overflow: hidden;">
      <div style="margin: 20px 10px 0 10px;">
        <el-form>
          <el-row>
            <el-col :span="4">
              <el-form-item label="用户ID:" label-width="80px">
                <el-input v-model="query.id" placeholder="请输入用户ID"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="用户信息:" label-width="80px">
                <el-input v-model="query.info" placeholder="请输入用户信息"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="交易链接:" label-width="80px">
                <el-input v-model="query.transaction_link" placeholder="请输入交易链接"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="用户类型:" label-width="80px">
                <el-select clearable v-model="query.type" placeholder="请选择">
                  <el-option label="普通用户" :value="1">
                  </el-option>
                  <el-option label="主播" :value="2">
                  </el-option>
                  <el-option label="推广" :value="3">
                  </el-option>
                  <el-option label="机器人" :value="4">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="上级ID:" label-width="80px">
                <el-input v-model="query.superior_id" placeholder="请输入上级ID"></el-input>
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
      <div style="display: flex;margin: 0 20px 10px 20px;">
        <el-button size="medium" type="primary" @click.stop="add">
          添加
        </el-button>
        <el-button size="medium" type="primary" @click.stop="add2">
          加入Roll房
        </el-button>

      </div>
      <div style="margin: 0 20px;overflow: auto;padding-bottom: 20px;">
        <template>
          <el-table v-loading="loading" :data="data" border height="100%" ref="table"
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
                  <img :src="repair(d.row.portrait)" style="width: 50px;height: 50px;cursor: pointer;" alt="">
                  <div style="margin-left: 15px;text-align: left;">
                    <div>
                      {{ d.row.name ? d.row.name : d.row.email }}
                      <template v-if="d.row.type == 2">
                        <el-tag size="mini">主播</el-tag>
                      </template>
                      <template v-else-if="d.row.type == 3">
                        <el-tag size="mini">推广</el-tag>
                      </template>
                      <template v-else-if="d.row.type == 4">
                        <el-tag size="mini">官方机器人</el-tag>
                      </template>
                    </div>
                    <div>手机号: {{ d.row.phone ? d.row.phone : '-' }}</div>
                    <div>steamid: {{ d.row.steamid ? d.row.steamid : '-' }}</div>
                    <div><a :href="d.row.transaction_link" target="_blank">交易链接:
                        {{ d.row.transaction_link ? d.row.transaction_link : '-' }}</a></div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="left" prop="bean" label="充值提货" min-width="100" show-overflow-tooltip>
              <template slot-scope="d">
                <div><span>上月充值:￥ {{ d.row.lastchong }}</span></div>
                <div><span>上月提取:￥ {{ d.row.lastti }}</span></div>
                <div><span>本月充值:￥ {{ d.row.thischong }}</span></div>
                <div><span>本月提取:￥ {{ d.row.thisti }}</span></div>
              </template>
            </el-table-column>
            <el-table-column align="left" prop="bean" label="余额信息" min-width="100" show-overflow-tooltip>
              <template slot-scope="d">
                <div><span>总充值:￥ {{ d.row.recharge }}</span></div>
                <div><span>总库存:￥ {{ d.row.stock_price }}</span></div>
                <div><span>余额:￥{{ d.row.bean }}</span></div>
                <div><span>商城余额: ￥{{ d.row.store_bean }}</span></div>
              </template>
            </el-table-column>

            <el-table-column align="left" prop="invitation_code" label="推广信息" show-overflow-tooltip>
              <template slot-scope="d">
                <div>推广码: {{d.row.invitation_code}}</div>
                <div>邀请人: {{d.row.invitation_user_name}}</div>
                <div>邀请人ID: {{d.row.superior_id}}</div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="spread_grade" label="推广等级">
              <template slot-scope="d">
                Level {{ d.row.spread_grade }}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="time" label="加入时间" show-overflow-tooltip>
            </el-table-column>
            <el-table-column align="center" prop="status" label="状态" min-width="100" show-overflow-tooltip>
              <template slot-scope="d">
                <div>
                  登录状态:
                  <template v-if="d.row.status == 1">
                    <el-tag size="mini">正常</el-tag>
                  </template>
                  <template v-else>
                    <el-tag size="mini" type="danger">禁止</el-tag>
                  </template>
                </div>
                <div>
                  充值:
                  <template v-if="d.row.status2 == 1">
                    <el-tag size="mini">正常</el-tag>
                  </template>
                  <template v-else>
                    <el-tag size="mini" type="danger">禁止</el-tag>
                  </template>
                </div>
                <div>
                  提货:
                  <template v-if="d.row.status3 == 1">
                    <el-tag size="mini">正常</el-tag>
                  </template>
                  <template v-else>
                    <el-tag size="mini" type="danger">禁止</el-tag>
                  </template>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="170">
              <template slot-scope="d">
                <el-button size="mini" type="primary" @click.stop="edit(d.$index, d.row)">编辑
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
    <el-dialog :title="operation_title" append-to-body :visible.sync="operation_page" width="50%">
      <div style="margin: 0 20px;">
        <el-form ref="operation_form" :rules="operation_rule" :model="operation_form">
          <el-row>
            <el-col :span="12">
              <el-form-item label="用户名称:" label-width="100px" prop="name">
                <el-input v-model="operation_form.name" placeholder="用户名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用户类型:" label-width="100px" prop="type">
                <el-select clearable v-model="operation_form.type" placeholder="请选择" style="width: 100%">
                  <el-option label="普通用户" :value="1">
                  </el-option>
                  <el-option label="主播" :value="2">
                  </el-option>
                  <el-option label="推广" :value="3">
                  </el-option>
                  <el-option label="机器人" :value="4">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="用户余额:" label-width="100px" prop="bean">
                <el-input type="number" v-model.number="operation_form.bean" placeholder="用户余额"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商城余额:" label-width="100px" prop="store_bean">
                <el-input type="number" v-model.number="operation_form.store_bean" placeholder="商城余额"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="推广等级:" label-width="100px" prop="spread_grade">
                <el-select clearable v-model="operation_form.spread_grade" placeholder="请选择" style="width: 100%">
                  <el-option v-for="(item, index) in spread" :label="'Level ' + item.level" :value="item.level"
                    :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="推广码:" label-width="100px" prop="invitation_code">
                <el-input v-model="operation_form.invitation_code" placeholder="推广码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上级ID:" label-width="100px" prop="superior_id">
                <el-input v-model="operation_form.superior_id" placeholder="上级id"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="交易链接:" label-width="100px" prop="transaction_link">
                <el-input v-model="operation_form.transaction_link" placeholder="交易链接"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="用户头像:" label-width="100px" prop="portrait">
                <el-upload class="avatar-uploader" :action="server_url + '/admin.php/common/upload/filename/portrait'"
                  :headers="{secret:secret,token:token}" :show-file-list="false" :before-upload="avatar_upload"
                  :on-success="avatar_success">
                  <img v-if="operation_form.portrait" :src="repair(operation_form.portrait)" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="登录状态:" label-width="100px" prop="status">
                <el-radio v-model="operation_form.status" :label="1">正常</el-radio>
                <el-radio v-model="operation_form.status" :label="0">禁止</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="充值:" label-width="100px" prop="status2">
                <el-radio v-model="operation_form.status2" :label="1">正常</el-radio>
                <el-radio v-model="operation_form.status2" :label="0">禁止</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="提货:" label-width="100px" prop="status2">
                <el-radio v-model="operation_form.status3" :label="1">正常</el-radio>
                <el-radio v-model="operation_form.status3" :label="0">禁止</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div style="text-align: center;">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="add_submit" v-if="operation_type == 'add'">保存</el-button>
        <el-button type="primary" @click="edit_submit" v-if="operation_type == 'edit'">保存</el-button>
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
        data: [],
        spread: [],
        query: {},
        operation_title: '',
        operation_type: '',
        operation_page: false,
        operation_index: '',
        operation_row: {},
        operation_form: {
          name: '',
          type: '',
          bean: '',
          store_bean: '',
          status: 1,
          status2: 1,
          status3: 1,
          spread_grade: '',
          invitation_code: '',
          transaction_link: '',
          portrait: '',
          superior_id: '',
        },
        operation_rule: {
          name: [{
            required: true,
            message: "请输入用户名称",
            trigger: "blur"
          }, ],
          type: [{
            required: true,
            message: "请选择用户类型",
            trigger: "change"
          }, ],
          bean: [{
              required: true,
              message: "请输入用户余额",
              trigger: "blur"
            },
            {
              type: 'number',
              message: '用户余额必须为数字'
            }
          ],
          store_bean: [{
              required: true,
              message: "请输入商城余额",
              trigger: "blur"
            },
            {
              type: 'number',
              message: '商城余额必须为数字'
            }
          ],
          portrait: [{
            required: true,
            message: "请上传用户头像",
            trigger: "change"
          }, ],
          spread_grade: [{
            required: true,
            message: "请选择推广等级",
            trigger: "change"
          }, ],
          invitation_code: [{
            required: true,
            message: "请输入推广码",
            trigger: "blur"
          }, ],
          superior_id: [{
            required: true,
            message: "请输入上级ID",
            trigger: "blur"
          }, ],
          transaction_link: [{
            required: true,
            message: "请输入交易链接",
            trigger: "blur"
          }, ],
        },
      };
    },
    mounted() {
      this.get_user();
      this.get_spread_list();
      this.get_winning_rate_list();

    },
    methods: {
      repair,

      //获取用户数据
      get_user() {
        let page_info = this.page_info;
        let query = this.query;
        ttGet("/admin.php/user/get_user", {
          page: page_info.page,
          limit: page_info.limit,
          id: query.id,
          info: query.info,
          transaction_link: query.transaction_link,
          type: query.type,
          superior_id: query.superior_id,
        }, (res) => {
          this.loading = false;
          if (res.code == 200) {
            this.data = res.data.data.data;
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

      //获取推广等级
      get_spread_list() {
        ttGet("/admin.php/user/get_spread_list", '', (res) => {
          if (res.code == 200) {
            this.spread = res.data.spread;
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
        this.get_user();
      },

      //条数切换
      sizeChange(limit) {
        this.page_info.page = 1;
        this.page_info.limit = limit;
        this.loading = true;
        this.get_user();
      },

      //条件搜索
      search() {
        this.page_info.page = 1;
        this.loading = true;
        this.get_user();
      },

      //重置条件
      reset() {
        this.page_info.page = 1;
        this.query = {};
        this.loading = true;
        this.get_user();
      },

      //添加
      add: function() {
        this.operation_form = {
          name: '',
          type: '',
          bean: '',
          store_bean: '',
          status: 1,
          status2: 1,
          status3: 1,
          superior_id: '',
          spread_grade: '',
          invitation_code: '',
          transaction_link: '',
          portrait: ''
        };
        this.operation_title = '添加';
        this.operation_type = 'add';
        this.operation_page = true;
      },

      //编辑
      edit(operation_index, operation_row) {
        let loading = this.$loading({
          text: '查询中',
          spinner: "el-icon-loading"
        });
        ttGet("/admin.php/user/get_user_details", {
          id: operation_row.id
        }, (res) => {
          loading.close();
          if (res.code == 200) {
            this.operation_form = res.data.user;
            this.operation_form.bean = Number(res.data.user.bean);
            this.operation_form.store_bean = Number(res.data.user.store_bean);
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

      //关闭操作窗口
      close() {
        this.operation_page = false;
      },

      //添加提交数据
      add_submit() {
        this.$refs.operation_form.validate(valid => {
          if (valid) {
            let operation_index = this.operation_index;
            let operation_row = this.operation_row;
            let operation_form = this.operation_form;
            let loading = this.$loading({
              text: '提交中',
              spinner: "el-icon-loading"
            });
            ttPost("/admin.php/user/user_add", {
              id: operation_row.id,
              name: operation_form.name,
              portrait: operation_form.portrait,
              type: operation_form.type,
              bean: operation_form.bean,
              store_bean: operation_form.store_bean,
              status: operation_form.status,
              status2: operation_form.status2,
              status3: operation_form.status3,
              spread_grade: operation_form.spread_grade,
              invitation_code: operation_form.invitation_code,
              superior_id: operation_form.superior_id,
              transaction_link: operation_form.transaction_link,
            }, (res) => {
              loading.close();
              if (res.code == 200) {
                this.get_user();
                this.operation_page = false;
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
        });
      },

      //编辑提交数据
      edit_submit() {
        this.$refs.operation_form.validate(valid => {
          if (valid) {
            let operation_index = this.operation_index;
            let operation_row = this.operation_row;
            let operation_form = this.operation_form;
            let loading = this.$loading({
              text: '提交中',
              spinner: "el-icon-loading"
            });
            ttPost("/admin.php/user/user_edit", {
              id: operation_row.id,
              name: operation_form.name,
              portrait: operation_form.portrait,
              superior_id: operation_form.superior_id,
              type: operation_form.type,
              bean: operation_form.bean,
              store_bean: operation_form.store_bean,
              status: operation_form.status,
              status2: operation_form.status2,
              status3: operation_form.status3,
              spread_grade: operation_form.spread_grade,
              invitation_code: operation_form.invitation_code,
              transaction_link: operation_form.transaction_link,
            }, (res) => {
              loading.close();
              if (res.code == 200) {
                this.get_user();
                this.operation_page = false;
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
          this.operation_form.portrait = res.data.img;
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

      //加入roll房
      add2() {
        let ornaments_arr = [];
        ornaments_arr = this.$refs.table.selection;
        if (ornaments_arr.length == 0) {
          return this.$message({
            message: '最少选择一位用户加入',
            type: 'warning'
          });
        }
        let id_arr = [];
        for (let x in ornaments_arr) {
          id_arr.push(ornaments_arr[x].id);
        }
        this.$prompt('请输入Roll房ID', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({
          value
        }) => {
          if (!value) {
            return this.$message({
              message: '请输入Roll房ID',
              type: 'warning'
            });
          }
          let loading = this.$loading({
            text: '发送中',
            spinner: "el-icon-loading"
          });
          ttPost("/admin.php/user/user_join_roll", {
            id_arr: id_arr,
            value: value
          }, (res) => {
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
        }).catch(() => {

        });
      },
      //重置
      reset_rate(operation_index, operation_row) {
        this.$confirm("确定重置吗?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let loading = this.$loading({
            text: '提交中',
            spinner: "el-icon-loading"
          });
          ttPost("/admin.php/user/reset_rate", {
            id_arr: operation_row.id,
          }, (res) => {
            loading.close();
            if (res.code == 200) {
              this.get_user();
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
        }).catch(() => {});
      }

    }
  };
</script>

<style lang="scss" scoped>
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