import { applyMiddleware, combineReducers, createStore } from "redux";
import ingredientReducer from './ingredient/ingredient_reducer';
import { IngredientState } from "./ingredient/ingredient_state";
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
export interface StoreState{
    ingredientHub:IngredientState,
}
const rootReducer = combineReducers<StoreState>({
    ingredientHub: ingredientReducer
})

const middleware = composeWithDevTools(applyMiddleware(thunk));

export default createStore(rootReducer,middleware);