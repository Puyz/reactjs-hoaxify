import * as ACTIONS from "./Constans";

const defaultState = {
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    password: undefined,
    image: undefined
}

const authReducer = (state = { ...defaultState }, action) => {
    
    if (action.type === ACTIONS.LOGOUT_SUCCESS) {
        return defaultState;
    }
    else if (action.type === ACTIONS.LOGIN_SUCCESS) {
        return {
            ...action.payload,
            isLoggedIn: true
        };
    }
    else if (action.type === ACTIONS.UPDATE_SUCCESS) {
        return {
            ...state,
            ...action.payload
            /* ...state den sonra ...action.payload yapıyoruz çünkü username gibi değerler state de durmaya devam etsin sadece
            displayName ve image değişsin istedik alltaki gibi tek tek de yazabilirdik ama ...action.payload daha kısa yol.
            displayName: action.payload.displayName,
            image: action.payload.image*/
        };
    }
    return state;
}

export default authReducer;