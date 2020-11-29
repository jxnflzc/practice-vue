<template>
  <el-main>
    <el-button type="primary" round icon="el-icon-circle-plus-outline"
               style="float: right" v-on:click="dialogFormVisible = true; operate = '新建'">新建</el-button>
    <el-input style="width: 300px; float: right; margin-right: 20px"
              placeholder="请输入Id或名称" v-model="queryModel.keywords"
              class="input-with-select" clearable @keyup.enter.native="searchGroupList">
      <el-button slot="append" v-on:click="searchGroupList" icon="el-icon-search"></el-button>
    </el-input>
    <el-table
      stripe
      :data="tableData"
      style="width: 100%; alignment: center">
      <el-table-column
        type="index"
        label="序号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="groupId"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="groupName"
        label="客群名称"
        width="180">
      </el-table-column>
      <el-table-column
        label="客群标签">
        <template slot-scope="scope">
          <el-tag v-for="tag in generatorTags(scope.row.tags)" v-bind:key="tag.value" style="margin: 5px 5px">{{tag.label}}</el-tag>
        </template>
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
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-on:click="queryGroup(scope.row.groupId)" icon="el-icon-edit"></el-button>
          <el-button type="text" size="small" v-on:click="deleteGroupAlert(scope.row)" icon="el-icon-delete"></el-button>
        </template>
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

    <edit-group-dialog :dialogVisible="dialogFormVisible" :operate="operate" :labelList="allLabels"
                       @close="clearDialog" @save="saveDialog" :groupModel="groupModel"></edit-group-dialog>
  </el-main>
</template>

<script>
import { queryGroupList, queryAllLabels, queryGroup, deleteGroup } from '@/api'
import editGroupDialog from '@/components/practice/group/EditGroupDialog'
import { Message } from 'element-ui'

export default {
  name: 'GroupList',
  components: {
    editGroupDialog: editGroupDialog
  },
  data () {
    return {
      queryModel: {
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
      allLabels: [],
      dialogFormVisible: false,
      groupModel: {
        groupId: '',
        groupName: '',
        groupDesc: '',
        tags: []
      },
      formLabelWidth: '120px',
      operate: '新建'
    }
  },
  methods: {
    queryGroupList () {
      queryGroupList(this.queryModel)
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
    queryAllLabels () {
      queryAllLabels()
        .then(response => {
          let code = response.data.code
          if (code === '200') {
            this.allLabels = response.data.data
          } else {
            Message.error('查询失败')
          }
        })
    },
    searchLogList () {
      this.queryLogModel.page = 0
      this.queryGroupList()
    },
    handleCurrentChange (current) {
      this.paginationModel.current = current
      this.queryModel.page = current - 1
      this.queryGroupList()
    },
    handleSizeChange (size) {
      this.paginationModel.size = size
      this.queryModel.size = size
      this.queryGroupList()
    },
    generatorTags (tags) {
      let res = []
      let list = JSON.parse(tags)
      list.forEach(tag => {
        res.push(tag)
      })
      return res
    },
    clearDialog () {
      this.initGroupModel()
      this.dialogFormVisible = false
    },
    saveDialog () {
      this.initGroupModel()
      this.dialogFormVisible = false
      this.queryGroupList()
    },
    initGroupModel () {
      this.groupModel = {
        groupId: '',
        groupName: '',
        groupDesc: '',
        tags: ''
      }
    },
    queryGroup (groupId) {
      this.operate = '编辑'
      queryGroup(groupId)
        .then(response => {
          let code = response.data.code
          if (code === '200') {
            this.dialogFormVisible = true
            this.groupModel = response.data.data
            this.groupModel.tags = this.generatorTags(response.data.data.tags)
          } else {
            Message.error(response.data.message)
          }
        })
    },
    deleteGroupAlert (group) {
      this.$confirm(`确定要删除客群 ${group.groupName} 吗`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteGroup(group.groupId)
      }).catch(() => {
        // Do Nothing
      })
    },
    deleteGroup (groupId) {
      deleteGroup(groupId)
        .then(response => {
          let code = response.data.code
          if (code === '200') {
            this.queryGroupList()
            Message.success(response.data.data)
          } else {
            Message.error(response.data.message)
          }
        })
    },
    searchGroupList () {
      this.queryModel.page = 0
      this.queryGroupList()
    }
  },
  mounted () {
    window.Vue = this
    // this.initQueryLabelModel()
    this.queryGroupList()
    this.queryAllLabels()
  }
}
</script>
<style scoped>
  .el-select .el-input {
    width: 130px;
  }
</style>
