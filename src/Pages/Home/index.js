import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import BooksContainer from "../../Components/BooksContainer";
import {Link} from "react-router-dom";
import React from "react";

const Home= () =>{
    return (
        <>
            <Header/>
            <Link to="/bookDetails">BookDetails     - </Link>
            <Link to="/notFound">notFound  --- </Link>
            <Link to="/cart">Cart ----</Link>
            <Link to="/wishlist"> ---- Wishlist</Link>
            <Link to="/signup"> ---- signup</Link>
            <Link to="/login"> ---- Login</Link>
            <BooksContainer/>
            <Footer/>
        </>
    );
}

export default Home;
