"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";
import "@/styleSheets/globalTailwind.css"
import "@/styleSheets/signup.css"


export default function SignupPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    })
    
    const [buttonDisabled,setButtonDisabled] = React.useState(false);
    const [loading,setLoading] = React.useState(false);

    const onSignup = async () => {
        try{
            setLoading(true);
            const response = await axios.post("/api/users/signup",user);//envia como body el user.
            
            console.log("Signup success",response.data);
            router.push('/login');//te envia a la pagina /login
        }
        catch (error: any){
            console.log("Signup failes", error. message);
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
        
    }

    useEffect(() => {
        if(user.password.length>0 && user.email.length>0 && user.username.length>0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    }, [user]);

    return(
        <div className="main-container-signup">
            <h1 className="main-title">{loading ? 'Processing...' : 'Signup'}</h1>
            <hr />
            <label htmlFor="username">Username</label>
            <input className="input" 
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="username"
                />

            <label htmlFor="email">Email Address</label>
            <input className="input" 
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="email"
                />

            <label htmlFor="password">Password</label>
            <input className="input" 
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"
                />
            <div className="buttom-container">
                <button onClick={onSignup} className="buttom buttom-signup">
                            {buttonDisabled ? 'No Signup here' : 'Signup here'}</button>
                
                <Link href="/login" className="extra-buttoms-signup">Visit login page</Link>
                <Link href="/forgotpassword" className="extra-buttoms-signup">Forgot password</Link>
            </div>
        </div>
    )
}