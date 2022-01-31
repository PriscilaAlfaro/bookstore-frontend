import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { books } from './reducers/books';
import { cart } from './reducers/cart';
import { user } from './reducers/user';


const reducer = combineReducers({
    books: books.reducer,
    cart: cart.reducer,
    user: user.reducer,
})

export const store = configureStore({ reducer })