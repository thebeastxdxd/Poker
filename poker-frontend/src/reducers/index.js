import * as actionTypes from "../constants/actionTypes";


const initNavbar = {
    selected:'Home'
}

const rootReducer = (state = { NavBar:initNavbar}, action) => {
    switch(action.type)
    {
        case actionTypes.ON_NAV_BAR_CLICK:
            return {...state, NavBar:{selected:action.selected}}; 
        case actionTypes.LOG_IN_TO_SIGN_UP:
            return {...state, NavBar:{selected:action.selected}};
        default:
            return state;

    }

}

const anotherReducer = (state = {}, action) =>{
    return state;
}
export default {rootReducer, anotherReducer};
