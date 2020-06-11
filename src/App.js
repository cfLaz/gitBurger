import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
//import bb from './containers/BurgerBuilder/BurgerBuilder';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
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

    let routes =(
      <Switch> {/* picks the first hit */}
        <Route path='/auth' component={Auth}/>
        <Route path='/' exact component={BurgerBuilder}/> 
        <Redirect to='/' /> {/* added so if we go to orders mannualy it wil redirect back to begining */}
      </Switch>
    );
        //guards
    if(this.props.isAuthenticated) {
      routes= ( 
        <Switch>
          <Route path='/' exact component={BurgerBuilder}/>
          <Route path='/checkout' component={Checkout}/>
          <Route path='/orders' component ={Orders}/>
          <Route path='/logout' component ={Logout}/>);
          <Redirect to='/' />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
};
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
} 
        //wRouter supposed to fix an issue with App not receiving route props due connect() (i didn't have this issue)
  export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
