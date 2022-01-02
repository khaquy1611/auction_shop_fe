import {combineReducers} from 'redux';
import AppReducer from './AppReducer';

const reducer = combineReducers({
    app: AppReducer
});

const rootReducer = (state, action) => {
    let stateTemp = state;
    if (action.type === 'DO_LOGOUT_SUCCESS') {
        stateTemp = undefined;
    }
    return reducer(stateTemp, action);
};

export default rootReducer;
