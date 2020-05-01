import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
//import bb from './containers/BurgerBuilder/BurgerBuilder';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';

class App extends Component {
  /* state = {
    show: true
  }; */
 /*  componentDidMount(){
    setTimeout(() => {
      this.setState({show: false});
    }, 5000);
  }; */
    
  render() {
    return (
      <div>
        <Layout>
          <Switch>

          <Route path='/checkout' component={Checkout}/>
          <Route path='/' exact component={BurgerBuilder}/>

          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
