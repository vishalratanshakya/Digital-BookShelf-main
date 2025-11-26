import React from 'react';

const BookFilters = ({
  filters,
  onChange,
  showSearch = false,
  showCategory = true,
  priceRange,
  onResetPrice,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  const sliderMin = priceRange && typeof priceRange.min === 'number' ? priceRange.min : 0;
  const sliderMax = priceRange && typeof priceRange.max === 'number' ? priceRange.max : 0;

  const currentMin =
    filters.minPrice === '' || filters.minPrice === null || typeof filters.minPrice === 'undefined'
      ? sliderMin
      : Number(filters.minPrice);

  const currentMax =
    filters.maxPrice === '' || filters.maxPrice === null || typeof filters.maxPrice === 'undefined'
      ? sliderMax
      : Number(filters.maxPrice);

  const handleMinPriceChange = (e) => {
    const value = Number(e.target.value);
    if (Number.isNaN(value) || sliderMax === 0) return;
    const clamped = Math.min(value, currentMax);
    onChange({ ...filters, minPrice: clamped });
  };

  const handleMaxPriceChange = (e) => {
    const value = Number(e.target.value);
    if (Number.isNaN(value) || sliderMax === 0) return;
    const clamped = Math.max(value, currentMin);
    onChange({ ...filters, maxPrice: clamped });
  };

  return (
    <div className="bg-zinc-800 rounded-lg p-4 flex flex-col md:flex-row gap-4 items-center justify-between mt-6">
      <div className="flex flex-wrap gap-3 items-center">
        <select
          name="language"
          value={filters.language}
          onChange={handleChange}
          className="bg-zinc-900 text-zinc-100 px-3 py-2 rounded outline-none text-sm"
        >
          <option value="All">All Languages</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
        </select>

        {showCategory && (
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="bg-zinc-900 text-zinc-100 px-3 py-2 rounded outline-none text-sm"
          >
            <option value="All">All Categories</option>
            <option value="Novel">Novel</option>
            <option value="Education">Education</option>
            <option value="Story">Story</option>
            <option value="Biography">Biography</option>
          </select>
        )}

        <select
          name="sort"
          value={filters.sort}
          onChange={handleChange}
          className="bg-zinc-900 text-zinc-100 px-3 py-2 rounded outline-none text-sm"
        >
          <option value="">Sort by</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        {priceRange && sliderMax > 0 ? (
          <div className="flex flex-col gap-2 w-full sm:w-auto">
            <div className="flex items-center justify-between text-xs text-zinc-300">
              <span>Price range</span>
              <span>
                ₹{currentMin} – ₹{currentMax}
              </span>
            </div>
            <div className="relative w-full sm:w-64 md:w-72">
              <input
                type="range"
                min={sliderMin}
                max={sliderMax}
                step={10}
                value={currentMin}
                onChange={handleMinPriceChange}
                className="w-full appearance-none bg-transparent cursor-pointer"
              />
              <input
                type="range"
                min={sliderMin}
                max={sliderMax}
                step={10}
                value={currentMax}
                onChange={handleMaxPriceChange}
                className="w-full appearance-none bg-transparent cursor-pointer -mt-4"
              />
            </div>
            {onResetPrice && (
              <button
                type="button"
                onClick={onResetPrice}
                className="self-start text-xs text-zinc-300 hover:text-yellow-200 underline"
              >
                Reset price
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
              placeholder="Min price"
              className="bg-zinc-900 text-zinc-100 px-3 py-2 rounded outline-none text-sm w-24"
            />
            <span className="text-zinc-400 text-sm">-</span>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
              placeholder="Max price"
              className="bg-zinc-900 text-zinc-100 px-3 py-2 rounded outline-none text-sm w-24"
            />
          </div>
        )}

        {showSearch && (
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search books..."
            className="bg-zinc-900 text-zinc-100 px-3 py-2 rounded outline-none text-sm w-40 md:w-56"
          />
        )}
      </div>
    </div>
  );
};

export default BookFilters;
