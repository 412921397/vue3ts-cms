import { createStore, Store, useStore as useVuexStore } from "vuex";

import login from "./login/login";
import system from "./main/system/system";
import dashboard from "./main/analysis/dashboard";

import { getPageListData } from "@/service/main/system/system";

import { IRootState, IStoreType } from "./types";

const stroe = createStore<IRootState>({
  state() {
    return {
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    };
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list;
    },
    changeEntireRole(state, list) {
      state.entireRole = list;
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list;
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      /** 1.请求部门和角色数据 */
      const departmentResult = await getPageListData("/department/list", {
        offset: 0,
        size: 1000
      });
      const { list: departmentList } = departmentResult.data;
      /** 角色数据 */
      const roleResult = await getPageListData("/role/list", {
        offset: 0,
        size: 1000
      });
      const { list: roleList } = roleResult.data;
      /** 重新拿菜单 */
      const menuResult = await getPageListData("/menu/list", {});
      const { list: menuList } = menuResult.data;

      /** 2.保存数据 */
      commit("changeEntireDepartment", departmentList);
      commit("changeEntireRole", roleList);
      commit("changeEntireMenu", menuList);
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
});

export function setupStore() {
  stroe.dispatch("login/loadLocalLogin");
  // stroe.dispatch("getInitialDataAction");
}

export function useStore(): Store<IStoreType> {
  return useVuexStore();
}

export default stroe;
