import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../assets/image.png';
import { AiFillHome, AiOutlineEdit } from "react-icons/ai";
import { IoMdContact } from "react-icons/io";

const Header = () => {
  return (
    <header className="bg-blue-300 text-black p-4 fixed w-full shadow-md z-50 transition-colors duration-300 ease-in-out">
      <div className="container mx-auto flex justify-between items-center">

        <div className="flex items-center text-2xl font-bold">
          <img src={LogoImage} alt="Logo" className="h-20 w-25 mr-10" />
        </div>

        <div className="flex items-center gap-6">
          <ul className="flex gap-6 text-black">
            <Link to='/'><li className="hover:text-blue-600 transition-colors duration-300"><AiFillHome size={25} /></li></Link>
            <Link to='/about'><li className="hover:text-blue-600 transition-colors duration-300"><AiOutlineEdit size={25} /></li></Link>
            <Link to='/contact'><li className="hover:text-blue-600 transition-colors duration-300"><IoMdContact size={25} /></li></Link>
          </ul>
        </div>

      </div>
    </header>
  );
};

export default Header;
