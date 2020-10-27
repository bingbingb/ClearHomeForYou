<template>
  <div>
    <!-- 按钮 -->
    <div class="options">
      <el-button type="primary" size="mini" @click="toAdd">添加</el-button>

      <el-input
        v-model="queryParams.status"
        placeholder="请输入状态"
        size="mini"
      ></el-input>
      <el-button type="primary" @click="toSearch" size="mini">查询</el-button>
      <el-button
        type="danger"
        @click="toBatchDelete"
        size="mini"
        :disabled="isDisabled"
        >批量删除</el-button
      >
    </div>
    <!-- 表单 -->
    <div class="tables">
      <el-table
        height="calc(100vh - 170px)"
        :data="waiterData"
        stripe
        style="width: 100%"
        size="medium"
        @selection-change="handleSelectionChange"
      >
        >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          align="center"
          prop="id"
          width="50"
          label="编号"
        ></el-table-column>

        <el-table-column
          prop="username"
          label="名称"
          width="140"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="手机号"
          width="140"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="idCard"
          label="身份证号"
          width="190"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="bankCard"
          label="银行卡号"
          width="190"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="registerTime"
          label="注册时间"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="status" label="状态" width="90" align="center">
        </el-table-column>

        <el-table-column prop="address" label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button @click="toDelete(scope.row)" type="text" size="small"
              >删除</el-button
            >
            <el-button @click="toEdit(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button @click="toDetail(scope.row)" type="text" size="small"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="queryParams.page"
        :page-sizes="[8, 10, 15, 20]"
        :page-size="queryParams.pageSize"
        layout="total,sizes,prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 模态框 -->
    <div>
      <!-- 模态框 -->
      <el-dialog @close="dialogClose" :title="title" :visible.sync="visible">
        <el-form :model="form" :rules="rules" ref="ruleForm">
          <el-form-item
            prop="username"
            label="用户名"
            :label-width="formLabelWidth"
          >
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            prop="realname"
            label="姓名"
            :label-width="formLabelWidth"
          >
            <el-input v-model="form.realname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            prop="telephone"
            label="手机号"
            :label-width="formLabelWidth"
          >
            <el-input v-model="form.telephone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            prop="idCard"
            label="身份证号"
            :label-width="formLabelWidth"
          >
            <el-input v-model="form.idCard" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            prop="bankCard"
            label="银行证号"
            :label-width="formLabelWidth"
          >
            <el-input v-model="form.bankCard" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            prop="password"
            label="密码"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.password"
              autocomplete="off"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="status"
            label="状态"
            :label-width="formLabelWidth"
          >
            <el-select v-model="form.status" placeholder="请选择状态">
              <el-option label="启用" value="启用"></el-option>
              <el-option label="禁用" value="禁用"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="toSave">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { deleteById, batchDelete } from "@/api/waiter.js";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      queryParams: {
        page: 1,
        pageSize: 8,
        status: "",
      },
      ids: [],
      //删除按钮是否可用
      isDisabled: true,
      //添加保存标题
      title: "添加栏目信息",
      //模态框是否可见
      visible: false,
      formLabelWidth: "120px",
      //form表单数据
      form: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        realname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        idCard: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        bankCard: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
        telephone: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 11, max: 11, message: "电话号码为11个字符", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters("waiter", ["total", "waiterData"]),
  },
  methods: {
    ...mapActions("waiter", ["queryFindAll", "saveOrUpdate"]),
    handleSizeChange(val) {
      this.queryParams.pageSize = val;
      this.queryParams.page = 1;
      this.queryFindAll(this.queryParams);
    },
    handleCurrentChange(val) {
      this.queryParams.page = val;
      this.queryFindAll(this.queryParams);
    },
    //搜索
    toSearch() {
      this.queryParams.page = 1;
      this.queryFindAll(this.queryParams);
    },
    //添加
    toAdd() {
      this.title = "新增员工信息";
      //清空表单
      this.form = {};
      this.visible = true;
    },
    toEdit(row) {
      this.form = { ...row };
      this.title = "修改员工信息";
      this.visible = true;
    },
    toSave() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.saveOrUpdate({
            form: this.form,
            queryParams: this.queryParams,
          }).then((res) => {
            this.visible = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除
    toDelete(row) {
      //询问用户是否进行删除操作
      this.$confirm("删除该顾客, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //发请求删除
          deleteById({ id: row.id })
            .then((res) => {
              if (res.status === 200) {
                //提示删除成功，并且查找数据（更新数据）
                this.$notify({
                  title: "成功",
                  message: "删除成功",
                  type: "success",
                });
                //处理方法比较粗暴
                // this.queryparams.page = 1;
                this.queryFindAll(this.queryParams);
              } else {
                this.$notify.error({
                  title: "错误",
                  message: "删除失败",
                });
              }
            })
            .catch((err) => {
              this.$notify.error({
                title: "错误",
                message: "删除失败",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //批量删除
    toBatchDelete() {
      this.$confirm("删除该顾客, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //发请求删除
          batchDelete({ ids: this.ids.join() })
            .then((res) => {
              if (res.status === 200) {
                //提示删除成功，并且查找数据（更新数据）
                this.$notify({
                  title: "成功",
                  message: "删除成功",
                  type: "success",
                });
                //处理方法比较粗暴
                // this.queryparams.page = 1;
                this.queryFindAll(this.queryParams);
              } else {
                this.$notify.error({
                  title: "错误",
                  message: "删除失败",
                });
              }
            })
            .catch((err) => {
              this.$notify.error({
                title: "错误",
                message: "删除失败",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //表格多选变化的事件处理程序
    handleSelectionChange(val) {
      //val是一个数据，内部是选中的对象
      this.ids = val.map((item) => item.id);
      //控制按钮禁用
      if (this.ids.length > 0) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
    //详情
    toDetail(row) {
      // console.log(row);
      //路由跳转
      // waiterDetail/:id/index
      this.$router.push(`/waiterDetail/${row.id}/index`);
    },
    dialogClose() {
      this.$refs["ruleForm"].resetFields();
    },
  },
  created() {
    this.queryFindAll(this.queryParams);
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.options {
  width: calc(50%);
  margin-bottom: 10px;
  & > div {
    width: calc(30%);
  }
}
</style>