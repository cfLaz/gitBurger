import React from 'react';
import Burger from '../../../components/Burger/Burger';
import Button from '../../Burger/OrderSummary/Button/Button';
import classes from './CheckoutSummary.module.css';
import {withRouter} from 'react-router-dom';
const checkoutSummary= (props) => {
    return(
        <div className={classes.CheckoutSummary}>
            <h2>This is your burger!</h2>

            <div style={{width: '100%', margin: 'auto'}}>
                <Burger
                  ingredients = {props.ingredients}
                  ingsOrder = {props.ingsOrder}
                />
            </div>

            <Button 
            btnType='Danger'
            clicked={props.checkoutCancelled}
            >
                CANCEL
            </Button>

            <Button 
            btnType='Success'
            clicked={props.checkoutContinued}
            >
                CONTINUE
            </Button>

        </div>
    )
};

export default withRouter(checkoutSummary);