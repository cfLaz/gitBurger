import React, {Component} from 'react';
import CheckoutSum from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData.js';
import {connect} from 'react-redux';


class Checkout extends Component {
/* state={
    ingredients: null,
    totalPrice:0,
}
componentWillMount() {//changed from DidMount because it was accessing <Route/> which had ingredients defined as null and it can't use them like that
    const query = new URLSearchParams(this.props.location.search);
    const ingredients= {};
    let price= 0;
    for (let param of query.entries()) {
        // ['salad'. '1']
        if (param[0] === 'price'){
           price=param[1];
        }
        else ingredients[param[0]] = +param[1];
    }
    this.setState({ingredients: ingredients, totalPrice: price});
} */



checkoutCancelledHandler = () => {
    this.props.history.goBack();
}
checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
}
    render () {
    //console.log(this.props);
        let summary = <Redirect to='/'/>;

        if (this.props.ings){
            summary = (
            <div>
                <CheckoutSum 
                ingredients={this.props.ings} 
                checkoutContinued={this.checkoutContinuedHandler}
                checkoutCancelled={this.checkoutCancelledHandler}
                />
                <Route 
                path={this.props.match.path + '/contact-data'} 
                component={ContactData}
               /*  render={(props) => (
                    <ContactData ingredients={this.props.ings} price={this.props.price} {...props}/>
                    )} //now we won't have history object in ContactData, that's why we put ...props
                *//> 
            </div>
            );
        }
        return(
          summary            
        )
    }
}

const mapStateToProps = state=> {
    return {
        ings: state.burgerBuilder.ingredients,
    }
}

export default connect(mapStateToProps)(Checkout);