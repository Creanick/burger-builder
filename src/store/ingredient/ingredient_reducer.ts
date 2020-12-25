import { Reducer } from "redux";
import { AddIngredientEvent, ADD_INGREDIENT, FetchingIngredientFailedEvent, FetchingIngredientRequestEvent, FetchingIngredientSuccessEvent, FETCHING_INGREDIENT_FAILED, FETCHING_INGREDIENT_REQUEST, FETCHING_INGREDIENT_SUCCESS, IngredientEventType, RemoveIngredientEvent, REMOVE_INGREDIENT } from "./ingredient_event";
import { IngredientState } from "./ingredient_state";
class IngredientReducer{
    static addedIngredient(state:IngredientState,event:AddIngredientEvent):IngredientState{
        const newIngredients = [...state.ingredients];
        if(Array.isArray(event.ingredients)){
            newIngredients.push(...event.ingredients);
        }else{
            newIngredients.push(event.ingredients);
        }
        return {
            ...state,
            ingredients: newIngredients,
        };
    }
    static removedIngredient(state:IngredientState,event:RemoveIngredientEvent):IngredientState{
        const newIngredients = [...state.ingredients];
        newIngredients.splice(event.index,1);
        return {
            ...state,
            ingredients: newIngredients,
        };
    }
    static fetchingIngredientsRequest(state:IngredientState,event:FetchingIngredientRequestEvent):IngredientState{
        return {
            ...state,
            loading: true,
            error: false,
        }
    }
    static fetchingIngredientsSuccess(state:IngredientState,event:FetchingIngredientSuccessEvent):IngredientState{
        const newIngredients = [...state.ingredients];
        if(Array.isArray(event.ingredients)){
            newIngredients.push(...event.ingredients);
        }else{
            newIngredients.push(event.ingredients);
        }
        return {
            ...state,
            loading: false,
            error: false,
            ingredients: newIngredients
        }
    }
    static fetchingIngredientsFailed(state:IngredientState,event:FetchingIngredientFailedEvent):IngredientState{
        return {
            ...state,
            error: true,
        }
    }
}
const initialState:IngredientState = {
    error: false,
    loading: false,
    ingredients:[],
};
const reducer:Reducer<IngredientState,IngredientEventType> = (state=initialState,event)=>{
    switch (event.type) {
        case ADD_INGREDIENT:
            return IngredientReducer.addedIngredient(state,event);
        case REMOVE_INGREDIENT:
            return IngredientReducer.removedIngredient(state,event);
        case FETCHING_INGREDIENT_REQUEST:
            return IngredientReducer.fetchingIngredientsRequest(state,event);
        case FETCHING_INGREDIENT_FAILED:
            return IngredientReducer.fetchingIngredientsFailed(state,event);    
        case FETCHING_INGREDIENT_SUCCESS:
            return IngredientReducer.fetchingIngredientsSuccess(state,event);
        default:
            return state;
    }
}

export default reducer;