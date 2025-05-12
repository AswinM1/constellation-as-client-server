import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from './redux/cartActions';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-white/60">Loading product...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-16">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <img
              src={product.images[selectedImage]}
              alt={`Product image ${selectedImage + 1}`}
              className="w-full h-[500px] object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 
                  ${selectedImage === idx 
                    ? 'border-white' 
                    : 'border-white/10 opacity-60 hover:opacity-100'}`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-between space-y-8">
          {/* Title and Description */}
          <div>
            <h1 className="text-4xl font-bold mb-4 tracking-tight">{product.title}</h1>
            <p className="text-white/70 mb-6 leading-relaxed">{product.description}</p>

            {/* Price */}
            <div className="mb-8">
              <span className="text-3xl font-bold text-white">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Category */}
            <div className="mb-8 flex items-center space-x-4 bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-white/20">
                <img
                  src={product.category.image}
                  alt={product.category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-white/60 text-xs mb-1">Category</p>
                <p className="font-semibold">{product.category.name}</p>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => dispatch(addToCart(product))}
            className="w-full py-4 text-sm font-semibold 
                       border border-white/30 rounded-full
                       bg-white/10 backdrop-blur-md
                       hover:bg-white/20 transition-all duration-300
                       flex items-center justify-center space-x-2"
          >
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;