import React, {Component} from 'react';
import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BCs from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderS from '../../components/Burger/OrderSummary/OrderS';
import axios from '../../../src/Axios-orders';
import Spinner from '../../components/UI/Spinner';
import errorHandler from '../../hoc/errorHandler';
//importing with lowercase letter since we are not going to use it in JSX

const  PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

class BurgerBuilder extends Component {
    /*state = {
        constructor(props){
            super(props);
            this.state={...}
        } this is an old method
    }*/
    state = {
        ingredients: null,
    totalPrice: 4,
    purchasable: false, //we could've just checked if the price is = 4?
    purchasing: false,
    loading: false,
    error:false,
    }
    componentDidMount () {
        axios.get('https://burger-builder-f9f4f.firebaseio.com/ingredients.json').then(
           response => {
               this.setState({ingredients: response.data});
           }).catch(error=> {
               this.setState({error: true})
           }) 
        
    }
    updatePurchaseState (ingredients) {

        const sum = Object.keys(ingredients).map(igKey =>{
            return ingredients[igKey]
        }).reduce((sum,el) => {
            return sum + el;
        },0);
        this.setState({purchasable: sum>0});       
    };

    addIng = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;
        const updatedIng={...this.state.ingredients};
        updatedIng[type] = updatedCount;
        const priceAddition = PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice:newPrice, ingredients:updatedIng});
        this.updatePurchaseState(updatedIng);
    };

    removeIng = (type) => {
        const oldCount = this.state.ingredients[type];
        let updatedCount =null;
        if(oldCount<=0) return;
        else {updatedCount = oldCount -1};

        const updatedIng={...this.state.ingredients};
        updatedIng[type] = updatedCount;
        const priceDeduction = PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice:newPrice, ingredients:updatedIng});
        this.updatePurchaseState(updatedIng);
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = () => { 
        /* this.setState ( {loading:true,});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice.toFixed(2), //this would ussualy be set up on the server, otherwise, users could manipulate it.
            customer: {
                name: 'Laz',
                address: {
                    street: 'ulichica bb',
                    zipCode: 78000,
                    country: 'Krajina',
                },
                email: 'lazni@gmail.com',
                
            },
            deliveryMethod: 'fast&furious'
        };
        //needs to have .json becaue of firebase
        axios.post('/orders.json', order).then(response => {

            this.setState({loading:false, purchasing:false});
            }).catch( error=> {
                console.log(error);
                this.setState({
                    loading:false, 
                    purchasing:false
                    }
                );
            });

        alert('Бургер се спрема'); */
        const queryParams = [];

        for (let i in this.state.ingredients){
            queryParams.push(
                encodeURIComponent(i)+'='+ encodeURIComponent(this.state.ingredients[i])
            );
        }
        const queryString = queryParams.join('&');
        
        this.props.history.push({
            pathname:'/checkout',
            search: '?' + queryString,
        });
    }
    
    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let burger= this.state.error ? <p> ingredients cannot be loaded</p> : <Spinner/>;

        let orderSummary= null;

        if(this.state.ingredients) {
            
        burger = (
            <Aux>
                <Burger 
                    ingredients={this.state.ingredients}
                />

                        <div>
                            <BCs
                            ingAdded={this.addIng}
                            ingRemoved={this.removeIng}
                            disabled={disabledInfo}
                            price={this.state.totalPrice}
                            purchasable={this.state.purchasable}
                            ordered={this.purchaseHandler}
                            />
                        </div>
            </Aux>
        );
        orderSummary = <OrderS 
        ingredients={this.state.ingredients}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice}
        /> 
        }
        /* const disabledInfo = {
            ...this.state.ingredients
        }
        for( let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0; //turns to true or false
        }; */
        
        if(this.state.loading){
            orderSummary = <Spinner/>
        }
        return(
            <Aux>
             <Modal 
                show={this.state.purchasing} 
                modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
             </Modal>
                    {burger}
              
            </Aux>
        );
    }
}

export default errorHandler(BurgerBuilder, axios);