<template>
  <div style="height: 100%;width: 100%;background-color: #FFFFFF;overflow: hidden;">
    <div style="background-color: #FFFFFF;height: 100%;overflow: hidden;">
      <div style="margin: 20px 10px 0 10px;">
        <el-form>
          <el-row>
            <el-col :span="4">
              <el-form-item label="箱子名称:" label-width="80px">
                <el-input v-model="query.name" placeholder="请输入箱子名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="箱子分类:" label-width="80px">
                <el-select clearable filterable v-model="query.cid" placeholder="可输入搜索">
                  <el-option v-for="(item, index) in box_class" :label="item.name" :value="item.id" :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label-width="20px">
                <el-button size="medium" type="primary" icon="el-icon-search" @click="search">搜索 </el-button>
                <el-button size="medium" icon="el-icon-delete" @click="reset">重置 </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div style="display: flex;margin: 0 20px 10px 20px;">
        <el-button size="medium" type="primary" @click.stop="add"> 添加 </el-button>
      </div>
      <div style="margin: 0 20px;overflow: auto;padding-bottom: 20px;">
        <template>
          <el-table v-loading="loading" :data="data" border height="100%" ref="table"
            :header-cell-style="{backgroundColor: '#fafafa',color:'#333333',fontWeight:'400',textAlign:'center'}"
            :row-style="{color:'#333333',fontWeight:'400',height:50+'px',textAlign:'center'}"
            :cell-style="{padding:5+'px'}" style="width: 100%;font-size: 14px;" :row-class-name="get_row_class">

            <el-table-column align="center" type="selection" width="55"> </el-table-column>
            <el-table-column align="center" prop="id" label="ID" width="70"> </el-table-column>

            <el-table-column align="center" prop="name" label="箱子名称" min-width="120" show-overflow-tooltip>
              <template slot-scope="d">
                <div style="display: flex;">
                  <img :src="img_url + d.row.img" style="width: 50px;height: 50px;cursor: pointer;" alt="">
                  <div style="margin-left: 15px;text-align: left;">
                    <div> {{ d.row.name }} </div>
                    <div>开启价格: ￥ {{ d.row.price }}</div>
                  </div>
                </div>
              </template>
            </el-table-column>

            <el-table-column align="center" prop="box_class_name" label="饰品分类"> </el-table-column>
            <el-table-column align="center" prop="status" label="箱子开关">
              <template slot-scope="d">
                <template v-if="d.row.status == 1"> <el-tag size="mini">开启</el-tag> </template>
                <template v-else> <el-tag size="mini" type="danger">关闭</el-tag> </template>
              </template>
            </el-table-column>

            <el-table-column align="center" prop="box_ornaments_num" label="饰品数量" width="100"> </el-table-column>
            <el-table-column align="center" prop="stock" label="箱子库存" width="100"> </el-table-column>
            <el-table-column align="center" prop="sort" label="权重" width="100"> </el-table-column>

            <el-table-column label="操作" align="center" min-width="160">
              <template slot-scope="d">
                <el-button size="mini" type="primary" @click.stop="box_ornaments_edit(d.$index, d.row)">饰品
                </el-button>

                <el-button size="mini" type="primary" @click.stop="edit(d.$index, d.row)">编辑 </el-button>
                <el-button size="mini" type="danger" @click.stop="del(d.$index, d.row)">删除 </el-button>
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
            <el-col :span="12">
              <el-form-item label="箱子名称:" label-width="100px" prop="name">
                <div style="display: flex;"> <el-input v-model="operation_form.name" placeholder="箱子名称"></el-input>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属分类:" label-width="100px" prop="cid">
                <el-select clearable filterable v-model="operation_form.cid" placeholder="可输入搜索" style="width: 100%;">
                  <el-option v-for="(item, index) in box_class" :label="item.name" :value="item.id" :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="箱子图片:" label-width="100px" prop="img">
                <el-upload class="avatar-uploader" :action="server_url + '/admin.php/common/upload/filename/box'"
                  :headers="{secret:secret,token:token}" :show-file-list="false" :before-upload="avatar_upload"
                  :on-success="avatar_success">
                  <img v-if="operation_form.img" :src="img_url + operation_form.img" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="箱子价格:" label-width="100px" prop="price">
                <el-input type="number" v-model.number="operation_form.price" placeholder="箱子价格"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="箱子排序:" label-width="100px" prop="sort">
                <el-input type="number" v-model.number="operation_form.sort" placeholder="箱子排序"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="箱子开关:" label-width="100px" prop="status">
                <el-radio v-model="operation_form.status" :label="1">开启</el-radio>
                <el-radio v-model="operation_form.status" :label="0">关闭</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="糖果玩法:" label-width="100px" prop="candy_type">
                <el-radio v-model="operation_form.candy_type" :label="0">关闭</el-radio>
                <el-radio v-model="operation_form.candy_type" :label="1">糖果箱子</el-radio>
                <el-radio v-model="operation_form.candy_type" :label="2">糖果奖励</el-radio>
              </el-form-item>
            </el-col>

            <el-col :span="12" v-if="operation_form.candy_type == 1">
              <el-form-item label="糖果花费:" label-width="100px" prop="candy_spend">
                <el-input type="number" v-model.number="operation_form.candy_spend" placeholder="糖果花费"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="operation_form.candy_type == 2">
              <el-form-item label="糖果概率:" label-width="100px" prop="candy_probability">
                <el-input type="number" v-model.number="operation_form.candy_probability" placeholder="糖果概率"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="箱子类型:" label-width="100px" prop="type">
                <el-radio v-model="operation_form.type" :label="1">默认</el-radio>
                <el-radio v-model="operation_form.type" :label="2">等级箱子</el-radio>
                <el-radio v-model="operation_form.type" :label="3">战力箱子</el-radio>
                <el-radio v-model="operation_form.type" :label="4">新人累充箱子6</el-radio>
                <el-radio v-model="operation_form.type" :label="5">每日充值箱子</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="operation_form.type == 2">
              <el-form-item label="开启等级:" label-width="100px" prop="level">
                <el-input type="number" v-model.number="operation_form.level" placeholder="开启等级"></el-input>
              </el-form-item>
              <el-form-item label="价格系数:" label-width="100px" prop="rate">
                <el-input type="text" v-model.text="operation_form.rate" placeholder="价格系数(0-1,禁止写0)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="operation_form.type == 3">
              <el-form-item label="开启战力:" label-width="100px" prop="exp">
                <el-input type="number" v-model.number="operation_form.exp" placeholder="开启战力"></el-input>
              </el-form-item>
              <el-form-item label="价格系数:" label-width="100px" prop="rate">
                <el-input type="text" v-model.text="operation_form.rate" placeholder="价格系数(0-1,禁止写0)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="operation_form.type == 4">
              <el-form-item label="累充金额:" label-width="100px" prop="money">
                <el-input type="number" v-model.number="operation_form.money" placeholder="累充金额"></el-input>
              </el-form-item>
              <el-form-item label="价格系数:" label-width="100px" prop="rate">
                <el-input type="text" v-model.text="operation_form.rate" placeholder="价格系数(0-1,禁止写0)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="operation_form.type == 5">
              <el-form-item label="累充金额:" label-width="100px" prop="money">
                <el-input type="number" v-model.number="operation_form.money" placeholder="今日充值金额"></el-input>
              </el-form-item>
              <el-form-item label="价格系数:" label-width="100px" prop="rate">
                <el-input type="text" v-model.text="operation_form.rate" placeholder="价格系数(0-1,禁止写0)"></el-input>
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

    <el-dialog title="箱子饰品" append-to-body :visible.sync="operation_page2" width="60%">
      <div style="margin: 0 20px;">
        <el-card class="box-card" style="margin-bottom: 20px;">
          <div slot="header" class="clearfix">
            <span>箱子饰品</span>
            <el-button style="float: right; padding: 3px 0" type="text">总概率: {{probability_total}} %</el-button>
            <el-button style="float: right; padding: 3px 0;margin-right: 20px;" type="text">总库存: {{stock_total}}
            </el-button>
          </div>

          <div class="flex flex-wrap">
            <div style="margin-bottom: 10px; " :class="'o-list ' + color(item.color, 3)"
              v-for="(item, index) in box_ornaments" :key="index">
              <div class="o-item" @click="cancel_ornaments(index)">
                <div class="o-body">
                  <svg class="o-bg" viewBox="0 0 87 107">
                    <path d="M83.1 107.3l-61.8-74L87.3 0l-4.2 107.3z" fill-opacity=".04"></path>
                    <path d="M67.7 70.1l-57.5 32.6 11.3-61.3 46.2 28.7z" fill-opacity=".13"></path>
                    <path d="M67.3 63.5L27 74.5l14.3-37.4 26 26.4z" fill-opacity=".02"></path>
                    <path d="M85.5 79.1L51 106.6l29.6-37.4 4.9 9.9z" fill-opacity=".2"></path>
                    <path d="M19.6 72.9L0 52.9l24.1 2-4.5 18z" fill-opacity=".07"></path>
                  </svg>
                  <img class="o-img" style="width:100px;height:100px;" :src="img_url + item.img" alt="">
                </div>
                <div class="o-name">{{item.name}}</div>
                <div class="o-abrasion" v-if="item.appid == 730">{{ abrasion(item.abrasion) }},
                  {{ quality(item.quality) }}
                </div>
                <div class="o-abrasion" v-else>{{ quality2(item.quality2) }}</div>
                <div class="o-price">￥ {{item.open_price}}</div>

                <el-input style="width:40%" class="probability" v-model="item.probability" placeholder="获取概率 %"
                  @click.native.stop></el-input>
                <el-input style="width:40%" class="probability" v-model="item.stock" placeholder="库存"
                  @click.native.stop></el-input>
                <el-input style="width:40%" class="probability" v-model="item.min_roll" placeholder="最小roll"
                  @click.native.stop></el-input>-
                <el-input style="width:40%" class="probability" v-model="item.max_roll" placeholder="最大roll"
                  @click.native.stop></el-input>
              </div>
            </div>
          </div>
          <div v-if="box_ornaments.length == 0" style="text-align: center;">暂无数据</div>
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
                      <el-option label="崭新出厂" :value="1"> </el-option>
                      <el-option label="略有磨损" :value="2"> </el-option>
                      <el-option label="久经沙场" :value="3"> </el-option>
                      <el-option label="破损不堪" :value="4"> </el-option>
                      <el-option label="战痕累累" :value="5"> </el-option>
                      <el-option label="无涂装" :value="6"> </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label-width="10px">
                    <el-select clearable v-model="query2.quality" placeholder="请选择类别">
                      <el-option label="普通" :value="1"> </el-option>
                      <el-option label="StatTrak™" :value="2"> </el-option>
                      <el-option label="纪念品" :value="3"> </el-option>
                      <el-option label="★" :value="4"> </el-option>
                      <el-option label="★ StatTrak™" :value="5"> </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label-width="20px">
                    <el-select clearable filterable v-model="query2.cid" placeholder="可输入搜索分类">
                      <el-option v-for="(item, index) in ornaments_class" :label="item.name" :value="item.id"
                        :key="index">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label-width="10px">
                    <el-select clearable v-model="query2.sort" placeholder="请选择排序">
                      <el-option label="开启价格升序" :value="1"> </el-option>
                      <el-option label="开启价格降序" :value="2"> </el-option>
                      <el-option label="购买价格升序" :value="3"> </el-option>
                      <el-option label="购买价格降序" :value="4"> </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label-width="10px">
                    <el-select clearable v-model="query2.status" placeholder="请选择商城开关">
                      <el-option label="开启" :value="1"> </el-option>
                      <el-option label="关闭" :value="0"> </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label-width="10px">
                    <el-select clearable v-model="query2.status2" placeholder="请选择幸运开箱开关">
                      <el-option label="开启" :value="1"> </el-option>
                      <el-option label="关闭" :value="0"> </el-option>
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
                    <el-button size="medium" type="primary" icon="el-icon-search" @click="ornaments_select">
                    </el-button>
                    <el-button size="medium" icon="el-icon-delete" @click="ornaments_reset"> </el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="flex flex-wrap">
            <div :class="'o-list ' + color(item.color, 3)" v-for="(item, index) in ornaments" :key="index">
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
                <div class="o-abrasion" v-if="item.appid == 730">{{ abrasion(item.abrasion) }},
                  {{ quality(item.quality) }}
                </div>
                <div class="o-abrasion" v-else>{{ quality2(item.quality2) }}</div>
                <div class="o-price">￥{{item.open_price}}</div>
              </div>
            </div>
          </div>
          <div v-if="ornaments.length == 0" style="text-align: center;">暂无数据</div>
        </el-card>
      </div>
      <div style="text-align: center;">
        <el-button @click="box_ornaments_close">取消</el-button>
        <el-button type="primary" @click="box_ornaments_submit">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="设置下发饰品" append-to-body :visible.sync="operation_next_page2" width="60%">
      <div style="margin: 0 20px;">
        <el-card class="box-card" style="margin-bottom: 20px;">
          <div slot="header" class="clearfix">
            <span>请选择下发饰品</span>
          </div>
          <div class="flex flex-wrap">
            <div :class="'o-list ' + color(item.color, 3)" v-for="(item, index) in box_ornaments" :key="index">
              <div class="o-item" @click="select_ornaments(item)">
                <div v-if="item.oid == box_select_next_id || operation_row2.next_oid == item.oid"
                  style="padding:0px 5px;position: absolute;right:5px;top:5px;color:#fff;background-color: red;border-radius: 3px;">
                  √
                </div>
                <div class="o-body">
                  <svg class="o-bg" viewBox="0 0 87 107">
                    <path d="M83.1 107.3l-61.8-74L87.3 0l-4.2 107.3z" fill-opacity=".04"></path>
                    <path d="M67.7 70.1l-57.5 32.6 11.3-61.3 46.2 28.7z" fill-opacity=".13"></path>
                    <path d="M67.3 63.5L27 74.5l14.3-37.4 26 26.4z" fill-opacity=".02"></path>
                    <path d="M85.5 79.1L51 106.6l29.6-37.4 4.9 9.9z" fill-opacity=".2"></path>
                    <path d="M19.6 72.9L0 52.9l24.1 2-4.5 18z" fill-opacity=".07"></path>
                  </svg>
                  <img class="o-img" style="width:100px;height:100px;" :src="img_url + item.img" alt="">
                </div>
                <div class="o-name">{{item.name}}</div>
                <div class="o-abrasion" v-if="item.appid == 730">{{ abrasion(item.abrasion) }},
                  {{ quality(item.quality) }}
                </div>
                <div class="o-abrasion" v-else>{{ quality2(item.quality2) }}</div>
                <div class="o-price">￥ {{item.open_price}}</div>
              </div>
            </div>
          </div>
          <div v-if="box_ornaments.length == 0" style="text-align: center;">暂无数据</div>
        </el-card>
      </div>
      <div style="text-align: center;">
        <!--明天做好这个取消设置和选择下发饰品功能-->
        <el-button @click="box_next_close">取消</el-button>
        <el-button type="primary" @click="box_next_set">确认选择</el-button>
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
    abrasion,
    quality,
    quality2,
    color
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
        loading2: true,
        page_info: {
          page: 1,
          limit: 10,
          total: 0,
        },
        page_info2: {
          page: 1,
          limit: 10,
          total: 0,
        },
        data: [],
        box_class: [],
        query: {},
        operation_title: '',
        operation_type: '',
        operation_page: false,
        operation_index: '',
        operation_row: {},
        operation_form: {
          name: '',
          cid: '',
          img: '',
          price: '',
          sort: '',
          status: 1,
          type: '',
          level: '',
          exp: '',
          money: '',
          rate: '',
          candy_type: 0,
          candy_spend: '',
          candy_probability: '',
        },
        operation_rule: {
          name: [{
            required: true,
            message: "请输入箱子名称",
            trigger: "blur"
          }],
          cid: [{
            required: true,
            message: "请选择分类",
            trigger: "change"
          }],
          img: [{
            required: true,
            message: "请上传图片",
            trigger: "change"
          }],
          price: [{
            required: true,
            message: "请输入箱子价格",
            trigger: "blur"
          }, {
            type: 'number',
            message: '箱子价格必须为数字'
          }],
          sort: [{
            required: true,
            message: "请输入排序",
            trigger: "blur"
          }, {
            type: 'number',
            message: '箱子排序必须为数字'
          }],
          type: [{
            required: true,
            message: "请选择箱子类型",
            trigger: "change"
          }],
        },
        operation_page2: false,
        operation_next_page2: false,
        box_select_next_id: 0,
        operation_row2: {},
        ornaments_class: [],
        ornaments: [],
        box_ornaments: [],
        query2: {},
      };
    },
    computed: {
      probability_total: function() {
        let probability_total = 0;
        let box_ornaments = this.box_ornaments;
        for (let x in box_ornaments) {
          probability_total += Number(box_ornaments[x].probability ? box_ornaments[x].probability : 0);
        }
        return probability_total.toFixed(4);
      },
      stock_total: function() {
        let stock_total = 0;
        let box_ornaments = this.box_ornaments;
        for (let x in box_ornaments) {
          stock_total += Number(box_ornaments[x].stock ? box_ornaments[x].stock : 0);
        }
        return stock_total;
      }



    },
    mounted() {
      this.get_box_class();
      this.get_box();
    },
    methods: {
      abrasion,
      quality,
      quality2,
      color,

      //获取箱子分类
      get_box_class() {
        ttGet("/admin.php/common/get_box_class", '', (res) => {
          if (res.code == 200) {
            this.box_class = res.data.data;
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        });
      },

      //获取箱子
      get_box() {
        let page_info = this.page_info;
        let query = this.query;
        ttGet("/admin.php/box/get_box", {
          page: page_info.page,
          limit: page_info.limit,
          name: query.name,
          cid: query.cid,
        }, (res) => {
          this.loading = false;
          if (res.code == 200) {
            this.data = res.data.data.data;
            this.page_info.total = res.data.data.count;
            let height = 50 + 61 * (res.data.data.data.length ? res.data.data.data.length : 1);
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
        this.get_box();
      },

      //条数切换
      sizeChange(limit) {
        this.page_info.page = 1;
        this.page_info.limit = limit;
        this.loading = true;
        this.get_box();
      },

      //条件搜索
      search() {
        this.page_info.page = 1;
        this.loading = true;
        this.get_box();
      },

      //重置条件
      reset() {
        this.page_info.page = 1;
        this.query = {};
        this.loading = true;
        this.get_box();
      },

      //添加
      add: function() {
        this.operation_form = {
          name: '',
          cid: '',
          img: '',
          price: '',
          sort: '',
          status: 1,
          type: '',
          level: '',
          exp: '',
          money: '',
          rate: '',
          candy_type: 0,
          candy_spend: '',
          candy_probability: '',
        };
        this.operation_title = '添加';
        this.operation_type = 'add';
        this.operation_page = true;
      },

      //编辑
      edit(operation_index, operation_row) {
        ttGet("/admin.php/box/get_box_details", {
          id: operation_row.id
        }, (res) => {
          if (res.code == 200) {
            this.operation_form = res.data.box;
            this.operation_form.price = Number(res.data.box.price);
            this.operation_form.sort = Number(res.data.box.sort);
            this.operation_form.type = Number(res.data.box.type);
            this.operation_form.level = Number(res.data.box.level);
            this.operation_form.exp = Number(res.data.box.exp);
            this.operation_form.money = Number(res.data.box.money);
            this.operation_form.rate = Number(res.data.box.rate);
            this.operation_form.candy_spend = Number(res.data.box.candy_spend);
            this.operation_form.candy_probability = Number(res.data.box.candy_probability);
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
            ttPost("/admin.php/box/box_add", {
              name: operation_form.name,
              cid: operation_form.cid,
              img: operation_form.img,
              price: operation_form.price,
              sort: operation_form.sort,
              type: operation_form.type,
              level: operation_form.level,
              exp: operation_form.exp,
              rate: operation_form.rate,
              money: operation_form.money,
              status: operation_form.status,
              candy_type: operation_form.candy_type,
              candy_spend: operation_form.candy_spend,
              candy_probability: operation_form.candy_probability,
            }, (res) => {
              loading.close();
              if (res.code == 200) {
                this.page_info.page = 1;
                this.get_box();
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
            ttPost("/admin.php/box/box_edit", {
              id: operation_row.id,
              name: operation_form.name,
              cid: operation_form.cid,
              img: operation_form.img,
              price: operation_form.price,
              sort: operation_form.sort,
              type: operation_form.type,
              level: operation_form.level,
              exp: operation_form.exp,
              rate: operation_form.rate,
              money: operation_form.money,
              status: operation_form.status,
              candy_type: operation_form.candy_type,
              candy_spend: operation_form.candy_spend,
              candy_probability: operation_form.candy_probability,
            }, (res) => {
              loading.close();
              if (res.code == 200) {
                this.get_box();
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
          ttPost("/admin.php/box/box_del", {
            id: operation_row.id,
          }, (res) => {
            loading.close();
            if (res.code == 200) {
              if (this.page_info.page > 1 && this.data.length == 1) this.page_info.page -= 1;
              this.get_box();
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
        }).catch(() => {});
      },

      //获取每行数据
      get_row_class(row) {
        let data = row.row;
        let res = [];
        if (data.children && data.children.length > 0) {
          res.push('row-expand-has')
          return res;
        } else {
          res.push('row-expand-unhas')
          return res;
        }
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
          this.operation_form.img = res.data.img;
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



      //箱子饰品
      box_ornaments_edit: function(operation_index2, operation_row2) {
        let loading = this.$loading({
          text: '查询中',
          spinner: "el-icon-loading"
        });
        ttGet("/admin.php/box/get_box_ornaments", {
          id: operation_row2.id,
        }, (res) => {
          loading.close();
          if (res.code == 200) {
            this.box_ornaments = res.data.box_ornaments;
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

      //箱子饰品关闭
      box_ornaments_close: function() {
        this.operation_page2 = false;
      },

      //设置下一发饰品关闭
      box_next_close: function() {
        this.operation_next_page2 = false;
      },

      //选择饰品
      choose_ornaments(index) {
        let ornaments = this.ornaments[index];
        this.box_ornaments.push(JSON.parse(JSON.stringify(ornaments)));
      },

      //取消饰品
      cancel_ornaments(index) {
        this.box_ornaments.splice(index, 1);
      },

      select_ornaments(item) {
        console.log('选中了' + item.oid);
        this.box_select_next_id = item.oid;
        this.operation_row2.next_oid = item.oid;
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

      //保存设置下一发箱子id
      box_next_set() {
        let next_oid = this.box_select_next_id;
        this.box_select_next_id = 0;
        //box_next_edit
        let operation_row2 = this.operation_row2;
        let loading = this.$loading({
          text: '提交中',
          spinner: "el-icon-loading"
        });
        ttPost("/admin.php/box/box_next_edit", {
          id: operation_row2.id,
          next_oid: next_oid,
        }, (res) => {
          loading.close();
          if (res.code == 200) {
            this.operation_next_page2 = false;
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

      //保存箱子饰品
      box_ornaments_submit() {
        let box_ornaments = this.box_ornaments;
        if (box_ornaments.length < 2) return this.$message({
          message: '最少选择两件饰品!',
          type: 'warning'
        });
        for (let x in box_ornaments) {
          if (!box_ornaments[x].probability) return this.$message({
            message: '请输入' + box_ornaments[x].name + '获取概率',
            type: 'warning'
          });
        }
        let operation_row2 = this.operation_row2;
        let loading = this.$loading({
          text: '提交中',
          spinner: "el-icon-loading"
        });
        ttPost("/admin.php/box/box_ornaments_edit", {
          bid: operation_row2.id,
          box_ornaments: box_ornaments,
          stock_total: this.stock_total,
        }, (res) => {
          loading.close();
          if (res.code == 200) {
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

  .row-expand-unhas .el-table__expand-column {
    pointer-events: none;
  }

  .row-expand-unhas .el-table__expand-column .el-icon {
    visibility: hidden;
  }

  .clearfix::before,
  .clearfix::after {
    display: table;
    content: "";
  }

  .clearfix::after {
    clear: both
  }

  .o-list {
    flex: 0 0 20%;
    max-width: 20%;
  }

  .o-item {
    position: relative;
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