import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,
        required:[true,'user name is required'],
        trim:true,
        minLength:2,
        maxLength:50,
    },
    email:{
        type:String,
        required:[true,'User Emailis Required'],
        unique:true,
        trim:true,
        lowercase:true,
        match:[/\S+@\S+\.\S+/,'Please provide a valid email'],
    },
    password:{
        type:String,
        required:[true,'User Password is Required'],
        minLength:6,
        select:false,
    },
},{
    timestamps:true,
});

const User = mongoose.model('User',userSchema);
export default User;

//{name:'test',email:'sample@email.com',password:'123456'}