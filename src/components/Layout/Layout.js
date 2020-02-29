import React, {Component} from 'react';
import Aux from '../../hoc/Auxilary';
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SDrawer from '../Navigation/SideDrawer/SideDrawer';


class Layout extends Component {
    state = {
        showSD: true
    }
    sideDrawerClosed = () => {
        this.setState({showSD: false});
    }
    render () {
        return (
        <Aux>
            <Toolbar/>
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