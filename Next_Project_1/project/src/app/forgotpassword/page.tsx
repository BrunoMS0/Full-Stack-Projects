"use client"
import React,{useEffect} from "react"
import axios from "axios"
import toast from "react-hot-toast"
import Router from "next/router"
import "@/styleSheets/forgotpassword.css"

export default function ForgotPasswordPage(){

    const[user,setUser] = React.useState({email: ""});
    const[passwordDisabled,setPasswordDisabled] = React.useState(true);
    const[buttomClick,setButtomClick] = React.useState(false);
    const[ableEmail,setAbleEmail] = React.useState(false);

    const submitEmail = async () => {
        try{
            const response = await axios.post("/api/users/forgotpassword",user);
            console.log(response.data);
            toast.success(response.data);
            setAbleEmail(true);
        }
        catch (error: any){
            setButtomClick(true);
            console.log(error.message);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if(user.email.length > 0)setPasswordDisabled(false);
        else setPasswordDisabled(true);
    }, [user])


    return(
        <div className="flex flex-col items-center justify-center
        min-h-screen py-2">
            
            <label htmlFor="email" className="p-4">{!ableEmail ? "Enter your e-mail" : 
            "Please verify your email to continue"}</label>
            
            <input
                id="email"
                type="text"
                placeholder="Enter your e-mail"
                className="p-2 border border-gray-300 rounded-lg mb-5 
                focus:outline-none focus:border-gray-600 text-black"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
            ></input>
            {passwordDisabled && buttomClick && <h1 className="error">Please enter a valid email address</h1>}
            <button onClick={submitEmail} className="p-2 border border-gray-300 
                    rounded-lg mb-4 focus:outline-none">Submit</button>

        </div>
    )
}