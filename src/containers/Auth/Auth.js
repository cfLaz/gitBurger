import React, {Component} from 'react';
import Input from '../../components/UI/Input';
import Button from '../../components/Burger/OrderSummary/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/indexA';
import {connect} from 'react-redux';

class Auth extends Component{

    state= {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'email address',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },  
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6, //required by firebase
                },
                valid: false,
                touched: false,
            }, 
        },
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
        if(rules.Email){
            //need to add email validity
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        /* my setup ** 
        if (rules.minLength) {
            isValid = (value.length >= rules.minLength) && (value.length <= rules.maxLength);
        } */
        return isValid;
    }
    submitHandler =(event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value);

    };

    inputChangedHandler = (event, controlName) => {
      const updatedControls ={
          ...this.state.controls,
          [controlName]: { //email,password
              ...this.state.controls[controlName], //elType,elConfig, etc.
              value: event.target.value,
              valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
              touched: true,
          }
      };
      this.setState({controls: updatedControls})
    }
    render () {
        const formElementsArray =[];

        for(let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
            }) // [{id: name, config: 'everything in name'}, {}...]
        }
        const form =formElementsArray.map(formEl => (
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
            
        ));
        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>

                  {form}
                  <Button btnType='Success'> 
                    Log in
                  </Button>
                </form>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, pass) => dispatch(actions.auth(email,pass)),
    }
};
export default connect(null,mapDispatchToProps)(Auth);