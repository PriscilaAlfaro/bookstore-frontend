import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    username: null,
    email: null,
    accessToken: null,
    error: null,
    showSignIn: false,
}
export const user = createSlice({
    name: 'user',
    initialState,

    reducers: {
        setUser: (store, action) => {
            const { id, username, email, accessToken }= action.payload;
        
                store.id = id;
                store.username = username;
                store.email = email;
                store.accessToken = accessToken;
                store.error = null;
        },

        setError: (store, action) => {
            store.error = action.payload;
        },
        
        setclearUser: () => {
            return initialState;
        },
        
        showSignIn: (store) => {
            store.showSignIn = !store.showSignIn;
        }
    }
});
