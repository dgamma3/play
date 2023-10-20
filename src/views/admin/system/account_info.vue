<template>
  <div style="height: 100%;width: 100%;background-color: #FFFFFF;overflow: hidden;">
    <div style="background-color: #FFFFFF;height: 100%;overflow: hidden;">
      <div style="margin: 20px 10px 0 10px;">
        <div style="margin: 0 20px;">
          <el-form
            ref="operation_form"
            :rules="operation_rule"
            :model="operation_form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="管理员昵称:" label-width="100px">
                  <el-input v-model="operation_form.name" placeholder="管理员昵称" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="管理员账号:" label-width="100px">
                  <el-input v-model="operation_form.username" placeholder="管理员账号" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="旧密码:" label-width="100px" prop="original_password">
                  <el-input type="password" v-model="operation_form.original_password" placeholder="旧密码:"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="新密码:" label-width="100px" prop="new_password">
                  <el-input type="password"v-model="operation_form.new_password" placeholder="新密码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div style="margin-left: 120px;margin-bottom: 20px;">
          <el-button type="primary" @click="edit_submit">修改</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {ttGet, ttPost} from "@/utils/util.js";

  export default {
    data() {
      return {
        operation_form: {
          name: '',
          username: '',
          original_password: '',
          new_password: '',
        },
        operation_rule: {
          original_password: [
            {required: true, message: "请输入旧密码", trigger: "blur"}
          ],
          new_password: [
            {required: true, message: "请输入新密码", trigger: "blur"}
          ],
        }
      };
    },
    mounted() {
      this.get_account_info();
    },
    methods: {
      //获取管理员信息
      get_account_info() {
        ttGet("/admin.php/system/get_account_info", '', (res) => {
          if (res.code == 200) {
            this.operation_form = res.data.account;
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        });
      },

      //编辑提交数据
      edit_submit() {
        this.$refs.operation_form.validate(valid => {
          if (valid) {
            let operation_form = this.operation_form;
            let loading = this.$loading({
              text: '提交中',
              spinner: "el-icon-loading"
            });
            ttPost("/admin.php/system/account_info_edit", {
              original_password: operation_form.original_password,
              new_password: operation_form.new_password,
            }, (res) => {
              loading.close();
              if (res.code == 200) {
                this.operation_form.original_password = '';
                this.operation_form.new_password = '';
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
    }
  };
</script>

<style lang="scss" scoped>
</style>
