import React from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import {useDispatch } from 'react-redux';

import { deleteCookie, readCookie } from "../../utils/cookies";

const Button = styled.button`
  display: flex;
  background: rgb(67, 111, 138);
  color: azure;
  padding: 5px 10px;
  font-size: 1.2rem;
  border-radius: 5px;
  border: none;
  margin: 1rem;
  cursor: pointer;
`

const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = readCookie("username");
    const email = readCookie("email");
    const accessToken = readCookie("accessToken");
    const id = readCookie("id");

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
        {user && email && accessToken && id && 
        <Button onClick={handleLogout}>
            Log out
        </Button>
        }
      </React.Fragment>
    );
}

export default LogoutButton;
