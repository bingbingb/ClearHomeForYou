<template>
  <div>
    <!-- 按钮 -->
    <div class="options">
      <el-button type="primary" size="mini" @click="toAdd">添加</el-button>

      <el-input
        v-model="queryParams.name"
        placeholder="请输入栏目名称"
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
        :data="categoryData"
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
          width="140"
          label="编号"
        ></el-table-column>

        <el-table-column
          prop="name"
          label="栏目名称"
          width="240"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="num" label="序号" align="center">
        </el-table-column>
        <el-table-column
          prop="parentId"
          label="父栏目"
          width="240"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="address" label="操作" width="260" align="center">
          <template slot-scope="scope">
            <el-button @click="toDelete(scope.row)" type="text" size="small"
              >删除</el-button
            >
            <el-button @click="toEdit(scope.row)" type="text" size="small"
              >编辑</el-button
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
    <el-dialog @close="dialogClose" :title="title" :visible.sync="visible">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item
          prop="name"
          label="栏目名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="num" label="序号" :label-width="formLabelWidth">
          <el-input v-model="form.num" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="categoryId"
          label="所属栏目"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.parentId" placeholder="请选择所属栏目">
            <el-option v-for="item in categoryId" :key="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="toSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { findcategoryId, deleteById, batchDelete } from "@/api/category.js";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      queryParams: {
        page: 1,
        pageSize: 8,
        name: "",
      },
      //删除按钮是否可用
      isDisabled: true,
      ids: [],
      //添加保存标题
      title: "添加栏目信息",
      //模态框是否可见
      visible: false,
      formLabelWidth: "120px",
      //form表单数据
      form: {},
      rules: {
        name: [{ required: true, message: "请输入栏目名称", trigger: "blur" }],
        num: [{ required: true, message: "请输入序号", trigger: "blur" }],
        parentId: [
          { required: true, message: "请选择所属栏目", trigger: "blur" },
        ],
      },
      //栏目id
      categoryId: {},
    };
  },
  computed: {
    ...mapGetters("category", ["total", "categoryData"]),
  },
  methods: {
    ...mapActions("category", ["queryFindAll", "saveOrUpdate"]),
    toDelete() {},

    handleSizeChange(val) {
      this.queryParams.pageSize = val;
      this.queryParams.page = 1;
      this.queryFindAll(this.queryParams);
    },
    handleCurrentChange(val) {
      this.queryParams.page = val;
      this.queryFindAll(this.queryParams);
    },
    //表格多选变化的事件处理程序
    handleSelectionChange(val) {
      //val是一个数据，内部是选中的对象
      this.ids = val.map((item) => item.id);
      console.log(this.ids);
      //控制按钮禁用
      if (this.ids.length > 0) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
    //添加
    toAdd() {
      this.title = "添加栏目信息";
      this.form = {};
      this.visible = true;
    },
    toEdit(row) {
      this.form = { ...row };
      this.title = "修改订单信息";
      this.visible = true;
    },
    //搜索
    toSearch() {
      this.queryParams.page = 1;
      this.queryFindAll(this.queryParams);
    },
    //保存
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
                  message: "删除失败--",
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
                  message: "删除失败--",
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

    //模态框关闭
    dialogClose() {
      this.$refs["ruleForm"].resetFields();
    },
  },
  created() {
    this.queryFindAll(this.queryParams);
    findcategoryId().then((res) => {
      this.categoryId = res.data;
      this.categoryId = this.categoryId.map((item) => item.id);
      this.categoryId = this.categoryId.filter(
        (item, index, self) => self.indexOf(item) === index
      );
    });
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