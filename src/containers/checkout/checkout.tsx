import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import Burger from '../../components/burger/burger';
import Button from '../../components/button/button';
import FlatButton from '../../components/button/flat_button';
import Center from '../../components/center/center';
import { calculateIngredientPrice, IngredientType } from '../../data/ingredient_hub';
import { StoreState } from '../../store/store';
import UserForm from '../user_form/user_form';
interface State{
    // ingredients:IngredientType[]
}
interface ValueProps{
    ingredients: IngredientType[],
    totalPrice: number
}
interface Props extends RouteComponentProps , ValueProps{}
class Checkout extends Component<Props,State>{
    // state:State = {
    //     ingredients:[],
    // }

    render(){
        if(this.props.ingredients.length === 0){
            return <Redirect to="/"/>
        }
        const buttons = (
            <Fragment>
                
                <Center>
                    <Button 
                    color="orange" 
                    onClick={this.continueHandler}
                    disabled={this.props.ingredients.length === 0}>Continue</Button>
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
                {this.props.ingredients.length !== 0 && <Burger ingredients={this.props.ingredients}/>}
                <p style={{textAlign:"center"}}>Total Price: <b>{this.props.totalPrice}</b></p>
                {this.props.match.isExact && buttons}
                <Route path={this.props.match.url + "/user-form"} 
                component={UserForm}/>
            </div>
        );
    }

    // componentDidMount(){
    //     const ingredients = this.props.location.state as IngredientType[];
    //     if(ingredients != null){
    //         this.setState({
    //             ingredients: ingredients
    //         });
    //     }
    // }

    continueHandler = ()=>{
        this.props.history.push(this.props.match.url + "/user-form");
    }

    cancelHandler = ()=>{
        this.props.history.goBack();
    }
}
const mapStateToProps = (state:StoreState):ValueProps=>{
    return {
        ingredients: state.ingredientHub.ingredients,
        totalPrice: calculateIngredientPrice(state.ingredientHub.ingredients)
    };
}
export default connect(mapStateToProps)(Checkout);