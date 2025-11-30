import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import BookCard from '../BookCard/BookCard';
import Loader from '../Loader/Loader';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CategoryDummy = () => {
  const [englishBooks, setEnglishBooks] = useState([]);
  const [hindiBooks, setHindiBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError("");

        const [engRes, hinRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/v1/get-all-books?language=English`),
          axios.get(`${BACKEND_URL}/api/v1/get-all-books?language=Hindi`),
        ]);

        setEnglishBooks(engRes.data.data || []);
        setHindiBooks(hinRes.data.data || []);
      } catch (err) {
        console.log(err);
        setError("Failed to load books by language.");
        setEnglishBooks([]);
        setHindiBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="mt-12 px-4">
      <h4 className="text-3xl text-zinc-900 dark:text-yellow-100 mb-4">Browse by Language</h4>

      {loading && (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      )}

      {!loading && error && (
        <p className="text-red-400 text-sm mb-4">{error}</p>
      )}

      {!loading && !error && (
        <>
          {/* English section */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h5 className="text-2xl text-zinc-900 dark:text-zinc-100">English Books</h5>
              {englishBooks.length > 4 && (
                <Link
                  to="/all-books?language=English"
                  className="text-sm font-semibold text-red-500 hover:text-red-600 dark:text-red-300 dark:hover:text-red-200"
                >
                  See All
                </Link>
              )}
            </div>
            {englishBooks.length === 0 ? (
              <p className="text-zinc-400 text-sm">No English books found yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
                {englishBooks.slice(0, 4).map((book) => (
                  <div key={book._id}>
                    <BookCard data={book} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Hindi section */}
          <div className="mt-10">
            <div className="flex items-center justify-between mb-3">
              <h5 className="text-2xl text-zinc-900 dark:text-zinc-100">Hindi Books</h5>
              {hindiBooks.length > 4 && (
                <Link
                  to="/all-books?language=Hindi"
                  className="text-sm font-semibold text-red-500 hover:text-red-600 dark:text-red-300 dark:hover:text-red-200"
                >
                  See All
                </Link>
              )}
            </div>
            {hindiBooks.length === 0 ? (
              <p className="text-zinc-400 text-sm">No Hindi books found yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
                {hindiBooks.slice(0, 4).map((book) => (
                  <div key={book._id}>
                    <BookCard data={book} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryDummy;
