import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import CountReducer from './reducers/countReducer';

const rootReducer = combineReducers({
  count: CountReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));