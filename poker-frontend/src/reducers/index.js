import * as actionTypes from "../constants/actionTypes";
import user from './user';

const initNavbar = {
    selected:'Home'
}


const rootReducer = (state = { navBar:initNavbar}, action) => {
    switch(action.type)
    {
        case actionTypes.CHANGE_NAV_SELECTED:
            const newSelected = '/'.concat(action.selected.split('/')[1]);
            if(newSelected === '/Profile')
                return {...state, navBar:{selected:newSelected}, profile:{loading:true}};
            return  {...state, navBar:{selected:newSelected}};
        case actionTypes.LOG_IN_TO_SIGN_UP:
            return {...state, navBar:{selected:action.selected}};
        case actionTypes.USER_INFO_ADDED:
            return {...state, profile:{loading:false}}
        default:
            return state;

    }   

}


export default {rootReducer, 
    user};
