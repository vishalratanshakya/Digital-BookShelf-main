import React,{useEffect, useState} from 'react'
import Loader from '../components/Loader/Loader'
import axios from 'axios'
import { TbHttpDelete } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
 const Navigate = useNavigate() 
 const [Cart, setCart] = useState()
 const [Total, setTotal] = useState(0)
 const headers = {
  id: localStorage.getItem("id"),
  authorization : `Bearer ${localStorage.getItem("token")}`,
}
 useEffect(() => {
  const fetch = async () => {
    const res = await axios.get("http://localhost:1000/api/v1/get-user-cart",
      {headers}
    )
    setCart(res.data.data)
  }
  fetch()
 }, [Cart]) 
 const deleteItems = async (bookid) => {
const response  = await axios.put(
  `http://localhost:1000/api/v1/remove-from-cart/${bookid}`, {},{headers})
  alert(response.data.message)
 }
//  Total order price
 useEffect(() => {
  if(Cart && Cart.length > 0 ){
    let total = 0;
    Cart.map((items) => {
      total += items.price
    })
    setTotal(total)
    total = 0
  }
 }, [Cart])

 const goToCheckout = () => {
  if (!Cart || Cart.length === 0) return;
  const checkoutData = {
    cart: Cart,
    total: Total,
  };
  try {
    localStorage.setItem("checkoutCart", JSON.stringify(checkoutData));
  } catch (error) {
    console.log(error);
  }
  Navigate("/checkout/address");
 }
return (
  <div className='min-h-screen bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 px-12 py-8'>
  {!Cart &&
  <div className='w-full  flex items-center justify-center'> <Loader /> </div>}

{Cart && Cart.length === 0 && (
  <div className='h-full'>
    <div className='h-full flex items-center justify-center flex-col'>
      <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400 mt-12'>
        Empty Cart!
      </h1>
      <img src="./empty-cart.png" alt="empty cart" className=" lg:h-[50vh] mt-12" />
    </div>
  </div>
)}
{Cart && Cart.length > 0 && (
  <>
  <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>
    Your Cart
  </h1>
  
  {Cart.map((items,i )=> (
    <div
	      className='w-full my-4 pr-2 rounded flex flex-col md:flex-row bg-white dark:bg-zinc-800 items-center md:items-stretch shadow-sm'
	      key={i}
	    >
      <img
        src={items.url}
        alt="/"
        className='transition-all transition:300 hover:scale-[111%] hover:rounded-2xl h-[20vh] md:h-[25vh] object-cover'
      />
	      <div className='w-full md:flex-1 px-6 py-4'>
	        <h1 className='text-3xl text-zinc-900 dark:text-zinc-100 font-semibold text-left mt-2 md:mt-0 px-[8%]'>
          {items.title}
        </h1>
	        <p className='text-normal pr-2 text-zinc-700 dark:text-zinc-300 px-9 mt-9 hidden lg:block '>
          {items.desc.slice(0, 100)}...
        </p>
	        <p className='text-normal text-zinc-700 dark:text-zinc-300 pr-2  mt-2 hidden md:block lg:hidden '>
          {items.desc.slice(0, 60)}...
        </p>
	        <p className='text-normal text-zinc-700 dark:text-zinc-300 pr-2 mt-2 block md:hidden'>
          {items.desc.slice(0, 100)}...
        </p>
      </div>
	      <div className='mt-4 md:mt-0 ml-auto flex items-center justify-end gap-6 px-4 py-4 w-full md:w-auto'>
	        <h2 className='flex items-center text-zinc-900 dark:text-zinc-100 text-2xl md:text-3xl font-semibold'>
          <span className='mr-2'>₹</span>
          {items.price}/-
        </h2>

        <button
          className='bg-red-100 text-3xl text-red-700 border border-red-700 rounded p-2 mr-2 hover:scale-110 transition-transform'
          onClick={() => deleteItems(items._id)}
        >
          <TbHttpDelete />
        </button>
      </div>
    </div>
  ))}
  </>
)}
  {Cart && Cart.length> 0 && (
    <div className='mt-10 w-full  flex items-center justify-end'>
      <div className='p-4 bg-white dark:bg-zinc-800 rounded shadow-sm'>
        <h1 className='text-3xl text-zinc-900 dark:text-zinc-200 font-semibold'>
          Total Amount
        </h1>
        <div className='mt-3 flex items-center  justify-between text-xl text-zinc-900 dark:text-zinc-200'>
          <h2>{Cart.length} Books </h2> <h2> ₹  {Total} /- </h2>
        </div>

      <div className='w-[100%] mt-3'>
        <button
          className='bg-zinc-100 text-zinc-900 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-200'
          onClick={goToCheckout}
        >
          Continue to Checkout
        </button>
      </div>
      </div>
       </div>
  )}
  </div>
  )
  
}

export default Cart
