import React, { useEffect } from "react";
import { GlobalStyle } from "./GlobalStyle";

import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home"
import BookDetails from "./Pages/BookDetails";
import NotFound from "./Pages/NotFound";
import Cart from "./Pages/Cart";
import Payment from './Pages/Payment';
import PaymentConfirmation from "./Pages/PaymentConfirmation";
import Register from './Pages/Register';
import Wishlist from "./Pages/Wishlist";

import { books } from './reducers/books';
import { getBooksFromDataBase } from "./managers/bookManager";


const App = () => {
  const dispatch = useDispatch();
  const booksArray = useSelector(store => store.books.bookItems);

  
useEffect(() => {

  getBooksFromDataBase(booksArray).then(data => {
    if (data.success) {
      const newArray = [...booksArray, ...data.response]
      dispatch(books.actions.setBooks(newArray));
      dispatch(books.actions.setError(null));

    } else {
      dispatch(books.actions.setBooks([]));
      dispatch(books.actions.setError(data.response));
    }
  }).catch((error) => {
    console.log('Error in Fetch:' + error.message);
  });
// eslint-disable-next-line react-hooks/exhaustive-deps
},[]);

  return (
    <React.Fragment>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookDetails/:bookId" element={ <BookDetails/>} />
          <Route path="/cart" element={ <Cart/>} />
          <Route path="/wishlist" element={ <Wishlist/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/paymentConfirmation" element={<PaymentConfirmation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}


export default App;
