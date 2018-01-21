import * as actionTypes from "../constants/actionTypes";

export default  (state = { }, action) => {
    switch(action.type)
    {
        case actionTypes.USER_LOGGED_IN:
            return action.user;
        
        case actionTypes.USER_LOGGED_OUT:
            return {};
        default:
            return state;

    }

}