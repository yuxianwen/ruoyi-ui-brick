<template>
  <el-upload
    class="ui-import-btn"
    action="action"
    :auto-upload="false"
    :show-file-list="false"
    :on-change="onChange"
  >
    <el-dropdown v-plain class="c-n-r" split-button type="info">
      <i class="el-icon-upload2" />
      导入
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="download">下载模版</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-upload>
</template>

<script>
export default {
  directives: {
    plain: {
      bind(el, binding, vnode, oldVnode) {
        const value = binding.value
        el.querySelectorAll('.el-button').forEach((v) => {
          v.classList.add('is-plain')
        })
        if (value == false) return
      },
    },
  },
  props: {
    url: String,
  },
  methods: {
    onChange() {
      this.$emit('on-change', ...arguments)
    },
    download() {
      this.url && open(process.env.VUE_APP_PUBLIC_PATH + this.url, '_self')
    },
  },
}
</script>

<style scoped>
.ui-import-btn >>> .el-dropdown .el-dropdown__caret-button::before {
  background-color: rgb(132 132 132 / 50%);
}
</style>
