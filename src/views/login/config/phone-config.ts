export const rules = {
  phone: [
    {
      required: true,
      message: "手机号是必传内容~",
      trigger: "blur"
    },
    {
      pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
      message: "请输入正确的手机号~",
      trigger: "blur"
    }
  ],
  code: [
    {
      required: true,
      message: "验证码是必传内容~",
      trigger: "blur"
    },
    {
      pattern: /^[a-z0-9A-Z]{3,}$/,
      message: "手机号必须是3位以上的字母或者数字~",
      trigger: "blur"
    }
  ]
};
