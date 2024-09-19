import { useEffect } from "react";
import {useNavigate } from "react-router-dom";

function RouteProtection(props) {
let {children,redirect}=props
let navigation = useNavigate()
useEffect(()=>{
if(!window.localStorage.token) return navigation(redirect)
},[])
return children
}

export default RouteProtection