import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/layout/layout';
import BurgerBuilder from './containers/burger_builder/burger_builder';
import Checkout from './containers/checkout/checkout';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/" exact component={BurgerBuilder}/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
