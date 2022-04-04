import { Module } from "vuex";
import { IRootState } from "@/store/types";
import { ISystemState } from "./types";

import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from "@/service/main/system/system";

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    };
  },
  /** 同步用户表格数据 */
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList;
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount;
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList;
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount;
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList;
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount;
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList;
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount;
    }
  },
  getters: {
    pageListData(state) {
      /** 请求接口名字规范 */
      return (pageName: string) => {
        return (state as any)[`${pageName}List`];
        // switch (pageName) {
        //   case "users":
        //     return state.usersList;
        //   case "role":
        //     return state.roleList;
        // }
      };
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`];
      };
    }
  },
  /** 请求表格数据 */
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1.获取pageUrl
      const pageName = payload.pageName;
      const pageUrl = `/${pageName}/list`;
      // switch (pageName) {
      //   case "users":
      //     pageUrl = "/users/list";
      //     break;
      //   case "role":
      //     pageUrl = "/role/list";
      //     break;
      // }
      // console.log(payload.pageUrl);
      // console.log(payload.queryInfo);

      /** 页面请求的数据 */
      const pageResult = await getPageListData(pageUrl, payload.queryInfo);
      const { list, totalCount } = pageResult.data;

      const changePageName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1);
      /** 及时同步最新数据 */
      commit(`change${changePageName}List`, list);
      commit(`change${changePageName}Count`, totalCount);

      // switch (pageName) {
      //   case "users":
      //     commit(`changeUserList`, list);
      //     commit(`changeUserCount`, totalCount);
      //     break;
      //   case "role":
      //     commit(`changeRoleList`, list);
      //     commit(`changeRoleCount`, totalCount);
      //     break;
      // }
    },
    /** 删除用户 */
    async deletePageDataAction({ dispatch }, payload: any) {
      /** 1.获取pageName和id
       * pageName -> /users
       * id -> /users/id
       */
      const { pageName, id } = payload;
      const pageUrl = `/${pageName}/${id}`;

      /** 调用删除 */
      await deletePageData(pageUrl);

      /** 刷新最新数据 */
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    },
    /** 新建用户 */
    async createPageDataAction({ dispatch }, payload: any) {
      /** 1.创建数据的请求 */
      const { pageName, newData } = payload;
      const pageUrl = `/${pageName}`;
      await createPageData(pageUrl, newData);
      /** 请求最新的数据 */
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    },
    /** 编辑用户 */
    async editPageDataAction({ dispatch }, payload: any) {
      /** 1.编辑数据的请求 */
      const { pageName, editData, id } = payload;
      console.log(editData);
      const pageUrl = `/${pageName}/${id}`;
      await editPageData(pageUrl, editData);

      /** 2.请求最新的数据 */
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    }
  }
};

export default systemModule;
