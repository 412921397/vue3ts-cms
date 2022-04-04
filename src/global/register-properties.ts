import { App } from "vue";

import { formatUtcString } from "@/utils/date-format";

export default function registerProperties(app: App) {
  /** 全局添加自定的函数 */
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUtcString(value);
    }
  };
}
