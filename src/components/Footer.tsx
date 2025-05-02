import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Github as GitHub } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-purple-400">CampusClubs</span>
            </div>
            <p className="text-gray-400 mb-4">
              Connecting college clubs with students. Discover events, join communities, and make the most of your college experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-150">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-150">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-150">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-150">
                <GitHub className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition duration-150">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white transition duration-150">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-white transition duration-150">
                  Register
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-150">
                  Technology
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-150">
                  Cultural
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-150">
                  Sports
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-150">
                  Workshops
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-150">
                  Seminars
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                Email: contact@campusclubs.com
              </li>
              <li className="text-gray-400">
                Phone: +1 (123) 456-7890
              </li>
              <li className="text-gray-400">
                Address: University Campus, 
                <br />City, State 12345
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-6">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} CampusClubs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;