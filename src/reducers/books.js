import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bookItems: [],
    error: null,
};

export const books = createSlice({
    name: 'books',
    initialState,

    reducers: {

        setBooks: (store, action) => {
            store.bookItems = action.payload;
        },

        setError: (store, action) => {
            store.error = action.payload;
        },

        //For backoffice
        // addBook
        // updateBook
        // deleteBook
    
    },
});