import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  background-color: rgb(67, 138, 94);
  align-items: center;
  text-align: center;
  flex-direction: column;
`
const FooterCenter = styled.p`
  font-size: 1rem;
  width: 100%;
`

const FooterColumns = styled.div`
  display: flex;
  flex-direction: row;
  height: auto;
  color: #323232;
  width: 100%;
  margin: 0 auto;
`
const FooterColumn = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`
const FooterElement = styled.p`
  font-size: 1rem;
`

const Footer=({color, links})=> {
    return (
        <FooterContainer background={color}>
            <FooterCenter>Content centralized</FooterCenter>
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
                    <FooterElement>YouTUbe</FooterElement>
                </FooterColumn>
                <FooterColumn>
                    <FooterElement>My account</FooterElement>
                    <FooterElement>Sing in</FooterElement>
                    <FooterElement>My wishlist</FooterElement>
                    <FooterElement>My history</FooterElement>
                </FooterColumn>
            </FooterColumns>
            <FooterCenter>©Copyright 2021/bookPAS</FooterCenter>
        </FooterContainer>
    );
}

export default Footer;