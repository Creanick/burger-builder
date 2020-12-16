import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Order, { IOrder } from '../../components/order/order';
import axios from '../../axios_order';
interface State{
    orders:IOrder[],
    loading: boolean
}
class OrderPage extends Component<RouteComponentProps,State>{
    state:State = {
        orders:[],
        loading: false
    }
    componentDidMount(){
        this.setState({loading: true});
        axios.get<{[index:string]:IOrder}>("/orders.json")
        .then(res=>{
            this.setState({loading: false});
            const orders:IOrder[] = [];
            for(let id in res.data){
                orders.push({...res.data[id],id:id});
            }
            this.setState({orders:orders});
        })
        .catch(err=>{
            alert("Order fetching error");
            this.setState({loading: false});
        })
    }
    render(){
        if(this.state.orders.length === 0 && !this.state.loading){
            return <div>No Order Available</div>
        }
        return (
            <div>
                {this.state.loading ? <h1>...Loading</h1>:this.state.orders.map(order=>(<Order key={order.id} order={order}/>))}
            </div>
        );
    }
}

export default OrderPage;