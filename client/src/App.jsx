import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Signin from './components/Signin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Product from './components/Product';

 // Make sure to import ThemeContext

import Admin from './components/Admin';
import Cart from './components/Cart';

function App() {
 // Destructure the values from ThemeContext
  
  return (
    <div > 
       {/* Apply the theme class to the div */}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Product />} />
      
        <Route path="/admin" element={<Admin></Admin>} />
        <Route path="/cart" element={<Cart></Cart>} />
      </Routes>

      <Navbar />
      <Footer />
    </div>
  );
}

export default App;
