import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { SigninContext } from './SigninContext';
import { useSelector } from 'react-redux';
import cart from '../assets/cart.png';

function Navbar() {
  const { signIn, userName, handleSignOut } = useContext(SigninContext);
  const nav = useNavigate();

  const cartItems = useSelector(state => state.cartItems);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // State to manage hamburger menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the hamburger menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="text-1xl w-full h-16 flex items-center justify-between px-4 font-sans fixed top-0 bg-white shadow-md z-10">
      <div className="text-black font-bold ml-10 font-serif">Constellations</div>

      {/* Hamburger button for mobile */}
      <div className="block lg:hidden">
        <button onClick={toggleMenu} className="text-black">
          ☰
        </button>
      </div>

      {/* Desktop menu */}
      <div className="hidden lg:flex space-x-6">
        <ul className="flex space-x-6 text-black mr-20">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-800 font-semibold cursor-pointer scale-110 transition-transform'
                  : 'hover:text-blue-800 font-semibold cursor-pointer hover:scale-110 transition-transform'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-800 font-semibold cursor-pointer scale-110 transition-transform'
                  : 'hover:text-blue-800 font-semibold cursor-pointer hover:scale-110 transition-transform'
              }
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? 'font-semibold flex w-7 scale-110 transition-transform'
                  : 'cursor-pointer font-semibold flex w-7 hover:scale-110 transition-transform'
              }
            >
              <div className="relative">
                <img src={cart} alt="Cart" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            </NavLink>
          </li>
          <li>
            {signIn ? (
              <div className="flex items-center">
                <span className="font-semibold">Welcome Back</span>
                <button
                  onClick={() => {
                    handleSignOut();
                    nav("/signin");
                  }}
                  className="bg-black text-white font-semibold py-1 px-4 rounded hover:bg-black transition duration-300 ml-7"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <NavLink to="/signin">
                <button className="bg-black text-white font-semibold py-1 px-6 rounded hover:opacity-80 transition duration-300">
                  Sign In
                </button>
              </NavLink>
            )}
          </li>
        </ul>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} absolute top-16 left-0 w-full bg-white shadow-md z-20`}
      >
        <ul className="flex flex-col items-center space-y-6 py-4 text-black">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-800 font-semibold cursor-pointer scale-110 transition-transform'
                  : 'hover:text-blue-800 font-semibold cursor-pointer hover:scale-110 transition-transform'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-800 font-semibold cursor-pointer scale-110 transition-transform'
                  : 'hover:text-blue-800 font-semibold cursor-pointer hover:scale-110 transition-transform'
              }
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? 'font-semibold flex w-7 scale-110 transition-transform'
                  : 'cursor-pointer font-semibold flex w-7 hover:scale-110 transition-transform'
              }
            >
              <div className="relative">
                <img src={cart} alt="Cart" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            </NavLink>
          </li>
          <li>
            {signIn ? (
              <div className="flex items-center">
                <span className="font-semibold">Welcome Back</span>
                <button
                  onClick={() => {
                    handleSignOut();
                    nav("/signin");
                  }}
                  className="bg-black text-white font-semibold py-1 px-4 rounded hover:bg-black transition duration-300 ml-7"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <NavLink to="/signin">
                <button className="bg-black text-white font-semibold py-1 px-6 rounded hover:opacity-80 transition duration-300">
                  Sign In
                </button>
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
