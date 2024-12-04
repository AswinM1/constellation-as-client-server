import React from 'react';
 // Use your logo here

function Footer() {
  return (
    <div className="bg-black text-white py-16">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side - Logo and Text */}
        <div className="flex items-center space-x-4 justify-center ">
        
          <span className="text-4xl font-semibold ml-20">Unlock The fashion in  You</span>
        </div>

        {/* Right Side - Links */}
        <div className="flex  mr-20 ">  
          <ul>
            <li><a href="/about" className="hover:text-blue-400 text-2xl py-2">About fashion18</a></li>
            <li><a href="/career-collection" className="hover:text-blue-400 py-6 text-2xl mb-10">Career Collection</a></li>
            <li><a href="/career-test" className="hover:text-blue-400 py-6 text-2xl mb-10">Career </a></li>
            <li><a href="/pricing" className="hover:text-blue-400 py-6 text-2xl mb-10">shops</a></li>
            <li><a href="/faq" className="hover:text-blue-400 py-6 text-2xl mb-10">FAQ</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-lg mt-8">
        <p>© 2022, fashion18. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
