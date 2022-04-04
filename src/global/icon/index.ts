import { App } from "vue";
import registerElementIcons from "./register-element";

export function registerElementIcon(app: App): void {
  app.use(registerElementIcons);
}
