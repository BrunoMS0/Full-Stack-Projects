"use client"
import React, {useEffect} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function resetPassword(){
    const router = useRouter();

    const [token,setToken] = React.useState("");

    const [newPassword,setNewPassword] = React.useState(
        {
            password: "",
            confirmPassword: ""
        }
    );

    const sendPasswords = async () => {   
        try{
            const body = {...newPassword,token: token};
            
            const response = await axios.post("/api/users/resetpassword",body);
            
            console.log(response.data);
            toast.success(response.data);
            router.push("/newpassworddone");
        }
        catch (error: any){
            console.log(error.message);
            toast.error(error.message);
        }
    }
    
    const verifyTokenPassword = async () => {
        try{
            const res = await axios.post("/api/users/resetpasswordtoken",{token});
            console.log("res is:");
            console.log(res);
        }catch(err:any){
            console.log(err.response.data); 
        }
    }

    useEffect(() => {
        const url = window.location.search.split('=')[1]
        setToken(url || "");
    },[])

    useEffect(() => {
        if(token.length > 0)verifyTokenPassword();
    },[newPassword]);


    console.log(newPassword.password);
    console.log(newPassword.confirmPassword);

    return(
        <div className="flex flex-col items-center justify-center
        min-h-screen py-2">
            <label htmlFor="password">New password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 
                            focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={newPassword.password}
                onChange={(e) => setNewPassword({...newPassword,password: e.target.value})}
                placeholder="new password"
            ></input>

            <label htmlFor="confirmPassword">Confirm password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 
                            focus:outline-none focus:border-gray-600 text-black"
                id="confirmPassword"
                type="password"
                value={newPassword.confirmPassword}
                onChange={(e) => setNewPassword({...newPassword,confirmPassword: e.target.value})}
                placeholder="confirm password"
            ></input>

            <button onClick={sendPasswords} className="p-2 border border-gray-300 
                    rounded-lg mb-4 focus:outline-none">Submit</button>
        </div>
    )
}