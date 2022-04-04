<template>
  <div class="login-phone">
    <el-form label-width="70px" :rules="rules" :model="phoneFrom" ref="formRef">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model.trim="phoneFrom.phone" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model.trim="phoneFrom.code" :maxlength="6" />
          <el-button type="primary" class="get-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { ElForm } from "element-plus/lib/components";

import { rules } from "../config/phone-config";

export default defineComponent({
  setup() {
    const phoneFrom = reactive({
      phone: "",
      code: ""
    });
    const formRef = ref<InstanceType<typeof ElForm>>();

    const phoneAction = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          console.log("手机登录1");
        }
      });
    };

    return { phoneFrom, formRef, rules, phoneAction };
  }
});
</script>

<style scoped lang="less">
.get-code {
  display: flex;
  justify-content: space-between;
  .get-btn {
    margin-left: 8px;
  }
}
</style>
