import Book from "../Book";
import styled from "styled-components";

const BooksMainContainer= styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 2rem;
  justify-content: center;
`

const BooksContainer= () =>{
    return (
        <BooksMainContainer>
            <Book/>
            <Book/>
            <Book/>
            <Book/>
            <Book/>
        </BooksMainContainer>
    );
}

export default BooksContainer;
