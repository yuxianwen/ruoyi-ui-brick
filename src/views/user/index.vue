<template>
  <div class="app-container">
    <el-form
      v-if="showSearch"
      :model="listQuery"
      inline
      @submit.prevent.native="loadList"
    >
      <el-form-item label="用户名称">
        <el-input
          v-model="listQuery.appUserNickname"
          placeholder="请输入用户名称"
          clearable
        />
      </el-form-item>
      <el-form-item label="APP账号">
        <el-input
          v-model="listQuery.appUserName"
          placeholder="请输入账号"
          clearable
        />
      </el-form-item>

      <el-form-item label="创建时间">
        <date-range-picker
          :beginTime.sync="listQuery.beginTime"
          :endTime.sync="listQuery.endTime"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          native-type="submit"
          :disabled="listLoading"
          icon="el-icon-search"
          >搜索</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button
          icon="el-icon-refresh"
          :disabled="listLoading"
          @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          @click="addDialogVisible = true"
          v-hasPermi="['*', 'biz:user:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          :disabled="single"
          @click="editDialogVisible = true"
          v-hasPermi="['*', 'biz:user:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          :disabled="multiple"
          @click="handleDelete()"
          v-hasPermi="['system:user:remove']"
          >删除</el-button
        >
      </el-col>

      <el-col :span="1.5">
        <import-btn @on-change="importHandle" url="excel/用户导入模版.xlsx" />
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:user:export']"
          :loading="exportListLoading"
          type="warning"
          plain
          icon="el-icon-download"
          @click="handleExport"
          >导出</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-dropdown
          split-button
          @click="toggleSelectItem"
          :disabled="multiple"
        >
          启用
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="toggleSelectItem"
              >禁用</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="loadList"
      ></right-toolbar>
    </el-row>
    <el-table
      ref="listTable"
      v-loading="listLoading"
      :data="listData"
      :row-key="idKey"
      class="u-table"
      element-loading-text="加载中..."
      border
      fit
      highlight-current-row
      @selection-change="selectItems"
    >
      <el-table-column type="selection" align="center" width="55" fixed />
      <el-table-column label="用户名称" prop="userName" min-width="200" />
      <el-table-column label="用户昵称" prop="nickName" width="150" />
      <el-table-column label="部门" prop="dept.deptName" min-width="200" />
      <el-table-column label="手机号码" prop="phonenumber" width="120" />
      <el-table-column label="状态" prop="appUserStatus" width="150">
        <template slot-scope="{ row }">
          <el-switch
            v-model="row.status"
            :active-value="0"
            :inactive-value="1"
            @change="toggleItem({ idKey })"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="loginDate"
        label="上一次登录时间"
        width="200"
        sortable
        :formatter="formatterTime"
      />

      <el-table-column
        align="center"
        prop="createTime"
        label="创建时间"
        width="200"
        sortable
        :formatter="formatterTime"
      >
      </el-table-column>

      <el-table-column label="操作" width="120" fixed="right">
        <template slot-scope="{ row, $index }">
          <el-link
            v-hasPermi="['*', 'biz:appuser:edit']"
            @click="openEditDialog($index, row)"
            type="primary"
            class="f12"
            :underline="false"
          >
            <i class="el-icon-edit" />
            编辑
          </el-link>

          <el-link
            v-hasPermi="['*', 'biz:appuser:remove']"
            @click="handleDelete(row)"
            type="danger"
            class="f12 ml-3"
            :underline="false"
          >
            <i class="el-icon-delete" />
            删除
          </el-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.pageNum"
      :limit.sync="listQuery.pageSize"
      @pagination="loadList"
    />

    <!-- 编辑 dialog -->
    <item-dialog
      v-model="editDialogVisible"
      edit
      :item="listItem"
      :item-id="listItem[idKey]"
      @update="loadList"
    />

    <!-- 添加 dialog -->
    <item-dialog v-model="addDialogVisible" @update="loadList" />
  </div>
</template>

<script>
import { listUser, delUser, importUser, updateUser } from '@/api/system/user'

import loadList from '@/mixins/loadList'
import dialogItem from '@/mixins/dialogItem'
import selectItem from '@/mixins/selectItem'
import deleteItem from '@/mixins/deleteItem'
import updateItem from '@/mixins/updateItem'
import exportList from '@/mixins/exportList'
import importList from '@/mixins/importList'

import DateRangePicker from '@/components/DateRangePicker'
import ImportBtn from '@/components/ImportBtn'

import ItemDialog from './components/item.vue'

export default {
  name: 'UserList',
  components: {
    ItemDialog,
    DateRangePicker,
    ImportBtn,
  },
  mixins: [
    loadList,
    exportList,
    importList,
    dialogItem,
    selectItem,
    deleteItem,
    updateItem,
  ],
  data() {
    return {
      listQuery: {},
      exportUrl: 'system/user/export',
      idKey: 'userId',
    }
  },
  methods: {
    getList: listUser,
    deleteItem: delUser,
    importList: importUser,
    updateItem: updateUser,
  },
}
</script>
