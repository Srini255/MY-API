import Subscription from "../models/subscription.model.js";


export const createSubscription = async (req, res,next) => { 
    try{
        const subscription = await Subscription.create({
            ...req.body,
            user:req.user._id,
        })
        res.status(201).send({succes:true,data:subscription});
        next();
    }catch(err){
        console.log(`Error in createSubscription: ${err}`);
        next(err);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try{
        if(req.user.id!==req.params.id){
            const err=new Error('You are not authorized to access this resource');
            err.status=401;
            throw err;
        }
        const subscriptions = await Subscription.find({user:req.params.id});    
        res.status(200).json({success:true,data:subscriptions});    
        next();
    }catch(err){
        console.log(`Error in getAllSubscriptions: ${err}`);
        next(err);
    }
}

export const getAllSubscriptions = async (req, res, next) => {
    try{
        const subscriptions =await Subscription.find({});
        res.status(200).json({success:true,data:subscriptions});
    }catch(err){
        console.log(`Error in getAllSubscriptions: ${err}`);
        next(err);
    }   
}

export const getUserSubscriptionAdmin = async (req, res, next) => {
    try{
       
        const subscriptions = await Subscription.find({user:req.params.id});
        res.status(200).json({success:true,data:subscriptions});    
        next();
    }catch(err){
        console.log(`Error in getUserSubscriptionAdmin: ${err}`);
        next(err);
    }
}