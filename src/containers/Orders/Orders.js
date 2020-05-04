import React, { Component } from "react";
import Order  from '../../components/Order/Order';
import axios from '../../Axios-orders';
import withErrorHandler from '../../hoc/errorHandler';
class Orders extends Component {
    
    state= {
        orders: [],
        loading: true,
    }
    componentDidMount() //because it will always be re-mounted so there is no need for componentDidUpdate()
    {   console.log(this.props);
        axios.get('/orders.json').then(
           response => {
                console.log(response.data); //receiving JSON object, not an array
                const fetchedOrders = [];
                for (let key in response.data){ //IDs are 'key's here, to not lose the ID we are pushing a new object in which we are adding the ID
                    fetchedOrders.push({
                        ...response.data[key],
                        id:key,
                    });
                }
                this.setState({loading: false, orders: fetchedOrders});
                console.log(fetchedOrders); //4me
           } 
        ).catch(
            err=> {
                this.setState({loading: false});
            }
        );
    }
    //list = [];
    /* orders = {
        for (let ord in this.state.orders){
            //list.push([ord.ingredients]);
            return <Order ingredients = {ord.ingredients}/>          
        }
    } */
    render() {
/* my shot - stupid syntax error occurs which doesn't make sense
        let orders = (
            for (let ord in this.state.orders){
                //list.push([ord.ingredients]);
                return <Order ingredients = {ord.ingredients}/>          
            };
        ); */

        return (
            <div>{/*my shot -  */}
                {this.state.orders.map(order => (
                    <Order
                    key = {order.id}
                    ingredients = {order.ingredients}
                    price = {order.price}
                    />
                )
                )}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);