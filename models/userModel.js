import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{type:String,unique:true},
    password:{type:String},
    email:{type:String,unique:true}
},{timestamps:true})

const userModel = mongoose.models.User || mongoose.model("User",userSchema);

export default userModel;