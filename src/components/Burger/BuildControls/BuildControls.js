import React from 'react';
import classes from './BuildControls.module.css';
import BC from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'},
];
const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}$</strong></p>
        
        {controls.map(ctrl => (
            <BC 
            key={ctrl.label} 
            label={ctrl.label} 
            added={() => props.ingAdded(ctrl.type)}
            removed = {()=> props.ingRemoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
            />
        ))}
        <button 
          className={classes.OrderButton}
          disabled={!props.purchasable}
          onClick={props.ordered}   
        >
          {props.isAuth ? 'Order now' : 'Sign in to order'}
        </button>
    </div>
)
export default buildControls;