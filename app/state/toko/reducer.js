import {FETCH_TOKO, FETCH_TOKO_SUCCESS, FETCH_TOKO_FAILURE} from "../actionTypes";

const initialState = {
  isLoading: false,
  toko: [],
  error: null,
};

export default (state = initialState, action) => {
  switch(action.type){
    case FETCH_TOKO :
      return {
        ...state,
        isLoading:true, 
      };
    
    case FETCH_TOKO_SUCCESS :
      return {
        ...state,
        isLoading:false,
        toko: action.toko, 
      };
    
    case FETCH_TOKO_FAILURE :
      return {
        ...state,
        isLoading:false,
        error: action.error, 
      };    
      
    default:
      return state;  
  }
}