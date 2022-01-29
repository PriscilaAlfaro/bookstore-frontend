import styled from "styled-components";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Header from "../../Components/Header";
import Counter from "../../Components/Counter";
import { cart } from "../../reducers/cart";
import { API_URL } from '../../utils/url';

const Container= styled.section`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  justify-content: center;
  width: 90%;
  flex-direction: column;
`

const ItemDetails= styled.div`
background-color: #61dafb;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  justify-content: flex-start;
  margin: 10px auto;
  @media (min-width: 768px){
    
  }
`

const CardImage= styled.img`
  width: 10%;
  height: auto;
  margin: 10px 20px;
`

const BookDetailsContainer= styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px auto;
  align-items: center;
`

const Text= styled.h2`
  font-size: 1rem;
`

const DeleteButton = styled.button`
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


// const card = {
//     title: "The beginning of everything",
//     image: "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80",
//     price: "$120",
//     year: 2020,
//     author: "Priscila Alfaro Segura",
//     synopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
// }

const Cart = () => {
  const itemsInCart = useSelector(store => store.cart.items);
  
  const dispatch = useDispatch();

  useEffect(() => {
  fetch(API_URL('carts/61cc5dd60c70b047c55cb0fe'))//userId
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.success) {
        dispatch(cart.actions.setCart(data.response));
        dispatch(cart.actions.setError(null));
      } else {
        dispatch(cart.actions.setCart([]));
        dispatch(cart.actions.setError(data.response));
      }
    }).catch((error) => {
      console.log('Error in Fetch:' + error.message);
    });
  }, [dispatch]);

  //fetch al backend para traer el carrito hidratado y caerle encima a los items del redux

    return (
        <>
        <Header/>
        <Link to={"/"}><i className="fas fa-chevron-circle-left">Return</i></Link>
            <Container>
                <ItemDetails>
            {itemsInCart.map(item=>{
              return(
              <BookDetailsContainer key={item.productId}>
                <CardImage src={item.url} alt={item.title} />
                <Text>{item.title}</Text> 
                <Text>Price: ${item.price}</Text>
                  <Counter quantity={item.quantity} productId={item.productId}/>
                <DeleteButton><i className="fas fa-trash"></i></DeleteButton>
              </BookDetailsContainer>
            )})}
                </ItemDetails>
                Checkout
            </Container>
        </>
    );
}

export default Cart;