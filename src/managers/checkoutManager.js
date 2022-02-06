
import { readCookie } from "../utils/cookies";
import { API_URL } from "../utils/url";

export const createOrderInKlarna = (userId) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization : ''
        }

    }

    return fetch(API_URL(`salesOrders/checkout/${userId}`), options)
        .then(res => res.json());
}
