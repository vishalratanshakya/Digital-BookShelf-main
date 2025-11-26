import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa'

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const email = formData.get('email')
    if (email) {
      alert('Thank you for subscribing to our newsletter!')
      e.target.reset()
    }
  }

  return (
    <footer className="mt-12 bg-zinc-100 text-zinc-700 border-t border-zinc-200 dark:bg-zinc-900 dark:text-zinc-200 dark:border-zinc-800">
      <div className="px-6 md:px-10 py-8 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">Stay updated with Digital Bookshelf</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Subscribe to get updates on new books, offers, and recommendations.
            </p>
          </div>
          <form
            onSubmit={handleNewsletterSubmit}
            className="w-full md:w-auto flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="flex-1 min-w-[220px] bg-white border border-zinc-300 text-zinc-900 px-3 py-2 rounded outline-none focus:border-indigo-500 text-sm dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
            />
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-5 py-2 rounded text-sm transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="px-6 md:px-10 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-zinc-900 dark:text-white">Digital Bookshelf</h4>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3">
              Your one-stop destination for books across languages and genres.
            </p>
            <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-300 space-y-1">
              <p>Ghaziabad, India</p>
              <p>
                Phone:{' '}
                <a href="tel:9084410891" className="text-indigo-400 hover:text-indigo-300">
                  9084410891
                </a>
              </p>
              <p>
                Email:{' '}
                <a
                  href="mailto:info@digitalbookshelf.com"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  info@digitalbookshelf.com
                </a>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-zinc-900 dark:text-white">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
              <li>
                <Link to="/about" className="hover:text-indigo-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-indigo-400">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-indigo-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-indigo-400">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-zinc-900 dark:text-white">My Account</h4>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
              <li>
                <Link to="/profile/orderHistory" className="hover:text-indigo-400">
                  My Orders
                </Link>
              </li>
              <li>
                <Link to="/profile/settings" className="hover:text-indigo-400">
                  My Addresses
                </Link>
              </li>
              <li>
                <Link to="/profile/settings" className="hover:text-indigo-400">
                  My Personal Info
                </Link>
              </li>
            </ul>

            <h4 className="text-lg font-semibold text-zinc-900 dark:text-white mt-6">Support</h4>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
              <li>
                <Link to="/terms-of-use" className="hover:text-indigo-400">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="/how-to-order" className="hover:text-indigo-400">
                  How to Order
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:text-indigo-400">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="hover:text-indigo-400">
                  Return Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-zinc-900 dark:text-white">More Books</h4>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
              <li>
                <Link to="/all-books" className="hover:text-indigo-400">
                  Hindi Books
                </Link>
              </li>
              <li>
                <Link to="/all-books" className="hover:text-indigo-400">
                  English Books
                </Link>
              </li>
              <li>
                <Link to="/all-books" className="hover:text-indigo-400">
                  Award-Winning Books
                </Link>
              </li>
              <li>
                <Link to="/all-books" className="hover:text-indigo-400">
                  Kids &amp; Education Books
                </Link>
              </li>
            </ul>

            <h4 className="text-lg font-semibold text-zinc-900 dark:text-white mt-6">Follow Us</h4>
            <div className="mt-3 flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-zinc-200 border border-zinc-300 flex items-center justify-center text-zinc-600 hover:text-white hover:border-indigo-500 hover:bg-indigo-500 transition-colors text-sm dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white hover:border-indigo-500 hover:bg-indigo-500 transition-colors text-sm"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white hover:border-indigo-500 hover:bg-indigo-500 transition-colors text-sm"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white hover:border-indigo-500 hover:bg-indigo-500 transition-colors text-sm"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-200 dark:border-zinc-800 px-6 md:px-10 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
          <p>
            &copy; 2025 Digital Bookshelf. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
