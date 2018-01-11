/**
 * Created by Jane on 06.09.2017.
 */
import React, { Component } from 'react';
import { Router, Route, Redirect, Link, IndexLink, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import MainLayout from 'components/pages/mainLayout';
import MainPage from 'components/pages/main';
import AdminInfo from 'components/pages/admin_info';
import AdminManage from 'components/pages/admin_manage';

import rootReducer from '../reducers';

let store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunkMiddleware)
);

export default () => (
    <Provider store={store}>
        <Router history={browserHistory}>

            <Route component={MainLayout} >
                <Redirect from="/" to="/index" />
                <Route path="/index" component={MainPage} />
                <Route path="/admin_info" component={AdminInfo} />
                <Route path="/admin_manage" component={AdminManage} />
            </Route>
        </Router>
    </Provider>
);