"use client"
import { useRouter } from "next/navigation";

export default function newPasswordDone(){
    const router = useRouter();
    return(
        <div className="flex flex-col items-center justify-center
        min-h-screen py-2">
            <h1 className="p-4">Your password has been reset</h1>
            <button onClick={() => router.push("/login")} className="p-2 border border-gray-300 
                    rounded-lg mb-4 focus:outline-none">Login</button>
        </div>
    );
}