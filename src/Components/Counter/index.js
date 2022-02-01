import React from 'react';
import styled from 'styled-components/macro';

import { useDispatch, useSelector  } from 'react-redux';
import { cart } from '../../reducers/cart';

const Container = styled.section`
  display: flex;
  background-color: white;
  flex-direction: row;
  margin: auto 0.5rem;
  @media (min-width: 768px){
    margin: auto 0.7rem;
  }
`

const Button = styled.button`
  background-color: rgb(71, 96, 114);
  color: white;
  padding: 2px 8px;
  border: none;
  @media (min-width: 768px){
      padding: 5px 12px;
  }
`

const Count = styled.p`
  background-color: white;
  font-size: 0.8rem;
  margin: auto 8px;
  @media (min-width: 768px){
      font-size: 1rem;
      margin: auto 10px;
  }
`

const Counter = ({ quantity, productId}) => {
  const dispatch = useDispatch();
  const userId = useSelector(store => store.user.id);

  const handleOnClickPlus = () => {
    dispatch(cart.actions.addItemToCart({ productId, userId }));
  }

  const handleOnClickReduce = () => {
    dispatch(cart.actions.removeItemFromCart({ productId })); 
  }

  return (
      <Container>
      <Button onClick={handleOnClickReduce}>-</Button>
      <Count>{quantity}</Count>
      <Button onClick={handleOnClickPlus}>+</Button>
      </Container>
  );
}

export default Counter;