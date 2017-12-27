import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
// This is required for bootstrap to work
import 'bootstrap/dist/css/bootstrap.css';

import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";
import {ConnectedRouter} from "react-router-redux";

import configureStore from "./store/configureStore";
import {history} from "./store/configureStore"
import App from "./App";
import {Route} from "react-router-dom";

const store = configureStore();

let render = App => (
    ReactDOM.render(
        //what is the provider tag, the ConnectedRouter tag, and the route tag?
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Route path="/" component={App}/>
            </ConnectedRouter>
        </Provider>,
          document.getElementById('root'))
);

// We first render the application

render(App);

// If webpacks HMR detects a change in the App, we reload it
if (module.hot) {
    module.hot.accept('./App', () => {
        render(App)
    })
}

registerServiceWorker();
