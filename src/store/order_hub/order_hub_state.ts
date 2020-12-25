import { IOrder } from "../../components/order/order";

export interface OrderHubState{
    orders:IOrder[],
    loading: boolean,
    error: boolean,
}