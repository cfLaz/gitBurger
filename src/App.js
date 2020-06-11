import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
//import bb from './containers/BurgerBuilder/BurgerBuilder';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/indexA';
class App extends Component {
  /* state = {
    show: true
  }; */
 /*  componentDidMount(){
    setTimeout(() => {
      this.setState({show: false});
    }, 5000);
  }; */
  componentDidMount () {
    this.props.onTryAutoSignup();
  }
  render() {
    return (
      <div>
        <Layout>
          <Switch>

          <Route path='/auth' component={Auth}/>
          <Route path='/checkout' component={Checkout}/>
          <Route path='/' exact component={BurgerBuilder}/>
          <Route path='/orders' component ={Orders}/>
          <Route path='/logout' component ={Logout}/>
          
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}
  export default connect(null,mapDispatchToProps)(App);
