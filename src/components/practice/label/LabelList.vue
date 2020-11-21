<template>
  <el-main>
    <el-button type="primary" round icon="el-icon-circle-plus-outline"
               style="float: right" @click="dialogFormVisible = true; operate = '新建'">新建</el-button>
    <el-table
      stripe
      :data="tableData"
      style="width: 100%; alignment: center">
      <el-table-column
        prop="labelId"
        label="Id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="labelName"
        label="标签名">
      </el-table-column>
      <el-table-column
        prop="labelType.desc"
        label="标签类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createdBy"
        label="创建人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createdTime"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="标签值"
        width="100">
        <template slot-scope="scope">
          <el-tooltip placement="top">
            <div slot="content" v-text="scope.row.labelValue"></div>
            <el-button type="text" size="small">查看</el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-on:click="queryLabel(scope.row.labelId)" icon="el-icon-edit"></el-button>
          <el-button type="text" size="small" v-on:click="deleteLabel(scope.row.labelId)" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="paginationModel.current"
      :page-sizes="paginationModel.sizes"
      :page-size="paginationModel.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="paginationModel.total">
    </el-pagination>

    <el-dialog :before-close="clearDialog" :title="operate+'标签'" :visible.sync="dialogFormVisible">
      <el-form :model="this.labelModel">
        <el-form-item label="标签名称" :label-width="formLabelWidth">
          <el-input v-model="labelModel.labelName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标签类型" :label-width="formLabelWidth">
          <el-select v-model="labelModel.labelType" placeholder="标签类型">
            <el-option v-for="item in labelTypeList" :label="item.desc" :value="item.code"
                       :key="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签值" :label-width="formLabelWidth">
          <el-input v-model="labelModel.labelValue" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" v-on:click="saveLabel(labelModel)">保存</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
import { queryLabelList, queryLabelTypeList, saveLabel, queryLabel, deleteLabel } from '@/api'
import { Message } from 'element-ui'

export default {
  name: 'LabelList',
  data () {
    return {
      queryLabelModel: {
        page: 0,
        size: 10
      },
      paginationModel: {
        sizes: [5, 10, 20, 50],
        size: 10,
        total: 100,
        current: 1
      },
      tableData: [],
      dialogFormVisible: false,
      labelModel: {
        labelId: '',
        labelName: '',
        labelType: 'S',
        labelValue: ''
      },
      emptyLabelModel: {
        labelId: '',
        labelName: '',
        labelType: 'S',
        labelValue: ''
      },
      labelTypeList: [],
      formLabelWidth: '120px',
      operate: '新建'
    }
  },
  methods: {
    queryLabelList () {
      queryLabelList(this.$data.queryLabelModel)
        .then(response => {
          let code = response.data.code
          if (code === '200') {
            this.tableData = response.data.data.content
            this.paginationModel.total = response.data.data.totalElements
          } else {
            Message.error('查询失败')
          }
        })
    },
    handleCurrentChange (current) {
      this.paginationModel.current = current
      this.queryLabelModel.page = current - 1
      this.queryLabelList()
    },
    handleSizeChange (size) {
      this.paginationModel.size = size
      this.queryLabelModel.size = size
      this.queryLabelList()
    },
    queryLabelTypeList () {
      queryLabelTypeList()
        .then(response => {
          let code = response.data.code
          if (code === '200') {
            this.labelTypeList = response.data.data
            console.log(this.labelTypeList)
          }
        })
    },
    saveLabel (labelModel) {
      saveLabel(labelModel)
        .then(response => {
          let code = response.data.code
          if (code === '200') {
            this.dialogFormVisible = false
            this.initLabelModel()
            // this.initQueryLabelModel()
            this.queryLabelList()
            Message.success(response.data.message)
          } else {
            Message.error(response.data.message)
          }
        })
    },
    queryLabel (labelId) {
      this.operate = '编辑'
      queryLabel(labelId)
        .then(response => {
          let code = response.data.code
          if (code === '200') {
            this.dialogFormVisible = true
            this.labelModel = response.data.data
          } else {
            Message.error(response.data.message)
          }
        })
    },
    deleteLabel (labelId) {
      deleteLabel(labelId)
        .then(response => {
          let code = response.data.code
          if (code === '200') {
            // this.initQueryLabelModel()
            this.queryLabelList()
            Message.success(response.data.data)
          } else {
            Message.error(response.data.message)
          }
        })
    },
    clearDialog (done) {
      this.initLabelModel()
      done()
    },
    initLabelModel () {
      this.labelModel = {
        labelId: '',
        labelName: '',
        labelType: 'S',
        labelValue: ''
      }
    },
    initQueryLabelModel () {
      this.queryLabelModel = {
        page: 0,
        size: 10
      }
      this.paginationModel.current = 1
    }
  },
  mounted () {
    window.Vue = this
    // this.initQueryLabelModel()
    this.queryLabelList()
    this.queryLabelTypeList()
  }
}
</script>
<style scoped>

</style>
