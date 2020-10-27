<template>
  <div>
    <div class="tables">
      <el-table
        border
        height="calc(100vh - 250px)"
        :data="tempData"
        stripe
        style="width: 100%"
        size="medium"
      >
        <el-table-column
          align="center"
          prop="id"
          width="140"
          label="订单编号"
        ></el-table-column>

        <el-table-column
          prop="orderTime"
          label="下单时间"
          width="240"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="total" label="总价" align="center">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="240" align="center">
        </el-table-column>
        <el-table-column
          prop="customerId"
          label="顾客ID"
          width="240"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="address" label="操作" width="260" align="center">
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
        :current-page.sync="page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size.sync="pageSize"
        layout="total,sizes, prev, pager, next"
        :total="orderData.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      id: this.$route.params.id,
      page: 0,
      pageSize: 3,
    };
  },
  computed: {
    ...mapState("customer", ["orderData"]),
    tempData() {
      return this.orderData.slice(
        (this.page - 1) * this.pageSize,
        this.page * this.pageSize
      );
    },
  },
  methods: {
    ...mapActions("customer", ["findOrderById"]),
    //跳转到详情
    toDetail(row) {
      // console.log(row.id);
      //路由跳转
      // /customerDetail/:id/index
      this.$router.push(`/orderDetail/${row.id}/index`);
    },
  },
  created() {
    this.findOrderById({ customerId: this.id });
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>