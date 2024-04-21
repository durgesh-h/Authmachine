"use client";
import axios from "axios";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import second from '../favicon.ico'
import Image from "next/image";

export default function ProfilePage() {
    const router = useRouter()
    const [userId, setuserId] = useState("UserId")
    const [username, setusername] = useState("Username")
    const [email, setemail] = useState("Email")
    
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }
    useEffect(() => {
        // Function to be called automatically
        // Call your function here
        usrname();
    }, []); 
    const usrname = async ()=>{

        const res = await axios.get('/api/users/me')
        setusername(res.data.data.username)
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setuserId(res.data.data._id)  
        setemail(res.data.data.email)
    }

    return (
<div className="min-h-screen roboto bg-gray-300  bg-gradient-to-r from-blue-900 to-purple-900  flex flex-col justify-center items-center">
    <div className="  bg-gradient-to-r from-blue-700 to-purple-700 shadow-xl  rounded-md p-8 mb-8 max-w-lg m-6" >
        <div className="flex justify-center items-center mb-12">
            <Image src={second} alt="Profile" className="w-24 h-24 rounded-full" />
        </div>
        <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white">{username}</h1>
            <p className="text-gray-500">@{username}</p>
        </div>
        <div className="grid grid-cols-1  gap-10">
            <div className="bg-gray-200 rounded-md p-4">
                <p className="text-gray-800 font-semibold">User ID</p>
                <p className="text-gray-600">{userId}</p>
            </div>
            <div className="bg-gray-200 rounded-md p-4">
                <p className="text-gray-800 font-semibold">Email</p>
                <p className="text-gray-600">{email}</p>
            </div>
        </div>
        <p className="text-gray-300 text-center mt-8">To check details, click on the <span className="text-blue-400 underline hover:text-blue-300 cursor-pointer" onClick={getUserDetails}>GetUserDetails.</span> </p>
        <div className="flex flex-col mt-10 justify-center md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <button
            onClick={logout}
            className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
        >
            Logout
        </button>
        
    </div>
    <p className="text-center mt-10 text-sm text-gray-800 dark:text-gray-900">Developed by <Link href="#" className="text-gray-900 hover:text-gray-800"> Durgesh Prasad</Link></p>

    </div>
   
</div>


    )
}