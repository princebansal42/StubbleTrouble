import React, { useEffect } from "react";
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import MomentUtils from '@date-io/moment';
import { Provider as StoreProvider } from 'react-redux';

/*import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AlertList from "./components/alerts/AlertList";
import TestComponent from "./TestComponent";
import Landing from "./components/Landing";
import FarmersView from "./components/views/Farmers";*/
import setAuthToken from "./utils/setAuthToken";

//import PrivateRoute from "./components/routing/PrivateRoute";
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { renderRoutes } from 'react-router-config';

import { loadUser } from "./actions/auth";
import theme from './theme';
import { configureStore } from './store';
import routes from './routes';
import {
  ScrollReset,
  GoogleAnalytics,
  CookiesNotification
} from './components';
import './mixins/chartjs';
import './mixins/moment';
import './mixins/validate';
import './mixins/prismjs';
import './mock';
import './assets/scss/index.scss';

const history = createBrowserHistory();
const store = configureStore();

if (localStorage.token) setAuthToken(localStorage.token);
const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Router history={history}>
            <ScrollReset />
            <GoogleAnalytics />
            <CookiesNotification />
            {renderRoutes(routes)}
          </Router>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </StoreProvider>
    );
};

export default App;
