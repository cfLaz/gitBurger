import React from 'react';
import classes from './NavItem.module.css';
import {NavLink} from 'react-router-dom';

const navigationItem= (props) => (
       <li className={classes.NavItem}> {/* a.active will not work because we are using CSS modules, which converts our class names into unique random class name, that's why we use activeClassName*/}
           <NavLink 
            to={props.link}
            //exact
            exact={props.exact} //because this way not every link will have 'exact = true'. In this case, Orders has "exact=false" because it's not added like in <NavItem>BurgerBuilder</NavItem>
            activeClassName={classes.active}
           >
           {props.children}
           </NavLink>
        </li>
);

export default navigationItem;