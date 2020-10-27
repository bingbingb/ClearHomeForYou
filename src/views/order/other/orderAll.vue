<template>
  <div>
    <!-- 表格 -->
    <div>
      <el-table :data="queryData" style="width: 100%" height="510">
        <el-table-column fixed prop="id" label="订单编号" width="180">
        </el-table-column>
        <el-table-column prop="orderTime" label="下单时间" width="240">
        </el-table-column>
        <el-table-column prop="total" label="总价" width="220">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="220">
        </el-table-column>
        <el-table-column prop="customerId" label="顾客ID" width="220">
        </el-table-column>
        <el-table-column prop="address" label="操作" width="100" align="center">
          <template slot-scope="scope">
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      queryParams: {
        page: 1,
        pageSize: 8,
      },
    };
  },
  computed: {
    ...mapGetters("order", ["queryData", "total"]),
  },
  methods: {
    ...mapActions("order", ["queryPage"]),
    handleSizeChange(val) {
      this.queryParams.pageSize = val;
      this.queryParams.page = 1;
      this.queryPage(this.queryParams);
    },
    handleCurrentChange(val) {
      this.queryParams.page = val;
      this.queryPage(this.queryParams);
    },
    //跳转到详情页面
    toDetail(row) {
      console.log(row);
      this.$router.push(`/orderDetail/${row.id}/index`);
    },
  },
  created() {
    this.queryPage(this.queryParams);
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>