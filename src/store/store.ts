import { applyMiddleware, combineReducers, createStore } from "redux";
import ingredientReducer from './ingredient/ingredient_reducer';
import { IngredientState } from "./ingredient/ingredient_state";
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { OrderFormState } from "./order_form/order_form_state";
import orderFormReducer from './order_form/order_form_reducer';
export interface StoreState{
    ingredientHub:IngredientState,
    orderForm: OrderFormState,
}
const rootReducer = combineReducers<StoreState>({
    ingredientHub: ingredientReducer,
    orderForm: orderFormReducer
})

const middleware = composeWithDevTools(applyMiddleware(thunk));

export default createStore(rootReducer,middleware);