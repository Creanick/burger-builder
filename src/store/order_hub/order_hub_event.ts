import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";
import { IOrder } from "../../components/order/order";
import axios from '../../axios_order';
export const FETCH_ORDER_REQUEST = "FETCH_ORDER_REQUEST";
export const FETCH_ORDER_SUCCESS = "FETCH_ORDER_SUCCESS";
export const FETCH_ORDER_FAILED = "FETCH_ORDER_FAILED"; 

export interface FetchOrderRequestEvent{
    type: typeof FETCH_ORDER_REQUEST
}
export interface FetchOrderSuccessEvent{
    type: typeof FETCH_ORDER_SUCCESS,
    orders:IOrder[]
}
export interface FetchOrderFailedEvent{
    type: typeof FETCH_ORDER_FAILED
}

export type OrderHubEventType = FetchOrderFailedEvent | FetchOrderRequestEvent | FetchOrderSuccessEvent;

export class OrderHubEvent{
    static request():FetchOrderRequestEvent{
        return {
            type: FETCH_ORDER_REQUEST
        };
    }
    static success(orders:IOrder[]):FetchOrderSuccessEvent{
        return {
            type: FETCH_ORDER_SUCCESS,
            orders:orders
        }
    }
    static failed():FetchOrderFailedEvent{
        return {
            type: FETCH_ORDER_FAILED
        }
    }
    static fetch(authToken:string):ThunkAction<Promise<void>,{},{},any>{
        return async (dispatch:Dispatch<OrderHubEventType>)=>{
            dispatch(OrderHubEvent.request());
            axios.get<{[index:string]:IOrder}>("/orders.json?auth="+authToken)
                .then(res=>{
                    const orders:IOrder[] = [];
                    for(let id in res.data){
                        orders.push({...res.data[id],id:id});
                    }
                    dispatch(OrderHubEvent.success(orders));
                })
                .catch(err=>{
                    dispatch(OrderHubEvent.failed());
                })
        }
    }
}