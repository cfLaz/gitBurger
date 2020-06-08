import React, {Component} from 'react';
import Aux from '../../hoc/Auxilary';
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

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
            <Toolbar
              isAuth={this.props.isAuthenticated}
              drawerToggleClicked={this.sideDrawerToggleHandler}/>

            <SDrawer
                isAuth={this.props.isAuthenticated}
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
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !==null,
    };
};
export default connect(mapStateToProps)(Layout);