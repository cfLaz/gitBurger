import React, {Component} from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxilary';
import Bd from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || this.props.children !== nextProps.children;
    }
    componentDidUpdate (){
        console.log('Modal did \' \n update')
    }
render () {

    return (
        <Aux>
        <Bd show={this.props.show} clicked={this.props.modalClosed}/>
            
        <div 
        className={classes.Modal}
            style={{
            transform: this.props.show ? 'translateY(0)' : 'translate(-100vh)',
            opacity: this.props.show ? '1': '0'
              }}
              >
                  {this.props.children}
            </div>
          </Aux>
        );
    }
    
};

export default Modal;