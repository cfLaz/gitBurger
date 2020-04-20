import React, {Component} from 'react';
import Modal from '../components/UI/Modal/Modal';
import Aux from './Auxilary';

const ErrorHandler= (WrappedComp, axios) => {
    return  class extends Component {
        state= {
            error: null,

        }
  /*       ComponentWillMount() is run before child components are rendered */
        componentWillMount (){
            this.reqInterceptor = axios.interceptors.request.use(req=>{
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error =>  {
                this.setState({error:error});
                }
            );
        }
        componentWillUnmount () {
            console.log('WillUnmount', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }
        errorConfirmed = ()=> {
            this.setState({error:null});
        }

        render()
        {
        return(
            <Aux>
                <Modal 
                show={this.state.error}
                modalClosed={this.errorConfirmed}
                >
                   {this.state.error ? this.state.error.message : null}
                   {/* message property returned on the error object from Firebase */}
                </Modal>
                <WrappedComp {...this.props} /> 
            </Aux>
            )
        }
    } 
};

export default ErrorHandler;