import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { books } from './reducers/books';
import { cart } from './reducers/cart';


const reducer = combineReducers({
    books: books.reducer,
    cart: cart.reducer,
})

export const store = configureStore({ reducer })