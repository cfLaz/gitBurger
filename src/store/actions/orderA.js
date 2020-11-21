import * as actionTypes from './actionTypes';
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
//appears in ContactData
export const purchaseBurger = (orderData, token) => {
    return dispatch =>{

        dispatch(purchaseBstart()); //dispatched to the store
       
        axios.post('/orders.json?auth='+token, orderData)
        .then(response => {
            console.log(response.data);  //this is the string that  identifies each order (response.data.name)
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
export const removeOrder =(id, token) => { //I added
    return { 
        type: actionTypes.REMOVE_ORDER,
        orderId: id, //getting the userID and not orderID...changed it, it's good now
        token: token,
    }
}
//here is order id that I'm looking for
export const fetchOrders = (token, userId) => {
    //in action (return) we could add getState as second argument next to dispatch but it's not usually recommended 
    return dispatch => {
        dispatch (fetchOrdersStart);
                                                //understood by firebase (341, 4:20)
                                                
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="'+ userId+'"';
        
                            //this is the authentication
        axios.get('/orders.json'+ queryParams).then(
            response => {
                 console.log(response.data); //receiving JSON object, not an array
                 const fetchedOrders = [];
                 for (let key in response.data){ //IDs are 'key's here, to not lose the ID we are pushing a new object in which we are adding the ID
                     fetchedOrders.push({
                         ...response.data[key], //entire order information
                         id:key, // 'key' represents one order by it's orderID (e.g.ML39TeH-82RFhR-dr8N  - from firebase, think this is added by default when we initially push the order to firebase
                         
                     });
                 }
                 
                 dispatch(fetchOrdersSuccess(fetchedOrders));
                 
                // console.log(fetchedOrders); //4me
            } 
         ).catch(
             err=> {
                 dispatch(fetchOrdersFail(err));
             }
         );
    };
}
