import { readCookie } from "../utils/cookies";
import { API_URL } from "../utils/url";


export const addItemToWishList = (productId, userId) => {
    const accessToken = readCookie("accessToken");
    const newWishlist = { userId, productId }
    const options = {
        method: 'POST',
        body: JSON.stringify(newWishlist),
        headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken,
        }
    }

    return fetch(API_URL(`wishlists/${userId}/items/${productId}`), options)
        .then(res => res.json());
}


export const removeItemFromWishList = (productId, userId) => {
    const accessToken = readCookie("accessToken");
    const newWishlist = { userId, productId }
    const options = {
        method: 'DELETE',
        body: JSON.stringify(newWishlist),
        headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken,
        }
    }

    return fetch(API_URL(`wishlists/${userId}/items/${productId}`), options)
        .then(res => res.json());
}


export const getWishlistFromDatabase = (userId) => {
    const accessToken = readCookie("accessToken");
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken,
        }
    }

    return fetch(API_URL(`wishlists/${userId}/userId`), options)
            .then(res => res.json())
}