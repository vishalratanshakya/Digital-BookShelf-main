import React,{useEffect,useState} from 'react'
import axios from "axios" //this hells to getch data from the backend
import BookCard from '../BookCard/BookCard'
import Loader from '../Loader/Loader'

const RecentlyAdded = () => {
  const [Data, setData] = useState()
  useEffect(() => { 
    const fetch = async() => {
    try {
      const response =  await axios.get("http://localhost:1000/api/v1/get-recent-books")
      setData(response.data.data)
    } catch (error) {
      console.log(error)
      setData([])
    }
     }
     fetch()
    } , [])   
  // till now our data has been fetched from db to frontend but in console not in front end

  //here we will display our backend data to our frontend from line 18
  //line 23 is telling if the data of backedn i.e Data is present then only it will be showed else not

  return (
    <div className='mt-8 px-4'>
      <h4 className='text-3xl text-zinc-900 dark:text-yellow-100'>Recently Added Books</h4>
    {!Data && ( 
      <div className='flex items-center justify-center my-8'>
      <Loader /> 
      </div>)}


   <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
    
    {Data && Data.map((items,i) => <div key = {i}> <BookCard data = {items} />  {" "}</div> )}

</div>
      
      </div>
      
  )
}

export default RecentlyAdded