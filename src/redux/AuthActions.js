import { loginRequest, logoutRequest, signupRequest, updateUser } from '../api/ApiCalls';
import * as ACTIONS from './Constans';

export const logoutSuccessAction = () => {
    return {
        type: ACTIONS.LOGOUT_SUCCESS
    };
}

export const loginSuccessAction = (authState) => {
    return {
        type: ACTIONS.LOGIN_SUCCESS,
        payload: authState
    };
}

export const updateSuccessAction = ({displayName, image}) => {
    return {
        type: ACTIONS.UPDATE_SUCCESS,
        payload: {
            displayName,
            image
        }
    }
}

export const updateHandler = (username, credentials) => {
    return async function (dispatch) {
        const response = await updateUser(username, credentials);
        const newState = {
            ...response.data,
        }

        dispatch(updateSuccessAction(newState));
        return response;
    };
}


export const loginHandler = credentials => {
    return async function (dispatch) {
        const response = await loginRequest(credentials);
        const authState = {
            ...response.data.user,
            password: credentials.password,
            token: response.data.token
        }

        dispatch(loginSuccessAction(authState));
        return response;
    };
}

export const logoutHandler = () => {
    return async function (dispatch) {
        const response = await logoutRequest();
        dispatch(logoutSuccessAction());
        return response;
    };
}

export const signupHandler = user => {
    return async function (dispatch) {
        const response = await signupRequest(user);
        await dispatch(loginHandler(user))
        return response;
    };
}