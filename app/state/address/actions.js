import {
    FETCH_ADDRESS,
    FETCH_ADDRESS_SUCCESS,
    FETCH_ADDRESS_FAILURE,
    SET_ADDRESS,
    SET_ADDRESS_SUCCESS,
    SET_ADDRESS_FAILURE,
    REMOVE_ADDRESS,
    REMOVE_ADDRESS_SUCCESS,
    REMOVE_ADDRESS_FAILURE,
} from '../actionTypes';

export const fetchAddress = () => ({
    type: FETCH_ADDRESS,
})
export const fetchAddressSuccess = (address) => ({
    type: FETCH_ADDRESS_SUCCESS,
    address
})
export const fetchAddressFailure = (error) => ({
    type: FETCH_ADDRESS_FAILURE,
    error
})

export const setAddress = (lat, lng) => ({
    type: SET_ADDRESS,
    lat, 
    lng
})
export const setAddressSuccess = (address) => ({
    type: SET_ADDRESS_SUCCESS,
    address,
})
export const setAddressFailure = (error) => ({
    type: SET_ADDRESS_FAILURE,
    error
})

export const removeAddress = () => ({
    type: REMOVE_ADDRESS,
})
export const removeAddressSuccess = (address) => ({
    type: REMOVE_ADDRESS_SUCCESS,
    address,
})
export const removeAddressFailure = (error) => ({
    type: REMOVE_ADDRESS_FAILURE,
    error
})