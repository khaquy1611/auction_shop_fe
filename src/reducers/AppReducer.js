import * as AppActionType from "../constants/AppActionType";

const initialState = {
  isLogin: false,
  user: null,
  locale: {
    icon: "/images/flags/england.png",
    name: "English",
    locale: "en",
    languageId: "english",
  },
  AddressFlow: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AppActionType.DO_LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        user: action.payload.user,
      };

    case AppActionType.DO_LOGOUT_SUCCESS:
      return {
        ...state,
        isLogin: false,
        user: null,
      };

    case AppActionType.DO_CHANGE_LOCALE_SUCCESS:
      return {
        ...state,
        locale: action.payload.locale,
      };
    case AppActionType.SET_ADDRESS_FLOW_SUCCESS:
      return {
        ...state,
        AddressFlow: action.payload.addressFlow,
      };
    case AppActionType.SHOW_MOON_PAY:
      return {
        ...state,
        isShowMoonPayModal: action.payload.isShow,
        moonPayUrl: action.payload.moonPayUrl
      };
    case AppActionType.SHOW_PAYMENT_MODAL:
      return {
        ...state,
        isShowPayment: action.payload.isShow,
        walletPayment: action.payload.walletAddress,
    };
    case AppActionType.SAVE_USER_WALLETS:
      return {
        ...state,
        userWallets: action.payload
    };
    default:
      return state;
  }
}
