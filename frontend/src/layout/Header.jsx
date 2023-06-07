import React from "react";
import { Routes, Route } from "react-router-dom";
import { AiFillCrown, AiOutlineShoppingCart } from "react-icons/ai";
import Search from "./Search";

const Header = () => {
  return (
    <header className="header">
      <a className="logo" href="/">
        <div className="logo-img">
          <AiFillCrown />
        </div>
        <div className="logo-name">
          <h1>ShopNow</h1>
        </div>
      </a>
      <Search />
      <div className="side-bar">
        <button>Login</button>
        <div className="cart-icon">
          <AiOutlineShoppingCart />
          <p>2</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
