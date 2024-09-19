import express from 'express'
// don't forget to add this function : RegenerateAcessToken
import { register ,Login,Update} from '../Controllers/Usercontroller.js'
// import { CheckIfRegistred } from '../middleware/Usermiddleware.js'
const Userroute = express.Router()
Userroute.post('/register',register)
Userroute.post('/login',Login)
Userroute.post('/update',Update)
// Userroute.post('/regenerate-acess-token',RegenerateAcessToken)
export default Userroute