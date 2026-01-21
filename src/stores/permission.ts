import { permissionService } from "@/services/permission.services";
import { AppError } from "zmp-sdk";
import { create } from "zustand";

interface TPermissionState {
  hasUserInfo: boolean;
  hasUserPhoneNumber: boolean;
  isRequested: boolean;
  request: () => Promise<void>;
  check: () => Promise<void>;
}

export const usePermissionStore = create<TPermissionState>((set) => ({
  hasUserInfo: false,
  hasUserPhoneNumber: false,
  isRequested: false,
  request: async () => {
    try {
      const data = await permissionService.request();
      set({
        hasUserInfo: data["scope.userInfo"],
        hasUserPhoneNumber: data["scope.userPhonenumber"],
        isRequested: true,
      });
    } catch (error) {
      const code = (error as AppError).code;
      if (code === -201)
        set({
          hasUserInfo: false,
          hasUserPhoneNumber: false,
          isRequested: true,
        });
    }
  },
  check: async () => {
    try {
      const data = (await permissionService.check()).authSetting;
      set({
        hasUserInfo: data["scope.userInfo"],
        hasUserPhoneNumber: data["scope.userPhonenumber"],
        isRequested: false,
      });
    } catch (error) {
      const code = (error as AppError).code;
      if (code === -201)
        set({
          hasUserInfo: false,
          hasUserPhoneNumber: false,
          isRequested: false,
        });
    }
  },
}));
