<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model.trim="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model.trim="account.password" show-password autocomplete="off" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import { ElForm } from "element-plus/lib/components";

import { rules } from "../config/account-config";
import localCache from "@/utils/cache";

export default defineComponent({
  setup() {
    const account = reactive({
      name: "",
      password: ""
    });
    /** 此ref是用来获取elform的所有元素 */
    const formRef = ref<InstanceType<typeof ElForm>>();
    const store = useStore();

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          console.log("isKeepPassword", isKeepPassword);
          /** 1.判断是否需要记住密码 */
          if (isKeepPassword) {
            localCache.setCache("name", account.name);
            localCache.setCache("password", account.password);
          } else {
            localCache.deleteCache("name");
            localCache.deleteCache("password");
          }

          /** 2.开始登陆验证 */
          store.dispatch("login/accountLoginAction", { ...account });
        }
      });
    };

    return { account, rules, formRef, loginAction };
  }
});
</script>

<style scoped lant="less"></style>
