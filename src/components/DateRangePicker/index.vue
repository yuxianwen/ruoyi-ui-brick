<template>
  <el-date-picker
    v-model="model"
    :value-format="$attrs['value-format'] || 'yyyy-MM-dd HH:mm:ss'"
    :type="$attrs.type || 'daterange'"
    range-separator="-"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    v-bind="$attrs"
  ></el-date-picker>
</template>
<script>
export default {
  props: {
    beginTime: String,
    endTime: String,
  },
  computed: {
    model: {
      get() {
        if (this.beginTime && this.endTime) {
          return [this.beginTime, this.endTime]
        } else {
          return []
        }
      },
      set(val) {
        let beginTime = '',
          endTime = ''
        if (val) {
          ;[beginTime, endTime] = val
        }
        this.$emit('update:beginTime', beginTime)
        this.$emit('update:endTime', endTime)
      },
    },
  },
}
</script>
