import React from 'react';
import styled from 'styled-components';
import ingredientHub, { IngredientType } from '../../../../data/ingredient_hub';
import Button from '../../../button/button';
import Center from '../../../center/center';
interface Props{
    ingredients: IngredientType[],
    totalPrice: number
}
function getIngredientQuantity(ingredients:IngredientType[]):{[index:string]:number}{
    const map:{[index:string]:number} = {};
    ingredients.forEach(type=>{
        map[type] = map[type]? map[type]+1 : 1;
    });
    return map;
}
const OrderSummery:React.FunctionComponent<Props> = ({ingredients,totalPrice})=>{
    const quantities:{[index:string] : number} = getIngredientQuantity(ingredients);
    const items: JSX.Element[] = [];
    for (const key in ingredientHub) {
        const ingredient = ingredientHub[key];
         items.push(
            <Container key={key}>
            <p>{ingredient.label}</p>
            <p>${ingredient.price.toFixed(2)} x {quantities[key] || 0}</p>
        </Container>
         );
    }
    return (
        <Wrapper>
            <h4 style={{textAlign:"center"}}>Your Burger Order Summery</h4>
            {items}
            <Container><p>Total Price</p><p>${totalPrice}</p></Container>
            <Center><Button color="orange">Proceed To Checkout</Button></Center>
        </Wrapper>
    );
}
const Wrapper = styled.div`
`;
const Container = styled.div`
    margin: 0px 20px;
    display: flex;
    justify-content: space-between;
`;

export default OrderSummery;