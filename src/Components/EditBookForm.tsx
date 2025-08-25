import { StarIcon } from 'lucide-react';
import { useState } from 'react';
import type { Book } from './types/Book';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from './ui/dialog';

interface EditBookFormProps {
  book: Book;
  onSave: (updatedBook: Book) => void;
  trigger: React.ReactNode; 
}

export default function EditBookForm({ book, onSave, trigger }: EditBookFormProps) {
  const [editFormData, setEditFormData] = useState<Book>({ ...book });

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

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editFormData);
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
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={`max-w-lg sm:max-w-2xl max-h-[90vh] overflow-y-auto border ${colors.border}`}>
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-semibold text-gray-900">Edit Book</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleEditSubmit} className="p-4 sm:p-6 space-y-4 bg-white">
          <div>
            <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">
              Book Title <span className="text-lg text-red-600">*</span>
            </label>
            <Input type="text" className="bg-gray-100" name="title" id="edit-title" value={editFormData.title} onChange={handleEditChange} required />
          </div>
          <div>
            <label htmlFor="edit-author" className="block text-sm font-medium text-gray-700 mb-1">
              Author <span className="text-lg text-red-600">*</span>
            </label>
            <Input type="text" className="bg-gray-100" name="author" id="edit-author" value={editFormData.author} onChange={handleEditChange} required />
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
                  className="bg-gray-100"
                />
              </div>
            </>
          )}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-100">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="bg-gray-100 border-gray-300 hover:bg-gray-200 rounded-full">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 rounded-full">Save Changes</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}