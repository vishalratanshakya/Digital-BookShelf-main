import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import OrderSidebar from '../OrderSidebar/OrderSidebar'
import { FaRegHeart, FaHeart } from "react-icons/fa";

const BookCard = ({data , Favourite, clickable = true}) => { //data here is the book details
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isFavorite, setIsFavorite] = useState(!!Favourite);
  
  const headers = {
    id: localStorage.getItem("id"),
    authorization : `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  }
  
  const handleRemoveBook = async () => {
    try {
      await axios.put(
        "http://localhost:1000/api/v1/remove-book-from-favourite",
        {},
        { headers }
      );
      const message = "Removed from your favourite";
      setToastMessage(message);
      setTimeout(() => setToastMessage(""), 3000);
    } catch (error) {
      console.log(error);
    }
  }

  const handleOrderNow = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      alert("Please log in to place an order");
      window.location.href = '/Login';
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/add-to-cart",
        {},
        { headers }
      );
      const message = response.data?.message || 'Book added to cart';
      setToastMessage(message);
      setTimeout(() => setToastMessage(""), 3000);
    } catch (error) {
      console.log(error);
    }
  }

  const handleToggleFavourite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      alert("Please log in to manage favourites");
      window.location.href = '/Login';
      return;
    }

    try {
      const url = isFavorite
        ? "http://localhost:1000/api/v1/remove-book-from-favourite"
        : "http://localhost:1000/api/v1/add-book-to-favourite";

      await axios.put(url, {}, { headers });

      const message = isFavorite
        ? "Removed from your favourite"
        : "Added to your favourite";

      setIsFavorite(!isFavorite);
      setToastMessage(message);
      setTimeout(() => setToastMessage(""), 3000);
    } catch (error) {
      console.log(error);
    }
  }

  const content = (
    <div className=''>
      <div className='bg-white dark:bg-zinc-900 rounded-lg flex items-center justify-center h-72 w-full relative shadow-sm overflow-hidden'>
        <img
          src={data.url}
          alt="/"
          className='h-full w-full object-contain'
        />

        <button
          type='button'
          onClick={handleToggleFavourite}
          className={`absolute top-2 right-2 h-8 w-8 rounded-full flex items-center justify-center shadow-sm transition-colors ${
            isFavorite
              ? 'bg-red-500 text-white'
              : 'bg-white/90 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-200'
          }`}
        >
          {isFavorite ? (
            <FaHeart className='text-sm' />
          ) : (
            <FaRegHeart className='text-sm' />
          )}
        </button>
      </div>
      <div className='mt-4 h-[3.5rem] flex items-start'>
        <h2 className='text-lg text-zinc-900 dark:text-white font-semibold leading-snug line-clamp-2'>
          {data.title}
        </h2>
      </div>
      <p className='mt-2 text-zinc-600 dark:text-zinc-400 font-semibold'> by {data.author}</p>
      <p className='mt-2 text-zinc-900 dark:text-zinc-200 font-semibold text-xl'>  ₹ {data.price}/-</p>
    </div>
  )

  return( 
    <div className='bg-white dark:bg-zinc-800 rounded-lg p-4 flex flex-col relative shadow-sm'> 
      {clickable ? (
        <Link to = {`/view-book-details/${data._id}`}>
          {content}
        </Link>
      ) : (
        content
      )}

      {Favourite && (
        <button
          className='bg-black-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4 hover:bg-yellow-500 hover:text-white transform hover:scale-105 transition duration-200'
          onClick={handleRemoveBook}
        >
          Remove From Your Favourites
        </button>
      )}

      <button
        className='bg-black-50 px-4 py-2 rounded border border-green-500 text-green-500 mt-4 hover:bg-green-500 hover:text-white transform hover:scale-105 transition duration-200'
        onClick={handleOrderNow}
      >
        Add to Cart
      </button>

      {/* Order Sidebar */}
      <OrderSidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        product={data}
      />
      
      {toastMessage && (
        <div className='fixed top-20 right-6 bg-green-600 text-white text-sm px-4 py-2 rounded shadow-lg z-50'>
          {toastMessage}
        </div>
      )}
    </div>
  )
}

export default BookCard