<template>
  <div>
    <!-- 按钮 -->
    <!-- 表单 -->
    <div class="tables">
      <el-table
        height="calc(100vh - 170px)"
        :data="waiterData"
        stripe
        style="width: 100%"
        size="medium"
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
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="idCard"
          label="身份证号"
          width="220"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="bankCard"
          label="银行卡号"
          width="220"
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
        <el-table-column prop="status" label="状态" width="100" align="center">
        </el-table-column>

        <el-table-column prop="address" label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button @click="toCheck(scope.row)" type="text" size="small"
              >审核</el-button
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
    <el-dialog @close="dialogClose" title="审核员工" :visible.sync="visible">
      <span style="margin-left: calc(5%)">用户名：{{ form.username }} </span
      ><span style="float: right; width: calc(45%)"
        >身份证号：{{ form.idCard }}</span
      >
      <br />
      <br />
      <div class="imgdiv">
        <div class="block">
          <span class="demonstration">身份证正面照</span>
          <el-image :src="form.img1" class="imgbox">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </div>
        <div class="block2">
          <span class="demonstration">身份证反面照</span>
          <el-image :src="form.img2" class="imgbox">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toCancel">取 消</el-button>
        <el-button type="primary" @click="toSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { auditing, refusauditing } from "@/api/waiter";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      queryParams: {
        page: 1,
        pageSize: 8,
      },
      visible: false,
      form: {
        id: "",
        img1: "",
        img2: "",
      },
    };
  },
  computed: {
    ...mapGetters("waiter", ["total", "waiterData"]),
  },
  methods: {
    ...mapActions("waiter", ["queryFindAll"]),
    handleSizeChange(val) {
      this.queryParams.pageSize = val;
      this.queryParams.page = 1;
      this.queryFindAll(this.queryParams);
    },
    handleCurrentChange(val) {
      this.queryParams.page = val;
      this.queryFindAll(this.queryParams);
    },
    toCheck(row) {
      console.log(row);
      this.visible = true;
      this.form.id = row.id;
      this.form.img1 = row.idcardPhotoNegative;
      this.form.img2 = row.idcardPhotoPositive;
    },
    toSave() {
      console.log(this.form);
      auditing(this.form)
        .then((res) => {
          console.log(res);
          this.queryFindAll(this.queryParams);
        })
        .catch((err) => {
          console.log("shiba");
        });
    },
    toCancel() {
      console.log(this.form.id);
      refusauditing({ id: this.form.id }).then((res) => {
        this.queryFindAll(this.queryParams);
        console.log(res);
      });
    },
    dialogClose() {},
  },
  created() {
    this.queryFindAll(this.queryParams);
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.imgdiv {
  height: 150px;
}
.block {
  float: left;
  width: calc(40%);
  margin-left: calc(5%);
}
.block2 {
  float: right;
  width: calc(45%);
}
.imgbox {
  width: 150px;
  height: 150px;
  border: 1px solid #ccc;
  vertical-align: top;
}
</style>