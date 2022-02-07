import React, { useEffect } from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";

import { readCookie } from "../../utils/cookies";
import { getConfirmationFromKlarna } from "../../managers/checkoutManager";
import { salesOrder } from "../../reducers/salesOrder";

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

const OrderConfirmation = () => { 
    
    const dispatch = useDispatch();
    const klarnaOrderId = readCookie("klarnaOrderId");

useEffect(()=> {
    
    getConfirmationFromKlarna(klarnaOrderId).then(confirmationPaymentResponse => {

        if(confirmationPaymentResponse.success){
        const confirmationPayment = confirmationPaymentResponse.response;

        var checkoutContainer = document.getElementById('my-checkout-container')
        checkoutContainer.innerHTML = confirmationPayment.html_snippet.replace(/\\"/g, "\"").replace(/\\n/g, "");
        var scriptsTags = checkoutContainer.getElementsByTagName('script')
        for (var i = 0; i < scriptsTags.length; i++) {
            var parentNode = scriptsTags[i].parentNode
            var newScriptTag = document.createElement('script')
            newScriptTag.type = 'text/javascript'
            newScriptTag.text = scriptsTags[i].text
            parentNode.removeChild(scriptsTags[i])
            parentNode.appendChild(newScriptTag)
            }
        } else {
            dispatch(salesOrder.actions.setError(confirmationPaymentResponse.response));
             throw new Error('Error adding item to cart')
        }

    });
}, [dispatch, klarnaOrderId])

    return (
        <CheckoutMainContainer>
            <Title> Order confirmation</Title>
            <div id="my-checkout-container"></div>
        </CheckoutMainContainer>
    );
}

export default OrderConfirmation;
