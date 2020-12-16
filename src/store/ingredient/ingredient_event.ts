import { IngredientType } from "../../data/ingredient_hub";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";

export interface AddIngredientEvent{
    type: typeof ADD_INGREDIENT,
    ingredient:IngredientType,
}
export interface RemoveIngredientEvent{
    type: typeof REMOVE_INGREDIENT,
    index: number,
}

export type IngredientEventType = AddIngredientEvent | RemoveIngredientEvent;

export class IngredientEvent{
    static addIngredient(ingredient:IngredientType):AddIngredientEvent{
        return {
            type: ADD_INGREDIENT,
            ingredient: ingredient,
        };
    }

    static removeIngredient(index:number):RemoveIngredientEvent{
        return {
            type: REMOVE_INGREDIENT,
            index: index,
        }
    }
}