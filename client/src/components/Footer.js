import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Real Soccer</h3>
            <p>Your ultimate soccer platform</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
              <li><Link to="/about" className="hover:text-gray-300">About</Link></li>
              <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">Facebook</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">Twitter</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2023 Real Soccer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
