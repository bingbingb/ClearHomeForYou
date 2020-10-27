<template>
  <div>
    <el-button type="text" @click="toBack">返回</el-button>
    <el-tabs v-model="activeName">
      <!-- lazy懒加载用的时候才会加载 -->
      <el-tab-pane :lazy="true" label="基本信息" name="info">
        <Info></Info>
      </el-tab-pane>
      <el-tab-pane :lazy="true" label="订单信息" name="order">
        <Order></Order>
      </el-tab-pane>
      <el-tab-pane :lazy="true" label="服务地址" name="address">
        <Address></Address>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
//导入组件
import Info from "./info.vue";
import Order from "./order.vue";
import Address from "./address.vue";
export default {
  //组件局部注册
  components: {
    Info,
    Order,
    Address,
  },
  data() {
    return {
      activeName: "info",
    };
  },
  computed: {},
  methods: {
    toBack() {
      this.$router.go(-1);
    },
  },
  created() {
    //获取动态路由参数 id可以存在仓库里也可以在URL上获取(URL上获取的话)
    // console.log(this.$route.params.id);
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>