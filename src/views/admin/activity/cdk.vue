<template>
  <div style="height: 100%;width: 100%;background-color: #FFFFFF;overflow: hidden;">
    <div style="background-color: #FFFFFF;height: 100%;overflow: hidden;">
      <div style="margin: 20px 10px 0 10px;">
        <el-form>
          <el-row>
            <el-col :span="5">
              <el-form-item label="CDK信息:" label-width="120px">
                <el-input v-model="query.info" placeholder="请输入CDK信息"></el-input>
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
      </div>
      <div style="margin: 0 20px;overflow: auto;padding-bottom: 20px;">
        <template>
          <el-table v-loading="loading" :data="data" border height="100%" ref="table"
            :header-cell-style="{backgroundColor: '#fafafa',color:'#333333',fontWeight:'400',textAlign:'center'}"
            :row-style="{color:'#333333',fontWeight:'400',height:50+'px',textAlign:'center'}"
            :cell-style="{padding:5+'px'}" style="width: 100%;font-size: 14px;">
            <el-table-column align="center" type="selection" width="55">
            </el-table-column>
            <el-table-column align="center" prop="sort" label="CDK信息">
              <template slot-scope="d">
                <div>{{d.row.name}}</div>
                <div>{{d.row.cdk}}</div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="sort" label="发送总额">
              <template slot-scope="d">
                <div>￥ {{d.row.total}}</div>
                <div>￥ {{d.row.issued}}</div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="sort" label="活动时间">
              <template slot-scope="d">
                <div>{{d.row.where_start_time_text}}</div>
                <div>{{d.row.where_end_time_text}}</div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="sort" label="发放类型">
              <template slot-scope="d">
                <template v-if="d.row.send_type == 1">
                  <div>随机金额</div>
                  <div>最大可领: ￥ {{d.row.num}}</div>
                </template>
                <template v-else>
                  <div>固定金额</div>
                  <div>每人可领: ￥ {{d.row.num}}</div>
                </template>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="sort" label="领取条件">
              <template slot-scope="d">
                <template v-if="d.row.type == 1">
                  <div>免费领取</div>
                </template>
                <template v-else>
                  <div>充值可领取</div>
                </template>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="d">
                <el-button size="mini" type="primary" @click.stop="edit(d.$index, d.row)">编辑
                </el-button>
                <el-button size="mini" type="danger" @click.stop="del(d.$index, d.row)">删除
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
    <el-dialog :title="operation_title" append-to-body :visible.sync="operation_page" width="60%">
      <div style="margin: 0 20px;">
        <el-form ref="operation_form" :rules="operation_rule" :model="operation_form">
          <el-row>
            <el-col :span="24">
              <el-form-item label="cdk名称:" label-width="100px" prop="name">
                <el-input type="text" v-model="operation_form.name" placeholder="cdk名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="cdk:" label-width="100px" prop="cdk">
                <el-input type="text" v-model="operation_form.cdk" placeholder="cdk">
                  <el-button slot="append" type="primary" size="mini" @click="random">随机生成</el-button>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="发送总额:" label-width="100px" prop="total">
                <el-input type="number" v-model.number="operation_form.total" placeholder="发送总额"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="领取金额:" label-width="100px" prop="num">
                <el-input type="number" v-model.number="operation_form.num" placeholder="领取金额"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="发送类型:" label-width="100px" prop="send_type">
                <el-radio v-model="operation_form.send_type" :label="1">随机金额</el-radio>
                <el-radio v-model="operation_form.send_type" :label="2">固定金额</el-radio>
                <el-radio v-model="operation_form.send_type" :label="3">根据系统设置</el-radio>
                <div>
                  1.随机类型下领取金额填写每人最大可领金额(假如设置10,则用户可领金额0.01~10之间)
                </div>
                <div>
                  2.固定类型下领取金额直接输入每人可领金额(假如设置10,则用户领取金额为10)
                </div>
                <div>
                  3.如果最后剩余金额小于设置可领金额则该剩余金额给到最后一位领取用户
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="领取条件:" label-width="100px" prop="type">
                <el-radio-group v-model="operation_form.type">
                  <el-radio :label="1">免费领取</el-radio>
                  <el-radio :label="2">充值领取</el-radio>
                  <el-radio :label="4">亏损领取</el-radio>
                  <el-radio :label="5">昨日充值红包</el-radio>
                  <el-radio :label="6">月累充红包</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="operation_form.type==2">
            <el-col :span="24">
              <el-form-item label="充值金额:" label-width="100px" prop="where_value">
                <el-input type="number" v-model.number="operation_form.where_value" placeholder="【条件】充值金额"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="operation_form.type==2">
            <el-col :span="24">
              <el-form-item label="活动时间:" label-width="100px" prop="value1">
                <!-- <el-input type="text" v-model.number="operation_form.where_start_time" placeholder="开始时间"></el-input>
                <el-input type="text" v-model.number="operation_form.where_end_time" placeholder="结束时间"></el-input> -->
                <el-date-picker v-model="operation_form.value1" type="datetimerange" align="center"
                  value-format="timestamp" unlink-panels range-separator="至" start-placeholder="开始日期"
                  end-placeholder="结束日期" :picker-options="picker_options" style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="operation_form.type==4">
            <el-form-item label="亏损模式:" label-width="100px" prop="num">
              <el-input type="number" v-model.number="operation_form.ks_type"
                placeholder="亏损模式,1为金币,300以上10%补偿,2为钻石,300以上10%补偿"></el-input>
            </el-form-item>
            <el-col :span="24">
              <el-form-item label="领取时间:" label-width="100px" prop="value1">
                <!-- <el-input type="text" v-model.number="operation_form.where_start_time" placeholder="开始时间"></el-input>
                <el-input type="text" v-model.number="operation_form.where_end_time" placeholder="结束时间"></el-input> -->
                <el-date-picker v-model="operation_form.value1" type="datetimerange" align="center"
                  value-format="timestamp" unlink-panels range-separator="至" start-placeholder="开始日期"
                  end-placeholder="结束日期" :picker-options="picker_options" style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="operation_form.type==4">
            <el-col :span="24">

              <el-form-item label="亏损时间范围:" label-width="100px" prop="value1">
                <el-date-picker v-model="operation_form.value2" type="datetimerange" align="center"
                  value-format="timestamp" unlink-panels range-separator="至" start-placeholder="开始日期"
                  end-placeholder="结束日期" :picker-options="picker_options" style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="operation_form.type==6">
            <el-col :span="24">
              <el-form-item label="充值金额:" label-width="100px" prop="where_value">
                <el-input type="number" v-model.number="operation_form.where_value" placeholder="【条件】充值金额"></el-input>
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
    ttGet,
    ttPost
  } from "@/utils/util.js";
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
          cdk: '',
          total: '',
          send_type: '',
          num: '',
          type: '',
          ks_type: '',
          value1: [],
          value: [],
        },
        picker_options: {
          shortcuts: [{
            text: '当天',
            onClick(picker) {
              const start = new Date().setHours(0, 0, 0, 0);
              const end = new Date().setHours(23, 59, 59, 999);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '本周',
            onClick(picker) {
              const start = new Date(new Date().toLocaleDateString()).getTime() - (new Date()
                .getDay() - 1) * 24 * 60 * 60 * 1000;
              const end = start + (7 * 24 * 60 * 60 - 1) * 1000;
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '本月',
            onClick(picker) {
              const start = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();
              const end = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
                .getTime() + 24 * 60 * 60 * 1000 - 1;
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        operation_rule: {
          name: [{
            required: true,
            message: "请输入cdk名称",
            trigger: "blur"
          }],
          cdk: [{
            required: true,
            message: "请输入cdk",
            trigger: "blur"
          }],
          total: [{
              required: true,
              message: "请输入发送总额",
              trigger: "blur"
            },
            {
              type: 'number',
              message: '发送总额必须为数字'
            }
          ],
          send_type: [{
            required: true,
            message: "请选择发放类型",
            trigger: "change"
          }],
          type: [{
            required: true,
            message: "请选择领取条件",
            trigger: "change"
          }],
          ks_type: [{
            required: true,
            message: "请选择领取条件，1或者2",
            trigger: "change"
          }],
          num: [{
              required: true,
              message: "请输入领取金额",
              trigger: "blur"
            },
            {
              type: 'number',
              message: '领取金额必须为数字'
            }
          ],
        },
      };
    },
    mounted() {
      this.get_cdk();
    },
    methods: {
      //获取cdk
      get_cdk() {
        let page_info = this.page_info;
        let query = this.query;
        ttGet("/admin.php/activity/get_cdk", {
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

      //分页切换
      currentChange(page) {
        this.page_info.page = page;
        this.loading = true;
        this.get_cdk();
      },

      //条数切换
      sizeChange(limit) {
        this.page_info.page = 1;
        this.page_info.limit = limit;
        this.loading = true;
        this.get_cdk();
      },

      //条件搜索
      search() {
        this.page_info.page = 1;
        this.loading = true;
        this.get_cdk();
      },

      //重置条件
      reset() {
        this.page_info.page = 1;
        this.query = {};
        this.loading = true;
        this.get_cdk();
      },

      //添加
      add: function() {
        this.operation_form = {
          name: '',
          cdk: '',
          total: '',
          send_type: '',
          num: '',
          type: 1,
          ks_type: '',
          value1: [],

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
        ttGet("/admin.php/activity/get_cdk_details", {
          id: operation_row.id
        }, (res) => {
          loading.close();
          if (res.code == 200) {
            // console.log(res.data.cdk.value1);return false;
            this.operation_form = res.data.cdk;
            this.operation_form.total = Number(res.data.cdk.total);
            this.operation_form.num = Number(res.data.cdk.num);
            this.$set(this.operation_form, "value1", [Number(res.data.cdk.where_start_time * 1000),
              Number(res.data.cdk.where_end_time * 1000)
            ]);
            this.$set(this.operation_form, "value2", [Number(res.data.cdk.ks_start_time * 1000),
              Number(res.data.cdk.ks_end_time * 1000)
            ]);
            // this.operation_form.value1.push(res.data.cdk.value2);
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
            ttPost("/admin.php/activity/cdk_add", {
              name: operation_form.name,
              cdk: operation_form.cdk,
              total: operation_form.total,
              send_type: operation_form.send_type,
              num: operation_form.num,
              type: operation_form.type,
              ks_type: operation_form.ks_type,
              where_value: operation_form.where_value,
              value1: operation_form.value1,
              value2: operation_form.value2,
            }, (res) => {
              loading.close();
              if (res.code == 200) {
                this.page_info.page = 1;
                this.get_cdk();
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
            ttPost("/admin.php/activity/cdk_edit", {
              id: operation_row.id,
              name: operation_form.name,
              cdk: operation_form.cdk,
              total: operation_form.total,
              send_type: operation_form.send_type,
              num: operation_form.num,
              type: operation_form.type,
              ks_type: operation_form.ks_type,
              where_value: operation_form.where_value,
              value1: operation_form.value1,
              value2: operation_form.value2,
            }, (res) => {
              loading.close();
              if (res.code == 200) {
                this.get_cdk();
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
          ttPost("/admin.php/activity/cdk_del", {
            id: operation_row.id,
          }, (res) => {
            loading.close();
            if (res.code == 200) {
              if (this.page_info.page > 1 && this.data.length == 1) this.page_info.page -= 1;
              this.get_cdk();
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

      //随机生成
      random() {
        let seed = "qwertyuiopasdfghjklzxcvbnm1234567890";
        let cdk = '';
        for (let i = 20; i > 0; i--) {
          cdk += seed[Math.floor(Math.random() * seed.length)];
        }
        this.operation_form.cdk = cdk;
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>