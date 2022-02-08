import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: null,
    userId: null,
    items: [],
    temporalItem:null,
    error: null,
};

export const cart = createSlice({
    name: 'cart',
    initialState,

    reducers: {
        setCart: (store, action) => {
          const {items, userId, _id } = action.payload;
         
            store.items = items;
            store.userId = userId;
            store._id = _id;
        },

        setTemporalItem: (store, action) => {
            const { productId } = action.payload;
            store.temporalItem =  productId; 
        },

        setError: (store, action) => {
            store.error = action.payload;
        },

        setclearCart: () => {
            return initialState;
        },
        
    },
});