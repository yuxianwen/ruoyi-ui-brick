import { deepClone } from '@/utils'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      loading: false, // 表单提交加载态
      itemLoading: false, // 获取详情加载态
      isDialog: true, // 是否是弹窗详情
      back: true, // 是否提交之后返回上一页（页面详情才有效）
      itemKeys: [], //
      model: {},
      defaultModel: {},
    }
  },
  props: {
    edit: {
      // 是否是编辑详情，默认增加
      type: Boolean,
      default: false,
    },
    view: {
      // 是否查看详情
      type: Boolean,
      default: false,
    },
    get: {
      // 默认从列表取详情，否则异步请求获取
      type: Boolean,
      default: false,
    },
    // 详情
    item: Object,
    value: {
      // 弹框详情显示态
      type: Boolean,
      default: false,
    },
    // 弹框详情ID
    itemId: {
      type: Number | String,
    },
  },

  created() {
    if (!this.isDialog) {
      this.requestItem()
    }
  },
  methods: {
    onDialogHidden() {},
    onDialogShow() {},
    // 提交表单
    submitForm() {
      return new Promise((resolve, reject) => {
        // 验证表单
        this.$refs.itemForm &&
          this.$refs.itemForm.validate((valid) => {
            if (valid) {
              this.formConfirm(resolve, reject)
            } else {
              reject(new Error('表单未验证通过'))
            }
          })
      })
    },
    // 是否确认操作
    formConfirm(resolve, reject) {
      if (this.isConfirm) {
        this.$confirm('你确定要提交吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.formRequest(resolve, reject)
        })
      } else {
        this.formRequest(resolve, reject)
      }
    },
    // 发起请求
    formRequest(resolve, reject) {
      // 获取表单参数
      this.loading = true
      const params = this.onBeforeSubmit
        ? this.onBeforeSubmit()
        : deepClone(this.model)
      this[this.edit ? 'editItem' : 'addItem'](params, this.id)
        .then((res) => {
          this.formSuccess(resolve, res)
        })
        .catch((err) => {
          reject(err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 表单提交成功
    formSuccess(resolve, res) {
      this.$message.success('操作成功！')
      if (!this.edit && this.back) {
        this.$refs.itemForm && this.$refs.itemForm.resetFields()
        this.onResetFields && this.onResetFields()
      }
      if (this.isDialog) {
        this.visible = false
        this.$emit('update')
      } else {
        this.back && this.$router.back()
      }
      resolve(res)
      this.onAfterSubmit && onAfterSubmit()
    },
    // 请求详情
    requestItem() {
      this.itemLoading = true
      this.onGetItemBefore && this.onGetItemBefore()
      this.getItem(this.id)
        .then((res) => {
          this.getItemModel(res.data)
          this.onGetItemAfter && this.onGetItemAfter()
        })
        .finally(() => {
          this.itemLoading = false
        })
    },
    // 得到详情参数
    getItemModel(data) {
      let params = deepClone(data || this.item || {})
      const newParams = {}
      const items = Object.keys(params)
      if (this.itemKeys.length) {
        items.forEach((key) => {
          this.itemKeys.includes(key) && (newParams[key] = params[key])
        })
      } else {
        newParams = data
      }
      this.model = {
        ...this.defaultModel,
        ...newParams,
      }
    },
    // 取消操作
    closeDialog() {
      this.visible = false
    },
  },
  computed: {
    // 详情主键ID
    id() {
      return this.isDialog ? this.itemId : this.$route.query.id
    },
    // 标题
    title() {
      const title = this.edit ? '修改' : this.view ? '查看' : '添加'
      return title + this.name
    },
    // 是否移动显示模式
    ...mapState({
      isMobile: (state) => state.app.device === 'mobile',
    }),
    visible: {
      get() {
        if (this.value) {
          // 打开窗口执行
          this.onDialogShow()
          this.get ? this.requestItem() : this.getItemModel()
        }
        return this.value
      },
      set(val) {
        this.$emit('input', val)
        // 关闭窗口执行
        this.onDialogHidden()
      },
    },
  },
}
