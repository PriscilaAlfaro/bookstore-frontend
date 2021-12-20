import React from 'react';
import styled from 'styled-components';

const CardContainer= styled.div`
    color: #000000;
    width: 200px;
    height: auto;
    margin: 1rem;
    text-align: center;
    @media (min-width: 768px){
        //width: 500px;
        //height: 650px;
    }
`

const CardImage= styled.img`
    width: 100%;
    height: 310px;
    border-radius: 2px 2px 0px 0px;
    @media (min-width: 768px){
        //width: 500px;
        //height: 447px;
    }
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

const Price = styled.h2`
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
    title: "The beginning of everything.",
    image: "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80",
    price: "$120",
}

const Book = () => {
    return (
        <CardContainer>
            <CardImage src={card.image} alt="card patron"/>
            <CardTitle>{card.title}</CardTitle>
            <Price>{card.price}</Price>
        </CardContainer>
    );
}

export default Book;