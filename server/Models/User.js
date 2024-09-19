import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
 const usermodel = mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:30
    },
    email:{
        type:String,
        minlength:5,
        maxlength:200,
        required:true,
        unique:true
    },
    password:{
        type:String,
        minlength:3,
        maxlength:1024,
    },
    AcessExpired:{
        type:Boolean,
        default:false
    }
    ,JoinedAt:{
        type:Date,
        default:Date.now
    }
})
usermodel.pre('save',async function(next){
try {
    const salt = await bcrypt.genSalt(8)
    const HashedPassword = await bcrypt.hash(this.password,salt)
    this.password=HashedPassword
    next()
} catch (error) {
    next(error)
}

})
export default mongoose.model("Usermodel",usermodel)
