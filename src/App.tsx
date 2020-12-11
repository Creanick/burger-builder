import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/layout/layout';
import BurgerBuilder from './containers/burger_builder/burger_builder';
import Checkout from './containers/checkout/checkout';
import OrderPage from './containers/order_page/order_page';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={OrderPage}/>
          <Route path="/" exact component={BurgerBuilder}/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
