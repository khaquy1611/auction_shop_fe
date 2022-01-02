import {spawn, throttle} from 'redux-saga/effects';

// Using this 'spawnTask' instead of built-in 'takeEvery' from 'redux-saga' to prevent the case when the whole application is broken if only one saga is corrupted
export function* spawnTask(pattern, func) {
    function wrapper(pattern, func) {
        return function* task() {
            // Use 'throttle' instead of 'takeEvery' to reduce the number of APIs requests
            yield throttle(100, pattern, func);
        };
    }

    yield spawn(wrapper(pattern, func));
}