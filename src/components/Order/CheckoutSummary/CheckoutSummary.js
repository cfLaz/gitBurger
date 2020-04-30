import React from 'react';
import Burger from '../../../components/Burger/Burger';
import Button from '../../Burger/OrderSummary/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary= (props) => {
    return(
        <div className={classes.CheckoutSummary}>
            <h2>Hope you like lick your fingers!</h2>

            <div style={{width: '100%', margin: 'auto'}}>
                <Burger
                  ingredients = {props.ingredients}
                />
            </div>

            <Button 
            btnType='Danger'
            clicked
            >
                CANCEL
            </Button>

            <Button 
            btnType='Success'
            clicked
            >
                CONTINUE
            </Button>

        </div>
    )
};

export default checkoutSummary;