import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const OrderSidebar = ({ isOpen, onClose, product }) => {
  const navigate = useNavigate();

  if (!isOpen || !product) return null;

  const handleCheckout = () => {
    const checkoutData = {
      cart: [product],
      total: product.price || 0,
    };
    try {
      localStorage.setItem('checkoutCart', JSON.stringify(checkoutData));
    } catch (error) {
      console.log(error);
    }
    navigate('/checkout/address');
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white dark:bg-zinc-900 shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Order Summary</h2>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <IoMdClose size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 mb-4">
              <div className="flex gap-4">
                <img
                  src={product.url}
                  alt={product.title}
                  className="w-24 h-32 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-1">
                    {product.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">by {product.author}</p>
                  <p className="text-zinc-700 dark:text-zinc-300 text-sm line-clamp-3">
                    {product.desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Price Details */}
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">Price Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-zinc-700 dark:text-zinc-300">
                  <span>Price (1 item)</span>
                  <span>₹ {product.price}</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>Delivery Charges</span>
                  <span className="text-green-500">FREE</span>
                </div>
                <div className="border-t border-zinc-200 dark:border-zinc-700 pt-2 mt-2">
                  <div className="flex justify-between text-zinc-900 dark:text-white font-semibold text-lg">
                    <span>Total Amount</span>
                    <span>₹ {product.price}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">Product Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500 dark:text-zinc-400">Language:</span>
                  <span className="text-zinc-800 dark:text-zinc-200">{product.language || 'English'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 dark:text-zinc-400">Category:</span>
                  <span className="text-zinc-800 dark:text-zinc-200">{product.category || 'General'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-zinc-200 dark:border-zinc-700">
            <div className="flex items-center justify-between mb-3">
              <span className="text-zinc-700 dark:text-zinc-300">Total:</span>
              <span className="text-2xl font-bold text-zinc-900 dark:text-white">₹ {product.price}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSidebar;
