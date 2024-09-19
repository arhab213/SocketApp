import express from 'express'
import cors from "cors"
import BodyParser from "body-parser"
import http from 'http'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Userroute from './Routes/Userroutes.js'
dotenv.config()
const DataBaseUrl = process.env.LOCAL_DB
const App =express()
http.createServer(App)
App.use(cors({"origine":"*"}))
App.use(BodyParser.json())

mongoose.connect(DataBaseUrl).then(()=>{
    console.log("the data base is connected")
}).catch((error)=>{
console.log(`the connection to data base faild due to : ${error.message}`)
})
let RoutesData =[{'path':'user','element':Userroute}]
RoutesData.map((e)=>{
let{path,element}=e
return App.use(`/${path}/`,element)
})
const PORT = process.env.PORT || 5000
App.listen(PORT,()=>{
console.log(`the server is connected to the port ${PORT}`)
})
