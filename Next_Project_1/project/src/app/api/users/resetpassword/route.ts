import { NextRequest, NextResponse } from "next/server";
import {connect} from "@/dbConfig/dbConfig.js"
import User from "@/model/userModel";
import bcryptjs from "bcryptjs"

connect();

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json();
        const {password,confirmPassword,token} = reqBody;
        console.log(password);
        console.log(confirmPassword);
        console.log(token);
        
        const user = await User.findOne({forgotPasswordToken: token, 
            forgotPasswordTokenExpiry: {$gt: Date.now()}});
        console.log(user);

        if(!user){
            return NextResponse.json({error: "Invalid token"},
             {status: 400});
        }
        
        if(password !== confirmPassword){
            return NextResponse.json({error: "Passwords do not match"}, {status: 400});
        }
        

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        //change the password
        user.password = hashedPassword;
        console.log('user with new password' + user);

        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();
        
        return NextResponse.json({
            message : "Password changed succesfully",
            success: true,
            user
        });
    }
    catch (error: any){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}