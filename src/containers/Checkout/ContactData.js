import React, {Component} from 'react';
import Btn from '../../components/Burger/OrderSummary/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../Axios-orders';
import Spinner from '../../components/UI/Spinner'

class ContactData extends Component {
    state={
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
        loading: false,
    }
    orderHandler=(event) => {
        event.preventDefault();
        this.setState( {loading:true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price, //this would ussualy be set up on the server, otherwise, users could manipulate it.
            customer: {
                name: 'Laz',
                address: {
                    street: 'ulichica bb',
                    zipCode: 78000,
                    country: 'Krajina',
                },
                email: 'lazni@gmail.com',
                
            },
            deliveryMethod: 'fast&furious'
        };
        //needs to have .json becaue of firebase
        axios.post('/orders.json', order).then(response => {

            this.setState({loading:false,});
            this.props.history.push('/');
            }).catch( error=> {
                console.log(error);
                this.setState({
                    loading:false, 
                    }
                );
            });

        alert('Бургер се спрема');
    }
    render() {
        let form = (
        <form>
            <input className={classes.Input} type='text' name='name' placeholder='Your Name'/>

            <input className={classes.Input} type='text' name='street' placeholder='Your Email'/>
            
            <input className={classes.Input} type='text' name='email' placeholder='Street'/>

            <input className={classes.Input} type='text' name='postal' placeholder='Postal Code'/>

            <Btn 
            btnType ='Success' 
            clicked={this.orderHandler}>
                ORDER
            </Btn>
        </form>
        );

        if (this.state.loading){
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    };
}

export default ContactData;