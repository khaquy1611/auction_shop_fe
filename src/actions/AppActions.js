import * as AppActionType from "../constants/AppActionType";

export const doLoginAction = (payload) => ({
  type: AppActionType.DO_LOGIN,
  payload,
});

export const doLogoutAction = () => ({
  type: AppActionType.DO_LOGOUT,
});

export const doChangeLocaleAction = (payload) => ({
  type: AppActionType.DO_CHANGE_LOCALE,
  payload,
});

export const setFlow = (payload) => ({
  type: AppActionType.SET_ADDRESS_FLOW,
  payload,
});

export const showMoonPayModal = (payload) => ({
  type: AppActionType.SHOW_MOON_PAY,
  payload
});

export const showPaymentModal = (payload) => ({
  type: AppActionType.SHOW_PAYMENT_MODAL,
  payload
});

export const saveUserWallets = (payload) => ({
  type: AppActionType.SAVE_USER_WALLETS,
  payload
});