import React, {Component} from 'react';
import Btn from '../../components/Burger/OrderSummary/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../Axios-orders';
import Spinner from '../../components/UI/Spinner'
import Input from '../../components/UI/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../hoc/errorHandler';
import * as actions from '../../store/actions/indexA';

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
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 7,
                },       
                valid: false,
                touched: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail',
                },
                validation: {
                    required: true,
                },
                value: '',
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [//VP quick doesn't shows up in firebase for some reason
                              {value: 'VIP quick', displayValue: 'vip quick'},
                              {value: 'economy', displayValue: 'standard'},
                            ]
                },
                value: 'hmm',//if nothing is chosen
                valid: true, //added because of disabled button, formIsValid was always undefined (treated as false and can't be changed to true) because we had no 'valid' here, which makes my added checkup for deliveryMethod in inputChangedHandler irrelevant.
                //actually, it's relevant, I'm doing it because of rules.required
                validation: {}, //added for the same reason ^ (now my stuff is irrelevant)
            },
        },
        formIsValid: false,
    }


     orderHandler=(event) => {
        event.preventDefault();
        
        const formData = {};
        for (let formElementId in this.state.orderForm){
            formData[formElementId] = this.state.orderForm[formElementId].value;
        };
        const order = {
            ingredients: this.props.ings,
            price: this.props.price, //this would ussualy be set up on the server, otherwise, users could manipulate it.
            orderData: formData,
            userId: this.props.userId,
        };
        this.props.onOrderBurger(order, this.props.token);
        //needs to have .json becaue of firebase
        /* axios.post('/orders.json', order).then(response => {

            this.setState({loading:false,});
            this.props.history.push('/');
            }).catch( error=> {
                console.log(error);
                this.setState({
                    loading:false, 
                    }
                );
            }); */

        alert('Бургер се спрема');
    } 

    checkValidity(value, rules, id){
        let isValid = true;
        //if(!rules) return true; -another way of avoiding undefined
        if(rules.required){ //isValid depends on if string is empty or not
            isValid = value.trim()!== '' && isValid;
            // .trim() removes any whitespace at the beginning and the end
        };
        if (rules.minLength) {
            isValid = (value.length >= rules.minLength && isValid);
        };
        if (rules.maxLength) {
            isValid = (value.length <= rules.maxLength && isValid);
        }
        if(id === 'email'){
            //need to add email validity
        }
        /* my setup ** 
        if (rules.minLength) {
            isValid = (value.length >= rules.minLength) && (value.length <= rules.maxLength);
        } */
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        //console.log(event.target.value);
        const updatedOrderForm = { //need to clone deeply, ...this.state.orderForn does not create a deep clone (it creates copied object and its properties, but its properties are nested object and properties within them won't be cloned (it would ne just poinet to them) and that way we mutate the original state unfortunately)
            ...this.state.orderForm
        } ;  
                                            /*email, name...for elementConfig we would have to clone deeply again*/
        const updatedFormEl= {...updatedOrderForm[inputIdentifier]};

        updatedFormEl.value = event.target.value;
        updatedFormEl.touched=true;
        //I added if condition  bcz it throws an error in checkValidity because rules.required is undefined (later discussed in the course 248)
        if(inputIdentifier !== 'deliveryMethod')updatedFormEl.valid=this.checkValidity(updatedFormEl.value, updatedFormEl.validation, inputIdentifier); //I added 3rd atribute bcz of email

        let formIsValid = true;
        for (let inputId in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputId].valid && formIsValid
        }

        //console.log(updatedFormEl.valid);
        updatedOrderForm[inputIdentifier] = updatedFormEl;
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});

    }
    render() {
        const formElementsArray =[];

        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            }) // [{id: name, config: 'everything in name'}, {}...]
        }

        let form = (
        <form onSubmit={this.orderHandler}>
            {formElementsArray.map(formEl => (
                    <Input 
                        key={formEl.id}
                        elementType={formEl.config.elementType} 
                        elementConfig={formEl.config.elementConfig}
                        value={formEl.config.value}
                        changed={(event) => this.inputChangedHandler(event, formEl.id)} //anonimous function, so we can pass arguments into iCH (event is created by React automatically)
                        invalid={!formEl.config.valid}
                        shouldValidate={formEl.config.validation} //returns true if it exists
                        touched={formEl.config.touched}
                    />
                ))
            }
            <Btn 
            btnType ='Success'
            disabled={!this.state.formIsValid} 
            >
                ORDER
            </Btn>
        </form>
        );

        if (this.props.loading){
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
const mapStoreToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,

    }
};
const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
        
    }
}

export default connect(mapStoreToProps,mapDispatchToProps)(withErrorHandler(ContactData, axios));