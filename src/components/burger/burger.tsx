import React from 'react';
import styled from 'styled-components';
import { IngredientType } from '../../data/ingredient_hub';
import Ingredient from './ingredient/ingredient';
interface Props{
    ingredients: IngredientType[],
    onIngredientClick?: (index:number)=>void
}
const Burger:React.FunctionComponent<Props> = ({ingredients,onIngredientClick})=>{
    const ingredientsElements = ingredients.map((type,index)=>{
        return <Ingredient
        onClick={()=>onIngredientClick && onIngredientClick(index)}
        key={type+index} 
        type={type}/>
    });
    return (
        <Container>
            <Ingredient type={IngredientType.breadTop}/>
            {ingredients.length === 0?<p>
                Place Add Some Ingredients
            </p>: ingredientsElements}
            <Ingredient type={IngredientType.breadBottom}/>
        </Container>
    );
}
const Container = styled.div`
    width: 100%;
    margin: auto;
    height: 250px;
    overflow: auto;
    text-align: center;
    font-weight: bold;
    font-size: 1.2rem;
    @media (min-width: 1000px) and (min-height: 700px){
        width: 700px;
        height: 600px;
    }
    @media (min-width: 500px) and (min-height: 401px){
        width: 450px;
        height: 400px;
    }
    @media (min-width: 500px) and (max-height: 40px){
        width: 350px;
        height: 300px;
    }
`;
export default Burger;