
import { API_URL } from "../utils/url";


export const getBooksFromDataBase = (booksArray) => {
    const offset = booksArray.length;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    return fetch(API_URL(`books/?limit=20&offset=${offset}`), options)  //?limit=3&offset=1
        .then(res => res.json())

}