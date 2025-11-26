import React, {useState} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
const AddBook = () => {
    
        const navigate = useNavigate()
        const [Data, setData] = useState({
            url: "",
            title: "",
            author: "",
            price: "",
            desc: "",
            language: "",
            category: "Fiction",
        })
        const headers = {
            id: localStorage.getItem("id"),
            authorization : `Bearer ${localStorage.getItem("token")}`
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
                    Data.language === "" 
                ){
                    alert("All feilds are required")
                } else{
                    const response = await axios.post("http://localhost:1000/api/v1/add-book",
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
                        category: "Fiction",
                    })
                    alert(response.data.message)
                    navigate("/all-books")
                }
                
            } catch (error) {
                alert(error.response.data.message)

            }
        }
  return (
    <div className='h-[100%] p-0 md:p-4'>
        <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
            Add Book
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
                placeholder='language of the book...'
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
                    <option value="Fiction">Fiction</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                    <option value="Academic / Study">Academic / Study</option>
                    <option value="Religious & Spiritual">Religious &amp; Spiritual</option>
                    <option value="Children's Books">Children's Books</option>
                    <option value="Poetry">Poetry</option>
                    <option value="Comics & Graphic Novels">Comics &amp; Graphic Novels</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Professional & Technical">Professional &amp; Technical</option>
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
                Add Book !
              </button>
            

            

        </div>
    </div>
  )
}

export default AddBook