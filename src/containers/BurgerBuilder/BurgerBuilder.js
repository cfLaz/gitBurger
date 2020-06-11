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
import {connect} from 'react-redux';
//import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/indexA'; // if you point to folder, it automatically goes to index file.

/* const  PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}; */

class BurgerBuilder extends Component {
    /*state = {
        constructor(props){
            super(props);
            this.state={...}
        } this is an old method
    }*/
    state = {
     /*  // ingredients: null,
    //totalPrice: 4,
   // purchasable: false, //we could've just checked if the price is = 4?
   /* loading: false,
    error:false, */ 
   purchasing: false,
    
    }

    /* componentDidMount () {
        axios.get('https://burger-builder-f9f4f.firebaseio.com/ingredients.json').then(
           response => {
               this.setState({ingredients: response.data});
           }).catch(error=> {
               this.setState({error: true})
           }) 
        
    } */
    componentDidMount () {
        this.props.onInitIng();
    }
    updatePurchaseState (ingredients) {

        const sum = Object.keys(ingredients).map(igKey =>{
            return ingredients[igKey]
        }).reduce((sum,el) => {
            return sum + el;
        },0);
        //this.setState({purchasable: sum>0});       
        return sum>0; //changed due to redux impact on the project
    };

    /* addIng = (type) => {
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
    }; */

    purchaseHandler = () => { 
        if(this.props.isAthenticated){
            this.setState({purchasing: true});
        } else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
        
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = () => { 
        /* this.setState ( {loading:true,});
         */
        /* const queryParams = [];
        console.log(this.props)
        for (let i in this.state.ingredients){
            queryParams.push(
                encodeURIComponent(i)+'='+ encodeURIComponent(this.state.ingredients[i])
            );
        }
        
        queryParams.push('price=' + this.state.totalPrice); 
        const queryString = queryParams.join('&');
        
        this.props.history.push({
            pathname:'/checkout',
            search: '?' + queryString,
        });
        console.log(this.props) */
        this.props.onInitPurchase(); //313
        this.props.history.push('/checkout');

    }
    
    render () {

        const disabledInfo = {
            ...this.props.ings
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let burger= this.props.error ? <p> ingredients cannot be loaded</p> : <Spinner/>;

        let orderSummary= null;

        if(this.props.ings) {
            
        burger = (
            <Aux>
                <Burger 
                    ingredients={this.props.ings}
                />

                        <div>
                            <BCs
                            ingAdded={this.props.onIngAdded}
                            ingRemoved={this.props.onIngRemoved}
                            disabled={disabledInfo}
                            price={this.props.totalPrice}
                            purchasable={this.updatePurchaseState(this.props.ings)}
                            ordered={this.purchaseHandler}
                            isAuth={this.props.isAthenticated}
                            />
                        </div>
            </Aux>
        );
        orderSummary = <OrderS 
        ingredients={this.props.ings}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.props.totalPrice}
        /> 
        }
        /* const disabledInfo = {
            ...this.state.ingredients
        }
        for( let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0; //turns to true or false
        }; */
        
        /* if(this.state.loading){
            orderSummary = <Spinner/>
        } */
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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAthenticated: state.auth.token != null,

    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIng: () => dispatch(actions.initIngredients()), //getting ingredients
        onInitPurchase: ()=> dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path)=> dispatch(actions.setAuthRedirectPath(path))

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(errorHandler(BurgerBuilder, axios)); //still need axios because it's handled from bbA