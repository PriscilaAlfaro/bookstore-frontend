import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import BooksContainer from "../../Components/BooksContainer";
import {Link} from "react-router-dom";
import React from "react";

const Wishlist= () =>{
    return (
        <>
            <Header/>
            <Link to={"/"}><i className="fas fa-chevron-circle-left"> Return Home</i></Link>
            <BooksContainer/>
            <Footer/>
        </>
    );
}

export default Wishlist;
