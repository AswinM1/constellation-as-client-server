import React from 'react';
 // Use your logo here

function Footer() {
  return (
    <div className="bg-black text-white py-1">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side - Logo and Text */}
        <div className="flex items-center space-x-4 justify-center ">
        
          <span className="text-2xl font-semibold ml-20 tracking-tighter ">Unlock The fashion in  You</span>
        </div>

        {/* Right Side - Links */}
        <div className="flex  mr-20 ">  
          <ul>
            <li><a href="/about" className="hover:text-blue-400 text-xl py-2  opacity-70">About</a></li>
            <li><a href="/career-collection" className="hover:text-blue-400 py-6 text-xl mb-10  opacity-70">Careers</a></li>
            <li><a href="/career-test" className="hover:text-blue-400 py-6 text-xl mb-10  opacity-70">Career </a></li>
            <li><a href="/pricing" className="hover:text-blue-400 py-6 text-xl mb-10  opacity-70">shops</a></li>
            <li><a href="/faq" className="hover:text-blue-400 py-6 text-xl mb-10  opacity-70">FAQ</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-sm  mt-8 opacity-30 ">
        <p>© 2022, fashion18. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
