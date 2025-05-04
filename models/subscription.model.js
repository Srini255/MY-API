import mongoose from "mongoose";


const subscriptionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Subscription name is required'],
        trim:true,
        minLength:2,
        maxLength:100,
    },
    price:{
        type:Number,
        required:[true,'Subscription price is required'],
        min:[0,'Subscription price must be greater than or equal to 0'],
    },
    currency:{
        type:String,
        required:[true,'Subscription currency is required'],
        enum:['USD','EUR','GBP','INR'],
        default:'INR',
        },
    frequency:{
        type:String,
        required:[true,'Subscription frequency is required'],
        enum:['daily','weekly','monthly','yearly'],
    },
    category:{
        type:String,
        required:[true,'Subscription category is required'],
        enum:['Entertainment','food','utilities','transportation','healthcare','other'],
    },
    paymentMethod:{
        type:String,
        required:[true,'Subscription payment method is required'],
        trim:true,
    },
    status:{
        type:String,
        enum:['active','cancelled','expired'],
        default:'active',
    },
    startDate:{
        type:Date,
        required:[true,'Subscription start date is required'],
        validate:{
            validator:(value)=>{
                return value<=new Date();
            },
            message:'Start date must be less than or equal to current date',
        }
    },
    renewalDate:{
        type:Date,
        // required:true,
        validate:{
            validator:function(value){
                return value> this.startDate;
            },
            message:'Renewal date must be greater than start date',
        }
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'Subscription user is required'],
        index:true,
    },
},
{timestamps:true});

subscriptionSchema.pre('save',function(next){
    if(!this.renewalDate){
        const renewalPeriods={
            daily:1,
            weekly:7,
            monthly:30,
            yearly:365,
        }
        
        this.renewalDate=new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate()+renewalPeriods[this.frequency]);
        console.log(this.renewalDate);
    }
    if(this.renewalDate<new Date()){
        this.status='expired';
    }
    next();
});

const Subscription = mongoose.model('Subscription',subscriptionSchema);
export default Subscription;