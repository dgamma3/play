<template>
  <div style="height: 100%;width: 100%;background-color: #FFFFFF;overflow: hidden;">
    <div style="background-color: #FFFFFF;height: 100%;overflow: hidden;">
      <div style="margin: 20px 10px 0 10px;">
        <el-tabs value="csgo" type="card">
          <el-tab-pane label="CSGO饰品" name="csgo">
            <el-form>
              <el-row>
                <el-col :span="4">
                  <el-form-item label="饰品名称:" label-width="80px">
                    <el-input v-model="query.name" placeholder="请输入饰品名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="官方名称:" label-width="80px">
                    <el-input v-model="query.marketHashName" placeholder="请输入官方名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="饰品磨损:" label-width="80px">
                    <el-select clearable v-model="query.abrasion" placeholder="请选择">
                      <el-option   label="崭新出厂" :value="1">   </el-option>
                      <el-option   label="略有磨损"   :value="2"> </el-option>
                      <el-option   label="久经沙场"  :value="3">  </el-option>
                      <el-option  label="破损不堪"   :value="4">  </el-option>
                      <el-option  label="战痕累累"  :value="5">  </el-option>
                      <el-option  label="无磨损"  :value="6"> </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="饰品类别:" label-width="80px">
                    <el-select clearable v-model="query.quality" placeholder="请选择">
                      <el-option  label="普通"  :value="1">  </el-option>
                      <el-option   label="StatTrak™"  :value="2"> </el-option>
                      <el-option  label="纪念品" :value="3"> </el-option>
                      <el-option   label="★"  :value="4">  </el-option>
                      <el-option label="★ StatTrak™"  :value="5">  </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="饰品分类:" label-width="80px">
                    <el-select clearable filterable v-model="query.cid" placeholder="可输入搜索">
                      <el-option   v-for="(item, index) in ornaments_class"  :label="item.name" :value="item.id" :key="index"   >  </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="饰品排序:" label-width="80px">
                    <el-select clearable v-model="query.sort" placeholder="请选择">
                      <el-option  label="开启价格升序" :value="1"> </el-option>
                      <el-option  label="开启价格降序" :value="2">  </el-option>
                      <el-option  label="购买价格升序"  :value="3"> </el-option>
                      <el-option  label="购买价格降序"  :value="4">  </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="商城开关:" label-width="80px">
                    <el-select clearable v-model="query.status" placeholder="请选择">
                      <el-option  label="开启"  :value="1">  </el-option>
                      <el-option  label="关闭"  :value="0">  </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="幸运开箱开关:" label-width="110px">
                    <el-select clearable v-model="query.status2" placeholder="请选择">
                      <el-option   label="开启"  :value="1"> </el-option>
                      <el-option  label="关闭"  :value="0"> </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="开启价格:" label-width="80px">
                    <div style="display: flex;">
                      <el-input v-model="query.price_min" placeholder="最小价格"></el-input>
                      <div style="margin: 0 10px;">-</div>
                      <el-input v-model="query.price_max" placeholder="最大价格"></el-input>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="购买价格:" label-width="80px">
                    <div style="display: flex;">
                      <el-input v-model="query.price_min2" placeholder="最小价格"></el-input>
                      <div style="margin: 0 10px;">-</div>
                      <el-input v-model="query.price_max2" placeholder="最大价格"></el-input>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label-width="20px">
                    <el-button  size="medium"  type="primary"  icon="el-icon-search"   @click="search">搜索 </el-button>
                    <el-button size="medium"  icon="el-icon-delete"  @click="reset">重置  </el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div style="display: flex;margin: 0 20px 10px 20px;">
              <el-button size="medium" type="primary"  @click.stop="add">  添加  </el-button>
              <el-button  size="medium"  type="primary"   @click.stop="contrast(1, 730)"> 一键更新开箱价格  </el-button>
              <el-button  size="medium"  type="primary"   @click.stop="contrast(2, 730)">   一键更新购买价格 </el-button>
              <el-button size="medium"  type="primary"  @click.stop="give(730)">   赠送饰品   </el-button>
              <div style="margin-left: 10px;color: #f23e3e;line-height: 36px;font-size: 14px;font-weight: bold;">  正常情况下只用更新购买价格, 开启价格固定! </div>
            </div>
            <div style="margin: 0 20px;overflow: auto;padding-bottom: 20px;">
              <template>
                <el-table  v-loading="loading"  :data="data"  border  height="100%"   ref="table"
                  :header-cell-style="{backgroundColor: '#fafafa',color:'#333333',fontWeight:'400',textAlign:'center'}"
                  :row-style="{color:'#333333',fontWeight:'400',height:50+'px',textAlign:'center'}"
                  :cell-style="{padding:5+'px'}"  style="width: 100%;font-size: 14px;"  :row-class-name="get_row_class">
                  <el-table-column   align="center"  type="selection"   width="55">  </el-table-column>
                  <el-table-column  align="center"   min-width="30" prop="id"    width="80"  label="ID"></el-table-column>
                  <el-table-column   align="center"    prop="name"  label="饰品名称"  min-width="120"  show-overflow-tooltip>
                    <template slot-scope="d">
                      <div style="display: flex;">
                        <img :src="img_url + d.row.img" style="width: 50px;height: 50px;cursor: pointer;" alt="">
                        <div style="margin-left: 15px;text-align: left;">
                          <div>  {{ d.row.name }} </div>
                          <div>开启价格: ￥ {{ d.row.open_price }}</div>
                          <div>购买价格: ￥ {{ d.row.pay_price }}</div>
                        </div>
                      </div>
                    </template>
                  </el-table-column>


                  <el-table-column  align="center"  prop="info"  label="饰品详情"  show-overflow-tooltip>
                    <template slot-scope="d">
                      <div style="text-align: left;overflow: hidden;">
                        <div>官方名称: {{ d.row.marketHashName }}</div>
                        <div>饰品磨损: {{ abrasion(d.row.abrasion) || '无磨损' }}</div>
                        <div>饰品类别: {{ quality(d.row.quality) }}</div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column   align="center" prop="ornaments_class_name"   label="饰品分类">  </el-table-column>
                  <el-table-column  align="center"   prop="color"  label="饰品颜色">
                    <template slot-scope="d">
                      <div  :style="'margin: 0 auto;border-radius: 4px;width: 20px;height: 20px;background-color:' + color(d.row.color, 2)"></div>
                    </template>
                  </el-table-column>
                  <el-table-column  align="center"  prop="status"   label="商城启用">
                    <template slot-scope="d">
                      <template v-if="d.row.status == 1">  <el-tag size="mini">是</el-tag>  </template>
                      <template v-else>    <el-tag size="mini" type="danger">否</el-tag>  </template>
                    </template>
                  </el-table-column>
                  <el-table-column   align="center"   prop="status2"  label="幸运开箱启用">
                    <template slot-scope="d">
                      <template v-if="d.row.status2 == 1">  <el-tag size="mini">是</el-tag>  </template>
                      <template v-else>  <el-tag size="mini" type="danger">否</el-tag> </template>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="d">
                      <el-button  size="mini"  type="primary"    @click.stop="edit(d.$index, d.row)">编辑  </el-button>
                      <el-button  size="mini"  type="danger"   @click.stop="del(d.$index, d.row)">删除 </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div style="text-align: right;margin: 20px 0 0 0;">
                  <el-pagination  background   @size-change="sizeChange"   @current-change="currentChange"
                    :current-page="page_info.page"  :page-sizes="[10, 20, 50, 100, 200, 500, 1000]" :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"  :total="page_info.total">
                  </el-pagination>
                </div>
              </template>
            </div>
            <el-dialog  :title="operation_title"   append-to-body   :visible.sync="operation_page"   width="60%">
              <div style="margin: 0 20px;">
                <el-form  ref="operation_form"  :rules="operation_rule" :model="operation_form">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="饰品名称:" label-width="100px" prop="name" style="margin-bottom: 0;">
                        <div>
                          <el-input v-model="operation_form.name" placeholder="饰品名称"> <el-button slot="append" type="primary" icon="el-icon-search" @click="ornaments_select"> 饰品搜索 </el-button>
                          </el-input>
                        </div>
                        <div>输入饰品名称,磨损,类别后可查询出颜色,官方名称,图片,价格与id</div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="饰品磨损:" label-width="100px" prop="abrasion">
                        <el-radio v-model="operation_form.abrasion" :label="1">崭新出厂</el-radio>
                        <el-radio v-model="operation_form.abrasion" :label="2">略有磨损</el-radio>
                        <el-radio v-model="operation_form.abrasion" :label="3">久经沙场</el-radio>
                        <el-radio v-model="operation_form.abrasion" :label="4">破损不堪</el-radio>
                        <el-radio v-model="operation_form.abrasion" :label="5">战痕累累</el-radio>
                        <el-radio v-model="operation_form.abrasion" :label="6">无磨损</el-radio>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="饰品类别:" label-width="100px" prop="quality">
                        <el-radio v-model="operation_form.quality" :label="1">普通</el-radio>
                        <el-radio v-model="operation_form.quality" :label="2">StatTrak™</el-radio>
                        <el-radio v-model="operation_form.quality" :label="3">纪念品</el-radio>
                        <el-radio v-model="operation_form.quality" :label="4">★</el-radio>
                        <el-radio v-model="operation_form.quality" :label="5">★ StatTrak™</el-radio>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="饰品颜色:" label-width="100px" prop="color">
                        <el-radio v-model="operation_form.color" :label="1">金色</el-radio>
                        <el-radio v-model="operation_form.color" :label="2">红色</el-radio>
                        <el-radio v-model="operation_form.color" :label="3">粉色</el-radio>
                        <el-radio v-model="operation_form.color" :label="4">紫色</el-radio>
                        <el-radio v-model="operation_form.color" :label="5">蓝色</el-radio>
                        <el-radio v-model="operation_form.color" :label="6">浅蓝色</el-radio>
                        <el-radio v-model="operation_form.color" :label="7">白色</el-radio>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="所属分类:" label-width="100px" prop="cid">
                        <el-select clearable filterable v-model="operation_form.cid" placeholder="可输入搜索"
                                   style="width: 100%;">
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
                    <el-col :span="12">
                      <el-form-item label="官方名称:" label-width="100px" prop="marketHashName">
                        <el-input v-model="operation_form.marketHashName" placeholder="官方名称"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="饰品图片:" label-width="100px" prop="img">
                        <el-upload
                          class="avatar-uploader"
                          :action="server_url + '/admin.php/common/upload/filename/ornaments'"
                          :headers="{secret:secret,token:token}"
                          :show-file-list="false"
                          :before-upload="avatar_upload"
                          :on-success="avatar_success">
                          <img v-if="operation_form.img" :src="img_url + operation_form.img" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="开启价格:" label-width="100px" prop="open_price">
                        <el-input type="number" v-model.number="operation_form.open_price"
                                  placeholder="开启价格"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="购买价格:" label-width="100px" prop="pay_price">
                        <el-input type="number" v-model.number="operation_form.pay_price"
                                  placeholder="购买价格"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="饰品id:" label-width="100px" prop="item_id">
                        <el-input v-model="operation_form.item_id" placeholder="饰品id"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="商城开关:" label-width="100px" prop="status">
                        <el-radio v-model="operation_form.status" :label="1">开启</el-radio>
                        <el-radio v-model="operation_form.status" :label="0">关闭</el-radio>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="幸运开箱开关:" label-width="100px" prop="status2">
                        <el-radio v-model="operation_form.status2" :label="1">开启</el-radio>
                        <el-radio v-model="operation_form.status2" :label="0">关闭</el-radio>
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
          </el-tab-pane>
          <el-tab-pane label="DOTA2饰品" name="dota2">
            <el-form>
              <el-row>
                <el-col :span="4">
                  <el-form-item label="饰品名称:" label-width="80px">
                    <el-input v-model="query2.name" placeholder="请输入饰品名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="官方名称:" label-width="80px">
                    <el-input v-model="query2.marketHashName" placeholder="请输入官方名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="饰品类别:" label-width="80px">
                    <el-select clearable v-model="query2.quality2" placeholder="请选择">
                      <el-option label="标准"  :value="1">  </el-option>
                      <el-option  label="冥灵"  :value="2">  </el-option>
                      <el-option  label="铭刻"  :value="3">   </el-option>
                      <el-option  label="传奇"  :value="4"> </el-option>
                      <el-option  label="尊享"  :value="5"> </el-option>
                      <el-option  label="纯正"  :value="6"> </el-option>
                      <el-option  label="亲笔签名"  :value="7"> </el-option>
                      <el-option    label="独特"  :value="8">   </el-option>
                      <el-option     label="吉祥"   :value="9">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="饰品分类:" label-width="80px">
                    <el-select clearable filterable v-model="query2.cid" placeholder="可输入搜索">
                      <el-option  v-for="(item, index) in ornaments_class"  :label="item.name"  :value="item.id" :key="index"  >  </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="饰品排序:" label-width="80px">
                    <el-select clearable v-model="query2.sort" placeholder="请选择">
                      <el-option  label="开启价格升序" :value="1">  </el-option>
                      <el-option  label="开启价格降序"  :value="2">  </el-option>
                      <el-option  label="购买价格升序"   :value="3"> </el-option>
                      <el-option  label="购买价格降序"  :value="4"> </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="商城开关:" label-width="80px">
                    <el-select clearable v-model="query2.status" placeholder="请选择">
                      <el-option  label="开启" :value="1"> </el-option>
                      <el-option   label="关闭"  :value="0"> </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="幸运开箱开关:" label-width="110px">
                    <el-select clearable v-model="query2.status2" placeholder="请选择">
                      <el-option  label="开启"  :value="1"> </el-option>
                      <el-option   label="关闭"     :value="0">  </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="开启价格:" label-width="80px">
                    <div style="display: flex;">
                      <el-input v-model="query2.price_min" placeholder="最小价格"></el-input>
                      <div style="margin: 0 10px;">-</div>
                      <el-input v-model="query2.price_max" placeholder="最大价格"></el-input>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="购买价格:" label-width="80px">
                    <div style="display: flex;">
                      <el-input v-model="query2.price_min2" placeholder="最小价格"></el-input>
                      <div style="margin: 0 10px;">-</div>
                      <el-input v-model="query2.price_max2" placeholder="最大价格"></el-input>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label-width="20px">
                    <el-button  size="medium"  type="primary"  icon="el-icon-search"  @click="search2">搜索 </el-button>
                    <el-button  size="medium"  icon="el-icon-delete"  @click="reset2">重置  </el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div style="display: flex;margin: 0 20px 10px 20px;">
              <el-button  size="medium" type="primary"  @click.stop="add2">  添加 </el-button>
              <el-button size="medium"  type="primary"   @click.stop="contrast(1, 570)"> 一键更新开箱价格 </el-button>
              <el-button   size="medium"   type="primary"  @click.stop="contrast(2, 570)">  一键更新购买价格  </el-button>
              <el-button  size="medium"   type="primary"  @click.stop="give(570)"> 赠送饰品  </el-button>
              <div style="margin-left: 10px;color: #f23e3e;line-height: 36px;font-size: 14px;font-weight: bold;"> 正常情况下只用更新购买价格, 开启价格固定!  </div>
            </div>
            <div style="margin: 0 20px;overflow: auto;padding-bottom: 20px;">
              <template>
                <el-table   v-loading="loading2"  :data="data2"   border   height="100%"  ref="table2" :header-cell-style="{backgroundColor: '#fafafa',color:'#333333',fontWeight:'400',textAlign:'center'}"
                  :row-style="{color:'#333333',fontWeight:'400',height:50+'px',textAlign:'center'}" :cell-style="{padding:5+'px'}"   style="width: 100%;font-size: 14px;"  :row-class-name="get_row_class">
                  <el-table-column    align="center" style="width: 30px;" type="selection"  width="55">   </el-table-column>
                  <el-table-column  align="center"   min-width="30" prop="id"   style="width: 30px;"   label="ID"></el-table-column>
                  <el-table-column   align="center"  prop="name"     label="饰品名称"   min-width="120" show-overflow-tooltip>
                    <template slot-scope="d">
                      <div style="display: flex;">
                        <img :src="img_url + d.row.img" style="width: 50px;height: 50px;cursor: pointer;" alt="">
                        <div style="margin-left: 15px;text-align: left;">
                          <div>  {{ d.row.name }} </div>
                          <div>开启价格: ￥ {{ d.row.open_price }}</div>
                          <div>购买价格:￥ {{ d.row.pay_price }}</div>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column   align="center" prop="info"  label="饰品详情" show-overflow-tooltip>
                    <template slot-scope="d">
                      <div style="text-align: left;overflow: hidden;">
                        <div>官方名称: {{ d.row.marketHashName }}</div>
                        <div>饰品类别: {{ quality2(d.row.quality2) }}</div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column  align="center"  prop="ornaments_class_name"   label="饰品分类">  </el-table-column>
                  <el-table-column  align="center"  prop="color"  label="饰品颜色">
                    <template slot-scope="d">
                      <div :style="'margin: 0 auto;border-radius: 4px;width: 20px;height: 20px;background-color:' + color(d.row.color, 2)"></div>
                    </template>
                  </el-table-column>
                  <el-table-column  align="center"  prop="status"  label="商城启用">
                    <template slot-scope="d">
                      <template v-if="d.row.status == 1"> <el-tag size="mini">是</el-tag> </template>
                      <template v-else> <el-tag size="mini" type="danger">否</el-tag>  </template>
                    </template>
                  </el-table-column>
                  <el-table-column  align="center"    prop="status2"  label="幸运开箱启用">
                    <template slot-scope="d">
                      <template v-if="d.row.status2 == 1">
                        <el-tag size="mini">是</el-tag>
                      </template>
                      <template v-else>
                        <el-tag size="mini" type="danger">否</el-tag>
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="d">
                      <el-button  size="mini"  type="primary"  @click.stop="edit2(d.$index, d.row)">编辑  </el-button>
                      <el-button   size="mini"  type="danger"  @click.stop="del2(d.$index, d.row)">删除  </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div style="text-align: right;margin: 20px 0 0 0;">
                  <el-pagination   background  @size-change="sizeChange2"   @current-change="currentChange2" :current-page="page_info2.page"
                    :page-sizes="[10, 20, 50, 100, 200, 500, 1000]"   :page-size="10" layout="total, sizes, prev, pager, next, jumper"   :total="page_info2.total">
                  </el-pagination>
                </div>
              </template>
            </div>
            <el-dialog :title="operation_title2"   append-to-body  :visible.sync="operation_page2"  width="60%">
              <div style="margin: 0 20px;">
                <el-form   ref="operation_form2"  :rules="operation_rule2"  :model="operation_form2">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="饰品名称:" label-width="100px" prop="name" style="margin-bottom: 0;">
                        <div style="display: flex;">
                          <el-input v-model="operation_form2.name" placeholder="饰品名称">  <el-button slot="append" type="primary" icon="el-icon-search" @click="ornaments_select2">  饰品搜索 </el-button> </el-input>
                        </div>
                        <div>输入饰品名称,磨损,类别后可查询出颜色,官方名称,图片,价格与id</div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="饰品类别:" label-width="100px" prop="quality">
                        <el-radio v-model="operation_form2.quality2" :label="1">标准</el-radio>
                        <el-radio v-model="operation_form2.quality2" :label="2">冥灵</el-radio>
                        <el-radio v-model="operation_form2.quality2" :label="3">铭刻</el-radio>
                        <el-radio v-model="operation_form2.quality2" :label="4">传奇</el-radio>
                        <el-radio v-model="operation_form2.quality2" :label="5">尊享</el-radio>
                        <el-radio v-model="operation_form2.quality2" :label="6">纯正</el-radio>
                        <el-radio v-model="operation_form2.quality2" :label="7">亲笔签名</el-radio>
                        <el-radio v-model="operation_form2.quality2" :label="8">独特</el-radio>
                        <el-radio v-model="operation_form2.quality2" :label="9">吉祥</el-radio>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="饰品颜色:" label-width="100px" prop="color">
                        <el-radio v-model="operation_form2.color" :label="1">金色</el-radio>
                        <el-radio v-model="operation_form2.color" :label="2">红色</el-radio>
                        <el-radio v-model="operation_form2.color" :label="3">粉色</el-radio>
                        <el-radio v-model="operation_form2.color" :label="4">紫色</el-radio>
                        <el-radio v-model="operation_form2.color" :label="5">蓝色</el-radio>
                        <el-radio v-model="operation_form2.color" :label="6">浅蓝色</el-radio>
                        <el-radio v-model="operation_form2.color" :label="7">白色</el-radio>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="所属分类:" label-width="100px" prop="cid">
                        <el-select clearable filterable v-model="operation_form2.cid" placeholder="可输入搜索"   style="width: 100%;">
                          <el-option  v-for="(item, index) in ornaments_class"  :label="item.name"  :value="item.id" :key="index"  >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="官方名称:" label-width="100px" prop="marketHashName">
                        <el-input v-model="operation_form2.marketHashName" placeholder="官方名称"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="饰品图片:" label-width="100px" prop="img">
                        <el-upload class="avatar-uploader" :action="server_url + '/admin.php/common/upload/filename/ornaments'" 
                                          :headers="{secret:secret,token:token}"  :show-file-list="false" :before-upload="avatar_upload2"   :on-success="avatar_success2">
                          <img v-if="operation_form2.img" :src="img_url + operation_form2.img" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="开启价格:" label-width="100px" prop="open_price">
                        <el-input type="number" v-model.number="operation_form2.open_price"  placeholder="开启价格"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="购买价格:" label-width="100px" prop="pay_price">
                        <el-input type="number" v-model.number="operation_form2.pay_price"   placeholder="购买价格"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="饰品id:" label-width="100px" prop="item_id">
                        <el-input v-model="operation_form2.item_id" placeholder="饰品id"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="商城开关:" label-width="100px" prop="status">
                        <el-radio v-model="operation_form2.status" :label="1">开启</el-radio>
                        <el-radio v-model="operation_form2.status" :label="0">关闭</el-radio>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="幸运开箱开关:" label-width="100px" prop="status2">
                        <el-radio v-model="operation_form2.status2" :label="1">开启</el-radio>
                        <el-radio v-model="operation_form2.status2" :label="0">关闭</el-radio>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
              <div style="text-align: center;">
                <el-button @click="close2">取消</el-button>
                <el-button type="primary" @click="add_submit2" v-if="operation_type2 == 'add'">保存</el-button>
                <el-button type="primary" @click="edit_submit2" v-if="operation_type2 == 'edit'">保存</el-button>
              </div>
            </el-dialog>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import {getStore, setStore} from "@/utils/store.js";
