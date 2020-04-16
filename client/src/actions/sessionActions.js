export const SESSION_LOGIN = "SESSION_LOGIN";
export const SESSION_LOGOUT = "SESSION_LOGOUT";

export const sessionLogin = () => (dispatch) =>
    dispatch({
        type: SESSION_LOGIN,
    });

export const sessionLogout = () => (dispatch) =>
    dispatch({
        type: SESSION_LOGOUT,
    });
