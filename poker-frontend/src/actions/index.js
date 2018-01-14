import * as actionTypes from '../constants/actionTypes';
import api from '../api';

export const changeNavSelected = (clickedTab) => ({
    type: actionTypes.CHANGE_NAV_SELECTED,
    selected: clickedTab,
})

export const loginToSignup = () => ({
    type: actionTypes.LOG_IN_TO_SIGN_UP,
    selected: 'SignUp'
})
export const userLoggedIn = (user) => ({
    type: actionTypes.USER_LOGGED_IN,
    user
})

export const login = credentials => (dispatch) => 
    api.user.login(credentials).then(user => dispatch(userLoggedIn(user)));

export const signup = (data) => (dispatch) => 
    api.user.signup(data).then(user => dispatch(userLoggedIn(user)));