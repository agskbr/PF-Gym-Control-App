import React, { useState } from 'react';
import s from './SideBar.module.css';
import {AiFillHome} from 'react-icons/ai';
import {CgGym} from 'react-icons/cg'; 
import {GiChickenOven} from 'react-icons/gi';
import {FaUserCircle} from 'react-icons/fa';
import {BsCartFill} from 'react-icons/bs';
import {GoSignOut} from 'react-icons/go'
import logo from '../../../../assets/logo.png'
import {NavLink} from 'react-router-dom'


export default function SideBar(){
  const [isOpen, setIsOpen]= useState(false);
  const toggle= ()=> setIsOpen(!isOpen);

  const menuItem = [
    {
      icon: <FaUserCircle/>,
      name:"Mi Perfil",
      path:"/miperfil",
    },
    {
        name:"Home",
        icon: <AiFillHome/>,
        path:"/",
    },
    {
        name:"Actividades",
        icon: <CgGym/>,
        path:"/myActivities",
    },
    {
        name:"Recetas",
        icon: <GiChickenOven/>,
        path:"/Recetas",
    },
    {
        name:"Compras",
        icon: <BsCartFill/>,
        path:"/miscompras",
    },
    {
        name:"SignOut",
        icon: <GoSignOut/>,
        path:"/",
    }
  ]
  return (
    <div className={s.sideBarUserContainer}>
      <div style={{width: isOpen ? "250px" : "50px"}} className={s.sideBarUser}>
        <div className={s.sideBarLogo}>
          <img src={logo} alt="logo" width={30} onClick={toggle} />
            <h1 style={{display: isOpen ? "block" : "none"}} className={s.sideBarTitle}>Gym Control</h1>
        </div>
        {
          menuItem.map((item, index)=>(
            <NavLink to={item.path} key={index} className={s.sideBarLink} activeClassname="active">
              <div className={s.sideBarIcon}>{item.icon}</div>
              <div style={{display: isOpen ? "block" : "none"}} className={s.sideBarText}>{item.name}</div> 
            </NavLink>
          ))
        }
      </div>
      {/* <main>{children}</main> */}
    </div>
  )
}

