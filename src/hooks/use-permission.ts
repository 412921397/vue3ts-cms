import { useStore } from "@/store";

/** 当前用户是否有权限 */
export function usePermission(pageName: string, hanldeName: string) {
  const store = useStore();
  const permissions = store.state.login.permissions;
  const verifyPermission = `system:${pageName}:${hanldeName}`;

  return !!permissions.find((item) => item === verifyPermission);
}
