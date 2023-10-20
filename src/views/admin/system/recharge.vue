<template>
  <div style="height: 100%;width: 100%;background-color: #FFFFFF;overflow: hidden;">
    <div style="background-color: #FFFFFF;height: 100%;overflow: hidden;">
      <div style="display: flex;margin: 10px 20px 10px 20px;">
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
              prop="amount"
              label="充值金额">
              <template slot-scope="d">
                ￥ {{ d.row.amount }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="give_ratio"
              label="赠送比例">
              <template slot-scope="d">
                {{ d.row.give_ratio }} %
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="extra_give"
              label="额外赠送">
              <template slot-scope="d">
               ￥  {{ d.row.extra_give }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="status"
              label="显示开关">
              <template slot-scope="d">
                <template v-if="d.row.status == 1">
                  <el-tag size="mini">开启</el-tag>
                </template>
                <template v-else>
                  <el-tag size="mini" type="danger">关闭</el-tag>
                </template>
              </template>
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
      width="60%">
      <div style="margin: 0 20px;">
        <el-form
          ref="operation_form"
          :rules="operation_rule"
          :model="operation_form">
          <el-row>
            <el-col :span="12">
              <el-form-item label="充值金额:" label-width="100px" prop="amount">
                <el-input type="number" v-model.number="operation_form.amount" placeholder="充值金额"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="赠送比例:" label-width="100px" prop="give_ratio">
                <el-input type="number" v-model.number="operation_form.give_ratio" placeholder="赠送比例 无则填0"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <div style="margin-left: 20px;line-height: 40px;">% 充值赠送比例 例:20% 冲100则得100 + 100 * 20% = 120</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="额外赠送:" label-width="100px" prop="extra_give">
                <el-input type="number" v-model.number="operation_form.extra_give" placeholder="额外赠送 无则填0"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <div style="margin-left: 20px;line-height: 40px;">额外赠送 例:10 冲100则得100 + 10 = 110</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="分类开关:" label-width="100px" prop="status">
                <el-radio v-model="operation_form.status" :label="1">开启</el-radio>
                <el-radio v-model="operation_form.status" :label="0">关闭</el-radio>
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
  import {ttGet, ttPost, htmlEncode, htmlDecode} from "@/utils/util.js";

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
        operation_title: '',
        operation_type: '',
        operation_page: false,
        operation_index: '',
        operation_row: {},
        operation_form: {
          amount: '',
          give_ratio: '',
          extra_give: '',
          status: 1,
        },
        operation_rule: {
          amount: [
            {required: true, message: "请输入充值金额", trigger: "blur"},
            { type: 'number', message: '充值金额必须为数字'}
          ],
          give_ratio: [
            {required: true, message: "请输入赠送比例", trigger: "blur"},
            { type: 'number', message: '赠送比例必须为数字'}
          ],
          extra_give: [
            {required: true, message: "请输入额外赠送", trigger: "blur"},
            { type: 'number', message: '额外赠送必须为数字'}
          ],
        },
      };
    },
    mounted() {
      this.get_recharge();
    },
    methods: {
      //获取充值
      get_recharge() {
        let page_info = this.page_info;
        ttGet("/admin.php/system/get_recharge", {
          page: page_info.page,
          limit: page_info.limit,
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

      //分页切换
      currentChange(page) {
        this.page_info.page = page;
        this.loading = true;
        this.get_recharge();
      },

      //条数切换
      sizeChange(limit) {
        this.page_info.page = 1;
        this.page_info.limit = limit;
        this.loading = true;
        this.get_recharge();
      },

      //条件搜索
      search() {
        this.page_info.page = 1;
        this.loading = true;
        this.get_recharge();
      },

      //重置条件
      reset() {
        this.page_info.page = 1;
        this.query = {};
        this.loading = true;
        this.get_recharge();
      },

      //添加
      add: function () {
        this.operation_form = {
          amount: '',
          give_ratio: '',
          extra_give: '',
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
        ttGet("/admin.php/system/get_recharge_details", {id: operation_row.id}, (res) => {
          loading.close();
          if (res.code == 200) {
            this.operation_form = res.data.recharge;
            this.operation_form.amount = Number(res.data.recharge.amount);
            this.operation_form.give_ratio = Number(res.data.recharge.give_ratio);
            this.operation_form.extra_give = Number(res.data.recharge.extra_give);
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
            ttPost("/admin.php/system/recharge_add", {
              amount: operation_form.amount,
              give_ratio: operation_form.give_ratio,
              extra_give: operation_form.extra_give,
              status: operation_form.status,
            }, (res) => {
              loading.close();
              if (res.code == 200) {
                this.page_info.page = 1;
                this.get_recharge();
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
            ttPost("/admin.php/system/recharge_edit", {
              id: operation_row.id,
              amount: operation_form.amount,
              give_ratio: operation_form.give_ratio,
              extra_give: operation_form.extra_give,
              status: operation_form.status,
            }, (res) => {
              loading.close();
              if (res.code == 200) {
                this.get_recharge();
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
          ttPost("/admin.php/system/recharge_del", {
            id: operation_row.id,
          }, (res) => {
            loading.close();
            if (res.code == 200) {
              if (this.page_info.page > 1 && this.data.length == 1) this.page_info.page -= 1;
              this.get_recharge();
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
