export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  status: 'finished' | 'currentlyreading' | 'wanttoread';
  rating: number;
  review?: string;
  progress: number;
}