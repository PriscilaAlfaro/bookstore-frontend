import React from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import {useDispatch } from 'react-redux';

import { deleteCookie, readCookie } from "../../utils/cookies";
import { user } from "../../reducers/user";

const Button = styled.button`
  display: flex;
  background: rgb(67, 111, 138);
  color: azure;
  padding: 5px 10px;
  font-size: 1.2rem;
  border-radius: 5px;
  border: none;
  margin: 1rem auto;
  cursor: pointer;
  width: 90%;
  @media (min-width: 768px){
     width: 50%;
  }
`
const Text = styled.p`
  color: white;
  margin: 0 auto;
`

const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userFromCookie = readCookie("username");
    const emailFromCookie = readCookie("email");
    const accessTokenFromCookie = readCookie("accessToken");
    const idFromCookie = readCookie("id");

    const handleLogout = () => {
        deleteCookie("username");
        deleteCookie("email");
        deleteCookie("accessToken");
        deleteCookie("id");
        deleteCookie("cartId");
        dispatch(user.actions.setclearUser());
        navigate('/')
    }

    return (
      <React.Fragment>
        {userFromCookie && emailFromCookie && accessTokenFromCookie && idFromCookie && 
        <Button onClick={handleLogout}>
            <Text>Log out</Text> 
        </Button>
        }
      </React.Fragment>
    );
}

export default LogoutButton;
