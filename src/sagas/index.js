import {all, fork} from 'redux-saga/effects';

import {appSaga} from "./AppSaga";

function* watcher() {
    yield all([
        appSaga(),
    ]);
}

export default function* rootSaga() {
    yield fork(watcher);
}