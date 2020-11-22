import React, {Component} from 'react';
import Aux from '../../../hoc/Auxilary';
import Button from '../OrderSummary/Button/Button';

class OrderS extends Component { //could convert this to functional component as we are just rendering stuff (would optimize the app more)
    /* componentDidUpdate(){
        console.log('OrderSummary did update')
    } */
    render(){
       
        const ingSummary = Object.keys(this.props.ingredients)
        .map(igKey =>{
            return(
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
            </li>);
        });
            
        return (
            <Aux>
                <h3>Your order:</h3>
                <p>Burger ingredients:</p>
                <ul>
                    {ingSummary}
                </ul>
                <p><strong>price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue?</p>

                <Button btnType='Danger' clicked={this.props.purchaseCanceled}>
                    No :(
                </Button>
                
                <Button btnType='Success' 
                clicked={this.props.purchaseContinued}
                
                >
                    Yes :)
                </Button>
                    
            </Aux>
        );
    }
   
};

export default OrderS;