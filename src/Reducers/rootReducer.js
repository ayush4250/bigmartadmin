import { combineReducers } from 'redux';
import categoryPageReducer from './categoryPageReducer';
import categoryReducer from './categoryReducer';



const DEFAULT_REDUCER =(initstate, action) =>{
    return{
        key: "HELLO WORLD",
    }
}

const rootReducer = combineReducers({
    DEFAULT: DEFAULT_REDUCER,
    categories: categoryReducer,
    loadPage: categoryPageReducer
   

});

export default rootReducer;



