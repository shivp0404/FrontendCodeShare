import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Homepage = () => {
  const [showText, setShowText] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [showCatchphrase, setShowCatchphrase] = useState(false);

  useEffect(() => {
  
    setTimeout(() => {
      setShowText(true);
      setTimeout(() => {
      
        setShowNavbar(true);
      }, 1500); 
      setTimeout(() => {
       
        setShowCatchphrase(true);
      }, 2500); 
    }, 1000); 
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative bg-black">
     
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ease-in-out ${showText ? 'opacity-0' : 'opacity-100'}`}
      >
        {/* CodeShare Text Animation (from bottom) */}
        <h1
          className={`text-[8vw] font-bold text-white transition-all duration-1000 ${
            showText ? 'transform translate-y-[-100px]' : 'opacity-100'
          }`}
        >
          <span className="text-[var(--primary-color)]">Code</span>
          <span className="text-accent">Share</span>
        </h1>
      </div>

     
      <div
        className={`relative z-[1] inset-x-0 top-0 transition-all duration-1000 ${showNavbar ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-[-100px]'}`}
      >
        <Navbar />   
      </div>

   
      <div
        className={`absolute h-[90vh]  inset-0 flex flex-col items-center justify-center text-white transition-opacity duration-1000 ${showCatchphrase ? 'opacity-100' : 'opacity-0'}`}
      >
        <h6 className="text-[10vw] font-mono text-[var(--primary-color)]">Code<span className=' font-mono text-accent'>Share</span></h6>
        <p className="text-center text-[4vw] mb-4 text-[var(--accent-color)]">
          Empower Your Code,<span className='text-white'> Share Your Knowledge.</span>
        </p>
       <button className="bg-[var(--accent-color)] text-lg text-white px-8 py-4  rounded-md hover:bg-[var(--primary-color)] transition-colors duration-300">
       <Link
          to="/login"
        >
          Get Started
        </Link>
       </button>
      </div>

  
    </div>
  );
};

export default Homepage;
