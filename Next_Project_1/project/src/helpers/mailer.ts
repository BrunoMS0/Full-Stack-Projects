import nodemailer from  'nodemailer';
import User from "@/model/userModel"
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({email, emailType, userId}:any) => {//also you can rewrite this like: export async function sendEmail({});
    //It is extracting the "email", "emailType", and "userId" properties from the object passed as an argument.
    try{
        //create a hash token with the id of the user
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        //We are not 100% sure that the 'userId' is String bc we can get from the DB as json

        if(emailType === "VERIFY"){//that is if you want to verify the email
            await User.findByIdAndUpdate(userId,//is the ID which you will be looking for haunting the record in the database
            {verifyToken: hashedToken,
            verifyTokenExpiry: Date.now() + 3600000});
        } else if(emailType === "RESET"){// that is if you forgot your password
            await User.findByIdAndUpdate(userId,
            {forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: Date.now() + 3600000});
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "de4862c9fd35c0",
                pass: "9412637cbbdf05"
            }
        })

        const typeReq = emailType === "VERIFY" ? "verifyemail" : "resetpassword";
        
        const mailOptions = {
            from: 'buomosu26@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email"
             : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/${typeReq}?token=${hashedToken}">here </a>to
            ${emailType === "VERIFY" ? "Verify your email"
            : "Reset your password"}
            or copy and paste the link below your browser.
            <br>${process.env.DOMAIN}/${typeReq}?token=${hashedToken}
            </p>`
        }
        
        const mailresponse = await transporter.sendMail(mailOptions);
        return mailresponse;
    }
    catch(error:any){
        throw new Error(error.message);
    }
}