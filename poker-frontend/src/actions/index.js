import * as actionTypes from '../constants/actionTypes';

export const onNavBarClick = (clickedTab) => ({
    type: actionTypes.ON_NAV_BAR_CLICK,
    selected: clickedTab.key
})

export const loginToSignup = () => ({
    type: actionTypes.LOG_IN_TO_SIGN_UP,
    selected: 'SignUp'
})