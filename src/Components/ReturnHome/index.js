import React from 'react';
import styled from 'styled-components';

import { Link } from "react-router-dom";

const LinkContainer = styled.div`
  font-weight: 500;
  font-style: italic;
  display: flex;
  margin: 1.5rem;
  text-decoration: none;
}
`

const StyledLink = styled(Link)`
  color: green;
  text-decoration: none;
  position: relative;
`


const ReturnHome = () => {
  return (
    <LinkContainer>
      <StyledLink to={"/"}><i className="fas fa-chevron-circle-left"></i> Return Home </StyledLink>
    </LinkContainer>
  );
}


export default ReturnHome;
