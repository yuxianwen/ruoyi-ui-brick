import Pagination from '@/components/Pagination/index.vue'

import { formatDate } from '@/utils'
export default {
  components: { Pagination },
  data() {
    return {
      listQuery: {
        pageNum: 1, // 每页数量
        pageSize: 10, // 当前请求页码
      },
      defaultQuery: {}, // 默认参数每次查询都会带上
      showSearch: true, // 是否显示搜索条件
      listLoading: false, // 列表加载
      listData: [], // 列表数据
      total: 0, // 总页数
      editIndex: '', // 当前编辑项
      autoLoadList: true, // 是否自动加载列表数据
    }
  },

  /**
   *
   * @param {Sting} type 加载类型
   */
  methods: {
    // 加载列表
    loadList() {
      this.listLoading = true
      return this.getList(this.listParams)
        .then((res) => {
          const { rows, total } = res
          if (this.beforeLoadList) {
            this.beforeLoadList(res)
          } else {
            this.listData = this.processList ? this.processList(rows) : rows
            this.total = parseInt(total)
          }
        })
        .finally((res) => {
          this.listLoading = false
          this.onAfterLoadList && this.onAfterLoadList(res)
        })
    },
    // 重置搜索
    resetQuery() {
      this.listQuery = {
        pageNum: 1,
        pageSize: 10,
        ...this.defaultQuery,
      }
      this.loadList()
    },
    // 常规属性过滤
    formatter(row, column, cellValue) {
      const item = this[column.property] || {}
      return item[cellValue] || cellValue
    },

    // 数组值过滤
    formatterArrays(row, column, cellValue) {
      const key = column.property
      const items = this[key] || []
      const values = []
      cellValue.forEach((item) => {
        values.push(items[item])
      })
      return values.toString()
    },
    // 格式化时间
    formatterTime(row, column, cellValue) {
      return cellValue ? formatDate(new Date(cellValue)) : ''
    },
  },
  computed: {
    listParams() {
      return {
        ...this.listQuery,
        ...this.defaultQuery,
      }
    },
  },
  created() {
    this.autoLoadList && this.loadList()
  },
}
