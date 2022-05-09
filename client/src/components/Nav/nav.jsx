import "./style.css";
import React from "react";
import { useState, useEffect } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";

export default function Nav() {
  let [headerClasses, setHeaderClasses] = useState([]);
  let [scrollPosition, setScrollPosition] = useState(0);
  let [cartClass, setCartClass] = useState('cart-closed')

  useState(() => {
    setHeaderClasses(classNames("header"));
  }, []);

  const handleScroll = () => {
    setScrollPosition((scrollPosition = window.scrollY));

    if (scrollPosition < 10) {
      return setHeaderClasses((headerClasses = ["header"]));
    }
    if (scrollPosition > 20) {
      return setHeaderClasses((headerClasses = ["headerScrolled"]));
    }
  };

  function handleCartClick() {
    if (cartClass === 'cart-closed') setCartClass('cart-open')
    if (cartClass === 'cart-open') setCartClass('cart-closed')
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={headerClasses}>
      <a href="/">
        <div className="logo"></div>
      </a>
      <a href="/login">
        <div className="login"></div>
      </a>

      <nav className="main-nav">
        <ul className="main-nav-list">
          
         {/*  <li>
            <a className="main-nav-link" href="#section-meals">
              Precios
            </a>
          </li> */}
          <li>
            <a className="main-nav-link" href="#about">
              Sobre Nosotros
            </a>
          </li>
          <li>
            <a className="main-nav-link" href="#clases">
              Clases
            </a>
          </li>
          <li>
            <a className="main-nav-link" href="#section-testimonials">
              Feedback
            </a>
          </li>
          
          <li>
            {/* <Link to={"/admindashboard"} className="main-nav-link nav-cta">
              Administrar
            </Link> */}
          </li>
          <li>
            <div className="buttonCart" onClick={handleCartClick}>
            </div>
          </li>
        </ul>
      </nav>

      <div className={cartClass}>
            <Cart className='cart-nav'/>
            <button className="close-cart" onClick={handleCartClick}>X</button>
      </div>

      {/*  <button className="btn-mobile-nav" >{!mobileNav ? 'Open' : 'Close'}</button> */}
    </header>
    
  );
}