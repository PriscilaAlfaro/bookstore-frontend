import { createSlice } from '@reduxjs/toolkit';
// import update from 'immutability-helper';
// import { API_URL } from '../utils/url';
// import { readCookie } from '../utils/cookies';


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

        // addItemToCart: (store, action) => {
        //     const { productId } = action.payload;
        //     const accessToken = readCookie("accessToken");
        //     const cartId = readCookie("cartId");
        //     const productIndex = store.items.findIndex(item => item.productId === productId);

        //     //CASE 1. product already exists in the cart just update the quantity
        //     if (productIndex !== -1) {
        //         const newQuantity = store.items[productIndex].quantity + 1;

        //         //update quantity in database by cart Id
        //         const options = {
        //             method: 'PATCH',
        //             body: JSON.stringify({ item: { productId, quantity: newQuantity } }),
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 Authorization: accessToken,
        //             }
        //         }

        //         fetch(API_URL(`carts/${cartId}`), options)
        //             .then((res) => res.json())
        //             .then(data => {
        //                 console.log(data)
                        
        //             }).catch((error) => {
        //                 console.log('Error in Fetch:' + error.message);
        //             });

        //         const updatedItems = update(store.items, {
        //             [productIndex]: {
        //                 quantity: { $set: newQuantity }
        //             }
        //         });
        //         store.items = updatedItems

        //     } else {

        //            //CASE 2. add new book to items 
            

        //         const options = {
        //             method: 'PATCH',
        //             body: JSON.stringify({ item: { productId, quantity: 1 } }),
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 Authorization: accessToken,
        //             }
        //         }

        //         fetch(API_URL(`carts/${store._id}`), options) //by cart id
        //             .then((res) => res.json())
        //             .then(data => {
        //                 console.log(data)
        //             }).catch((error) => {
        //                 console.log('Error in Fetch:' + error.message);
        //         });

        //         store.items.push({ productId, quantity: 1 })
        //     }

          
      
         
        // },

        // removeItemFromCart: (store, action) => {
        //     const { productId } = action.payload;
        //     const productIndex = store.items.findIndex(item => item.productId === productId);
        //     const newQuantity = store.items[productIndex].quantity - 1;
        //     const accessToken = readCookie("accessToken");

        //     if (newQuantity === 0 ) { //CASE delete book from items  
        //         const options = {
        //             method: 'DELETE',
        //             body: JSON.stringify({ item: { productId, quantity: 1 } }),
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 Authorization: accessToken,
        //             }
        //         }

        //         fetch(API_URL(`carts/${store._id}/deleteBook`), options) //by cart id
        //             .then((res) => res.json())
        //             .then(data => {
        //                 console.log(data)
        //             }).catch((error) => {
        //                 console.log('Error in Fetch:' + error.message);
        //             });

        //         //delete item from redux 
        //         const filteredItems = store.items.filter(item => item.productId !== productId)
        //         store.items = filteredItems;

        //     } else { //CASE update items
   
        //         //update quantity in database by cart Id
        //         const options = {
        //             method: 'PATCH',
        //             body: JSON.stringify({ item: { productId, quantity: newQuantity } }),
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 Authorization: accessToken,
        //             }
        //         }

        //         fetch(API_URL(`carts/${store._id}`), options)
        //             .then((res) => res.json())
        //             .then(data => {
        //                 console.log(data)
        //             }).catch((error) => {
        //                 console.log('Error in Fetch:' + error.message);
        //             });

        //      // update items 
        //         const updatedItems = update(store.items, {
        //             [productIndex]: {
        //                 quantity: { $set: newQuantity }
        //             }
        //         });
        //         store.items = updatedItems 
        //     } 

        // },

        // removeSpecificItemFromCart: (store, action) => {
        //     const { productId } = action.payload;
        //     const accessToken = readCookie("accessToken");

        //         const options = {
        //             method: 'DELETE',
        //             body: JSON.stringify({ item: { productId, quantity: 1 } }),
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 Authorization: accessToken,
        //             }
        //         }

        //         fetch(API_URL(`carts/${store._id}/deleteBook`), options) //by cart id
        //             .then((res) => res.json())
        //             .then(data => {
        //                 console.log(data)
        //             }).catch((error) => {
        //                 console.log('Error in Fetch:' + error.message);
        //             });

        //         //delete item from redux 
        //         const filteredItems = store.items.filter(item => item.productId !== productId)
        //         store.items = filteredItems;

        // },

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