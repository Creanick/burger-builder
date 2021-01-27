import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Order, { IOrder } from '../../components/order/order';
import Spinner from '../../components/spinner/spinner';
import Center from '../../components/center/center';
import { StoreState } from '../../store/store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { OrderHubEvent } from '../../store/order_hub/order_hub_event';
import { connect } from 'react-redux';

interface ValueProps{
    orders:IOrder[],
    orderFetching: boolean,
    fetchingOrderFailed: boolean,
    authToken?:string,
    userId?:string
}
interface HandlerProps{
    fetchOrder:(authToken:string,userId:string)=>void
}
interface Props extends RouteComponentProps,ValueProps,Partial<HandlerProps>{}
class OrderPage extends Component<Props>{

    componentDidMount(){
        if(!this.props.authToken || !this.props.userId){
            this.props.history.replace("/login");
        }else{
            this.props.fetchOrder && this.props.fetchOrder(this.props.authToken,this.props.userId);
        }
    }
    render(){
        if(this.props.fetchingOrderFailed){
            return (
                <Center>
                    <h1>
                        Something went wrong with orders
                    </h1>
                </Center>
            );
        }
        if(this.props.orders.length === 0 && !this.props.orderFetching){
            return <div>No Order Available</div>
        }
        return (
            <div>
                {this.props.orderFetching ? <Center>
                    <Spinner/>
                </Center>:this.props.orders.map(order=>(<Order key={order.id} order={order}/>))}
            </div>
        );
    }
}
const mapStateToProps = (state:StoreState):ValueProps=>{
    return {
        orders: state.orderHub.orders,
        fetchingOrderFailed: state.orderHub.error,
        orderFetching: state.orderHub.loading,
        authToken: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = (dispatch:ThunkDispatch<StoreState,{},AnyAction>):HandlerProps=>{
    return {
        fetchOrder: (authToken,userId)=>dispatch(OrderHubEvent.fetch(authToken,userId))
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(OrderPage);