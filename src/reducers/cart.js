import { createSlice } from '@reduxjs/toolkit';
import update from 'immutability-helper';

const initialState = {
    items: [],
    userId: null,
    _id: null,
    error: null,
};

export const cart = createSlice({
    name: 'cart',
    initialState,

    reducers: {

        // setUserId: (store, action) => {
        //     store.userId = action.payload;
        // },
        setCart: (store, action) => {
          const {items, userId, _id } = action.payload;
            store.items = items;
            store.userId = userId;
            store._id = _id;
        },

        addItemToCart: (store, action) => {
            const { productId } = action.payload;
            const productIndex = store.items.findIndex(item => item.productId === productId);

            if (productIndex !== -1){
                const newQuantity = store.items[productIndex].quantity + 1;
                const updatedItems = update(store.items, {
                        [productIndex]: {
                            quantity: { $set: newQuantity}
                    }
                });
                store.items = updatedItems
            } else {
            store.items.push({ productId, quantity: 1 })
            }
        // add/update elements to the database here 
        //the total of the cart is just the length of the items
        },

        removeItemFromCart: (store, action) => {
            const { productId } = action.payload;
            const productIndex = store.items.findIndex(item => item.productId === productId);

            if (productIndex !== -1) {
                const newQuantity = store.items[productIndex].quantity - 1;
                if (newQuantity === 0 ) {
                    const updatedItems = update(store.items, {
                        [productIndex]: {
                            quantity: { $set: newQuantity }
                        }
                    });
                    store.items = updatedItems

                    //borrar el item inmediatamente
                    const filteredItems = store.items.filter(item => item.productId !== productId)
                    store.items = filteredItems;
                } else {
                   // update
                    const updatedItems = update(store.items, {
                        [productIndex]: {
                            quantity: { $set: newQuantity }
                        }
                    });
                    store.items = updatedItems 
                }
            }    
            
                   // add/update elements to the database here 
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