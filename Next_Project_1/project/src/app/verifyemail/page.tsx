"use client"

import axios from "axios";
import Link from "next/link";
import React,{useEffect,useState} from "react";

export default function VerifyEmailPage(){

    const [token,setToken] = useState("");
    const [verified,setverified] = useState(false);
    const [error,seterror] = useState(false);

    const verifyUserEmail = async () => {
        try{
            const res = await axios.post("/api/users/verifyemail",{token});
            /*este {token} pertenece al estado token que se establecio con el split de url del useEffect
            y se le envia como propiedad a la solicitud post*/
            console.log("res is:");
            console.log(res);
            setverified(true);
        }catch(err:any){
            seterror(true);
            console.log(err.response.data); 
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split('=')[1];
        setToken(urlToken || "");
        /*Primero se viene aca y splitea el token para settearlo.
        Esta url se obtiene cuando se le da click al url del Mailtrap 
        para verificar el token*/
    },[]);
    /*Cuando proporcionas un array vacío como dependencia ([]), el efecto se ejecutará solo una vez, 
    justo después de que el componente se monte.
    Esto es útil para tareas que deben realizarse al inicializar el componente y 
    no dependen de cambios en las propiedades o el estado. */


    useEffect(() => {
        if(token.length > 0){
            verifyUserEmail();
            //Luego si cumple la verificacion entonces ejecuta la funcion asincrona
        }
    },[token]);
    /*el segundo argumento del useEffect, [token], significa que el efecto se ejecutará 
    cada vez que el valor de token cambie. En este caso, el efecto estará atento a cambios 
    específicos en la variable token. */


    return(
        <div className="flex flex-col items-center justify-center
                        min-h-screen py-2">
            <h1 className="text-4xl">Verify email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>
            <hr />

            {verified && (
                <div>
                    <h2 className="text-2xl">Email verified</h2>
                    <Link href="/login">Login</Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                </div>
            )}
        </div>
    )
}