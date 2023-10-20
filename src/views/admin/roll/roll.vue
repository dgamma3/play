<template>
  <div style="height: 100%;width: 100%;background-color: #FFFFFF;overflow: hidden;">
    <div style="background-color: #FFFFFF;height: 100%;overflow: hidden;">
      <div style="margin: 20px 10px 0 10px;">
        <el-form>
          <el-row>
            <el-col :span="5">
              <el-form-item label="Roll房名称:" label-width="120px">
                <el-input v-model="query.name" placeholder="请输入Roll名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="所属人:" label-width="120px">
                <el-select clearable filterable v-model="query.spread_id" placeholder="可输入搜索">
                  <el-option
                    v-for="(item, index) in user_spread"
                    :label="item.name"
                    :value="item.id"
                    :key="index"
                    >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="是否显示:" label-width="80px">
                <el-select clearable v-model="query.status" placeholder="请选择">
                  <el-option
                    label="开启"
                    :value="1">
                  </el-option>
                  <el-option
                    label="关闭"
                    :value="0">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="是否结束:" label-width="80px">
                <el-select clearable v-model="query.end_status" placeholder="请选择">
                  <el-option
                    label="未结束"
                    :value="1">
                  </el-option>
                  <el-option
                    label="已结束"
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
        <div style="margin-left: 10px;line-height: 36px;font-size: 14px;font-weight: bold;">
          Roll房自动开奖定时任务链接: <span style="color: #f23e3e;">{{server_url}}/common.php/call_back/roll_open</span>
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
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="Roll房信息"
              min-width="160"
              show-overflow-tooltip>
              <template slot-scope="d">
                <div style="display: flex;">



                  <template v-if="d.row.spread_id>0">
                      <img :src="repair(d.row.portrait)" style="width: 50px;height: 50px;cursor: pointer;" alt="">
                  </template>
                  <template v-else>
                    <img :src="repair(d.row.portrait)" style="width: 50px;height: 50px;cursor: pointer;" alt="">
                  </template>

                  <div style="margin-left: 15px;text-align: left;">
                    <div>Roll房ID: {{ d.row.id }}</div>
                    <div>Roll房名称: {{ d.row.name }}</div>
                    <div class="flex">
                      <div>总价值: ￥ {{ d.row.total }}</div>
                      <div style="margin-left: 10px;">参与人数: {{ d.row.num }}</div>
                    </div>
                    <div>时间: {{ d.row.start_time }} ~ {{ d.row.end_time }}</div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="flow"
              label="Roll房条件"
              min-width="150">
              <template slot-scope="d">
                <div style="text-align: left;">
                  <div>所属人: {{ d.row.user_name }}</div>
                  <div>加入流水: ￥ {{ d.row.flow }}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="status"
              label="状态">
              <template slot-scope="d">
                <div style="text-align: left;">
                  <div>
                    显示状态:
                    <template v-if="d.row.status == 1">
                      <el-tag size="mini">开启</el-tag>
                    </template>
                    <template v-else>
                      <el-tag size="mini" type="danger">关闭</el-tag>
                    </template>
                  </div>
                  <div>
                    结束状态:
                    <template v-if="d.row.end_status == 0">
                      <el-tag size="mini">未结束</el-tag>
                    </template>
                    <template v-else-if="d.row.end_status == 1">
                      <el-tag size="mini" type="danger">已结束</el-tag>
                    </template>
                    <template v-else-if="d.row.end_status == 2">
                      <el-tag size="mini" type="danger">开启失败</el-tag>
                    </template>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="150">
              <template slot-scope="d">
