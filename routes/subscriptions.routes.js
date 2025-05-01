import {Router} from "express";

const subscriptionRouter=Router();


subscriptionRouter.get('/',(req,res)=>res.send({title:'Get all subscriptions'}));

subscriptionRouter.get('/:id',(req,res)=>res.send({title:'Get particular subscription'}));

subscriptionRouter.post('/',(req,res)=>res.send({title:'Create subscription'}));

subscriptionRouter.put('/:id',(req,res)=>res.send({title:'Update subscription'}));

subscriptionRouter.delete('/:id',(req,res)=>res.send({title:'Delete subscription'}));

subscriptionRouter.get('/user/:id',(req,res)=>res.send({title:'get all user subscriptions'}));

subscriptionRouter.put('/:id/cancel',(req,res)=>res.send({title:'Cancel subscription'}));

subscriptionRouter.get('/upcomingrenewals',(req,res)=>res.send({title:'Get all upcoming renewals'}));

export default subscriptionRouter;