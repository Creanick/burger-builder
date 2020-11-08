import React, { Component } from 'react';
import Burger from '../../components/burger/burger';
import BurgerControls from '../../components/burger_controls/burger_controls';
import ingredientHub, { IngredientType } from '../../data/ingredient_hub';

interface State{
    ingredients: IngredientType[],
    totalPrice: number
}
class BurgerBuilder extends Component<{},State> {
    state = {
        ingredients:[],
        totalPrice: 0
    }
    render() {
        return (
            <div>
                <Burger
                onIngredientClick={this.ingredientRemoveHandler}
                ingredients={this.state.ingredients}/>
                <BurgerControls onAddIngredient={this.ingredientAddingHandler}/>
                <p>Total Price : {this.state.totalPrice.toFixed(2)}</p>
            </div>
        );
    }
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