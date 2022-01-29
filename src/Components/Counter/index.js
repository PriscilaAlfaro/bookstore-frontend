import React, {useState} from 'react';
import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { cart } from '../../reducers/cart';

const Container = styled.section`
  display: flex;
  background-color: lightpink;
  flex-direction: row;
  margin: 10px;
`

const Button = styled.button`
  background-color: rgb(67, 138, 94);
  color: white;
`

const Count = styled.p`
  background-color: lightpink;
  font-size: 1rem;
  margin: auto 10px;
`

const Counter = ({ quantity, productId}) => {
  const dispatch = useDispatch();

const handleOnClickPlus = () => {
  dispatch(cart.actions.addItemToCart({ productId }));
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