import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
//import bb from './containers/BurgerBuilder/BurgerBuilder';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
class App extends Component {
  state = {
    show: true
  };
 /*  componentDidMount(){
    setTimeout(() => {
      this.setState({show: false});
    }, 5000);
  }; */
    
  render() {
    return (
      <div>
        <Layout>
          {this.state.show ? <BurgerBuilder/> : null}
          <Checkout/>
        </Layout>
      </div>
    );
  }
}

export default App;
