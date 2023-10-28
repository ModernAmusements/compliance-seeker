// components/Navbar.tsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';  // Import the Link component at the top of your file

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
	  <div className="text-white text-2xl font-bold">
		<Link href="/">
			Compliance Seeker
		</Link>
		</div>
        <div className="hidden md:flex space-x-4">
          <a href="#" className="text-white">Home</a>
          <a href="#" className="text-white">About</a>
          <a href="#" className="text-white">Contact</a>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
		  	<FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-700 p-2">
          <a href="#" className="block text-white py-2">Home</a>
          <a href="#" className="block text-white py-2">About</a>
          <a href="#" className="block text-white py-2">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
