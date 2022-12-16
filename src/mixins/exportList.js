import { parseTime } from '@/utils/ruoyi'

export default {
  data() {
    return {
      exportListLoading: false,
    }
  },
  methods: {
    handleExport() {
      this.exportListLoading = true
      this.download(
        this.exportUrl,
        {
          ...this.listParams,
        },
        `${this.exportFileName || '导出结果'}-${parseTime(
          new Date(),
          'yyyyMMddhhmmss'
        )}.xlsx`
      ).finally(() => {
        this.exportListLoading = false
      })
    },
  },
  created() {
    !this.exportUrl && this.$modal.msgError('导出接口地址未设置，请设置')
  },
}
