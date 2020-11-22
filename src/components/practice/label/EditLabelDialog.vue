<template>
  <el-dialog :before-close="clearDialog" :title="operate+'标签'" :visible.sync="dialogVisible">
    <el-form :model="this.labelModel">
      <el-form-item label="标签名称" :label-width="formLabelWidth">
        <el-input v-model="labelModel.labelName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="标签类型" :label-width="formLabelWidth">
        <el-select v-model="labelModel.labelTypeValue" placeholder="标签类型">
          <el-option v-for="item in labelTypeList" :label="item.desc" :value="item.code"
                     :key="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签值" :label-width="formLabelWidth">
        <el-input v-model="labelModel.labelValue" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="标签热度" :label-width="formLabelWidth">
        <el-rate v-model="labelModel.labelHot" style="line-height: 3rem;" :allow-half="true"></el-rate>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" v-on:click="saveLabel(labelModel)">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { saveLabel } from '@/api'
import { Message } from 'element-ui'

export default {
  name: 'EditLabelDialog',
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
    labelTypeList: {
      type: Array,
      default () {
        return []
      }
    },
    labelModel: {
      type: Object,
      default () {
        return {
          labelId: '',
          labelName: '',
          labelType: 'S',
          labelTypeValue: 'S',
          labelValue: ''
        }
      }
    }
  },
  methods: {
    clearDialog () {
      this.$emit('close')
    },
    saveLabel (labelModel) {
      saveLabel(labelModel)
        .then(response => {
          let code = response.data.code
          if (code === '200') {
            this.$emit('save')
            Message.success(response.data.message)
          } else {
            Message.error(response.data.message)
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
