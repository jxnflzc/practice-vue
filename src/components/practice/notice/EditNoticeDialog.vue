<template>
  <el-dialog :before-close="clearDialog" :title="operate+'通知'" :visible.sync="dialogVisible">
    <el-form :model="this.noticeModel" :rules="rules" ref="noticeModel">
      <el-form-item label="通知标题" :label-width="formLabelWidth" prop="noticeTitle">
        <el-input v-model="noticeModel.noticeTitle" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="通知正文" :label-width="formLabelWidth" prop="noticeContent">
        <el-input v-model="noticeModel.noticeContent" type="textarea" :rows="rows" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="通知级别" :label-width="formLabelWidth" prop="noticeLevelValue">
        <el-select v-model="noticeModel.noticeLevelValue" placeholder="请选择通知级别">
          <el-option v-for="item in noticeLevelList" :label="item.desc" :value="item.code"
                     :key="item.code"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" v-on:click="saveNotice(noticeModel)">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { saveNotice } from '@/api'
import { Message } from 'element-ui'

export default {
  name: 'EditNoticeDialog',
  props: {
    operate: {
      type: String,
      default: '新建'
    },
    formLabelWidth: {
      type: String,
      default: '120px'
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    noticeLevelList: {
      type: Array,
      default () {
        return []
      }
    },
    noticeModel: {
      type: Object,
      default () {
        return {
          noticeId: '',
          noticeTitle: '',
          noticeLevel: '',
          noticeLevelValue: '',
          noticeContent: ''
        }
      }
    },
    rows: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      rules: {
        noticeTitle: [{ required: true, message: '请输入通知标题', trigger: 'blur' }],
        noticeContent: [{ required: true, message: '请输入通知正文', trigger: 'blur' }],
        noticeLevelValue: [{ required: true, message: '请选择通知级别', trigger: 'blur' }]
      }
    }
  },
  methods: {
    clearDialog () {
      this.$refs.noticeModel.resetFields()
      this.$emit('close')
    },
    saveNotice (noticeModel) {
      this.$refs.noticeModel.validate((valid) => {
        if (valid) {
          saveNotice(noticeModel)
            .then(response => {
              let code = response.data.code
              if (code === '200') {
                this.$emit('save')
                this.$refs.noticeModel.resetFields()
                Message.success(response.data.data)
              } else {
                Message.error(response.data.message)
              }
            })
        } else {
          return false
        }
      })
    }
  },
  mounted () {
    window.Vue = this
  }
}
</script>

<style scoped>

</style>
