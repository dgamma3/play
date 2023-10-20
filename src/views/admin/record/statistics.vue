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
                <el-button size="medium" type="primary" icon="el-icon-search" @click="search">搜索
                </el-button>
                <el-button size="medium" icon="el-icon-delete" @click="reset">重置
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="display: flex;margin: 0 20px 10px 20px;">
          <el-button size="medium" type="primary" @click.stop="get_record">
            刷新
          </el-button>


        </div>
      </div>

      <div style="margin: 0 20px;overflow: auto;padding-bottom: 20px;">
        <template>

          <el-table v-loading="loading" :data="data" border height="100%" ref="table"
            :header-cell-style="{backgroundColor: '#fafafa',color:'#333333',fontWeight:'400',textAlign:'center'}"
            :row-style="{color:'#333333',fontWeight:'400',height:50+'px',textAlign:'center'}"
            :cell-style="{padding:5+'px'}" style="width: 100%;font-size: 14px;">
            <el-table-column align="center" type="selection" width="55">
            </el-table-column>


            <el-table-column align="center" label="账号" min-width="50">
              <template slot-scope="scope">
                <div>{{ scope.row.id }}</div>
                <div style="white-space: nowrap;text-overflow: ellipsis;">{{ scope.row.name }}</div>
              </template>
            </el-table-column>


            <el-table-column align="" label="亏损" min-width="60">
              <template slot-scope="scope">
                <div>总：{{ scope.row.all_balance }}</div>
                <div>上：{{ scope.row.last_balance }}</div>
                <div>月：{{ scope.row.balance }}</div>
                <div>今：{{ scope.row.today_balance }}</div>
              </template>
            </el-table-column>


            <el-table-column align="" label="充值/提取" min-width="100">
              <template slot-scope="scope">
                <div>总：{{ scope.row.all_in_cz }} / {{ scope.row.all_out_tq }}</div>
                <div>上：{{ scope.row.last_in_cz }} / {{ scope.row.last_out_tq }}</div>
                <div>月：{{ scope.row.in_cz }} / {{ scope.row.out_tq }}</div>
                <div>今：{{ scope.row.today_in_cz }} / {{ scope.row.today_out_tq }}</div>
              </template>
            </el-table-column>

            <el-table-column align="" label="包金钻战" min-width="60">
              <template slot-scope="scope">
                <div>包：{{ scope.row.bag }}</div>
                <div>金：{{ scope.row.bean }}</div>
                <div>钻：{{ scope.row.store_bean }}</div>
                <div>战：{{ scope.row.today_power }}</div>
              </template>
            </el-table-column>
            <el-table-column align="" label="开箱支出/收入" min-width="120">
              <template slot-scope="scope">
                <div>总：{{ scope.row.all_kx_100 }} / {{ scope.row.all_out_kx }} / {{ scope.row.all_in_kx }}</div>
                <div>上：{{ scope.row.last_month_kx_100 }} / {{ scope.row.last_out_kx }} / {{ scope.row.last_in_kx }}
                </div>
                <div>月：{{ scope.row.month_kx_100 }} / {{ scope.row.out_kx }} / {{ scope.row.in_kx }}</div>
                <div>今：{{ scope.row.today_kx_100 }} / {{ scope.row.today_out_kx }} / {{ scope.row.today_in_kx }}</div>
              </template>
            </el-table-column>
            <el-table-column align="" label="对战支出/收入" min-width="130">
              <template slot-scope="scope">
                <div>总：{{ scope.row.all_dz_100 }} / {{ scope.row.all_out_dz }} / {{ scope.row.all_in_dz }}</div>
                <div>上：{{ scope.row.last_month_dz_100 }} / {{ scope.row.last_out_dz }} / {{ scope.row.last_in_dz }}
                </div>
                <div>月：{{ scope.row.month_dz_100 }} / {{ scope.row.out_dz }} / {{ scope.row.in_dz }}</div>
                <div>今：{{ scope.row.today_dz_100 }} / {{ scope.row.today_out_dz }} / {{ scope.row.today_in_dz }}</div>
              </template>
            </el-table-column>
            <el-table-column align="" label="TOP升级支出/收入" min-width="120">
              <template slot-scope="scope">
                <div>总：{{ scope.row.all_top_100 }} / {{ scope.row.all_out_top }} / {{ scope.row.all_in_top }}</div>
                <div>上：{{ scope.row.last_month_top_100 }} / {{ scope.row.last_out_top }} / {{ scope.row.last_in_top }}
                </div>
                <div>月：{{ scope.row.month_top_100 }} / {{ scope.row.out_top }} / {{ scope.row.in_top }}</div>
                <div>今：{{ scope.row.today_top_100 }} / {{ scope.row.today_out_top }} / {{ scope.row.today_in_top }}
                </div>
              </template>
            </el-table-column>
            <!--            <el-table-column align="center" prop="kx" label="ROLL" min-width="120">
            </el-table-column>
            <el-table-column align="center" prop="dz" label="对战" min-width="120">
            </el-table-column>
            <el-table-column align="center" prop="top" label="TOP升级" min-width="120">
            </el-table-column> -->

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


  </div>

</template>
<script>
  import {
    ttGet,
    ttPost,
    repair,
    abrasion,
    quality,
    quality2
  } from "@/utils/util.js";

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
        operation_more_page: false,
        operation_form: {
          money: 0,
          give: 0,
        },

        operation_more_form: {
          money: 0,
          give: 0,
          nums: 1,
          keynums: 1,
        },
        operation_rule: {
          money: [{
            required: true,
            message: "请输入金额",
            trigger: "blur"
          }],
        },
        operation_more_rule: {
          money: [{
            required: true,
            message: "请输入金额",
            trigger: "blur"
          }],
        },
      };
    },
    mounted() {
      this.get_record();
    },
    methods: {
      repair,
      abrasion,
      quality,
      quality2,

      //获取佣金记录
      get_record() {
        let page_info = this.page_info;
        let query = this.query;
        ttGet("/admin.php/record/get_statistics", {
          page: page_info.page,
          limit: page_info.limit,
          info: query.info,
        }, (res) => {
          this.loading = false;
          if (res.code == 200) {
            console.log(res.data.data);
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


      //关闭操作窗口
      close() {
        this.operation_page = false;

        this.operation_more_page = false;
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
</style>