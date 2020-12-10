import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Burger from '../../components/burger/burger';
import Button from '../../components/button/button';
import FlatButton from '../../components/button/flat_button';
import Center from '../../components/center/center';
import { IngredientType } from '../../data/ingredient_hub';
interface State{
    ingredients:IngredientType[]
}
class Checkout extends Component<RouteComponentProps,State>{
    state:State = {
        ingredients:[],
    }

    render(){
        return (
            <div>
                <h1 style={{textAlign:"center"}}>We hope it tastes well</h1>
                <Burger ingredients={this.state.ingredients}/>
                <Center>
                    <Button color="orange">Continue</Button>
                </Center>
                <br/>
                <Center>
                    <FlatButton color="red" onClick={this.cancelHandler}>Cancel</FlatButton>
                </Center>
            </div>
        );
    }

    componentDidMount(){
        const ingredients = this.props.location.state as IngredientType[];
        if(ingredients != null){
            this.setState({
                ingredients: ingredients
            });
        }
    }

    cancelHandler = ()=>{
        this.props.history.goBack();
    }
}
export default Checkout;