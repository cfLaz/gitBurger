import React, {Component} from 'react';
import Aux from '../../../hoc/Auxilary';

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
            <p>Састојци бургерчине:</p>
            <ul>
                {ingSummary}
            </ul>
            <p>Јел то то?</p>
        </Aux>
    );
};

export default orderS;