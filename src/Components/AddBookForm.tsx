// src/Components/AddBookForm.tsx
import { useState } from 'react';
import { BookOpen, Star, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Book } from './types/Book';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface AddBookFormProps {
  onAddBook: (book: Book) => void;
}

export default function AddBookForm({ onAddBook }: AddBookFormProps) {
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successBookTitle, setSuccessBookTitle] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: 'Fiction',
    status: 'wanttoread' as Book['status'],
    rating: 0,
    review: '',
    progress: 0,
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Please enter a book title.');
      return;
    }

    const newBook: Book = {
      id: '', // Firestore will generate the ID
      title: formData.title,
      author: formData.author.trim() || 'Unknown Author',
      category: formData.category,
      status: formData.status,
      rating: formData.rating,
      review: formData.review,
      progress: formData.progress,
    };

    onAddBook(newBook);
    setSuccessBookTitle(formData.title);
    setShowSuccessMessage(true);
    setFormData({
      title: '',
      author: '',
      category: 'Fiction',
      status: 'wanttoread',
      rating: 0,
      review: '',
      progress: 0,
    });
    setError('');
    setTimeout(() => {
      setShowSuccessMessage(false);
      setSuccessBookTitle('');
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === 'range' || type === 'number' ? Number(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  return (
    <div className="flex flex-col px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 min-h-screen">
      <div className="flex items-center mb-6">
        <Button variant="outline" onClick={() => navigate('/mybooks')} className="mr-4 p-2">
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>
        <h1 className="text-2xl sm:text-3xl font-bold">Add a New Book</h1>
      </div>
      {showSuccessMessage && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          <p className="font-medium">✅ "{successBookTitle}" has been added to your collection!</p>
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p className="text-sm">{error}</p>
        </div>
      )}
      <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 lg:p-7 w-full max-w-2xl mx-auto">
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-semibold flex items-center">
            <BookOpen className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
            Add New Book Details
          </h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">Fill in the details below to add a new book to your collection.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Book Title <span className="text-lg text-red-600">*</span>
            </label>
            <Input type="text" className='bg-gray-100' name="title" id="title" value={formData.title} onChange={handleChange} placeholder="Enter book title" required />
          </div>
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
              Author <span className="text-lg text-red-600">*</span>
            </label>
            <Input type="text" className='bg-gray-100' name="author" id="author" value={formData.author} onChange={handleChange} placeholder="Enter author name" required />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-lg text-red-600">*</span>
            </label>
            <Select value={formData.category} onValueChange={(val) => setFormData((prev) => ({ ...prev, category: val }))}>
              <SelectTrigger className="w-full bg-gray-100">
                <SelectValue placeholder="Select a category" />
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
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Reading Status <span className="text-lg text-red-600">*</span>
            </label>
            <Select
              value={formData.status}
              onValueChange={(val) => setFormData((prev) => ({ ...prev, status: val as Book['status'] }))}
            >
              <SelectTrigger className="w-full bg-gray-100">
                <SelectValue placeholder="Select a status" />
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
          {formData.status === 'currentlyreading' && (
            <div>
              <label htmlFor="progress" className="block text-sm font-medium text-gray-700 mb-1">
                Progress
              </label>
              <div className="flex items-center space-x-4">
                <Input
                  type="range"
                  name="progress"
                  id="progress"
                  min={0}
                  max={100}
                  value={formData.progress}
                  onChange={handleChange}
                  className="flex-1"
                />
                <span className="text-gray-700 font-medium w-12 text-sm sm:text-base">{formData.progress}%</span>
              </div>
            </div>
          )}
          {formData.status === 'finished' && (
            <>
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                  Rating (1-5)
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                      className={`p-1 rounded ${formData.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      <Star className="w-5 h-5 sm:w-6 sm:h-6" fill={formData.rating >= star ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
                  Review
                </label>
                <Textarea
                  name="review"
                  id="review"
                  value={formData.review}
                  onChange={handleChange}
                  placeholder="Share your thoughts about this book..."
                  rows={3}
                  className='bg-gray-100'
                />
              </div>
            </>
          )}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
            <Button variant="outline" type="button" className='bg-gray-100 hover:bg-gray-200 border-gray-300' onClick={() => navigate('/mybooks')}>
              Cancel
            </Button>
            <Button type="submit" className='bg-blue-600 hover:bg-blue-700'>Add Book</Button>
          </div>
        </form>
      </div>
    </div>
  );
}