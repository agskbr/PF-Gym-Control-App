import React from 'react';
import {Link} from 'react-router-dom';
import footer from './Footer.module.css'
import { AiFillFacebook } from 'react-icons/ai';
import {BsInstagram} from 'react-icons/bs';
import {AiFillTwitterCircle} from 'react-icons/ai';
import {SiGmail} from 'react-icons/si';
import {BsWhatsapp} from 'react-icons/bs';

const Footer = () => {
  return (
    <div className= {footer.All}>
      <Link className= {footer.About} to='/about'>Sobre nosotros!</Link>

      <a href='https://www.instagram.com/PowerGym/' target="_blank"><p className={footer.fa}><BsInstagram/></p></a>
      <a href='https://twitter.com/PowerGym' target="_blank"><p className={footer.fa}><AiFillTwitterCircle/></p></a>
      <a href='https://www.facebook.com/PowerGym' target="_blank"><p className= {footer.fa}><AiFillFacebook/></p></a>
      <a href='https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=CllgCJlFmCmhZjSGPFvccQzWTVbCGSpSMKvVnSVGfjJFwZdWQRhWpSHWWjwPlvJBvSCDGSGwKvB' target="_blank"><p className= {footer.fa}><SiGmail/></p></a>
      <a href='https://chat.whatsapp.com/DkY0COIOu4ADHrSNlgX1Cu' target="_blank"><p className= {footer.fa}><BsWhatsapp/></p></a>
      <p className ={footer.Name}>©Power Gym</p>
    </div>
  ); 
};
export default Footer;