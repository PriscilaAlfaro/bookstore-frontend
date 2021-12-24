import React  from 'react';
import styled from 'styled-components/macro';


const BigButton = styled.button`
  width: 150px;
  height: 50px;
  border: 4px solid #005D25;
  box-sizing: border-box;
  border-radius: 50px;
  margin: 20px auto;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  -webkit-transition: all 0.4s ease-in-out 0s;
  -moz-transition: all 0.4s ease-in-out 0s;
  transition: all 0.4s ease-in-out 0s;
  color: #005D25;
  background: #FFFFF;
  text-decoration: none;
  @media (min-width: 768px){
    font-size: 1.6rem;
    width: 200px;
    height: 60px;
  }
    &:hover { 
        background: rgb(67, 138, 94);
        color: white !important;
    }
    &:disabled {
        color: rgba(0, 94, 37, 0.5);
        background: rgba(0, 94, 37, 0.25);
        pointer-events: none;
    }
  
`


const Button = ({ buttonText, onClick }) => {
    return (
        <BigButton onClick={onClick}>{buttonText}</BigButton>
    );
}

export default Button;