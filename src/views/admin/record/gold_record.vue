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
              <el-form-item label="上级信息:" label-width="80px">
                <el-input v-model="query.superior_info" placeholder="请输入上级信息"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="返佣时间:" label-width="80px">
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
              min-width="180"
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
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="money"
              label="变动金额"
              min-width="80"
              show-overflow-tooltip>
              <template slot-scope="d">
                 ￥{{d.row.money}}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="type"
              label="佣金类型"
              min-width="80"
              show-overflow-tooltip>
              <template slot-scope="d">
                {{d.row.type == 1 ? '充值' : '存入'}}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="superior_info"
              label="推广信息"
              min-width="180"
              show-overflow-tooltip>
              <template slot-scope="d">
                <div style="display: flex;">
                  <img :src="repair(d.row.superior_info.portrait)" style="width: 50px;height: 50px;cursor: pointer;" alt="">
                  <div style="margin-left: 15px;text-align: left;">
                    <div>
                      {{ d.row.superior_info.name ? d.row.superior_info.name : d.row.superior_info.email }}(ID:{{ d.row.superior_info.id }})
                      <template v-if="d.row.superior_info.type == 2">
                        <el-tag size="mini">主播</el-tag>
                      </template>
                      <template v-else-if="d.row.superior_info.type == 3">
                        <el-tag size="mini">推广</el-tag>
                      </template>
                      <template v-else-if="d.row.superior_info.type == 4">
                        <el-tag size="mini">官方机器人</el-tag>
                      </template>
                    </div>
                    <div>steamid: {{ d.row.superior_info.steamid ? d.row.superior_info.steamid : '-' }}</div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="gold"
              label="返佣金额"
              min-width="80"
              show-overflow-tooltip>
              <template slot-scope="d">
                $ {{d.row.gold}}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="time"
              label="返佣时间"
              min-width="120"
              show-overflow-tooltip>
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
        ttGet("/admin.php/record/get_gold_record", {
          page: page_info.page,
          limit: page_info.limit,
          info: query.info,
          superior_info: query.superior_info,
          time: query.time,
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
