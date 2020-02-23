import React from 'react';
import Aux from '../../../hoc/Auxilary';
import Button from '../OrderSummary/Button/Button';

const orderS=(props) => {
    const ingSummary = Object.keys(props.ingredients).map(igKey =>{
            return(
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
            </li>);
        });
            
    return (
        <Aux>
            <h3>Ваша поруџбина</h3>
            <p>Састојци бургера:</p>
            <ul>
                {ingSummary}
            </ul>
            <p><strong>цијена: {props.price.toFixed(2)}</strong></p>
            <p>Да наплатимо?</p>
            <Button btnType='Danger' clicked={props.purchaseCanceled}>
                Не :(</Button>
            <Button btnType='Success' clicked={props.purchaseContinued}>
                Да :)
            </Button>
                
        </Aux>
    );
};

export default orderS;