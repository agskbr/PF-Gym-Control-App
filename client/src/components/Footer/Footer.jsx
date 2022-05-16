// import './style.css'

// export default function Footer() {

//     return (
        
//             <div className="footer-container">
//                     {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1460 240">
//                         <path fill="#273036" fill-opacity="1" d="M0,192L360,32L720,288L1080,224L1440,0L1440,320L1080,320L720,320L360,320L0,320Z"></path>
//                     </svg> */}
//             </div>

//     )
// }


import React from 'react';
import {NavLink} from 'react-router-dom';
import './footer.css';

const Footer = () => {
  return (
    <div className='FooterAll'>
      <NavLink className='FooterAbout' to='/about'>About Us</NavLink>
      <NavLink className='FooterRules' to='/rules'>Rules</NavLink>
      <a href='https://www.instagram.com/PowerGym/'><p className="fa fa-instagram"></p></a>
      <a href='https://twitter.com/PowerGym'><p className='fa fa-twitter'></p></a>
      <a className='fa fa-facebook'href='https://www.facebook.com/PowerGym'><p></p></a>
      <p className='FooterName'>©Power Gym</p>
    </div>
  );
};
export default Footer;