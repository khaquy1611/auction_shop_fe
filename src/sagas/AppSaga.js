import { all, put } from "redux-saga/effects";
import { spawnTask } from "./Utils";
import * as AppActionType from "../constants/AppActionType";

export function* doLogin({ payload }) {
  try {
    yield put({
      type: AppActionType.DO_LOGIN_SUCCESS,
      payload: {
        user: payload.user,
      },
    });
  } catch (e) {
    console.log(e);
  }
}

export function* doLogout() {
  try {
    try {
      yield put({
        type: AppActionType.DO_LOGOUT_SUCCESS,
      });
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(e);
  }
}

export function* doChangeLocale({ payload }) {
  try {
    try {
      yield put({
        type: AppActionType.DO_CHANGE_LOCALE_SUCCESS,
        payload: {
          locale: payload.locale,
        },
      });
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(e);
  }
}

export function* doAddressFlow({ payload }) {
  try {
    try {
      yield put({
        type: AppActionType.SET_ADDRESS_FLOW_SUCCESS,
        payload: {
          addressFlow: payload.addressFlow,
        },
      });
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(e);
  }
}

export function* appSaga() {
  yield all([
    spawnTask(AppActionType.DO_LOGIN, doLogin),
    spawnTask(AppActionType.DO_LOGOUT, doLogout),
    spawnTask(AppActionType.DO_CHANGE_LOCALE, doChangeLocale),
    spawnTask(AppActionType.SET_ADDRESS_FLOW, doAddressFlow),
  ]);
}
