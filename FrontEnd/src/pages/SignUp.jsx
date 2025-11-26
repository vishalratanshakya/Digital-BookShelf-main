import React , {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"

const SignUp = () => {
  const [Values,setValues] = useState({username:"",
     email: "",
      password: "",
       address: "",})

const navigate = useNavigate()       
       const change = (e) => {
        const {name, value} = e.target
        setValues({ ...Values, [name]: value})
       }
       const submit = async ()=> {
          try {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

              if(Values.username === "" || Values.email === "" ||Values.password === "" || Values.address === "" ){
                alert("All Feilds Are Required To Be Filled!")
              } else if(!emailRegex.test(Values.email)){
                alert("Please enter a valid email address")
              } else if(!passwordRegex.test(Values.password)){
                alert("Password must be at least 8 characters, with one capital letter, lowercase letters and a special character")
              } else{
                const response = await axios.post("http://localhost:1000/api/v1/sign-up" ,Values)// this is the thing that is sending data to the backend
                alert(response.data.message)
                navigate("/Login")
              }
          }
          catch (error){
            alert(error.response.data.message)
          }
       }
  return (
    <div className='h-auto min-h-screen bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 px-12 py-8 flex items-center justify-center'>
      <div className='bg-white dark:bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6 shadow-md dark:shadow-none'>
        <p className='text-zinc-900 dark:text-zinc-200 text-xl'>Sign Up</p>
        <div className='mt-4'>
          <div>
            <label htmlFor="" className='text-zinc-400'>Username</label>
            <input 
              type="text" 
              className='w-full mt-2 bg-white border border-zinc-300 text-zinc-900 p-2 outline-none dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100' 
              placeholder='Username...'
              name='username' 
              
              required
              value={Values.username}
              onChange={change}
            />
          </div>
            <div className='mt-4'>
            <label htmlFor="" className='text-zinc-400'>Email</label>
            <input 
              type="text" 
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' 
              placeholder='xyz@email.com...'
              name='email' 
             
              required 
              value={Values.email}
              onChange={change}
            />
          </div>
          <div className='mt-4'>
            <label htmlFor="" className='text-zinc-400'>Password</label>
            <input 
              type="password" 
              className='w-full mt-2 bg-white border border-zinc-300 text-zinc-900 p-2 outline-none dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100' 
              placeholder='Password...'
              name='password' 
             
              required 
              value={Values.password}
              onChange={change}
            />
          </div>
          <div className='mt-4'>
            <label htmlFor="" className='text-zinc-400'>Address</label>
            <textarea 
              type="text" 
              className='w-full mt-2 bg-white border border-zinc-300 text-zinc-900 p-2 outline-none dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100' 
              rows="5"
              placeholder='Address...'
              name='address' 
              
              required 
              value={Values.address}
              onChange={change}
            />
          </div>
          <div className='mt-4'>
            <button className='w-full bg-blue-500 text-white font-semibold py-2 hover:bg-white hover:text-zinc-800 transition-all duration-300' onClick={submit} >
              Sign Up

            </button>

          </div>
          <p className='flex mt-4 items-center justify-center text-zinc-200 font-semibold'>
            Or </p>
            <p className='flex mt-4 items-center justify-center text-zinc-500 font-semibold'>
            Already have an Account? &nbsp;     

<Link to = "/login" className='hover:text-blue-500'>
<u>LogIn</u>
</Link>
</p>  
        </div>
      </div>
    </div>
  );
}

export default SignUp;
