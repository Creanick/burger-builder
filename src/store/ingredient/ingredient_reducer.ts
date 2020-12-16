import { Reducer } from "redux";
import { AddIngredientEvent, ADD_INGREDIENT, IngredientEventType, RemoveIngredientEvent, REMOVE_INGREDIENT } from "./ingredient_event";
import { IngredientState } from "./ingredient_state";
class IngredientReducer{
    static addedIngredient(state:IngredientState,event:AddIngredientEvent):IngredientState{
        const newIngredients = [...state.ingredients,event.ingredient];
        return {
            ingredients: newIngredients,
        };
    }
    static removedIngredient(state:IngredientState,event:RemoveIngredientEvent):IngredientState{
        const newIngredients = [...state.ingredients];
        newIngredients.splice(event.index,1);
        return {
            ingredients: newIngredients,
        };
    }
}
const reducer:Reducer<IngredientState,IngredientEventType> = (state={ingredients:[]},event)=>{
    switch (event.type) {
        case ADD_INGREDIENT:
            return IngredientReducer.addedIngredient(state,event);
        case REMOVE_INGREDIENT:
            return IngredientReducer.removedIngredient(state,event);
        default:
            return state;
    }
}

export default reducer;