import React, { Fragment } from "react";
import classes from './ingredient.module.css';
export enum IngredientType {
    breadTop = "breadTop",
    breadBottom = "breadBottom",
    meat = "meat",
    cheese = "chesse",
    salad = "salad",
    bacon = "bacon",
}
interface Props {
    type: IngredientType
}
const Ingredient: React.FunctionComponent<Props> = ({ type }) => {
    return (
        <div className={classes[type]}>
            {
                type === IngredientType.breadTop &&
                <Fragment>
                    <div className={classes.seeds1}></div>
                    <div className={classes.seeds2}></div>
                </Fragment>
            }
        </div>
    );
}

export default Ingredient;