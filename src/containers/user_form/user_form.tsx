import React, { Component } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import Button from '../../components/button/button';
import Center from '../../components/center/center';
import {calculateIngredientPrice, IngredientType } from '../../data/ingredient_hub';
import { IOrder } from '../../components/order/order';
import FormElement, { InputElement, SelectElement,Option } from './form_element';
import { connect } from 'react-redux';
import { StoreState } from '../../store/store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { OrderFormEvent } from '../../store/order_form/order_form_event';
enum DeliveryMethod{
    fastest = "fastest",
    slowest = "slowest",
    unpredictable = "unpredicatable",
}
interface State{
    formElements:{
        [id:string]:FormElement
    },
    // loading: boolean
}
interface ValueProps{
    ingredients:IngredientType[],
    totalPrice: number,
    placingOrder:boolean,
    orderFailed:boolean,
    orderSucceed: boolean,
}
interface HandlerProps{
    onOrder:(data:IOrder)=>void;
}
interface Props extends RouteComponentProps,ValueProps,Partial<HandlerProps>{}
class UserForm extends Component<Props,State>{
    static allDeliverMethods = [DeliveryMethod.fastest,DeliveryMethod.slowest,
    DeliveryMethod.unpredictable];
    state:State = {
        formElements:{
            "name":new InputElement({
                id:"name",
                name:"name",
                placeholder:"Your Name",
                type:"text",
                value:"",
            },(value)=>{
                return value.trim().length !== 0;
            }),
            "email":new InputElement({
                id:"email",
                name:"email",
                placeholder:"Your Email",
                type:"email",
                value:""
            },(email)=>{
                function validateEmail(email:string):boolean {
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(String(email).toLowerCase());
                }
                return validateEmail(email);
            }),
            "street":new InputElement({
                id:"street",
                name:"street",
                placeholder:"Your Street Address",
                type:"text",
                value:""
            },(value)=>{
                return value.trim().length !== 0;
            }),
            "pincode":new InputElement({
                id:"pincode",
                name:"pincode",
                placeholder:"Your Pincode",
                type:"text",
                value:""
            },(value)=>{
                return value.length === 6;
            }),
            "delivery":new SelectElement({
                id:"delivery",
                name:"delivery",
                label:"Select Delivery Method: ",
                value:DeliveryMethod.slowest,
                options: UserForm.allDeliverMethods.map(method=>
                    new Option(method,method))
            })
        },
        // loading: false
    }
    render(){
        if(this.props.orderSucceed){
            return <Redirect to="/"/>
        }
        const formElements = Object.values(this.state.formElements);
        return (
            <div style={{textAlign: "center"}}>
                <h3>Fill Up the form</h3>
                <form onSubmit={(event)=>event.preventDefault()}>
                    {formElements.map(element=>(element.build(this.formElementChangeHandler)))}
                    <Center>
                        <Button 
                        disabled={this.props.placingOrder || !this.isFormValid} color="green" onClick={this.orderHandler}>
                            {this.props.placingOrder ? "Placing Order...":"Place Order"}</Button>
                    </Center>
                </form>
                <br/>
            </div>
        );
    }
    emptyValidator = (value:string):boolean=>{
        return value.trim().length !== 0;
    }
    formElementChangeHandler =(value:string,id:string)=>{
        this.setState(state=>{
            const formElements = {...state.formElements};
            formElements[id].value = value;
            return {formElements:formElements};
        });
    }
    get isFormValid():boolean{
        const formElements = Object.values(this.state.formElements);
        for (let fe = 0; fe < formElements.length; fe++) {
            const element = formElements[fe];
            if(!element.isValid){
                return false;
            }
        }
        return true;
    }
    orderHandler = ()=>{
        if(!this.isFormValid){
            return;
        }
        const data:IOrder = {
            id:"",
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
            deliveryMethod: this.state.formElements['delivery'].value,
            customer:{
                name: this.state.formElements['name'].value,
                email: this.state.formElements['email'].value,
                address: {
                    country: "India",
                    street: this.state.formElements['street'].value,
                    pincode: Number.parseInt(this.state.formElements['pincode'].value)
                }
            }
        }
        this.props.onOrder && this.props.onOrder(data);
    }
}
const maStateToProps = (state:StoreState):ValueProps=>{
    return {
        ingredients: state.ingredientHub.ingredients,
        totalPrice: calculateIngredientPrice(state.ingredientHub.ingredients),
        orderFailed: state.orderForm.error,
        orderSucceed: state.orderForm.ordered,
        placingOrder: state.orderForm.loading,
    };
}
const mapDispatchToProps = (dispatch:ThunkDispatch<{},{},AnyAction>):HandlerProps=>{
    return {
        onOrder:(data:IOrder)=>dispatch(OrderFormEvent.order(data))
    };
}
export default connect(maStateToProps,mapDispatchToProps)(UserForm);