export default {
  methods: {
    importHandle(file) {
      let formData = new FormData()
      formData.append('file', file.raw)
      if (this.importParams) {
        Object.keys(this.importParams).forEach((v) => {
          formData.append(v, this.importParams[v])
        })
      }
      const loading = this.$loading({
        lock: true,
        text: '正在导入...',
        spinner: 'el-icon-loading',
      })
      this.importList(formData)
        .then((res) => {
          this.$message.success(res.data.msg || '导入成功')
          !this.importNotLoadList && this.onLoad()
          this.importAfter && this.importAfter()
        })
        .finally(() => {
          loading.close()
        })
    },
  },
}
