import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/Navbar";
import AlertList from "./components/alerts/AlertList";
import TestComponent from "./TestComponent";
import Landing from "./components/Landing";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import PrivateRoute from "./components/routing/PrivateRoute";

if (localStorage.token) setAuthToken(localStorage.token);
const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <div className='App'>
                    <Navbar />
                    <Route exact path='/' component={Landing} />
                    <AlertList />
                    {/* <TestComponent /> */}
                    <Switch>
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/register' component={Register} />
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
};

export default App;
