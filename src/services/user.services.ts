import { getAccessToken, getPhoneNumber, getUserInfo } from "zmp-sdk/apis";

export const userService = {
  async getUserName() {
    return (await getUserInfo()).userInfo.name;
  },

  // Zalo Mini App – Get Phone Number
  // Docs: https://miniapp.zaloplatforms.com/documents/api/getPhoneNumber/
  async getPhoneNumber() {
    const access_token = await getAccessToken();
    const code = await getPhoneNumber();
    const secret_key = "your zalo app secret key";

    const response = await fetch("https://graph.zalo.me/v2.0/me/info", {
      headers: {
        access_token,
        code: code.token!,
        secret_key,
      },
    });
    const data = await response.json();
    return data.data.number;
  },
};
