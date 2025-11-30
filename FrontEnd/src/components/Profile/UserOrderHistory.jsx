import React, { useEffect , useState} from 'react'
import axios from "axios"
import Loader from "../Loader/Loader"
import { Link, useNavigate } from 'react-router-dom' 
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const UserOrderHistory = () => {
  const  [OrderHistory, setOrderHistory] = useState()
  const navigate = useNavigate()
  
  useEffect(() => {
    const fetch = async () => {
      try {
        const headers = {
          id: localStorage.getItem("id"),
          authorization : `Bearer ${localStorage.getItem("token")}`,
        }
        
        const response = await axios.get(`${BACKEND_URL}/api/v1/get-order-history`, 
          {headers})
        setOrderHistory(response.data.data)
      } catch (error) {
        console.error("Error fetching order history:", error)
        // Set empty array to show "No order history" message
        setOrderHistory([])
      }
    }
    fetch()
  },[])

	const headers = {
	  id: localStorage.getItem("id"),
	  authorization : `Bearer ${localStorage.getItem("token")}`,
	}

	const canCancel = (status) => {
	  return (
	    status === "Order Placed" ||
	    status === "Processing" ||
	    status === "ORDER_PLACED" ||
	    status === "PROCESSING"
	  );
	};

	const handleCancel = async (orderId, status) => {
	  if (!canCancel(status)) return;
	  const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
	  if (!confirmCancel) return;
	  try {
	    await axios.delete(`${BACKEND_URL}/api/v1/delete-order/${orderId}`, { headers });
	    setOrderHistory((prev) =>
	      prev.map((o) =>
	        o._id === orderId
	          ? { ...o, status: "Canceled" }
	          : o
	      )
	    );
	  } catch (error) {
	    console.error("Error cancelling order:", error);
	    alert(error.response?.data?.message || "Failed to cancel order. Please try again.");
	  }
	};
  return (
    <>
    {!OrderHistory && <div className='flex items-center justify-center h-[100%]'> <Loader /> </div>}
    {OrderHistory && OrderHistory.length === 0 && (
      <div className='h-[80vh] p-4 text-zinc-100'>
        <div className='h-[100%] flex flex-col items-center justify-center' >
          <h1 className='text-5xl font-semibold text-red-500 mb-8'>
            No order History!
          </h1>
          <img src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png" alt="" className='h-[20vh] mb-8'/>
        </div>
      </div>
    )}

    {OrderHistory && OrderHistory.length > 0 && (
      <div className='h-[100%] p-0 md:p-4 text-zinc-100   '>
        <h1 className='text-3xl md:text-5xl font-semibold  text-zinc-500 mb-8'>
          Your Order History...
        </h1>

        <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4  flex gap-4 mb-2 '>
        <div className='w-[3%] '>
        <h1 className='text-center'> Sr. </h1>
        </div>

        <div className='w-[22%] '>
        <h1 className=''> Books </h1>   
        </div>


        <div className='w-[45%]'>
        <h1 className=''> Description </h1>   
        </div>


        <div className='w-[9%]'>
        <h1 className=''> Price </h1>   
        </div>


        <div className='w-[16%]'>
        <h1 className=''> Status </h1>   
        </div>

        <div className='w-none md:w-[5%] hidden md:block'>
        <h1 className=''> Mode </h1>   
        </div>

        <div className='w-[14%] hidden md:block'>
        <h1 className=''> Actions </h1>
        </div>
        </div>

        {OrderHistory.map((items, i) => {
          // Skip orders with null or undefined books
          if (!items || !items.book) {
            return null;
          }
          
          return (
          <div key={i} className='bg-zinc-800 mb-2 w-full rounded py-2 px-4 flex gap-4  hover:scale-[105%] transition-transform hover:bg-zinc-900 hover:cursor-pointer'>
            <div className='w-[3%]'>
        <h1 className='text-center'> {i+1} </h1>
        </div>

        <div className='w-[22%]'>
        <Link to={`/view-book-details/${items.book._id}`}   
        className='hover:text-blue-300'
        >
          {items.book.title || 'Book Unavailable'}
        </Link>
        </div>


        <div className='w-[45%]'>
        <h1 className=''> {items.book.desc ? items.book.desc.slice(0, 50) + '...' : 'No description'} </h1>   
        </div>


        <div className='w-[9%]'>
        <h1 className=''> ₹ {items.book.price || 0} /- </h1>   
        </div>


        <div className='w-[16%]'>
        <h1 className='font-semibold text-green-500'>
          {items.status === "Order Placed" || items.status === "ORDER_PLACED" ?(
            <div className='text-yellow-500'> {items.status}</div>
          ): items.status === "Canceled" || items.status === "CANCELED" ? (
            <div className='text-red-500' > {items.status} </div>
          ): (
            items.status
          )
        }  </h1>   
        </div>

        <div className='w-none md:w-[5%] hidden md:block'>
        <h1 className='text-sm text-zinc-400 font-semibold'>COD </h1>   
        </div>

        <div className='w-[14%] hidden md:flex flex-col gap-1 items-end'>
          <button
            onClick={() => navigate(`/checkout/track/${items._id}`)}
            className='text-xs px-3 py-1 rounded-full bg-zinc-100 text-zinc-900 hover:bg-yellow-300'
          >
            Track
          </button>
          {canCancel(items.status) && (
            <button
              onClick={() => handleCancel(items._id, items.status)}
              className='text-xs px-3 py-1 rounded-full bg-red-500/80 text-white hover:bg-red-500'
            >
              Cancel
            </button>
          )}
        </div>
          </div>
          )
        })}


  </div>
    )}















    </>
  )
}

export default UserOrderHistory