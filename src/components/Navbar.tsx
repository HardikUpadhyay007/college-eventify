import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, PlusCircle } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-purple-700">CampusClubs</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-700 hover:bg-gray-50 transition duration-150">
              Home
            </Link>
            
            {isAuthenticated ? (
              <>
                {user?.isClubOwner && (
                  <Link to="/create-event" className="px-3 py-2 rounded-md text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition duration-150 flex items-center">
                    <PlusCircle className="w-4 h-4 mr-1" />
                    Create Event
                  </Link>
                )}
                <div className="relative group">
                  <button className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-700 hover:bg-gray-50 transition duration-150">
                    <User className="w-4 h-4 mr-1" />
                    {user?.username}
                  </button>
                  <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-1 z-50">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Profile
                    </Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-700 hover:bg-gray-50 transition duration-150">
                  Login
                </Link>
                <Link to="/register" className="px-3 py-2 rounded-md text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition duration-150">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-700 hover:bg-gray-50 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-700 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>

            {isAuthenticated ? (
              <>
                {user?.isClubOwner && (
                  <Link to="/create-event" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-purple-600 hover:bg-purple-700 flex items-center" onClick={() => setIsMenuOpen(false)}>
                    <PlusCircle className="w-4 h-4 mr-1" />
                    Create Event
                  </Link>
                )}
                <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-700 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                  <User className="w-4 h-4 inline mr-1" />
                  Profile
                </Link>
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-700 hover:bg-gray-50">
                  <LogOut className="w-4 h-4 inline mr-1" />
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-700 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-purple-600 hover:bg-purple-700" onClick={() => setIsMenuOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;