import {connect} from "@/dbConfig/dbConfig.js"
import { NextRequest, NextResponse } from "next/server"
import User from "@/model/userModel.js"
import { sendEmail } from "@/helpers/mailer";

//verification if user exist and nodemailer requests
connect();

export async function POST(request: NextRequest) {
    try{

        const reqBody = await request.json();
        //the request.json() must to receive an object
        const {email} = reqBody;
        console.log("inside sendEmail");
        console.log("email is: " + email);

        //check if user exists with the email
        
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400});
        }

        //send email
        
        await sendEmail({email, emailType: "RESET", userId: user._id});
        
        return NextResponse.json(
            {
                message: "Email sent succesfully",
                success: true,
                email: email
            }
        );

    }
    catch (error: any){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}