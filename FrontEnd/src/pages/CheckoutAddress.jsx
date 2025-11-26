import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const indianStates = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Puducherry',
];

const CheckoutAddress = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    mobile: '',
    email: '',
    address1: '',
    address2: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    altMobile: '',
    addressType: 'Home',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Ensure cart exists for checkout
    try {
      const stored = localStorage.getItem('checkoutCart');
      if (!stored) {
        navigate('/cart');
        return;
      }
    } catch (error) {
      console.log(error);
    }

    // Prefill from saved address if present
    try {
      const saved = localStorage.getItem('checkoutAddress');
      if (saved) {
        const parsed = JSON.parse(saved);
        setForm((prev) => ({ ...prev, ...parsed }));
      }
    } catch (error) {
      console.log(error);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = 'Full Name is required';

    if (!form.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(form.mobile.trim())) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number';
    }

    if (!form.address1.trim()) newErrors.address1 = 'Address Line 1 is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.state.trim()) newErrors.state = 'State is required';

    if (!form.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^[0-9]{6}$/.test(form.pincode.trim())) {
      newErrors.pincode = 'Enter a valid 6-digit pincode';
    }

    if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim())) {
      newErrors.email = 'Enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      localStorage.setItem('checkoutAddress', JSON.stringify(form));
    } catch (error) {
      console.log(error);
    }

    navigate('/checkout/payment');
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 px-4 md:px-10 py-8">
      <div className="max-w-3xl mx-auto bg-zinc-800 rounded-2xl shadow-lg border border-zinc-700/60 p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-yellow-100 mb-2">Delivery Address</h1>
        <p className="text-sm text-zinc-400 mb-6">
          Please provide your delivery details. You can review everything before placing the order.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-400"
              />
              {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm mb-1">Mobile Number *</label>
              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-400"
              />
              {errors.mobile && <p className="text-xs text-red-400 mt-1">{errors.mobile}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-400"
              />
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1">Alternate Mobile Number</label>
              <input
                type="tel"
                name="altMobile"
                value={form.altMobile}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Address Line 1 *</label>
            <input
              type="text"
              name="address1"
              value={form.address1}
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-400"
            />
            {errors.address1 && <p className="text-xs text-red-400 mt-1">{errors.address1}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Address Line 2</label>
              <input
                type="text"
                name="address2"
                value={form.address2}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-400"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Landmark</label>
              <input
                type="text"
                name="landmark"
                value={form.landmark}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-1">City *</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-400"
              />
              {errors.city && <p className="text-xs text-red-400 mt-1">{errors.city}</p>}
            </div>

            <div>
              <label className="block text-sm mb-1">State *</label>
              <select
                name="state"
                value={form.state}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-400"
              >
                <option value="">Select State</option>
                {indianStates.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
              {errors.state && <p className="text-xs text-red-400 mt-1">{errors.state}</p>}
            </div>

            <div>
              <label className="block text-sm mb-1">Pincode *</label>
              <input
                type="text"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-400"
              />
              {errors.pincode && <p className="text-xs text-red-400 mt-1">{errors.pincode}</p>}
            </div>
          </div>

          <div>
            <span className="block text-sm mb-2">Address Type</span>
            <div className="flex flex-wrap gap-4 text-sm">
              {['Home', 'Office', 'Other'].map((type) => (
                <label key={type} className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="addressType"
                    value={type}
                    checked={form.addressType === type}
                    onChange={handleChange}
                    className="text-yellow-400 focus:ring-0"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <Link
              to="/cart"
              className="text-sm text-zinc-300 hover:text-yellow-200"
            >
              ← Back to Cart
            </Link>

            <button
              type="submit"
              className="w-full md:w-auto bg-yellow-400 text-zinc-900 font-semibold px-6 py-2.5 rounded-full text-sm md:text-base hover:bg-yellow-300 transition-colors shadow-md"
            >
              Continue to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutAddress;
