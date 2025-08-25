import { BookOpenIcon} from 'lucide-react';
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const statusMatch = statusFilter === 'allbooks' || book.status === statusFilter;
      const categoryMatch = categoryFilter === 'allcategories' || book.category === categoryFilter;
      return statusMatch && categoryMatch;
    });
  }, [books, statusFilter, categoryFilter]);

  const handleDeleteBook = (bookId: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      onDeleteBook(bookId);
    }
  };

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 bg-gray-50">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Books</h1>
        <Link to="/addbook" className="inline-flex">
          <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 hover:scale-110">
            <BookOpenIcon size={18} className="sm:w-5 sm:h-5" />
            Add Book
          </Button>
        </Link>
      </div>

      <div className="mb-6 p-4 sm:p-6 bg-gray-100 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-3 sm:mb-4 text-gray-800">Filter Books</h3>
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4">
          <div className="flex flex-col w-full sm:w-auto">
            <label htmlFor="status-filter" className="text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-56 bg-white">
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
              <SelectTrigger className="w-full sm:w-56 bg-white">
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
              setCurrentPage(1); // Reset to first page when clearing filters
            }}
            variant="secondary"
            className="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 hover:scale-110 text-white self-end"
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
        Showing {paginatedBooks.length} of {filteredBooks.length} books (Page {currentPage} of {totalPages})
        {(statusFilter !== 'allbooks' || categoryFilter !== 'allcategories') && (
          <span className="ml-2 text-gray-500">(filtered)</span>
        )}
      </div>

      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {paginatedBooks.map((book) => (
            <BookCard key={book.id} book={book} onEdit={onEditBook} onDelete={handleDeleteBook} />
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
                <Button className="inline-flex items-center gap-2">
                  <BookOpenIcon className="-ml-1 mr-2 h-5 w-5" />
                  Add Book
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-4">
          <Button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 hover:scale-105 rounded-full disabled:opacity-50"
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 hover:scale-105 rounded-full disabled:opacity-50"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}