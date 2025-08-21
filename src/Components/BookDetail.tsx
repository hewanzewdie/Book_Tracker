// src/Components/BookDetail.tsx
import { EditIcon, StarIcon, TrashIcon, X } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { Book } from './types/Book';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface BookDetailProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (bookId: string) => void;
}

export default function BookDetail({ books, onEdit, onDelete }: BookDetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [editFormData, setEditFormData] = useState<Book | null>(null);

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
        return 'text-green-600 bg-green-100';
      case 'currentlyreading':
        return 'text-blue-600 bg-blue-100';
      case 'wanttoread':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    setEditingBook(currentBook);
    setEditFormData({ ...currentBook });
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(currentBook.id);
      navigate('/mybooks');
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editFormData && editingBook && onEdit) {
      onEdit(editFormData);
      setEditingBook(null);
      setEditFormData(null);
    }
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === 'range' || type === 'number' ? Number(value) : value;

    setEditFormData((prev) => {
      if (!prev) return prev;
      if (name === 'progress' && newValue === 100) {
        return {
          ...prev,
          [name]: newValue,
          status: 'finished' as const,
        };
      }
      return {
        ...prev,
        [name]: newValue,
      };
    });
  };
const handleEditCancel = () => {
    setEditingBook(null);
    setEditFormData(null);
  };
  const categories = [
    'Fiction',
    'Non Fiction',
    'Biography',
    'Science',
    'History',
    'Philosophy',
    'Technology',
    'Self Help',
    'Mystery',
    'Romance',
    'Fantasy',
    'Poetry',
  ];

  const readingStatuses = [
    { value: 'wanttoread', label: 'Want to Read' },
    { value: 'currentlyreading', label: 'Currently Reading' },
    { value: 'finished', label: 'Finished' },
  ];

  return (
    <div className="flex flex-col px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 my-5">
        <h2 className="text-2xl sm:text-3xl font-bold break-words">{currentBook.title}</h2>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
          <Button variant="outline" onClick={handleEdit} className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200">
            <EditIcon className="w-4 h-4 sm:w-5 sm:h-5" /> Edit
          </Button>
          <Button variant="destructive" onClick={handleDelete} className="flex items-center gap-1 hover:bg-red-700">
            <TrashIcon className="w-4 h-4 sm:w-5 sm:h- tripping" /> Delete
          </Button>
        </div>
      </div>
      <div className="border p-4 sm:p-6 lg:p-8 rounded-xl space-y-3 sm:space-y-4 bg-white shadow-lg">
        <div>
          <p className="text-xs sm:text-sm text-gray-500 font-semibold">Author</p>
          <p className="text-base sm:text-lg font-semibold">{currentBook.author}</p>
        </div>
        <div>
          <p className="text-xs sm:text-sm text-gray-500 font-semibold">Category</p>
          <p className="text-base sm:text-lg font-semibold">{currentBook.category}</p>
        </div>
        <div>
          <p className="text-xs sm:text-sm text-gray-500 font-semibold">Status</p>
          <p className={`text-base sm:text-lg font-semibold rounded-full px-3 py-1 inline-block ${getStatusColor(currentBook.status)}`}>
            {currentBook.status.replace(/([A-Z])/g, ' $1').toLowerCase()}
          </p>
        </div>
        {currentBook.status === 'finished' && (
          <>
            <div>
              <p className="text-xs sm:text-sm text-gray-500 font-semibold">Rating</p>
              <div className="flex">{renderStars(currentBook.rating)}</div>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-500 font-semibold">Review</p>
              <p className="text-base sm:text-lg font-semibold">{currentBook.review || 'No review available'}</p>
            </div>
          </>
        )}
        {currentBook.status === 'currentlyreading' && (
          <div>
            <p className="text-xs sm:text-sm text-gray-500 font-semibold">Progress</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${currentBook.progress}%` }}></div>
              </div>
              <span className="text-xs sm:text-sm text-gray-600 w-12">{currentBook.progress}%</span>
            </div>
          </div>
        )}
      </div>
      {editingBook && editFormData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Edit Book</h2>
              <button onClick={handleEditCancel} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-4 sm:p-6 space-y-4 bg-white">
              <div>
                <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">
                  Book Title <span className="text-lg text-red-600">*</span>
                </label>
                <Input type="text" className='bg-gray-100' name="title" id="edit-title" value={editFormData.title} onChange={handleEditChange} required />
              </div>
              <div>
                <label htmlFor="edit-author" className="block text-sm font-medium text-gray-700 mb-1">
                  Author <span className="text-lg text-red-600">*</span>
                </label>
                <Input type="text" className='bg-gray-100' name="author" id="edit-author" value={editFormData.author} onChange={handleEditChange} required />
              </div>
              <div>
                <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-lg text-red-600">*</span>
                </label>
                <Select
                  value={editFormData.category}
                  onValueChange={(val) => setEditFormData((prev) => (prev ? { ...prev, category: val } : prev))}
                >
                  <SelectTrigger className="w-full bg-gray-100">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="edit-status" className="block text-sm font-medium text-gray-700 mb-1">
                  Reading Status <span className="text-lg text-red-600">*</span>
                </label>
                <Select
                  value={editFormData.status}
                  onValueChange={(val) => setEditFormData((prev) => (prev ? { ...prev, status: val as Book['status'] } : prev))}
                >
                  <SelectTrigger className="w-full bg-gray-100">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {readingStatuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {editFormData.status === 'currentlyreading' && (
                <div>
                  <label htmlFor="edit-progress" className="block text-sm font-medium text-gray-700 mb-1">
                    Progress
                  </label>
                  <div className="flex items-center space-x-4">
                    <Input
                      type="range"
                      name="progress"
                      id="edit-progress"
                      min={0}
                      max={100}
                      value={editFormData.progress}
                      onChange={handleEditChange}
                      className="flex-1"
                    />
                    <span className="text-gray-700 font-medium w-12 text-sm sm:text-base">{editFormData.progress}%</span>
                  </div>
                </div>
              )}
              {editFormData.status === 'finished' && (
                <>
                  <div>
                    <label htmlFor="edit-rating" className="block text-sm font-medium text-gray-700 mb-1">
                      Rating (1-5)
                    </label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setEditFormData((prev) => (prev ? { ...prev, rating: star } : prev))}
                          className={`p-1 rounded ${editFormData.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                          <StarIcon className="w-5 h-5 sm:w-6 sm:h-6" fill={editFormData.rating >= star ? 'currentColor' : 'none'} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="edit-review" className="block text-sm font-medium text-gray-700 mb-1">
                      Review
                    </label>
                    <Textarea
                      name="review"
                      id="edit-review"
                      value={editFormData.review || ''}
                      onChange={handleEditChange}
                      placeholder="Share your thoughts about this book..."
                      rows={3}
                      className='bg-gray-100'
                    />
                  </div>
                </>
              )}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
                <Button type="button" variant="outline" onClick={handleEditCancel} className='bg-gray-100 border-gray-300 hover:bg-gray-200'>
                  Cancel
                </Button>
                <Button type="submit" className='bg-blue-600 hover:bg-blue-700'>Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}