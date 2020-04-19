import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import sessionReducer from './sessionReducer';
import farm from './farm';

export default combineReducers({
    alert: alert,
    auth: auth,
    session: sessionReducer,
    farm: farm
});
