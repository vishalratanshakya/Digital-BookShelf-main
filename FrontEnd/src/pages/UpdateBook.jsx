import React, {useState,useEffect} from 'react'
import axios from "axios"
import { useParams, useNavigate } from 'react-router-dom'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const UpdateBook = () => {
    const [Data, setData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
        category: "Novel",
    })
 
    const {id} =  useParams()
    const navigate = useNavigate()
    const headers = {
        id: localStorage.getItem("id"),
        authorization : `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
    }
    const change = (e) => {
        const {name, value } = e.target
        setData({ ...Data, [name]: value})
    }
    const submit = async () => {
        try{
            if( Data.url === "" || 
                Data.title === "" || 
                Data.author === "" || 
                Data.price === "" || 
                Data.desc === "" || 
                Data.language === "" || 
                Data.category === "" 
            ){
                alert("All feilds are required")
            } else{
                const response = await axios.put(`${BACKEND_URL}/api/v1/update-book`,
                    Data,
                    {headers}
                )

                setData({
                    url: "",
                    title: "",
                    author: "",
                    price: "",
                    desc: "",
                    language: "",
                    category: "Novel",
                })
                 alert(response.data.message)
                 navigate(`/view-book-details/${id}`)
            }
            
        } catch (error) {
            alert(error.response.data.message)
           

        }
    }
    useEffect(() => { 
        const fetch = async() => {
        const response =  await axios.get(`${BACKEND_URL}/api/v1/get-book-by-id/${id}`)
       
        setData(response.data.data)
         }
         fetch()
        } , [id]) 
  return (
    <div className='bg-zinc-900 h-[100%] p-0 md:p-4'>
    <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
        Update Book
    </h1>
    <div className='p-4 bg-zinc-800 rounded'>
        <div>
            <label htmlFor="" className='text-zinc-400'>
                Image
            </label>
            <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder='Url of the image...'
            name = "url"
            required value = {Data.url}
            onChange={change} />
    
        </div>
        <div className='mt-4'>
            <label htmlFor="" className=' text-zinc-400'>
                Title of the book
            </label>
            <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder='Title of the book...'
            name = "title"
            required value = {Data.title}
            onChange={change}/>
        </div>


        <div className='mt-4'>
            <label htmlFor="" className=' text-zinc-400'>
                Author of the book
            </label>
            <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder='Author of the book...'
            name = "author"
            required value = {Data.author}
            onChange={change}/>
        </div>
        <div className='mt-4 flex gap-4'>
            <div className='w-3/6'>
            <label htmlFor="" className='text-zinc-400'>
                Language
            </label>
            <input type="text" 
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' 
            placeholder='Language of the book...'
            name='language'
            required value = {Data.language}
            onChange={change}/>
            </div>

            <div className='w-3/6'>
            <label htmlFor="" className='text-zinc-400'>
                Category
            </label>
            <select 
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            name='category'
            value={Data.category}
            onChange={change}
            >
                <option value="Novel">Novel</option>
                <option value="Education">Education</option>
                <option value="Story">Story</option>
                <option value="Biography">Biography</option>
                <option value="Other">Other</option>
            </select>
            </div>

            <div className='w-3/6'>
            <label htmlFor="" className='text-zinc-400'>
                Price
            </label>
            <input type="number" 
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' 
            placeholder='price of the book...'
            name='price'
            required value = {Data.price}
            onChange={change}/>
            </div>
            </div>

            <div className='mt-4'>
                <label htmlFor="" className='text-zinc-400'>
                    Description of the book
                </label>
                <textarea 
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none" 
                rows="5"
                placeholder='Description of the book...'
                name='desc'
                required value = {Data.desc}
                onChange={change}>
                
                </textarea>
            </div>

          <button className='mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-300' onClick={submit}>
            Update Book !
          </button>
        

        

    </div>
</div>
  )
}

export default UpdateBook