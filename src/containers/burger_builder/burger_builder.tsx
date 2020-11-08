import React, { Component } from 'react';
import Burger from '../../components/burger/burger';
import BurgerControls from '../../components/burger_controls/burger_controls';
import { IngredientType } from '../../data/ingredient_hub';

interface State{
    ingredients: IngredientType[]
}
class BurgerBuilder extends Component<{},State> {
    state = {
        ingredients:[
            IngredientType.bacon,
            IngredientType.cheese,
        ]
    }
    render() {
        return (
            <div>
                <Burger
                onIngredientClick={this.ingredientRemoveHandler}
                ingredients={this.state.ingredients}/>
                <BurgerControls onAddIngredient={this.ingredientAddingHandler}/>
            </div>
        );
    }
    ingredientAddingHandler = (type:IngredientType)=>{
        this.setState((state)=>{
            return {ingredients:[...state.ingredients,type]}
        });
    }
    ingredientRemoveHandler = (index:number)=>{
        if(index >= 0 && index < this.state.ingredients.length){
            this.setState(state=>{
                const ingredients = [...state.ingredients];
                ingredients.splice(index,1);
                return {ingredients: ingredients};
            })
        }
    }
}

export default BurgerBuilder;