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
                <Burger ingredients={this.state.ingredients}/>
                <BurgerControls onAddIngredient={this.ingredientAddingHandler}/>
            </div>
        );
    }
    ingredientAddingHandler = (type:IngredientType)=>{
        this.setState((state)=>{
            return {ingredients:[...state.ingredients,type]}
        });
    }
}

export default BurgerBuilder;