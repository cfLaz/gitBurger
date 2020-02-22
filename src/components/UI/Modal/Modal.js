import React from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxilary';
import Bd from '../Backdrop/Backdrop';

const modal= (props) => (
    <Aux>
      <Bd show={props.show} clicked={props.modalClosed}/>
        <div 
        className={classes.Modal}
        style={{
            transform: props.show ? 'translateY(0)' : 'translate(-100vh)',
            opacity: props.show ? '1': '0'
        }}
        >
            {props.children}
        </div>
    </Aux>
);

export default modal;