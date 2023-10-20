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
              label="主播id"
              min-width="80"
              >

            </el-table-column>

            <el-table-column
              align="center"
              prop="name"
              label="主播姓名"
              min-width="180"
              >

            </el-table-column>
            <el-table-column
              align="center"
              prop="phone"
              label="电话"
              min-width="100"
              >

            </el-table-column>
            <el-table-column
              align="center"
              prop="nums"
              label="拉新（用该主播邀请码注册的用户总数）"
              min-width="180"
              >

            </el-table-column>
            <el-table-column
              align="center"
              prop="today_gold"
              label="今日佣金"
              min-width="80"
              >

            </el-table-column>
            <el-table-column
              align="center"
              prop="month_gold"
              label="本月佣金"
              min-width="120"
              >
            </el-table-column>
            <el-table-column
              align="center"
              prop="last_month_gold"
              label="上月佣金"
              min-width="120"
              >
            </el-table-column>
            <el-table-column
              align="center"
              prop="gold"
              label="总佣金"
              min-width="120"
              >
            </el-table-column>
          </el-table>
          
        </template>
      </div>
    </div>
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
      };
    },
    mounted() {
      this.get_gold_record();
    },
    methods: {
      repair, abrasion, quality, quality2,

      //获取佣金记录
      get_gold_record() {
        let page_info = this.page_info;
        let query = this.query;
        ttGet("/admin.php/record/get_zb_gold_record", {
          page: page_info.page,
          limit: page_info.limit,
          info: query.info,
        }, (res) => {
          this.loading = false;
          if (res.code == 200) {
            this.data = res.data.data;

            let height = 50 + 61 * (res.data.data.length ? res.data.data.length : 1);
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
        this.get_gold_record();
      },

      //条数切换
      sizeChange(limit) {
        this.page_info.page = 1;
        this.page_info.limit = limit;
        this.loading = true;
        this.get_gold_record();
      },

      //条件搜索
      search() {
        this.page_info.page = 1;
        this.loading = true;
        this.get_gold_record();
      },

      //重置条件
      reset() {
        this.page_info.page = 1;
        this.query = {};
        this.loading = true;
        this.get_gold_record();
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
