import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bookItems: [],
    searchedItems: [],
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

        setBookSearch: (store, action) => {
            store.searchedItems = action.payload;
        },
    },
});