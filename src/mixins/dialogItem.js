export default {
  data() {
    return {
      addDialogVisible: false,
      editDialogVisible: false,
      viewDialogVisible: false,
      listItem: {}
    }
  },
  methods: {
    // 打开添加Dialog
    openAddDialog() {
      this.addDialogVisible = true
    },

    // 打开编辑Dialog
    openEditDialog(index, row) {
      this.editDialogVisible = true
      this.openItemDialog(index, row)
    },

    // 打开查看Dialog
    openViewDialog(index, row) {
      this.viewDialogVisible = true
      this.openItemDialog(index, row)
    },

    openItemDialog(index, row) {
      this.listItem = JSON.parse(JSON.stringify(row))
      this.index = index
    }
  }
}
