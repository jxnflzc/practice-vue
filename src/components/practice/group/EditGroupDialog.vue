<template>
  <el-dialog :before-close="clearDialog" :title="operate+'客群'" :visible.sync="dialogVisible">
    <el-form :model="this.groupModel" :rules="rules" ref="groupModel">
      <el-form-item label="客群名称" :label-width="formLabelWidth" prop="groupName">
        <el-input v-model="groupModel.groupName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="客群描述" :label-width="formLabelWidth" prop="groupDesc">
        <el-input v-model="groupModel.groupDesc" type="textarea" :rows="rows" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="客群标签" :label-width="formLabelWidth" prop="tags">
        <el-select v-model="groupModel.tags" style="width: 600px" multiple placeholder="请选择标签">
          <el-option v-for="item in labelList" :label="item.labelName" :value="{value:item.labelId, label:item.labelName}"
                     :key="item.labelId"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" v-on:click="saveGroup(groupModel)">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { saveGroup } from '@/api'
import { Message } from 'element-ui'

export default {
  name: 'EditGroupDialog',
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
    labelList: {
      type: Array,
      default () {
        return []
      }
    },
    groupModel: {
      type: Object,
      default () {
        return {
          groupId: '',
          groupName: '',
          groupDesc: '',
          tags: []
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
        groupName: [{ required: true, message: '请输入客群名称', trigger: 'blur' }],
        groupDesc: [{ required: true, message: '请输入客群描述', trigger: 'blur' }],
        tags: [{ required: true, message: '请选择至少一个标签', trigger: 'blur' }]
      }
    }
  },
  methods: {
    clearDialog () {
      this.$refs.groupModel.resetFields()
      this.$emit('close')
    },
    saveGroup (groupModel) {
      this.$refs.groupModel.validate((valid) => {
        if (valid) {
          saveGroup(groupModel)
            .then(response => {
              let code = response.data.code
              if (code === '200') {
                this.$emit('save')
                this.$refs.groupModel.resetFields()
                Message.success(response.data.message)
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
