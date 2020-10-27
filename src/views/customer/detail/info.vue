<template>
  <div>
    <div class="Info">
      <el-card>
        <el-avatar :size="100" src="https://empty" @error="errorHandler">
          <img :src="customerData.imgPhoto" />
        </el-avatar>
        <div style="padding: 14px">
          <p>姓名：{{ customerData.realname }}</p>
          <p>联系方式：{{ customerData.telephone }}</p>
          <p>状态：{{ customerData.status }}</p>
          <p>地址：{{ customerData.province }}{{ customerData.city }}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  computed: {
    ...mapState("customer", ["customerData"]),
  },
  methods: {
    ...mapActions("customer", ["findCustomerById"]),
    errorHandler() {
      return true;
    },
  },
  created() {
    // console.log(this.$route.params.id);
    this.findCustomerById({ id: this.id });
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.Info {
  width: calc(40%);
}
</style>