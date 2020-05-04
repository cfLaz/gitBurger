import React from 'react';
import classes from './NavItems.module.css';
import NavItem from './NavigationItem/NavigationItem'

const navigationItems= (props) => (
    <ul className={classes.NavItems}>
        
        <NavItem
        link='/'
        exact
        //active//boolean properties can be setup like this (without active={true})  
        >
            Burger Builder
        </NavItem>

        <NavItem
        link='/orders'
        >
            Orders
        </NavItem>
    </ul>
);

export default navigationItems;