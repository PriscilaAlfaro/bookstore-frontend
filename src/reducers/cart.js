import { createSlice } from '@reduxjs/toolkit';
import update from 'immutability-helper';
import { API_URL } from '../utils/url';
import { readCookie } from '../utils/cookies';


const initialState = {
    items: [],
    temporalItem: null,
    userId: null,
    _id: null,
    error: null,
};

export const cart = createSlice({
    name: 'cart',
    initialState,

    reducers: {
        setCart: (store, action) => {
            console.log(action.payload)
          const {items, userId, _id } = action.payload;
    
            store.items = items;
            store.userId = userId;
            store._id = _id;
        },

        setTemporalItem: (store, action) => {
            const { productId } = action.payload;
            store.temporalItem =  productId; 
        },

        createNewCart: (store, action) => {
        
            const { productId, userId } = action.payload;
            const accessToken = readCookie("accessToken");
            console.log("accessToken from cart cookie", accessToken)

        //     if (store._id === null) { //------> CASE NO CART
        //         // post a new cart for the first time
        //         const options = {
        //             method: 'POST',
        //             body: JSON.stringify({ items: { productId, quantity: 1 }, userId: userId }),
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 Authorization: accessToken,
        //             }
        //         }

        //         fetch(API_URL('carts'), options) //no need id to post
        //             .then((res) => res.json())
        //             .then(data => {
        //                 console.log(data)
        //                 if (data.success) {       //save a new book in redux 
        //                     store.userId = userId;
        //                     store.items = [{ productId, quantity: 1 }]

        //                 } else {
        //                     store.error = data.error
        //                 }
                 

        //             }).catch((error) => {
        //                 console.log('Error in Fetch:' + error.message);
        //             });
        //         }

        },

        addItemToCart: (store, action) => {
            const { productId } = action.payload;
            const accessToken = readCookie("accessToken");
            console.log("accessToken from cart cookie",accessToken)

            const productIndex = store.items.findIndex(item => item.productId === productId);

            //CASE 1. product already exists in the cart just update the quantity
            if (productIndex !== -1) {
                const newQuantity = store.items[productIndex].quantity + 1;
                const updatedItems = update(store.items, {
                    [productIndex]: {
                        quantity: { $set: newQuantity }
                    }
                });
                store.items = updatedItems

                //update quantity in database by cart Id
                const options = {
                    method: 'PATCH',
                    body: JSON.stringify({ item: { productId, quantity: newQuantity } }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken,
                    }
                }

                fetch(API_URL(`carts/${store._id}`), options)
                    .then((res) => res.json())
                    .then(data => {
                        console.log(data)
                    }).catch((error) => {
                        console.log('Error in Fetch:' + error.message);
                    });

                } else {

                //CASE 2. add new book to items 
                store.items.push({ productId, quantity: 1 })

                const options = {
                    method: 'PATCH',
                    body: JSON.stringify({ item: { productId, quantity: 1 } }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken,
                    }
                }

                fetch(API_URL(`carts/${store._id}`), options) //by cart id
                    .then((res) => res.json())
                    .then(data => {
                        console.log(data)
                    }).catch((error) => {
                        console.log('Error in Fetch:' + error.message);
                });
            }



            
        },

        removeItemFromCart: (store, action) => {
            const { productId } = action.payload;
            const productIndex = store.items.findIndex(item => item.productId === productId);
            const newQuantity = store.items[productIndex].quantity - 1;
            const accessToken = readCookie("accessToken");

            if (newQuantity === 0 ) { //CASE delete book from items  
                const options = {
                    method: 'DELETE',
                    body: JSON.stringify({ item: { productId, quantity: 1 } }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken,
                    }
                }

                fetch(API_URL(`carts/${store._id}/deleteBook`), options) //by cart id
                    .then((res) => res.json())
                    .then(data => {
                        console.log(data)
                    }).catch((error) => {
                        console.log('Error in Fetch:' + error.message);
                    });

                //delete item from redux 
                const filteredItems = store.items.filter(item => item.productId !== productId)
                store.items = filteredItems;

            } else { //CASE update items
   
                //update quantity in database by cart Id
                const options = {
                    method: 'PATCH',
                    body: JSON.stringify({ item: { productId, quantity: newQuantity } }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken,
                    }
                }

                fetch(API_URL(`carts/${store._id}`), options)
                    .then((res) => res.json())
                    .then(data => {
                        console.log(data)
                    }).catch((error) => {
                        console.log('Error in Fetch:' + error.message);
                    });

             // update items 
                const updatedItems = update(store.items, {
                    [productIndex]: {
                        quantity: { $set: newQuantity }
                    }
                });
                store.items = updatedItems 
            } 

        },

        setError: (store, action) => {
            store.error = action.payload;
        },

        //For backoffice
        // addBook
        // updateBook
        // deleteBook

        //the total of the cart is just the length of the items// in HeaderICons
    },
});