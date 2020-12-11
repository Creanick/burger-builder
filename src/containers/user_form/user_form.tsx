import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/button/button';
import Center from '../../components/center/center';
import { calculateIngredientPrice, IngredientType } from '../../data/ingredient_hub';
import axios from '../../axios_order';
interface State{
    name:string,
    email:string,
    address:{
        street:string,
        postalCode:string
    },
    loading: boolean
}
interface Props extends RouteComponentProps{
    ingredients:IngredientType[]
}
class UserForm extends Component<Props,State>{
    state:State = {
        name:"",
        email:"",
        address:{
            street: "",
            postalCode: ""
        },
        loading: false
    }
    render(){
        return (
            <div style={{textAlign: "center"}}>
                <h3>Fill Up the form</h3>
                <form onSubmit={(event)=>event.preventDefault()}>
                    <Input name="name" type="text" placeholder="Your Name"/>
                    <Input name="email" type="email" placeholder="Your Email"/>
                    <Input name="street" type="text" placeholder="Your Street"/>
                    <Input name="postal" type="text" placeholder="Your Postal Code"/>
                    <br/>
                    <Center>
                        <Button 
                        disabled={this.state.loading} color="green" onClick={this.orderHandler}>
                            {this.state.loading ? "Placing Order...":"Place Order"}</Button>
                    </Center>
                </form>
                <br/>
            </div>
        );
    }
    orderHandler = ()=>{
        this.setState({loading:  true});
        const data = {
            ingredients: this.props.ingredients,
            totalPrice: calculateIngredientPrice(this.props.ingredients),
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
            this.setState({loading:  false});
            this.props.history.replace("/");
        })
        .catch(error=>{
            console.log(error);
            alert("Placing Order failed");
            this.setState({loading:  false});
        })
    }
}
const Input = styled.input`
    width: 60%;
    display: block;
    margin: auto;
    padding: 10px 12px;
    margin: 10px auto;
`;

export default UserForm;