import {ttGet, ttPost, abrasion, quality, quality2, color} from "@/utils/util.js";
import website from '@/config/website';

export default {
  data() {
    return {
      server_url: this.$server_url,
      secret: website.clientSecret,
      token: getStore({name: 'login_token'}),
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
      data2: [],
      ornaments_class: [],
      query: {},
      query2: {},
      operation_title: '',
      operation_type: '',
      operation_page: false,
      operation_index: '',
      operation_row: {},
      operation_form: {
        name: '',
        marketHashName: '',
        abrasion: 1,
        quality: 1,
        color: 1,
        open_price: 0,
        pay_price: 0,
        img: '',
        item_id: '',
        cid: '',
        sort: '',
        status: 1,
        status2: 1,
        price_min: '',
        price_max: '',
        price_min2: '',
        price_max2: '',
      },
      operation_rule: {
        name: [
          {required: true, message: "请输入饰品名称", trigger: "blur"}
        ],
        cid: [
          {required: true, message: "请选择分类", trigger: "change"}
        ],
        marketHashName: [
          {required: true, message: "请输入官方名称", trigger: "blur"}
        ],
        img: [
          {required: true, message: "请上传图片", trigger: "change"}
        ],
        open_price: [
          {required: true, message: "请输入开启价格", trigger: "blur"},
          {type: 'number', message: '开启价格必须为数字'}
        ],
        pay_price: [
          {required: true, message: "请输入购买价格", trigger: "blur"},
          {type: 'number', message: '购买价格必须为数字'}
        ],
        item_id: [
          {required: true, message: "请输入饰品id", trigger: "blur"}
        ],
      },
      operation_title2: '',
      operation_type2: '',
      operation_page2: false,
      operation_index2: '',
      operation_row2: {},
      operation_form2: {
        name: '',
        marketHashName: '',
        quality2: 1,
        color: 1,
        open_price: '',
        pay_price: '',
        img: '',
        item_id: '',
        cid: '',
        sort: '',
        status: 1,
        status2: 1,
        price_min: '',
        price_max: '',
        price_min2: '',
        price_max2: '',
      },
      operation_rule2: {
        name: [
          {required: true, message: "请输入饰品名称", trigger: "blur"}
        ],
        cid: [
          {required: true, message: "请选择分类", trigger: "change"}
        ],
        marketHashName: [
          {required: true, message: "请输入官方名称", trigger: "blur"}
        ],
        img: [
          {required: true, message: "请上传图片", trigger: "change"}
        ],
        open_price: [
          {required: true, message: "请输入开启价格", trigger: "blur"},
          {type: 'number', message: '开启价格必须为数字'}
        ],
        pay_price: [
          {required: true, message: "请输入购买价格", trigger: "blur"},
          {type: 'number', message: '购买价格必须为数字'}
        ],
        item_id: [
          {required: true, message: "请输入饰品id", trigger: "blur"}
        ],
      },
    };
  },
  mounted() {
    this.get_ornaments_class();
    this.get_ornaments();
    this.get_ornaments2();
  },
  methods: {
    abrasion, quality, quality2, color,

    //获取饰品分类
    get_ornaments_class() {
      ttGet("/admin.php/common/get_ornaments_class", '', (res) => {
        if (res.code == 200) {
          this.ornaments_class = res.data.data;
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          });
        }
      });
    },

    //获取CSGO饰品
    get_ornaments() {
      let page_info = this.page_info;
      let query = this.query;
      ttGet("/admin.php/ornaments/get_ornaments", {
        page: page_info.page,
        limit: page_info.limit,
        appid: 730,
        name: query.name,
        marketHashName: query.marketHashName,
        abrasion: query.abrasion,
        quality: query.quality,
        cid: query.cid,
        sort: query.sort,
        status: query.status,
        status2: query.status2,
        price_min: query.price_min,
        price_max: query.price_max,
        price_min2: query.price_min2,
        price_max2: query.price_max2,
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
      this.get_ornaments();
    },

    //条数切换
    sizeChange(limit) {
      this.page_info.page = 1;
      this.page_info.limit = limit;
      this.loading = true;
      this.get_ornaments();
    },

    //条件搜索
    search() {
      this.page_info.page = 1;
      this.loading = true;
      this.get_ornaments();
    },

    //重置条件
    reset() {
      this.page_info.page = 1;
      this.query = {};
      this.loading = true;
      this.get_ornaments();
    },

    //添加
    add: function () {
      this.operation_form = {
        name: '',
        marketHashName: '',
        abrasion: 1,
        quality: 1,
        color: 1,
        open_price: 0,
        pay_price: 0,
        img: '',
        item_id: '',
        cid: '',
        sort: '',
        status: 1,
        status2: 1,
        price_min: '',
        price_max: '',
        price_min2: '',
        price_max2: '',
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
      ttGet("/admin.php/ornaments/get_ornaments_details", {id: operation_row.id}, (res) => {
        loading.close();
        if (res.code == 200) {
          this.operation_form = res.data.ornaments;
          this.operation_form.open_price = Number(res.data.ornaments.open_price);
          this.operation_form.pay_price = Number(res.data.ornaments.pay_price);
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
          ttPost("/admin.php/ornaments/ornaments_add", {
            appid: 730,
            name: operation_form.name,
            abrasion: operation_form.abrasion,
            quality: operation_form.quality,
            color: operation_form.color,
            cid: operation_form.cid,
            marketHashName: operation_form.marketHashName,
            open_price: operation_form.open_price,
            pay_price: operation_form.pay_price,
            img: operation_form.img,
            item_id: operation_form.item_id,
            status: operation_form.status,
            status2: operation_form.status2,
          }, (res) => {
            loading.close();
            if (res.code == 200) {
              this.page_info.page = 1;
              this.get_ornaments();
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
          ttPost("/admin.php/ornaments/ornaments_edit", {
            id: operation_row.id,
            name: operation_form.name,
            abrasion: operation_form.abrasion,
            quality: operation_form.quality,
            color: operation_form.color,
            cid: operation_form.cid,
            marketHashName: operation_form.marketHashName,
            open_price: operation_form.open_price,
            pay_price: operation_form.pay_price,
            img: operation_form.img,
            item_id: operation_form.item_id,
            status: operation_form.status,
            status2: operation_form.status2,
          }, (res) => {
            loading.close();
            if (res.code == 200) {
              this.get_ornaments();
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
        ttPost("/admin.php/ornaments/ornaments_del", {
          id: operation_row.id,
        }, (res) => {
          loading.close();
          if (res.code == 200) {
            if (this.page_info.page > 1 && this.data.length == 1) this.page_info.page -= 1;
            this.get_ornaments();
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

    //饰品搜索
    ornaments_select() {
      let name = this.operation_form.name;
      if (!name) return this.$message({
        message: '请输入饰品名称',
        type: 'warning'
      });
      let abrasion = this.operation_form.abrasion;
      let quality = this.operation_form.quality;
      let loading = this.$loading({
        text: '查询中',
        spinner: "el-icon-loading"
      });
      ttGet("/admin.php/ornaments/ornaments_select", {
        name: name,
        abrasion: abrasion,
        quality: quality,
      }, (res) => {
        loading.close();
        if (res.code == 200) {
          this.operation_form.name = res.data.name;
          this.operation_form.marketHashName = res.data.marketHashName;
          this.operation_form.open_price = res.data.open_price;
          this.operation_form.pay_price = res.data.pay_price;
          this.operation_form.color = res.data.color;
          this.operation_form.item_id = res.data.item_id;
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
      });
    },

    //获取DOTA饰品
    get_ornaments2() {
      let page_info2 = this.page_info2;
      let query2 = this.query2;
      ttGet("/admin.php/ornaments/get_ornaments", {
        page: page_info2.page,
        limit: page_info2.limit,
        appid: 570,
        name: query2.name,
        marketHashName: query2.marketHashName,
        quality2: query2.quality2,
        cid: query2.cid,
        sort: query2.sort,
        status: query2.status,
        status2: query2.status2,
        price_min: query2.price_min,
        price_max: query2.price_max,
        price_min2: query2.price_min2,
        price_max2: query2.price_max2,
      }, (res) => {
        this.loading2 = false;
        if (res.code == 200) {
          this.data2 = res.data.data.data;
          this.page_info2.total = res.data.data.count;
          let height = 50 + 80 * (res.data.data.data.length ? res.data.data.data.length : 1);
          this.$refs.table2.$el.style.height = height + 'px';
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          });
        }
      });
    },

    //分页切换
    currentChange2(page) {
      this.page_info2.page = page;
      this.loading2 = true;
      this.get_ornaments2();
    },

    //条数切换
    sizeChange2(limit) {
      this.page_info2.page = 1;
      this.page_info2.limit = limit;
      this.loading2 = true;
      this.get_ornaments2();
    },

    //条件搜索
    search2() {
      this.page_info2.page = 1;
      this.loading2 = true;
      this.get_ornaments2();
    },

    //重置条件
    reset2() {
      this.page_info2.page = 1;
      this.query2 = {};
      this.loading2 = true;
      this.get_ornaments2();
    },

    //添加
    add2: function () {
      this.operation_form2 = {
        name: '',
        marketHashName: '',
        quality2: 1,
        color: 1,
        open_price: '',
        pay_price: '',
        img: '',
        item_id: '',
        cid: '',
        sort: '',
        status: 1,
        status2: 1,
        price_min: '',
        price_max: '',
        price_min2: '',
        price_max2: '',
      };
      this.operation_title2 = '添加';
      this.operation_type2 = 'add';
      this.operation_page2 = true;
    },

    //编辑
    edit2(operation_index, operation_row) {
      let loading = this.$loading({
        text: '查询中',
        spinner: "el-icon-loading"
      });
      ttGet("/admin.php/ornaments/get_ornaments_details", {id: operation_row.id}, (res) => {
        loading.close();
        if (res.code == 200) {
          this.operation_form2 = res.data.ornaments;
          this.operation_form2.open_price = Number(res.data.ornaments.open_price);
          this.operation_form2.pay_price = Number(res.data.ornaments.pay_price);
          this.operation_title2 = '编辑';
          this.operation_type2 = 'edit';
          this.operation_page2 = true;
          this.operation_index2 = operation_index;
          this.operation_row2 = operation_row;
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          });
        }
      });
    },

    //关闭操作窗口
    close2() {
      this.operation_page2 = false;
    },

    //添加提交数据
    add_submit2() {
      this.$refs.operation_form2.validate(valid => {
        if (valid) {
          let operation_form2 = this.operation_form2;
          let loading = this.$loading({
            text: '提交中',
            spinner: "el-icon-loading"
          });
          ttPost("/admin.php/ornaments/ornaments_add", {
            appid: 570,
            name: operation_form2.name,
            quality2: operation_form2.quality2,
            color: operation_form2.color,
            cid: operation_form2.cid,
            marketHashName: operation_form2.marketHashName,
            open_price: operation_form2.open_price,
            pay_price: operation_form2.pay_price,
            img: operation_form2.img,
            item_id: operation_form2.item_id,
            status: operation_form2.status,
            status2: operation_form2.status2,
          }, (res) => {
            loading.close();
            if (res.code == 200) {
              this.page_info2.page = 1;
              this.get_ornaments2();
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
      });
    },

    //编辑提交数据
    edit_submit2() {
      this.$refs.operation_form2.validate(valid => {
        if (valid) {
          let operation_index2 = this.operation_index2;
          let operation_row2 = this.operation_row2;
          let operation_form2 = this.operation_form2;
          let loading = this.$loading({
            text: '提交中',
            spinner: "el-icon-loading"
          });
          ttPost("/admin.php/ornaments/ornaments_edit", {
            id: operation_row2.id,
            name: operation_form2.name,
            quality2: operation_form2.quality2,
            color: operation_form2.color,
            cid: operation_form2.cid,
            marketHashName: operation_form2.marketHashName,
            open_price: operation_form2.open_price,
            pay_price: operation_form2.pay_price,
            img: operation_form2.img,
            item_id: operation_form2.item_id,
            status: operation_form2.status,
            status2: operation_form2.status2,
          }, (res) => {
            loading.close();
            if (res.code == 200) {
              this.get_ornaments2();
              this.data2[operation_index2] = operation_form2;
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
      });
    },

    //删除
    del2(operation_index, operation_row) {
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let loading = this.$loading({
          text: '提交中',
          spinner: "el-icon-loading"
        });
        ttPost("/admin.php/ornaments/ornaments_del", {
          id: operation_row.id,
        }, (res) => {
          loading.close();
          if (res.code == 200) {
            if (this.page_info2.page > 1 && this.data2.length == 1) this.page_info2.page -= 1;
            this.get_ornaments2();
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
      }).catch(() => {
      });
    },

    //图片上传检查
    avatar_upload2(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isLt2M;
    },

    //图片上传成功
    avatar_success2(res, file) {
      if (res.code == 200) {
        this.operation_form2.img = res.data.img;
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

    //饰品搜索
    ornaments_select2() {
      let name = this.operation_form2.name;
      if (!name) return this.$message({
        message: '请输入饰品名称',
        type: 'warning'
      });
      let quality2 = this.operation_form2.quality2;
      let loading = this.$loading({
        text: '查询中',
        spinner: "el-icon-loading"
      });
      ttGet("/admin.php/ornaments/ornaments_select2", {
        name: name,
        quality2: quality2,
      }, (res) => {
        loading.close();
        if (res.code == 200) {
          this.operation_form2.name = res.data.name;
          this.operation_form2.marketHashName = res.data.marketHashName;
          this.operation_form2.open_price = res.data.open_price;
          this.operation_form2.pay_price = res.data.pay_price;
          this.operation_form2.color = res.data.color;
          this.operation_form2.item_id = res.data.item_id;
          this.operation_form2.img = res.data.img;
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

    //一键更新价格
    contrast(type, appid) {
      let ornaments_arr = [];
      if (appid == 730){
        ornaments_arr = this.$refs.table.selection;
      } else {
        ornaments_arr = this.$refs.table2.selection;
      }
      if (ornaments_arr.length == 0){
        return this.$message({
          message: '最少选择一条数据更新',
          type: 'warning'
        });
      }
      let id_arr = [];
      for (let x in ornaments_arr){
        id_arr.push(ornaments_arr[x].id);
      }
      this.$prompt('请输入底价倍数', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: 1.05
      }).then(({value}) => {
        if (!value){
          return this.$message({
            message: '请输入底价倍数',
            type: 'warning'
          });
        }
        let loading = this.$loading({
          text: '更新中',
          spinner: "el-icon-loading"
        });
        ttPost("/admin.php/ornaments/ornaments_contrast", {id_arr: id_arr, type: type, value: value, appid: appid}, (res) => {
          loading.close();
          if (res.code == 200) {
            this.page_info.page = 1;
            this.get_ornaments();
            this.page_info2.page = 1;
            this.get_ornaments2();
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

    //赠送饰品
    give(appid) {
      let ornaments_arr = [];
      if (appid == 730){
        ornaments_arr = this.$refs.table.selection;
      } else {
        ornaments_arr = this.$refs.table2.selection;
      }
      if (ornaments_arr.length == 0){
        return this.$message({
          message: '最少选择一条饰品赠送',
          type: 'warning'
        });
      }
      let id_arr = [];
      for (let x in ornaments_arr){
        id_arr.push(ornaments_arr[x].id);
      }
      this.$prompt('请输入用户ID或手机号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        if (!value){
          return this.$message({
            message: '请输入用户id或手机号',
            type: 'warning'
          });
        }
        let loading = this.$loading({
          text: '发送中',
          spinner: "el-icon-loading"
        });
        ttPost("/admin.php/ornaments/ornaments_give", {id_arr: id_arr, value: value}, (res) => {
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

.row-expand-unhas .el-table__expand-column {
  pointer-events: none;
}

.row-expand-unhas .el-table__expand-column .el-icon {
  visibility: hidden;
}
</style>
