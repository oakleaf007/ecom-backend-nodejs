
import { BrevoClient } from "@getbrevo/brevo";

import "dotenv/config";


const client = new BrevoClient({
    apiKey:  process.env.BREVO_API
})
export const sendEmail = async (toEmail, subject, textContent, htmlContent = null)=>{
  console.log(process.env.BREVO_API)
    try{
    



        const result = await client.transactionalEmails.sendTransacEmail({
            subject: subject,
            textContent:textContent,
            htmlContent:htmlContent,
            sender:{
                 name: process.env.SENDER_NAME,
            email: process.env.SENDER_EMAIL
            },
            to:[{email:toEmail}]
        })
       

        console.log(`email send to ${toEmail}`);
        return result ;
    }catch(error){
        console.error("Failed to send email");
      
        if(error.response && error.response.body){
            console.error(error.response.body);
        }else{
            console.error(error);
        }
          throw new Error("failed to send otp")
    }
}

