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
        <div style="display: flex;margin: 0 20px 10px 20px;">
        <el-button
          size="medium"
          type="primary"
          @click.stop="add">
          添加
        </el-button>
        <el-button
          size="medium"
          type="primary"
          @click.stop="add_more">
          批量添加
        </el-button>
        <el-button
          size="medium"
          type="primary"
          @click.stop="del_all">
          清理未使用
        </el-button>
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
              prop="id"
              label="id"
              min-width="80"
              >

            </el-table-column>

            <el-table-column
              align="center"
              prop="cdkey"
              label="cdkey"
              min-width="180"
              >
              <template slot-scope="d">
                <div>{{d.row.cdkey}} <span style="margin-left:30px;cursor: pointer;" @click="doCopy(d.row.cdkey)">复制</span></div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="username"
              label="操作账号"
              min-width="100"
              >

            </el-table-column>
            <el-table-column
              align="center"
              prop="money"
              label="充值金额"
              min-width="120"
              >

            </el-table-column>
            <el-table-column
              align="center"
              prop="give"
              label="赠送金额"
              min-width="80"
              >

            </el-table-column>
            <el-table-column
              align="center"
              prop="uid"
              label="领取人信息"
              min-width="80"
              >
              <template slot-scope="d">
                <div v-if="d.row.uid != null && d.row.uid != ''" style="display: flex;">
                  <div style="margin-left: 15px;text-align: left;">
                    <div>账号id: {{ d.row.uid }}</div>
                    <div>账号名: {{ d.row.name}}</div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="status"
              label="状态"
              min-width="80"
              >
              <template slot-scope="d">
                <div v-if="d.row.status == 1">已领取</div>
                <div v-else>未领取</div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="create_time"
              label="创建时间"
              min-width="120"
              >
            </el-table-column>
            <el-table-column
              align="center"
              prop="completed_time"
              label="结束时间"
              min-width="120"
              >
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="120">
              <template slot-scope="d">
                <el-button
                  size="mini"
                  type="primary"
                  @click.stop="edit(d.$index, d.row)">编辑
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
      width="30%">
      <div style="margin: 0 20px;">
        <el-form
          ref="operation_form"
          :rules="operation_rule"
          :model="operation_form">
          <el-row>
            <el-col :span="24">
              <el-form-item label="金额" label-width="100px" prop="money">
                <el-input-number v-model="operation_form.money" min="0"></el-input-number>
              </el-form-item>
              <el-form-item label="赠送" label-width="100px" prop="give">
                  <el-input-number v-model="operation_form.give"  min="0" :precision="2"></el-input-number>
                </el-input>
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
      :title="operation_title"
      append-to-body
      :visible.sync="operation_more_page"
      width="30%">
      <div style="margin: 0 20px;">
        <el-form
          ref="operation_form"
          :rules="operation_more_rule"
          :model="operation_more_form">
          <el-row>
            <el-col :span="24">
              <el-form-item label="金额" label-width="100px" prop="money">
                <el-input-number v-model="operation_more_form.money" min="0"></el-input-number>
              </el-form-item>
              <el-form-item label="赠送" label-width="100px" prop="give">
                  <el-input-number v-model="operation_more_form.give"  min="0" :precision="2"></el-input-number>
                </el-input>
              </el-form-item>
              <el-form-item label="数量" label-width="100px" prop="nums">
                  <el-input-number v-model="operation_more_form.nums"  min="1"></el-input-number>
                </el-input>
              </el-form-item>
              <el-form-item label="key位数" label-width="100px" prop="keynums">
                  <el-input-number v-model="operation_more_form.keynums"  min="8"></el-input-number>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>


        </el-form>
      </div>
      <div style="text-align: center;">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="add_more_submit" v-if="operation_type == 'add'">保存</el-button>
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
        operation_title: '',
        operation_type: '',
        operation_page: false,
        operation_more_page:false,
        operation_form: {
          money:0,
          give:0,
        },

        operation_more_form: {
          money:0,
          give:0,
          nums:1,
          keynums:1,
        },
        operation_rule: {
          money: [
            {required: true, message: "请输入金额", trigger: "blur"}
          ],
        },
        operation_more_rule: {
          money: [
            {required: true, message: "请输入金额", trigger: "blur"}
          ],
        },
      };
    },
    mounted() {
      this.get_record();
    },
    methods: {
      repair, abrasion, quality, quality2,

      //获取佣金记录
      get_record() {
        let page_info = this.page_info;
        let query = this.query;
        ttGet("/admin.php/cdk/get_cdk_record", {
          page: page_info.page,
          limit: page_info.limit,
          info: query.info,
        }, (res) => {
          this.loading = false;
          if (res.code == 200) {
            this.data = res.data.data.data;
            this.page_info.total = res.data.data.count;
            //let height = 50 + 61 * (res.data.data.length ? res.data.data.length : 1);
            //this.$refs.table.$el.style.height = height + 'px';
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
        this.get_record();
      },

      //条数切换
      sizeChange(limit) {
        this.page_info.page = 1;
        this.page_info.limit = limit;
        this.loading = true;
        this.get_record();
      },

      //条件搜索
      search() {
        this.page_info.page = 1;
        this.loading = true;
        this.get_record();
      },

      //重置条件
      reset() {
        this.page_info.page = 1;
        this.query = {};
        this.loading = true;
        this.get_record();
      },

			//复制
			doCopy(content){
				var that = this;
				const dom = document.createElement("textarea");
				dom.value = content;
				document.body.appendChild(dom);
				dom.select();
				document.execCommand("copy");
				document.body.removeChild(dom);
        this.$message({
          message: '已复制',
          type: 'success'
        });
			},

      //关闭操作窗口
      close() {
        this.operation_page = false;

        this.operation_more_page = false;
      },
      //添加
      add() {
        this.operation_form = {
          money: '',
          give: '',
        };
        this.operation_title = '添加';
        this.operation_type = 'add';
        this.operation_page = true;
      },
      //添加
      add_more() {
        this.operation_form = {
          money: '',
          give: '',
        };
        this.operation_title = '添加';
        this.operation_type = 'add';
        this.operation_more_page = true;
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
            ttPost("/admin.php/cdk/cdk_add", {
              money: operation_form.money,
              give: operation_form.give,
            }, (res) => {
              loading.close();
              if (res.code == 200) {
                this.operation_page = false;
                this.$message({
                  message: res.msg,
                  type: 'success'
                });
                this.get_record();
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
      //添加提交数据
      edit_submit() {
        this.$refs.operation_form.validate(valid => {
          if (valid) {
            let operation_form = this.operation_form;
            let loading = this.$loading({
              text: '提交中',
              spinner: "el-icon-loading"
            });
            ttPost("/admin.php/cdk/cdk_edit", {
              id: operation_form.id,
              money: operation_form.money,
              give: operation_form.give,
            }, (res) => {
              loading.close();
              if (res.code == 200) {
                this.operation_page = false;
                this.$message({
                  message: res.msg,
                  type: 'success'
                });
                this.get_record();
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

      //编辑
      edit(operation_index, operation_row) {
        let loading = this.$loading({
          text: '查询中',
          spinner: "el-icon-loading"
        });
        ttGet("/admin.php/cdk/get_cdk_details", {id: operation_row.id}, (res) => {
          loading.close();
          if (res.code == 200) {
            this.operation_form = res.data.cdk;
            this.operation_title = '编辑';
            this.operation_type = 'edit';
            this.operation_page = true;
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        });
      },

      //添加提交数据
      add_more_submit() {
        this.$refs.operation_form.validate(valid => {
          if (valid) {
            let operation_form = this.operation_more_form;
            let loading = this.$loading({
              text: '提交中',
              spinner: "el-icon-loading"
            });
            ttPost("/admin.php/cdk/cdk_more_add", {
              money: operation_form.money,
              give: operation_form.give,
              nums: operation_form.nums,
              keynums: operation_form.keynums,
            }, (res) => {
              loading.close();
              if (res.code == 200) {
                this.operation_more_page = false;
                this.$message({
                  message: res.msg,
                  type: 'success'
                });
                this.get_record();
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
      del_all(){
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            ttPost("/admin.php/cdk/cdk_del_all", {
            }, (res) => {
              if (res.code == 200) {

                this.$message({
                  message: res.msg,
                  type: 'success'
                });
                this.get_record();
              } else {
                this.$message({
                  message: res.msg,
                  type: 'warning'
                });
              }
            });
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
