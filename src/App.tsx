import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Route, Switch } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Layout from './components/layout/layout';
import AuthPage from './containers/auth/auth';
import BurgerBuilder from './containers/burger_builder/burger_builder';
import Checkout from './containers/checkout/checkout';
import Logout from './containers/logout/logout';
import OrderPage from './containers/order_page/order_page';
import { AuthEvent } from './store/auth/auth_event';
import { StoreState } from './store/store';
interface HandlerProps{
  tryAutoLogin:()=>void
}
interface ValueProps{
  isAuthenticated:boolean
}
interface Props extends Partial<HandlerProps>,ValueProps{}
class App extends Component<Props>{
  componentDidMount(){
    this.props.tryAutoLogin && this.props.tryAutoLogin();
  }
  render(){
    const authenticatedRoutes = (
      <Switch>
        <Route path="/checkout" component={Checkout}/>
        <Route path="/orders" component={OrderPage}/>
        <Route path="/logout" component={Logout}/>
      </Switch>
    );
    return (
      <div>
        <Layout>
            {this.props.isAuthenticated && authenticatedRoutes}
          <Switch>
            <Route path="/login" component={AuthPage}/>
            <Route path="/" exact component={BurgerBuilder}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = (state:StoreState):ValueProps=>{
  return{
    isAuthenticated:!!state.auth.token
  }
}
const mapDispatchToProps = (dispatch:ThunkDispatch<StoreState,{},AnyAction>):HandlerProps=>{
  return {
    tryAutoLogin:()=>dispatch(AuthEvent.tryAutoLogIn())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
