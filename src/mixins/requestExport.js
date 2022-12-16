export default {
  data () {
    return {
      exportLoading: false,
    }
  },
  methods: {
    /** 导出按钮操作 */
    requestExport () {
      this.exportLoading = true
      //   this.exportItem(this.listQuery)
      //     .then(() => {})
      //     .finally(() => {
      //       this.exportLoading = false
      //     })
      this.download(
        this.exportPath,
        {
          ...this.listQuery,
        },
        this.exportName + `_${new Date().getTime()}.xls`
      ).finally(() => {
        this.exportLoading = false
      })
    },
  },
}
