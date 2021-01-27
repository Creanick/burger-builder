import axios from "axios";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILED = "AUTH_FAILED";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export interface IAuthStartEvent{
    type: typeof AUTH_START
}
export interface IAuthData{
    token:string,
    userId:string,
}
export interface IAuthSuccessEvent{
    type: typeof AUTH_SUCCESS,
    data:IAuthData
}
export interface IAuthFailedEvent{
    type: typeof AUTH_FAILED,
    data:{message:string}
}
export interface IAuthLogoutEvent{
    type: typeof AUTH_LOGOUT
}

export type AuthEventType = IAuthStartEvent | IAuthSuccessEvent | IAuthFailedEvent | IAuthLogoutEvent;

export class AuthEvent{
    private static start():IAuthStartEvent{
        return {
            type: AUTH_START,
        }
    }
    private static success(data:IAuthData):IAuthSuccessEvent{
        return {
            type: AUTH_SUCCESS,
            data
        }
    }
    private static failed(data:{message:string}):IAuthFailedEvent{
        return {
            type: AUTH_FAILED,
            data
        }
    }

    static logOut():IAuthLogoutEvent{
        return {
            type: AUTH_LOGOUT
        }
    }
    static signUp(data:{email:string,password:string}):ThunkAction<Promise<void>,{},{},any>{
        const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhB9E4kdekWhXeJqwWW5UAHml_uG_YjTk";
        return this.authenticate(data,url);
    }
    static logIn(data:{email:string,password:string}):ThunkAction<Promise<void>,{},{},any>{
        const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAhB9E4kdekWhXeJqwWW5UAHml_uG_YjTk";
        return this.authenticate(data,url);
    }
    private static authenticate(data:{email:string,password:string},url:string):ThunkAction<Promise<void>,{},{},any>{
        return async(dispatch:Dispatch<AuthEventType>)=>{
            dispatch(AuthEvent.start());
            axios.post(url,{...data,returnSecureToken:true})
            .then(res=>{
                const payload:{idToken:string,localId:string} = res.data;
                dispatch(AuthEvent.success({
                    token: payload.idToken,
                    userId: payload.localId
                }));
            })
            .catch(error=>{
                console.log(error);
                let message = "sign up failed";
                if(error?.response?.data?.error?.message){
                    message = error.response.data.error.message;
                }
                dispatch(AuthEvent.failed({message}));
            })
        }
    }
}