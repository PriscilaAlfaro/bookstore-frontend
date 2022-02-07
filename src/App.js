import React, { useEffect } from "react";
import './App.css';

import { API_URL } from './utils/url';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from "./Pages/Home"
import BookDetails from "./Pages/BookDetails";
import NotFound from "./Pages/NotFound";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import Register from './Pages/Register';
import Payment from './Pages/Payment';
import PaymentConfirmation from "./Pages/paymentConfirmation";

import { books } from './reducers/books';
import { cart } from './reducers/cart';
import { wishlist } from "./reducers/wishlist";
import { readCookie } from './utils/cookies'; 
import { getWishlistFromDatabase } from "./managers/wishManager";
import { getCartFromDataBase } from "./managers/cartManager";


const App = () => {
  const dispatch = useDispatch();
  const accessToken = readCookie("accessToken");
  const cartIdFromCookie = readCookie("cartId");
  const userId = readCookie("id");

  useEffect(() => { 
    fetch(API_URL('books/?limit=50'))
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


    if (accessToken && userId && cartIdFromCookie !== "undefined") {
      getCartFromDataBase(userId).then(data => {
        if (data.success) {
          dispatch(cart.actions.setCart(data.response));
          dispatch(cart.actions.setError(null));
        } else {
          dispatch(cart.actions.setCart([]));
          dispatch(cart.actions.setError(data.response));
        }
      }).catch((error) => {
        console.log('Error in Fetch:' + error.message);
      });}


      if(userId){
        getWishlistFromDatabase(userId).then(data => {
          if (data.success) {
            dispatch(wishlist.actions.setWishlits(data.response));
            dispatch(wishlist.actions.setError(null));
          } else {
            dispatch(wishlist.actions.setWishlits([]));
            dispatch(wishlist.actions.setError(data.response));
          }
        }).catch((error) => {
          console.log('Error in Fetch:' + error.message);
        });
      }
   
}, [accessToken, cartIdFromCookie, dispatch, userId]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookDetails/:id" element={ <BookDetails/>} />
        <Route path="/cart" element={ <Cart/>} />
        <Route path="/wishlist" element={ <Wishlist/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/paymentConfirmation" element={<PaymentConfirmation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
