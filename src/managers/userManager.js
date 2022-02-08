import {  createCookie } from "../utils/cookies";
import { API_URL } from "../utils/url";


export const createNewUser = (username, email, password) => {
  
    const optionsUser = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ username, email, password }) 
    }

        return fetch(API_URL('users/signup'), optionsUser)
        .then(res => res.json());

}

export const signInUser = (email, password) => {

    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }

    return fetch(API_URL('users/signin'), options)
        .then(res => res.json())

}


export const createSession = (user) => {
    createCookie("accessToken", user.accessToken);
    createCookie("username", user.username);
    createCookie("email", user.email);
    createCookie("id", user.id);

}
