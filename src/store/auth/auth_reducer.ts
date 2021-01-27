import { Reducer } from "redux";
import {AuthEventType, AUTH_FAILED, AUTH_LOGOUT, AUTH_START, AUTH_SUCCESS, IAuthFailedEvent, IAuthLogoutEvent, IAuthStartEvent, IAuthSuccessEvent } from "./auth_event";
import { AuthState } from "./auth_state";

const initialState:AuthState = {
    loading: false,
}
export class AuthReducer{
    static start(state:AuthState,event:IAuthStartEvent):AuthState{
        return {
            ...state,
            errorMessage:undefined,
            loading: true,
        };
    }
    static success(state:AuthState,event:IAuthSuccessEvent):AuthState{
        return{
            ...state,
            loading: false,
            errorMessage:undefined,
            token: event.data.token,
            userId: event.data.userId
        }
    }
    static failed(state:AuthState,event:IAuthFailedEvent):AuthState{
        return {
            ...state,
            loading: false,
            errorMessage: event.data.message
        }
    }
    static logOut(state:AuthState,event:IAuthLogoutEvent):AuthState{
        return {...initialState};
    }
}
const authReducer:Reducer<AuthState,AuthEventType> = 
    (state=initialState,event:AuthEventType)=>{
        switch (event.type) {
            case AUTH_START:
                return AuthReducer.start(state,event);
            case AUTH_SUCCESS:
                return AuthReducer.success(state,event);
            case AUTH_FAILED:
                return AuthReducer.failed(state,event);
            case AUTH_LOGOUT:
                return AuthReducer.logOut(state,event);
            default:
                return state;
        }
    }
export default authReducer;