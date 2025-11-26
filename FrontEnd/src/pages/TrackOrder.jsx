import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa';

const steps = [
  'Order Placed',
  'Processing',
  'Packed',
  'Dispatched',
  'Out for Delivery',
  'Delivered',
];

const TrackOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const headers = useMemo(
    () => ({
      id: localStorage.getItem('id'),
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
    []
  );

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-order/${orderId}`,
        { headers }
      );
      setOrder(response.data.data);
    } catch (err) {
      console.log(err);
      setError('Unable to load order details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!orderId) {
      navigate('/profile/orderHistory');
      return;
    }
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const activeStepIndex = useMemo(() => {
    if (!order || !order.status) return 0;

    const normalized = order.status.trim().toLowerCase();

    if (normalized === 'order placed') return 0;
    if (normalized === 'processing') return 1;
    if (normalized === 'packed') return 2;
    if (normalized === 'dispatched') return 3;
    if (normalized === 'out for delivery') return 4;
    if (normalized === 'delivered') return 5;

    // treat canceled or unknown statuses as the first step in the timeline
    return 0;
  }, [order]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 text-zinc-100 flex items-center justify-center">
        <p className="text-zinc-400 text-sm">Loading order tracking...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-zinc-900 text-zinc-100 flex flex-col items-center justify-center px-4">
        <p className="text-red-400 text-sm mb-3">{error || 'Order not found.'}</p>
        <Link
          to="/profile/orderHistory"
          className="text-xs md:text-sm text-zinc-300 hover:text-yellow-200"
        >
          ← Go back to Order History
        </Link>
      </div>
    );
  }

  const createdAt = order.createdAt ? new Date(order.createdAt) : null;

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 px-4 md:px-10 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-yellow-100">Track Your Order</h1>
            <p className="text-xs md:text-sm text-zinc-400 mt-1">
              Follow the journey of your books from our shelf to your doorstep.
            </p>
          </div>
          <div className="text-xs md:text-sm text-zinc-300 bg-zinc-800 rounded-xl px-4 py-2 border border-zinc-700/70">
            <p>Order ID: <span className="font-mono">{order._id}</span></p>
            {createdAt && <p>Placed on: {createdAt.toLocaleString()}</p>}
          </div>
        </div>

        <div className="bg-zinc-800 rounded-2xl border border-zinc-700/70 p-5 md:p-6">
          <h2 className="text-lg font-semibold text-zinc-100 mb-3">Order Details</h2>
          <div className="flex flex-col md:flex-row gap-4 items-start">
            {order.book && (
              <div className="w-20 h-28 rounded bg-zinc-900 overflow-hidden flex items-center justify-center">
                <img
                  src={order.book.url}
                  alt={order.book.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 text-sm">
              {order.book && (
                <>
                  <p className="text-zinc-100 font-semibold">{order.book.title}</p>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{order.book.desc}</p>
                  <p className="text-sm text-zinc-100 mt-2">₹ {order.book.price} /-</p>
                </>
              )}
              <p className="text-xs text-zinc-400 mt-2">Current Status: {order.status}</p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-800 rounded-2xl border border-zinc-700/70 p-5 md:p-6">
          <h2 className="text-lg font-semibold text-zinc-100 mb-4">Tracking Timeline</h2>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1 flex flex-col md:flex-row items-center md:items-start md:gap-4">
              <div className="flex md:flex-1 justify-between w-full md:mr-4">
                {steps.map((label, index) => {
                  const isActive = index <= activeStepIndex;
                  return (
                    <div key={label} className="flex-1 flex flex-col items-center">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center border text-xs md:text-sm ${
                          isActive
                            ? 'bg-yellow-400 border-yellow-400 text-zinc-900'
                            : 'bg-zinc-900 border-zinc-600 text-zinc-300'
                        }`}
                      >
                        {isActive ? <FaCheckCircle className="text-[14px]" /> : index + 1}
                      </div>
                      <p className="mt-2 text-[10px] md:text-xs text-center text-zinc-300 max-w-[80px]">
                        {label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 mt-4">
          <button
            type="button"
            onClick={fetchOrder}
            className="w-full md:w-auto bg-zinc-100 text-zinc-900 font-semibold py-2.5 px-5 rounded-full text-sm md:text-base hover:bg-yellow-300 transition-colors shadow-md"
          >
            Refresh Tracking Status
          </button>

          <Link
            to="/profile/orderHistory"
            className="text-xs md:text-sm text-zinc-300 hover:text-yellow-200"
          >
            ← Back to Order History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