<!--                <el-button-->
<!--                  size="mini"-->
<!--                  type="primary"-->
<!--                  @click.stop="open(d.$index, d.row)"-->
<!--                  v-if="d.row.end_status == 0">手动开启-->
<!--                </el-button>-->
                <el-button
                  size="mini"
                  type="primary"
                  @click.stop="roll_copy(d.$index, d.row)">复制
                </el-button>
                <el-button
                  size="mini"
                  type="primary"
                  @click.stop="roll_ornaments_edit(d.$index, d.row)">饰品
                </el-button>
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
              <el-form-item label="Roll房名称:" label-width="100px" prop="name">
                <el-input v-model="operation_form.name" placeholder="Roll房名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="充值时间:" label-width="120px" prop="cztime">
                <el-date-picker
                  v-model="operation_form.cztime"
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
            <el-col :span="24">
              <el-form-item label="活动时间:" label-width="120px" prop="time">
                <el-date-picker
                  v-model="operation_form.time"
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
            <el-col :span="12">
              <el-form-item label="所属人:" label-width="120px" prop="spread_id">
                <el-select clearable filterable v-model="operation_form.spread_id" placeholder="可输入搜索">
                  <el-option
                    v-for="(item, index) in user_spread"
                    :label="item.name"
                    :value="item.id"
                    :key="index"
                    >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="加入流水:" label-width="100px" prop="flow">
                <el-input type="number" v-model.number="operation_form.flow" placeholder="加入流水"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="显示状态:" label-width="100px" prop="status">
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
    <el-dialog
      title="Roll房饰品"
      append-to-body
      :visible.sync="operation_page2"
      width="60%">
      <div style="margin: 0 20px;">
        <el-card class="box-card" style="margin-bottom: 20px;">
          <div slot="header" class="clearfix">
            <span>Roll房饰品</span>
            <el-button style="float: right; padding: 3px 0" type="text">总价格: ￥ {{price_total}}</el-button>
          </div>
          <div class="flex flex-wrap">
            <div :class="'o-list ' + color(item.color, 3)" v-for="(item, index) in roll_ornaments"
                    :key="index"
                    >
              <div class="o-item" @click="cancel_ornaments(index)">
                <div class="o-body">
                  <svg class="o-bg" viewBox="0 0 87 107">
                    <path d="M83.1 107.3l-61.8-74L87.3 0l-4.2 107.3z" fill-opacity=".04"></path>
                    <path d="M67.7 70.1l-57.5 32.6 11.3-61.3 46.2 28.7z" fill-opacity=".13"></path>
                    <path d="M67.3 63.5L27 74.5l14.3-37.4 26 26.4z" fill-opacity=".02"></path>
                    <path d="M85.5 79.1L51 106.6l29.6-37.4 4.9 9.9z" fill-opacity=".2"></path>
                    <path d="M19.6 72.9L0 52.9l24.1 2-4.5 18z" fill-opacity=".07"></path>
                  </svg>
                  <img class="o-img" :src="img_url + item.img" alt="">
                </div>
                <div class="o-name">{{item.name}}</div>
                <div class="o-abrasion" v-if="item.appid == 730">{{ abrasion(item.abrasion) }}, {{ quality(item.quality) }}
                </div>
                <div class="o-abrasion" v-else>{{ quality2(item.quality2) }}</div>
                <div class="o-price">￥ {{item.open_price}}</div>
                <el-select class="probability" clearable filterable v-model="item.uid" placeholder="指定中奖人">
                    <el-option
                      v-for="(roll_user_item, roll_user_index) in roll_user"
                      :label="roll_user_item.name"
                      :value="roll_user_item.id"
                      v-if="roll_user_item.roll_ornaments_id == 0 || roll_user_item.roll_ornaments_id == item.id"
                    :key="roll_user_index"
                    >
                      <span v-if="roll_user_item.type == 4">
                       <i class="el-icon-coordinate"></i>
                      </span>
                      <span>{{ roll_user_item.name }}</span>
                    </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div v-if="roll_ornaments.length == 0" style="text-align: center;">暂无数据</div>
        </el-card>
        <el-card class="box-card search-card" style="margin-bottom: 20px;">
          <div slot="header" class="clearfix" style="padding-top: 20px;">
            <el-form>
              <el-row>
                <el-col :span="4">
                  <el-form-item label-width="10px">
                    <el-input v-model="query2.name" placeholder="请输入饰品名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label-width="10px">
                    <el-input v-model="query2.marketHashName" placeholder="请输入官方名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label-width="10px">
                    <el-select clearable v-model="query2.abrasion" placeholder="请选择磨损">
                      <el-option
                        label="崭新出厂"
                        :value="1">
                      </el-option>
                      <el-option
                        label="略有磨损"
                        :value="2">
                      </el-option>
                      <el-option
                        label="久经沙场"
                        :value="3">
                      </el-option>
                      <el-option
                        label="破损不堪"
                        :value="4">
                      </el-option>
                      <el-option
                        label="战痕累累"
                        :value="5">
                      </el-option>
                      <el-option
                        label="无涂装"
                        :value="6">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label-width="10px">
                    <el-select clearable v-model="query2.quality" placeholder="请选择类别">
                      <el-option
                        label="普通"
                        :value="1">
                      </el-option>
                      <el-option
                        label="StatTrak™"
                        :value="2">
                      </el-option>
                      <el-option
                        label="纪念品"
                        :value="3">
                      </el-option>
                      <el-option
                        label="★"
                        :value="4">
                      </el-option>
                      <el-option
                        label="★ StatTrak™"
                        :value="5">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label-width="20px">
                    <el-select clearable filterable v-model="query2.cid" placeholder="可输入搜索分类">
                      <el-option
                        v-for="(item, index) in ornaments_class"
                        :label="item.name"
                        :value="item.id"
                    :key="index"
                    >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label-width="10px">
                    <el-select clearable v-model="query2.sort" placeholder="请选择排序">
                      <el-option
                        label="开启价格升序"
                        :value="1">
                      </el-option>
                      <el-option
                        label="开启价格降序"
                        :value="2">
                      </el-option>
                      <el-option
                        label="购买价格升序"
                        :value="3">
                      </el-option>
                      <el-option
                        label="购买价格降序"
                        :value="4">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label-width="10px">
                    <el-select clearable v-model="query2.status" placeholder="请选择商城开关">
                      <el-option
                        label="开启"
                        :value="1">
                      </el-option>
                      <el-option
                        label="关闭"
                        :value="0">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label-width="10px">
                    <el-select clearable v-model="query2.status2" placeholder="请选择幸运开箱开关">
                      <el-option
                        label="开启"
                        :value="1">
                      </el-option>
                      <el-option
                        label="关闭"
                        :value="0">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label-width="10px">
                    <div style="display: flex;">
                      <el-input v-model="query2.price_min" placeholder="最小开启价格"></el-input>
                      <div style="margin: 0 10px;">-</div>
                      <el-input v-model="query2.price_max" placeholder="最大开启价格"></el-input>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label-width="10px">
                    <div style="display: flex;">
                      <el-input v-model="query2.price_min2" placeholder="最小购买价格"></el-input>
                      <div style="margin: 0 10px;">-</div>
                      <el-input v-model="query2.price_max2" placeholder="最大购买价格"></el-input>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label-width="10px">
                    <el-button
                      size="medium"
                      type="primary"
                      icon="el-icon-search"
                      @click="ornaments_select">
                    </el-button>
                    <el-button
                      size="medium"
                      icon="el-icon-delete"
                      @click="ornaments_reset">
                    </el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="flex flex-wrap">
            <div :class="'o-list ' + color(item.color, 3)" v-for="(item, index) in ornaments"
                    :key="index"
                    >
              <div class="o-item" @click="choose_ornaments(index)">
                <div class="o-body">
                  <svg class="o-bg" viewBox="0 0 87 107">
                    <path d="M83.1 107.3l-61.8-74L87.3 0l-4.2 107.3z" fill-opacity=".04"></path>
                    <path d="M67.7 70.1l-57.5 32.6 11.3-61.3 46.2 28.7z" fill-opacity=".13"></path>
                    <path d="M67.3 63.5L27 74.5l14.3-37.4 26 26.4z" fill-opacity=".02"></path>
                    <path d="M85.5 79.1L51 106.6l29.6-37.4 4.9 9.9z" fill-opacity=".2"></path>
                    <path d="M19.6 72.9L0 52.9l24.1 2-4.5 18z" fill-opacity=".07"></path>
                  </svg>
                  <img class="o-img" :src="img_url + item.img" alt="">
                </div>
                <div class="o-name">{{item.name}}</div>
                <div class="o-abrasion" v-if="item.appid == 730">{{ abrasion(item.abrasion) }}, {{ quality(item.quality) }}
                </div>
                <div class="o-abrasion" v-else>{{ quality2(item.quality2) }}</div>
                <div class="o-price">￥ {{item.open_price}}</div>
              </div>
            </div>
          </div>
          <div v-if="ornaments.length == 0" style="text-align: center;">暂无数据</div>
        </el-card>
      </div>
      <div style="text-align: center;">
        <el-button @click="roll_ornaments_close">取消</el-button>
        <el-button type="primary" @click="roll_ornaments_submit">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {getStore, setStore} from "@/utils/store.js";
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
        query: {},
        operation_title: '',
        operation_type: '',
        operation_page: false,
        operation_index: '',
        operation_row: {},
        operation_form: {
          name: '',
          spread_id: '',
          flow: '',
          time: [],
          cztime: [],
          status: 0,
          end_status: 0
        },
        operation_rule: {
          name: [
            {required: true, message: "请输入Roll房名称", trigger: "blur"}
          ],
          time: [
            {required: true, message: "请选择开始结束日期", trigger: "change"}
          ],
          cztime: [
            {required: true, message: "请选择开始结束日期", trigger: "change"}
          ],
          spread_id: [
            {required: true, message: "所属人", trigger: "change"}
          ],
          flow: [
            {required: true, message: "请输入加入流水", trigger: "blur"},
            { type: 'number', message: '加入流水必须为数字'}
          ],
        },
        user_spread: [],
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
        operation_page2: false,
        operation_row2: {},
        ornaments_class: [],
        ornaments: [],
        roll_ornaments: [],
        roll_user: [],
        query2: {},
      };
    },
    computed: {
      price_total: function () {
        let price_total = 0;
        let roll_ornaments = this.roll_ornaments;
        for (let x in roll_ornaments) {
          price_total += Number(roll_ornaments[x].open_price || 0);
        }
        return price_total.toFixed(2);
      }
    },
    watch: {
      roll_ornaments: {
        handler(new_data, old_data) {
          let roll_user = this.roll_user;
          for (let a in roll_user){
            roll_user[a].roll_ornaments_id = 0;
          }
          for (let x in new_data){
            for (let y in roll_user){
              if (new_data[x].uid == roll_user[y].id && roll_user[y].id != 0){
                roll_user[y].roll_ornaments_id = new_data[x].id;
                break;
              }
            }
          }
        },
        // 开启深度监听
        deep: true
      },
    },
    mounted() {
      this.get_user_spread();
      this.get_roll();
    },
    methods: {
      abrasion, quality, quality2, color, repair,

      //获取用户推广
      get_user_spread() {
        ttGet("/admin.php/user/get_user_spread", '', (res) => {
          if (res.code == 200) {
            let user_spread = res.data.data;
            user_spread.unshift({
              id: -1,
              name: '网站专属用户'
            });
            user_spread.unshift({
              id: 0,
              name: '平台'
            });
            this.user_spread = user_spread;
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        });
      },

      //获取Roll房
      get_roll() {
        let page_info = this.page_info;
        let query = this.query;
        ttGet("/admin.php/roll/get_roll", {
          page: page_info.page,
          limit: page_info.limit,
          name: query.name,
          spread_id: query.spread_id,
          status: query.status,
          end_status: query.end_status,
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

      //分页切换
      currentChange(page) {
        this.page_info.page = page;
        this.loading = true;
        this.get_roll();
      },

      //条数切换
      sizeChange(limit) {
        this.page_info.page = 1;
        this.page_info.limit = limit;
        this.loading = true;
        this.get_roll();
      },

      //条件搜索
      search() {
        this.page_info.page = 1;
        this.loading = true;
        this.get_roll();
      },

      //重置条件
      reset() {
        this.page_info.page = 1;
        this.query = {};
        this.loading = true;
        this.get_roll();
      },

      //添加
      add: function () {
        this.operation_form = {
          name: '',
          spread_id: '',
          flow: '',
          cztime: [],
          time: [],
          status: 0,
          end_status: 0
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
        ttGet("/admin.php/roll/get_roll_details", {id: operation_row.id}, (res) => {
          loading.close();
          if (res.code == 200) {
            this.operation_form = res.data.roll;
            this.operation_form.flow = Number(res.data.roll.flow);
            this.$set(this.operation_form, "time", [Number(res.data.roll.start_time), Number(res.data.roll.end_time)]);
            this.$set(this.operation_form, "cztime", [Number(res.data.roll.cz_start_time), Number(res.data.roll.cz_end_time)]);
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
            ttPost("/admin.php/roll/roll_add", {
              name: operation_form.name,
              spread_id: operation_form.spread_id,
              flow: operation_form.flow,
              cztime: operation_form.cztime,
              time: operation_form.time,
              status: operation_form.status,
              end_status: operation_form.end_status,
            }, (res) => {
              loading.close();
              if (res.code == 200) {
                this.page_info.page = 1;
                this.get_roll();
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
            ttPost("/admin.php/roll/roll_edit", {
              id: operation_row.id,
              name: operation_form.name,
              spread_id: operation_form.spread_id,
              flow: operation_form.flow,
              cztime: operation_form.cztime,
              time: operation_form.time,
              status: operation_form.status,
              end_status: operation_form.end_status,
            }, (res) => {
              loading.close();
              if (res.code == 200) {
                this.get_roll();
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
          ttPost("/admin.php/roll/roll_del", {
            id: operation_row.id,
          }, (res) => {
            loading.close();
            if (res.code == 200) {
              if (this.page_info.page > 1 && this.data.length == 1) this.page_info.page -= 1;
              this.get_roll();
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

      //Roll房复制
      roll_copy(operation_index, operation_row) {
        this.$confirm("确定复制该Roll房吗?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let loading = this.$loading({
            text: '复制中',
            spinner: "el-icon-loading"
          });
          ttPost("/admin.php/roll/roll_copy", {
            id: operation_row.id,
          }, (res) => {
            loading.close();
            if (res.code == 200) {
              this.get_roll();
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

      //Roll房饰品
      roll_ornaments_edit (operation_index2, operation_row2) {
        let loading = this.$loading({
          text: '查询中',
          spinner: "el-icon-loading"
        });
        ttGet("/admin.php/roll/get_roll_ornaments", {
          id: operation_row2.id,
        }, (res) => {
          loading.close();
          if (res.code == 200) {
            this.roll_ornaments = res.data.roll_ornaments;
            let roll_user = res.data.roll_user;
            roll_user.unshift({id:0,name:'不指定中奖人'});
            roll_user = roll_user.map((item) => {
              item.roll_ornaments_id = 0;
              return item;
            });
            this.roll_user = roll_user;
            this.ornaments_class = res.data.ornaments_class;
            this.query2 = {};
            this.ornaments = [];
            this.operation_page2 = true;
            this.operation_row2 = operation_row2;
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        });
      },

      //Roll房饰品关闭
      roll_ornaments_close: function () {
        this.operation_page2 = false;
      },

      //选择饰品
      choose_ornaments(index) {
        let ornaments = this.ornaments[index];
        this.roll_ornaments.push(JSON.parse(JSON.stringify(ornaments)));
      },

      //取消饰品
      cancel_ornaments(index) {
        this.roll_ornaments.splice(index, 1);
      },

      //饰品搜索
      ornaments_select() {
        let query2 = this.query2;
        let loading = this.$loading({
          text: '查询中',
          spinner: "el-icon-loading"
        });
        ttGet("/admin.php/common/ornaments_select", {
          name: query2.name,
          marketHashName: query2.marketHashName,
          abrasion: query2.abrasion,
          quality: query2.quality,
          cid: query2.cid,
          sort: query2.sort,
          status: query2.status,
          status2: query2.status2,
          price_min: query2.price_min,
          price_max: query2.price_max,
          price_min2: query2.price_min2,
          price_max2: query2.price_max2,
        }, (res) => {
          loading.close();
          if (res.code == 200) {
            this.ornaments = res.data.data;
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        });
      },

      //饰品重置
      ornaments_reset() {
        this.query2 = {};
        this.ornaments = [];
      },

      //保存Roll房饰品
      roll_ornaments_submit() {
        let roll_ornaments = this.roll_ornaments;
        if (roll_ornaments.length < 1) return this.$message({message: '最少选择一件饰品!', type: 'warning'});
        let uid = [];
        for (let x in roll_ornaments) {
          if (roll_ornaments[x].uid){
            if (uid.includes(roll_ornaments[x].uid)) return this.$message({message: '多个饰品不能设置同一个中奖人!', type: 'warning'});
            uid.push(roll_ornaments[x].uid);
          }
        }
        let operation_row2 = this.operation_row2;
        let loading = this.$loading({
          text: '提交中',
          spinner: "el-icon-loading"
        });
        ttPost("/admin.php/roll/roll_ornaments_edit", {
          rid: operation_row2.id,
          roll_ornaments: roll_ornaments,
        }, (res) => {
          loading.close();
          if (res.code == 200) {
            this.get_roll();
            this.operation_page2 = false;
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

      //手动开启
      open(operation_index, operation_row) {
        this.$confirm("确定手动开启吗?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let loading = this.$loading({
            text: '提交中',
            spinner: "el-icon-loading"
          });
          ttPost("/admin.php/roll/roll_open", {
            id: operation_row.id,
          }, (res) => {
            loading.close();
            if (res.code == 200) {
              this.get_roll();
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

  .o-list {
    flex: 0 0 20%;
    max-width: 20%;
  }

  .o-item:hover {
    box-shadow: inset 0 0 30px rgb(159 159 159 / 60%)
  }

  .o-item:active {
    box-shadow: inset 0 0 30px rgb(237 147 14 / 60%);
  }

  .probability ::v-deep .el-input__inner {
    margin-top: 5px !important;
    background-color: rgb(31 31 31 / 48%);
    border-color: #303133;
  }

  .probability ::v-deep .el-input__inner:focus {
    border-color: #434343;
  }
</style>
