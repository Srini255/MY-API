import dayjs from 'dayjs';
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express')
import Subscription from '../models/subscription.model.js';
import { sendReminderEmail } from '../utils/send-email.js';

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
        const today = dayjs();
        if(reminderDate.isAfter(today)){
            
            await sleepUntilReminder(context,`Reminder ${daysBefore} days before`,reminderDate);
            // await triggerReminder(context,`${daysBefore} days before reminder`,subscription);
        }
        if (reminderDate.isSame(today, 'day')) {
            await triggerReminder(context, `${daysBefore} days before reminder`, subscription);
        }
        
    }
});


const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', async () => {
        const sub = await Subscription.findById(subscriptionId).populate('user', 'name email');
        return sub?.toObject(); // ✅ Safely return plain object
    });
};


const sleepUntilReminder = async(context,label,date)=>{
    const dayOnly = date.startOf('day');

    await context.sleepUntil(label,dayOnly.toDate());
}

const triggerReminder =async(context,label,subscription)=>{
    await context.run(label,async()=>{
        console.log(`Triggering ${label} reminder`);
        //send email ssm pushnotification etc

        await sendReminderEmail({
            to:subscription.user.email,
            type:label,
            subscription,
        })
    })
}