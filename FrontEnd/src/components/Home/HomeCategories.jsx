import React, { useState } from 'react';

const CATEGORY_LIST = [
  'All Categories',
  'Fiction',
  'Non-Fiction',
  'Academic / Study',
  'Religious & Spiritual',
  "Children's Books",
  'Poetry',
  'Comics & Graphic Novels',
  'Lifestyle',
  'Professional & Technical',
];

const DUMMY_BOOKS = [
  {
    id: 'dummy-1',
    title: 'The Lost Kingdom',
    author: 'Arjun Mehta',
    price: 399,
    cover: 'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'dummy-2',
    title: 'Secrets of the Ocean',
    author: 'Priya Nair',
    price: 349,
    cover: 'https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'dummy-3',
    title: 'Mindset Mastery',
    author: 'Rahul Sharma',
    price: 299,
    cover: 'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'dummy-4',
    title: 'Stories for Little Stars',
    author: 'Kavya Rao',
    price: 259,
    cover: 'https://images.pexels.com/photos/1741230/pexels-photo-1741230.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'dummy-5',
    title: 'Poems at Midnight',
    author: 'Ananya Sen',
    price: 279,
    cover: 'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'dummy-6',
    title: 'Everyday Wellness Guide',
    author: 'Dr. Neha Kapoor',
    price: 320,
    cover: 'https://images.pexels.com/photos/3747509/pexels-photo-3747509.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

const HomeCategories = () => {
  const [activeCategory, setActiveCategory] = useState('All Categories');

  const booksToShow = DUMMY_BOOKS; // same dummy books for every category

  return (
    <div className="mt-12 px-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-3xl text-zinc-900 dark:text-yellow-100">Browse by Category</h4>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Categories list */}
        <div className="w-full lg:w-1/4">
          <ul className="space-y-2 text-sm md:text-base">
            {CATEGORY_LIST.map((cat) => (
              <li key={cat}>
                <button
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`block w-full text-left hover:text-yellow-700 dark:hover:text-yellow-300 ${
                    activeCategory === cat
                      ? 'text-yellow-700 dark:text-yellow-300 font-semibold'
                      : 'text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Dummy books grid */}
        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-6">
            {booksToShow.slice(0, 6).map((book, index) => (
              <div
                key={`${activeCategory}-${index}`}
                className="bg-zinc-800 rounded p-4 flex flex-col"
              >
                <div className="bg-zinc-900 rounded flex items-center justify-center h-48 w-full">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="mt-3">
                  <h3 className="text-white font-semibold line-clamp-2 text-sm md:text-base">
                    {book.title}
                  </h3>
                  <p className="text-zinc-400 text-xs md:text-sm mt-1">by {book.author}</p>
                  <p className="text-zinc-200 font-semibold mt-2">₹ {book.price}/-</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCategories;
