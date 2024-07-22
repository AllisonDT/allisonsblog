import React, { useState, useEffect, useMemo } from 'react';
import { useSprings, animated } from '@react-spring/web';
import './BookReviews.css';
import { Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

interface Book {
  title: string;
  author: string;
}

const BookReviews: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [newBook, setNewBook] = useState<Book>({ title: '', author: '' });

  useEffect(() => {
    axios.get('/api/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const handleAddBook = () => {
    axios.post('/api/books', newBook)
      .then(response => {
        setBooks([...books, response.data.newBook]);
        setNewBook({ title: '', author: '' });
      })
      .catch(error => console.error('Error adding book:', error));
  };

  const springProps = useMemo(() => {
    return books.map((book, index) => {
      return {
        transform: hovered === index ? 'translateY(-10px)' : 'translateY(0px)',
        config: { tension: 300, friction: 10 },
      };
    });
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
    </div>
  );
};

export default BookReviews;
