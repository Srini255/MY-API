import nodemailer from  'nodemailer';
import { EMAIL_PASSWORD } from './config.js';

export const AccountEmail='worksrini255@gmail.com';

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:AccountEmail,
        pass:EMAIL_PASSWORD,
    }
})


export default transporter;

