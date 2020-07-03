import React, {Component} from 'react';
import Input from '../../components/UI/Input';
import Button from '../../components/Burger/OrderSummary/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/indexA';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner';
import {Redirect} from 'react-router-dom';
import {updateObject, checkValidity} from '../../shared/utility';

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
    
    submitHandler =(event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value, this.state.isSignUp);

    };

    inputChangedHandler = (event, controlName) => {

      const updatedControls = updateObject(this.state.controls, 
           {[controlName]: updateObject(this.state.controls[controlName], {
               value: event.target.value,
               valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
               touched: true,
             })
           })
    
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
            }) // [{id: email, config: 'everything in email'}, {}...]
        }
        // 2 elements in the form, email and password.
        let form =formElementsArray.map(formEl => (
           <Input
             key={formEl.id} // key is added in above for loop
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
                   {this.state.isSignUp ? 'Sign up' : 'Log in'}
                  </Button>
                </form>

                <Button btnType='Danger' clicked={this.switchAuthModeHandler}>
                    Switch to {this.state.isSignUp ? 'Log in' : 'Sign up'} 
                </Button>
                {/* <span>(you're currently signing {this.state.isSignUp ? 'up' : 'in'})</span> */}
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