import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AuthEvent } from '../../store/auth/auth_event';
import { StoreState } from '../../store/store';
interface HandlerProps{
    logout:()=>void
}
interface Props extends Partial<HandlerProps>{}
class Logout extends Component<Props>{
    componentDidMount(){
        this.props.logout && this.props.logout();
    }
    render(){
        return <Redirect to="/"/>
    }
}
const mapDispatchToProps = (dispatch:ThunkDispatch<StoreState,{},AnyAction>):HandlerProps=>{
    return {
        logout:()=>dispatch(AuthEvent.logOut())
    }
}
export default connect(null,mapDispatchToProps)(Logout);