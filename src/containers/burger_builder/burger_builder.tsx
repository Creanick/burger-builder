import React, { Component } from 'react';
import Ingredient, { IngredientType } from '../../components/burger/ingredient/ingredient';


class BurgerBuilder extends Component {
    render() {
        return (
            <div style={{ height: "200px", width: "60%" }}>
                <div>Burger</div>
                <Ingredient type={IngredientType.breadTop} />
                <Ingredient type={IngredientType.meat} />
                <Ingredient type={IngredientType.salad} />
                <Ingredient type={IngredientType.bacon} />
                <Ingredient type={IngredientType.cheese} />
                <Ingredient type={IngredientType.breadBottom} />
                <div>Build Controls</div>
            </div>
        );
    }
}

export default BurgerBuilder;