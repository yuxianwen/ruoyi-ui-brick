export default {
  methods: {
    toggleItem(config = {}) {
      const option = {
        changeKey: 'status',
        idKey: 'id',
        trueValue: 1,
        falseValue: 0,
        row: {},
        otherParams: {},
        ...config,
      }
      this.updateItem({
        [option.idKey]: option.row[option.idKey],
        [option.changeKey]: ~~option.row[option.changeKey]
          ? option.trueValue
          : option.falseValue,
        ...option.otherParams,
      })
        .then(() => {
          this.$message.success('操作成功')
        })
        .finally(() => {
          this.loadList()
        })
    },
    toggleSelectItem(config = {}) {
      const option = {
        changeKey: 'status',
        idKey: 'id',
        value: 1,
        row: {},
        otherParams: {},
        ...config,
      }
      const promise = []
      let success = 0
      let fail = 0
      this.multipleSelection.forEach((v) => {
        promise.push(
          this.updateItem({
            [option.idKey]: v[option.idKey],
            [option.changeKey]: option.value,
            ...option.otherParams,
          })
            .then(() => {
              success++
            })
            .catch(() => {
              fail++
            })
        )
      })
      Promise.all(promise).finally(() => {
        this.onLoad(this.page)
        this.$notify({
          title: '操作提示',
          dangerouslyUseHTMLString: true,
          message: `已完成操作，成功<b class="text-green">${success}</b>条，失败<b class="text-red">${fail}</b>条`,
          offset: 100,
        })
      })
    },
  },
}
