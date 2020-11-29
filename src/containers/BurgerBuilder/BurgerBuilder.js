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

export class BurgerBuilder extends Component {
    
    state = {
        purchasing: false,
    }

    componentDidMount () {
        console.log(this.props.ings);

         if(!this.props.ings){ //I added this so when we come back to main page, previosly put ingredients will stay
            console.log('entering if condition where onInitIng is triggered')
            //temporary solution,not ideal
            //setTimeout(()=> {this.props.onInitIng()}, 1000)
            this.props.onInitIng()
        }
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
                    ingsOrder={this.props.ingredientsOrder}
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
        ingredientsOrder: state.burgerBuilder.ingredientsOrder,

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