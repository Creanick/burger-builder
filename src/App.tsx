import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
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
interface Props extends Partial<HandlerProps>{}
class App extends Component<Props>{
  componentDidMount(){
    this.props.tryAutoLogin && this.props.tryAutoLogin();
  }
  render(){
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/orders" component={OrderPage}/>
            <Route path="/login" component={AuthPage}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/" exact component={BurgerBuilder}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch:ThunkDispatch<StoreState,{},AnyAction>):HandlerProps=>{
  return {
    tryAutoLogin:()=>dispatch(AuthEvent.tryAutoLogIn())
  }
}
export default connect(null,mapDispatchToProps)(App);
