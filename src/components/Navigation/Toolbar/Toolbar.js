import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavigationItems/NavigationItems';
const toolbar= (props) => (
    <header className={classes.Toolbar}>
        <div>МЕНИ</div>
        <Logo/>
        <nav>
            <NavItems/>
        </nav>
    </header>
);
export default toolbar;