export interface AuthState{
    loading: boolean,
    token?:string,
    userId?:string,
    errorMessage?:string
}