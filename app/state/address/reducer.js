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

const initialState = {
    isLoading: false,
    address: {},
    error : null
};

export default (state = initialState, action) => {
    switch (action.type){
        case FETCH_ADDRESS:
        case SET_ADDRESS:
        case REMOVE_ADDRESS:
        return{
            ...state,
            isLoading: true,
        };

        case FETCH_ADDRESS_SUCCESS:
        case SET_ADDRESS_SUCCESS:
        case REMOVE_ADDRESS_SUCCESS:
        return {
            ...state,
            isLoading: false,
            address: action.address
        };

        case FETCH_ADDRESS_FAILURE:
        case SET_ADDRESS_FAILURE:
        case REMOVE_ADDRESS_FAILURE:
        return {
            ...state,
            isLoading: false,
            error: action.error,
        };

        default:
        return state;
    }
}