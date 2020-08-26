import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/Functions/utility'; 

const initialState = {
    isAuthenticated: false,
    token: null,
    authError: null,
    loading: false  
}

const authStart = (state) => {
    return updateObject(state, {
        authError: null,
        loading: true
    })
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        isAuthenticated: true, 
        token: action.token,
        loading: false,
        authError: null
    })
}

const authFail = (state, action) => {
    return updateObject(state, {
        authError: action.authError,
        loading: false
    })
}

const switchAuthMode = (state) => {
    return updateObject(state, {
        authError: null
    })
}

const logOutClient = (state) => {
    return updateObject(state, {
        isAuthenticated: false,
        token: null,
        authError: null  
    })
}

const logOutFail = (state, action) => {
    return updateObject(state, {
        authError: action.authError
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state); 
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action); 
        case actionTypes.SWITCH_AUTH_MODE:
            return switchAuthMode(state); 
        case actionTypes.LOG_OUT_CLIENT:
            return logOutClient(state); 
        case actionTypes.LOG_OUT_FAIL:
            return logOutFail(state, action); 
        default:
            return state;
    }
}

export default reducer; 
