import { IMail } from '../IMail';
import * as nodemailer from 'nodemailer';

export class MailProvider implements IMail{
    private transporter;

    constructor(){
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
              user: process.env.MAIL_AUTH_USER,
              pass: process.env.MAIL_AUTH_PASS,
            },
        });
    }   

    sendEmail(from : string, to : string, subject : string , html : string):Promise<void>{
        return  this.transporter.sendMail({
            from, 
            to, 
            subject, 
            html
        });
    }
}