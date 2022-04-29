import './style.css'
import React from 'react'
import { useState } from 'react'

export default function Nav() {

    const [headerClass, setHeaderClass] = useState('header')
    const [mobileNav, setMobileNav] = useState(false)

    function handleOpen(event) {
        event.preventDefault()
        if (headerClass === 'header') setHeaderClass('header nav-open')
        else setHeaderClass('header')

        setMobileNav(!mobileNav)
    }

    function handleClick(event) {
        event.preventDefault()
        if (headerClass === 'header') setHeaderClass('header nav-open')
        else setHeaderClass('header')

        setMobileNav(!mobileNav)
    }

    return (
        <header className={headerClass}>
        <a href="#">
            {/* <img className="logo" src="img/omnifood-logo.png" alt="Omnifood logo" /> */}
            <p>LOGO</p>
        </a>
        
        <nav className="main-nav">
            <ul className="main-nav-list">
                <li><a onClick={handleClick} className="main-nav-link" href="#section-how">Sobre Nosotros</a></li>
                <li><a onClick={handleClick} className="main-nav-link" href="#section-meals">Precios</a></li>
                <li><a onClick={handleClick} className="main-nav-link" href="#section-testimonials">Feedback</a></li>
                <li><a onClick={handleClick} className="main-nav-link" href="#section-pricing">Clases</a></li>
                <li><a onClick={handleClick} className="main-nav-link nav-cta" href="#section-cta">Pruébalo gratis</a></li>
            </ul>
        </nav>

        <button className="btn-mobile-nav" onClick={handleOpen}>{!mobileNav ? 'Open' : 'Close'}</button>
       
    </header>
    )
}