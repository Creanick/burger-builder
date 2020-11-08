import React from 'react';
import styled from 'styled-components';
import ingredientHub, { IngredientType } from '../../data/ingredient_hub';
interface Props{
    onAddIngredient?:(type:IngredientType)=>void
}
const BurgerControls:React.FunctionComponent<Props> = ({onAddIngredient})=>{
    const controlButtons:JSX.Element[] = [];
    for (const key in ingredientHub) {
        const ingredient = ingredientHub[key];
        controlButtons.push(
        <ControlButton 
        onClick={()=>onAddIngredient && onAddIngredient(ingredient.type)}
         key={ingredient.label}>
        {ingredient.label} +
        </ControlButton>
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

const ControlButton = styled.button`
    border: none;
    margin: 10px;
    padding: 10px 20px;
    background-color: seagreen;
    color: white;
    border-radius: 4px;
    outline: none;
    &:hover{
        cursor: pointer;
        background-color: green;
    }
    &:active{
        transform: scale(0.9);
    }
`;
export default BurgerControls;