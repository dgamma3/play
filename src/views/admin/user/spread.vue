<template>
  <div style="height: 100%;width: 100%;background-color: #FFFFFF;overflow: hidden;">
    <div style="background-color: #FFFFFF;height: 100%;overflow: hidden;">
      <div style="margin: 20px 10px 0 10px;">
        <el-form>
          <el-row>
            <el-col :span="4">
              <el-form-item label="是否启用:" label-width="80px">
                <el-select clearable v-model="query.status" placeholder="请选择">
                  <el-option
                    label="是"
                    :value="1">
                  </el-option>
                  <el-option
                    label="否"
                    :value="0">
                  </el-option>
                </el-select>
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
              prop="level"
              label="等级">
              <template slot-scope="d">
                Level {{ d.row.level }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="level"
              label="到达条件"
              min-width="200">
              <template slot-scope="d">
                邀请下级充值金额 ￥ {{ d.row.where }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="commission"
              label="返佣比例">
              <template slot-scope="d">
                {{ d.row.commission }}%
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="status"
              label="是否启用">
              <template slot-scope="d">
                <template v-if="d.row.status == 1">
                  <el-tag size="mini">是</el-tag>
                </template>
                <template v-else>
                  <el-tag size="mini" type="danger">否</el-tag>
                </template>
              </template>
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
            <el-col :span="12">
              <el-form-item label="返佣等级:" label-width="100px" prop="level">
                <el-input type="number" v-model.number="operation_form.level" placeholder="返佣等级"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="到达条件:" label-width="100px" prop="where">
                <el-input type="number" v-model.number="operation_form.where" placeholder="邀请下级充值金额"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="返佣比例:" label-width="100px" prop="commission">
                <el-input type="number" v-model.number="operation_form.commission" placeholder="返佣比例"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用户状态:" label-width="100px" prop="status">
                <el-radio v-model="operation_form.status" :label="1">开启</el-radio>
                <el-radio v-model="operation_form.status" :label="0">禁止</el-radio>
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
  import {getStore, setStore} from "@/utils/store.js";
  import {ttGet, ttPost} from "@/utils/util.js";

  export default {
    data() {
      return {
        img_url: this.$img_url,
        loading: true,
        page_info: {
          page: 1,
          limit: 10,
          total: 0,
        },
        data: [],
        query: {},
        operation_title: '',
        operation_type: '',
        operation_page: false,
        operation_index: '',
        operation_row: {},
        operation_form: {
          level: '',
          where: '',
          commission: '',
          status: 1,
        },
        operation_rule: {
          level: [
            {required: true, message: "请输入返佣等级", trigger: "blur"},
            { type: 'number', message: '返佣等级必须为数字'}
          ],
          where: [
            {required: true, message: "请输入邀请下级充值金额", trigger: "blur"},
            { type: 'number', message: '下级充值金额必须为数字'}
          ],
          commission: [
            {required: true, message: "请输入返佣比例", trigger: "blur"},
            { type: 'number', message: '返佣比例必须为数字'}
          ],
        },

      };
    },
    mounted() {
      this.get_spread();
    },
    methods: {
      //获取推广等级
      get_spread() {
        let page_info = this.page_info;
        let query = this.query;
        ttGet("/admin.php/user/get_spread", {
          page: page_info.page,
          limit: page_info.limit,
          status: query.status,
        }, (res) => {
          this.loading = false;
          if (res.code == 200) {
            this.data = res.data.data.data;
            this.page_info.total = res.data.data.count;
            let height = 50 + 50 * (res.data.data.data.length ? res.data.data.data.length : 1);
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
        this.get_spread();
      },

      //条数切换
      sizeChange(limit) {
        this.page_info.page = 1;
        this.page_info.limit = limit;
        this.loading = true;
        this.get_spread();
      },

      //条件搜索
      search() {
        this.page_info.page = 1;
        this.loading = true;
        this.get_spread();
      },

      //重置条件
      reset() {
        this.page_info.page = 1;
        this.query = {};
        this.loading = true;
        this.get_spread();
      },

      //添加
      add: function () {
        this.operation_form = {
          level: '',
          where: '',
          commission: '',
          status: 1,
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
        ttGet("/admin.php/user/get_spread_details", {id: operation_row.id}, (res) => {
          loading.close();
          if (res.code == 200) {
            this.operation_form = res.data.spread;
            this.operation_form.level = Number(res.data.spread.level);
            this.operation_form.where = Number(res.data.spread.where);
            this.operation_form.commission = Number(res.data.spread.commission);
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
            ttPost("/admin.php/user/spread_add", {
              level: operation_form.level,
              where: operation_form.where,
              commission: operation_form.commission,
              status: operation_form.status,
            }, (res) => {
              loading.close();
              if (res.code == 200) {
                this.page_info.page = 1;
                this.get_spread();
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
            ttPost("/admin.php/user/spread_edit", {
              id: operation_row.id,
              level: operation_form.level,
              where: operation_form.where,
              commission: operation_form.commission,
              status: operation_form.status,
            }, (res) => {
              loading.close();
              if (res.code == 200) {
                this.data[operation_index] = operation_form;
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
          ttPost("/admin.php/user/spread_del", {
            id: operation_row.id,
          }, (res) => {
            loading.close();
            if (res.code == 200) {
              if (this.page_info.page > 1 && this.data.length == 1) this.page_info.page -= 1;
              this.get_spread();
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

  .my-table-home > table {
    font-size: 14px;
    line-height: 30px;
    text-align: left;
    border-collapse: collapse;
  }

  .my-table-home > table > tr {
    height: 30px;
    border-bottom: 1px dashed #EEEEEE;
  }

  .my-table-home > table td {
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
