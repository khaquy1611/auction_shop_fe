import Amplify, { API } from "aws-amplify";
import { API_NAME } from "../constants/Configs";
import axios from "axios";

export const getCurrentUserProfile = () => {
  return API.get(API_NAME, "/user/profile", {});
};

export const updateCurrentUserProfile = (payload) => {
  return API.post(API_NAME, "/user/profile/update", {
    body: payload,
  });
};

export const synchronizeUser = (payload) => {
  return API.post(API_NAME, "/user/sync", {
    body: payload,
  });
};

export const registerFcmToken = (payload) => {
  return API.post(API_NAME, "/user/fcm-token", {
    body: payload,
  });
};

export const deleteFcmToken = (payload) => {
  return API.del(API_NAME, "/user/fcm-token", {
    body: payload,
  });
};

export const setupAccount = (payload) => {
  return API.post(API_NAME, "/user/listen/setup_account", {
    body: payload,
  });
};

export const UpdateUserAdrress = (payload) => {
  return API.post(API_NAME, "/user/address", {
    body: payload,
  });
};

export const getUserProfileUsername = (payload) => {
  return API.get(API_NAME, "/user/profile/" + payload);
};

export const getUserProfileHistory = (type) => {
  return API.get(
    API_NAME,
    `/user/activity-history?type-activity=${type}&page-number=1&page-size=10`
  );
};

export const getUserProfileHistoryAll = (pageCurent) => {
  return API.get(
    API_NAME,
    `/user/activity-history?page-number=${pageCurent}&page-size=10`
  );
};

export const activityLogin = (payload) => {
  return API.post(API_NAME, "/user/client-login", {});
};

export const changePasswordUser = async (payload) => {
  await Amplify.Auth.currentSession().then((res) => {
    const config = {
      headers: {
        Authorization: `Bearer ${res.accessToken.jwtToken}`,
      },
    };
    axios.post(`${process.env.API_URL}/user/password/change`, payload, config);
  });
};
