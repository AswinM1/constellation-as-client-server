import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import search from '../assets/search.png';

function Product() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [word, setWord] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const productResponse = await axios.get('https://api.escuelajs.co/api/v1/products?offset=3&limit=20');
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

    setFilteredProducts(filtered);
  }, [word, products, selectedCategory, minPrice, maxPrice]);

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

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 p-8 border-r">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        {/* Categories List */}
        <h2 className="text-xl font-semibold mb-4">Price Range</h2>
        <div>
          <label htmlFor="minPrice" className="block">Min Price: ${minPrice}</label>
          <input
            type="range"
            id="minPrice"
            name="minPrice"
            min="0"
            max="1000"
            value={minPrice}
            onChange={handlePriceChange}
            className="w-full mb-4"
          />
        </div>
        <div>
          <label htmlFor="maxPrice" className="block">Max Price: ${maxPrice}</label>
          <input
            type="range"
            id="maxPrice"
            name="maxPrice"
            min="0"
            max="1000"
            value={maxPrice}
            onChange={handlePriceChange}
            className="w-full"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 w-full md:w-3/4">
        <h1 className="text-3xl font-semibold text-center mb-8">Our Products</h1>

        {/* Search Bar with Icon and Button */}
        <div className="mb-6 flex justify-center items-center">
          <div className="relative">
            <img
              src={search}
              alt="Search Icon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5"
            />
            <input
              type="text"
              value={word}
              onChange={handleSearch}
              placeholder="Search products..."
              className="border-2 p-2 pl-10 pr-20 rounded-lg w-80 sm:w-full"
            />
          </div>
        </div>

        {/* Display Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Product;
