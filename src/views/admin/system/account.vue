<template>
  <div style="height: 100%;width: 100%;background-color: #FFFFFF;overflow: hidden;">
    <div style="background-color: #FFFFFF;height: 100%;overflow: hidden;">
      <div style="margin: 20px 10px 0 10px;">
        <el-form>
          <el-row>
            <el-col :span="5">
              <el-form-item label="管理员信息:" label-width="120px">
                <el-input v-model="query.info" placeholder="请输入名称或账号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label-width="20px">
                <el-button
                  size="medium"
                  type="primary"
                  icon="el-icon-search"
                  @click="search">搜索
                </el-button>
                <el-button
                  size="medium"
                  icon="el-icon-delete"
                  @click="reset">重置
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div style="display: flex;margin: 0 20px 10px 20px;">
        <el-button
          size="medium"
          type="primary"
          @click.stop="add">
          添加
        </el-button>
      </div>
      <div style="margin: 0 20px;overflow: auto;padding-bottom: 20px;">
        <template>
          <el-table
            v-loading="loading"
            :data="data"
            border
            height="100%"
            ref="table"
            :header-cell-style="{backgroundColor: '#fafafa',color:'#333333',fontWeight:'400',textAlign:'center'}"
            :row-style="{color:'#333333',fontWeight:'400',height:50+'px',textAlign:'center'}"
            :cell-style="{padding:5+'px'}"
            style="width: 100%;font-size: 14px;">
            <el-table-column
              align="center"
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="管理员名称">
            </el-table-column>
            <el-table-column
              align="center"
              prop="username"
              label="管理员账号">
            </el-table-column>
            <el-table-column
              align="center"
              prop="role_name"
              label="管理员角色">
            </el-table-column>
            <el-table-column
              align="center"
              prop="end_time"
              label="最后登录时间">
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="150">
              <template slot-scope="d">
                <el-button
                  size="mini"
                  type="primary"
                  @click.stop="edit(d.$index, d.row)">编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click.stop="del(d.$index, d.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align: right;margin: 20px 0 0 0;">
            <el-pagination
              background
              @size-change="sizeChange"
              @current-change="currentChange"
              :current-page="page_info.page"
              :page-sizes="[10, 20, 50, 100, 200, 500]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page_info.total">
            </el-pagination>
          </div>
        </template>
      </div>
    </div>
    <el-dialog
      :title="operation_title"
      append-to-body
      :visible.sync="operation_page"
      width="50%">
      <div style="margin: 0 20px;">
        <el-form
          ref="operation_form"
          :rules="operation_rule"
          :model="operation_form">
          <el-row>
            <el-col :span="24">
              <el-form-item label="管理员名称:" label-width="100px" prop="name">
                <el-input v-model="operation_form.name" placeholder="管理员名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="管理员账号:" label-width="100px" prop="username">
                <el-input v-model="operation_form.username" placeholder="管理员账号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <template v-if="operation_type == 'add'">
            <el-row>
              <el-col :span="24">
                <el-form-item label="管理员密码:" label-width="100px" prop="password">
                  <el-input type="password" v-model="operation_form.password" placeholder="管理员密码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
          <template v-else>
            <el-row>
              <el-col :span="24">
                <el-form-item label="管理员密码:" label-width="100px">
                  <el-input type="password" v-model="operation_form.password" placeholder="不填则不修改密码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
          <el-row>
            <el-col :span="24">
              <el-form-item label="管理员角色:" label-width="100px" prop="role">
                <el-select v-model="operation_form.role" multiple placeholder="请选择(可多选)" style="width: 100%;">
                  <el-option
                    v-for="(item, index) in role"
                    :label="item.name"
                    :value="String(item.id)"
                    :key="index"
                    >
                  </el-option>
                </el-select>
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
  import {ttGet, ttPost, abrasion, quality, quality2, color, repair} from "@/utils/util.js";

  export default {
    data() {
      return {
        server_url: this.$server_url,
        img_url: this.$img_url,
        loading: true,
        page_info: {
          page: 1,
          limit: 10,
          total: 0,
        },
        data: [],
        role: [],
        query: {},
        operation_title: '',
        operation_type: '',
        operation_page: false,
        operation_index: '',
        operation_row: {},
        operation_form: {
          name: '',
          username: '',
          password: '',
          role: [],
        },
        operation_rule: {
          name: [
            {required: true, message: "请输入管理员名称", trigger: "blur"}
          ],
          username: [
            {required: true, message: "请输入管理员账号", trigger: "blur"}
          ],
          password: [
            {required: true, message: "请输入管理员密码", trigger: "blur"}
          ],
          role: [
            {required: true, message: "请选择管理员角色", trigger: "change"}
          ],
        },
      };
    },
    mounted() {
      this.get_account();
      this.get_whole_role();
    },
    methods: {
      abrasion, quality, quality2, color, repair,

      //获取管理员
      get_account() {
        let page_info = this.page_info;
        let query = this.query;
        ttGet("/admin.php/system/get_account", {
          page: page_info.page,
          limit: page_info.limit,
          info: query.info,
        }, (res) => {
          this.loading = false;
          if (res.code == 200) {
            this.data = res.data.data.data;
            this.page_info.total = res.data.data.count;
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        });
      },

      //获取角色
      get_whole_role() {
        ttGet("/admin.php/system/get_whole_role", '', (res) => {
          if (res.code == 200) {
            this.role = res.data.role;
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
        this.get_account();
      },

      //条数切换
      sizeChange(limit) {
        this.page_info.page = 1;
        this.page_info.limit = limit;
        this.loading = true;
        this.get_account();
      },

      //条件搜索
      search() {
        this.page_info.page = 1;
        this.loading = true;
        this.get_account();
      },

      //重置条件
      reset() {
        this.page_info.page = 1;
        this.query = {};
        this.loading = true;
        this.get_account();
      },

      //添加
      add: function () {
        this.operation_form = {
          name: '',
          username: '',
          password: '',
          role: [],
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
        ttGet("/admin.php/system/get_account_details", {id: operation_row.id}, (res) => {
          loading.close();
          if (res.code == 200) {
            this.operation_form = res.data.account;
            this.operation_form.password = '';
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
            let operation_form = this.operation_form;
            let loading = this.$loading({
              text: '提交中',
              spinner: "el-icon-loading"
            });
            ttPost("/admin.php/system/account_add", {
              name: operation_form.name,
              username: operation_form.username,
              password: operation_form.password,
              role: operation_form.role,
            }, (res) => {
              loading.close();
              if (res.code == 200) {
                this.page_info.page = 1;
                this.get_account();
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
            let operation_row = this.operation_row;
            let operation_form = this.operation_form;
            let loading = this.$loading({
              text: '提交中',
              spinner: "el-icon-loading"
            });
            ttPost("/admin.php/system/account_edit", {
              id: operation_row.id,
              name: operation_form.name,
              username: operation_form.username,
              password: operation_form.password,
              role: operation_form.role,
            }, (res) => {
              loading.close();
              if (res.code == 200) {
                this.get_account();
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

      //删除
      del(operation_index, operation_row) {
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let loading = this.$loading({
            text: '提交中',
            spinner: "el-icon-loading"
          });
          ttPost("/admin.php/system/account_del", {
            id: operation_row.id,
          }, (res) => {
            loading.close();
            if (res.code == 200) {
              if (this.page_info.page > 1 && this.data.length == 1) this.page_info.page -= 1;
              this.get_account();
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
        }).catch(() => {

        });
      },
    }
  };
</script>

<style lang="scss" scoped>
</style>
