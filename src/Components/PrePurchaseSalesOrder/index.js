import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";

const MainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 2rem auto;
  width: 90%;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  background: linear-gradient(180deg, rgba(249,250,245,0.25442051820728295) 0%, rgba(153,150,187,0.5765493697478992) 72%);
`

const Title = styled.h1`
  width: 100%;
  font-weight: bold;
  font-size: 1.5rem;
  color: black;
  text-align: left;
  margin: 1rem auto;
`

const Text = styled.p`
  width: 100%;
  font-style: normal;
  font-size: 1rem;
  color: black;
  text-align: left;
  margin: 0.3rem 1rem;
  @media (min-width: 768px){
   font-size: 1rem;
  }
`

const SpecialText = styled.p`
  width: 60%;
  font-weight: bold;
  font-size: 1rem;
  color: black;
  text-align: left;
  margin: auto 1rem;
  padding: 1rem 0;
  border-top: 1px solid black;
  @media (min-width: 768px){
   width: 50%;
  }
`


const PrePurchaseSalesOrder = () => {
  const itemsInCart = useSelector(store => store.cart.items);
  const subTotal = itemsInCart?.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  const taxes = Math.round((subTotal * 0.13) * 100) / 100;
  const total = subTotal + taxes;


  return (
    <MainContainer>
      <Title>Order Summary</Title>
      <Text>Subtotal: {subTotal || 0} Kr</Text>
      <Text>Shipping: 0 Kr</Text>
      <Text>Estimated tax: {taxes} Kr</Text>
      <SpecialText>TOTAL: {total} Kr</SpecialText>
    </MainContainer>
  );
}


export default PrePurchaseSalesOrder;

