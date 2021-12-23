import styled from "styled-components";
import React from "react";
import Header from "../../Components/Header";

const Container= styled.section`
  display: flex;
  flex-wrap: wrap;
  margin: 0 2rem;
  justify-content: center;
`
const Up= styled.div`
  display: flex;
  flex-direction: row;
`

const CardImage= styled.img`
  width: 30%;
  height: auto;
  margin: 10px;
`

const BookDetailsContainer= styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 10px;
`

const Details= styled.p`
  display: flex;
  flex-direction: column;
  color: gray;
`


const Synopsis= styled.div`
  display: flex;
  background: yellow;
  flex-direction: column;
`
const Title= styled.h1`
  font-size: 1rem;
`

const Text= styled.p`
  font-size: 1rem;
`


const AddToCardButton = styled.button`
  color: white;
  background: rgb(186, 201, 100);
  border: none;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 0.8rem;
  @media (min-width: 768px){
    font-size: 1rem;
  }
  @media (min-width: 992px) {
    font-size: 1.3rem;
  }
`

const Icons= styled.div`
  display: flex;
  flex-direction: row;
`


const card = {
    title: "The beginning of everything",
    image: "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80",
    price: "$120",
    year: 2020,
    author: "Priscila Alfaro Segura",
    synopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}

const BookDetails= () =>{
    return (
        <>
            <Header/>
        <Container>
            <Up>
            <CardImage src={card.image} alt="card patron"/>
            <BookDetailsContainer>
                <Details>Title: {card.title}</Details>
                <Details>Author: {card.author}</Details>
                <Details>Year: {card.year}</Details>
                <Details>Editorial: {card.year}</Details>
                <Details>Pages: {card.title}</Details>
                <Details>Isbn: {card.title}</Details>
                <Icons>
                <AddToCardButton> <i className="fas fa-shopping-cart"></i> </AddToCardButton>
                <AddToCardButton> <i className="fas fa-heart"></i> </AddToCardButton>
                </Icons>
            </BookDetailsContainer>
            </Up>

            <Synopsis>
                <Title>Synopsis:</Title>
                <Text>{card.synopsis}</Text>
            </Synopsis>
        </Container>
        </>
    );
}

export default BookDetails;