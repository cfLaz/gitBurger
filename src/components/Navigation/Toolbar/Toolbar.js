import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavigationItems/NavigationItems';
//import Hbtn from '../../UI/HamburgerBtn';
import DrawerToggle from '../SideDrawer/DrawerToggle';


const toolbar= (props) => (

    <header className={classes.Toolbar}>
        {/*<div className={classes.meni}>
            МЕНИ <div onClick={props.open}> <Hbtn /> </div>
        </div>*/}
        
        <DrawerToggle clicked={props.drawerToggleClicked}/>

        {/* <Logo height='80%'/> */}
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavItems/>
        </nav>
    </header>
);
export default toolbar;