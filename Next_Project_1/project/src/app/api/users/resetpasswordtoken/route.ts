import { NextRequest, NextResponse} from "next/server";
import {connect} from "@/dbConfig/dbConfig.js"
import User from "@/model/userModel.js"

connect();

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json();
        //the request.json() must to receive an object
        const {token} = reqBody;
        console.log("token for password is " + token);
        const user = await User.findOne({passwordResetToken: token,
            passwordResetTokenExpiry: {$gt: Date.now()}});

        if(!user){
            return NextResponse.json({error: "Invalid token"},
             {status: 400});
        }
        console.log(user);

        return NextResponse.json(
            {message: "Password reset succesfully",
            success: true}
        );
    

    }
    catch (error: any){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}