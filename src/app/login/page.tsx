"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";





export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
       
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            alert('Login successful!');
            router.push("/profile");
        } catch (error:any) {
            console.log("Login failed", error.message);
            alert("Login failed! Incorrect Email or Password");
            toast.error(error.message);
        } finally{
        setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);

    return (
    // <div className="flex flex-col items-center justify-center min-h-screen py-2">
    //     <h1>{loading ? "Processing" : "Login"}</h1>
    //     <hr />
        
    //     <label htmlFor="email">email</label>
    //     <input 
    //     className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
    //         id="email"
    //         type="text"
    //         value={user.email}
    //         onChange={(e) => setUser({...user, email: e.target.value})}
    //         placeholder="email"
    //         />
    //     <label htmlFor="password">password</label>
    //     <input 
    //     className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
    //         id="password"
    //         type="password"
    //         value={user.password}
    //         onChange={(e) => setUser({...user, password: e.target.value})}
    //         placeholder="password"
    //         />
    //         <button
    //         onClick={onLogin}
    //         className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login here</button>
    //         <Link href="/signup">Visit Signup page</Link>
    //     </div>
        // sdfghjjlk
        <div className="flex justify-center  roboto items-center h-screen bg-gray-300">

  <div className="max-w-md w-full m-4 p-6 md:p-8 bg-gradient-to-r from-blue-900 to-purple-900 shadow-xl  rounded-lg">

  <h1 className="text-2xl font-semibold text-center text-blue-300  mb-4">Welcome to AMR Construction</h1>
    <h2 className="text-white font-bold text-center text-2xl mb-6">Login</h2>

    <form className="space-y-4">
     
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
        <input
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="mt-1 p-3 w-full border text-gray-800 border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-400 dark:focus:ring-blue-300"
          placeholder="Email"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
        <input
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="mt-1 p-3 w-full border text-gray-800 border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-400 dark:focus:ring-blue-300"
          placeholder="Password"
        />
      </div>
      <button
        onClick={onLogin}
        disabled={buttonDisabled || loading}
        className={`py-3 px-6 w-full bg-blue-500 text-white rounded-md focus:outline-none ${buttonDisabled || loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}>
        {loading ? "Processing..." : "Login"}
      </button>
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">Dont have an account? <Link href="/signup" className="text-blue-500 hover:text-blue-600">Signup here</Link></p>
    </form>

  </div>

</div>
    )

}