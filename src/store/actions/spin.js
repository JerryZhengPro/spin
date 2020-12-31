import * as actionTypes from './actionTypes'; 
import { BACKEND_BASE_DIR } from '../../shared/utility'; 

export const purchaseSpinStart = () => ({
    type: actionTypes.PURCHASE_SPIN_START
});

export const purchaseSpinSuccess = (degree, item) => ({
    type: actionTypes.PURCHASE_SPIN_SUCCESS,
    degree: degree,
    item: item   
});

export const purchaseSpinFail = (purchaseError) => ({
    type: actionTypes.PURCHASE_SPIN_FAIL,
    purchaseError: purchaseError
});

export const resetPurchaseError = () => ({
    type: actionTypes.RESET_PURCHASE_ERROR
});

export const resetDegree = () => ({
    type: actionTypes.RESET_DEGREE
});

export const purchaseSpin = (token) => {
    return async dispatch => {
        dispatch(purchaseSpinStart()); 
        try {
            const response = await fetch(`${BACKEND_BASE_DIR}purchase-spin/`, {
                method: 'POST',
                headers: new Headers({'Authorization': token})
            });
            const result = await response.json(); 
            if (response.status === 200) {
                dispatch(purchaseSpinSuccess(result['degree'], result['item'])); 
            } else {
                dispatch(purchaseSpinFail(result['purchaseError'])); 
            }
        } catch {
            dispatch(purchaseSpinFail('Unexpected error')); 
        }
    };
};

export const getFreeSPSuccess = (freeSP) => ({
    type: actionTypes.GET_FREE_SP_SUCCESS,
    freeSP: freeSP
});

export const getFreeSPFail = (freeSPError) => ({
    type: actionTypes.GET_FREE_SP_FAIL,
    freeSPError: freeSPError
});

export const resetFreeSPError = () => ({
    type: actionTypes.RESET_FREE_SP_ERROR
});

export const getFreeSP = (token) => {
    return async dispatch => {
        try {
            const response = await fetch(`${BACKEND_BASE_DIR}free-sp/`, {
                method: 'GET',
                headers: new Headers({'Authorization': token})
            });
            const result = await response.json(); 
            if (response.status === 200) {
                dispatch(getFreeSPSuccess(result['freeSP'])); 
            } else {
                dispatch(getFreeSPFail(result['freeSPError'])); 
            }
        } catch {
            dispatch(getFreeSPFail('Unexpected error')); 
        }
    };
};
