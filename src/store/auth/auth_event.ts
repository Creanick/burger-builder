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
function onLogin(data:IAuthData,expiresIn:number,dispatch:Dispatch<AuthEventType>){
    localStorage.setItem("token",data.token);
    localStorage.setItem("userId",data.userId);
    const expirationDate = new Date(new Date().getTime()+expiresIn * 1000);
    localStorage.setItem("expirationDate",expirationDate.toISOString());
    setAutoLogout(expirationDate,dispatch);
}
function onLogOut(){
    localStorage.clear();
}
function setAutoLogout(expirationDate:Date,dispatch:Dispatch<AuthEventType>){
    if(expirationDate <= new Date()){
        dispatch(AuthEvent.logOut());
    }else{
        const expirationTime = expirationDate.getTime() - new Date().getTime();
                setTimeout(()=>{
                    dispatch(AuthEvent.logOut());
                },expirationTime)
    }
}
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
    static tryAutoLogIn():ThunkAction<Promise<void>,{},{},any>{
        return async (dispatch:Dispatch<AuthEventType>)=>{
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");
            if(!token || !userId){
                dispatch(AuthEvent.logOut());
                
            }else{
                dispatch(AuthEvent.success({
                    token:token,
                    userId: userId,
                }));
                //set auto log out
                const expirationDate = new Date(localStorage.getItem("expirationDate") as string);
                setAutoLogout(expirationDate,dispatch);
            }
            }
    }
    static logOut():IAuthLogoutEvent{
        onLogOut();
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
                const payload:{idToken:string,localId:string,expiresIn:string} = res.data;
                const authData = {
                    token: payload.idToken,
                    userId: payload.localId,
                }
                onLogin(authData,Number.parseInt(payload.expiresIn),dispatch);
                dispatch(AuthEvent.success(authData));
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