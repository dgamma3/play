<template>
  <div style="display: flex;padding: 0 5px;height: 100%;width: 100%;overflow: hidden;">
    <div style="width: 30%;background-color: #FFFFFF;">
      <div style="display: flex;height: 50px;line-height: 50px;">
        <div style="width: 7px;height: 16px;background-color: #409EFF;margin: 17px 0 0 20px;"></div>
        <div style="font-size: 16px;font-weight: 600;margin-left: 10px;">最新动态</div>
        <div style="flex: 1;text-align: right;margin-right: 37px;font-size: 16px;"><!-- 0 --></div>
      </div>
      <div style="overflow: auto;">
        <div v-for="(item, index) in count" style="display: flex;height: 60px;line-height: 60px;border-bottom: 2px dashed #EEEEEE;margin: 0 37px 0 37px;">
          <div style="font-size: 14px;color: rgba(64, 64, 64, 0.847058823529412);">{{item.name}}</div>
          <div style="flex: 1;text-align: right;font-size: 16px;">{{item.num}}</div>
        </div>
      </div>
    </div>
    <div style="flex: 1;max-width: 70%;margin-left: 10px;">
      <div style="background-color: #FFFFFF;margin: 0 0 50px 0 ;height: 100%;overflow: hidden;">
        <div style="display: flex;height: 50px;line-height: 50px;">
          <div style="width: 7px;height: 16px;background-color: #409EFF;margin: 17px 0 0 20px;"></div>
          <div style="font-size: 16px;font-weight: 600;margin-left: 10px;">最新注册</div>
        </div>
        <div style="margin: 20px 10px 0 20px;height: calc(100% - 140px);overflow: auto;">
          <template>
            <el-table
              v-loading="loading"
              :data="user"
              border
              height="100%"
              ref="table"
              :header-cell-style="{backgroundColor: '#fafafa',color:'#333333',fontWeight:'400',textAlign:'center'}"
              :row-style="{color:'#333333',fontWeight:'400',height:50+'px',textAlign:'center'}"
              :cell-style="{padding:5+'px'}"
              style="width: 100%;font-size: 14px;">
              <el-table-column
                align="center"
                prop="id"
                width="80"
                label="ID">
              </el-table-column>
              <el-table-column
                align="center"
                prop="info"
                label="用户信息"
                min-width="100"
                show-overflow-tooltip>
                <template slot-scope="d">
                  <div style="display: flex;">
                    <img :src="repair(d.row.portrait)" style="width: 50px;height: 50px;cursor: pointer;" alt="">
                    <div style="margin-left: 15px;text-align: left;">
                      <div>
                        {{ d.row.name ? d.row.name : d.row.email }}
                        <template v-if="d.row.type == 2">
                          <el-tag size="mini">主播</el-tag>
                        </template>
                        <template v-else-if="d.row.type == 3">
                          <el-tag size="mini">推广</el-tag>
                        </template>
                        <template v-else-if="d.row.type == 4">
                          <el-tag size="mini">官方机器人</el-tag>
                        </template>
                      </div>
                      <div>steamid: {{ d.row.steamid ? d.row.steamid : '-' }}</div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="bean"
                label="余额信息"
                min-width="100"
                show-overflow-tooltip>
                <template slot-scope="d">
                  <div><span>余额: ￥ {{ d.row.bean }}</span></div>
                  <div><span>商城余额:￥{{ d.row.store_bean }}</span></div>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="time"
                label="加入时间">
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {ttGet, ttPost, repair} from "@/utils/util.js";

  export default {
    data() {
      return {
        loading: true,
        count: [],
        user: []
      };
    },
    mounted() {
      this.get_index();
    },
    methods: {
      repair,

      //获取控制台信息
      get_index() {
        ttGet("/admin.php/index/get_index", '', (res) => {
          this.loading = false;
          if (res.code == 200) {
            this.count = res.data.count;
            this.user = res.data.user;
            let height = 50 + 61 * (res.data.user.length ? res.data.user.length : 1);
            this.$refs.table.$el.style.height = height + 'px';
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        });
      },
    }
  };
</script>

<style lang="scss" scoped>
  .my-dialog .el-dialog__header{
    padding: 0 0;
  }
  .my-table-home{
    margin-left: 20px;
    overflow: auto;
  }
  .my-table-home>table {
    font-size: 14px;
    line-height: 30px;
    text-align: left;
    border-collapse: collapse;
  }
  .my-table-home>table>tr{
    height: 30px;
    border-bottom: 1px dashed #EEEEEE;
  }
  .my-table-home>table td{
    max-width: 30%;
    white-space: nowrap;
    padding: 0 20px 0 0;
  }
  .syncBut{
    border-bottom: 3px solid #409EFF;
    color: #409EFF;
  }
</style>
