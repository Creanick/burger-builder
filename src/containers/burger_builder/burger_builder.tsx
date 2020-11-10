import React, { Component } from 'react';
import Burger from '../../components/burger/burger';
import OrderSummery from '../../components/burger/ingredient/order_summery/order_summery';
import PriceViewer from '../../components/burger/price_viewer/price_viewer';
import BurgerControls from '../../components/burger_controls/burger_controls';
import Button from '../../components/button/button';
import Center from '../../components/center/center';
import Modal from '../../components/modal/modal';
import ingredientHub, { IngredientType } from '../../data/ingredient_hub';

interface State{
    ingredients: IngredientType[],
    totalPrice: number,
    ordering: boolean
}
class BurgerBuilder extends Component<{},State> {
    state = {
        ingredients:[],
        totalPrice: 0,
        ordering: false
    }
    render() {
        return (
            <div>
                <Modal show={this.state.ordering} onBackClick={this.checkoutCancelHandler}>
                    <OrderSummery 
                    onCheckoutCancel={this.checkoutCancelHandler}
                    ingredients={this.state.ingredients}
                    totalPrice={this.state.totalPrice}/>
                </Modal>
                <Burger
                onIngredientClick={this.ingredientRemoveHandler}
                ingredients={this.state.ingredients}/>
                <BurgerControls onAddIngredient={this.ingredientAddingHandler}/>
                <PriceViewer price={this.state.totalPrice}/>
                <Center>
                    <Button onClick={this.orderingHandler} color="orange" disabled={this.state.ingredients.length <= 0}>Order Now</Button>
                </Center>
            </div>
        );
    }

    checkoutCancelHandler = ()=>this.setState({ordering: false});

    orderingHandler = ()=>this.setState({ordering: true});
    ingredientAddingHandler = (type:IngredientType)=>{
        this.setState((state)=>{
            const price = ingredientHub[type].price;
            const totalPrice = state.totalPrice + price;
            return {ingredients:[...state.ingredients,type],
                totalPrice: totalPrice};
        });
    }
    ingredientRemoveHandler = (index:number)=>{
        if(index >= 0 && index < this.state.ingredients.length){
            this.setState(state=>{
                const ingredients = [...state.ingredients]; 
                const type = ingredients.splice(index,1);
                const price = ingredientHub[type[0]].price;
            const totalPrice = state.totalPrice - price;
                return {ingredients: ingredients,totalPrice:totalPrice};
            })
        }
    }
}

export default BurgerBuilder;