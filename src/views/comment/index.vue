<template>
  <div>
    <!-- 按钮 -->

    <!-- 表单 -->
    <div class="tables">
      <el-table
        height="calc(100vh - 170px)"
        :data="commentData"
        stripe
        style="width: 100%"
        size="medium"
      >
        >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          align="center"
          prop="id"
          width="100"
          label="编号"
        ></el-table-column>

        <el-table-column
          prop="content"
          label="评论内容"
          width="240"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="commentTime"
          label="评论时间"
          width="240"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="orderId"
          label="产品ID"
          width="240"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="status" label="状态" width="140" align="center">
        </el-table-column>

        <el-table-column prop="address" label="操作" width="260" align="center">
          <template slot-scope="scope">
            <el-button @click="toDelete(scope.row)" type="text" size="small"
              >删除</el-button
            >
            <el-button
              @click="toAudit(scope.row)"
              type="text"
              size="small"
              v-if="scope.row.status == '审核不通过' ? true : false"
            >
              审核通过
            </el-button>
            <el-button
              @click="toAudit(scope.row)"
              type="text"
              size="small"
              v-else
            >
              拒绝审核
            </el-button>
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
  </div>
</template>

<script>
import {
  deleteById,
  commentExamine,
  commentRefuseExamine,
} from "@/api/comment.js";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      isPass: true,
      queryParams: {
        page: 1,
        pageSize: 8,
      },
    };
  },
  computed: {
    ...mapGetters("comment", ["total", "commentData"]),
  },
  methods: {
    ...mapActions("comment", ["queryFindAll"]),
    handleSizeChange(val) {
      this.queryParams.pageSize = val;
      this.queryParams.page = 1;
      this.queryFindAll(this.queryParams);
    },
    handleCurrentChange(val) {
      this.queryParams.page = val;
      this.queryFindAll(this.queryParams);
    },
    //通过id删除
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
    toAudit(row) {
      console.log(row.id);
      if (row.status == "审核不通过") {
        commentExamine({ commentid: row.id }).then((res) => {
          this.queryFindAll(this.queryParams);
        });
      } else {
        commentRefuseExamine({ commentid: row.id }).then((res) => {
          this.queryFindAll(this.queryParams);
        });
      }
    },
  },
  created() {
    this.queryFindAll(this.queryParams);
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>