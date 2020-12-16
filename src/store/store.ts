import { combineReducers, createStore } from "redux";
import ingredientReducer from './ingredient/ingredient_reducer';
import { IngredientState } from "./ingredient/ingredient_state";
export interface StoreState{
    ingredientHub:IngredientState,
}
const rootReducer = combineReducers<StoreState>({
    ingredientHub: ingredientReducer
})

export default createStore(rootReducer);