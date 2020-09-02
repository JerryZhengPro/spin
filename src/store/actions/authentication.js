import * as actionTypes from './actionTypes'; 

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = (authError) => {
    return {
        type: actionTypes.AUTH_FAIL,
        authError: authError
    }
}

export const resetAuthError = () => {
    return {
        type: actionTypes.RESET_AUTH_ERROR
    }
}

export const logOutSuccess = () => {
    return {
        type: actionTypes.LOG_OUT_SUCCESS
    }
}

export const logOutFail = (authError) => {
    return {
        type: actionTypes.LOG_OUT_FAIL,
        authError: authError 
    }
}

export const logOut = (token) => {
    return async dispatch => {
        try {
            let response = await fetch('http://127.0.0.1:8000/logout/', {
                method: 'POST',
                headers: new Headers({'Authorization': token})
            });
            let result = await response.json(); 
            if (response.status === 200) {
                dispatch(logOutSuccess()); 
            } else {
                dispatch(logOutFail(result['authError'])); 
            } 
        }
        catch {
            dispatch(logOutFail('Unexpected error')); 
        }
    }
}

export const auth = (username, email, password, confirmPassword, isLogIn) => {
    return async dispatch => {
        dispatch(authStart());
        const data = new FormData();
        data.append('username', username);  
        data.append('password', password);  
        let path = 'http://127.0.0.1:8000/login/';  
        if (!isLogIn) {
            path = 'http://127.0.0.1:8000/register/';
            data.append('email', email);
            data.append('confirmPassword', confirmPassword);
        }
        try {
            let response = await fetch(path, {
                method: 'POST',
                body: data
            });
            let result = await response.json(); 
            if (response.status === 200) {
                dispatch(authSuccess(result['token']));
            } else {
                dispatch(authFail(result['authError']));
            }
        }
        catch {
            dispatch(authFail('Unexpected error'));
        }
    }
}

export const tryAutoLogIn = () => {
    return async dispatch => {
        try {
            let response = await fetch('http://127.0.0.1:8000/auto-log-in/', {
                method: 'POST',
                headers: new Headers({'Authorization': localStorage.getItem('token')})
            });
            await response.json(); 
            if (response.status === 200) {
                dispatch(authSuccess(localStorage.getItem('token')));
            } else {
                dispatch(logOutSuccess()); 
            }
        }
        catch {
            console.log('Unexpected error in logging in'); 
        }
    }
}
