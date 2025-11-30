import React,{useEffect,useState} from 'react'
import axios from "axios" //this hells to getch data from the backend
import Loader from '../Loader/Loader'
import {Link, useNavigate, useParams } from 'react-router-dom'
import { GrLanguage } from 'react-icons/gr';
import { RiHeartAdd2Fill } from "react-icons/ri";
import { TbShoppingCartHeart } from "react-icons/tb";
import { useSelector } from 'react-redux';
import { FaUserEdit, FaStar, FaRegStar, FaShieldAlt, FaShippingFast, FaMoneyBillWave, FaCheckCircle } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import OrderSidebar from '../OrderSidebar/OrderSidebar';
import BookCard from "../BookCard/BookCard";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ViewDataDetails = () => {
   const {id} =  useParams()
   const navigate = useNavigate()

   const [Data, setData] = useState()
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   const [toastMessage, setToastMessage] = useState("");
   const [quantity, setQuantity] = useState(1)
   const [relatedBooks, setRelatedBooks] = useState([])
   const [relatedLoading, setRelatedLoading] = useState(false)
   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
   const role = useSelector((state) => state.auth.role)
  //  console.log(isLoggedIn, role)
   useEffect(() => { 
     const fetch = async() => {
       try {
         setRelatedLoading(true)
         const response =  await axios.get(`${BACKEND_URL}/api/v1/get-book-by-id/${id}`)
         const book = response.data.data
         setData(book)

         try {
           const params = new URLSearchParams()
           if (book?.category && book.category !== "All") {
             params.append("category", book.category)
           }
           const query = params.toString()
           const url = query
             ? `${BACKEND_URL}/api/v1/get-all-books?${query}`
             : `${BACKEND_URL}/api/v1/get-all-books`

           const relatedResponse = await axios.get(url)
           let list = relatedResponse.data.data || []
           list = list.filter((item) => item._id !== book._id)
           setRelatedBooks(list)
         } catch (error) {
           console.log(error)
           setRelatedBooks([])
         }
       } catch (error) {
         console.log(error)
         setData(undefined)
         setRelatedBooks([])
       } finally {
         setRelatedLoading(false)
       }
      }
      fetch()
     } , [id]) 

     const headers = {
      id: localStorage.getItem("id"),
      authorization : `Bearer ${localStorage.getItem("token")}`,
      bookid: id,
    
    }
     const showToast = (message) => {
       setToastMessage(message);
       setTimeout(() => setToastMessage(""), 3000);
     }
     const handleFavourite = async() => {
       try {
         await axios.put(`${BACKEND_URL}/api/v1/add-book-to-favourite` , {}, {headers})
         const message = 'Added to your favourite';
         showToast(message)
       } catch (error) {
         console.log(error)
       }
     }
     const handleCart = async () => {
      if (!isLoggedIn) {
        alert("Please log in to add items to cart");
        navigate('/Login');
        return;
      }
	   try {
	     const response = await axios.put(`${BACKEND_URL}/api/v1/add-to-cart` , {}, {headers})
	     const message = response.data?.message || 'Added to cart';
	     showToast(message)
	   } catch (error) {
	     console.log(error)
	   }
	 }
	 
	 const handleOrderNow = async () => {
	   if (!isLoggedIn) {
	     alert("Please log in to place an order");
	     navigate('/Login');
	     return;
	   }
	   if (!Data) return;
	   try {
	     const checkoutData = {
	       cart: [Data],
	       total: Data.price || 0,
	     };
	     localStorage.setItem('checkoutCart', JSON.stringify(checkoutData));
	   } catch (error) {
	     console.log(error);
	   }
	   navigate('/checkout/address');
	 };
  
  const deleteBook = async () => {
  const response =  await axios.delete (`${BACKEND_URL}/api/v1/delete-book` , {headers})
  alert(response.data.message)
  navigate("/all-books")
  }
  const renderRatingStars = (rating) => {
    const value = typeof rating === "number" ? rating : 0
    const filled = Math.round(value)
    return (
      <div className='flex items-center gap-1'>
        {Array.from({ length: 5 }).map((_, index) =>
          index < filled ? (
            <FaStar key={index} className='text-yellow-400 text-base' />
          ) : (
            <FaRegStar key={index} className='text-yellow-400 text-base' />
          )
        )}
        <span className='ml-2 text-sm text-zinc-600 dark:text-zinc-300'>
          {value > 0 ? value.toFixed(1) : 'No ratings yet'}
        </span>
      </div>
    );
  }
  return (
   <> 
   {Data && (
     <div className='min-h-screen bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 px-4 md:px-12 py-10 relative'>
       <div className='max-w-6xl mx-auto'>
         <div className='flex flex-col lg:flex-row gap-10 items-start'>
          <div className='w-full lg:w-1/2 bg-white dark:bg-zinc-800 rounded-lg p-6 flex flex-col items-center justify-center shadow-sm lg:sticky lg:top-4'>
            <img 
              src={Data.url}
              alt='/' 
              className='h-[40vh] md:h-[55vh] lg:h-[60vh] object-contain rounded'
            />

             {isLoggedIn === true && role === "admin" && (
               <div className='mt-6 w-full flex flex-col sm:flex-row gap-4 justify-center'>
                 <Link
                   to={`/updateBook/${id}`}
                   className='flex-1 text-white rounded-full text-lg md:text-xl py-3 px-4 bg-zinc-700 transform transition-transform duration-300 hover:scale-105 flex items-center justify-center'
                 >
                   <FaUserEdit className='mr-2' /> <span>Edit Book</span>
                 </Link>
                 <button
                   className='flex-1 text-red-500 rounded-full text-lg md:text-xl py-3 px-4 bg-zinc-900 border border-red-500 transform transition-transform duration-300 hover:scale-105 flex items-center justify-center'
                   onClick={deleteBook}
                 >
                   <MdOutlineDeleteOutline className='mr-2' /> <span>Delete Book</span>
                 </button>
               </div>
             )}
           </div>

           <div className='w-full lg:w-1/2 p-4'>
             <h1 className='text-3xl md:text-4xl text-zinc-900 dark:text-zinc-50 font-semibold'>{Data.title}</h1>
             <p className='text-zinc-700 dark:text-zinc-400 mt-2 text-lg'>by {Data.author}</p>
             <p className='text-zinc-700 dark:text-zinc-400 mt-6 leading-relaxed text-base md:text-lg'>{Data.desc}</p>
             <p className='flex mt-4 items-center justify-start text-zinc-700 dark:text-zinc-400 text-lg'>
               <GrLanguage className='me-3' />{Data.language}
             </p>
             <p className='mt-6 text-zinc-900 dark:text-zinc-100 text-3xl font-semibold'>
              Price : ₹ {Data.price}/{" "}
            </p>

            <div className='mt-4 flex flex-col gap-3'>
              {renderRatingStars(Data.rating)}
              <div className='flex flex-wrap items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400'>
                <div className='flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200/70 dark:bg-zinc-800/80'>
                   <FaShippingFast className='text-green-500' />
                   <span>Delivery in 3-5 days</span>
                 </div>
                 <div className='flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200/70 dark:bg-zinc-800/80'>
                   <FaMoneyBillWave className='text-yellow-500' />
                   <span>Cash on Delivery available</span>
                 </div>
              </div>
            </div>

            <div className='mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm'>
               <div className='flex items-center gap-2 px-3 py-2 rounded-lg bg-white/80 dark:bg-zinc-800 shadow-sm'>
                 <FaShieldAlt className='text-green-500' />
                 <span>100% Secure payment</span>
               </div>
               <div className='flex items-center gap-2 px-3 py-2 rounded-lg bg-white/80 dark:bg-zinc-800 shadow-sm'>
                 <FaCheckCircle className='text-emerald-500' />
                 <span>Quality checked</span>
               </div>
               <div className='flex items-center gap-2 px-3 py-2 rounded-lg bg-white/80 dark:bg-zinc-800 shadow-sm'>
                 <FaShippingFast className='text-blue-500' />
                 <span>Fast delivery</span>
               </div>
               <div className='flex items-center gap-2 px-3 py-2 rounded-lg bg-white/80 dark:bg-zinc-800 shadow-sm'>
                 <FaMoneyBillWave className='text-yellow-500' />
                 <span>COD available</span>
              </div>
            </div>

            <div className='mt-8'>
              <p className='text-sm font-medium text-zinc-800 dark:text-zinc-200 mb-2'>
                Quantity
              </p>
              <div className='inline-flex items-center border border-zinc-300 dark:border-zinc-700 rounded-md overflow-hidden bg-white dark:bg-zinc-900 shadow-sm'>
                <button
                  type='button'
                  className='px-3 py-1.5 text-lg font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                >
                  -
                </button>
                <input
                  type='number'
                  min={1}
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10)
                    if (Number.isNaN(val) || val < 1) {
                      setQuantity(1)
                    } else {
                      setQuantity(val)
                    }
                  }}
                  className='w-14 text-center text-sm font-medium bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none'
                />
                <button
                  type='button'
                  className='px-3 py-1.5 text-lg font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>

              {isLoggedIn && (
                <div className='mt-5 flex flex-col gap-3'>
                  <button
                    onClick={handleCart}
                    className='w-full px-8 py-3 border border-yellow-500 text-yellow-500 bg-transparent hover:bg-yellow-500 hover:text-black font-semibold rounded-lg transition-all duration-200 transform hover:scale-105'
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={handleOrderNow}
                    className='w-full px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg'
                  >
                    Buy Now
                  </button>
                </div>
              )}

              {!isLoggedIn && (
                <div className='mt-4 text-sm text-zinc-500 dark:text-zinc-400'>
                  Login to add this book to your cart and place an order.
                </div>
              )}
            </div>
          </div>
        </div>

         <section className='mt-12'>
           <h2 className='text-xl md:text-2xl font-semibold text-zinc-900 dark:text-zinc-50'>
             Happy Readers
           </h2>
           <div className='mt-4 bg-white dark:bg-zinc-800 rounded-lg px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm'>
             <div className='flex -space-x-3'>
               <div className='h-10 w-10 rounded-full bg-pink-500 border-2 border-zinc-100 dark:border-zinc-900 flex items-center justify-center text-xs font-semibold text-white'>
                 AR
               </div>
               <div className='h-10 w-10 rounded-full bg-blue-500 border-2 border-zinc-100 dark:border-zinc-900 flex items-center justify-center text-xs font-semibold text-white'>
                 MS
               </div>
               <div className='h-10 w-10 rounded-full bg-emerald-500 border-2 border-zinc-100 dark:border-zinc-900 flex items-center justify-center text-xs font-semibold text-white'>
                 VK
               </div>
               <div className='h-10 w-10 rounded-full bg-zinc-700 border-2 border-zinc-100 dark:border-zinc-900 flex items-center justify-center text-[10px] font-semibold text-white'>
                 +99
               </div>
             </div>
             <div className='text-sm text-zinc-700 dark:text-zinc-300 text-center md:text-left'>
               <p className='font-medium'>
                 Thousands of readers are loving books like "{Data.title}".
               </p>
               <p className='text-xs mt-1'>
                 Join our community of happy readers and grow your personal library.
               </p>
             </div>
           </div>
         </section>

         <section className='mt-10'>
           <h2 className='text-xl md:text-2xl font-semibold text-zinc-900 dark:text-zinc-50'>
             Customer Reviews
           </h2>
           <div className='mt-4 bg-white dark:bg-zinc-800 rounded-lg p-5 shadow-sm'>
             <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
               <div>
                 <p className='text-sm text-zinc-500 dark:text-zinc-400'>
                   Overall Rating
                 </p>
                 <div className='mt-1'>
                   {renderRatingStars(Data.rating)}
                 </div>
               </div>
             </div>
             <div className='mt-4 border-t border-zinc-200 dark:border-zinc-700 pt-4 text-sm text-zinc-600 dark:text-zinc-400'>
               No written reviews yet. Once readers share their experience, reviews
               for this book will appear here.
             </div>
           </div>
         </section>

         <section className='mt-10 mb-12'>
           <div className='flex items-center justify-between gap-4 mb-4'>
             <h2 className='text-xl md:text-2xl font-semibold text-zinc-900 dark:text-zinc-50'>
               You May Also Like
             </h2>
             {Data.category && (
               <span className='text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400'>
                 Based on category: {Data.category}
               </span>
             )}
           </div>
           {relatedLoading && (
             <div className='flex items-center justify-center py-6'>
               <Loader />
             </div>
           )}
           {!relatedLoading && relatedBooks.length === 0 && (
             <p className='text-sm text-zinc-600 dark:text-zinc-400'>
               No related books found right now. Explore more titles in the All Books
               section.
             </p>
           )}
           {!relatedLoading && relatedBooks.length > 0 && (
             <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6'>
               {relatedBooks.slice(0, 6).map((book) => (
                 <BookCard key={book._id} data={book} />
               ))}
             </div>
           )}
         </section>

         <OrderSidebar 
           isOpen={isSidebarOpen}
           onClose={() => setIsSidebarOpen(false)}
           product={Data}
         />
       </div>
     </div>
   )}

   {toastMessage && (
     <div className='fixed top-20 right-6 bg-green-600 text-white text-sm px-4 py-2 rounded shadow-lg z-50'>
       {toastMessage}
     </div>
   )}

   {!Data && (
     <div className='h-screen bg-zinc-900 flex items-center justify-center '>
       <Loader />
     </div>
   )}
   </>
 )
}

export default ViewDataDetails