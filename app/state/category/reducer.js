import { FETCH_CATEGORIES, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE } from "../actionTypes";

const initialState = {
  isLoading: false,
  categories: [],
  error: null,
};

export default (state = initialState, action) => {
  switch(action.type){
    case FETCH_CATEGORIES :
      return {
        ...state,
        isLoading:true, 
      };
    
    case FETCH_CATEGORIES_SUCCESS :
      return {
        ...state,
        isLoading:false,
        categories: action.categories, 
      };
    
    case FETCH_CATEGORIES_FAILURE :
      return {
        ...state,
        isLoading:false,
        error: action.error, 
      };  
      
    default:
      return state;  
  }
}