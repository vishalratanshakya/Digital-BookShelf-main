import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const slides = [
  {
    id: 1,
    label: 'Bestselling Fiction',
    category: 'Fiction',
    books: [
      {
        id: 'f1',
        url: 'https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX258_BO1,204,203,200_.jpg',
        title: 'The Silent Library',
      },
      {
        id: 'f2',
        url: 'https://images-na.ssl-images-amazon.com/images/I/41+eK8zBwQL._SX331_BO1,204,203,200_.jpg',
        title: 'Shadows of the City',
      },
      {
        id: 'f3',
        url: 'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Midnight Stories',
      },
    ],
  },
  {
    id: 2,
    label: 'Non-fiction & Self-help',
    category: 'Non-Fiction',
    books: [
      {
        id: 'n1',
        url: 'https://images-na.ssl-images-amazon.com/images/I/51N-u8AsmdL._SX331_BO1,204,203,200_.jpg',
        title: 'Deep Work Habits',
      },
      {
        id: 'n2',
        url: 'https://images-na.ssl-images-amazon.com/images/I/51oHUvYzbsL._SX331_BO1,204,203,200_.jpg',
        title: 'The Focused Mind',
      },
      {
        id: 'n3',
        url: 'https://images.pexels.com/photos/3747509/pexels-photo-3747509.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Think Better, Live Better',
      },
    ],
  },
  {
    id: 3,
    label: 'Kids & Young Readers',
    category: "Children's Books",
    books: [
      {
        id: 'k1',
        url: 'https://images-na.ssl-images-amazon.com/images/I/51DNaiWfllL._SX329_BO1,204,203,200_.jpg',
        title: 'Adventures in Wonderville',
      },
      {
        id: 'k2',
        url: 'https://images-na.ssl-images-amazon.com/images/I/41jEbK-jG+L._SX331_BO1,204,203,200_.jpg',
        title: 'Stories for Curious Minds',
      },
      {
        id: 'k3',
        url: 'https://images-na.ssl-images-amazon.com/images/I/51N-u8AsmdL._SX331_BO1,204,203,200_.jpg',
        title: 'Colorful Tales',
      },
    ],
  },
]

const heroBooks = slides.flatMap((slide) =>
  slide.books.map((book) => ({
    ...book,
    category: slide.category,
  }))
)

const Hero = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroBooks.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + heroBooks.length) % heroBooks.length)
  }

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % heroBooks.length)
  }

  return (
    <section className="w-full min-h-[70vh] md:min-h-[75vh] bg-white dark:bg-gradient-to-r dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 text-zinc-900 dark:text-white rounded-3xl px-6 md:px-12 py-10 md:py-12 shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-40">
        <div className="absolute -right-32 -top-32 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl" />
        <div className="absolute -left-20 bottom-0 w-72 h-72 bg-yellow-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="w-full lg:w-2/5 max-w-xl text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-zinc-900 dark:text-yellow-100">
            Discover Your Next Great Read
          </h1>
          <p className="mt-4 text-sm md:text-base text-zinc-600 dark:text-zinc-200">
            Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of
            books.
          </p>
          <div className="mt-6">
            <Link
              to="/all-books"
              className="inline-block text-sm md:text-base lg:text-lg font-semibold border border-zinc-900 text-zinc-900 px-8 md:px-10 py-3 rounded-full hover:bg-zinc-900 hover:text-white transition-colors shadow-md dark:border-yellow-100 dark:text-yellow-100 dark:hover:bg-yellow-100 dark:hover:text-zinc-900"
            >
              Discover Books
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-3/5 mt-6 lg:mt-0">
          <div className="relative h-[260px] md:h-[360px] lg:h-[420px]">
            <div className="absolute inset-0 flex items-center justify-end pr-4 md:pr-8">
              <div className="flex gap-4 md:gap-6 lg:gap-8 justify-end w-full">
                {[-1, 0, 1].map((offset) => {
                  const index = (current + offset + heroBooks.length) % heroBooks.length
                  const book = heroBooks[index]
                  return (
                    <Link
                      key={book.id}
                      to={`/all-books?category=${encodeURIComponent(book.category)}`}
                      className="w-28 sm:w-32 md:w-40 lg:w-44 xl:w-52 aspect-[2/3] bg-zinc-900/80 rounded-2xl shadow-xl shadow-black/40 overflow-hidden border border-zinc-700/60 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300"
                    >
                      <img
                        src={book.url}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  )
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-zinc-900/80 border border-zinc-700 flex items-center justify-center text-zinc-200 hover:border-yellow-400 hover:text-yellow-300 hover:bg-zinc-900 transition-colors"
            >
              <FiChevronLeft className="text-lg" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-zinc-900/80 border border-zinc-700 flex items-center justify-center text-zinc-200 hover:border-yellow-400 hover:text-yellow-300 hover:bg-zinc-900 transition-colors"
            >
              <FiChevronRight className="text-lg" />
            </button>

            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {heroBooks.map((book, index) => (
                <button
                  key={book.id}
                  type="button"
                  onClick={() => setCurrent(index)}
                  className={`w-2.5 h-2.5 rounded-full border border-zinc-600 transition-all ${
                    index === current ? 'bg-yellow-400 border-yellow-400 w-5' : 'bg-zinc-700'
                  }`}
                  aria-label={book.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero


