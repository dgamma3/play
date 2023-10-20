<template>
  <div style="height: 100%;width: 100%;background-color: #FFFFFF;overflow: hidden;">
    <div style="background-color: #FFFFFF;height: 100%;overflow: hidden;">
      <div style="margin: 20px 10px 0 10px;">
        <el-tabs value="tab1" type="card">
          <el-tab-pane label="基本设置" name="tab1">
            <div style="margin: 0 20px;">
              <el-form
                ref="operation_form"
                :rules="operation_rule"
                :model="operation_form">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="网站开启状态:" label-width="100px" prop="status">
                      <el-switch v-model="operation_form.status"
                              active-value="1"
                              inactive-value="0"
                        />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="充值开启状态:" label-width="100px" prop="czstatus">
                      <el-switch v-model="operation_form.czstatus"
                              active-value="1"
                              inactive-value="0"
                        />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="提货开启状态:" label-width="100px" prop="txstatus">
                      <el-switch v-model="operation_form.txstatus"
                              active-value="1"
                              inactive-value="0"
                        />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="网站名称:" label-width="100px" prop="web_name">
                      <el-input v-model="operation_form.web_name" placeholder="饰品名称"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="网站logo:" label-width="100px" prop="logo">
                      <div style="display: flex;">
                        <el-upload
                          class="avatar-uploader"
                          :action="server_url + '/admin.php/common/upload/filename/site'"
                          :headers="{secret:secret,token:token}"
                          :show-file-list="false"
                          :before-upload="avatar_upload"
                          :on-success="avatar_success">
                          <img v-if="operation_form.logo" :src="img_url + operation_form.logo" class="avatar"
                               style="width: 200px;height: 50px;">
                          <i v-else class="el-icon-plus avatar-uploader-icon"
                             style="width: 200px;height: 50px;line-height: 50px;"></i>
                        </el-upload>
                        <div style="margin-left: 20px;">网站logo (200px * 45px)</div>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="地址栏ico:" label-width="100px" prop="ico">
                      <div style="display: flex;">
                        <el-upload
                          class="avatar-uploader"
                          :action="server_url + '/admin.php/common/upload/filename/site'"
                          :headers="{secret:secret,token:token}"
                          :show-file-list="false"
                          :before-upload="avatar_upload"
                          :on-success="avatar_success2">
                          <img v-if="operation_form.ico" :src="img_url + operation_form.ico" class="avatar"
                               style="width: 50px;height: 50px;">
                          <i v-else class="el-icon-plus avatar-uploader-icon"
                             style="width: 50px;height: 50px;line-height: 50px;"></i>
                        </el-upload>
                        <div style="margin-left: 20px;">浏览器地址栏小图标 (32px * 32px)</div>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="网站头像:" label-width="100px" prop="head">
                      <div style="display: flex;">
                        <el-upload
                          class="avatar-uploader"
                          :action="server_url + '/admin.php/common/upload/filename/site'"
                          :headers="{secret:secret,token:token}"
                          :show-file-list="false"
                          :before-upload="avatar_upload"
                          :on-success="avatar_success3">
                          <img v-if="operation_form.head" :src="img_url + operation_form.head" class="avatar"
                               style="width: 80px;height: 80px;">
                          <i v-else class="el-icon-plus avatar-uploader-icon"
                             style="width: 80px;height: 80px;line-height: 80px;"></i>
                        </el-upload>
                        <div style="margin-left: 20px;">网站头像 用于邮箱注册用户和Roll官方头像 (100px * 100px)</div>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="网站关键词:" label-width="100px" prop="keywords">
                      <el-input type="textarea" rows="4" v-model="operation_form.keywords"
                                placeholder="网站关键词"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="网站描述:" label-width="100px" prop="description">
                      <el-input type="textarea" rows="4" v-model="operation_form.description"
                                placeholder="网站关键词"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="网站公告:" label-width="100px" prop="notice">
                      <el-input type="textarea" rows="4" v-model="operation_form.notice"
                                placeholder="网站公告"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="跳转QQ群:" label-width="100px" prop="qq_group">
                      <el-input type="text" rows="4" v-model="operation_form.qq_group"
                                placeholder="跳转QQ群代码"></el-input>
                      <div><a href="https://qun.qq.com/join.html" target="_blank" style="color: #409eff;">获取QQ群跳转代码</a></div>
                      <div>第一步: 选择你创建的群</div>
                      <div>第二步: 在网页代码里面复制href=""里面的内容 注意!不要双引号</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="跳转QQ客服:" label-width="100px" prop="qq_kefu">
                      <el-input type="text" rows="4" v-model="operation_form.qq_kefu"
                                placeholder="QQ客服号码"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="20">
                    <el-form-item label="备案信息:" label-width="100px" prop="icp">
                      <vue-ueditor-wrap v-model="operation_form.icp" :config="ue_config"></vue-ueditor-wrap>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <div style="margin-left: 120px;margin-bottom: 20px;">
              <el-button type="primary" @click="set(1)">保存</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="详细设置" name="tab2">
            <div style="margin: 0 20px;">
              <el-form
                ref="operation_form2"
                :rules="operation_rule"
                :model="operation_form">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="货币符号:" label-width="100px" prop="symbol">
                      <el-input v-model="operation_form.symbol" placeholder="货币符号"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="Steam秘钥:" label-width="100px" prop="steam_key">
                      <el-input v-model="operation_form.steam_key" placeholder="Steam秘钥"></el-input>
                      <div>用于Steam快捷登录 <a href="https://steamcommunity.com/dev/apikey" target="_blank" style="color: #409eff;">点击去获取Steam 网页 API 密钥</a></div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="ZBTApiKey:" label-width="100px" prop="zbt_key">
                      <el-input v-model="operation_form.zbt_key" placeholder="ZBTApiKey"></el-input>
                      <div>用于添加饰品,比价,发货等功能 <a href="https://www.zbt.com/cn/user/development.html" target="_blank" style="color: #409eff;">点击去申请ZBT APIKey</a></div>
                      <div>通知地址: <span style="color: #f23e3e;">{{server_url}}/common.php/call_back/offer_back</span></div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="盲盒开箱:" label-width="100px" prop="ranking_reward1">
                      <el-input v-model="operation_form.ranking_reward1" placeholder="盲盒开箱排行奖励"></el-input>
                      <div>每日排行奖励通知地址: <span style="color: #f23e3e;">{{server_url}}/common.php/call_back/list_settlement</span></div>
                      <div>排行1~10名的奖励,"|"隔开 例:100|50|50|20|20|10|10|10|10|10</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="幸运开箱:" label-width="100px" prop="ranking_reward2">
                      <el-input v-model="operation_form.ranking_reward2" placeholder="幸运开箱排行奖励"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="对战开箱:" label-width="100px" prop="ranking_reward3">
                      <el-input v-model="operation_form.ranking_reward3" placeholder="对战开箱排行奖励"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="充值汇率:" label-width="100px" prop="recharge_exchange_rate">
                      <el-input v-model="operation_form.recharge_exchange_rate" placeholder="充值汇率"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="百分比失败奖励:" label-width="150px" prop="web_name">
                      <el-select v-model="operation_form.lucky_unknown_id" multiple placeholder="请选择(可多选)" style="width: 100%;">
                        <el-option
                          v-for="(item, index) in ornaments"
                          :label="item.name + '(￥ ' + item.open_price + ')'"
                          :value="String(item.id)"
                          :key="index"
                          >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="对战失败奖励:" label-width="150px" prop="web_name">
                      <el-select v-model="operation_form.battle_unknown_id" multiple placeholder="请选择(可多选)" style="width: 100%;">
                        <el-option
                          v-for="(item, index) in ornaments"
                          :label="item.name + '(￥ ' + item.open_price + ')'"
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
            <div style="margin-left: 120px;margin-bottom: 20px;">
              <el-button type="primary" @click="set(2)">保存</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="短信接口" name="tab3">
            <div style="margin: 0 20px;">
              <el-form
                ref="operation_form3"
                :rules="operation_rule"
                :model="operation_form">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="短信标签:" label-width="100px" prop="message_template_label">
                      <el-input v-model="operation_form.message_template_label" placeholder="短信标签"></el-input>
                      <div><a href="http://www.smsbao.com" target="_blank" style="color: #409eff;">点击去注册短信宝</a></div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="短信账号:" label-width="100px" prop="message_user">
                      <el-input v-model="operation_form.message_user" placeholder="短信账号"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="短信密码:" label-width="100px" prop="message_pass">
                      <el-input type="password" v-model="operation_form.message_pass" placeholder="短信密码"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <div style="margin-left: 120px;margin-bottom: 20px;">
              <el-button type="primary" @click="set(3)">保存</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="支付接口" name="tab4">
            <div style="margin: 0 20px;">
              <el-form
                ref="operation_form4"
                :rules="operation_rule"
                :model="operation_form">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="支付网关:" label-width="100px" prop="z1_gateway">
                      <el-input v-model="operation_form.z1_gateway" placeholder="支付网关"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="商户号:" label-width="100px" prop="z1_merchant">
                      <el-input v-model="operation_form.z1_merchant" placeholder="商户号"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="商户支付密钥:" label-width="100px" prop="z1_merchant_key">
                      <el-input type="password" v-model="operation_form.z1_merchant_key" placeholder="商户支付密钥"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="商户回调验签密钥:" label-width="100px" prop="z1_merchant_callback_key">
                      <el-input type="password" v-model="operation_form.z1_merchant_callback_key" placeholder="商户回调验签密钥"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <div style="margin-left: 120px;margin-bottom: 20px;">
              <el-button type="primary" @click="set(4)">保存</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="自动开箱" name="tab5">
            <div style="margin: 0 20px;">
              <el-form
                ref="operation_form5"
                :rules="operation_rule"
                :model="operation_form">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="机器人开关:" label-width="100px" prop="robot_open">
                      <el-switch
                        v-model="operation_form.robot_open"
                        active-text="开启"
                        :active-value="1"
                        inactive-text="关闭"
                        :inactive-value="0">
                      </el-switch>
                      <div>机器人自动开箱定时任务链接: <span style="color: #f23e3e;">{{server_url}}/common.php/call_back/box_robot</span></div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="机器人用户:" label-width="100px" prop="robot_uid_arr">
                      <el-select v-model="operation_form.robot_uid_arr" multiple placeholder="请选择(可多选)" style="width: 100%;">
                        <el-option
                          v-for="(item, index) in robot"
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
            <div style="margin-left: 120px;margin-bottom: 20px;">
              <el-button type="primary" @click="set(5)">保存</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
  import {getStore, setStore} from "@/utils/store.js";
  import {ttGet, ttPost, htmlEncode, htmlDecode} from "@/utils/util.js";
  import website from '@/config/website';
  import VueUeditorWrap from 'vue-ueditor-wrap'; //编辑器

  export default {
    components: {
      VueUeditorWrap
    },
    data() {
      return {
        ue_config: {
          zIndex: 9999,
          // 编辑器不自动被内容撑高
          autoHeightEnabled: false,
          // 初始容器高度
          initialFrameHeight: 300,
          // 初始容器宽度
          initialFrameWidth: '100%',
          // 上传文件接口
          serverUrl: this.$server_url + '/common.php/common/ue_uploads',
          // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
          UEDITOR_HOME_URL: '/static/UEditor/'
        },
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
        data: [],
        query: {},
        operation_title: '',
        operation_type: '',
        operation_page: false,
        operation_index: '',
        operation_row: {},
        operation_form: {
          web_name: '',
          logo: '',
          ico: '',
          head: '',
          keywords: '',
          description: '',
          notice: '',
          qq_group: '',
          qq_kefu: '',
          icp: '',
          symbol: '',
          steam_key: '',
          zbt_key: '',
          ranking_reward1: '',
          ranking_reward2: '',
          ranking_reward3: '',
          recharge_exchange_rate: '',
          lucky_unknown_id: [],
          battle_unknown_id: [],
          message_template_label: '',
          message_user: '',
          message_pass: '',
          z1_gateway: '',
          z1_merchant: '',
          z1_merchant_key: '',
          z1_merchant_callback_key: '',
          robot_open: '',
          robot_uid_arr: [],
        },
        operation_rule: {
          web_name: [
            {required: true, message: "请输入网站名称", trigger: "blur"}
          ],
          logo: [
            {required: true, message: "请上传图片", trigger: "change"}
          ],
          ico: [
            {required: true, message: "请上传图片", trigger: "change"}
          ],
          head: [
            {required: true, message: "请上传图片", trigger: "change"}
          ],
          keywords: [
            {required: true, message: "请输入网站关键词", trigger: "blur"}
          ],
          description: [
            {required: true, message: "请输入网站描述", trigger: "blur"}
          ],
          icp: [
            {required: true, message: "请输入备案信息", trigger: "blur"}
          ],
          symbol: [
            {required: true, message: "请输入货币符号", trigger: "blur"}
          ],
          steam_key: [
            {required: true, message: "请输入Steam秘钥", trigger: "blur"}
          ],
          zbt_key: [
            {required: true, message: "请输入ZBTApiKey", trigger: "blur"}
          ],
          recharge_exchange_rate: [
            {required: true, message: "请输入充值汇率", trigger: "blur"}
          ],
          lucky_unknown_id: [
            {required: true, message: "请选择百分比失败奖励", trigger: "change"}
          ],
          battle_unknown_id: [
            {required: true, message: "请选择对战失败奖励", trigger: "change"}
          ],
          message_template_label: [
            {required: true, message: "请输入短信模板标签", trigger: "blur"}
          ],
          message_user: [
            {required: true, message: "请输入短信账号", trigger: "blur"}
          ],
          message_pass: [
            {required: true, message: "请输入短信密码", trigger: "blur"}
          ],
        },
        ornaments: [],
        robot: [],
      };
    },
    mounted() {
      this.get_site();
    },
    methods: {
      //获取基本设置
      get_site() {
        ttGet("/admin.php/system/get_site", '', (res) => {
          if (res.code == 200) {
            this.operation_form = res.data.data;
            this.operation_form.status = this.operation_form.status.toString();
            this.operation_form.czstatus = this.operation_form.czstatus.toString();
            this.operation_form.txstatus = this.operation_form.txstatus.toString();
            this.operation_form.icp = htmlDecode(res.data.data.icp);
            this.ornaments = res.data.ornaments;
            this.robot = res.data.robot;
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        });
      },

      //保存修改
      set(type) {
        switch (type) {
          case 1: //基本设置
            this.$refs.operation_form.validate(valid => {
              if (valid) {
                let operation_form = this.operation_form;
                let loading = this.$loading({
                  text: '提交中',
                  spinner: "el-icon-loading"
                });
                ttPost("/admin.php/system/site_edit", {
                  type: type,
                  web_name: operation_form.web_name,
                  status: operation_form.status,
                  czstatus: operation_form.czstatus,
                  txstatus: operation_form.txstatus,
                  logo: operation_form.logo,
                  ico: operation_form.ico,
                  head: operation_form.head,
                  keywords: operation_form.keywords,
                  description: operation_form.description,
                  notice: operation_form.notice,
                  qq_group: operation_form.qq_group,
                  qq_kefu: operation_form.qq_kefu,
                  icp: htmlEncode(operation_form.icp),
                }, (res) => {
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
              }
            });
            break;
          case 2: //详细设置
            this.$refs.operation_form2.validate(valid => {
              if (valid) {
                let operation_form = this.operation_form;
                let loading = this.$loading({
                  text: '提交中',
                  spinner: "el-icon-loading"
                });
                ttPost("/admin.php/system/site_edit", {
                  type: type,
                  symbol: operation_form.symbol,
                  steam_key: operation_form.steam_key,
                  zbt_key: operation_form.zbt_key,
                  ranking_reward1: operation_form.ranking_reward1,
                  ranking_reward2: operation_form.ranking_reward2,
                  ranking_reward3: operation_form.ranking_reward3,
                  recharge_exchange_rate: operation_form.recharge_exchange_rate,
                  lucky_unknown_id: operation_form.lucky_unknown_id,
                  battle_unknown_id: operation_form.battle_unknown_id,
                }, (res) => {
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
              }
            });
            break;
          case 3: //短信接口
            this.$refs.operation_form3.validate(valid => {
              if (valid) {
                let operation_form = this.operation_form;
                let loading = this.$loading({
                  text: '提交中',
                  spinner: "el-icon-loading"
                });
                ttPost("/admin.php/system/site_edit", {
                  type: type,
                  message_template_label: operation_form.message_template_label,
                  message_user: operation_form.message_user,
                  message_pass: operation_form.message_pass,
                }, (res) => {
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
              }
            });
            break;
          case 4: //支付接口
            this.$refs.operation_form4.validate(valid => {
              if (valid) {
                let operation_form = this.operation_form;
                let loading = this.$loading({
                  text: '提交中',
                  spinner: "el-icon-loading"
                });
                ttPost("/admin.php/system/site_edit", {
                  type: type,
                  z1_gateway: operation_form.z1_gateway,
                  z1_merchant: operation_form.z1_merchant,
                  z1_merchant_key: operation_form.z1_merchant_key,
                  z1_merchant_callback_key: operation_form.z1_merchant_callback_key,
                }, (res) => {
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
              }
            });
            break;
          case 5: //自动开箱
            this.$refs.operation_form5.validate(valid => {
              if (valid) {
                let operation_form = this.operation_form;
                let loading = this.$loading({
                  text: '提交中',
                  spinner: "el-icon-loading"
                });
                ttPost("/admin.php/system/site_edit", {
                  type: type,
                  robot_open: operation_form.robot_open,
                  robot_uid_arr: operation_form.robot_uid_arr,
                }, (res) => {
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
              }
            });
            break;
          default:
            this.$message({
              message: '数据错误!',
              type: 'warning'
            });
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
          this.operation_form.logo = res.data.img;
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

      //图片上传成功
      avatar_success2(res, file) {
        if (res.code == 200) {
          this.operation_form.ico = res.data.img;
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

      //图片上传成功
      avatar_success3(res, file) {
        if (res.code == 200) {
          this.operation_form.head = res.data.img;
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
    }
  };
</script>

<style lang="scss" scoped>
  .avatar-uploader {
    text-align: left;
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

  .edui-default .edui-editor {
    top: 193px !important;
  }
</style>
