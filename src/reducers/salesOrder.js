import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: null,
    userId: null,
    details: [],
    timestamp: null,
    checkoutOrder: null,
    confirmationOrder: null,
    error: null,
};

export const salesOrder = createSlice({
    name: 'salesOrder',
    initialState,

    reducers: {
        setSalesOrder: (store, action) => {
            const { details, userId, _id, timestamp } = action.payload;

            store._id = _id;
            store.userId = userId;
            store.details = details;
            store.timestamp = timestamp;
        },

        setCheckoutOrder: (store, action) => {
            store.checkoutOrder = action.payload;
        },

        setconfirmationOrder: (store, action) => {
            store.confirmationOrder = action.payload;
        },

        setError: (store, action) => {
            store.error = action.payload;
        },
    },
});