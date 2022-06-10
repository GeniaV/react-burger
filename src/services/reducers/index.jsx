import { combineReducers } from 'redux';
import { ingredientsListReducer, selectedIngredientsReducer, orderNumbertReducer, ingredientDataReducer } from './reducers';

export const rootReducer = combineReducers({
  ingredientsList: ingredientsListReducer,
  selectedIngredients: selectedIngredientsReducer,
  orderNumber: orderNumbertReducer,
  ingredientData: ingredientDataReducer
});

