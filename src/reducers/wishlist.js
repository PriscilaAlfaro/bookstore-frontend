import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: null,
    userId: null,
    items: [],
    error: null,
};

export const wishlist = createSlice({
    name: 'wishlist',
    initialState,

    reducers: {
        setWishlist: (store, action) => {
            const { items, userId, _id } = action.payload;

            store.items = items;
            store.userId = userId;
            store._id = _id;
        },

        setError: (store, action) => {
            store.error = action.payload;
        },

        setclearWishlist: () => {
            return initialState;
        },

    },
});