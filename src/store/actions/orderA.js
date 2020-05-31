import * as actionTypes from '../actions/actionTypes';
import axios from '../../Axios-orders';

export const purchaseBsuccess = (id, orderData) => {
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
                dispatch(purchaseBsuccess(response.data.name, orderData));
        }).catch( error=> {
                console.log(error);
                dispatch(purchaseBfailed(error));
            });
    };
}
export const purchaseInit =() => {
    return {
        type: actionTypes.PURCHASE_INIT,
    }
};


export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders,
    }
}
export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error:error,
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START,
    }
}
export const removeOrder =(id) => { //I added
    return { 
        type: actionTypes.REMOVE_ORDER,
        orderId: id,
    }
}
export const fetchOrders = () => {
    return dispatch => {
        dispatch (fetchOrdersStart);

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
                 dispatch(fetchOrdersSuccess(fetchedOrders));
                 
                 console.log(fetchedOrders); //4me
            } 
         ).catch(
             err=> {
                 dispatch(fetchOrdersFail(err));
             }
         );
    };
}
