import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaLock } from 'react-icons/fa';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CheckoutPayment = () => {
  const navigate = useNavigate();
  const [checkoutData, setCheckoutData] = useState(null);
  const [method, setMethod] = useState('COD');
  const [upiId, setUpiId] = useState('');
  const [upiVerified, setUpiVerified] = useState(false);
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '', save: false });
  const [bank, setBank] = useState('');
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem('checkoutCart');
      if (!raw) {
        navigate('/cart');
        return;
      }
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.cart) || parsed.cart.length === 0) {
        navigate('/cart');
        return;
      }
      setCheckoutData(parsed);

      const savedAddress = localStorage.getItem('checkoutAddress');
      if (!savedAddress) {
        navigate('/checkout/address');
      }

      const savedPayment = localStorage.getItem('checkoutPayment');
      if (savedPayment) {
        const parsedPay = JSON.parse(savedPayment);
        if (parsedPay.method) setMethod(parsedPay.method);
      }
    } catch (err) {
      console.log(err);
      navigate('/cart');
    }
  }, [navigate]);

  const totals = useMemo(() => {
    if (!checkoutData) return { items: 0, subtotal: 0, delivery: 0, total: 0 };
    const subtotal = checkoutData.total || checkoutData.cart.reduce((sum, b) => sum + (b.price || 0), 0);
    const delivery = subtotal > 0 ? 40 : 0;
    return {
      items: checkoutData.cart.length,
      subtotal,
      delivery,
      total: subtotal + delivery,
    };
  }, [checkoutData]);

  const headers = useMemo(
    () => ({
      id: localStorage.getItem('id'),
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
    []
  );

  const handlePlaceOrder = async () => {
    if (!checkoutData) return;
    setError('');

    if (method === 'UPI') {
      if (!upiId.trim()) {
        setError('Please enter your UPI ID');
        return;
      }
      if (!upiId.includes('@')) {
        setError('Enter a valid UPI ID (e.g., name@upi)');
        return;
      }
    }

    if (method === 'CARD') {
      if (!card.number.trim() || card.number.replace(/\s+/g, '').length < 12) {
        setError('Enter a valid card number');
        return;
      }
      if (!card.name.trim()) {
        setError('Enter name on card');
        return;
      }
      if (!card.expiry.trim()) {
        setError('Enter card expiry date');
        return;
      }
      if (!card.cvv.trim() || card.cvv.length < 3) {
        setError('Enter a valid CVV');
        return;
      }
    }

    if (method === 'NETBANKING' && !bank) {
      setError('Please select your bank');
      return;
    }

    const paymentSummary = {
      method,
      upiId: method === 'UPI' ? upiId : '',
      cardLast4:
        method === 'CARD' && card.number
          ? card.number.replace(/\s+/g, '').slice(-4)
          : '',
      cardName: method === 'CARD' ? card.name : '',
      bank: method === 'NETBANKING' ? bank : '',
    };

    try {
      localStorage.setItem('checkoutPayment', JSON.stringify(paymentSummary));
    } catch (error) {
      console.log(error);
    }

    try {
      setPlacing(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/place-order`,
        { order: checkoutData.cart },
        { headers }
      );

      if (response.data && response.data.orders) {
        localStorage.setItem('checkoutOrders', JSON.stringify(response.data.orders));
      }

      navigate('/checkout/summary');
    } catch (err) {
      console.log(err);
      setError('Failed to place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  const handleVerifyUpi = () => {
    if (!upiId.trim()) {
      setError('Please enter your UPI ID');
      return;
    }
    if (!upiId.includes('@')) {
      setError('Enter a valid UPI ID (e.g., name@upi)');
      return;
    }
    setError('');
    setUpiVerified(true);
  };

  if (!checkoutData) {
    return (
      <div className="min-h-screen bg-zinc-900 text-zinc-100 flex items-center justify-center">
        <p className="text-zinc-400 text-sm">Loading checkout...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 px-4 md:px-10 py-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr,1.4fr] gap-6 items-start">
        <div className="bg-zinc-800 rounded-2xl shadow-lg border border-zinc-700/60 p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-yellow-100 mb-2">Payment Method</h1>
          <p className="text-sm text-zinc-400 mb-6">
            Select a secure payment method to complete your order.
          </p>

          {error && <p className="text-xs text-red-400 mb-4">{error}</p>}

          <div className="space-y-5">
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  value="COD"
                  checked={method === 'COD'}
                  onChange={() => setMethod('COD')}
                  className="text-yellow-400 focus:ring-0"
                />
                <span className="font-semibold text-sm">Cash on Delivery (COD)</span>
              </label>
              <p className="text-xs text-zinc-400 ml-7 mt-1">
                Pay in cash when your order is delivered.
              </p>
            </div>

            <div className="pt-3 border-t border-zinc-700/80">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  value="UPI"
                  checked={method === 'UPI'}
                  onChange={() => setMethod('UPI')}
                  className="text-yellow-400 focus:ring-0"
                />
                <span className="font-semibold text-sm">UPI Payment</span>
              </label>
              {method === 'UPI' && (
                <div className="mt-3 flex flex-col sm:flex-row gap-3 ml-7">
                  <input
                    type="text"
                    placeholder="Enter UPI ID (e.g., name@upi)"
                    value={upiId}
                    onChange={(e) => {
                      setUpiId(e.target.value);
                      setUpiVerified(false);
                    }}
                    className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-400"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyUpi}
                    className="px-4 py-2 rounded-lg text-sm font-semibold bg-zinc-100 text-zinc-900 hover:bg-yellow-300 transition-colors"
                  >
                    Verify
                  </button>
                </div>
              )}
              {method === 'UPI' && upiVerified && (
                <p className="text-xs text-green-400 ml-7 mt-1">UPI ID verified successfully.</p>
              )}
            </div>

            <div className="pt-3 border-t border-zinc-700/80">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  value="CARD"
                  checked={method === 'CARD'}
                  onChange={() => setMethod('CARD')}
                  className="text-yellow-400 focus:ring-0"
                />
                <span className="font-semibold text-sm">Credit / Debit Card</span>
              </label>
              {method === 'CARD' && (
                <div className="mt-3 ml-7 space-y-3">
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={card.number}
                    onChange={(e) => setCard((prev) => ({ ...prev, number: e.target.value }))}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-400"
                  />
                  <input
                    type="text"
                    placeholder="Name on Card"
                    value={card.name}
                    onChange={(e) => setCard((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-400"
                  />
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={card.expiry}
                      onChange={(e) => setCard((prev) => ({ ...prev, expiry: e.target.value }))}
                      className="w-1/2 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-400"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      value={card.cvv}
                      onChange={(e) => setCard((prev) => ({ ...prev, cvv: e.target.value }))}
                      className="w-1/2 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-400"
                    />
                  </div>
                  <label className="inline-flex items-center gap-2 text-xs text-zinc-300">
                    <input
                      type="checkbox"
                      checked={card.save}
                      onChange={(e) => setCard((prev) => ({ ...prev, save: e.target.checked }))}
                      className="text-yellow-400 focus:ring-0"
                    />
                    <span>Save this card securely for faster checkout</span>
                  </label>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-zinc-700/80">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  value="NETBANKING"
                  checked={method === 'NETBANKING'}
                  onChange={() => setMethod('NETBANKING')}
                  className="text-yellow-400 focus:ring-0"
                />
                <span className="font-semibold text-sm">Net Banking</span>
              </label>
              {method === 'NETBANKING' && (
                <div className="mt-3 ml-7">
                  <select
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-400"
                  >
                    <option value="">Select Bank</option>
                    <option value="SBI">State Bank of India</option>
                    <option value="HDFC">HDFC Bank</option>
                    <option value="ICICI">ICICI Bank</option>
                    <option value="AXIS">Axis Bank</option>
                    <option value="KOTAK">Kotak Mahindra Bank</option>
                    <option value="PNB">Punjab National Bank</option>
                  </select>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center gap-3 text-xs text-zinc-400">
              <FaLock className="text-green-400" />
              <span>Secure payment powered by industry-standard encryption.</span>
            </div>

            <div className="flex items-center gap-3 text-2xl text-zinc-300 mt-2">
              <FaCcVisa />
              <FaCcMastercard />
              <FaCcAmex />
            </div>
          </div>

          <div className="mt-6 text-xs text-zinc-500 flex justify-between items-center">
            <Link to="/checkout/address" className="hover:text-yellow-200">
              ← Back to Address
            </Link>
          </div>
        </div>

        <div className="bg-zinc-800 rounded-2xl shadow-lg border border-zinc-700/60 p-6 md:p-8">
          <h2 className="text-lg md:text-xl font-semibold text-zinc-100 mb-4">Order Summary</h2>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {checkoutData.cart.map((item) => (
              <div key={item._id} className="flex items-center justify-between gap-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-20 rounded bg-zinc-900 overflow-hidden flex items-center justify-center">
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

          <div className="mt-4 border-t border-zinc-700 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-zinc-300">
              <span>Items ({totals.items})</span>
              <span>₹ {totals.subtotal}/-</span>
            </div>
            <div className="flex justify-between text-zinc-300">
              <span>Delivery Charges</span>
              <span>₹ {totals.delivery}/-</span>
            </div>
            <div className="flex justify-between text-zinc-100 font-semibold text-base mt-1">
              <span>Total Amount</span>
              <span>₹ {totals.total}/-</span>
            </div>
          </div>

          <button
            type="button"
            disabled={placing}
            onClick={handlePlaceOrder}
            className="mt-6 w-full bg-yellow-400 text-zinc-900 font-semibold py-2.5 rounded-full text-sm md:text-base hover:bg-yellow-300 disabled:opacity-70 disabled:cursor-not-allowed transition-colors shadow-md"
          >
            {placing ? 'Placing your order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPayment;
