import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from './redux/cartActions';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { title, images, price, id } = product;
  const productImage = images[0] || 'https://via.placeholder.com/300';

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="border overflow-hidden w-full flex flex-col hover:scale-110 transition-transform">
      <img src={productImage} alt="Product Image" className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-lg font-bold text-gray-600 mt-2">${price}</p>
        <div className="mt-auto flex justify-between gap-4">
          <button
            onClick={handleAddToCart}
            className="bg-black text-white py-2 px-4 rounded-lg hover:opacity-80"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
