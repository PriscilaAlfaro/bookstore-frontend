import React from 'react';
import styled from 'styled-components';

import { Link } from "react-router-dom";

const FooterContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  background-color: rgb(81, 146, 89);
  align-items: center;
  text-align: center;
  flex-direction: column;
  // margin-top: 2rem;
`
const FooterCenter = styled.p`
  font-size: 1rem;
  width: 100%;
  font-weight: bold;
  margin: 2rem auto;
`
const FooterSubCenter = styled.p`
  font-size: 0.7rem;
  width: 100%;
  font-style: italic;
  margin 2rem auto;
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
const ColumnTitle = styled.h2`
  font-size: 1rem;
`
const Ancor = styled.a`
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  color: #323232;
`

const Footer = () => {
    return (
        <FooterContainer>
        <FooterCenter>Sweden Tech Library</FooterCenter>
            <FooterColumns>
                <FooterColumn>
                    <ColumnTitle>BookStore Project</ColumnTitle>
                    <FooterElement><Ancor href="https://github.com/PriscilaAlfaro/bookstore-frontend" target="_blank" rel="noreferrer noopener">Frontend</Ancor></FooterElement>
                    <FooterElement><Ancor href="https://github.com/PriscilaAlfaro/bookstore-backend" target="_blank" rel="noreferrer noopener">Backend</Ancor></FooterElement>
                    <FooterElement>Stockholm, Sweden</FooterElement>
                </FooterColumn>
                <FooterColumn>
                    <ColumnTitle>Contact</ColumnTitle>
                    <FooterElement><Ancor href="https://www.linkedin.com/in/priscila24n/" target="_blank" rel="noreferrer noopener">LinkedIn</Ancor></FooterElement>
                    <FooterElement><Ancor href="https://github.com/PriscilaAlfaro?tab=repositories" target="_blank" rel="noreferrer noopener">GitHub</Ancor></FooterElement>
                    <FooterElement><Ancor href="mailto:priscila24n@hotmail.com" target="_blank" rel="noreferrer noopener">Email</Ancor></FooterElement>
                </FooterColumn>
                <FooterColumn>
                    <ColumnTitle>My account</ColumnTitle>
                    <Link to={"/cart"} style={{ textDecoration: "none", color: "#323232", cursor: "pointer" }}><FooterElement>Cart</FooterElement></Link>
                    <Link to={"/wishlist"} style={{ textDecoration: "none", color: "#323232", cursor: "pointer" }}><FooterElement>Wishlist</FooterElement></Link>
                    <Link to={"/register"} style={{ textDecoration: "none", color: "#323232", cursor: "pointer" }}><FooterElement>Profile</FooterElement></Link>
                </FooterColumn>
            </FooterColumns>
            <FooterSubCenter>©Copyright 2022/bookStore Project</FooterSubCenter>
        </FooterContainer>
    );
}

export default Footer;