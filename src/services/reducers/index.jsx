import { combineReducers } from 'redux';
import { ingredientsListReducer, selectedIngredientsReducer, orderNumbertReducer } from './reducers';

export const rootReducer = combineReducers({
  ingredientsList: ingredientsListReducer,
  selectedIngredients: selectedIngredientsReducer,
  orderNumber: orderNumbertReducer
});

