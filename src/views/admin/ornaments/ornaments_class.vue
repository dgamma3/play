<template>
  <div style="height: 100%;width: 100%;background-color: #FFFFFF;overflow: hidden;">
    <div style="background-color: #FFFFFF;height: 100%;overflow: hidden;">
      <div style="margin: 20px 10px 0 10px;">

      </div>
      <div style="display: flex;margin: 0 20px 10px 20px;">
        <el-button
          size="medium"
          type="primary"
          @click.stop="add(0)">
          添加
        </el-button>
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
            style="width: 100%;font-size: 14px;"
            :row-class-name="get_row_class">
            <el-table-column
              align="center"
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              align="center"
              type="expand"
              width="55">
              <template slot-scope="d">
                <el-table
                  :data="d.row.children"
                  :header-cell-style="{display: 'none !important',backgroundColor: '#fafafa',color:'#333333',fontWeight:'400',textAlign:'center'}"
                  :row-style="{color:'#333333',fontWeight:'400',height:50+'px',textAlign:'center'}"
                  :cell-style="{padding:5+'px'}"
                  style="margin: -12px 0 -14px"
                >
                  <el-table-column
              align="center"
                    type="selection"
                    width="55">
                  </el-table-column>
                  <el-table-column
              align="center"
                    width="55">
                  </el-table-column>
                  <el-table-column
              align="center"
                    prop="sort"
                    label="分类排序"
                    width="100">
                  </el-table-column>
                  <el-table-column
              align="center"
                    prop="name"
                    label="二级分类名称">
                    <template slot-scope="d">
                      {{d.row.name}}
                    </template>
                  </el-table-column>
                  <el-table-column
              align="center"
                    prop="status"
                    label="商城启用">
                    <template slot-scope="d">
                      <template v-if="d.row.status == 1">
                        <el-tag size="mini">是</el-tag>
                      </template>
                      <template v-else>
                        <el-tag size="mini" type="danger">否</el-tag>
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column
              align="center"
                    prop="status"
                    label="幸运开箱启用">
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
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="primary"
                        @click.stop="edit(scope.$index, scope.row)">编辑
                      </el-button>
                      <el-button
                        size="mini"
                        type="danger"
                        @click.stop="del(scope.$index, scope.row)">删除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="sort"
              label="分类排序"
              width="100">
            </el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="分类名称">
            </el-table-column>
            <el-table-column
              align="center"
              prop="status"
              label="商城启用">
              <template slot-scope="d">
                <template v-if="d.row.status == 1">
                  <el-tag size="mini">是</el-tag>
                </template>
                <template v-else>
                  <el-tag size="mini" type="danger">否</el-tag>
                </template>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="status"
              label="幸运开箱启用">
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
                <el-button
                  size="mini"
                  type="primary"
                  @click.stop="add(d.row.id)">添加下级
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
            <el-col :span="12">
              <el-form-item label="分类名称:" label-width="100px" prop="name">
                <el-input v-model="operation_form.name" placeholder="分类名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="分类排序:" label-width="100px" prop="sort">
                <el-input type="number" v-model.number="operation_form.sort" placeholder="分类排序"></el-input>
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
          <el-row>
            <el-col :span="12">
              <el-form-item label="分类图片:" label-width="100px">
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
          </el-row>
        </el-form>
      </div>
      <div style="text-align: center;">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="add_submit" v-if="operation_type == 'add'">保存</el-button>
        <el-button type="primary" @click="edit_submit" v-if="operation_type == 'edit'">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {getStore, setStore} from "@/utils/store.js";
  import {ttGet, ttPost} from "@/utils/util.js";
  import website from '@/config/website';

  export default {
    data() {
      return {
        server_url: this.$server_url,
        secret: website.clientSecret,
        token: getStore({name: 'login_token'}),
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
          sort: '',
          img: '',
          status: 1,
          status2: 1,
          superior_id: 0,
        },
        operation_rule: {
          name: [
            {required: true, message: "请输入分类名称", trigger: "blur"}
          ],
          sort: [
            {required: true, message: "请输入分类排序", trigger: "blur"},
            { type: 'number', message: '分类排序必须为数字'}
          ],
        },

      };
    },
    mounted() {
      this.get_ornaments_class();
    },
    methods: {
      //获取饰品分类
      get_ornaments_class() {
        let page_info = this.page_info;
        ttGet("/admin.php/ornaments/get_ornaments_class", {page: page_info.page, limit: page_info.limit}, (res) => {
          this.loading = false;
          if (res.code == 200) {
            this.data = res.data.data.data;
            this.page_info.total = res.data.data.count;
            let height = 50 + 50 * (res.data.data.data.length ? res.data.data.data.length : 1);
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
        this.get_ornaments_class();
      },

      //条数切换
      sizeChange(limit) {
        this.page_info.page = 1;
        this.page_info.limit = limit;
        this.loading = true;
        this.get_ornaments_class();
      },

      //条件搜索
      search() {
        this.page_info.page = 1;
        this.loading = true;
        this.get_ornaments_class();
      },

      //重置条件
      reset() {
        this.page_info.page = 1;
        this.query = {};
        this.loading = true;
        this.get_ornaments_class();
      },

      //添加
      add: function (superior_id) {
        this.operation_form = {
          name: '',
          sort: '',
          img: '',
          status: 1,
          status2: 1,
          superior_id: superior_id,
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
        ttGet("/admin.php/ornaments/get_ornaments_class_details", {id: operation_row.id}, (res) => {
          loading.close();
          if (res.code == 200) {
            this.operation_form = res.data.ornaments_class;
            this.operation_form.sort = Number(res.data.ornaments_class.sort);
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
            ttPost("/admin.php/ornaments/ornaments_class_add", {
              name: operation_form.name,
              img: operation_form.img,
              sort: operation_form.sort,
              status: operation_form.status,
              status2: operation_form.status2,
              superior_id: operation_form.superior_id,
            }, (res) => {
              loading.close();
              if (res.code == 200) {
                this.page_info.page = 1;
                this.get_ornaments_class();
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
            ttPost("/admin.php/ornaments/ornaments_class_edit", {
              id: operation_row.id,
              name: operation_form.name,
              img: operation_form.img,
              sort: operation_form.sort,
              status: operation_form.status,
              status2: operation_form.status2,
            }, (res) => {
              loading.close();
              if (res.code == 200) {
                this.get_ornaments_class();
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
          ttPost("/admin.php/ornaments/ornaments_class_del", {
            id: operation_row.id,
          }, (res) => {
            loading.close();
            if (res.code == 200) {
              if (this.page_info.page > 1 && this.data.length == 1) this.page_info.page -= 1;
              this.get_ornaments_class();
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
    }
  };
</script>

<style lang="scss">
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
