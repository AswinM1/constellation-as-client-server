import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // To navigate user to another page

function Cart({ signIn }) {
  const cartItems = useSelector(state => state.cartItems); // Get the cart items from Redux store
  const [paymentSuccess, setPaymentSuccess] = useState(null); // State to track payment success
  const navigate = useNavigate(); // Use navigate to redirect if needed

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const handlePayment = () => {
    if (!signIn) {
      // If not signed in, show message and possibly redirect to sign-in page
      alert("Please sign in to complete the payment.");
      navigate("/signin"); // Optional: Redirect to sign-in page if not signed in
    } else {
      // Simulate payment process and show success
      setPaymentSuccess(true);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cartItems.map(item => (
              <li key={item.id} className="flex justify-between items-center border-b pb-4">
                <img src={item.images[0]} alt={item.title} className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex flex-col ml-4 flex-grow">
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  <p className="text-gray-600">${item.price}</p>
                  <div className="flex items-center mt-2">
                    <span className="mx-2">Quantity: {item.quantity}</span>
                  </div>
                </div>
                <div className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Total: ${totalAmount}</h3>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold">Checkout</h3>
            <div className="flex flex-col mt-4 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700">Payment Method</label>
                <select className="w-full mt-2 p-2 border border-gray-300 rounded-lg">
                  <option value="credit-card">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank-transfer">Bank Transfer</option>
                </select>
              </div>

              <div className="mt-4">
                <button
                  onClick={handlePayment}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {paymentSuccess !== null && (
        <div className="mt-6 text-center">
          {paymentSuccess ? (
            <p className="text-green-600 font-semibold text-lg">Payment Successful! Thank you for your purchase.</p>
          ) : (
            <p className="text-red-600 font-semibold text-lg">Please sign in to complete the payment.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;
