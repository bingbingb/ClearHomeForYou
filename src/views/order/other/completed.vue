<template>
  <div>
    <div>
      <el-table :data="findAllDatas" style="width: 100%" height="510">
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
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      findAllDatas: [],
    };
  },
  computed: {
    ...mapState("order", ["findAllData"]),
  },
  methods: {
    orderData() {
      this.$data.findAllDatas = this.findAllData.filter((item) => {
        return item.status == "已完成";
      });
    },
    //跳转到详情页面
    toDetail(row) {
      console.log(row);
      this.$router.push(`/orderDetail/${row.id}/index`);
    },
  },

  created() {
    // console.log(this.findAllData);
    this.orderData();
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>