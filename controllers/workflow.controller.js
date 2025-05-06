import dayjs from 'dayjs';
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express')
import Subscription from '../models/subscription.model.js';

const REMINDERS =[7,5,2,1]

export const sendReminders =serve(async(context)=>{
    const {subscriptionId}=context.requestPayload;

    const subscription = await fetchSubscription(context,subscriptionId);
    
    if(!subscription || subscription.status != "active") return;

    const renewalDate = dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())){
        console.log(`Renewal date has passed for subscription ${subscriptionId}`); 
        return; 
    }
    for(const daysBefore of REMINDERS){
        const reminderDate =renewalDate.subtract(daysBefore,'day');

        if(reminderDate.isAfter(dayjs())){
            
            await sleepUntilReminder(context,`Remainder ${daysBefore} daysbefore`,reminderDate);
        }

        await triggerReminder(context,`Remainder ${daysBefore} daysbefore`);
    }
});


const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', async () => {
        const sub = await Subscription.findById(subscriptionId).populate('user', 'name email');
        return sub?.toObject(); // ✅ Safely return plain object
    });
};


const sleepUntilReminder = async(context,label,date)=>{
    console.log(`Sleeping until ${label} reminder at ${date}`);

    await context.sleepUntil(label,date.toDate());
}

const triggerReminder =async(context,label)=>{
    await context.run(label,()=>{
        console.log(`Triggering ${label} reminder`);
        //send email ssm pushnotification etc
    })
}