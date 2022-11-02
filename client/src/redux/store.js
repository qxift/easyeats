import { createStore } from 'redux';
import initState from './initState';
import rootReducer from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';




const store = createStore(rootReducer, initState, composeWithDevTools());


export default store;


