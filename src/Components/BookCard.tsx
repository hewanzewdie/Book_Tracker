// src/Components/BookCard.tsx
import { BookOpenIcon, EditIcon, StarIcon, TrashIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Book } from './types/Book';
import { Button } from './ui/button';

interface BookCardProps {
  book: Book;
  onEdit?: (book: Book) => void;
  onDelete?: (bookId: string) => void;
}

export default function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        className={`${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} w-4 h-4 sm:w-5 sm:h-5`}
      />
    ));
  };

  const getStatusColor = (status: Book['status']) => {
    switch (status) {
      case 'finished':
        return 'text-green-600 bg-green-100';
      case 'currentlyreading':
        return 'text-blue-600 bg-blue-100';
      case 'wanttoread':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="flex flex-col border shadow-sm rounded-xl p-3 sm:p-4 lg:p-5 space-y-2 h-full hover:shadow-lg transition-shadow duration-200 justify-center">
      <div className="flex justify-between items-start gap-2">
        <p className="text-base sm:text-lg font-bold line-clamp-2 flex-1">{book.title}</p>
        <p className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(book.status)} whitespace-nowrap flex-shrink-0`}>
          {book.status === 'wanttoread' ? 'Want to Read' : book.status === 'currentlyreading' ? 'Reading' : 'Finished'}
        </p>
      </div>
      <p className="text-sm sm:text-base text-gray-500">by {book.author}</p>
      <p className="text-xs sm:text-sm text-gray-600 bg-gray-100 p-1 px-2 sm:px-3 rounded-sm self-start">{book.category}</p>
      {book.status === 'finished' && (
        <>
          <div className="flex">{renderStars(book.rating)}</div>
          {book.review && <p className="text-xs sm:text-sm text-gray-700 italic line-clamp-2">{book.review}</p>}
        </>
      )}
      {book.status === 'currentlyreading' && <p className="text-xs sm:text-sm text-gray-700">Progress: {book.progress}%</p>}
      <div className="flex justify-between items-center mt-auto pt-2">
        <Link to={`/bookdetail/${book.id}`} className="inline-flex">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <BookOpenIcon className="w-3 h-3 sm:w-4 sm:h-4" /> details
          </Button>
        </Link>
        <div className="flex space-x-2 sm:space-x-3">
          <Button variant="outline" size="sm" onClick={() => onEdit?.(book)} className="p-1.5">
            <EditIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <Button variant="destructive" size="sm" onClick={() => onDelete?.(book.id)} className="p-1.5">
            <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}