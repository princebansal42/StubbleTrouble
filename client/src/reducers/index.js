import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import sessionReducer from './sessionReducer';

export default combineReducers({
    alert: alert,
    auth: auth,
    session: sessionReducer
});
