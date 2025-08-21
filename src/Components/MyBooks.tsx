// src/Components/MyBooks.tsx
import { BookOpenIcon, StarIcon, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import BookCard from './BookCard';
import type { Book } from './types/Book';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface MyBooksProps {
  books: Book[];
  onEditBook: (book: Book) => void;
  onDeleteBook: (bookId: string) => void;
}

export default function MyBooks({ books, onEditBook, onDeleteBook }: MyBooksProps) {
  const [statusFilter, setStatusFilter] = useState<string>('allbooks');
  const [categoryFilter, setCategoryFilter] = useState<string>('allcategories');
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [editFormData, setEditFormData] = useState<Book | null>(null);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const statusMatch = statusFilter === 'allbooks' || book.status === statusFilter;
      const categoryMatch = categoryFilter === 'allcategories' || book.category === categoryFilter;
      return statusMatch && categoryMatch;
    });
  }, [books, statusFilter, categoryFilter]);

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
    setEditFormData({ ...book });
  };

  const handleDeleteBook = (bookId: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      onDeleteBook(bookId);
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editFormData && editingBook) {
      onEditBook(editFormData);
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
      // If progress is being set to 100, automatically change status to finished
      if (name === 'progress' && newValue === 100) {
        return {
          ...prev,
          [name]: newValue,
          status: 'finished',
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
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Books</h1>
        <Link to="/addbook" className="inline-flex">
          <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <BookOpenIcon size={18} className="sm:w-5 sm:h-5" />
            Add Book
          </Button>
        </Link>
      </div>

      <div className="mb-6 p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-3 sm:mb-4 text-gray-800">Filter Books</h3>
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4">
          <div className="flex flex-col w-full sm:w-auto">
            <label htmlFor="status-filter" className="text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-56 bg-white border border-gray-300">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="allbooks">All Statuses</SelectItem>
                {readingStatuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col w-full sm:w-auto">
            <label htmlFor="category-filter" className="text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-56 bg-white border border-gray-300">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="allcategories">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={() => {
              setStatusFilter('allbooks');
              setCategoryFilter('allcategories');
            }}
            variant="secondary"
            className="w-full sm:w-auto self-end bg-gray-600 hover:bg-gray-700 text-white"
          >
            Clear Filters
          </Button>
        </div>
        {(statusFilter !== 'allbooks' || categoryFilter !== 'allcategories') && (
          <div className="mt-4 flex flex-wrap gap-2">
            {statusFilter !== 'allbooks' && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Status:{' '}
                {statusFilter === 'wanttoread' ? 'Want to Read' : statusFilter === 'currentlyreading' ? 'Currently Reading' : 'Finished'}
                <Button
                  onClick={() => setStatusFilter('allbooks')}
                  variant="ghost"
                  className="ml-1.5 h-auto p-0 text-blue-600 hover:text-blue-800"
                >
                  ×
                </Button>
              </span>
            )}
            {categoryFilter !== 'allcategories' && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Category: {categoryFilter}
                <Button
                  onClick={() => setCategoryFilter('allcategories')}
                  variant="ghost"
                  className="ml-1.5 h-auto p-0 text-green-600 hover:text-green-800"
                >
                  ×
                </Button>
              </span>
            )}
          </div>
        )}
      </div>

      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredBooks.length} of {books.length} books
        {(statusFilter !== 'allbooks' || categoryFilter !== 'allcategories') && (
          <span className="ml-2 text-gray-500">(filtered)</span>
        )}
      </div>

      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} onEdit={handleEditBook} onDelete={handleDeleteBook} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 sm:py-16">
          <BookOpenIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No books found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {books.length === 0 ? 'Get started by adding your first book.' : 'Try adjusting your filters to see more books.'}
          </p>
          {books.length === 0 && (
            <div className="mt-6">
              <Link to="/addbook" className="inline-flex">
                <Button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                  <BookOpenIcon className="-ml-1 mr-2 h-5 w-5" />
                  Add Book
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}

      {editingBook && editFormData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Edit Book</h2>
              <button onClick={handleEditCancel} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-4 sm:p-6 space-y-4">
              <div>
                <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">
                  Book Title <span className="text-lg text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  id="edit-title"
                  value={editFormData.title}
                  onChange={handleEditChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label htmlFor="edit-author" className="block text-sm font-medium text-gray-700 mb-1">
                  Author <span className="text-lg text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="author"
                  id="edit-author"
                  value={editFormData.author}
                  onChange={handleEditChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-lg text-red-600">*</span>
                </label>
                <select
                  name="category"
                  id="edit-category"
                  value={editFormData.category}
                  onChange={handleEditChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="edit-status" className="block text-sm font-medium text-gray-700 mb-1">
                  Reading Status <span className="text-lg text-red-600">*</span>
                </label>
                <select
                  name="status"
                  id="edit-status"
                  value={editFormData.status}
                  onChange={handleEditChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                >
                  {readingStatuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
              {editFormData.status === 'currentlyreading' && (
                <div>
                  <label htmlFor="edit-progress" className="block text-sm font-medium text-gray-700 mb-1">
                    Progress
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      name="progress"
                      id="edit-progress"
                      min={0}
                      max={100}
                      value={editFormData.progress}
                      onChange={handleEditChange}
                      className="flex-1"
                    />
                    <span className="text-gray-700 font-medium w-12">{editFormData.progress}%</span>
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
                          <StarIcon className="w-6 h-6" fill={editFormData.rating >= star ? 'currentColor' : 'none'} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="edit-review" className="block text-sm font-medium text-gray-700 mb-1">
                      Review
                    </label>
                    <textarea
                      name="review"
                      id="edit-review"
                      value={editFormData.review || ''}
                      onChange={handleEditChange}
                      placeholder="Share your thoughts about this book..."
                      rows={3}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                  </div>
                </>
              )}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleEditCancel}
                  className="border border-gray-400 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg transition-colors w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}