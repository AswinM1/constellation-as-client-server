import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

function Product() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [word, setWord] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const productResponse = await axios.get('https://api.escuelajs.co/api/v1/products');
        const categoryResponse = await axios.get('https://api.escuelajs.co/api/v1/categories');
        
        setProducts(productResponse.data);
        setFilteredProducts(productResponse.data);
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error('Error fetching products or categories:', error);
      }
    };
    fetchProductsAndCategories();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (word) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(word.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((product) =>
        product.category?.id === selectedCategory
      );
    }

    filtered = filtered.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    if (sortBy === 'lowToHigh') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'highToLow') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [word, products, selectedCategory, minPrice, maxPrice, sortBy]);

  const handleSearch = (e) => {
    setWord(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    if (name === 'minPrice') {
      setMinPrice(value);
    } else if (name === 'maxPrice') {
      setMaxPrice(value);
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="min-h-screen bg-black text-white flex mt-10">
      {/* Sidebar */}
      <div className="w-1/4 p-8 border-r border-white/10 bg-white/5 backdrop-blur-md">
        <div className="space-y-8">
          {/* Categories Filter */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-white/90">Categories</h2>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-xl 
                         text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <option value="" className="bg-black text-white">All Categories</option>
              {categories.map((category) => (
                <option 
                  key={category.id} 
                  value={category.id} 
                  className="bg-black text-white"
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-white/90">Price Range</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm text-white/70">
                  Min Price: ${minPrice}
                </label>
                <input
                  type="range"
                  name="minPrice"
                  min="0"
                  max="1000"
                  value={minPrice}
                  onChange={handlePriceChange}
                  className="w-full h-2 bg-white/20 rounded-full 
                             appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm text-white/70">
                  Max Price: ${maxPrice}
                </label>
                <input
                  type="range"
                  name="maxPrice"
                  min="0"
                  max="1000"
                  value={maxPrice}
                  onChange={handlePriceChange}
                  className="w-full h-2 bg-white/20 rounded-full 
                             appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Sort By */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-white/90">Sort By</h2>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-xl 
                         text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <option value="" className="bg-black text-white">Select Sort</option>
              <option value="lowToHigh" className="bg-black text-white">
                Price: Low to High
              </option>
              <option value="highToLow" className="bg-black text-white">
                Price: High to Low
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <h1 className="text-4xl font-bold text-center mb-12 tracking-tight">
            Explore Our Collection
          </h1>

          {/* Search Bar */}
          <div className="mb-12 max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={word}
                onChange={handleSearch}
                placeholder="Search products..."
                className="w-full p-4 pl-6 pr-6 rounded-full 
                           bg-white/10 border border-white/20 
                           text-white placeholder-white/50 
                           focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="absolute right-6 top-1/2 transform -translate-y-1/2 
                           w-6 h-6 text-white/50"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* No Results State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/60 text-xl">No products found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;