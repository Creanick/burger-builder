import React, { Component, Fragment } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import Burger from '../../components/burger/burger';
import Button from '../../components/button/button';
import FlatButton from '../../components/button/flat_button';
import Center from '../../components/center/center';
import { calculateIngredientPrice, IngredientType } from '../../data/ingredient_hub';
import UserForm from '../user_form/user_form';
interface State{
    ingredients:IngredientType[]
}
class Checkout extends Component<RouteComponentProps,State>{
    state:State = {
        ingredients:[],
    }

    render(){
        const buttons = (
            <Fragment>
                
                <Center>
                    <Button 
                    color="orange" 
                    onClick={this.continueHandler}
                    disabled={this.state.ingredients.length === 0}>Continue</Button>
                </Center>
                <br/>
                <Center>
                    <FlatButton color="red" onClick={this.cancelHandler}>Cancel</FlatButton>
                </Center>
            </Fragment>
        );
        return (
            <div>
                <h1 style={{textAlign:"center"}}>We hope it tastes well</h1>
                {this.state.ingredients.length !== 0 && <Burger ingredients={this.state.ingredients}/>}
                <p style={{textAlign:"center"}}>Total Price: <b>{calculateIngredientPrice(this.state.ingredients)}</b></p>
                {this.props.match.isExact && buttons}
                <Route path={this.props.match.url + "/user-form"} 
                render={props=>(<UserForm {...props} ingredients={this.state.ingredients}/>)}/>
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

    continueHandler = ()=>{
        this.props.history.push(this.props.match.url + "/user-form");
    }

    cancelHandler = ()=>{
        this.props.history.goBack();
    }
}
export default Checkout;