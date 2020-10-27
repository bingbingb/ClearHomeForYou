<template>
  <div>
    <!-- B表格 -->
    <div class="tables">
      <el-table
        border
        height="calc(100vh - 250px)"
        :data="tempData"
        stripe
        style="width: 100%"
        size="medium"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          align="center"
          type="index"
          prop="id"
          width="180"
          label="编号"
        ></el-table-column>

        <el-table-column
          prop="province"
          label="省份"
          width="240"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="city" label="城市" align="center">
        </el-table-column>
        <el-table-column prop="area" label="区县" width="240" align="center">
        </el-table-column>
        <el-table-column prop="address" label="街道" width="240" align="center">
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="联系电话"
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
        :page-sizes="[1, 2, 3, 5, 10, 15, 20]"
        :page-size.sync="pageSize"
        layout="total,sizes, prev, pager, next"
        :total="addressData.length"
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
      pageSize: 2,
    };
  },
  computed: {
    ...mapState("customer", ["addressData"]),
    tempData() {
      return this.addressData.slice(
        (this.page - 1) * this.pageSize,
        this.page * this.pageSize
      );
    },
  },
  methods: {
    ...mapActions("customer", ["findAddressById"]),
  },
  created() {
    this.findAddressById({ id: this.id });
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>