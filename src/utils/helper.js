import { readCookie, createCookie } from "./cookies";
import { API_URL } from "./url";




export const createCartWithItem = (productId, userId) => {
    const accessToken = readCookie("accessToken");
    const newCart = { userId, items: [{ productId, quantity: 1 }] }
    // post a new cart for the first time
    const options = {
        method: 'POST',
        body: JSON.stringify(newCart),
        headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken,
        }
    }

 return fetch(API_URL('carts'), options) //no need id to post
        .then(res => res.json());

}


export const createNewUser = (username, email, password) => {
  
    const optionsUser = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ username, email, password }) //save in cookie with access Token
    }

        return fetch(API_URL('users/signup'), optionsUser)
        .then(res => res.json());

}


export const fetchCart = (cartId) => {
    const accessToken = readCookie("accessToken");

    // fetch cart by Id
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken,
        }
    }

    return fetch(API_URL(`carts/${cartId}`), options) 
        .then(res => res.json());

}


export const createSession = (user) => {
    createCookie("accessToken", user.accessToken);
    createCookie("username", user.username);
    createCookie("email", user.email);
    createCookie("id", user.id);

}