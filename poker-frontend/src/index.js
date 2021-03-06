import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import { BrowserRouter, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react'
import configureStore from "./store/configureStore";
import { history } from "./store/configureStore";
import App from "./components/App";
import {userLoggedIn} from './actions/index';

const onBeforeLift = () => {
    // take some action before the gate lifts
}

const { persistor, store } = configureStore();


let render = (App) => (
    ReactDOM.render(
        <Provider store={store}>
            <PersistGate persistor={persistor}
                loading={null}
                onBeforeLift={onBeforeLift}>
                <BrowserRouter >
                    <Route path='/' component={App} />

                </BrowserRouter>
            </PersistGate>
        </Provider>,
        document.getElementById('root'))
);

render(App);

// If webpacks HMR detects a change in the App, we reload it
if (module.hot) {
    module.hot.accept('./components/App', () => {
        render(App)
    })
}

registerServiceWorker();
