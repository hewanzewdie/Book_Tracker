import { BookOpenIcon, BookmarkIcon, BookIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignUpButton, SignInButton } from '@clerk/clerk-react';
import { Button } from './ui/button';

export default function HomePage() {
  return (
    <div className='bg-gray-50'>
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <img
        src="https://plus.unsplash.com/premium_photo-1681488394409-5614ef55488c?auto=format&fit=crop&q=80&ixlib=rb-4.1.0"
        alt="Library background"
        className="absolute inset-0 w-full h-full object-cover blur-xs"
      />

      <div className="flex flex-col justify-center items-center z-10 text-white space-y-5 px-5">
       <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-center">Track Your Reading Journey</h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 text-center max-w-3xl">
          Keep track of books you've read, want to read, and are currently reading. Add reviews, track progress, and organize your personal library.
        </p>
        <div className='flex flex-col md:flex-row md:space-x-5 space-y-5'>
          <SignedOut>
          <SignUpButton>
            <Button className="px-6 py-6 w-60 md:w-36 sm:px-8 sm:py-6 bg-blue-600 hover:bg-blue-700 hover:scale-110">Get Started</Button>
          </SignUpButton>
          <SignInButton>
            <Button className="px-6 py-6 w-60 md:w-36 sm:px-8 sm:py-6 bg-blue-600 hover:bg-blue-700 hover:scale-110">Login</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Link to="/mybooks" className="w-full sm:w-auto">
            <Button className="px-6 py-6 sm:px-8 sm:py-6 bg-blue-600 hover:bg-blue-700 hover:scale-110">Go to My Books</Button>
          </Link>
        </SignedIn>
        </div>
        
      </div>

    </div>
    <div className='flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8'>
     <h3 className="text-3xl md:text-4xl font-bold mt-10 mb-4 text-center">Features</h3>
<p className='text-xl text-gray-800 text-center'>Everything you need to manage your reading life in one place.</p>
       <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl my-10">
         <div className="flex flex-col items-start justify-center p-6 py-10 shadow-lg rounded-xl space-y-4 bg-white hover:shadow-2xl group transform transition-transform hover:-translate-y-1">
           <div className="rounded-full p-3 bg-blue-200 text-blue-700 group-hover:text-blue-50 group-hover:bg-blue-700 transition-colors duration-300">
             <BookOpenIcon className="p-1" size={40} />
           </div>
           <p className="text-2xl font-bold ">Track Your Books</p>
           <p className="text-gray-800 text-lg sm:text-base">
             Easily add books you're reading, want to read, or have finished to your personal library.
           </p>
           <ul className=' text-left  text-gray-600 space-y-1 mt-2'>
                      <li className='flex justify-start items-center'>        <div className="w-1.5 h-1.5 bg-blue-700 rounded-full mr-2"></div>
Organize by reading status</li>
                      <li className='flex justify-start items-center'>        <div className="w-1.5 h-1.5 bg-blue-700 rounded-full mr-2"></div>
Search and filter your collection</li>
           </ul>
         </div>
         <div className="flex flex-col items-start justify-center p-6 py-10 shadow-lg rounded-xl space-y-4 bg-white hover:shadow-2xl group transform transition-transform hover:-translate-y-1">
           <div className="rounded-full p-3 bg-green-200 text-green-700 group-hover:text-green-50 group-hover:bg-green-700 transition-colors duration-300">
             <BookmarkIcon className="p-1" size={40} />
           </div>
           <p className="text-2xl font-bold ">Track Progress</p>
           <p className="text-gray-800 text-lg sm:text-base">
             Mark your reading progress and see how far you've come in each book.
           </p>
           <ul className=' text-left text-gray-600 space-y-1 mt-2'>
                      <li className='flex justify-start items-center'>        <div className="w-1.5 h-1.5 bg-green-700 rounded-full mr-2"></div>
Update progress as you read</li>
                      <li className='flex justify-start items-center'>        <div className="w-1.5 h-1.5 bg-green-700 rounded-full mr-2"></div>
Mark books as finished</li>
           </ul>
         </div>
         <div className="flex flex-col items-start justify-center p-6 py-10 shadow-lg rounded-xl space-y-4 bg-white hover:shadow-2xl group transform transition-transform hover:-translate-y-1 md:col-span-2 lg:col-span-1">
           <div className="rounded-full p-3 bg-purple-200 text-purple-700 group-hover:text-purple-50 group-hover:bg-purple-700 transition-colors duration-300">
             <BookIcon className="p-1" size={40} />
           </div>
           <p className="text-2xl font-bold">Review & Organize</p>
           <p className="text-gray-800 text-lg">
             Leave reviews, rate books, and organize your collection into categories.
           </p>
           <ul className=' text-left text-gray-600 space-y-1 mt-2'>
                      <li className='flex justify-start items-center'>        <div className="w-1.5 h-1.5 bg-purple-700 rounded-full mr-2"></div>
Rate books with a 5-star system
</li>
                      <li className='flex justify-start items-center'>        <div className="w-1.5 h-1.5 bg-purple-700 rounded-full mr-2"></div>
Categorize by genre and topics
</li>
           </ul>
         </div>
       </div>
       </div>
      <div className="flex flex-col md:flex-row items-center md:h-96 my-10 mx-5  bg-white rounded-xl shadow-lg overflow-hidden md:m-20">
  <div className="flex flex-col justify-center space-y-6 p-6 sm:p-10 md:w-1/2">
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug">
      Your Reading Journey, <br/> Beautifully Organized
    </h2>
    <p className="text-base sm:text-lg lg:text-xl text-gray-700">
      BookTracker helps you organize your reading life with a beautiful, intuitive interface. Track your progress, add notes, and never forget a book you want to read again.
    </p>
  </div>

  <img
    className="w-full md:w-1/2 h-64 md:h-full object-cover md:rounded-r-xl md:rounded-b-none rounded-b-xl"
    src="https://images.unsplash.com/photo-1485322551133-3a4c27a9d925?auto=format&fit=crop&q=80&ixlib=rb-4.1.0"
    alt="books"
  />
</div>

       <div className='flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 md:m-20 mx-5  bg-blue-600'>
          <div className="flex flex-col space-y-4 sm:space-y-6 justify-center items-center w-full py-16 text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Start Tracking Your Reading Today</h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 text-center max-w-3xl">
              Join thousands of readers who use BookTracker to manage their reading habits.
            </p>
            <div className='flex flex-col md:flex-row md:space-x-5 space-y-5'>
              <SignedOut>
              <SignUpButton>
              <Button className="px-6 py-6 w-60 md:w-36 sm:px-8 sm:py-6 bg-blue-700 hover:bg-blue-800 border hover:scale-110">Sign Up</Button>
            </SignUpButton>
            <SignInButton>
              <Button className="px-6 py-6 w-6- md:w-36 sm:px-8 sm:py-6 bg-blue-700 hover:bg-blue-800 border hover:scale-110">Log In</Button>
            </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link to="/mybooks" className="w-full sm:w-auto">
                <Button className="px-6 py-6 sm:px-8 sm:py-6 bg-blue-700 hover:bg-blue-800 border hover:scale-110">Go to My Books</Button>
              </Link>
            </SignedIn>
            </div>
          </div>
       </div>
    </div>
  );
}
