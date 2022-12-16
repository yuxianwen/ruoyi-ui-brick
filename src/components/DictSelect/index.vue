<template>
  <div :class="radio ? '' : 'd-flex align-start'">
    <el-radio-group v-if="radio" v-model="model">
      <el-radio
        v-for="item in items"
        :key="item.value"
        :label="~~item.value || ~~item.dictCode"
      >
        {{ item.label || item.dictLabel }}
      </el-radio>
    </el-radio-group>
    <el-select
      v-else
      v-model="model"
      placeholder="请选择"
      clearable
      class="flex-grow-1"
      :loading="loading"
      :multiple="multiple"
      @visible-change="visibleChange"
      @change="change"
    >
      <el-option
        v-for="item in items"
        :key="item.value"
        :value="~~item.value"
        :label="item.label"
      >
      </el-option>
    </el-select>

    <el-button
      v-if="refresh"
      class="ml-2"
      icon
      circle
      :disabled="!isGet"
      :loading="loading"
      @click="getList"
    >
      <i v-if="!loading" class="el-icon-refresh"></i>
    </el-button>
  </div>
</template>

<script>
/**
 * 基于若依封装自带字典功能选择组件
 */
export default {
  props: {
    value: String | Number,
    refresh: Boolean,
    type: String,
    autoLoad: Boolean,
    radio: Boolean,
    multiple: Boolean,
  },
  data() {
    return {
      loading: false,
      items: [],
      isGet: false,
    }
  },
  methods: {
    async getList() {
      this.loading = true
      const res = await this.getDicts(this.type).catch(
        () => (this.loading = false)
      )
      this.items = res.data
      this.loading = false
      this.isGet = true
    },
    visibleChange(status) {
      if (status && !this.isGet) {
        this.getList()
      }
    },
    change(value) {
      this.$emit('change', {
        value: value,
        item: this.items.find((item) => ~~item.value === value),
      })
    },
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  created() {
    ;(this.autoLoad || this.radio) && this.getList()
  },
}
</script>
