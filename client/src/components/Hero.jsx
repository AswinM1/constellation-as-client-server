import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SigninContext } from './SigninContext'; // Import SigninContext
import home from '../assets/home.png';
import stu from '../assets/bag.gif';
import axios from 'axios';
import bg from '../assets/home.png';

function Hero() {
  const { signIn } = useContext(SigninContext); // Get the signIn status from context
  const navigate = useNavigate(); // For navigating to different pages

  const [st, setSt] = useState([]); // To store the fetched products

  useEffect(() => {
    const handleRes = async () => {
      try {
        const res = await axios.get('https://api.escuelajs.co/api/v1/products?offset=1&limit=8');
        setSt(res.data); // Update the state with the fetched products
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    handleRes();
  }, []);

  const cards = [
    { title: '1. Answer A Series of Questions', description: 'Take the assessment and get your career matches, personality archetype, and more along the way', image: stu },
    { title: '2. Discover What Makes You', description: 'Find out what makes you stand apart from other and why certain careers are great fits for you.', image: stu },
    { title: '3. Explore The World of School and Work', description: 'Find all the information you need to know about your dream career. Then make a plan to get there', image: stu },
  ];

  const testimonials = [
    { name: 'Emily Clark', text: 'I absolutely love my new dress! The fit is perfect, and the fabric feels amazing. Highly recommend!' },
    { name: 'Sarah Johnson', text: 'This was my first purchase, and I’m so impressed with the quality and design. I’ll definitely be back for more!' },
    { name: 'Olivia Williams', text: 'The dress I bought was even more beautiful in person! Shipping was fast, and I couldn’t be happier with my purchase.' },
    { name: 'Olivia Williams', text: 'The dress I bought was even more beautiful in person! Shipping was fast, and I couldn’t be happier with my purchase.' },
  ];

  const handleGetStarted = () => {
    if (signIn) {
      // If signed in, navigate to the products page
      navigate('/products');
    } else {
      // If not signed in, navigate to the sign-in page
      navigate('/signin');
    }
  };

  // Handle newsletter subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value; // Get the email from the form

    if (email) {
      alert(`Thanks for subscribing with email: ${email}`);
      // Here you can send the email to your backend or use a service like Mailchimp to handle the subscription
    }
  };

  // Handle image load error
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300'; // Default fallback image
  };

  return (
    <div className="flex flex-col justify-center items-center h-auto bg-white text-center mt-10 overflow-x-hidden min-w-[320px] sm:min-w-[375px] md:min-w-[768px]">
      <div
        className="md:text-8xl sm:text-7xl lg:text-9xl mt-20 mb-8"
        style={{
          fontFamily: 'Cormant',
          lineHeight: '1.2',
          width: '100%',
          maxWidth: '1000px',
          fontSize: 'calc(5rem + 0vw)',
           // Makes the font responsive
        }}
      >
        Wear What matters, not just anything
      </div>
      <div
        className="text-3xl sm:text-2xl mb-8"
        style={{
          fontFamily: 'Cormant',
          width: '80%', // Ensures that the text container doesn't stretch too much on large screens
          maxWidth: '600px',
          fontSize: 'calc(1rem + 1vw)', // Makes the font responsive
        }}
      >
        Our collection is designed for those who seek a perfect blend of style, comfort, and confidence.
      </div>

      {/* Button */}
      <div
        className="text-lg sm:text-2xl bg-black text-white px-6 py-3 rounded hover:bg-opacity-80 cursor-pointer mb-12"
        onClick={handleGetStarted}
      >
        Get Started
      </div>

      {/* Top Products Section */}
      <div className="text-4xl sm:text-5xl md:text-6xl leading-tight mb-10 text-center w-full mt-40" style={{ fontFamily: 'Cormant' }}>
        Made For You
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 px-5 justify-center items-center w-full">
          {st.map((product, index) => (
            <div key={index} className="bg-white relative group overflow-hidden">
              {/* Product Image */}
              <img
                src={product.images[0]}
                alt={product.title}
                onError={handleImageError}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundPosition: 'cover' }}
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300"></div>
              {/* Buy Now Button */}
              <button className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black text-xl sm:text-2xl text-white px-6 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-40">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* New Collections Section */}
      <div
        className="mt-0 w-full h-80 justify-center items-center opacity-100"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <p
          className="text-4xl sm:text-5xl md:text-6xl text-white mb-30 mt-40 hover:scale-110 cursor-pointer transition-transform"
          style={{ fontFamily: 'Cormant', color: 'white', fontWeight: 'bolder' }}
        >
          New Collections at 20% off
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-2 mt-10 px-10 gap-2 justify-center items-center w-full">
        {st.map((product, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg relative group overflow-hidden">
            {/* Product Image */}
            <img
              src={product.images[0]}
              alt={product.title}
              onError={handleImageError}
              className="w-full h-40 object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300"></div>
            {/* Button */}
            <button className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              View More
            </button>
          </div>
        ))}
      </div>

      {/* Newsletter Section */}
      <div className="w-full bg-gray-200 py-10 mt-16">
        <div className="text-2xl sm:text-3xl mb-6 font-[cormant]">Subscribe to Our Newsletter</div>
        <form onSubmit={handleSubscribe} className="flex flex-col items-center">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="p-4 text-lg sm:text-xl rounded-lg w-80 mb-4 border-2 border-gray-400"
            required
          />
          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-opacity-80"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}

export default Hero;
