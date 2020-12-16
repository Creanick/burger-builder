import React, { Component } from 'react';
import Burger from '../../components/burger/burger';
import OrderSummery from '../../components/burger/ingredient/order_summery/order_summery';
import PriceViewer from '../../components/burger/price_viewer/price_viewer';
import BurgerControls from '../../components/burger_controls/burger_controls';
import Button from '../../components/button/button';
import Center from '../../components/center/center';
import Modal from '../../components/modal/modal';
import {calculateIngredientPrice, IngredientType } from '../../data/ingredient_hub';
import axios from '../../axios_order';
import withErrorHandler from '../../hoc/with_error_handler';
import { RouteComponentProps } from 'react-router-dom';
import { StoreState } from '../../store/store';
import {Dispatch } from 'redux';
import { IngredientEvent, IngredientEventType } from '../../store/ingredient/ingredient_event';
import { connect } from 'react-redux';

interface State{
    // ingredients: IngredientType[],
    // totalPrice: number,
    ordering: boolean,
    purchasing: boolean,
    loading: boolean
}
interface ValueProps{
    ingredients:IngredientType[],
    totalPrice:number,
}
interface HandlerProps{
    onAddIngredient:(ingredient:IngredientType)=>void,
    onRemoveIngredient:(index:number)=>void
}
interface Props extends RouteComponentProps,ValueProps,Partial<HandlerProps>{}
class BurgerBuilder extends Component<Props,State> {
    state:State = {
        // ingredients:[],
        // totalPrice: 0,
        ordering: false,
        purchasing: false,
        loading: false
    }
    componentDidMount(){
        // this.setState({loading: true})
        // axios.get<IngredientType[]>("/ingredients.json")
        // .then(res=>{
        //     const price = calculateIngredientPrice(res.data);
        //     this.setState({ingredients:res.data,loading: false,totalPrice:price});
        // }).catch(error=>{})
    }
    render() {
        return (
            <div>
                <Modal show={this.state.ordering} onBackClick={this.checkoutCancelHandler}>
                    <OrderSummery 
                    checkoutLoading={this.state.purchasing}
                    onCheckout={this.checkoutHandler}
                    onCheckoutCancel={this.checkoutCancelHandler}
                    ingredients={this.props.ingredients}
                    totalPrice={this.props.totalPrice}/>
                </Modal>
                <Burger
                loading={this.state.loading}
                onIngredientClick={this.props.onRemoveIngredient}
                ingredients={this.props.ingredients}/>
                <BurgerControls onAddIngredient={this.props.onAddIngredient}/>
                <PriceViewer price={this.props.totalPrice}/>
                <Center>
                    <Button onClick={this.orderingHandler} color="orange" disabled={this.props.ingredients.length <= 0}>Order Now</Button>
                </Center>
            </div>
        );
    }

    checkoutHandler = ()=>{
        this.props.history.push("/checkout",this.props.ingredients);
    }

    checkoutCancelHandler = ()=>this.setState({ordering: false});

    orderingHandler = ()=>this.setState({ordering: true});
    // ingredientAddingHandler = (type:IngredientType)=>{
    //     this.setState((state)=>{
    //         const price = ingredientHub[type].price;
    //         const totalPrice = state.totalPrice + price;
    //         return {ingredients:[...state.ingredients,type],
    //             totalPrice: totalPrice};
    //     });
    // }
    // ingredientRemoveHandler = (index:number)=>{
    //     if(index >= 0 && index < this.state.ingredients.length){
    //         this.setState(state=>{
    //             const ingredients = [...state.ingredients]; 
    //             const type = ingredients.splice(index,1);
    //             const price = ingredientHub[type[0]].price;
    //         const totalPrice = state.totalPrice - price;
    //             return {ingredients: ingredients,totalPrice:totalPrice};
    //         })
    //     }
    // }
}


const mapStateToProps = (state:StoreState):ValueProps=>{
    return {
        ingredients: state.ingredientHub.ingredients,
        totalPrice: calculateIngredientPrice(state.ingredientHub.ingredients)
    };
}
const mapDispatchToProps = (dispatch:Dispatch<IngredientEventType>):HandlerProps=>{
    return {
        onAddIngredient:(ingredient:IngredientType)=>dispatch(IngredientEvent.addIngredient(ingredient)),
        onRemoveIngredient:(index:number)=>dispatch(IngredientEvent.removeIngredient(index))
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));