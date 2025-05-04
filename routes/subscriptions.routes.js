import {Router} from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription,getUserSubscriptions,getAllSubscriptions, getUserSubscriptionAdmin } from "../controllers/subscription.controller.js";
const subscriptionRouter=Router();


subscriptionRouter.get('/',getAllSubscriptions);

subscriptionRouter.get('/:id',getUserSubscriptionAdmin);

subscriptionRouter.post('/',authorize,createSubscription);

subscriptionRouter.put('/:id',(req,res)=>res.send({title:'Update subscription'}));

subscriptionRouter.delete('/:id',(req,res)=>res.send({title:'Delete subscription'}));

subscriptionRouter.get('/user/:id',authorize,getUserSubscriptions);

subscriptionRouter.put('/:id/cancel',(req,res)=>res.send({title:'Cancel subscription'}));

subscriptionRouter.get('/upcomingrenewals',(req,res)=>res.send({title:'Get all upcoming renewals'}));

export default subscriptionRouter;