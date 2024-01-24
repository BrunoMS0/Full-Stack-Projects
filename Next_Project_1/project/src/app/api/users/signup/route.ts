import {connect} from "@/dbConfig/dbConfig.js"
import User from "@/model/userModel.js"
import {NextRequest, NextResponse} from "next/server"
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer"; 

connect();


export async function POST(request: NextRequest){//funcion que se ejecuta por ser una solicitud HTTP post de axios
    try{
        const reqBody = await request.json();
        /*Este request recibe el body que seria el username, password y email.
         Lo recibe del servidor del cliente*/

        const {username,email,password} = reqBody;
        console.log('reqBody is:');
        console.log(reqBody);
        
        //check if user already exists
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({error: "User already exist"}, {status: 400});
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const newUser = new User({//create a new user in the SCHEMA
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();//save the new user in DB
        console.log('SavedUser is:');
        console.log(savedUser);

        //send veification email
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id});
        //esto lo que hace es llamar a la funcion sendEmail() para ejecutar acciones en Emailtrap 


        return NextResponse.json({
            message : "User created succesfully",
            success: true,
            savedUser
        })
    }
    catch (error: any){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}