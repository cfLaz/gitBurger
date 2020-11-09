import React, { Component, Suspense } from 'react';
import asyncComp from './hoc/asyncComponent';
import Layout from './containers/Layout/Layout';
//import bb from './containers/BurgerBuilder/BurgerBuilder';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
//import Orders from './containers/Orders/Orders';
import Logout from './containers/Auth/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/indexA';

const Auth = React.lazy(() => import('./containers/Auth/Auth'));
//does what is done manually below with asyncComp

const asyncCheckout = asyncComp( () => {
  return import('./containers/Checkout/Checkout');
})

//Max approach (better)
const asyncOrders = asyncComp( () => {
  return import('./containers/Orders/Orders');
})

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
        <Route path='/auth' render={()=>(
            <Suspense fallback={<div>'lalala</div>}>
              <Auth/>
            </Suspense>
          )}/>
        <Route path='/' exact component={BurgerBuilder}/> 
        <Redirect to='/' /> {/* added so if we go to orders mannualy it wil redirect back to begining */}
      </Switch>
    );
        //guards
    if(this.props.isAuthenticated) {
      routes= ( 
        <Switch>
          <Route path='/' exact component={BurgerBuilder}/>
          <Route path='/checkout' component={asyncCheckout}/>
          <Route path='/orders' component ={asyncOrders}/>
          <Route path='/logout' component ={Logout}/>);
          <Route path='/auth' render={()=>(
            <Suspense fallback={<div>'lalala</div>}>
              <Auth/>
            </Suspense>
          )}/> {/* wasn't here, added in 345 video. REdirected me to '/' instead */}
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
