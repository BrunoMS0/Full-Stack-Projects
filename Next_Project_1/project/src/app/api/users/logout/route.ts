import { NextResponse } from "next/server";


export async function GET(){
    try{
        const response = NextResponse.json({
            message: "Logout succesful",
            success: true
        })
        
        response.cookies.set("token", "",
         {httpOnly: true, expires: new Date(0)});//the token is empty and the date is updated 
        
         return response;
    }
    catch (error: any){
       return NextResponse.json({ error: error.message }, { status: 500});
    }
}