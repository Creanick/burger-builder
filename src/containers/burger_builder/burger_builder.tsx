import React, { Component } from 'react';
import Burger from '../../components/burger/burger';
import OrderSummery from '../../components/burger/ingredient/order_summery/order_summery';
import PriceViewer from '../../components/burger/price_viewer/price_viewer';
import BurgerControls from '../../components/burger_controls/burger_controls';
import Button from '../../components/button/button';
import Center from '../../components/center/center';
import Modal from '../../components/modal/modal';
import {calculateIngredientPrice, IngredientType } from '../../data/ingredient_hub';
import { RouteComponentProps } from 'react-router-dom';
import { StoreState } from '../../store/store';
import { IngredientEvent } from '../../store/ingredient/ingredient_event';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import Spinner from '../../components/spinner/spinner';
import { OrderFormEvent } from '../../store/order_form/order_form_event';

interface State{
    ordering: boolean,
    purchasing: boolean,
}
interface ValueProps{
    ingredients:IngredientType[],
    totalPrice:number,
    ingredientsLoading:boolean,
    ingredientsError:boolean,
    isAuthenticated:boolean,
}
interface HandlerProps{
    onAddIngredient:(ingredient:IngredientType)=>void,
    onRemoveIngredient:(index:number)=>void,
    onInitIngredient:()=>void,
    onInitOrder:()=>void,
}
interface Props extends RouteComponentProps,ValueProps,Partial<HandlerProps>{}
class BurgerBuilder extends Component<Props,State> {
    state:State = {
        // ingredients:[],
        // totalPrice: 0,
        ordering: false,
        purchasing: false,
    }
    componentDidMount(){
        this.props.onInitIngredient && this.props.onInitIngredient();
        this.props.onInitOrder && this.props.onInitOrder();
    }
    render() {
        return (
            <div>
                <Modal show={this.state.ordering} onBackClick={this.checkoutCancelHandler}>
                    <OrderSummery 
                    checkoutLoading={this.state.purchasing}
                    onCheckout={this.checkoutHandler}
                    onCheckoutCancel={this.checkoutCancelHandler}
                    ingredients={this.props.ingredients}
                    totalPrice={this.props.totalPrice}/>
                </Modal>
                {
                    this.props.ingredientsError ? this.buildBurgerLoadedError()
                    :(this.props.ingredientsLoading ? this.buildBurgerLoading() : this.buildBurgerLoaded(this.props.ingredients,this.props.ingredientsLoading))
                }
                <BurgerControls onAddIngredient={this.props.onAddIngredient}/>
                <PriceViewer price={this.props.totalPrice}/>
                <Center>
                    {
                        this.props.isAuthenticated ? 
                        <Button onClick={this.orderingHandler} color="orange" disabled={this.props.ingredients.length <= 0}>Order Now</Button>
                        :<Button color="skyblue" onClick={this.signUpHandler}>Sign Up To Order</Button>
                    }
                </Center>
            </div>
        );
    }

    buildBurgerLoading = ()=>{
        return (
            <div>
                <br/>
                <Center>
                    <Spinner/>
                </Center>
                <br/>
            </div>
        );
    }
    buildBurgerLoaded = (ingredients:IngredientType[],loading:boolean)=>{
        return <Burger
        loading={loading}
        onIngredientClick={this.props.onRemoveIngredient}
        ingredients={ingredients}/>
    }
    buildBurgerLoadedError = ()=>{
    return  <Center>
        <h3>Soemthing went wrong with burger</h3>
    </Center>
    }

    checkoutHandler = ()=>{
        this.props.history.push("/checkout",this.props.ingredients);
    }

    checkoutCancelHandler = ()=>this.setState({ordering: false});

    orderingHandler = ()=>this.setState({ordering: true});
    signUpHandler = ()=>{
        this.props.history.push("/login",{
            redirectTo:"/checkout"
        });
    }
}


const mapStateToProps = (state:StoreState):ValueProps=>{
    return {
        ingredients: state.ingredientHub.ingredients,
        totalPrice: calculateIngredientPrice(state.ingredientHub.ingredients),
        ingredientsError: state.ingredientHub.error,
        ingredientsLoading: state.ingredientHub.loading,
        isAuthenticated: !!state.auth.token
    };
}
const mapDispatchToProps = (dispatch:ThunkDispatch<{},{},any>):HandlerProps=>{
    return {
        onAddIngredient:(ingredient:IngredientType)=>dispatch(IngredientEvent.addIngredient(ingredient)),
        onRemoveIngredient:(index:number)=>dispatch(IngredientEvent.removeIngredient(index)),
        onInitIngredient: ()=>dispatch(IngredientEvent.initIngredients()),
        onInitOrder:()=>dispatch(OrderFormEvent.init())
    };
}
export default connect(mapStateToProps,mapDispatchToProps)((BurgerBuilder));