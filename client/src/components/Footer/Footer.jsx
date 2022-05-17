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
import {Link} from 'react-router-dom';
import footer from './Footer.module.css'
import { AiFillFacebook } from 'react-icons/ai';
import {BsInstagram} from 'react-icons/bs';
import {AiFillTwitterCircle} from 'react-icons/ai';

const Footer = () => {
  return (
    <div className= {footer.All}>
      <Link className= {footer.About} to='/about'>About Us</Link>
      <Link className= {footer.Rules} to='/rules'>Rules</Link>

      <a href='https://www.instagram.com/PowerGym/'><p className={footer.fa}><BsInstagram/></p></a>
      <a href='https://twitter.com/PowerGym'><p className={footer.fa}><AiFillTwitterCircle/></p></a>
      <a href='https://www.facebook.com/PowerGym'><p className= {footer.fa}><AiFillFacebook/></p></a>
      <p className ={footer.Name}>©Power Gym</p>
    </div>
  );
};
export default Footer;