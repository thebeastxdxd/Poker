import { changeNavSelected} from "./actions/index";
import {assign, set} from 'lodash';
import * as actionTypes from "./constants/actionTypes";

export const pokerMiddleware = store => next => action => {
    let state = store.getState();
    console.log(store.getState())


    switch (action.type) {
        case 'persist/REHYDRATE':
            let newAction = assign({}, action);
            const newSelected = '/'.concat(window.location.pathname.split('/')[1]);
            set(newAction, 'payload.rootReducer.navBar.selected', newSelected )
            return next(action);
        case actionTypes.USER_LOGGED_IN:
            store.dispatch(changeNavSelected("/Home"))
            return next(action);
        case actionTypes.USER_LOGGED_OUT:
            store.dispatch(changeNavSelected("/Home"))
            return next(action);
        default:
            return next(action);
    }
};

