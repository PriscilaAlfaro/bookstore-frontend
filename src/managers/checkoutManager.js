
import { readCookie } from "../utils/cookies";
import { API_URL } from "../utils/url";

export const createOrderInKlarna = (userId) => {
    const accessToken = readCookie("accessToken");
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken
        }

    }

    return fetch(API_URL(`salesOrders/checkout/${userId}`), options)
        .then(res => res.json());
}


export const getConfirmationFromKlarna = (klarnaOrderId) => {
    const accessToken = readCookie("accessToken");
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken
        }

    }

    return fetch(API_URL(`salesOrders/orderConfirmation/${klarnaOrderId}`), options)
        .then(res => res.json());
}
