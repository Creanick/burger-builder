import { Reducer } from "redux";
import { FetchOrderFailedEvent, FetchOrderRequestEvent, FetchOrderSuccessEvent, FETCH_ORDER_FAILED, FETCH_ORDER_REQUEST, FETCH_ORDER_SUCCESS, OrderHubEventType } from "./order_hub_event";
import { OrderHubState } from "./order_hub_state";


const initState:OrderHubState = {
    loading: false,
    error: false,
    orders:[],
}
class OrderHubReducer{
    static request(state:OrderHubState,event:FetchOrderRequestEvent):OrderHubState{
        return {
            ...state,
            error: false,
            loading: true,
        };
    }
    static success(state:OrderHubState,event:FetchOrderSuccessEvent):OrderHubState{
        return {
            ...state,
            orders: [...event.orders],
            error: false,
            loading: false,
        }
    }
    static failed(state:OrderHubState,event:FetchOrderFailedEvent):OrderHubState{
        return {
            ...state,
            loading: false,
            error: true
        }
    }
}
const orderHubReducer:Reducer<OrderHubState,OrderHubEventType> = (state=initState,event:OrderHubEventType)=>{
    switch (event.type) {
        case FETCH_ORDER_REQUEST:
            return OrderHubReducer.request(state,event);
            case FETCH_ORDER_SUCCESS:
            return OrderHubReducer.success(state,event);
            case FETCH_ORDER_FAILED:
            return OrderHubReducer.failed(state,event);
        default:
            return state;
    }
}   
export default orderHubReducer;