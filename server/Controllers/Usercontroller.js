import Usermodel from '../Models/User.js'
import JWT from "jsonwebtoken"
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()
export const register=async(req,res)=>{
    try {
        let{body}=req
        let check =  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/
        const FindIfExist = await Usermodel.findOne({"email":body.email})
        if(FindIfExist){
          return res.json({"message":"error 17"})
        }
        if(!body.password.match(check)){
          return res.json({"message":"error 10"})
        }
        const AddingUser = await Usermodel.create(body)
     
        if(!AddingUser){
          return res.json()
        }
      return res.json()
        
    } catch (error) {
        console.log(error)
    }

}
export const Login =async(req,res)=>{
  try {
   let{body}=req
   let{email,password}=body
   const FindIfExist = await Usermodel.findOne({"email":email})
   if(!FindIfExist){
    return res.json({"message":"error:15"})
   }
   const ComparingPassword = bcrypt.compare(FindIfExist.password,password)
   if(!ComparingPassword){
    return res.json({"message":"error:19"})
   }
 if(FindIfExist.HaveBeenAcessed){
  return res.json({"message":"redirect 1"})
 }

   // need to convert the id into string to create the token 
 const payload ={"payload": (FindIfExist._id).toString()}
 //when you use the expirsIn attribute you must transform the payload into an object 
 const token = JWT.sign(payload,process.env.TOKEN_KEY,{"expiresIn":'2d'})
   // after login we return a token 
   return res.status(200).json({"message":"sucess","data":{'token':token,'name':FindIfExist.name}})
  } catch (error) {
    let TokenError = {"JsonWebTokenError":"error 13","TokenExpiredError":"error 14"}
    for(let elem in TokenError){
      if(elem === error.name)    console.log(error)
    }
    console.log(error)
  }
}
export const Update =async(req,res)=>{
try {
  let {body,headers}=req
  let {name,password,email,AcessExpired}=body
  let ClearToken
// if(AcessExpired){
//   ClearToken = JWT.verify((headers.token).toString(),process.env.REFRESH_TOKEN_KEY)
// }else{
  ClearToken = JWT.verify((headers.token).toString(),process.env.TOKEN_KEY)
  console.log(ClearToken)
// }
let check =/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/
  let check2 =/(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
  if(!name || !check2.test(email) || ! password.match(check)){
    return res.json({"messasge":"error 16"})
  }
  const UpdateUser = await Usermodel.findOneAndUpdate({"_id":ClearToken.payload},{"name":name,"email":email,"password":password},{"new":true})
  if(!UpdateUser){
    return res.status(404).json({"message":"error 18"})
  }
  return res.status(200).json({"message":"sucess"})
} catch (error) {
//   let {email}=body
//   if(error.name=="TokenExpiredError"){
//   const UpdatingUser =await Usermodel.findOneAndUpdate({"email":email},{$set:{"AcessExpired":true}},{"new":"true"})
//  return res.status(404).json({'message':"error 14"})
//   }
  console.log(error);
}
}
// export const RegenerateAcessToken =async(req,res)=>{
//   try {
//      let{body}=req
//      let{email,password}=body
//      const user = await Usermodel.findOne({"email":email})
//      if(!user){
//       return res.status(404).json({"message":"error 15"})
//      }
//      const VerifyingPassword = await bcrypt.compare(password,user.password)
//      if(!VerifyingPassword){
//       return res.status(404).json({"message":"error 19"})
//      }
//      const payload = {payload:(user._id).toString()}
//      const NewToken= JWT.sign(payload,process.env.REFRESH_TOKEN_KEY,{"expiresIn":"1y"})
//      return res.status(200).json({"tokenRefreshed":NewToken})
//   } catch (error) {
//     console.log(error)
//   }
// }
