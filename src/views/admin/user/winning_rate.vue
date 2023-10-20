<template>
  <div style="height: 100%;width: 100%;background-color: #FFFFFF;overflow: hidden;">
    <div style="background-color: #FFFFFF;height: 100%;overflow: hidden;">
      <div style="margin: 20px 10px 0 10px;">
        <el-form>
          <el-row>
            <el-col :span="4">
              <el-form-item label="名称:" label-width="80px">
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
        <div style="margin-left: 10px;line-height: 36px;font-size: 14px;font-weight: bold;">
          <span style="color: #f23e3e;">新用户默认等级为Level 1</span>
        </div>
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
              prop="name"
              label="名称"
              min-width="100">
            </el-table-column>
            <el-table-column
              align="center"
              prop="where1"
              label="充值条件">
              <template slot-scope="d">
               ￥  {{ d.row.where1 }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="profitable"
              label="可盈利上限">
              <template slot-scope="d">
                {{ d.row.profitable }}%
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="profitable"
              label="可盈利额度">
              <template slot-scope="d">
                {{ d.row.total_profitable }}%
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="profitable"
              label="超额概率">
              <template slot-scope="d">
                {{ d.row.exceed_rate }}%
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="profitable"
              label="亏损超过">
              <template slot-scope="d">
                {{ d.row.loss_exceed }}%
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
              <el-form-item label="等级:" label-width="100px" prop="level">
                <el-input type="number" v-model.number="operation_form.level" placeholder="等级"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="名称:" label-width="100px" prop="name">
                <el-input v-model="operation_form.name" placeholder="名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="充值条件:" label-width="100px" prop="where1">
                <el-input type="number" v-model.number="operation_form.where1" placeholder="充值条件"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="盈利:" label-width="100px" prop="profit_rate">

                <el-button type="primary" size="mini" @click="set">点击设置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="可盈利上限:" label-width="100px" prop="profitable">
                <el-input type="number" v-model.number="operation_form.profitable" placeholder="可盈亏上限(%)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="可盈利额度:" label-width="100px" prop="profitable">
                <el-input type="number" v-model.number="operation_form.total_profitable" placeholder="可盈亏额度(%)"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="超额概率:" label-width="100px" prop="exceed_rate">
                <el-input type="number" v-model.number="operation_form.exceed_rate" placeholder="超额概率(%)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="亏损超过:" label-width="100px" prop="loss_exceed">
                <el-input type="number" v-model.number="operation_form.loss_exceed" placeholder="亏损超过(%)"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div style="margin-left: 100px;margin-top: -8px;">
                <div>1.当用户等级为1级时充值则改变进入对应</div>
                <div>2.盈利代表开启某个箱子时盈利饰品的概率, 可填写负数降低</div>
                <div>3.可盈利上限代表用户在该最高可赚百分比</div>
                <div>4.可盈利额度代表用户在该可盈利的总额度, 该额度使用完则开始下分</div>
                <div>5.超额概率指的是超过盈利额度后在出货的基础上再增加一个小概率</div>
                <div>6.当用户在该亏损超过填写的百分比, 则注销该回到1级</div>
              </div>
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
    <el-dialog
      title="设置对应"
      append-to-body
      :visible.sync="set_page"
      width="50%">
      <div style="margin: 0 20px;">
        <div>
          <el-col :span="24">
            <span style="width: 150px;display: inline-block;">一键设置:</span>
            <el-input type="number" v-model.number="profit_rate" placeholder="提升(%)" style="width: 150px;"></el-input>
            <el-button type="primary" @click="set_batch">确定</el-button>
          </el-col>
        </div>
        <div v-for="(item, index) in box">
          <el-col :span="12">
            <span style="width: 150px;display: inline-block;">{{ item.name }}:</span>
            <el-input type="number" v-model.number="item.profit_rate" placeholder="提升(%)" style="width: 150px;"></el-input>
          </el-col>
        </div>
      </div>
      <div style="text-align: center;">
        <el-button type="primary" @click="set_close">保存</el-button>
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
          name: '',
          where1: '',
          // profit_rate: '',
          profitable: '',
          total_profitable: '',
          exceed_rate: '',
          loss_exceed: '',
        },
        operation_rule: {
          level: [
            {required: true, message: "请输等级", trigger: "blur"},
            { type: 'number', message: '等级必须为数字'}
          ],
          name: [
            {required: true, message: "请输入名称", trigger: "blur"}
          ],
          where1: [
            {required: true, message: "请输入充值条件", trigger: "blur"},
            { type: 'number', message: '充值条件必须为数字'}
          ],

          profitable: [
            {required: true, message: "请输入可盈利上限", trigger: "blur"},
            { type: 'number', message: '可盈利上限必须为数字'}
          ],
          total_profitable: [
            {required: true, message: "请输入可盈利额度", trigger: "blur"},
            { type: 'number', message: '可盈利额度必须为数字'}
          ],
          exceed_rate: [
            {required: true, message: "请输入超额概率", trigger: "blur"},
            { type: 'number', message: '超额概率必须为数字'}
          ],
          loss_exceed: [
            {required: true, message: "请输入亏损超过", trigger: "blur"},
            { type: 'number', message: '亏损超过必须为数字'}
          ],
        },
        box: [],
        profit_rate: '',
        set_page: false,
      };
    },
    mounted() {
      this.get_winning_rate();
    },
    methods: {
      //获取等级
      get_winning_rate() {
        let page_info = this.page_info;
        let query = this.query;
        ttGet("/admin.php/user/get_winning_rate", {
          page: page_info.page,
          limit: page_info.limit,
          name: query.name,
        }, (res) => {
          this.loading = false;
          if (res.code == 200) {
            this.data = res.data.data.data;
            this.page_info.total = res.data.data.count;
            let height = 50 + 50 * (res.data.data.data.length ? res.data.data.data.length : 1);
            this.$refs.table.$el.style.height = height + 'px';
            this.box = res.data.box.map((item) => {
              item.profit_rate = '';
              return item;
            });
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
        this.get_winning_rate();
      },

      //条数切换
      sizeChange(limit) {
        this.page_info.page = 1;
        this.page_info.limit = limit;
        this.loading = true;
        this.get_winning_rate();
      },

      //条件搜索
      search() {
        this.page_info.page = 1;
        this.loading = true;
        this.get_winning_rate();
      },

      //重置条件
      reset() {
        this.page_info.page = 1;
        this.query = {};
        this.loading = true;
        this.get_winning_rate();
      },

      //添加
      add: function () {
        this.operation_form = {
          level: '',
          name: '',
          where1: '',
          // profit_rate: '',
          profitable: '',
          total_profitable: '',
          exceed_rate: '',
          loss_exceed: '',
        };
        this.box.map((item) => {
          item.profit_rate = '';
          return item;
        });
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
        ttGet("/admin.php/user/get_winning_rate_details", {id: operation_row.id}, (res) => {
          loading.close();
          if (res.code == 200) {
            this.operation_form = res.data.winning_rate;
            this.operation_form.where1 = Number(res.data.winning_rate.where1);
            this.operation_form.profitable = Number(res.data.winning_rate.profitable);
            this.operation_form.total_profitable = Number(res.data.winning_rate.total_profitable);
            this.operation_form.exceed_rate = Number(res.data.winning_rate.exceed_rate);
            this.operation_form.loss_exceed = Number(res.data.winning_rate.loss_exceed);
            this.operation_title = '编辑';
            this.operation_type = 'edit';
            this.operation_page = true;
            this.operation_index = operation_index;
            this.operation_row = operation_row;
            let profit_rate = res.data.profit_rate;
            this.box.map((item) => {
              item.profit_rate = 0;
              for (let x in profit_rate){
                if (profit_rate[x].id == item.id){
                  item.profit_rate = profit_rate[x].profit_rate;
                  break;
                }
              }
              return item;
            });
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
            ttPost("/admin.php/user/winning_rate_add", {
              level: operation_form.level,
              name: operation_form.name,
              where1: operation_form.where1,
              // profit_rate: operation_form.profit_rate,
              profitable: operation_form.profitable,
              total_profitable: operation_form.total_profitable,
              exceed_rate: operation_form.exceed_rate,
              loss_exceed: operation_form.loss_exceed,
              box: this.box,
            }, (res) => {
              loading.close();
              if (res.code == 200) {
                this.page_info.page = 1;
                this.get_winning_rate();
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
            ttPost("/admin.php/user/winning_rate_edit", {
              id: operation_row.id,
              level: operation_form.level,
              name: operation_form.name,
              where1: operation_form.where1,
              // profit_rate: operation_form.profit_rate,
              profitable: operation_form.profitable,
              total_profitable: operation_form.total_profitable,
              exceed_rate: operation_form.exceed_rate,
              loss_exceed: operation_form.loss_exceed,
              box: this.box,
            }, (res) => {
              loading.close();
              if (res.code == 200) {
                this.get_winning_rate();
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
          ttPost("/admin.php/user/winning_rate_del", {
            id: operation_row.id,
          }, (res) => {
            loading.close();
            if (res.code == 200) {
              if (this.page_info.page > 1 && this.data.length == 1) this.page_info.page -= 1;
              this.get_winning_rate();
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

      //设置
      set() {
        this.set_page = true;
      },

      //保存
      set_close() {
        this.set_page = false;
      },

      //一键设置
      set_batch() {
        let profit_rate = this.profit_rate;
        this.box.map((item) => {
          item.profit_rate = profit_rate;
          return item;
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
