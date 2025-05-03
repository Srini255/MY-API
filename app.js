import express from 'express';

import cookieParser from 'cookie-parser';

import {PORT} from './config/config.js'
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscriptions.routes.js';
import connectToDatabase from './Database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';


const app=express();


app.use(express.json()); //handle json data
app.use(express.urlencoded({extended:true})); //handle form data send via html forms
app.use(cookieParser()); //handle cookies

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/subscriptions',subscriptionRouter);
app.use(errorMiddleware);

app.get('/',(req,res)=>{
    res.send('welcome to the subscription tracker api');
});

app.listen(PORT,async()=>{
    console.log(`server running on http://localhost:${PORT}`);

    await connectToDatabase();
});

export default app;