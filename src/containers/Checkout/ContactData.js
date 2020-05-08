import React, {Component} from 'react';
import Btn from '../../components/Burger/OrderSummary/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../Axios-orders';
import Spinner from '../../components/UI/Spinner'
import Input from '../../components/UI/Input';

class ContactData extends Component {
    state={
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',
                },
                value: '',
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail',
                },
                value: '',
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                              {value: 'VIP quick', displayValue: 'vip quick'},
                              {value: 'economy', displayValue: 'standard'},
                            ]
                },
                value: '',
            },
        },
        
        loading:false,
    }


     orderHandler=(event) => {
        event.preventDefault();
        this.setState( {loading:true});
        const formData = {};
        for (let formElementId in this.state.orderForm){
            formData[formElementId] = this.state.orderForm[formElementId].value;

        };
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price, //this would ussualy be set up on the server, otherwise, users could manipulate it.
            orderData: formData,
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

    inputChangedHandler = (event, inputIdentifier) => {
        //console.log(event.target.value);
        const updatedOrderForm = { //need to clone deeply, ...this.state.orderForn does not create a deep clone (it creates copied object and its properties, but its properties are nested object and properties within them won't be cloned (it would ne just poinet to them) and that way we mutate the original state unfortunately)
            ...this.state.orderForm
        } ;  
                                            /*email, name...for elementConfig we would have to clone deeply again*/
        const updatedFormEl= {...updatedOrderForm[inputIdentifier]};
        updatedFormEl.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormEl;
        this.setState({orderForm: updatedOrderForm});
    }
    render() {
        const formElementsArray =[];

        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            })
        }

        let form = (
        <form onSubmit={this.orderHandler}>
            {formElementsArray.map(formEl => (
                    <Input 
                        key={formEl.id}
                        elementType={formEl.config.elementType} 
                        elementConfig={formEl.config}
                        value={formEl.config.value}
                        changed={(event) => this.inputChangedHandler(event, formEl.id)} //anonimous function, so we can pass arguments into iCH (event is created by React automatically)
                    />
                ))
            }
            <Btn 
            btnType ='Success' 
            >
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