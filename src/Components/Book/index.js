import React from 'react';
import styled from 'styled-components';

const Container= styled.section`
  width: 200px;
  height: auto;
  margin: 1rem;
  text-align: center;
  box-sizing: border-box;
`

const ImageContainer= styled.div`
  width: 200px;
  height: auto;
  position: relative;
  cursor: pointer;
`

const CardImage= styled.img`
  width: 100%;
  height: auto;
  z-index: 0;

`

const Overlay= styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0,.75);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 3;
  box-sizing: border-box;
  ${Container}:hover & {
    display: flex;
  }
`

const IconHeart= styled.i`
  cursor: pointer;
  font-size: 30px;
  filter: invert(1);
  &:hover {
    transform: scale(1.2);
  }
`

const AddToCartButton= styled.button`
  cursor: pointer;
  font-size: 1rem;
  background-color: rgb(67, 111, 138);
  width: 100%;
  height: 30px;
  border: none;
  color: azure;
`

const CardTitle = styled.h1`
  font-family: Rosarivo;
  width: 100%;
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  @media (min-width: 768px){
    font-size: 1.5rem;
  }
`

const CardSubTitle = styled.h2`
  font-family: Rosarivo;
  color: gray;
  width: 100%;
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  @media (min-width: 768px){
    font-size: 1.5rem;
  }
`

const BookInfo = styled.h2`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 1rem;
  width: 100%;
  @media (min-width: 768px){
    font-size: 1.5rem;
  }
`

const card = {
    title: "The beginning of everything",
    image: "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80",
    price: "$120",
    author: "Priscila Alfaro Segura"
}

const Book = () => {
    return (
        <Container>
        <ImageContainer href="https://www.todostuslibros.com/" target="_blank">
            <CardImage src={card.image} alt="card patron"/>
            <Overlay>
              <IconHeart className="fas fa-heart"></IconHeart>
            </Overlay>
        </ImageContainer>
            <AddToCartButton >Add to cart</AddToCartButton>
            <CardTitle >{card.title}</CardTitle>
            <CardSubTitle>{card.author}</CardSubTitle>
            <BookInfo>{card.price}</BookInfo>
        </Container>
    );
}

export default Book;