<template>
  <div>
    <el-button type="text" @click="toBack">返回</el-button>

    {{ product[0].id }}
    <el-card style="width: calc(50%)">
      <div style="padding: 14px">
        <p>产品名称：{{ product[0].name }}</p>
        <p>产品价格：{{ product[0].price }}</p>
        <p>产品描述：{{ product[0].description }}</p>
        <p>产品主图：{{ product.photo }}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      id: this.$route.params.id,
      product: {},
    };
  },
  computed: {
    ...mapGetters("product", ["productData"]),
  },
  methods: {
    toBack() {
      this.$router.go(-1);
    },
    findproduct() {
      console.log(this.$data.id);
      console.log(this.productData);

      this.$data.product = this.productData.filter(
        (item) => item.id == this.$data.id
      );
      console.log(this.$data.product);
    },
  },
  created() {
    this.findproduct();
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>