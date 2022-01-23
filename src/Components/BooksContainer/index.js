import Book from "../Book";
import styled from "styled-components";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { Loader } from "../Loader";

const BooksMainContainer= styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 3rem auto;
  justify-content: center;
`

const BooksContainer= () =>{
    const books = useSelector(store => store.books.bookItems);

    return (
        <BooksMainContainer>
            {books ? books.map(book => { return <Link className="ancor" key={book._id} to={`/bookDetails/${book._id}`}><Book book={book} /></Link> }) : < Loader />}
        </BooksMainContainer>
    );
}

export default BooksContainer;
