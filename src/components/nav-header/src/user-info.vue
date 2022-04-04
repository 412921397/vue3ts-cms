<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        <span class="name">{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="removeUser">
            <el-icon><RemoveFilled /></el-icon>
            退出登录
          </el-dropdown-item>
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import localCache from "@/utils/cache";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const name = computed(() => store.state.login.userInfo.realname);

    const removeUser = () => {
      const token = localCache.getCache("token");
      localCache.deleteCache(token);
      router.replace("/login");
    };

    return { name, removeUser };
  }
});
</script>

<style scoped lang="less">
.el-dropdown-link {
  width: 100px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  display: flex;
  align-items: center;
  .name {
    width: 70px;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
  }
}
</style>
