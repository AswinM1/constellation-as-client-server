import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from './redux/cartActions';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, images, price, id, description } = product;
  const productImage = images[0] || 'https://via.placeholder.com/300';

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent card click navigation
    dispatch(addToCart(product));
  };

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div 
      className="group relative border border-white/10 rounded-xl overflow-hidden 
                 bg-white/5 backdrop-blur-md transition-all duration-300 
                 hover:border-white/20 hover:shadow-xl transform hover:-translate-y-2"
      onClick={handleClick}
    >
   
      <div className="relative overflow-hidden">
        <img
          src={productImage}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
   
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
            View Details
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow space-y-2">
        <h3 className="text-sm font-semibold text-white/80 truncate">{title}</h3>
        <p className="text-xs text-white/60 line-clamp-2">{description}</p>
        
      
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-white/90">${price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 text-xs font-semibold 
                       border border-white/30 rounded-full
                       bg-white/10 backdrop-blur-md
                       hover:bg-white/20 transition-all duration-300
                       flex items-center justify-center"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;