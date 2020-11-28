import React, { Component, Fragment } from 'react';
import Toolbar from '../navigation/toolbar/toolbar';
import SideDrawer from '../side_drawer/side_drawer';
import classes from './layout.module.css';
interface Props {
}
interface State{
    showMenu:boolean
}
class Layout extends Component<Props,State>{
    state = {
        showMenu:false
    }
    render(){
        return <Fragment>
        <Toolbar onMenuClick={this.menuToggleHandler}/>
        <SideDrawer show={this.state.showMenu} onBackClick={this.menuToggleHandler}/>
        <main className={classes.mainContent}>
            {this.props.children}
        </main>
    </Fragment>;
    }

    menuToggleHandler = ()=>{
        this.setState(state=>({showMenu:!state.showMenu}));
    }
}

export default Layout;