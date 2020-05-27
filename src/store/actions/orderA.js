import * as actionTypes from '../actions/actionTypes';
import axios from '../../Axios-orders';

export const purchaseBsucess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData,
    };
}

export const purchaseBfailed = (error) => {
    return {
        type:actionTypes.PURCHASE_BURGER_FAILED,
        error: error,
    };
}

export const purchaseBstart = (orderData) => {
    return dispatch =>{

        axios.post('/orders.json', orderData)
        .then(response => {
            console.log(response.data);
                dispatch(purchaseBsucess(response.data, orderData));
        }).catch( error=> {
                console.log(error);
                dispatch(purchaseBfailed(error));
            });
    };
}
