import React, {useState}from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import {authActions} from "../store/auth"
import { useDispatch } from "react-redux"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const LogIn = () => {
  const [Values,setValues] = useState({username:"",
    
     password: "",
      })

const navigate = useNavigate()  
 const dispatch = useDispatch()     
      const change = (e) => {
       const {name, value} = e.target
       setValues({ ...Values, [name]: value})
      }
      const submit = async ()=> {
         try {
             if(Values.username === "" || Values.password === "" ){
               alert("All Feilds Are Required To Be Filled!")
             } else{
               const response = await axios.post(`${BACKEND_URL}/api/v1/sign-in`
                 ,Values)// this is the thing that is sending data to the backend
               
                 dispatch(authActions.login())
                dispatch(authActions.changeRole(response.data.role))
                 localStorage.setItem("id", response.data.id)
                 localStorage.setItem("token", response.data.token)
                 localStorage.setItem("role", response.data.role)
                navigate("/profile")
              //  navigate("/LogIn")
             }
         }
         catch (error){
           if (error.response && error.response.data && error.response.data.message) {
             alert(error.response.data.message)
           } else {
             alert("Unable to connect to server. Please make sure backend is running on http://localhost:1000")
           }
         }
      }
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 px-12 py-20 flex flex-col items-center justify-center h-[600px]"> {/* Adjust the height here */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg px-8 py-8 w-full md:w-3/6 lg:w-2/6 h-[400px] shadow-md dark:shadow-none"> {/* Adjust the height here */}
        <p className="text-zinc-900 dark:text-zinc-200 text-xl">Log In</p>
        <div className="mt-4">
          <div>
            <label htmlFor="username" className="text-zinc-400">Username</label>
            <input 
              type="text" 
              className="w-full mt-2 bg-white border border-zinc-300 text-zinc-900 p-2 outline-none dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100" 
              placeholder="Username..." 
              name="username" 
              required 
              value = {Values.username}
              onChange={change}
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="text-zinc-400">Password</label>
          <input 
            type="password" 
            className="w-full mt-2 bg-white border border-zinc-300 text-zinc-900 p-2 outline-none dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100" 
            placeholder="Password..." 
            name="password" 
            required 
            value = {Values.password}
              onChange={change}
          />
        </div>
        <div className="mt-5">
          <button className="w-full bg-blue-500 text-white font-semibold py-2 hover:bg-white hover:text-zinc-800 transition-all duration-300" onClick={submit}>
            Log In
          </button>
        </div>
        <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
          Or
        </p>
        <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
          Don't have an account? &nbsp;     
          <Link to="/SignUp" className="hover:text-blue-500">
            <u>Signup</u>
          </Link>
        </p>
      </div>
      <footer className="mt-4 text-center text-zinc-500">
        © 2024 Digital BookShelf
      </footer>
    </div>
  );
}

export default LogIn;