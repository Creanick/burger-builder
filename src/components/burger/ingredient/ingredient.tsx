import React, { Fragment } from "react";
import { IngredientType } from "../../../data/ingredient_hub";
import classes from './ingredient.module.css';
interface Props {
    type: IngredientType,
    onClick?: ()=>void
}
const Ingredient: React.FunctionComponent<Props> = ({ type,onClick }) => {
    return (
        <div className={classes[type]} onClick={onClick}>
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