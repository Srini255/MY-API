import aj from '../config/arcjet.js';

const arcjetMiddleware = async(req, res, next) => {
    try{
        const decision = await aj.protect(req,{requested:1});
        if (decision.isDenied()){
            if(decision.reason.isRateLimit()){
                res.status(429).send({message:"Rate limit exceeded. Please try again later."});
            }else if(decision.reason.isBot()){
                res.status(403).send({message:"Bot access denied."});
            }else{
                res.status(403).send({message:"Access denied."});
            }
        }
        next();
    }catch(err){
        console.log(`Arcjet Middleware Error: ${err}`);
        next(err);
    }
}

export default arcjetMiddleware;