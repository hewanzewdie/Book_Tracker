// src/Components/Navbar.tsx
import { BookOpenIcon, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, SignOutButton } from '@clerk/clerk-react';
import { Button } from './ui/button';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="py-3 px-4 sm:px-6 lg:px-8 flex w-full justify-between items-center shadow bg-white">
        <Link to="/" className="flex space-x-2 sm:space-x-5 items-center">
          <BookOpenIcon className="text-blue-700" size={24} />
          <p className="font-bold text-lg sm:text-xl lg:text-2xl text-blue-700">BookTracker</p>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center space-x-4 lg:space-x-5">
          <SignedOut>
            <div className="flex items-center space-x-4 lg:space-x-5">
              <SignInButton>
                <Button>Sign in</Button>
              </SignInButton>
              <SignUpButton>
                <Button variant="secondary">Sign up</Button>
              </SignUpButton>
            </div>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center space-x-4 lg:space-x-5">
              <Link to="/mybooks" className="hover:underline transition-colors">My Books</Link>
              <Link to="/addbook" className="hover:underline transition-colors">Add Book</Link>
              <UserButton />
              <SignOutButton signOutOptions={{ redirectUrl: '/' }}>
                <Button variant="destructive">Logout</Button>
              </SignOutButton>
            </div>
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="sm:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="sm:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Menu</h3>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <SignedOut>
                <div className="space-y-3">
                  <SignInButton>
                    <button
                      onClick={toggleMobileMenu}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      Login
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button
                      onClick={toggleMobileMenu}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              </SignedOut>
              <SignedIn>
                <div className="space-y-3">
                  <Link
                    to="/mybooks"
                    onClick={toggleMobileMenu}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    My Books
                  </Link>
                  <Link
                    to="/addbook"
                    onClick={toggleMobileMenu}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    Add Book
                  </Link>
                  <SignOutButton signOutOptions={{ redirectUrl: '/' }}>
                    <button
                      onClick={toggleMobileMenu}
                      className="block w-full text-left px-4 py-2 text-red-700 hover:bg-red-50 rounded-md transition-colors"
                    >
                      Logout
                    </button>
                  </SignOutButton>
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </>
  );
}