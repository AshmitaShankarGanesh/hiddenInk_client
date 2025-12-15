import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../assets/image.png'; 
import { AiFillHome } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { IoMdContact } from "react-icons/io";
import { LuListTodo } from "react-icons/lu";
import ThemeToggle from "./ThemeToggle";


const Header = () => {
  return (
    <header className="bg-blue-300 text-black p-4 fixed w-full shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center text-2xl font-bold">
          <img src={LogoImage} alt="Logo"className="h-20 w=25 mr-10 "/>
        </div>
        <div className="flex gap-6">
              <ul className="flex gap-6">
                <Link to='/' className='hover:text-blue-500 hover:underline font-bold'>
                     <li><AiFillHome size={25} color="white" /></li>
                </Link>
                <Link to='/about' className='hover:text-blue-500 hover:underline font-bold'>
                     <li><AiOutlineEdit size={25} color="white" /></li>
                </Link>
                <Link to='/todo' className='hover:text-blue-500 hover:underline font-bold'>
                        <li><LuListTodo size={25} color="white" /></li>
                </Link>
                <Link to='/contact' className='hover:text-blue-500 hover:underline font-bold'>
                     <li><IoMdContact size={25} color="white" /></li>
                </Link> 
                
                  
              </ul>
           </div>
      </div>
    </header>
  )
}

export default Header
