import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home"
import BookDetails from "./Pages/BookDetails";
import NotFound from "./Pages/NotFound";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import SignUp from "./Pages/SignIn";
import LogIn from "./Pages/LogIn";

import React, { useEffect } from "react";
import { API_URL } from './utils/url';
import { useDispatch } from 'react-redux';
import { books } from './reducers/books';


const App= () =>{
  const dispatch = useDispatch();

  const fetchBooks = () => {
    fetch(API_URL('books/?limit=20'))
      .then(res => res.json())
      .then(data => {
        console.log("books from app", data)
        if (data.success) {
          dispatch(books.actions.setBooks(data.response));
          dispatch(books.actions.setError(null));
        } else {
          dispatch(books.actions.setBooks([]));
          dispatch(books.actions.setError(data.response));
        }
      }).catch((error) => {
        console.log('Error in Fetch:' + error.message);
      });
  }

  useEffect(fetchBooks, [dispatch])


  return (

      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookDetails/:id" element={ <BookDetails/>} />
            <Route path="/cart" element={ <Cart/>} />
            <Route path="/wishlist" element={ <Wishlist/>} />
            <Route path="/signup" element={ <SignUp/>} />
            <Route path="/login" element={ <LogIn/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

  );
}

export default App;
