import Book from "../Book";
import styled from "styled-components";
import { useSelector } from 'react-redux';

import { Loader } from "../Loader";

const BooksMainContainer= styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 3rem auto;
  justify-content: center;
  text-decoration: none;
`



const BooksContainer= () =>{
    const books = useSelector(store => store.books.bookItems);

    return (
        <BooksMainContainer>
            {books ? 
            books.map(book => { 
                return <Book book={book} key={book._id}/>}) : 
                <Loader/>}
        </BooksMainContainer>
    );
}

export default BooksContainer;
