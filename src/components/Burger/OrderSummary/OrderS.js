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
                <h3>Ваша поруџбина</h3>
                <p>Састојци бургера:</p>
                <ul>
                    {ingSummary}
                </ul>
                <p><strong>цијена: {this.props.price.toFixed(2)}</strong></p>
                <p>Да наплатимо?</p>

                <Button btnType='Danger' clicked={this.props.purchaseCanceled}>
                    Не :(
                </Button>
                
                <Button btnType='Success' 
                clicked={this.props.purchaseContinued}
                
                >
                    Да :)
                </Button>
                    
            </Aux>
        );
    }
   
};

export default OrderS;