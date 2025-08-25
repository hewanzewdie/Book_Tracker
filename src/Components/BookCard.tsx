import { BookOpenIcon, EditIcon, StarIcon, TrashIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Book } from './types/Book';
import { Button } from './ui/button';
import EditBookForm from './EditBookForm';

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
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200',
          icon: 'text-green-500',
          progress: 'bg-green-500',
        };
      case 'currentlyreading':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-800',
          border: 'border-blue-200',
          icon: 'text-blue-500',
          progress: 'bg-blue-500',
        };
      case 'wanttoread':
        return {
          bg: 'bg-orange-100',
          text: 'text-orange-800',
          border: 'border-orange-200',
          icon: 'text-orange-500',
          progress: 'bg-orange-500',
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-600',
          border: 'border-gray-200',
          icon: 'text-gray-500',
          progress: 'bg-gray-500',
        };
    }
  };

  const colors = getStatusColor(book.status);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-gray-200 flex flex-col h-full">
      <div className={`h-3 ${colors.progress} w-full`}></div>
      <div className="p-4 sm:p-6 flex flex-col h-full">
        <div className="flex gap-4 mb-4">
          <div
            className={`w-16 h-20 rounded-md flex items-center justify-center ${colors.bg} ${colors.border} border`}
          >
            <BookOpenIcon className={`h-8 w-8 ${colors.icon}`} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg text-gray-900 line-clamp-2">{book.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-1">by {book.author}</p>
            <span
              className={`inline-flex items-center text-xs px-2.5 py-1 rounded-full ${colors.bg} ${colors.text} font-medium`}
            >
              {book.status === 'wanttoread' ? 'Want to Read' : book.status === 'currentlyreading' ? 'Reading' : 'Finished'}
            </span>
          </div>
        </div>
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <span className="bg-gray-100 px-2.5 py-1 rounded-full font-medium">{book.category}</span>
        </div>
        {book.status === 'currentlyreading' && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1.5">
              <span className="font-medium">Progress</span>
              <span className="font-bold">{book.progress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-2.5 rounded-full ${colors.progress}`}
                style={{ width: `${book.progress}%` }}
              ></div>
            </div>
          </div>
        )}
        {book.status === 'finished' && (
          <>
            <div className="flex items-center mb-4">
              {renderStars(book.rating)}
              <span className="ml-2 text-sm font-medium text-gray-600">{book.rating}/5</span>
            </div>
            {book.review && <p className="text-xs sm:text-sm text-gray-700 italic line-clamp-2">{book.review}</p>}
          </>
        )}
        <div className="flex justify-between mt-auto pt-4 border-t border-gray-100">
          <Link to={`/bookdetail/${book.id}`}>
            <Button variant="outline" size="sm" className="rounded-full flex items-center gap-1">
              <BookOpenIcon className="w-3 h-3 sm:w-4 sm:h-4" /> Details
            </Button>
          </Link>
          <div className="flex gap-2">
            <EditBookForm
              book={book}
              onSave={onEdit || (() => {})}
              trigger={
                <Button variant="outline" size="sm" className="rounded-full p-1.5 bg-gray-100 hover:bg-gray-200">
                  <EditIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              }
            />
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete?.(book.id)}
              className="rounded-full p-1.5 hover:bg-red-700"
            >
              <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}