import {applyMiddleware, createStore} from "redux";
import rootReducer from "../reducers/index"
import {logger} from "redux-logger";
import createHistory from 'history/createBrowserHistory'
import {composeWithDevTools} from "redux-devtools-extension";
import {routerMiddleware} from "react-router-redux";


export const history = createHistory();

const configureStore = (state = {}) => {
    const store = createStore(
        rootReducer,
        state,
        composeWithDevTools(applyMiddleware(logger, routerMiddleware(history)))
    );

    // We can hook to webpack's API to replace the root reducer of the store, which will propagate back all the actions.
    if (module.hot) {
        module.hot.accept("../reducers/index", () =>
            store.replaceReducer(rootReducer)
        )
    }

    return store;
};

export default configureStore;
