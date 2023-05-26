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
      style="width: 100%;"
      @selection-change="selsChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        type="index"
        label="序号"
        width="60"
      />
      <el-table-column
        prop="name"
        label="活动名称"
        width="120"
      />
      <el-table-column
        prop="title"
        label="标题"
        width="120"
      />
      <el-table-column
        prop="introduction"
        label="介绍"
        width="120"
      />
      <el-table-column
        prop="background_pic"
        label="活动图片"
        width="180"
        align="center"
        header-align="center"
      >
        <template slot-scope="scope">
          <el-image
            :key="scope.row.id"
            style="width: 100%; height: 100px"
            fit="contain"
            :src="scope.row.background_pic"
            :preview-src-list="[scope.row.background_pic]"
          >
            <div
              slot="error"
              class="image-slot"
            >
              <i class="el-icon-picture-outline" />
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="start_time"
        label="活动开始"
        min-width="120"
        :formatter="dateFormat"
      />
      <el-table-column
        prop="stop_time"
        label="活动结束"
        min-width="120"
        :formatter="dateFormat"
      />
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
        :disabled="this.sels.length === 0"
        @click="batchRemove"
      >批量删除</el-button>
      <el-pagination
        layout="prev, pager, next"
        :page-size="20"
        :total="total"
        style="float:right;"
        @current-change="handleCurrentChange"
      />
    </el-col>

    <!--编辑界面-->
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form
        ref="editForm"
        :model="editForm"
        label-width="80px"
        :rules="editFormRules"
      >
        <el-form-item
          label="活动名称"
          prop="name"
        >
          <el-input
            v-model="editForm.name"
            auto-complete="off"
            style="width: 50%;"
          />
        </el-form-item>
        <el-form-item
          label="标题"
          prop="title"
        >
          <el-input
            v-model="editForm.title"
            auto-complete="off"
            style="width: 50%;"
          />
        </el-form-item>
        <el-form-item
          label="介绍"
          prop="introduction"
        >
          <el-input
            v-model="editForm.introduction"
            auto-complete="off"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item label="活动图片">
          <el-upload
            class="upload-demo"
            drag
            action=""
            :http-request="uploadImage"
            limit="1"
            multiple
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div
              slot="tip"
              class="el-upload__tip"
            >
              只能上传jpg/png文件，且不超过2M
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item
          label="开始时间"
          prop="start_time"
        >
          <el-col :span="11">
            <el-date-picker
              v-model="editForm.start_day"
              type="date"
              placeholder="选择日期"
              style="width: 100%;"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            />
          </el-col>
          <el-col
            class="line"
            :span="2"
            style="float:left;"
          >-</el-col>
          <el-col :span="11">
            <el-time-picker
              v-model="editForm.start_time"
              placeholder="选择时间"
              style="width: 100%; float:left;"
              format="HH:mm:ss"
              value-format="HH:mm:ss"
            />
          </el-col>
        </el-form-item>
        <el-form-item
          label="结束时间"
          prop="stop_time"
        >
          <el-col :span="11">
            <el-date-picker
              v-model="editForm.stop_day"
              type="date"
              placeholder="选择日期"
              style="width: 100%;"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            />
          </el-col>
          <el-col
            class="line"
            :span="2"
            style="float:left;"
          >-</el-col>
          <el-col :span="11">
            <el-time-picker
              v-model="editForm.stop_time"
              placeholder="选择时间"
              style="width: 100%;  float:left;"
              format="HH:mm:ss"
              value-format="HH:mm:ss"
            />
          </el-col>
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
import util from '@/utils/table.js'
import {
  createActive,
  upload,
  getAllActive,
  editActive,
  deleteActive,
  deleteManyActive
} from '@/api/userTable'
import * as fecha from 'element-ui/lib/utils/date'
// import { UploadFilled } from '@element-plus/icons-vue';
export default {
  data () {
    return {
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogFormVisible: false,
      filters: {
        name: ''
      },
      users: [],
      total: 0,
      page: 1,
      sels: [], // 列表选中列
      editFormRules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        start_time: [{ required: true, message: '请选择时间', trigger: 'change' }],
        stop_time: [{ required: true, message: '请选择时间', trigger: 'change' }]
      },
      // 编辑界面数据
      editForm: {
        id: '0',
        name: '',
        title: '',
        start_day: '',
        start_time: '',
        stop_day: '',
        stop_time: '',
        background_pic: '',
        introduction: ''
      },

      addFormVisible: false, // 新增界面是否显示
      addFormRules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        start_time: [{ required: true, message: '请选择时间', trigger: 'change' }],
        stop_time: [{ required: true, message: '请选择时间', trigger: 'change' }]
      }
    }
  },
  mounted () {
    this.getActives()
  },
  methods: {
    // 上传图片
    uploadImage (param) {
      const para = { type: 1, id: this.editForm.id }
      const formData = new FormData()
      formData.append('file', param.file)
      upload(para, formData).then(res => {
        console.log('图片上传成功', res)
        this.editForm.background_pic = res.data
      })
    },

    dateFormat (row, column, cellValue) {
      return cellValue
        ? fecha.format(new Date(cellValue), 'yyyy-MM-dd HH:mm:ss')
        : ''
    },
    handleCurrentChange (val) {
      this.page = val
      this.getActives()
    },
    // 获取用户列表
    getActives () {
      getAllActive().then(res => {
        this.total = res.data.length
        this.users = res.data
      })
    },
    // 删除
    handleDel (index, row) {
      this.$confirm('确认删除该角色吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          const para = { id: row.id }
          deleteActive(para).then(res => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getActives()
          })
        })
        .catch(() => { })
    },
    // 显示编辑界面
    handleEdit (index, row) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.editForm = Object.assign({}, row)
    },
    // 显示新增界面
    handleAdd () {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.editForm = {
        name: '',
        title: '',
        activity_type: 0,
        start_day: '',
        start_time: '',
        stop_day: '',
        stop_time: '',
        background_pic: '',
        introduction: ''
      }
    },
    // 编辑
    updateData () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {})
            .then(() => {
              const para = { id: this.editForm.id }
              const data = Object.assign({}, this.editForm)
              data.start_time =
                !data.start_time || data.start_time === ''
                  ? ''
                  : util.formatDate.format(new Date(data.start_day + ' ' + data.start_time), 'yyyy-MM-dd hh:mm:ss')
              data.stop_time =
                !data.stop_time || data.stop_time === ''
                  ? ''
                  : util.formatDate.format(new Date(data.stop_day + ' ' + data.stop_time), 'yyyy-MM-dd hh:mm:ss')
              editActive(para, data).then(res => {
                this.$message({
                  message: '提交成功',
                  type: 'success'
                })
                this.$refs['editForm'].resetFields()
                this.dialogFormVisible = false
                this.getActives()
              })
            })
            .catch(e => {
              // 打印一下错误
              console.log(e)
            })
        }
      })
    },
    // 新增
    createData: function () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {})
            .then(() => {
              const data = Object.assign({}, this.editForm)
              data.start_time =
                !data.start_time || data.start_time === ''
                  ? ''
                  : util.formatDate.format(new Date(data.start_day + ' ' + data.start_time), 'yyyy-MM-dd hh:mm:ss')
              data.stop_time =
                !data.stop_time || data.stop_time === ''
                  ? ''
                  : util.formatDate.format(new Date(data.stop_day + ' ' + data.stop_time), 'yyyy-MM-dd hh:mm:ss')
              createActive(data).then(res => {
                this.$message({
                  message: '提交成功',
                  type: 'success'
                })
                this.$refs['editForm'].resetFields()
                this.dialogFormVisible = false
                this.getActives()
              })
            })
            .catch(e => {
              // 打印一下错误
              console.log(e)
            })
        }
      })
    },
    // 全选单选多选
    selsChange(sels) {
      this.sels = sels
    },
    // 批量删除
    batchRemove() {
      var ids = this.sels.map(item => item.id).toString()
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          const para = { ids: ids }
          deleteManyActive(para).then(res => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getActives()
          })
        })
        .catch(() => { })
    }
  }
}
</script>

<style scoped></style>
