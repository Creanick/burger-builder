import React, { Component } from 'react';
import Burger from '../../components/burger/burger';
import OrderSummery from '../../components/burger/ingredient/order_summery/order_summery';
import PriceViewer from '../../components/burger/price_viewer/price_viewer';
import BurgerControls from '../../components/burger_controls/burger_controls';
import Button from '../../components/button/button';
import Center from '../../components/center/center';
import Modal from '../../components/modal/modal';
import ingredientHub, { IngredientType } from '../../data/ingredient_hub';
import axios from '../../axios_order';
import withErrorHandler from '../../hoc/with_error_handler';

interface State{
    ingredients: IngredientType[],
    totalPrice: number,
    ordering: boolean,
    purchasing: boolean,
    loading: boolean
}
class BurgerBuilder extends Component<{},State> {
    state:State = {
        ingredients:[],
        totalPrice: 0,
        ordering: false,
        purchasing: false,
        loading: false
    }
    componentDidMount(){
        this.setState({loading: true})
        axios.get("/ingredients.json")
        .then(res=>{
            this.setState({ingredients:res.data,loading: false});
        }).catch(error=>{})
    }
    render() {
        return (
            <div>
                <Modal show={this.state.ordering} onBackClick={this.checkoutCancelHandler}>
                    <OrderSummery 
                    checkoutLoading={this.state.purchasing}
                    onCheckout={this.checkoutHandler}
                    onCheckoutCancel={this.checkoutCancelHandler}
                    ingredients={this.state.ingredients}
                    totalPrice={this.state.totalPrice}/>
                </Modal>
                <Burger
                loading={this.state.loading}
                onIngredientClick={this.ingredientRemoveHandler}
                ingredients={this.state.ingredients}/>
                <BurgerControls onAddIngredient={this.ingredientAddingHandler}/>
                <PriceViewer price={this.state.totalPrice}/>
                <Center>
                    <Button onClick={this.orderingHandler} color="orange" disabled={this.state.ingredients.length <= 0}>Order Now</Button>
                </Center>
            </div>
        );
    }

    checkoutHandler = ()=>{
        this.setState({purchasing: true});
        const data = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice,
            deliveryMethod: "fastest",
            customer:{
                name: "Manick",
                email: "manickware@gmail.com",
                address: {
                    country: "India",
                    street: "22 H.M.M Road",
                    pincode: 700137
                }
            }
        }
        axios.post("/orders.json",data)
        .then(response=>{
            this.setState({purchasing: false,ordering:false});
        })
        .catch(error=>{
            console.log(error);
            this.setState({purchasing: false,ordering:false});
        })
    }

    checkoutCancelHandler = ()=>this.setState({ordering: false});

    orderingHandler = ()=>this.setState({ordering: true});
    ingredientAddingHandler = (type:IngredientType)=>{
        this.setState((state)=>{
            const price = ingredientHub[type].price;
            const totalPrice = state.totalPrice + price;
            return {ingredients:[...state.ingredients,type],
                totalPrice: totalPrice};
        });
    }
    ingredientRemoveHandler = (index:number)=>{
        if(index >= 0 && index < this.state.ingredients.length){
            this.setState(state=>{
                const ingredients = [...state.ingredients]; 
                const type = ingredients.splice(index,1);
                const price = ingredientHub[type[0]].price;
            const totalPrice = state.totalPrice - price;
                return {ingredients: ingredients,totalPrice:totalPrice};
            })
        }
    }
}

export default withErrorHandler(BurgerBuilder,axios);