<template>
  <section class="app-container">
    <!--工具条-->
    <el-col
      :span="24"
      class="toolbar"
      style="padding-bottom: 0px;"
    >
      <el-form
        :inline="true"
        :model="filters"
        @submit.native.prevent
      >
        <el-form-item>
          <el-button
            type="primary"
            @click="handleAdd"
          >新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="users"
      highlight-current-row
      @selection-change="selsChange"
      style="width: 100%;"
    >
      <el-table-column
        type="selection"
        width="55"
      > </el-table-column>
      <el-table-column
        type="index"
        label="序号"
        width="60"
      > </el-table-column>
      <el-table-column
        prop="name"
        label="武器名称"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="info"
        label="简介"
        width="120"
      > </el-table-column>
      <el-table-column
        prop="icon"
        label="图标"
        width="150"
        align="center"
        header-align="center"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 100%; height: 100px"
            fit="contain"
            :src="scope.row.icon"
            :preview-src-list="[scope.row.icon]"
            :key="scope.row.id"
          >
            <div
              slot="error"
              class="image-slot"
            >
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="image"
        label="展示图"
        width="150"
        align="center"
        header-align="center"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 100%; height: 100px"
            fit="contain"
            :src="scope.row.image"
            :preview-src-list="[scope.row.image]"
            :key="scope.row.id"
          >
            <div
              slot="error"
              class="image-slot"
            >
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="skill1"
        label="技能1"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="skill2"
        label="技能2"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="skill3"
        label="技能3"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="skill4"
        label="技能4"
        min-width="120"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            type="danger"
            size="small"
            @click="handleDel(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col
      :span="24"
      class="toolbar"
    >
      <el-button
        type="danger"
        @click="batchRemove"
        :disabled="this.sels.length === 0"
      >批量删除</el-button>
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="20"
        :total="total"
        style="float:right;"
      >
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form
        :model="editForm"
        label-width="80px"
        :rules="editFormRules"
        ref="editForm"
      >
        <el-form-item
          label="武器名称"
          prop="name"
        >
          <el-input
            v-model="editForm.name"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="简介"
          prop="info"
        >
          <el-input
            v-model="editForm.info"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="技能1"
          prop="skill1"
        >
          <el-input
            v-model="editForm.skill1"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="技能2"
          prop="skill2"
        >
          <el-input
            v-model="editForm.skill2"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="技能3"
          prop="skill3"
        >
          <el-input
            v-model="editForm.skill3"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="技能4"
          prop="skill4"
        >
          <el-input
            v-model="editForm.skill4"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-upload
            class="upload-demo"
            drag
            action=""
            :http-request="uploadIcon"
            limit="1"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div
              class="el-upload__tip"
              slot="tip"
            >
              只能上传jpg/png文件，且不超过2M
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="展示图">
          <el-upload
            class="upload-demo"
            drag
            action=""
            :http-request="uploadImage"
            limit="1"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div
              class="el-upload__tip"
              slot="tip"
            >
              只能上传jpg/png文件，且不超过2M
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click.native="dialogFormVisible = false">取消</el-button>
        <el-button
          v-if="dialogStatus == 'create'"
          type="primary"
          @click="createData"
        >添加</el-button>
        <el-button
          v-else
          type="primary"
          @click="updateData"
        >修改</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import util from "@/utils/table.js";
import {
  deleteWeapon,
  editWeapon,
  createWeapon,
  getAllWeapons,
  upload,
  deleteManyWeapon
} from "@/api/userTable";
import * as fecha from "element-ui/lib/utils/date";

export default {
  data () {
    return {
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create"
      },
      dialogFormVisible: false,
      filters: {
        name: ""
      },
      users: [],
      total: 0,
      page: 1,
      sels: [], // 列表选中列
      editFormRules: {
        name: [{ required: true, message: "请输入武器名称", trigger: "blur" }]
      },
      // 编辑界面数据
      editForm: {
        id: '0',
        name: '',
        info: '',
        icon: '',
        image: '',
        skill1: '',
        skill2: '',
        skill3: '',
        skill4: ''
      },
      addFormVisible: false, // 新增界面是否显示
      addFormRules: {
        name: [{ required: true, message: "请输入武器名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 上传图片
    uploadIcon (param) {
      const para = { type: 4, id: this.editForm.id }
      const formData = new FormData()
      formData.append('file', param.file)
      upload(para, formData).then(res => {
        console.log('图片上传成功', res)
        this.editForm.icon = res.data
      })
    },

    // 上传图片
    uploadImage (param) {
      const para = { type: 5, id: this.editForm.id }
      const formData = new FormData()
      formData.append('file', param.file)
      upload(para, formData).then(res => {
        console.log('图片上传成功', res)
        this.editForm.image = res.data
      })
    },

    handleCurrentChange (val) {
      this.page = val;
      this.getWeapons();
    },
    // 获取用户列表
    getWeapons () {
      getAllWeapons().then(res => {
        this.total = res.data.length;
        this.users = res.data;
      });
    },
    // 删除
    handleDel (index, row) {
      this.$confirm("确认删除该角色吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          const para = { id: row.id };
          deleteWeapon(para).then(res => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getWeapons();
          });
        })
        .catch(() => { });
    },
    // 显示编辑界面
    handleEdit (index, row) {
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    // 显示新增界面
    handleAdd () {
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.editForm = {
      };
    },
    // 编辑
    updateData () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {})
            .then(() => {
              const para = { id: this.editForm.id }
              const data = Object.assign({}, this.editForm)
              editWeapon(para, data).then(res => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["editForm"].resetFields();
                this.dialogFormVisible = false;
                this.getWeapons();
              });
            })
            .catch(e => {
              // 打印一下错误
              console.log(e);
            });
        }
      });
    },
    // 新增
    createData: function () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {})
            .then(() => {
              const para = Object.assign({}, this.editForm);
              console.log(para);
              createWeapon(para).then(res => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["editForm"].resetFields();
                this.dialogFormVisible = false;
                this.getWeapons();
              });
            })
            .catch(e => {
              // 打印一下错误
              console.log(e);
            });
        }
      });
    },
    // 全选单选多选
    selsChange (sels) {
      this.sels = sels;
    },
    // 批量删除
    batchRemove () {
      var ids = this.sels.map(item => item.id).toString();
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          const para = { ids: ids };
          deleteManyWeapon(para).then(res => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getWeapons();
          });
        })
        .catch(() => { });
    }
  },
  mounted () {
    this.getWeapons();
  }
};
</script>

<style scoped></style>
