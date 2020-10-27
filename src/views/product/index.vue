<template>
  <div>
    <div class="options">
      <el-button type="primary" size="mini" @click="toAdd">添加</el-button>

      <el-input
        v-model="queryparams.name"
        placeholder="请输入产品名称"
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
    <!-- 表格 -->
    <div class="tables">
      <el-table
        height="calc(100vh - 170px)"
        :data="productData"
        stripe
        style="width: 100%"
        size="medium"
        @selection-change="handleSelectionChange"
      >
        >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          align="center"
          prop="id"
          width="100"
          label="编号"
        ></el-table-column>

        <el-table-column
          prop="name"
          label="产品名称"
          width="240"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="price" label="价格" align="center">
        </el-table-column>
        <el-table-column
          prop="description"
          label="产品描述"
          width="240"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="categoryId"
          label="所属产品"
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
            ><el-button @click="toDetail(scope.row)" type="text" size="small"
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
        :current-page.sync="queryparams.page"
        :page-sizes="[8, 10, 15, 20, 25]"
        :page-size="queryparams.pageSize"
        layout="total,sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
    <div>
      <!-- 模态框 -->
      <el-dialog @close="dialogClose" :title="title" :visible.sync="visible">
        <el-form :model="forms" :rules="rules" ref="ruleForm">
          <el-form-item
            prop="name"
            label="产品名称"
            :label-width="formLabelWidth"
          >
            <el-input v-model="forms.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="price" label="价格" :label-width="formLabelWidth">
            <el-input v-model="forms.price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            prop="categoryId"
            label="所属栏目"
            :label-width="formLabelWidth"
          >
            <el-select v-model="forms.categoryId" placeholder="请选择所属栏目">
              <el-option v-for="item in categoryId" :key="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            prop="description"
            label="介绍"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="forms.description"
              autocomplete="off"
              type="textarea"
              :row="2"
              placeholder="请描述"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="toSave">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 顾客管理
    {{ total }}=====
    {{ customerData }} -->
  </div>
</template>

<script>
// 导入vuex或者axios
import { mapActions, mapGetters } from "vuex";
//导入api

import { findcategoryId, deleteById, batchDelete } from "@/api/product.js";
export default {
  data() {
    return {
      //获取数据的参数
      queryparams: {
        page: 1,
        pageSize: 8,
        name: "",
      },
      //是否禁用批量删除按钮 按钮禁用
      isDisabled: true,
      //批量删除的id数组
      ids: [],
      // 模态框的显示与隐藏
      visible: false,
      //模态框的标题
      title: "添加产品信息",
      //模态框文件上传
      fileList: [],
      //所属栏目的id
      categoryId: [],
      //:label-width的长度设置
      formLabelWidth: "120px",
      //表单数据
      forms: {},
      //表单验证
      rules: {
        name: [{ required: true, message: "请输入产品名称", trigger: "blur" }],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        categoryId: [
          { required: true, message: "请选择所属栏目", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    //从store中的customer模块拿出total,customerData属性
    ...mapGetters("product", ["total", "productData"]),
  },
  methods: {
    //拿出findAll saveOrUpdate方法
    ...mapActions("product", ["findAll", "saveOrUpdate"]),
    //增加
    toAdd() {
      this.title = "新增顾客信息";
      //清空表单
      this.forms = {};
      this.visible = true;
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
                this.findAll(this.queryparams);
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
                this.findAll(this.queryparams);
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
    //编辑
    toEdit(row) {
      console.log(row);
      this.forms = { ...row };
      this.title = "修改订单信息";
      this.visible = true;
    },
    //保存按钮
    toSave() {
      console.log(this.forms);
      //校验数据,数据校验通过之后再保存
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.saveOrUpdate({
            form: this.forms,
            queryparams: this.queryparams,
          }).then((res) => {
            this.visible = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //跳转到详情
    toDetail(row) {
      // console.log(row);
      //路由跳转
      // /customerDetail/:id/index
      this.$router.push(`/productDetail/${row.id}/index`);
    },
    //每页条数变化事件处理函数
    handleSizeChange(val) {
      //改数据模型中的pageSize,设置page为1，发起请求
      this.queryparams.pageSize = val;
      this.queryparams.page = 1;
      //发起请求
      this.findAll(this.queryparams);
    },
    //页码发生变化的事件处理程序
    handleCurrentChange(val) {
      //修改数据模型中的数据并发起请求
      this.queryparams.page = val;
      this.findAll(this.queryparams);
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
    //查询按钮
    toSearch() {
      this.queryparams.page = 1;
      this.findAll(this.queryparams);
    },
    mounted() {},
    //Dialog关闭的回调
    dialogClose() {
      //重置表单
      this.$refs["ruleForm"].resetFields();
    },
  },
  created() {
    //可行不方便
    // if (!this.queryparams.status) {
    //   delete this.queryparams.status;
    // }
    this.findAll(this.queryparams);
    findcategoryId().then((res) => {
      this.categoryId = res.data;
      this.categoryId = this.categoryId.map((item) => item.categoryId);
      this.categoryId = this.categoryId.filter(
        (item, index, self) => self.indexOf(item) === index
      );
    });
  },
};
</script>
<style lang="less">
.options {
  overflow: hidden;
  float: left;
  margin-bottom: 10px;
  margin-top: -10px;
}
.options div {
  width: 200px;
}
.tables {
  margin: 10px 0;
}
</style>
