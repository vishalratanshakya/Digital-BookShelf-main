import React, { useState } from 'react'
import {useEffect} from "react"
import axios from "axios"
import BookCard from "../BookCard/BookCard"

const Favourites = () => {
  const [FavouriteBooks, setfavouriteBooks] = useState()
  const headers = {
    id: localStorage.getItem("id"),
    authorization : `Bearer ${localStorage.getItem("token")}`,
  
  }
  useEffect(() =>{
    const fetch = async ()=> {
      const response = await axios.get("http://localhost:1000/api/v1/get-favourite-books",
         {headers}
        )
       setfavouriteBooks(response.data.data)
    }
    fetch()
  } , [FavouriteBooks]) // yaha pe jo FavouriteBooks hai is line me [particularly] remove kkra hai books ko favpurites me se agar yeh yaha ni likha higa tab remove wala button pe click kroge toh remove hoga pr dikhega tab jn refresh kroge
  return (
    <>
    { FavouriteBooks && FavouriteBooks.length === 0 && (
      <div className='text-5xl  h-[100%] font-semibold text-zinc-500 flex items-center justify-center flex-col w-full '> You Have No Favourite Books
      <img src='./shrug.png ' alt='shrug' className='h-[30vh] my-8'/>
      </div>)}

    <div className='grid grid-cols-4 gap-4'>
      
     {FavouriteBooks &&
      FavouriteBooks.map((items, i)=>(
     <div key = {i}>
     <BookCard data={items} Favourite={true} />
     </div> ))} 
    </div>
    </>
    
  )
}

export default Favourites;