import {mongoose} from 'mongoose';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import {JWT_SECRET,JWT_EXPIRES_IN} from '../config/config.js';

//req body is the data sent by the client to the server
export const signUp = async (req, res,next) => {
    const session=await mongoose.startSession();
    session.startTransaction();
    try{
        //create a new user 
        const {name,email,password}=req.body;

        //check if user already exists
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User already exists',
            });
        }
        //hash the password
        const salt=await bcrypt.genSalt(10);

        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser = await User.create([{
            name,
            email,
            password:hashedPassword,
        }],{session});

        const token=jwt.sign({userId:newUser[0]._id},JWT_SECRET,{
            expiresIn:JWT_EXPIRES_IN,
        });

        await session.commitTransaction();
        session.endSession();
        res.status(201).json({
            success:true,
            message:'User created successfully',
            data:newUser[0],
            token,
        });
    }catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const signIn = async (req, res,next) => {
    try{
        const {email,password}=req.body;

        //check if user exists
        const user=await User.findOne({email});
        if(!user){
          const error=new Error('User not found');
          error.statusCode=404;
          throw error;
        }
        // console.log(user);
        if (!password || !user.password) {
            return res.status(400).json({ error: "Missing password or hash" });
          }
        //check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            const error=new Error('Invalid credentials');
            error.statusCode=401;
            throw error;
        }

        //create a token
        const token=jwt.sign({userId:user._id},JWT_SECRET,{
            expiresIn:JWT_EXPIRES_IN,
        });

        res.status(200).json({
            success:true,
            message:'User logged in successfully',
            data:{token,user},
        });
    }catch(error){
        next(error);
    }   
}

export const signOut = async (req, res,next) => {
    try{
        res.cookie('token','none',{
            expires:new Date(Date.now()),
            httpOnly:true,
        });
        res.status(200).json({
            success:true,
            message:'User logged out successfully',
        });
    }catch(error){
        next(error);
    }

}