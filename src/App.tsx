import { useEffect, useState } from 'react';
import { useAuth, SignedIn, SignedOut } from '@clerk/clerk-react';
import { signInWithCustomToken, signOut as firebaseSignOut } from 'firebase/auth';
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Routes, Route, Navigate } from 'react-router-dom';
import { auth, db } from './lib/firebase';
import Navbar from './Components/Navbar';
import HomePage from './Components/HomePage';
import MyBooks from './Components/MyBooks';
import BookDetail from './Components/BookDetail';
import AddBookForm from './Components/AddBookForm';
import type { Book } from './Components/types/Book';

export default function App() {
  const { isSignedIn, isLoaded, getToken, userId } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const syncFirebaseAuth = async () => {
      if (!isLoaded) return;
      try {
        if (isSignedIn && userId) {
          const token = await getToken({ template: 'integration_firebase' });
          if (token) {
            await signInWithCustomToken(auth, token);
          }
        } else {
          await firebaseSignOut(auth).catch(() => {});
        }
      } catch (err) {
        console.warn('Firebase auth sync failed:', err);
      } finally {
        setLoading(false);
      }
    };
    syncFirebaseAuth();
  }, [isLoaded, isSignedIn, userId, getToken]);

  useEffect(() => {
    if (!userId) {
      setBooks([]);
      setLoading(false);
      return;
    }
    const booksRef = collection(db, 'books');
    const q = query(booksRef, where('userId', '==', userId));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const nextBooks: Book[] = snapshot.docs.map((d) => ({
          id: d.id,
          title: d.data().title,
          author: d.data().author,
          category: d.data().category,
          status: d.data().status,
          rating: d.data().rating ?? 0,
          review: d.data().review,
          progress: d.data().progress ?? 0,
        }));
        setBooks(nextBooks);
        setLoading(false);
      },
      (err) => {
        console.warn('Failed to subscribe to books:', err);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [userId]);

  const handleAddBook = async (newBook: Book) => {
    try {
      if (!userId) {
        console.warn('No authenticated user; cannot add book');
        return;
      }
      await addDoc(collection(db, 'books'), {
        ...newBook,
        userId,
        createdAt: Date.now(),
      });
    } catch (error) {
      console.warn('Failed to add book:', error);
    }
  };

  const handleEditBook = async (book: Book) => {
    try {
      if (!book.id) return;
      const ref = doc(db, 'books', book.id);
      await updateDoc(ref, {
        title: book.title,
        author: book.author,
        category: book.category,
        status: book.status,
        rating: book.rating,
        review: book.review ?? '',
        progress: book.progress,
      });
    } catch (error) {
      console.warn('Failed to update book:', error);
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    try {
      if (!bookId) return;
      await deleteDoc(doc(db, 'books', bookId));
    } catch (error) {
      console.warn('Failed to delete book:', error);
    }
  };

  if (loading) {
    return <div className="text-2xl font-bold text-center py-10">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/mybooks"
            element={
              <SignedIn>
                <MyBooks books={books} onEditBook={handleEditBook} onDeleteBook={handleDeleteBook} />
              </SignedIn>
            }
          />
          <Route
            path="/addbook"
            element={
              <SignedIn>
                <AddBookForm onAddBook={handleAddBook} />
              </SignedIn>
            }
          />
          <Route
            path="/bookdetail/:id"
            element={
              <SignedIn>
                <BookDetail books={books} onEdit={handleEditBook} onDelete={handleDeleteBook} />
              </SignedIn>
            }
          />
          {/* Redirect unauthenticated users to home page for protected routes */}
          <Route
            path="/mybooks"
            element={
              <SignedOut>
                <Navigate to="/" replace />
              </SignedOut>
            }
          />
          <Route
            path="/addbook"
            element={
              <SignedOut>
                <Navigate to="/" replace />
              </SignedOut>
            }
          />
          <Route
            path="/bookdetail/:id"
            element={
              <SignedOut>
                <Navigate to="/" replace />
              </SignedOut>
            }
          />
          <Route
            path="/sign-in/*"
            element={<Navigate to="/" />}
          />
          <Route
            path="/sign-up/*"
            element={<Navigate to="/" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <footer className="py-4 sm:py-6 bg-white border text-center px-4 sm:px-6 lg:px-8">
        <p className="text-gray-500 text-sm sm:text-base">© 2025 BookTracker. All rights reserved.</p>
      </footer>
    </div>
  );
}