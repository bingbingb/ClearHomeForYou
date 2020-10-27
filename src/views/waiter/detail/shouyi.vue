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
          width="200"
          label="订单编号"
        ></el-table-column>

        <el-table-column prop="money" label="金额" width="240" align="center">
        </el-table-column>
        <el-table-column prop="description" label="描述" align="center">
        </el-table-column>
        <el-table-column
          prop="transactionTime"
          label="交易时间"
          width="240"
          align="center"
        >
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
        :total="ShowDetailData.length"
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
    ...mapState("waiter", ["ShowDetailData"]),
    tempData() {
      return this.ShowDetailData.slice(
        (this.page - 1) * this.pageSize,
        this.page * this.pageSize
      );
    },
  },
  methods: {
    ...mapActions("waiter", ["detailsShouById"]),
  },
  created() {
    this.detailsShouById({ id: this.id });
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>