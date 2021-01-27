import React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import styled from 'styled-components';
import Button from '../../components/button/button';
import Center from '../../components/center/center';
import Spinner from '../../components/spinner/spinner';
import { AuthEvent } from '../../store/auth/auth_event';
import { StoreState } from '../../store/store';
import FormElement, { InputElement } from '../user_form/form_element';
interface State{
    formElements:{
        [id:string]:FormElement
    },
    // loading: boolean
}
interface ValueProps{
    isAuthenticated:boolean,
    isAuthenticating:boolean,
    authFailedMessage?:string,
}
interface HandlerProps{
    signUp:(data:{email:string,password:string})=>void,
    logIn:(data:{email:string,password:string})=>void,
}
interface Props extends RouteComponentProps,Partial<HandlerProps>,ValueProps{}
class AuthPage extends React.Component<Props,State>{
    state:State = {
        formElements:{
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
            'password':new InputElement({
                id:"password",
                name:"password",
                placeholder:"Enter password",
                type:"password",
                value:"",
            },(password)=>password.length >0)
        }
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
    render(){
        const formElements = Object.values(this.state.formElements);
        if(this.props.isAuthenticated){
            let redirectTo = "/";
            if(this.props.location.state != null){
                const routeState = this.props.location.state as {redirectTo?:string};
                if(routeState?.redirectTo){
                    redirectTo = routeState.redirectTo;
                }
            }
            return <Redirect to={redirectTo}/>
        }
        return (
            <Center>
                <Wrapper style={{textAlign: "center"}}>
                    <form onSubmit={(event)=>event.preventDefault()}>
                        {formElements.map(element=>(element.build(this.formElementChangeHandler)))}
                        {this.props.authFailedMessage && <p>{this.props.authFailedMessage}</p>}
                        <Center>
                            <Button 
                            onClick={this.signUpHandler}
                            disabled={!this.isFormValid || this.props.isAuthenticating} color="green">
                                SignUp</Button>
                            <div style={{
                                display:"inline-block",
                                padding:"10px"
                            }}></div>
                            <Button 
                            onClick={this.logInHandler}
                            disabled={!this.isFormValid || this.props.isAuthenticating} color="skyblue">
                                LogIn</Button>
                        </Center>
                        {this.props.isAuthenticating && <Center>
                            <Spinner/>
                        </Center>}
                    </form>
                    <br/>
                </Wrapper>
            </Center>
        );
    }
    logInHandler = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        event.preventDefault();
        if(!this.isFormValid){return;};
        const data = {
            email:this.state.formElements['email'].value,
            password:this.state.formElements['password'].value
        }
        this.props.logIn && this.props.logIn(data);
    }
    signUpHandler = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        event.preventDefault();
        if(!this.isFormValid){return;};
        const data = {
            email:this.state.formElements['email'].value,
            password:this.state.formElements['password'].value
        }
        this.props.signUp && this.props.signUp(data);
    }
}
const Wrapper = styled.div`
    width: 80%;
    max-width: 500px;
`;
const mapStateToProps = (state:StoreState):ValueProps=>{
    return {
        isAuthenticated: !!state.auth.token,
        isAuthenticating: state.auth.loading,
        authFailedMessage: state.auth.errorMessage
    }
}
const mapDispatchToProps = (dispatch:ThunkDispatch<StoreState,{},AnyAction>):HandlerProps=>{
    return {
        signUp:(data)=>dispatch(AuthEvent.signUp(data)),
        logIn:(data)=>dispatch(AuthEvent.logIn(data)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AuthPage);