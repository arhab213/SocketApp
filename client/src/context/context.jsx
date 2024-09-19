import { createContext,useCallback,useContext, useState } from "react";
import User from "../../../server/Models/User";


let Context = createContext(null)
export const Contexts =()=> useContext(Context)
export default function ContextProvider(props) {
let {children}=props
// Handeling Changes function in login and register 
let [UserInfoLogin,SetUserInfoLogin]= useState({"email":"","password":""})
let [UserRegisterInfo,SetUserRegisterInfo]=useState({"name":"","email":"","password":""})
//registration error state
let [RegsiterError,SetRegisterError]= useState("")
//Registration loading state
let [RegistrationLoading,SetRegistrationLoading]=useState(false)
// setting  the post response of register page in variable 
let [RegisterPostResponse,SetRegisterPostResponse]=useState({})
// setting  the post response of login page in variable 
let [LoginPostResponse,SetLoginPostResponse]=useState({})
// variable for setting user item 
let [UserForItem,SetUserForItem]=useState({})
// the two functions that handel the Info variables for post requests 
const HandleChangeRegister =useCallback((info)=>{
    SetUserRegisterInfo(info)
},[])
const HandleChangeLogin = useCallback((info)=>{
SetUserInfoLogin(info)
},[])
//the function that handle the alert error timeou on register 
function HandleRegError (){
    if(RegsiterError){
        setTimeout(() => {
            SetRegisterError(null)
        }, 3000);
    }
}
// function allows us to set user in item of localstorage 
function SetUserAsItem(){
    if(LoginPostResponse.message = "sucess"){
        LoginPostResponse.data.email = UserInfoLogin.email
        SetUserForItem(LoginPostResponse.data)
        localStorage.setItem('user',JSON.stringify(UserForItem))
        console.log(localStorage.User);
    }
}
// functions 
let func = {HandleChangeRegister,HandleChangeLogin,
    HandleRegError,SetUserAsItem}
// variables 
let variables ={UserRegisterInfo,UserInfoLogin,
    RegsiterError,SetRegisterError,RegistrationLoading,
    SetRegistrationLoading,RegisterPostResponse,SetRegisterPostResponse,
    LoginPostResponse,SetLoginPostResponse,
    UserForItem,SetUserForItem}
let elements ={...func,...variables}
return <Context.Provider value={elements}>{children}</Context.Provider>
}

