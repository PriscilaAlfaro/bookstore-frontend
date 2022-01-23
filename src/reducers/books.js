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

        // setBookDetails: (store, action) => {
        //     store.bookdetails = action.payload;
        // },

        // setclearBooks: () => {
        //     return initialState
        // }


        //For backoffice
        // addBook
        // updateBook
        // deleteBook
    
    },
});