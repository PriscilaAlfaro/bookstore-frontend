import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home"
import BookDetails from "./Pages/BookDetails";
import NotFound from "./Pages/NotFound";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import SignIn from "./Pages/SignIn";
import SignUp from './Pages/SignUp';

import React, { useEffect } from "react";
import { API_URL } from './utils/url';
import { useDispatch } from 'react-redux';
import { books } from './reducers/books';
import { cart } from './reducers/cart';



const App= () => {
  const dispatch = useDispatch();

  useEffect(()=>
    { fetch(API_URL('books/?limit=20'))
      .then(res => res.json())
      .then(data => {
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


    fetch(API_URL('carts/61cc5f51a71db84845a46bc2/userId'))//userId
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if (data.success) {
            dispatch(cart.actions.setCart(data.response));
            dispatch(cart.actions.setError(null));
          } else {
            dispatch(cart.actions.setCart([]));
            dispatch(cart.actions.setError(data.response));
          }
        }).catch((error) => {
          console.log('Error in Fetch:' + error.message);
        });



}, [dispatch]);

  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookDetails/:id" element={ <BookDetails/>} />
            <Route path="/cart" element={ <Cart/>} />
            <Route path="/wishlist" element={ <Wishlist/>} />
            <Route path="/signin" element={ <SignIn/>} />
            <Route path="/signup" element={ <SignUp/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

  );
}

export default App;
