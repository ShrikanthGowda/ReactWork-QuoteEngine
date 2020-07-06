import { combineReducers } from 'redux';
import quotesReducer from './quotesReducer';

export default combineReducers({
    quote: quotesReducer,
});