import React from 'react';
import styled from 'styled-components';
import ingredientHub, { IngredientType } from '../../data/ingredient_hub';
import Button from '../button/button';
interface Props{
    onAddIngredient?:(type:IngredientType)=>void
}
const BurgerControls:React.FunctionComponent<Props> = ({onAddIngredient})=>{
    const controlButtons:JSX.Element[] = [];
    for (const key in ingredientHub) {
        const ingredient = ingredientHub[key];
        controlButtons.push(
        <Button
        color="green" 
        style={{margin:"10px"}}
        onClick={()=>onAddIngredient && onAddIngredient(ingredient.type)}
         key={ingredient.label}>
        {ingredient.label} +
        </Button>
        );
    }
    return (
        <Container>
           {controlButtons}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
`;

export default BurgerControls;