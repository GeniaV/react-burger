import { combineReducers } from 'redux';
import { ingredientsListReducer } from './reducers';

export const rootReducer = combineReducers({
  ingredientsList: ingredientsListReducer
});
