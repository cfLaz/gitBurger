import React from 'react';
import classes from './Order.module.css';

const order = (props) => {//if it's just returning JSX we can use () after (props) =>, here we changed it to {} so we can put JSC in return() and tun some code before it
    
    const ingredients = []; // we could've just copied transIng from Burger.js, but this is alternative
    for (let ingName in props.ingredients){
        ingredients.push(
            {
                name: ingName, 
                amount: props.ingredients[ingName]
            }
        )
    }
    const ingOutput = ingredients.map( ig => {
        return (<span 
                style={{textTransform: 'capitalize', 
                        display: 'inline-block',
                        margin: '0 8px',
                        border: '1px solid gray',
                        padding: '5px',
                    }}
                key = {ig.name} 
                >
                    {ig.name} {(ig.amount)}
               </span>)
    });
 return (
    <div className={classes.Order} >
        <p>Ingredients: {ingOutput}</p> {/* Number.parseFloat to convert string to number, also we could've added '+' to order.price in Orders.js */}
        <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        <button 
         style={{
             marginLeft: '40%',
             border: '1px solid red',
             backgroundColor: '#8b380b',
             color: 'white',
             borderRadius: '2px',
         }}
         onClick={props.deleteOrder}
        >
            Remove order
        </button>
    </div>)
};

export default order;