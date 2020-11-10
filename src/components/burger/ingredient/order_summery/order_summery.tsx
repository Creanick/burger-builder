import React from 'react';
import styled from 'styled-components';
import ingredientHub, { IngredientType } from '../../../../data/ingredient_hub';
import Button from '../../../button/button';
import FlatButton from '../../../button/flat_button';
import Center from '../../../center/center';
function getIngredientQuantity(ingredients:IngredientType[]):{[index:string]:number}{
    const map:{[index:string]:number} = {};
    ingredients.forEach(type=>{
        map[type] = map[type]? map[type]+1 : 1;
    });
    return map;
}
interface Props{
    ingredients: IngredientType[],
    totalPrice: number,
    onCheckout?: ()=>void,
    onCheckoutCancel?: ()=>void   
}
const OrderSummery:React.FunctionComponent<Props> = ({ingredients,totalPrice,onCheckout,onCheckoutCancel})=>{
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
            <Container><p>Total Price</p><p>${totalPrice.toFixed(2)}</p></Container>
            <Center><Button onClick={onCheckout} color="orange">Proceed To Checkout</Button></Center>
            <br/>
            <Center><FlatButton onClick={onCheckoutCancel} color="red">Cancel</FlatButton></Center>
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