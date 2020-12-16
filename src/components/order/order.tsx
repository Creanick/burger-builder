import React from 'react';
import styled from 'styled-components';
import { IngredientType } from '../../data/ingredient_hub';
export interface IOrder{
    id:string,
    ingredients: IngredientType[],
    totalPrice: number,
    deliveryMethod: string,
    customer:{
        name: string,
        email:string,
        address: {
            country: string,
            street: string,
            pincode: number
        }
    }
}
interface Props{
    order: IOrder
}
const Order:React.FunctionComponent<Props> = ({order})=>{
    const ingredients:{[index:string]:number} = {};
    order.ingredients.forEach(i=>{
        ingredients[i] = ingredients[i] ? ingredients[i] + 1 :1;
    });
    const ingredientsList:{name:string,amount:number}[] = [];
    for (const name in ingredients) {
        ingredientsList.push({name:name,amount:ingredients[name]});
    }
    return (
        <Wrapper>
            <p>Ingredients: {ingredientsList.map(obj=>(<IngredientText
                key={obj.name}
            >
                {obj.name} ({obj.amount})
            </IngredientText>))}</p>
            <p>Price: {order.totalPrice.toFixed(2)}</p>
        </Wrapper>
    );
}
const IngredientText = styled.span`
    display: inlina-block;
    margin: 0 8px;
    padding: 5px;
    border: 1px solid black;
`;
const Wrapper = styled.div`
    padding: 10px;
    margin: 10px auto;
    width: 80%;
    border: 1px solid #ccc;
`;
export default Order;