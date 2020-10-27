<template>
  <div>
    <el-button type="text" @click="toBack">返回</el-button>

    <el-card class="box-card">
      <div class="text item">
        <p>订单编号:{{ orderData.id }}</p>
        <p>下单时间:{{ orderData.orderTime }}</p>
        <p>订单状态:{{ orderData.status }}</p>
        <p>员工编号:{{ orderData.waiterId }}</p>
        <p>顾客:{{ orderData.customerId }}</p>
        <p>顾客手机号:{{ orderData.customer.telephone }}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      id: this.$route.params.id,
      names: [
        "订单编号",
        "下单时间",
        "订单状态",
        "员工编号",
        "顾客",
        "顾客手机号",
      ],
    };
  },
  computed: {
    ...mapState("order", ["orderData"]),
  },
  methods: {
    ...mapActions("order", ["findById"]),
    toBack() {
      this.$router.go(-1);
    },
  },
  created() {
    // console.log(this.$route.params.id);
    this.findById({ id: this.id });
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.box-card {
  width: calc(50%);
}
</style>