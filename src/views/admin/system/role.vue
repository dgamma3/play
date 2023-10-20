<template>
  <div style="height: 100%;width: 100%;background-color: #FFFFFF;overflow: hidden;">
    <div style="background-color: #FFFFFF;height: 100%;overflow: hidden;">
      <div style="margin: 20px 10px 0 10px;">
        <el-form>
          <el-row>
            <el-col :span="5">
              <el-form-item label="角色名称:" label-width="120px">
                <el-input v-model="query.name" placeholder="请输入名称"></el-input>
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
              label="角色名称">
            </el-table-column>
            <el-table-column label="操作" align="center">
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
              <el-form-item label="角色名称:" label-width="100px" prop="name">
                <el-input v-model="operation_form.name" placeholder="角色名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-button type="primary" style="margin-left: 100px;" @click="to_update">更新权限</el-button>
            <el-col :span="24">
              <el-form-item label="角色权限:" label-width="100px" prop="name">
                <div v-for="(item, index) in power"
                    :key="index"
                    >
                  <el-checkbox class="checkbox-parent" @change="(val) => {power_all_change(val, index)}">{{item.name}}</el-checkbox>
                  <el-checkbox-group v-model="operation_form.power">
                    <el-checkbox v-for="(item2, index2) in item.children" :label="item2.id"
                    :key="index2"
                    >{{item2.name}}
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
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
        power: [],
        query: {},
        operation_title: '',
        operation_type: '',
        operation_page: false,
        operation_index: '',
        operation_row: {},
        operation_form: {
          name: '',
          power: [],
        },
        operation_rule: {
          name: [
            {required: true, message: "请输入角色名称", trigger: "blur"}
          ],
        }
      };
    },
    mounted() {
      this.get_role();
      this.get_whole_power();
    },
    methods: {
      abrasion, quality, quality2, color, repair,

      //获取角色
      get_role() {
        let page_info = this.page_info;
        let query = this.query;
        ttGet("/admin.php/system/get_role", {
          page: page_info.page,
          limit: page_info.limit,
          name: query.name,
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

      //获取所有权限
      get_whole_power() {
        ttGet("/admin.php/system/get_whole_power", '', (res) => {
          if (res.code == 200) {
            this.power = res.data.power;
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
        this.get_role();
      },

      //条数切换
      sizeChange(limit) {
        this.page_info.page = 1;
        this.page_info.limit = limit;
        this.loading = true;
        this.get_role();
      },

      //条件搜索
      search() {
        this.page_info.page = 1;
        this.loading = true;
        this.get_role();
      },

      //重置条件
      reset() {
        this.page_info.page = 1;
        this.query = {};
        this.loading = true;
        this.get_role();
      },

      //添加
      add: function () {
        this.operation_form = {
          name: '',
          power: this.operation_form.power,
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
        ttGet("/admin.php/system/get_role_details", {id: operation_row.id}, (res) => {
          loading.close();
          if (res.code == 200) {
            this.operation_form = res.data.role;
            this.operation_form.power = res.data.role.power.map((item) => {
              return Number(item);
            });
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
            ttPost("/admin.php/system/role_add", {
              name: operation_form.name,
              power: operation_form.power,
            }, (res) => {
              loading.close();
              if (res.code == 200) {
                this.page_info.page = 1;
                this.get_role();
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
            ttPost("/admin.php/system/role_edit", {
              id: operation_row.id,
              name: operation_form.name,
              power: operation_form.power,
            }, (res) => {
              loading.close();
              if (res.code == 200) {
                this.get_role();
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
          ttPost("/admin.php/system/role_del", {
            id: operation_row.id,
          }, (res) => {
            loading.close();
            if (res.code == 200) {
              if (this.page_info.page > 1 && this.data.length == 1) this.page_info.page -= 1;
              this.get_role();
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

      //权限全选
      power_all_change(val, index) {
        let id_arr = this.power[index].children.map((item) => {
          return item.id;
        });
        let power_arr = this.operation_form.power;
        if (val){
          power_arr = power_arr.concat(id_arr);
          power_arr = [...new Set(power_arr)];
        } else {
          power_arr = power_arr.filter((item) => {
            return !id_arr.includes(item);
          });
        }
        this.operation_form.power = power_arr;
      },

      //编辑
      to_update() {
        let loading = this.$loading({
          text: '更新中',
          spinner: "el-icon-loading"
        });
        ttGet("/admin.php/common/init_perm", '', (res) => {
          loading.close();
          if (res.code == 200) {
            this.power = res.data.power;
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
  .checkbox-parent {
    font-weight: bold;
  }
</style>
