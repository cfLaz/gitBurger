import React, { Component } from "react";
import Order  from '../../components/Order/Order';
import axios from '../../Axios-orders';
import withErrorHandler from '../../hoc/errorHandler';
import * as actions from '../../store/actions/indexA';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner';

class Orders extends Component {
    
    componentDidMount() //because it will always be re-mounted so there is no need for componentDidUpdate()
    {   
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }
    //list = [];
    /* orders = {
        for (let ord in this.state.orders){
            //list.push([ord.ingredients]);
            return <Order ingredients = {ord.ingredients}/>          
        }
    } */
    removeOrder = (id) => {
        return this.props.onRemoveOrder(id, this.props.token);
    }
    render() {
/* my shot - stupid syntax error occurs which doesn't make sense
        let orders = (
            for (let ord in this.state.orders){
                //list.push([ord.ingredients]);
                return <Order ingredients = {ord.ingredients}/>          
            };
        ); */
        let orders = <Spinner/>;
        if (!this.props.loading) {
            orders =(this.props.orders.map(order => (
                <Order
                    key = {order.id}
                    ingredients = {order.ingredients}
                    price = {order.price}
                    deleteOrder = {() => this.removeOrder(order.id)}
                    date={order.date}
                />))       
            );
        } 
        return (
            <div>{/*my shot -  */}
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
        //orderID: state.orders[]
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId ) => dispatch(actions.fetchOrders(token, userId)),
        onRemoveOrder: (id, token) => dispatch(actions.removeOrder(id, token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));