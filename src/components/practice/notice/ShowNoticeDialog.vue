<template>
  <el-dialog :before-close="clearDialog" :title="operate+'通知'" :visible.sync="dialogVisible">
    <el-form :model="this.noticeModel" ref="noticeModel">
      <el-form-item label="通知标题" :label-width="formLabelWidth" prop="noticeTitle">
        <template >{{ noticeModel.noticeTitle }}</template>
      </el-form-item>
      <el-form-item label="通知正文" :label-width="formLabelWidth" prop="noticeContent">
        <template>{{ noticeModel.noticeContent }}</template>
      </el-form-item>
      <el-form-item label="通知级别" :label-width="formLabelWidth">
        <el-tag :type="noticeModel.noticeLevel.code" style="margin: 5px 5px">{{noticeModel.noticeLevel.desc}}</el-tag>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>

export default {
  name: 'ShowNoticeDialog',
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
    edit: {
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
  methods: {
    clearDialog () {
      this.$refs.noticeModel.resetFields()
      this.$emit('close')
    }
  },
  mounted () {
    window.Vue = this
  }
}
</script>

<style scoped>

</style>
