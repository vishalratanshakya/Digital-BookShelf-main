import React,{useEffect,useMemo,useState} from 'react'
import axios from "axios" //this tells to fetch data from the backend
import Loader from '../components/Loader/Loader'
import BookCard from '../components/BookCard/BookCard'
import SidebarFilters from '../components/Filters/SidebarFiltersClean'
import { FiMenu } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AllBooks = () => {
  const [Data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 })
  const [filters, setFilters] = useState({
    language: "All",
    category: "All",
    sort: "",
    search: "",
    minPrice: "",
    maxPrice: "",
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const location = useLocation()

  // Initialize filters from URL query params (e.g., /all-books?language=English)
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const urlLanguage = params.get('language')
    const urlCategory = params.get('category')

    if (!urlLanguage && !urlCategory) return

    setFilters(prev => ({
      ...prev,
      language: urlLanguage || prev.language,
      category: urlCategory || prev.category,
    }))
  }, [location.search])

  useEffect(() => { 
    const fetch = async() => {
      try {
        setLoading(true)
        setError("")

        const params = new URLSearchParams()
        if (filters.language && filters.language !== "All") params.append("language", filters.language)
        if (filters.category && filters.category !== "All") params.append("category", filters.category)
        if (filters.sort) params.append("sort", filters.sort)
        if (filters.search) params.append("search", filters.search)

        const maxPriceFilter = Number(filters.maxPrice)
        if (Number.isFinite(maxPriceFilter) && maxPriceFilter > 0) {
          params.append("minPrice", 0)
          params.append("maxPrice", maxPriceFilter)
        }

        const query = params.toString()
        const url = query
          ? `${BACKEND_URL}/api/v1/get-all-books?${query}`
          : `${BACKEND_URL}/api/v1/get-all-books`

        const response =  await axios.get(url)
        const books = response.data.data || []
        setData(books)

        // Only recompute global price range when no explicit maxPrice filter is set.
        // This prevents the slider from losing its max when a tight price filter returns 0 books.
        if (!filters.maxPrice) {
          if (books.length > 0) {
            const maxPrice = books.reduce((max, book) => {
              const price = Number(book.price)
              if (!Number.isFinite(price)) return max
              return price > max ? price : max
            }, 0)
            setPriceRange({ min: 0, max: maxPrice })
          } else {
            setPriceRange({ min: 0, max: 0 })
          }
        }
      } catch (err) {
        console.log(err)
        setError("Failed to load books. Please try again.")
        setData([])
      } finally {
        setLoading(false)
      }
     }
     fetch()
    } , [filters])   

  useEffect(() => {
    const previous = document.body.style.overflow
    if (isFilterOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = previous || 'auto'
    }
    return () => {
      document.body.style.overflow = previous || 'auto'
    }
  }, [isFilterOpen])

  const availableCategories = useMemo(() => {
    const set = new Set()
    Data.forEach((book) => {
      if (book.category) set.add(book.category)
    })
    return Array.from(set)
  }, [Data])

  return (
    <div className='min-h-screen bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 px-4 md:px-8 lg:px-12 py-8 '>
      <div className='flex items-center justify-between'>
        <h4 className='text-3xl text-yellow-700 dark:text-yellow-100'> All Books</h4>
      </div>

      <div className='mt-4'>
        <button
          type="button"
          onClick={() => setIsFilterOpen(true)}
          className='inline-flex items-center gap-2 px-4 py-2 rounded border border-white/80 bg-[#131921] text-white font-semibold text-sm shadow-sm'
        >
          <FiMenu className='text-lg' />
          <span>All</span>
        </button>
      </div>

      <div className='mt-6 flex flex-col gap-6'>
        <div className='flex-1'>
          {loading && (
            <div className='w-full flex items-center justify-center my-8'>
              <Loader />
            </div>
          )}

          {!loading && error && (
            <p className='text-red-400 text-sm mt-4'>{error}</p>
          )}

          {!loading && !error && Data.length === 0 && (
            <p className='text-zinc-400 text-sm mt-4'>No books found.</p>
          )}

          <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
            {Data.map((items,i) => (
              <div key={i}>
                <BookCard data={items} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {isFilterOpen && (
        <div className='fixed inset-x-0 top-16 bottom-0 z-40 flex overflow-hidden'>
          <div className='h-full w-72 max-w-[80%] bg-white text-zinc-900 shadow-2xl flex flex-col'>
            <div className='px-4 py-3 bg-[#131921] text-white flex items-center justify-between'>
              <span className='font-semibold text-sm'>All Filters</span>
              <button
                type='button'
                onClick={() => setIsFilterOpen(false)}
                className='text-xl leading-none font-bold hover:text-yellow-300'
              >
                ×
              </button>
            </div>
            <div className='flex-1 overflow-y-auto'>
              <SidebarFilters
                filters={filters}
                onChange={setFilters}
                priceRange={priceRange}
                availableCategories={availableCategories}
              />
            </div>
          </div>
          <button
            type='button'
            className='flex-1 bg-black/60'
            onClick={() => setIsFilterOpen(false)}
          />
        </div>
      )}
    </div>
  )
}

export default AllBooks