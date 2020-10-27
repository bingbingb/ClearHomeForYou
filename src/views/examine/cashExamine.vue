<template>
  <div>
    <div>
      <!-- 按钮 -->
      <!-- 表单 -->
      <div class="tables">
        <el-table
          height="calc(100vh - 170px)"
          :data="detailShowData"
          stripe
          style="width: 100%"
          size="medium"
        >
          >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            align="center"
            prop="id"
            width="80"
            label="编号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="status"
            width="80"
            label="编号"
          ></el-table-column>
          <el-table-column prop="money" label="金额" width="200" align="center">
          </el-table-column>
          <el-table-column prop="type" label="类型" width="200" align="center">
          </el-table-column>
          <el-table-column
            prop="description"
            label="描述"
            width="220"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="userId"
            label="员工ID"
            width="220"
            align="center"
          >
          </el-table-column>

          <el-table-column label="凭证" width="200" align="center">
            <template slot-scope="scope">
              <el-button
                @click="toLook(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.transferAccounts == null ? true : false"
              >
                上传凭证
              </el-button>
              <el-button
                @click="toLook(scope.row)"
                type="text"
                size="small"
                v-else
              >
                查看凭证
              </el-button>
            </template>
          </el-table-column>

          <el-table-column
            prop="address"
            label="操作"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                @click="toCheck(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.status == 1 ? false : true"
              >
                审核
              </el-button>
              <el-button
                @click="toCheck(scope.row)"
                type="text"
                size="small"
                v-else
              >
                已审核
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="queryParams.page"
          :page-sizes="[8, 10, 15, 20]"
          :page-size="queryParams.pageSize"
          layout="total,sizes,prev, pager, next"
          :total="detailTotal"
        >
        </el-pagination>
      </div>
      <!-- 模态框 -->
      <!-- 查看凭证 -->
      <el-dialog title="凭证" :visible.sync="dialogVisible" width="40%">
        <div class="block">
          <el-image
            style="width: 300px; height: 300px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="contain"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
      </el-dialog>
      <!-- 上传凭证 -->
      <el-dialog title="上传凭证" :visible.sync="diaVisible" width="30%">
        <el-upload
          class="upload-demo"
          action="http://39.105.67.242:5588/file/upload"
          :file-list="fileList"
          list-type="picture"
          :on-success="handleAvatarSuccess"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button @click="diaVisible = false">取 消</el-button>
          <el-button type="primary" @click="diaVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { waiterexamine } from "@/api/waiter";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      queryParams: {
        page: 1,
        pageSize: 8,
      },
      fileList: [],
      // 模态框是否显示
      dialogVisible: true,
      diaVisible: false,
      form: {},
    };
  },
  computed: {
    ...mapGetters("waiter", ["detailTotal", "detailShowData"]),
  },
  methods: {
    ...mapActions("waiter", ["detailShou"]),
    handleSizeChange(val) {
      this.queryParams.pageSize = val;
      this.queryParams.page = 1;
      this.detailShou(this.queryParams);
    },
    handleCurrentChange(val) {
      this.queryParams.page = val;
      this.detailShou(this.queryParams);
    },
    toCheck(row) {
      // console.log(row);
      this.form = { ...row };
      this.form.status = 1;
      // console.log(this.form);
      waiterexamine(this.form).then((res) => {
        this.detailShou(this.queryParams);
        console.log(res);
      });
    },
    toLook(row) {},
    handleChange(file, fileList) {
      console.log(file);
      this.fileList = fileList.slice(-3);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
    },
  },
  created() {
    this.detailShou(this.queryParams);
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.block {
  width: 400px;
  height: 300px;
  margin: 0 auto;
}
</style>