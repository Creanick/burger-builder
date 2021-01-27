import { applyMiddleware, combineReducers, createStore } from "redux";
import ingredientReducer from './ingredient/ingredient_reducer';
import { IngredientState } from "./ingredient/ingredient_state";
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { OrderFormState } from "./order_form/order_form_state";
import orderFormReducer from './order_form/order_form_reducer';
import { OrderHubState } from "./order_hub/order_hub_state";
import orderHubReducer from './order_hub/order_hub_reducer';
import authReducer from './auth/auth_reducer';
import { AuthState } from "./auth/auth_state";
export interface StoreState{
    ingredientHub:IngredientState,
    orderForm: OrderFormState,
    orderHub: OrderHubState,
    auth:AuthState
}
const rootReducer = combineReducers<StoreState>({
    ingredientHub: ingredientReducer,
    orderForm: orderFormReducer,
    orderHub: orderHubReducer,
    auth:authReducer
})

const middleware = composeWithDevTools(applyMiddleware(thunk));

export default createStore(rootReducer,middleware);