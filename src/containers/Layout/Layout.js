import React, {Component} from 'react';
import Aux from '../../hoc/Auxilary';
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


class Layout extends Component {
    state = {
        showSD: false
    }
    sideDrawerClosed = () => {
        this.setState({showSD: false});
    }
    // sideDrawerOpened =() => {
    //     this.setState({showSD: true});
    // }
    sideDrawerToggleHandler = () => {
        this.setState( (prevState) => {
            return {showSD: !prevState.showSD};
        });
    }
    render () {
        return (
        <Aux>
            {/* <Toolbar open={this.sideDrawerOpened}/> I added this for hamburger icon*/}
            <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>

            <SDrawer
                closed={this.sideDrawerClosed}
                open={this.state.showSD}
            />
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>    
        );
    };
   

};

export default Layout;