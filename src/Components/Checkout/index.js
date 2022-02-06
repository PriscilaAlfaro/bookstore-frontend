import React, { useEffect } from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";


const CheckoutMainContainer = styled.div`
  heigth: auto;
  width: 80%;
  display: block;
  margin: 1rem auto;
`

const Title = styled.h1`
  width: 100%;
  font-style: normal;
  font-weight: bold;
  font-size: 1.5rem;
  color: black;
  text-align: center;
  margin: 1rem auto;
`



const Checkout = () => {
    const checkoutOrderRedux = useSelector(store => store.salesOrder.checkoutOrder);
    useEffect(() => {
        if (checkoutOrderRedux) {
            var checkoutContainer = document.getElementById('my-checkout-container')
            checkoutContainer.innerHTML = checkoutOrderRedux.html_snippet.replace(/\\"/g, "\"").replace(/\\n/g, "");
            var scriptsTags = checkoutContainer.getElementsByTagName('script')
            for (var i = 0; i < scriptsTags.length; i++) {
                var parentNode = scriptsTags[i].parentNode
                var newScriptTag = document.createElement('script')
                newScriptTag.type = 'text/javascript'
                newScriptTag.text = scriptsTags[i].text
                parentNode.removeChild(scriptsTags[i])
                parentNode.appendChild(newScriptTag)
            }
        }
    });

    return (
        <CheckoutMainContainer> 
            <Title> Proceed with your checkout</Title>
            <div id="my-checkout-container"></div>
        </CheckoutMainContainer>
    );
}

export default Checkout;
