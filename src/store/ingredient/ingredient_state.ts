import { IngredientType } from "../../data/ingredient_hub";

export interface IngredientState{
    ingredients:IngredientType[],
    loading: boolean,
    error: boolean,
}