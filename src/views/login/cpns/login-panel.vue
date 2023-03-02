<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs v-model="TabsValue" type="border-card" class="demo-tabs" :stretch="true">
      <el-tab-pane :name="0">
        <template #label>
          <div class="content">
            <el-icon><UserFilled /></el-icon>
            <span>账号登录</span>
          </div>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <div class="content">
            <el-icon><Iphone /></el-icon>
            <span>手机登录</span>
          </div>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button class="login-btn" type="primary" @click="handleLoginClick">立即登录</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import LoginAccount from "./login-account.vue";
import LoginPhone from "./login-phone.vue";

export default defineComponent({
  components: { LoginAccount, LoginPhone },
  setup() {
    const isKeepPassword = ref(true);
    /** 记录当前是那个选项卡 */
    const TabsValue = ref(0);
    const accountRef = ref<InstanceType<typeof LoginAccount>>();
    const phoneRef = ref<InstanceType<typeof LoginPhone>>();

    const handleLoginClick = () => {
      if (+TabsValue.value === 0) accountRef.value?.loginAction(isKeepPassword.value);
      if (+TabsValue.value === 1) phoneRef.value?.phoneAction();
    };

    onMounted(() => {
      console.log(TabsValue.value, "sssad");
    });

    return { isKeepPassword, accountRef, phoneRef, TabsValue, handleLoginClick };
  }
});
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;
  .title {
    text-align: center;
  }
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
