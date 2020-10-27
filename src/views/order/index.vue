<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="所有订单" name="orderAll"
        ><OrderAll></OrderAll>
      </el-tab-pane>
      <el-tab-pane :lazy="true" label="待支付" name="unpaid"
        ><Unpaid></Unpaid
      ></el-tab-pane>
      <el-tab-pane :lazy="true" label="待派单" name="orderSend">
        <OrderSend></OrderSend
      ></el-tab-pane>
      <el-tab-pane :lazy="true" label="待接单" name="orderRece"
        ><OrderRece></OrderRece>
      </el-tab-pane>
      <el-tab-pane :lazy="true" label="待服务" name="serve"
        ><Serve></Serve
      ></el-tab-pane>
      <el-tab-pane label="待确认" name="confirmed">
        <ConPayment></ConPayment>
      </el-tab-pane>
      <el-tab-pane :lazy="true" label="已完成" name="completed"
        ><Completed></Completed
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import OrderAll from "./other/orderAll";
import Completed from "./other/completed";
import ConPayment from "./other/confirmed";
import OrderRece from "./other/orderRece";
import OrderSend from "./other/orderSend";
import Serve from "./other/serve";
import Unpaid from "./other/unpaid";
import { mapActions } from "vuex";
export default {
  components: {
    OrderAll,
    Completed,
    ConPayment,
    OrderRece,
    OrderSend,
    Serve,
    Unpaid,
  },
  data() {
    return {
      activeName: "orderAll",
    };
  },
  computed: {},
  methods: {
    ...mapActions("order", ["findAll"]),
  },
  created() {
    this.findAll();
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>