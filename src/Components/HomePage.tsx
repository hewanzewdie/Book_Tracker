// src/Components/HomePage.tsx
import { BookOpenIcon, BookmarkIcon, BookIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignUpButton } from '@clerk/clerk-react';
import { Button } from './ui/button';

export default function HomePage() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col space-y-4 sm:space-y-6 justify-center items-center w-full max-w-4xl py-16 sm:py-24 lg:py-36 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">Track Your Reading Journey</h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-500 text-center max-w-3xl">
          Keep track of books you've read, want to read, and are currently reading. Add reviews, track progress, and organize your personal library.
        </p>
        <SignedOut>
          <SignUpButton>
            <Button className="px-6 py-6 sm:px-8 sm:py-6 bg-blue-600 hover:bg-blue-700">Get Started</Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <Link to="/mybooks" className="w-full sm:w-auto">
            <Button className="px-6 py-6 sm:px-8 sm:py-6 bg-blue-600 hover:bg-blue-700">Go to My Books</Button>
          </Link>
        </SignedIn>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold my-8 sm:my-10 text-center">Features</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mb-16">
        <div className="flex flex-col items-center justify-center p-6 py-10 shadow-lg rounded-xl space-y-4 bg-white hover:shadow-2xl group transition-shadow duration-300">
          <div className="rounded-full p-3 bg-blue-200 text-blue-700 group-hover:text-blue-50 group-hover:bg-blue-700 transition-colors duration-300">
            <BookOpenIcon className="p-1" size={40} />
          </div>
          <p className="text-lg font-semibold text-center">Track Your Books</p>
          <p className="text-gray-500 text-center text-sm sm:text-base">
            Easily add books you're reading, want to read, or have finished to your personal library.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-6 py-10 shadow-lg rounded-xl space-y-4 bg-white hover:shadow-2xl group transition-shadow duration-300">
          <div className="rounded-full p-3 bg-green-200 text-green-700 group-hover:text-green-50 group-hover:bg-green-700 transition-colors duration-300">
            <BookmarkIcon className="p-1" size={40} />
          </div>
          <p className="text-lg font-semibold text-center">Track Progress</p>
          <p className="text-gray-500 text-center text-sm sm:text-base">
            Mark your reading progress and see how far you've come in each book.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-6 py-10 shadow-lg rounded-xl space-y-4 bg-white hover:shadow-2xl group transition-shadow duration-300 md:col-span-2 lg:col-span-1">
          <div className="rounded-full p-3 bg-purple-200 text-purple-700 group-hover:text-purple-50 group-hover:bg-purple-700 transition-colors duration-300">
            <BookIcon className="p-1" size={40} />
          </div>
          <p className="text-lg font-semibold text-center">Review & Organize</p>
          <p className="text-gray-500 text-center text-sm sm:text-base">
            Leave reviews, rate books, and organize your collection into categories.
          </p>
        </div>
      </div>

      <SignedOut>
        <div className="flex flex-col space-y-4 sm:space-y-6 justify-center items-center w-full max-w-4xl py-16 sm:py-24 lg:py-36 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold">Start Tracking Your Reading Today</h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-500 text-center max-w-3xl">
            Join thousands of readers who use BookTracker to manage their reading habits.
          </p>
          <SignUpButton>
            <Button className="px-6 py-6 sm:px-8 sm:py-6 bg-blue-600 hover:bg-blue-700">Sign Up</Button>
          </SignUpButton>
        </div>
      </SignedOut>
    </div>
  );
}