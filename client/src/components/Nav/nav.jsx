import "./style.css";
import React from "react";
import { useState, useEffect } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";

export default function Nav() {
  let [headerClasses, setHeaderClasses] = useState([]);
  let [scrollPosition, setScrollPosition] = useState(0);

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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={headerClasses}>
      <a href="/">
        <div className="logo"></div>
      </a>

      <nav className="main-nav">
        <ul className="main-nav-list">
          
         {/*  <li>
            <a className="main-nav-link" href="#section-meals">
              Precios
            </a>
          </li> */}
          <li>
            <a className="main-nav-link" href="#section-testimonials">
              Feedback
            </a>
          </li>
          <li>
            <a className="main-nav-link" href="#clases">
              Clases
            </a>
          </li>
          <li>
            <a className="main-nav-link" href="#about">
              Sobre Nosotros
            </a>
          </li>
          <li>
            {/* <Link to={"/admindashboard"} className="main-nav-link nav-cta">
              Administrar
            </Link> */}
          </li>
          <li>
            <div className="buttonCart">
            </div>
          </li>
        </ul>
      </nav>

      {/*  <button className="btn-mobile-nav" >{!mobileNav ? 'Open' : 'Close'}</button> */}
    </header>
  );
}
