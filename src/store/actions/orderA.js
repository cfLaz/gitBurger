import * as actionTypes from '../actions/actionTypes';
import axios from '../../Axios-orders';

export const purchaseBsucess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id, //from the server
        orderData: orderData,
    };
}

export const purchaseBfailed = (error) => {
    return {
        type:actionTypes.PURCHASE_BURGER_FAILED,
        error: error,
    };
}

export const purchaseBstart = () =>{
    return {
        type:actionTypes.PURCHASE_BRG_START
    }
}
export const purchaseBurger = (orderData) => {
    return dispatch =>{
        dispatch(purchaseBstart()); //dispatched to the store
        axios.post('/orders.json', orderData)
        .then(response => {
            console.log(response.data);
                dispatch(purchaseBsucess(response.data.name, orderData));
        }).catch( error=> {
                console.log(error);
                dispatch(purchaseBfailed(error));
            });
    };
}
