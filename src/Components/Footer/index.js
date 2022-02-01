import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  background-color: rgb(81, 146, 89);
  align-items: center;
  text-align: center;
  flex-direction: column;
`
const FooterCenter = styled.p`
  font-size: 1rem;
  width: 100%;
  font-weight: bold;
`

const FooterSubCenter = styled.p`
  font-size: 0.7rem;
  width: 100%;
  font-style: italic;
`

const FooterColumns = styled.div`
  display: block;
  height: auto;
  color: #323232;
  width: 100%;
  margin: 0 auto;
    @media (min-width: 768px){
    display: flex;
    flex-direction: row;
    }
`
const FooterColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
   @media (min-width: 768px){
  width: 30%;
   box-shadow: none;
    }
`
const FooterElement = styled.p`
  font-size: 1rem;
`

const Footer=()=> {
    return (
        <FooterContainer>
        <FooterCenter>Sweden Tech Library</FooterCenter>
            <FooterColumns>
                <FooterColumn>
                    <FooterElement> BookPAS Project</FooterElement>
                    <FooterElement>Stockholm, Sweden</FooterElement>
                    <FooterElement>priscila24n@hotmail.com</FooterElement>
                    <FooterElement>+46 70 296 4775</FooterElement>
                </FooterColumn>
                <FooterColumn>
                    <FooterElement>Contact</FooterElement>
                    <FooterElement>Facebook</FooterElement>
                    <FooterElement>Instagram</FooterElement>
                    <FooterElement>YouTube</FooterElement>
                </FooterColumn>
                <FooterColumn>
                    <FooterElement>My account</FooterElement>
                    <FooterElement>Sing in</FooterElement>
                    <FooterElement>My wishlist</FooterElement>
                    <FooterElement>My history</FooterElement>
                </FooterColumn>
            </FooterColumns>
            <FooterSubCenter>©Copyright 2021/bookPAS</FooterSubCenter>
        </FooterContainer>
    );
}

export default Footer;