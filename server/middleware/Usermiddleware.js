import dotenv from 'dotenv'
import JWT from 'jsonwebtoken'
import Usermodel from '../Models/User.js'
dotenv.config()
export const CheckIfRegistred =async(res,req,next)=>{
  let {headers}=req
  let {token}=headers
  const ClearToken = JWT.verify(token,process.env.TOKEN_KEY)
  const FindUser = await Usermodel.findOne({_id:ClearToken})
  if(!FindUser){
    return res.json({"message":"error:20"}).status(404)
  }
 return next()
}