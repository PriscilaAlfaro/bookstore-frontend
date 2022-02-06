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

                //Inside details
                // type: "physical",
                // reference: "19-402-USA",
                // name: "Red T-Shirt",
                // quantity: 5,
                // quantity_unit: "pcs",
                // unit_price: 10000,
                // tax_rate: 1000,
                // total_amount: 50000,
                // total_discount_amount: 0,
                // total_tax_amount: 4545