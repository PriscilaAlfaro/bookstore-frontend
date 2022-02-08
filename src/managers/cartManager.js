import { readCookie } from "../utils/cookies";
import { API_URL } from "../utils/url";


export const addItemToCart = (productId, userId) => {
    const accessToken = readCookie("accessToken");
    const newCart = { userId, productId}
    const options = {
        method: 'POST',
        body: JSON.stringify(newCart),
        headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken,
        }
    }

    return fetch(API_URL(`carts/${userId}/items/${productId}`), options)
        .then(res => res.json());

}


export const removeItemFromCart = (productId, userId, removeLine) => {
    const accessToken = readCookie("accessToken");
    const newCart = { userId, productId }
    const options = {
        method: 'DELETE',
        body: JSON.stringify(newCart),
        headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken,
        }
    }
    const url = `carts/${userId}/items/${productId}` + (removeLine !== undefined ? `?removeLine=${removeLine}` : "");

    return fetch(API_URL(url), options)
        .then(res => res.json());

}


export const getCartFromDataBase = (userId) =>{
    const accessToken = readCookie("accessToken");
    
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken,
        }
    }
    return fetch(API_URL(`carts/${userId}/userId`), options)//userId
        .then(res => res.json())

}
