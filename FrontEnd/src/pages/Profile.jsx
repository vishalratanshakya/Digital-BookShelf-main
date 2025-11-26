import React, { useEffect , useState } from 'react'
import Sidebar from '../components/Profile/Sidebar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from "axios"
import Loader from '../components/Loader/Loader'
import MobileNav from '../components/Profile/MobileNav'

const Profile = () => {
  const [Profile, setProfile] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const headers = {
    id: localStorage.getItem("id"),
    authorization : `Bearer ${localStorage.getItem("token")}`,
  }

  useEffect(() => {
    const fetch = async () => {
      // Check if user is logged in
      const userId = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      
      if (!userId || !token) {
        window.location.href = '/Login';
        return;
      }
      
      try {
        setLoading(true)
        setError("")
        const response = await axios.get("http://localhost:1000/api/v1/get-user-information", { headers })
        setProfile(response.data)
      } catch (error) {
        console.error("Error fetching profile:", error)
        if (error.response?.status === 401) {
          // Session expired
          localStorage.clear();
          window.location.href = '/Login';
        } else {
          setError("Failed to load profile. Please try again.")
        }
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  return (
    <div className='min-h-screen bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-white px-2 md:px-12 flex flex-col md:flex-row py-11 gap-4'>
      {loading && (
        <div className='w-full h-[100%] flex items-center justify-center'>
          <Loader />
        </div>
      )}

      {!loading && error && (
        <div className='w-full h-[100%] flex items-center justify-center'>
          <p className='text-red-400 text-sm'>{error}</p>
        </div>
      )}

      {!loading && !error && Profile && (
        <>
          <div className='w-full md:w-1/6 h-auto lg:h-screen'>
            <Sidebar data={Profile} />
            <MobileNav />
          </div>

          <div className='w-full md:w-5/6'>
            <Outlet />
          </div>
        </>
      )}
    </div>
  )
}

export default Profile