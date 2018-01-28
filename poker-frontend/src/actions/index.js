import * as actionTypes from '../constants/actionTypes';
import api from '../api';

export const changeNavSelected = (clickedTab) => ({
    type: actionTypes.CHANGE_NAV_SELECTED,
    selected: clickedTab,
})
export const addUserInfo = (user) => ({
    type: actionTypes.USER_INFO_ADDED,
    user
})
export const loginToSignup = () => ({
    type: actionTypes.LOG_IN_TO_SIGN_UP,
    selected: '/SignUp'
})
export const userLoggedIn = (user) => ({
    type: actionTypes.USER_LOGGED_IN,
    user
})
export const userLoggedOut = () => ({
    type: actionTypes.USER_LOGGED_OUT,

})

export const login = credentials => (dispatch) => 
    api.user.login(credentials).then(user => {
        //localStorage.userToken = user.token;
        dispatch(userLoggedIn(user))
    });

export const uploadAvatar = (data) => (dispatch) =>{ 
    api.user.upoloadAvatar(data).then(user => dispatch(addUserInfo(user)));
}
export const signup = (data) => (dispatch) => 
    api.user.signup(data).then(user => dispatch(addUserInfo(user)));

export const logout = () => (dispatch) => {
    //localStorage.userToken = user.token;
    dispatch(userLoggedOut())
};

export const getUserInfo = (userName) => (dispatch) => {

    api.user.getUserInfo(userName).then(user => dispatch(addUserInfo(user)));
}