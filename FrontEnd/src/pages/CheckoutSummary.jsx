import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CheckoutSummary = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState(null);
  const [payment, setPayment] = useState(null);
  const [orders, setOrders] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const cartRaw = localStorage.getItem('checkoutCart');
      const addrRaw = localStorage.getItem('checkoutAddress');
      const payRaw = localStorage.getItem('checkoutPayment');
      const ordersRaw = localStorage.getItem('checkoutOrders');

      if (!cartRaw || !addrRaw || !payRaw || !ordersRaw) {
        navigate('/cart');
        return;
      }

      const cartParsed = JSON.parse(cartRaw);
      setCart(cartParsed.cart || []);
      setAddress(JSON.parse(addrRaw));
      setPayment(JSON.parse(payRaw));
      setOrders(JSON.parse(ordersRaw));
    } catch (err) {
      console.log(err);
      navigate('/cart');
    }
  }, [navigate]);

  const totals = useMemo(() => {
    if (!cart || cart.length === 0) return { subtotal: 0, delivery: 0, total: 0 };
    const subtotal = cart.reduce((sum, b) => sum + (b.price || 0), 0);
    const delivery = subtotal > 0 ? 40 : 0;
    return { subtotal, delivery, total: subtotal + delivery };
  }, [cart]);

  const firstOrder = orders && orders.length > 0 ? orders[0] : null;

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  const clearCheckoutState = () => {
    try {
      localStorage.removeItem('checkoutCart');
      localStorage.removeItem('checkoutAddress');
      localStorage.removeItem('checkoutPayment');
      localStorage.removeItem('checkoutOrders');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    if (!orders || orders.length === 0) return;
    const confirmDelete = window.confirm('Are you sure you want to delete this order?');
    if (!confirmDelete) return;

    try {
      setDeleting(true);
      setError('');
      for (const ord of orders) {
        await axios.delete(`${BACKEND_URL}/api/v1/delete-order/${ord._id}`, { headers });
      }
      clearCheckoutState();
      navigate('/');
    } catch (err) {
      console.log(err);
      const message = err.response?.data?.message || 'Failed to cancel order. Please try again.';
      setError(message);
      alert(message);
    } finally {
      setDeleting(false);
    }
  };

  if (!address || !payment || !firstOrder) {
    return (
      <div className="min-h-screen bg-zinc-900 text-zinc-100 flex items-center justify-center">
        <p className="text-zinc-400 text-sm">Loading order summary...</p>
      </div>
    );
  }

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 5);

  const paymentLabel = (() => {
    if (payment.method === 'COD') return 'Cash on Delivery';
    if (payment.method === 'UPI') return `UPI (${payment.upiId})`;
    if (payment.method === 'CARD') return `Card (•••• ${payment.cardLast4})`;
    if (payment.method === 'NETBANKING') return `Net Banking (${payment.bank})`;
    return payment.method;
  })();

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 px-4 md:px-10 py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {error && (
          <p className="text-xs text-red-400">{error}</p>
        )}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-yellow-100">Order Summary</h1>
            <p className="text-xs md:text-sm text-zinc-400 mt-1">
              Thank you for your order! Below are the details of your recent purchase.
            </p>
          </div>
          {firstOrder && (
            <div className="text-xs md:text-sm text-zinc-300 bg-zinc-800 rounded-xl px-4 py-2 border border-zinc-700/70">
              <p>Order ID: <span className="font-mono">{firstOrder._id}</span></p>
              <p>
                Placed on:{' '}
                {firstOrder.createdAt ? new Date(firstOrder.createdAt).toLocaleString() : 'Just now'}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr,1.2fr] gap-6 items-start">
          <div className="space-y-4">
            <div className="bg-zinc-800 rounded-2xl border border-zinc-700/70 p-5 md:p-6">
              <h2 className="text-lg font-semibold text-zinc-100 mb-3">Delivery Address</h2>
              <p className="text-sm text-zinc-200 font-semibold">{address.fullName}</p>
              <p className="text-sm text-zinc-300 mt-1">
                {address.address1}
                {address.address2 ? `, ${address.address2}` : ''}
              </p>
              {address.landmark && (
                <p className="text-xs text-zinc-400 mt-1">Landmark: {address.landmark}</p>
              )}
              <p className="text-sm text-zinc-300 mt-1">
                {address.city}, {address.state} - {address.pincode}
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                Mobile: {address.mobile}
                {address.altMobile ? `, Alt: ${address.altMobile}` : ''}
              </p>
              <p className="text-xs text-zinc-400 mt-1">Type: {address.addressType}</p>
            </div>

            <div className="bg-zinc-800 rounded-2xl border border-zinc-700/70 p-5 md:p-6">
              <h2 className="text-lg font-semibold text-zinc-100 mb-3">Payment Method</h2>
              <p className="text-sm text-zinc-200">{paymentLabel}</p>
              <p className="text-xs text-zinc-400 mt-1">Your payment details are processed securely.</p>
            </div>
          </div>

          <div className="bg-zinc-800 rounded-2xl border border-zinc-700/70 p-5 md:p-6">
            <h2 className="text-lg font-semibold text-zinc-100 mb-3">Items in this Order</h2>
            <div className="max-h-56 overflow-y-auto pr-2 space-y-3 text-sm">
              {cart.map((item) => (
                <div key={item._id} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-14 rounded bg-zinc-900 overflow-hidden flex items-center justify-center">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-zinc-100 text-xs md:text-sm line-clamp-1">{item.title}</p>
                      <p className="text-[11px] text-zinc-400 line-clamp-1">{item.author}</p>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-100">₹ {item.price}/-</p>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t border-zinc-700 pt-3 space-y-1 text-sm">
              <div className="flex justify-between text-zinc-300">
                <span>Items Total</span>
                <span>₹ {totals.subtotal}/-</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Delivery Charges</span>
                <span>₹ {totals.delivery}/-</span>
              </div>
              <div className="flex justify-between text-zinc-100 font-semibold text-base mt-1">
                <span>Final Amount</span>
                <span>₹ {totals.total}/-</span>
              </div>
            </div>

            <p className="mt-3 text-xs text-zinc-400">
              Estimated Delivery by{' '}
              <span className="text-zinc-200 font-medium">
                {estimatedDate.toLocaleDateString()}
              </span>
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <button
                type="button"
                disabled={deleting}
                onClick={handleDelete}
                className="w-full bg-red-500/90 hover:bg-red-500 text-white font-semibold py-2.5 rounded-full text-sm md:text-base transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {deleting ? 'Cancelling Order...' : 'Cancel Order'}
              </button>

              {firstOrder && (
                <button
                  type="button"
                  onClick={() => navigate(`/checkout/track/${firstOrder._id}`)}
                  className="w-full bg-zinc-100 text-zinc-900 font-semibold py-2.5 rounded-full text-sm md:text-base hover:bg-yellow-300 transition-colors shadow-md"
                >
                  Track This Order
                </button>
              )}

              <Link
                to="/profile/orderHistory"
                className="w-full text-center text-xs md:text-sm text-zinc-300 hover:text-yellow-200 mt-1"
              >
                View all your orders →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
