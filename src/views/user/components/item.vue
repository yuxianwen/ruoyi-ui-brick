<template>
  <el-dialog :title="title" :visible.sync="visible" width="900px">
    <el-form
      ref="itemForm"
      v-loading="itemLoading"
      :model="model"
      :rules="rules"
      label-width="120px"
      :class="{ disabled: view }"
      :label-position="isMobile ? 'top' : 'right'"
      @submit.prevent.native="submitForm"
    >
      <el-row>
        <el-col :sm="24" :md="12">
          <el-form-item label="用户昵称" prop="nickName">
            <el-input v-model="model.nickName" clearable> </el-input>
          </el-form-item>
        </el-col>

        <el-col :sm="24" :md="12">
          <el-form-item label="手机号码" prop="phonenumber">
            <el-input v-model="model.phonenumber" clearable> </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="model.email" placeholder="" clearable>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12">
          <el-form-item label="用户权限" prop="power">
            <dict-select
              v-model="model.power"
              type="bms_accoun_permission"
              :auto-load="edit"
              refresh
              multiple
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" />
        <el-col :sm="24" :md="12">
          <el-form-item label="状态" prop="status">
            <dict-select
              v-model="model.status"
              type="sys_normal_disable"
              radio
            />
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="备注信息" prop="remark">
            <el-input v-model="model.remark" type="textarea" clearable>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button
          type="primary"
          native-type="submit"
          :loading="loading"
          :disabled="loading"
          >保存</el-button
        >
        <el-button @click="visible = false">取消</el-button>
      </el-form-item>
      <el-form-item>
        <slot />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import baseItem from '@/mixins/baseItem'
import { getUser, addUser, updateUser } from '@/api/system/user'
import { validateEmpty } from '@/utils/validator'
import DictSelect from '@/components/DictSelect'
import { deepClone } from '@/utils'

export default {
  components: {
    DictSelect,
  },
  mixins: [baseItem],
  data() {
    return {
      defaultModel: {
        status: 6,
      },
      name: '用户',
      itemKeys: ['nickName', 'phonenumber', 'email', 'status', 'remark'],
      rules: {
        nickName: [validateEmpty],
        appUserAccount: [validateEmpty],
        phonenumber: [validateEmpty],
        status: [validateEmpty],
      },
    }
  },

  methods: {
    getItem: getUser,
    editItem: updateUser,
    addItem: addUser,
    // 弹框关闭事件监听
    onDialogShow() {
      console.log('onDialogShow', 'Dialog show')
    },
    // 弹框关闭事件监听
    onDialogHidden() {
      console.log('onDialogHidden', 'Dialog hidden')
    },
    // 表单提交之前数据处理，必须返回表单参数
    onBeforeSubmit() {
      console.log('onBeforeSubmit')
      return deepClone(this.model)
    },
    // 详情页面时，手动表单重置某些字段
    onResetFields() {},
    // 表单提交成功之后事件
    onAfterSubmit() {
      console.log('onAfterSubmit')
    },
    // 接口请求详情数据之前事件
    onGetItemBefore() {
      console.log('onGetItemBefore')
    },
    // 接口请求详情数据之后事件
    onGetItemAfter() {
      console.log('onGetItemAfter')
    },
  },
}
</script>
