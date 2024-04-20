"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";


export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true); 
            
            const response = await axios.post("/api/users/signup", user);
            alert('Account created successfully! Now (Go to login)');
            router.push("/login");
            console.log("Signup success", response.data);
           

        } catch (error: any) {
            console.log("Signup failed", error.message);
            alert("Signup failed ");
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <>

<div className="flex justify-center roboto items-center h-screen bg-gray-300">

  <div className="max-w-md w-full m-4 p-6 md:p-8 bg-gradient-to-r from-blue-900 to-purple-900 shadow-xl  shadow-lg rounded-lg"style={{ boxShadow: '-10px -5px 50px 50px rgba(0, 0, 0, 0.20)' }}>

    <h1 className="text-2xl font-semibold text-center text-blue-300 mb-4">Welcome to AMR Construction</h1>
    <h2 className="text-white font-bold text-center  text-2xl mb-6">Signup</h2>

    <form className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
        <input
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className="mt-1 p-3 w-full border text-gray-800 border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-400 dark:focus:ring-blue-300"
          placeholder="Username"
        />
      </div>
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
        onClick={onSignup}
        disabled={buttonDisabled || loading}
        className={`py-3 px-6 w-full bg-blue-500 text-white rounded-md focus:outline-none ${buttonDisabled || loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}>
        {loading ? "Processing..." : "Signup"}
      </button>
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">Already have an account? <Link href="/login" className="text-blue-500 hover:text-blue-600">Login here</Link></p>
    </form>

  </div>

</div>


        </>
    )

}


