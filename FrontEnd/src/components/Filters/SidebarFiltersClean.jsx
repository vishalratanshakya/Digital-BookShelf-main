import React, { useMemo, useState } from 'react'

const SidebarFilters = ({
  filters,
  onChange,
  priceRange,
  availableCategories = [],
}) => {
  const [openSections, setOpenSections] = useState({
    languages: false,
    categories: false,
    price: false,
    sort: false,
  })
  const [activeSection, setActiveSection] = useState(null)
  const [showAllCategories, setShowAllCategories] = useState(false)

  const toggleSection = (key) => {
    if (activeSection === key) {
      // clicking the same section again closes it
      setActiveSection(null)
      setOpenSections({
        languages: false,
        categories: false,
        price: false,
        sort: false,
      })
    } else {
      setActiveSection(key)
      setOpenSections({
        languages: false,
        categories: false,
        price: false,
        sort: false,
        [key]: true,
      })
    }
  }

  const languages = ['All', 'English', 'Hindi']

  const mainCategories = [
    'Fiction',
    'Non-Fiction',
    'Academic / Study',
    'Religious & Spiritual',
    "Children's Books",
    'Poetry',
    'Comics & Graphic Novels',
    'Lifestyle',
    'Professional & Technical',
  ]

  const handleLanguageClick = (lang) => {
    const value = lang === 'All' ? 'All' : lang
    onChange({
      ...filters,
      language: value,
    })
  }

  const handleCategoryClick = (category) => {
    onChange({
      ...filters,
      category,
    })
  }

  const handleSortClick = (value) => {
    onChange({
      ...filters,
      sort: value,
    })
  }

  const allCategories = useMemo(() => {
    const set = new Set(mainCategories)
    if (availableCategories && availableCategories.length > 0) {
      availableCategories.forEach((cat) => {
        if (cat && !set.has(cat)) {
          set.add(cat)
        }
      })
    }
    return Array.from(set)
  }, [availableCategories])

  const displayedCategories = useMemo(() => {
    if (showAllCategories) return allCategories
    return allCategories.slice(0, 10)
  }, [allCategories, showAllCategories])

  const sliderMax = 1000

  const currentMax = (() => {
    const value = Number(filters.maxPrice)
    if (Number.isFinite(value) && value > 0) {
      return value > sliderMax ? sliderMax : value
    }
    return sliderMax
  })()

  const step = 50

  const handlePriceSliderChange = (e) => {
    const value = Number(e.target.value)
    if (!Number.isFinite(value) || sliderMax <= 0) return

    if (value <= 0) {
      onChange({
        ...filters,
        minPrice: '',
        maxPrice: '',
      })
    } else {
      onChange({
        ...filters,
        minPrice: 0,
        maxPrice: value,
      })
    }
  }

  const handleClearPrice = () => {
    onChange({
      ...filters,
      minPrice: '',
      maxPrice: '',
    })
  }

  const sortOptions = [
    { label: 'Newest', value: '' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Popular', value: 'popular' },
  ]

  const activeSortValue = filters.sort || ''

  return (
    <aside className="w-full bg-white text-zinc-900 p-4 flex-shrink-0">
      <div className="flex">
        {/* Left menu: sections */}
        <div className="w-40 border-r border-zinc-200 pr-2 space-y-1 text-sm font-semibold">
          <button
            type="button"
            onClick={() => toggleSection('languages')}
            className={`w-full flex items-center justify-between px-2 py-2 rounded hover:bg-zinc-100 ${
              activeSection === 'languages' ? 'text-yellow-700' : 'text-zinc-900'
            }`}
          >
            <span>Languages</span>
            <span className="text-zinc-500">&gt;</span>
          </button>

          <button
            type="button"
            onClick={() => toggleSection('categories')}
            className={`w-full flex items-center justify-between px-2 py-2 rounded hover:bg-zinc-100 ${
              activeSection === 'categories' ? 'text-yellow-700' : 'text-zinc-900'
            }`}
          >
            <span>Categories</span>
            <span className="text-zinc-500">&gt;</span>
          </button>

          <button
            type="button"
            onClick={() => toggleSection('price')}
            className={`w-full flex items-center justify-between px-2 py-2 rounded hover:bg-zinc-100 ${
              activeSection === 'price' ? 'text-yellow-700' : 'text-zinc-900'
            }`}
          >
            <span>Price</span>
            <span className="text-zinc-500">&gt;</span>
          </button>

          <button
            type="button"
            onClick={() => toggleSection('sort')}
            className={`w-full flex items-center justify-between px-2 py-2 rounded hover:bg-zinc-100 ${
              activeSection === 'sort' ? 'text-yellow-700' : 'text-zinc-900'
            }`}
          >
            <span>Sort By</span>
            <span className="text-zinc-500">&gt;</span>
          </button>
        </div>

        {/* Right panel: active section content */}
        <div className="flex-1 pl-4">
          {activeSection === 'languages' && (
            <div>
              <h5 className="text-sm font-semibold text-zinc-900 mb-2">Languages</h5>
              <ul className="space-y-1 text-sm">
                {languages.map((lang) => (
                  <li key={lang}>
                    <button
                      type="button"
                      onClick={() => handleLanguageClick(lang)}
                      className={`w-full text-left px-2 py-1 rounded hover:bg-zinc-100 ${
                        filters.language === lang || (lang === 'All' && filters.language === 'All')
                          ? 'text-yellow-700 font-semibold'
                          : 'text-zinc-700'
                      }`}
                    >
                      {lang === 'All' ? 'All Languages' : lang}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeSection === 'categories' && (
            <div>
              <h5 className="text-sm font-semibold text-zinc-900 mb-2">Categories</h5>
              <ul className="space-y-1 text-sm text-zinc-700">
                <li>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick('All')}
                    className={`w-full text-left px-2 py-1 rounded hover:bg-zinc-100 ${
                      filters.category === 'All' ? 'text-yellow-700 font-semibold' : ''
                    }`}
                  >
                    All Categories
                  </button>
                </li>
                {displayedCategories.map((cat) => (
                  <li key={cat}>
                    <button
                      type="button"
                      onClick={() => handleCategoryClick(cat)}
                      className={`w-full text-left px-2 py-1 rounded hover:bg-zinc-100 ${
                        filters.category === cat ? 'text-yellow-700 font-semibold' : ''
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
              {allCategories.length > 10 && (
                <button
                  type="button"
                  onClick={() => setShowAllCategories((prev) => !prev)}
                  className="mt-2 text-xs text-zinc-500 hover:text-yellow-700 underline"
                >
                  {showAllCategories ? 'Show Less' : 'View All Categories'}
                </button>
              )}
            </div>
          )}

          {activeSection === 'price' && (
            <div>
              <h5 className="text-sm font-semibold text-zinc-900 mb-2">Price</h5>
              <p className="text-xs text-zinc-700 mb-3">
                ₹0 - ₹{currentMax}
              </p>
              {sliderMax > 0 && (
                <>
                  <input
                    type="range"
                    min={0}
                    max={sliderMax}
                    step={step}
                    value={currentMax}
                    onChange={handlePriceSliderChange}
                    className="w-full cursor-pointer accent-yellow-400"
                  />
                  <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                    <span>₹0</span>
                    <span>₹{sliderMax}</span>
                  </div>
                  {filters.maxPrice && (
                    <button
                      type="button"
                      onClick={handleClearPrice}
                      className="mt-3 inline-flex items-center px-3 py-1 rounded border border-zinc-300 text-xs text-zinc-700 hover:bg-zinc-100"
                    >
                      Clear price filter
                    </button>
                  )}
                </>
              )}
            </div>
          )}

          {activeSection === 'sort' && (
            <div>
              <h5 className="text-sm font-semibold text-zinc-900 mb-2">Sort By</h5>
              <ul className="space-y-1 text-sm text-zinc-700">
                {sortOptions.map((option) => (
                  <li key={option.label}>
                    <button
                      type="button"
                      onClick={() => handleSortClick(option.value)}
                      className={`w-full text-left px-2 py-1 rounded hover:bg-zinc-100 ${
                        activeSortValue === option.value ? 'text-yellow-700 font-semibold' : ''
                      }`}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

export default SidebarFilters
