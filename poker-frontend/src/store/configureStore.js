import {applyMiddleware, createStore} from "redux";
import rootReducer from "../reducers/index"
import {logger} from "redux-logger";
import createHistory from 'history/createBrowserHistory'
import {composeWithDevTools} from "redux-devtools-extension";
import {routerMiddleware} from "react-router-redux";
import {persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { pokerMiddleware } from "../pokerMiddleware";


export const history = createHistory();

const config = {
    key: 'root',
    storage,
    
}
config.debug = true;
const reducer = persistCombineReducers(config, rootReducer);

const configureStore = () => {
    let store = createStore(
        reducer,
        undefined,
        composeWithDevTools(applyMiddleware(thunk,pokerMiddleware, logger, 
        routerMiddleware(history)))
    );
    let persistor = persistStore(store);
    // We can hook to webpack's API to replace the root reducer of the store, which will propagate back all the actions.
    if (module.hot) {
        module.hot.accept("../reducers/index", () =>
            store.replaceReducer(rootReducer.rootReducer)
        )
    }

    return {persistor, store};
};

export default configureStore;
