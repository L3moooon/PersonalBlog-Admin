<template>
  <el-card>
    <el-row>
      <el-col :span="12">
        <el-button
          @click="roleDialog = true"
          type="primary"
          size="default"
          :icon="Plus"
          >添加角色
        </el-button>
      </el-col>
    </el-row>
    <el-table
      :data="roleList"
      show-overflow-tooltip
      stripe
      border
      style="margin: 10px 0px">
      <el-table-column
        label="id"
        align="center"
        prop="id"
        width="80"></el-table-column>
      <el-table-column
        label="角色名称"
        align="center"
        prop="role_name"></el-table-column>
      <el-table-column
        label="角色编码"
        align="center"
        prop="role_code"></el-table-column>
      <el-table-column
        label="角色描述"
        align="center"
        prop="description"></el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        prop="create_time">
        <template #default="scope">
          <span v-time="scope.row.create_time"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        prop="update_time">
        <template #default="scope">
          <span v-time="scope.row.update_time"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="280px"
        align="center">
        <template #="{ row, $index }">
          <el-button
            @click="permissionDrawer = true"
            type="primary"
            size="small"
            :icon="User">
            分配权限
          </el-button>
          <el-button
            type="primary"
            size="small"
            :icon="Edit">
            编辑
          </el-button>
          <el-popconfirm
            :title="`确认删除${row.roleName}?`"
            width="260px">
            <template #reference>
              <el-button
                type="primary"
                size="small"
                :icon="Delete">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <!-- 添加/编辑角色 -->
  <el-dialog
    v-model="roleDialog"
    title="添加角色"
    :width="500">
    <el-form :model="addForm">
      <el-form-item
        label="角色名称"
        prop="roleName">
        <el-input
          v-model="addForm.roleName"
          placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item
        label="角色编码"
        prop="roleCode">
        <el-input
          v-model="addForm.roleCode"
          placeholder="请输入角色编码"></el-input>
      </el-form-item>
      <el-form-item
        label="角色描述"
        prop="roleDesc">
        <el-input
          v-model="addForm.roleDesc"
          placeholder="请输入角色描述"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button
        type="primary"
        size="default"
        @click="roleDialog = false">
        取消
      </el-button>
      <el-button
        @click="addOrEdit"
        type="primary"
        size="default">
        确定
      </el-button>
    </template>
  </el-dialog>
  <el-drawer
    v-model="permissionDrawer"
    :show-close="false"
    direction="rtl">
    <template #header>
      <h4>分配权限</h4>
    </template>
    <template #default>
      <el-tree
        style="max-width: 600px"
        :data="permissionList"
        :props="defaultProps"
        show-checkbox
    /></template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="permissionDrawer = false">取消</el-button>
        <el-button
          type="primary"
          @click="handlePermissionChange">
          确认
        </el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { getRoleList, addOrEditRole, getPermissionList } from "@/api/role";
import { ElMessage } from "element-plus";
import { Plus, User, Delete, Edit } from "@element-plus/icons-vue";

const roleDialog = ref(false);

const roleList = ref([]);
const permissionList = ref([]);
const defaultProps = {
  children: "children",
  label: "permission_name",
};
const addForm = reactive({
  roleName: "",
  roleCode: "",
  roleDesc: "",
});
const permissionDrawer = ref(false);
//获取角色列表
const getRole = async () => {
  const { data, status } = await getRoleList();
  if (status == 1) {
    roleList.value = data;
  }
};
//获取权限列表
const getPermission = async () => {
  const { data, status } = await getPermissionList();
  if (status == 1) {
    // console.log(data);
    // console.log(buildTree(data));
    permissionList.value = buildTree(data);
  }
  //将权限列表转换为树形结构
  function buildTree(data, parentId = 0) {
    const tree = [];
    // 筛选出当前父节点下的所有子节点
    data.forEach((item) => {
      if (item.parent_id === parentId) {
        // 递归查找子节点的子节点
        const children = buildTree(data, item.id);
        if (children.length > 0) {
          item.children = children;
        }
        tree.push(item);
      }
    });
    return tree;
  }
};
//新增或编辑角色
const addOrEdit = async () => {
  const { status } = await addOrEditRole({
    role_name: addForm.roleName,
    role_code: addForm.roleCode,
    description: addForm.roleDesc,
  });
  if (status == 1) {
    ElMessage({
      message: "操作成功",
      type: "success",
    });
    getRole();
    roleDialog.value = false;
  }
};
onMounted(() => {
  getRole();
  getPermission();
});
</script>

<style lang="scss" scoped></style>
