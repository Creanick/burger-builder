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
        <Toolbar onMenuClick={this.menuOpenHandler}/>
        <SideDrawer show={this.state.showMenu} onBackClick={this.menuCloseHandler}/>
        <main className={classes.mainContent}>
            {this.props.children}
        </main>
    </Fragment>;
    }
    menuCloseHandler = ()=>{
        this.setState({showMenu: false});
    }
    menuOpenHandler = ()=>{
        this.setState({showMenu: true});
    }
}

export default Layout;