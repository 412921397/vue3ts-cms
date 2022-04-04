import { App } from "vue";
import "element-plus/dist/index.css";

import {
  Avatar,
  ChatLineRound,
  Delete,
  Edit,
  Expand,
  Fold,
  FullScreen,
  Goods,
  Iphone,
  Message,
  Monitor,
  Picture,
  RefreshLeft,
  RefreshRight,
  RemoveFilled,
  Search,
  Setting,
  Share,
  UserFilled
} from "@element-plus/icons-vue";

const components = [
  Expand,
  Fold,
  FullScreen,
  Message,
  Picture,
  Iphone,
  Monitor,
  Setting,
  Goods,
  ChatLineRound,
  Search,
  Avatar,
  UserFilled,
  Edit,
  RemoveFilled,
  RefreshRight,
  RefreshLeft,
  Share,
  Delete
];

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component);
  }
}
