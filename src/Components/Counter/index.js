import React, {useState} from 'react';
import styled from 'styled-components/macro';


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

const Counter = () => {
    const [count, setCount] = useState(0);

    return (
        <Container>
            <Button onClick={() => setCount(count - 1)}>-</Button>
            <Count>{count}</Count>
            <Button onClick={() => setCount(count + 1)}>+</Button>
        </Container>
    );
}

export default Counter;