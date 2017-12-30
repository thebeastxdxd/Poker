import {applyMiddleware, createStore} from "redux";
import rootReducer from "../reducers/index"
import {logger} from "redux-logger";
import createHistory from 'history/createBrowserHistory'
import {composeWithDevTools} from "redux-devtools-extension";
import {routerMiddleware} from "react-router-redux";
import {persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';



export const history = createHistory();

const config = {
    key: 'root',
    storage,
}

const reducer = persistCombineReducers(config, rootReducer);

const configureStore = () => {
    const store = createStore(
        reducer,
        composeWithDevTools(applyMiddleware(logger, 
        routerMiddleware(history)))
    );
    let persistor = persistStore(store, null, store.getState());
    // We can hook to webpack's API to replace the root reducer of the store, which will propagate back all the actions.
    if (module.hot) {
        module.hot.accept("../reducers/index", () =>
            store.replaceReducer(rootReducer)
        )
    }

    return {persistor, store};
};

export default configureStore;
