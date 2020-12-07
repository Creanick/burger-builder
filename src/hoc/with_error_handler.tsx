import { AxiosInstance} from 'axios';
import React, { Component, Fragment } from 'react';
import Modal from '../components/modal/modal';

const withErrorHandler = <T extends Object>(C:React.ComponentType<T>,axios:AxiosInstance)=>{
    return class extends Component<T,{error?:string}>{
        public req:number;
        public res:number;
        state = {
            error: undefined
        }
        constructor(props:T){
            super(props);
            this.req = axios.interceptors.request.use(req=>{
                this.setState({error:undefined});
                return req;
            });
            this.res = axios.interceptors.response.use(res=>res,error=>{
                this.setState({error:error?.message ?? "Some Wrong"});
                return Promise.reject(error);
            });
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.req);
            axios.interceptors.response.eject(this.res);
        }
        errorCloseHandler = ()=>this.setState({error:undefined});
        render(){
            return (
                <Fragment>
                    <Modal show={!!this.state.error} onBackClick={this.errorCloseHandler}>
                        <p style={{textAlign:"center",color:"red"}}>{this.state.error}</p>
                    </Modal>
                    <C {...this.props as T}/>
                </Fragment>
            );
        }
    }
}

export default withErrorHandler;