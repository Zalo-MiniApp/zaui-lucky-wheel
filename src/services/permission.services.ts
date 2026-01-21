import * as zmp from "zmp-sdk/apis";

export const permissionService = {
  async request() {
    return zmp.authorize({
      scopes: ["scope.userInfo", "scope.userPhonenumber"],
    });
  },

  async check() {
    return await zmp.getSetting();
  },
};
