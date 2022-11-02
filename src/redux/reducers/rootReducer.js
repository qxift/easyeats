import {ADD_ITEM, ADD_USERNAME} from '../types';



const bagReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        ...action.payload,
      }
    case ADD_USERNAME:
      return {
        ...state,
        ...action.payload,
      }
    default:
        return state;
  }
}


export default bagReducer;
