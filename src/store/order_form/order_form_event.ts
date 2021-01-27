import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";
import axios from '../../axios_order';
import { IOrder } from "../../components/order/order";
export const ORDER_REQUEST = "ORDER_REQUEST";
export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const ORDER_FAILED = "ORDER_FAILED";
export const ORDER_INIT = "ORDER_INIT";

export interface OrderFormRequestEvent{
    type: typeof ORDER_REQUEST,
}
export interface OrderFormSuccessEvent{
    type: typeof ORDER_SUCCESS
}
export interface OrderFormFailedEvent{
    type: typeof ORDER_FAILED
}
export interface OrderFormInit{
    type: typeof ORDER_INIT
}

export type OrderFormEventType =OrderFormInit | OrderFormRequestEvent | OrderFormSuccessEvent | OrderFormFailedEvent;

export class OrderFormEvent{
    static request():OrderFormRequestEvent{
        return {
            type: ORDER_REQUEST
        };
    }
    static success():OrderFormSuccessEvent{
        return {
            type: ORDER_SUCCESS
        }
    }
    static failed():OrderFormFailedEvent{
        return {
            type: ORDER_FAILED
        };
    }
    static init():OrderFormInit{
        return {
            type: ORDER_INIT
        };
    }
    static order(data:IOrder,authToken:string):ThunkAction<Promise<void>,{},{},any>{
        return async(dispatch:Dispatch<OrderFormEventType>)=>{
            dispatch(OrderFormEvent.request());
            axios.post("/orders.json?auth="+authToken,data)
                .then(response=>{
                    dispatch(OrderFormEvent.success());
            })
            .catch(error=>{
                dispatch(OrderFormEvent.failed());
            })
        }
    }
}