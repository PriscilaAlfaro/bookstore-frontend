import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { books } from './reducers/books';


const reducer = combineReducers({
    books: books.reducer,
})

export const store = configureStore({ reducer })