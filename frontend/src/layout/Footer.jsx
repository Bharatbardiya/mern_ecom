import React from "react";
import {
  AiOutlineInstagram,
  AiFillLinkedin,
  AiFillGithub,
  AiFillPicture,
} from "react-icons/ai";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="lincense">
        <h4>All Rights Are Reserver &copy; {new Date().getFullYear()}</h4>
        <p>
          This is A fully functional ecommerece website developed by Mr. Bharat
          Bardiya fill free to clone and use for any non-commercial use from out
          github.
        </p>
      </div>

      <div className="links">
        <h4>Our Social Media Handles</h4>
        <div>
          <a target={"blank"} href="https://github.com/Bharatbardiya">
            <AiFillGithub />
            <p>Github</p>
          </a>
          <a target={"blank"} href="https://instagram.com/bharat_bardiya">
            <AiOutlineInstagram />
            <p>Instagram</p>
          </a>
          <a target={"blank"} href="https://linkedin.com/in/bharatbardiya">
            <AiFillLinkedin />
            <p>Linkedin</p>
          </a>
          <a target={"blank"} href="https://leetcode.com/bharat_bardiya">
            <AiFillPicture />
            <p>Leetcode</p>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
