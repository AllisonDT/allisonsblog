import React, { useState, useEffect, useMemo } from 'react';
import { useSprings, animated } from '@react-spring/web';
import './BookReviews.css';
import { Typography, TextField, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Book {
  title: string;
  author: string;
}

interface Review {
  reviewer: string;
  comment: string;
}

const BookReviews: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [newBook, setNewBook] = useState<Book>({ title: '', author: '' });
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<Review>({ reviewer: '', comment: '' });
  const [open, setOpen] = useState(false);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/books`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchReviews = async (book: Book) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/books/${book.title}/reviews`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/books`, newBook);
      setBooks((prevBooks) => [...prevBooks, response.data.newBook]);
      setNewBook({ title: '', author: '' });
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleAddReview = async () => {
    if (!selectedBook) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/api/books/${selectedBook.title}/reviews`, newReview);
      setReviews((prevReviews) => [...prevReviews, response.data.newReview]);
      setNewReview({ reviewer: '', comment: '' });
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    fetchReviews(book);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBook(null);
    setReviews([]);
  };

  const springProps = useMemo(() => {
    return books.map((book, index) => ({
      transform: hovered === index ? 'translateY(-10px)' : 'translateY(0px)',
      config: { tension: 300, friction: 10 },
    }));
  }, [books, hovered]);

  const springs = useSprings(books.length, springProps);

  return (
    <div className="container">
      <Typography variant="h2" align="center" gutterBottom>
        Book Reviews
      </Typography>
      <div className="bookshelf">
        {springs.map((spring, index) => (
          <animated.div
            key={index}
            className="book"
            style={spring}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleBookClick(books[index])}
          >
            <div className="book-title">{books[index].title}</div>
            <div className="book-author">{books[index].author}</div>
          </animated.div>
        ))}
      </div>
      <div className="add-book-form">
        <TextField
          label="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <TextField
          label="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <Button variant="contained" color="primary" onClick={handleAddBook}>
          Add Book
        </Button>
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{selectedBook?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Author: {selectedBook?.author}
          </Typography>
          <div className="reviews">
            {reviews.map((review, index) => (
              <div key={index} className="review">
                <Typography variant="subtitle1">
                  {review.reviewer}
                </Typography>
                <Typography variant="body2">
                  {review.comment}
                </Typography>
              </div>
            ))}
          </div>
          <div className="add-review-form">
            <TextField
              label="Reviewer"
              value={newReview.reviewer}
              onChange={(e) => setNewReview({ ...newReview, reviewer: e.target.value })}
            />
            <TextField
              label="Comment"
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            />
            <Button variant="contained" color="primary" onClick={handleAddReview}>
              Add Review
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookReviews;
