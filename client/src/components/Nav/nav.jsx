import "./style.css";
import React from "react";
import { useState, useEffect } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";

export default function Nav() {
  let [headerClasses, setHeaderClasses] = useState("header");
  let [scrollPosition, setScrollPosition] = useState(0);
  let [cartClass, setCartClass] = useState('cart-closed')
  const [headerClass, setHeaderClass] = useState('header')
  const [mobileNav, setMobileNav] = useState(false)

  function handleOpen(event) {
      event.preventDefault()
      if (headerClass === 'header') setHeaderClass('header nav-open')
      else if (headerClass === 'headerScrolled') setHeaderClass('headerScrolled nav-open')
      else setHeaderClass('headerScrolled')

      setMobileNav(!mobileNav)
  }

  function handleClick(event) {
      event.preventDefault()
      if (headerClass === 'header') setHeaderClass('header nav-open')
      else if (headerClass === 'headerScrolled') setHeaderClass('headerScrolled nav-open')
      else setHeaderClass('header')

      setMobileNav(!mobileNav)
  }

  // useState(() => {
  //   setHeaderClasses(classNames("header"));
  // }, []);

  const handleScroll = () => {
    setScrollPosition((scrollPosition = window.scrollY));

    if (scrollPosition < 10) {
      return setHeaderClass("header");
    }
    if (scrollPosition > 20) {
      return setHeaderClass("headerScrolled");
    }
  };

  function handleCartClick() {
    if (cartClass === 'cart-closed') setCartClass('cart-open')
    if (cartClass === 'cart-open') setCartClass('cart-closed')

    if (headerClass === 'header') setHeaderClass('header nav-open')
    else if (headerClass === 'headerScrolled') setHeaderClass('headerScrolled nav-open')
    else setHeaderClass('headerScrolled')
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={headerClass}>
      <a href="/">
        <div className="logo"></div>
      </a>
      {/* <a href="/login">
        <div className="login"></div>
      </a> */}

      <nav className="main-nav">
        <div>
          
        </div>
        <ul className="main-nav-list">
          <li>
            <a className="main-nav-link" href="/login">
              Login
            </a>
          </li>
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

       <button onClick={handleOpen} className="btn-mobile-nav" >{!mobileNav ? 'Menu' : 'Menu'}</button>
    
    </header>
    
  );
}

// // import './style.css'
// import React from 'react'
// import { useState } from 'react'

// export default function Nav() {

    // const [headerClass, setHeaderClass] = useState('header')
    // const [mobileNav, setMobileNav] = useState(false)

    // function handleOpen(event) {
    //     event.preventDefault()
    //     if (headerClass === 'header') setHeaderClass('header nav-open')
    //     else setHeaderClass('header')

    //     setMobileNav(!mobileNav)
    // }

    // function handleClick(event) {
    //     event.preventDefault()
    //     if (headerClass === 'header') setHeaderClass('header nav-open')
    //     else setHeaderClass('header')

    //     setMobileNav(!mobileNav)
    // }

//     return (
//         <header className={headerClass}>
//         <a href="#">
//             {/* <img className="logo" src="img/omnifood-logo.png" alt="Omnifood logo" /> */}
//             <p>LOGO</p>
//         </a>
        
//         <nav className="main-nav">
//             <ul className="main-nav-list">
//                 <li><a onClick={handleClick} className="main-nav-link" href="#section-how">Sobre Nosotros</a></li>
//                 <li><a onClick={handleClick} className="main-nav-link" href="#section-meals">Precios</a></li>
//                 <li><a onClick={handleClick} className="main-nav-link" href="#section-testimonials">Feedback</a></li>
//                 <li><a onClick={handleClick} className="main-nav-link" href="#section-pricing">Clases</a></li>
//                 <li><a onClick={handleClick} className="main-nav-link nav-cta" href="#section-cta">Pruébalo gratis</a></li>
//             </ul>
//         </nav>

//         <button className="btn-mobile-nav" onClick={handleOpen}>{!mobileNav ? 'Open' : 'Close'}</button>
       
//     </header>
//     )
// }