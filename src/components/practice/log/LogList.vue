<template>
  <el-main>
    <el-input style="width: 300px; float: right; margin-right: 20px"
              placeholder="请输入日志内容" v-model="queryLogModel.keywords"
              class="input-with-select" clearable v-on:clear="searchLogList"
              @keyup.enter.native="searchLogList">
      <el-button slot="append" v-on:click="searchLogList" icon="el-icon-search"></el-button>
    </el-input>
    <el-select style="width: 200px; float: right; margin-right: 20px" v-on:change="searchLogList"
               v-model="queryLogModel.logType" placeholder="请选择日志分类">
      <el-option
        v-for="item in queryTypeList"
        :key="item.code"
        :label="item.desc"
        :value="item.code">
      </el-option>
    </el-select>
    <el-table
      stripe
      :data="tableData"
      style="width: 100%; alignment: center">
      <el-table-column
        type="index"
        label="序号"
        width="80">
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="logId"-->
<!--        label="Id"-->
<!--        width="180">-->
<!--      </el-table-column>-->
      <el-table-column
        prop="logType.desc"
        label="日志类型"
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
        prop="logContent"
        label="日志内容">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="paginationModel.current"
      :page-sizes="paginationModel.sizes"
      :page-size="paginationModel.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="paginationModel.total">
    </el-pagination>
  </el-main>
</template>

<script>
import { queryLogList, queryLogTypeList } from '@/api'
import { Message } from 'element-ui'

export default {
  name: 'LogList',
  data () {
    return {
      queryLogModel: {
        page: 0,
        size: 10,
        keywords: '',
        logType: ''
      },
      paginationModel: {
        sizes: [5, 10, 20, 50],
        size: 10,
        total: 0,
        current: 1
      },
      tableData: [],
      logTypeList: [],
      queryTypeList: [{
        code: '',
        desc: '全部'
      }],
      formLabelWidth: '120px',
      operate: '新建'
    }
  },
  methods: {
    queryLogList () {
      queryLogList(this.queryLogModel)
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
    searchLogList () {
      this.queryLogModel.page = 0
      this.queryLogList()
    },
    handleCurrentChange (current) {
      this.paginationModel.current = current
      this.queryLogModel.page = current - 1
      this.queryLogList()
    },
    handleSizeChange (size) {
      this.paginationModel.size = size
      this.queryLogModel.size = size
      this.queryLogList()
    },
    initQueryLabelModel () {
      this.queryLabelModel = {
        page: 0,
        size: 10
      }
      this.paginationModel.current = 1
    },
    queryLogTypeList () {
      queryLogTypeList()
        .then(response => {
          let code = response.data.code
          if (code === '200') {
            this.logTypeList = response.data.data
            this.queryTypeList = this.queryTypeList.concat(response.data.data)
            console.log(this.labelTypeList)
          }
        })
    }
  },
  mounted () {
    window.Vue = this
    // this.initQueryLabelModel()
    this.queryLogList()
    this.queryLogTypeList()
  }
}
</script>
<style scoped>
  .el-select .el-input {
    width: 130px;
  }
</style>
