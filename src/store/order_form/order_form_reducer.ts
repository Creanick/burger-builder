import {  Reducer } from "redux";
import { OrderFormEventType, OrderFormFailedEvent, OrderFormInit, OrderFormRequestEvent, OrderFormSuccessEvent, ORDER_FAILED, ORDER_INIT, ORDER_REQUEST, ORDER_SUCCESS } from "./order_form_event";
import { OrderFormState } from "./order_form_state";

const initialState:OrderFormState = {
    loading:false,
    error: false,
    ordered: false,
}

class OrderFormReducer{
    static request(state:OrderFormState,event:OrderFormRequestEvent):OrderFormState{
        return {
            ...state,
            loading: true,
            error: false,
            ordered: false,
        }
    }
    static success(state:OrderFormState,event:OrderFormSuccessEvent):OrderFormState{
        return {
            loading: false,
            error: false,
            ordered: true,
        };
    }
    static failed(state:OrderFormState,event:OrderFormFailedEvent):OrderFormState{
        return {
            loading: false,
            error: true,
            ordered: false,
        };
    }
    static init(state:OrderFormState,event:OrderFormInit):OrderFormState{
        return {
            loading: false,
            error: false,
            ordered: false,
        };
    }
}
const orderFormReducer:Reducer<OrderFormState,OrderFormEventType> = (state=initialState,event:OrderFormEventType)=>{
    switch (event.type) {
        case ORDER_REQUEST:
            return OrderFormReducer.request(state,event);
        case ORDER_SUCCESS:
            return OrderFormReducer.success(state,event);
        case ORDER_FAILED:
            return OrderFormReducer.failed(state,event);
        case ORDER_INIT:
            return OrderFormReducer.init(state,event);
        default:
            return state;
    }
}

export default orderFormReducer;