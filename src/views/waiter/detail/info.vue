<template>
  <div>
    <div class="Info">
      <el-card>
        <el-avatar :size="100" src="https://empty" @error="errorHandler">
          <img :src="infoData[0].imgPhoto" />
        </el-avatar>
        <div style="padding: 14px">
          <p>姓名：{{ infoData[0].realname }}</p>
          <p>联系方式：{{ infoData[0].telephone }}</p>
          <p>状态：{{ infoData[0].status }}</p>
          <p>地址：{{ infoData[0].province }}{{ infoData[0].city }}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      id: this.$route.params.id,
      infoData: [],
    };
  },
  computed: {
    ...mapGetters("waiter", ["waiterData"]),
  },
  methods: {
    ShowInfo() {
      this.infoData = this.waiterData.filter(
        (item) => item.id == this.$data.id
      );
    },
  },
  created() {
    this.ShowInfo();
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>