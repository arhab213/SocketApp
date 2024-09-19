import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Route,Routes} from 'react-router-dom'
import RouteProtection from './services/RouteProtection'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Chat from './pages/Chat/Chat'

function App() {
let AcessibleRoute = [{'element':<Register/>,'path':'/register'},{'element':<Login/>,'path':"/login"}]
let ProtectedRoute =[{'element':<Chat/>,'path':'chart'}]
  return (
    <>
  {/* returning the Acessible route  */}

  {
    AcessibleRoute.map((e)=>{
      let {element,path}=e
      return <Route element={element} path={path}/>
    })
  }
    {/* returning the protected route  */}
  {
    ProtectedRoute.map((e)=>{
      let{element,path}=e
     return <Route element={element} path={path}/>
    })
  }
    </>
  )
}

export default App
