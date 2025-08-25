import { EditIcon, StarIcon, TrashIcon, BookOpenIcon } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Book } from './types/Book';
import { Button } from './ui/button';
import EditBookForm from './EditBookForm';

interface BookDetailProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (bookId: string) => void;
}

export default function BookDetail({ books, onEdit, onDelete }: BookDetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const currentBook = books.find((book) => book.id === id);

  if (!currentBook) {
    return (
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="text-center py-16 sm:py-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Book Not Found</h2>
          <p className="text-gray-600 mb-8 text-sm sm:text-base">The book you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        className={`${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} w-5 h-5 sm:w-6 sm:h-6`}
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

  const colors = getStatusColor(currentBook.status);

  const handleBack = () => {
    navigate(-1);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(currentBook.id);
      navigate('/mybooks');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 w-full">
      <div className="flex justify-between items-center mb-6 w-full">
        <h1 className="text-3xl font-bold text-gray-900">{currentBook.title}</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleBack} className="rounded-full">
            Back
          </Button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all w-2/3">
        <div className={`h-3 ${colors.progress} w-full`}></div>
        <div className="p-6">
          <div className="flex gap-4 mb-6">
            <div
              className={`w-20 h-24 rounded-md flex items-center justify-center ${colors.bg} ${colors.border} border`}
            >
              <BookOpenIcon className={`h-10 w-10 ${colors.icon}`} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-2xl text-gray-900 mb-1">{currentBook.title}</h3>
                  <p className="text-gray-600 mb-2">by {currentBook.author}</p>
                  <span
                    className={`inline-flex items-center text-sm px-3 py-1 rounded-full ${colors.bg} ${colors.text} font-medium`}
                  >
                    {currentBook.status === 'wanttoread' ? 'Want to Read' : currentBook.status === 'currentlyreading' ? 'Currently Reading' : 'Finished'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <EditBookForm
                    book={currentBook}
                    onSave={onEdit}
                    trigger={
                      <Button variant="ghost" className="rounded-full hover:bg-gray-200 bg-gray-100">
                        <EditIcon className="h-4 w-4 mr-1" /> Edit
                      </Button>
                    }
                  />
                  <Button variant="ghost" onClick={handleDelete} className="rounded-full text-red-600 hover:text-red-600 hover:bg-red-200 bg-red-100">
                    <TrashIcon className="h-4 w-4 mr-1 text-red-600" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center text-xs text-gray-500 mb-6">
            <span className="bg-gray-100 px-2.5 py-1 rounded-full font-medium">{currentBook.category}</span>
          </div>
          <div className="gap-8">
            <div>
              {currentBook.status === 'currentlyreading' && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span className="font-medium">Reading Progress</span>
                    <span className="font-bold">{currentBook.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full ${colors.progress}`}
                      style={{ width: `${currentBook.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            <div>
              {currentBook.status === 'finished' && currentBook.rating > 0 && (
                <div className="mb-6" style={{ textAlign: 'left' }}>
                  <h2 className="font-medium text-gray-700 mb-2">Rating</h2>
                  <div className="flex items-start justify-start text-left">
                    {renderStars(currentBook.rating)}
                    <span className="ml-2 text-sm font-medium text-gray-600 text-left">{currentBook.rating}/5</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {currentBook.status === 'finished' && currentBook.review && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h2 className="font-medium text-gray-700 mb-3">Review</h2>
              <div className="bg-gray-200 p-4 rounded-lg border border-gray-100">
                <p className="text-gray-900 whitespace-pre-wrap">{currentBook.review}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}