<template>
  <el-main>
    <el-button type="primary" round icon="el-icon-circle-plus-outline"
               style="float: right" v-on:click="editDialogVisible = true; operate = '新建'">新建</el-button>
    <el-input style="width: 300px; float: right; margin-right: 20px"
              placeholder="请输入Id或名称" v-model="queryModel.keywords"
              class="input-with-select" clearable @keyup.enter.native="searchNoticeList">
      <el-button slot="append" v-on:click="searchNoticeList" icon="el-icon-search"></el-button>
    </el-input>
    <el-select style="width: 200px; float: right; margin-right: 20px" v-on:change="searchNoticeList"
               v-model="queryModel.noticeLevel" placeholder="请选择通知级别">
      <el-option
        v-for="item in queryLevelList"
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
      <el-table-column
        prop="noticeId"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="noticeTitle"
        label="通知标题">
      </el-table-column>
      <el-table-column
        label="通知级别"
        width="180">
        <template slot-scope="scope">
          <el-tag :type="scope.row.noticeLevel.code" style="margin: 5px 5px">{{scope.row.noticeLevel.desc}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createdBy"
        label="发布人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createdTime"
        label="发布时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="updatedTime"
        label="更新时间"
        width="180">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-on:click="queryNotice(scope.row.noticeId, '查看', false)" icon="el-icon-notebook-2"></el-button>
          <el-button type="text" size="small" v-if="canShow" v-on:click="queryNotice(scope.row.noticeId, '编辑', true)" icon="el-icon-edit"></el-button>
          <el-button type="text" size="small" v-if="canShow" v-on:click="deleteNoticeAlert(scope.row)" icon="el-icon-delete"></el-button>
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

    <edit-notice-dialog :dialogVisible="editDialogVisible" :operate="operate" :noticeModel="noticeModel"
                       @close="clearDialog" @save="saveDialog" :noticeLevelList="noticeLevelList"></edit-notice-dialog>

    <show-notice-dialog :dialogVisible="showDialogVisible" :operate="operate" :noticeModel="noticeModel"
                       @close="clearDialog" @save="saveDialog" :noticeLevelList="noticeLevelList"></show-notice-dialog>
  </el-main>
</template>

<script>
import { queryNoticeList, queryNotice, deleteNotice, queryNoticeLevelList } from '@/api'
import editNoticeDialog from '@/components/practice/notice/EditNoticeDialog'
import showNoticeDialog from '@/components/practice/notice/ShowNoticeDialog'
import { Message } from 'element-ui'

export default {
  name: 'NoticeList',
  components: {
    editNoticeDialog: editNoticeDialog,
    showNoticeDialog: showNoticeDialog
  },
  data () {
    return {
      queryModel: {
        page: 0,
        size: 10,
        keywords: '',
        noticeLevel: ''
      },
      paginationModel: {
        sizes: [5, 10, 20, 50],
        size: 10,
        total: 0,
        current: 1
      },
      tableData: [],
      editDialogVisible: false,
      showDialogVisible: false,
      noticeModel: {
        noticeId: '',
        noticeTitle: '',
        noticeLevel: '',
        noticeLevelValue: '',
        noticeContent: ''
      },
      noticeLevelList: [],
      queryLevelList: [{
        code: '',
        desc: '全部'
      }],
      formLabelWidth: '120px',
      operate: '新建',
      canShow: ['A'].includes(sessionStorage['permission'] ? sessionStorage['permission'] : 'V')
    }
  },
  methods: {
    queryNoticeList () {
      queryNoticeList(this.queryModel)
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
    searchNoticeList () {
      this.queryModel.page = 0
      this.queryNoticeList()
    },
    handleCurrentChange (current) {
      this.paginationModel.current = current
      this.queryModel.page = current - 1
      this.queryNoticeList()
    },
    handleSizeChange (size) {
      this.paginationModel.size = size
      this.queryModel.size = size
      this.queryNoticeList()
    },
    clearDialog () {
      this.initNoticeModel()
      this.editDialogVisible = false
      this.showDialogVisible = false
    },
    saveDialog () {
      this.initNoticeModel()
      this.editDialogVisible = false
      this.queryNoticeList()
    },
    initNoticeModel () {
      this.noticeModel = {
        noticeId: '',
        noticeTitle: '',
        noticeLevel: '',
        noticeLevelValue: '',
        noticeContent: ''
      }
    },
    queryNotice (noticeId, op, edit) {
      this.operate = op
      queryNotice(noticeId)
        .then(response => {
          let code = response.data.code
          if (code === '200') {
            if (edit) {
              this.editDialogVisible = true
            } else {
              this.showDialogVisible = true
            }
            this.noticeModel = response.data.data
            this.$set(this.noticeModel, 'noticeLevelValue', response.data.data.noticeLevel.code)
          } else {
            Message.error(response.data.message)
          }
        })
    },
    deleteNoticeAlert (notice) {
      this.$confirm(`确定要删除客群 ${notice.noticeTitle} 吗`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteNotice(notice.noticeId)
      }).catch(() => {
        // Do Nothing
      })
    },
    deleteNotice (groupId) {
      deleteNotice(groupId)
        .then(response => {
          let code = response.data.code
          if (code === '200') {
            this.queryNoticeList()
            Message.success(response.data.data)
          } else {
            Message.error(response.data.message)
          }
        })
    },
    queryNoticeLevelList () {
      queryNoticeLevelList()
        .then(response => {
          let code = response.data.code
          if (code === '200') {
            this.noticeLevelList = response.data.data
            this.queryLevelList = this.queryLevelList.concat(response.data.data)
            console.log(this.noticeLevelList)
          }
        })
    }
  },
  mounted () {
    window.Vue = this
    // this.initQueryLabelModel()
    this.queryNoticeList()
    this.queryNoticeLevelList()
  }
}
</script>
<style scoped>
  .el-select .el-input {
    width: 130px;
  }
</style>
