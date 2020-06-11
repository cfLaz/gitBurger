import React, {Component} from 'react';
import Input from '../../components/UI/Input';
import Button from '../../components/Burger/OrderSummary/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/indexA';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner';
import {Redirect} from 'react-router-dom';

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
        isSignUp: true,
    }
    componentDidMount() { //if burger is empty and auth redirect is not '/'
        if(!this.props.buildingBurger && this.props.authRedirect !== '/'){
            this.props.onSetAuthRedirectPath(); //shoot me to te burger builder to add some ingredients.
        }
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
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value, this.state.isSignUp);

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
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        })
    }
    render () {
        const formElementsArray =[];

        for(let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
            }) // [{id: name, config: 'everything in name'}, {}...]
        }
        let form =formElementsArray.map(formEl => (
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

        if (this.props.loading) {form = <Spinner/>;}
        
        let errorMessage = null;
        if(this.props.error) {          //.message from firebase
            errorMessage=(<p>{this.props.error.message}</p>);
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>

                  {form}
                  <Button btnType='Success'> 
                    Log in
                  </Button>
                </form>
                <Button btnType='Danger' clicked={this.switchAuthModeHandler}>
                    Switch to {this.state.isSignUp ? 'Sign in' : 'Sign up'}
                </Button>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, pass, isSignUp) => dispatch(actions.auth(email,pass, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
};
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error:state.auth.error,
        isAuthenticated : state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);