export default {
  methods: {
    // 删除单个条目
    handleDelete(row) {
      const ids = row ? row[this.idKey] : this.ids
      console.log(this.ids)
      this.$confirm('是否确认删除编号为"' + ids + '"的数据项？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        showClose: false,
        type: 'warning',
      }).then(() => {
        this.deleteItem(ids).then(() => {
          this.$message.success('删除成功!')
          this.loadList()
        })
      })
    },
  },
}
