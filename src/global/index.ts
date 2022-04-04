import { App } from "vue";
import registerElement from "./register-element";
import registerProperties from "./register-properties";

export function globalRegister(app: App): void {
  app.use(registerElement);
  /** 全局注册自定义的时间格式化函数 */
  app.use(registerProperties);
}
