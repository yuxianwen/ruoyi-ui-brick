import { export_json_to_excel } from '@/vendor/Export2Excel'

// 前端导出
export default {
  data() {
    return {
      downloadLoading: false,
      exportFileName: new Date() + '导出的文件',
      autoWidth: true,
      bookType: 'xlsx',
    }
  },
  methods: {
    // 导出
    exportList(all = true) {
      let list
      if (all) {
        if (this.listData.length) {
          list = this.listData
        } else {
          return
        }
      } else {
        if (this.multipleSelection.length) {
          list = this.multipleSelection
        } else {
          this.$message({
            message: '请至少选择一项',
            type: 'warning',
          })
          return
        }
      }
      list = JSON.parse(JSON.stringify(list))
      if (this.beforeDownload) {
        // 导出之前处理数据
        list = this.beforeDownload(list)
      }
      let listLabel = this.listLabel
      let listRow = this.listRow
      if (this.beforeDownloadListRow) {
        // 修改需要导出的列
        listRow = this.beforeDownloadListRow()
      }
      if (this.beforeDownloadListLabel) {
        // 修改表头
        listLabel = this.beforeDownloadListLabel()
      }
      // 只获取选中的数据，后面的不执行
      if (this.getSelectedList) {
        return this.getSelectedList(list, listLabel, listRow)
      }
      this.downloadLoading = true
      const data = this.formatJson(listRow, list)
      export_json_to_excel({
        header: listLabel,
        data,
        filename: this.exportFileName !== '' ? this.exportFileName : undefined,
        autoWidth: this.autoWidth,
        bookType: this.bookType,
      })
      !all && this.$refs.listTable.clearSelection()
      this.downloadLoading = false
      this.$message.success('导出成功')
    },

    async exportAllList() {
      this.downloadLoading = true
      if (this.listQuery.size !== -1) {
        this.listQuery.size = -1
        await this.loadList()
      }
      this.exportList()
    },

    // 导出格式化时间
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          return v[j]
        })
      )
    },
  },
}
