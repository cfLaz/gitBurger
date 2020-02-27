import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css'

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}> {/*not used because we out .Logo in toolbar and sidedrawer css*/}
        <img src={burgerLogo} alt='Бургер'/>
    </div>
);

export default logo;