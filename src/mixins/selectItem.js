export default {
  data() {
    return {
      idKey: 'id',
      multipleSelection: [],
    }
  },
  computed: {
    single() {
      return this.multipleSelection.length !== 1
    },
    multiple() {
      return this.multipleSelection.length === 0
    },
    ids() {
      return this.multipleSelection.map((item) => {
        return item[this.idKey]
      })
    },
  },

  methods: {
    // 勾选多个
    selectItems(selection) {
      this.multipleSelection = selection
      if (selection.length === 1) {
        this.listItem = selection[0]
      } else {
        this.listItem = {}
      }
      this.onSelectItems && this.onSelectItems()
    },
  },
}
