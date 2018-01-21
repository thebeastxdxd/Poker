import * as actionTypes from "../constants/actionTypes";
import user from './user';

const initNavbar = {
    selected:'Home'
}


const rootReducer = (state = { navBar:initNavbar}, action) => {
    switch(action.type)
    {
        case actionTypes.CHANGE_NAV_SELECTED:
            console.log(action.selected.split('/'))
            const newSelected = '/'.concat(action.selected.split('/')[1]);
            console.log(newSelected)
            return {...state, navBar:{selected:newSelected}}; 
        case actionTypes.LOG_IN_TO_SIGN_UP:
            return {...state, navBar:{selected:action.selected}};
        default:
            return state;

    }

}


export default {rootReducer, 
    user};
