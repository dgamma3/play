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
              <el-form-item label="商家单号:" label-width="80px">
                <el-input v-model="query.orderId" placeholder="请输入商家单号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="饰品状态:" label-width="80px">
                <el-select clearable v-model="query.status" placeholder="请选择">
                  <el-option
                    label="待领取"
                    :value="0">
                  </el-option>
                  <el-option
                    label="已兑换"
                    :value="1">
                  </el-option>
                  <el-option
                    label="待发货"
                    :value="2">
                  </el-option>
                  <el-option
                    label="已报价"
                    :value="3">
                  </el-option>
                  <el-option
                    label="已收货"
                    :value="4">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="用户类型:" label-width="80px">
                <el-select clearable v-model="query.user_type" placeholder="请选择">
                  <el-option
                    label="普通用户"
                    :value="1">
                  </el-option>
                  <el-option
                    label="主播"
                    :value="2">
                  </el-option>
                  <el-option
                    label="推广"
                    :value="3">
                  </el-option>
                  <el-option
                    label="机器人"
                    :value="4">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="获取类型:" label-width="80px">
                <el-select clearable v-model="query.type" placeholder="请选择">
                  <el-option
                    label="开箱"
                    :value="1">
                  </el-option>
                  <el-option
                    label="对战"
                    :value="2">
                  </el-option>
                  <el-option
                    label="百分比"
                    :value="3">
                  </el-option>
                  <el-option
                    label="Roll房"
                    :value="4">
                  </el-option>
                  <el-option
                    label="商城"
                    :value="5">
                  </el-option>
                  <el-option
                    label="赠送"
                    :value="6">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="对战用户ID:" label-width="100px">
                <el-input v-model="query.battle_uid" placeholder="请输入对战用户ID"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="对战编号:" label-width="80px">
                <el-input v-model="query.battle_order" placeholder="请输入对战编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="中奖时间:" label-width="80px">
                <el-date-picker
                  v-model="query.time"
                  type="datetimerange"
                  align="left"
                  value-format="timestamp"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="picker_options"
                  style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="提取时间:" label-width="80px">
                <el-date-picker
                  v-model="query.ti_time"
                  type="datetimerange"
                  align="center"
                  value-format="timestamp"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="picker_options"
                  style="width: 100%">
                </el-date-picker>
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
              prop="info"
              label="用户信息"
              min-width="120"
              show-overflow-tooltip>
              <template slot-scope="d">
                <div style="display: flex;">
                  <img :src="repair(d.row.user.portrait)" style="width: 50px;height: 50px;cursor: pointer;" alt="">
                  <div style="margin-left: 15px;text-align: left;">
                    <div>
                      {{ d.row.user.name ? d.row.user.name : d.row.user.email }}(ID:{{ d.row.user.id }})
                      <template v-if="d.row.user.type == 2">
                        <el-tag size="mini">主播</el-tag>
                      </template>
                      <template v-else-if="d.row.user.type == 3">
                        <el-tag size="mini">推广</el-tag>
                      </template>
                      <template v-else-if="d.row.user.type == 4">
                        <el-tag size="mini">官方机器人</el-tag>
                      </template>
                    </div>
                    <div>steamid: {{ d.row.user.steamid ? d.row.user.steamid : '-' }}</div>
                    <div><a :href="d.row.transaction_link" target="_blank">交易链接: {{ d.row.transaction_link }}</a></div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              prop="info2"
              label="获取方式"
              min-width="80"
              show-overflow-tooltip>
              <template slot-scope="d">
                <template v-if="d.row.type == 1">
                  <div style="display: flex;">
                    <img :src="img_url + d.row.box.img" style="width: 50px;height: 50px;cursor: pointer;" alt="">
                    <div style="margin-left: 15px;text-align: left;">
                      <div>{{ d.row.box.name }}</div>
                      <div>￥ {{ d.row.box.price }}</div>
                    </div>
                  </div>
                </template>
                <template v-if="d.row.type == 2">
                  <div>对战编号: {{ d.row.box2.order }}</div>
                  <div>
                    房间模式:
                    <template v-if="d.row.box2.value2 == 2">
                      双人模式
                    </template>
                    <template v-else-if="d.row.box2.value2 == 3">
                      三人模式
                    </template>
                    <template v-else-if="d.row.box2.value2 == 4">
                      四人模式
                    </template>
                  </div>
                  <div>
                    房间类型:
                    <template v-if="!d.row.box2.value1">
                      公开
                    </template>
                    <template v-else>
                      私人
                    </template>
                  </div>
                </template>
                <template v-if="d.row.type == 3">
                  <div style="display: flex;">
                    <img :src="img_url + d.row.box3.img" style="width: 50px;height: 50px;cursor: pointer;" alt="">
                    <div style="margin-left: 15px;text-align: left;">
                      <div>{{ d.row.box3.name }}</div>
                      <div v-if="d.row.box3.appid == 730">{{ abrasion(d.row.box3.abrasion) }}{{ quality(d.row.box3.quality, 3) }}</div>
                      <div v-else>{{ quality2(d.row.box3.quality2) }}</div>
                      <div>￥ {{d.row.box3.open_price}}(￥ {{d.row.open_price}}, {{d.row.probability}}%)</div>
                    </div>
                  </div>
                </template>
                <template v-if="d.row.type == 4">
                  <div>Roll房中奖</div>
                </template>
                <template v-if="d.row.type == 5">
                  <div>商城兑换</div>
                </template>
                <template v-if="d.row.type == 6">
                  <div>饰品赠送</div>
                </template>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="info3"
              label="中奖饰品"
              min-width="80"
              show-overflow-tooltip>
              <template slot-scope="d">
                <div style="display: flex;">
                  <img :src="img_url + d.row.ornaments.img" style="width: 50px;height: 50px;cursor: pointer;" alt="">
                  <div style="margin-left: 15px;text-align: left;">
                    <div>{{ d.row.ornaments.name }}</div>
                    <div v-if="d.row.ornaments.appid == 730">{{ abrasion(d.row.ornaments.abrasion) }}{{ quality(d.row.ornaments.quality, 3) }}</div>
                    <div v-else>{{ quality2(d.row.ornaments.quality2) }}</div>
                    <div>￥ {{d.row.price}}</div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              prop="status"
              label="状态"
              min-width="60"
              show-overflow-tooltip>
              <template slot-scope="d">
                <div>
                  饰品状态:
                  <template v-if="d.row.status == 0"><el-tag size="mini" type="warning">待领取</el-tag></template>
                  <template v-else-if="d.row.status == 1"><el-tag size="mini" type="info">已兑换</el-tag></template>
                  <template v-else-if="d.row.status == 2"><el-tag size="mini" type="success">待发货</el-tag></template>
                  <template v-else-if="d.row.status == 3"><el-tag size="mini" type="danger">已报价</el-tag></template>
                  <template v-else-if="d.row.status == 4"><el-tag size="mini">已收货</el-tag></template>
                </div>
                <div>报价单号: {{d.ti_order}}</div>
                <div>商家单号: {{d.row.orderId}}</div>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              prop="time"
              label="时间"
              min-width="60"
              show-overflow-tooltip>
              <template slot-scope="d">
                <div>中奖时间: {{d.row.time}}</div>
                <div>兑换时间: {{d.row.exchange_time}}</div>
                <div>提取时间: {{d.row.ti_time}}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="d">
                <template v-if="d.row.status == 0">
                  <el-button
                    size="mini"
                    type="danger"
                    @click.stop="del(d.$index, d.row)">删除
                  </el-button>
                </template>
                <template v-else-if="d.row.status == 2">
                  <el-button
                    size="mini"
                    type="primary"
                    @click.stop="send(d.$index, d.row)">发送报价
                  </el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click.stop="del(d.$index, d.row)">删除
                  </el-button>
                </template>
                <template v-else-if="d.row.status == 3">
                  <el-button
                    size="mini"
                    type="primary"
                    @click.stop="query_status(d.$index, d.row)">查询状态
                  </el-button>
                </template>
                <template v-else-if="d.row.status == 4">
                  <el-button
                    size="mini"
                    type="primary"
                    @click.stop="query_status(d.$index, d.row)">查询状态
                  </el-button>
                </template>
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
      title="发货按钮,仅可点击一次.网络延迟画面"
      append-to-body
      :visible.sync="operation_page"
      width="45%">
      <div style="display: flex;">
        <div style="width: 65%;border-right: 1px dashed #c0c0c0;">
          <div style="margin: 0 20px;">
            <el-form
              ref="operation_form"
              :rules="operation_rule"
              :model="operation_form">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="发货模式:" label-width="100px" prop="abrasion">
                    <el-radio v-model="operation_form.type" :label="2">自动发货</el-radio>
                    <el-radio v-model="operation_form.type" :label="1">人工发货</el-radio>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="报价金额:" label-width="100px" prop="price">
                    <el-input type="number" v-model.number="operation_form.price"
                              placeholder="报价金额"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div style="text-align: center;">

            <el-button type="primary" @click="send_submit(1)">发货</el-button>
            <el-button @click="send_submit(2)">缺货</el-button>
            <el-button @click="send_submit(3)">交易链接错误</el-button>
            <el-button @click="send_submit(4)">折现</el-button>
          </div>
        </div>
        <div style="width: 35%;padding-left: 10px;">
          <div>
            ZBT十条底价数据↓
          </div>
          <div v-for="(item, index) in floor_price">
            {{ index + 1 }}. $ {{ item.price }}, ¥ {{ item.cn_price }}, {{ item.delivery == 1 ? '人工发货' : '自动发货' }}
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {ttGet, ttPost, repair, abrasion, quality, quality2} from "@/utils/util.js";

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
        operation_page: false,
        operation_index: '',
        operation_row: {},
        operation_form: {
          type: 2,
          price: '',
        },
        operation_rule: {
          type: [
            {required: true, message: "请选择发货模式", trigger: "change"}
          ],
          price: [
            {required: true, message: "请输入报价金额", trigger: "blur"},
            {type: 'number', message: '报价金额必须为数字'}
          ],
        },
        picker_options: {
          shortcuts: [{
            text: '当天',
            onClick(picker) {
              const start = new Date().setHours(0, 0, 0, 0);
              const end = new Date().setHours(23,59,59,999);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '本周',
            onClick(picker) {
              const start = new Date(new Date().toLocaleDateString()).getTime() - (new Date().getDay() - 1) * 24 * 60 * 60 * 1000;
              const end = start + (7 * 24 * 60 * 60 - 1) * 1000;
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '本月',
            onClick(picker) {
              const start = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();
              const end = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getTime() + 24 * 60 * 60 * 1000 - 1;
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        floor_price: [],
      };
    },
    mounted() {
      this.get_ornaments_record();
    },
    methods: {
      repair, abrasion, quality, quality2,

      //获取饰品记录
      get_ornaments_record() {
        let page_info = this.page_info;
        let query = this.query;
        ttGet("/admin.php/record/get_ornaments_record", {
          page: page_info.page,
          limit: page_info.limit,
          info: query.info,
          orderId: query.orderId,
          status: query.status,
          user_type: query.user_type,
          type: query.type,
          battle_uid: query.battle_uid,
          battle_order: query.battle_order,
          time: query.time,
          ti_time: query.ti_time,
        }, (res) => {
          this.loading = false;
          if (res.code == 200) {
            this.data = res.data.data.data;
            this.page_info.total = res.data.data.count;
            let height = 50 + 80 * (res.data.data.data.length ? res.data.data.data.length : 1);
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
        this.get_ornaments_record();
      },

      //条数切换
      sizeChange(limit) {
        this.page_info.page = 1;
        this.page_info.limit = limit;
        this.loading = true;
        this.get_ornaments_record();
      },

      //条件搜索
      search() {
        this.page_info.page = 1;
        this.loading = true;
        this.get_ornaments_record();
      },

      //重置条件
      reset() {
        this.page_info.page = 1;
        this.query = {};
        this.loading = true;
        this.get_ornaments_record();
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
          ttPost("/admin.php/record/ornaments_record_del", {
            id: operation_row.id,
            uid: operation_row.uid,
          }, (res) => {
            loading.close();
            if (res.code == 200) {
              if (this.page_info.page > 1 && this.data.length == 1) this.page_info.page -= 1;
              this.get_ornaments_record();
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

      //查询状态
      query_status(operation_index, operation_row) {
        let loading = this.$loading({
          text: '查询中',
          spinner: "el-icon-loading"
        });
        ttPost("/admin.php/record/ornaments_record_status", {
          id: operation_row.id,
          uid: operation_row.uid,
        }, (res) => {
          loading.close();
          if (res.code == 200) {
            this.get_ornaments_record();
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

      //发送报价
      send(operation_index, operation_row) {
        let loading = this.$loading({
          text: '加载中，请勿刷新页面',
          spinner: "el-icon-loading"
        });
        ttGet("/admin.php/record/get_ornaments_floor_price", {
          oid: operation_row.oid,
        }, (res) => {
          loading.close();
          if (res.code == 200) {
            this.operation_form.type = 2;
            this.operation_form.price = Number(operation_row.price);
            this.operation_page = true;
            this.operation_index = operation_index;
            this.operation_row = operation_row;
            this.floor_price = res.data.list;
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

      //发送报价
      send_submit(send_type) {
        this.$refs.operation_form.validate(valid => {
          if (valid) {
            let operation_index = this.operation_index;
            let operation_row = this.operation_row;
            let operation_form = this.operation_form;
            let loading = this.$loading({
              text: '提交中，切勿刷新页面，否则会有多发饰品的情况发生',
              spinner: "el-icon-loading"
            });
            ttPost("/admin.php/record/ornaments_record_send", {
              send_type: send_type,
              id: operation_row.id,
              uid: operation_row.uid,
              type: operation_form.type,
              price: operation_form.price,
            }, (res) => {
              loading.close();
              if (res.code == 200) {
                this.get_ornaments_record();
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
