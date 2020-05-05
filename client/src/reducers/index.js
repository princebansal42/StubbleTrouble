import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import sessionReducer from "./sessionReducer";
import farm from "./farm";
import order from "./order";
import auction from "./auction";
export default combineReducers({
    alert,
    auth,
    farm,
    order,
    auction,
});
