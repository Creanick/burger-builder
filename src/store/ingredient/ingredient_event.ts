import { AnyAction, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { IngredientType } from "../../data/ingredient_hub";
import { StoreState } from "../store";
import axios from '../../axios_order';
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";

export const FETCHING_INGREDIENT_REQUEST = "FETCHING_INGREDIENT_REQUEST";
export const FETCHING_INGREDIENT_SUCCESS = "FETCHING_INGREDIENT_SUCCESS";
export const FETCHING_INGREDIENT_FAILED = "FETCHING_INGREDIENT_FAILED";

export interface AddIngredientEvent{
    type: typeof ADD_INGREDIENT,
    ingredients:IngredientType | IngredientType[],
}
export interface RemoveIngredientEvent{
    type: typeof REMOVE_INGREDIENT,
    index: number,
} 

//ingredient fetching events
export interface FetchingIngredientRequestEvent{
    type: typeof FETCHING_INGREDIENT_REQUEST
}
export interface FetchingIngredientSuccessEvent{
    type: typeof FETCHING_INGREDIENT_SUCCESS,
    ingredients: IngredientType | IngredientType[]
}
export interface FetchingIngredientFailedEvent{
    type: typeof FETCHING_INGREDIENT_FAILED,
}

export type IngredientEventType = AddIngredientEvent | RemoveIngredientEvent | FetchingIngredientRequestEvent | FetchingIngredientFailedEvent | FetchingIngredientSuccessEvent;

export class IngredientEvent{
    static addIngredient(ingredients:IngredientType | IngredientType[]):AddIngredientEvent{
        return {
            type: ADD_INGREDIENT,
            ingredients: ingredients,
        };
    }

    static removeIngredient(index:number):RemoveIngredientEvent{
        return {
            type: REMOVE_INGREDIENT,
            index: index,
        }
    }
    static fetchingIngredientSuccess(ingredients:IngredientType | IngredientType[]):FetchingIngredientSuccessEvent{
        return {
            ingredients: ingredients,
            type: FETCHING_INGREDIENT_SUCCESS
        };
    }
    static fetchingIngredientFailed():FetchingIngredientFailedEvent{
        return {
            type: FETCHING_INGREDIENT_FAILED
        };
    }
    static fetchingIngredientRequest():FetchingIngredientRequestEvent{
        return {
            type: FETCHING_INGREDIENT_REQUEST
        };
    }
    static initIngredients():ThunkAction<Promise<void>,StoreState,{},AnyAction>{
        return async(dispatch:Dispatch<IngredientEventType>)=>{
            dispatch(IngredientEvent.fetchingIngredientRequest());
            axios.get<IngredientType[]>("/ingredients.json")
                .then(res=>{
                dispatch(IngredientEvent.fetchingIngredientSuccess(res.data));
                }).catch(error=>{
                    dispatch(IngredientEvent.fetchingIngredientFailed());
                })
        }
    }
}