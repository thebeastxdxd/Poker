import * as actionTypes from '../constants/actionTypes';

export const onNavBarClick = (clickedTab) => ({
    type: actionTypes.ON_NAV_BAR_CLICK,
    selected: clickedTab.key
})
