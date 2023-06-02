import React from "react";
import {
  AiFillCrown,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";

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
      <div className="search-bar">
        <input type="text" />
        <button>
          <AiOutlineSearch />
        </button>
      </div>
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
