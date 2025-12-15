import { Link } from "react-router-dom";
import React from 'react'

const Home= () => {
  return (
    <div className="min-h-screen bg-gray-100">
    
      
      <nav className="w-full bg-white shadow-sm px-8 py-4 flex items-center justify-between">
        <ul className="flex gap-6 text-gray-700 font-medium">
          <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
          <li><Link to="/about" className="hover:text-blue-500">About</Link></li>
          <li><Link to="/contact" className="hover:text-blue-500">Contact</Link></li>
        </ul>
      </nav>

      
      <section className="px-8 lg:px-20 py-20 flex flex-col lg:flex-row items-center gap-86">
        
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold leading-tight mb-4">
            Organize your <br /> notes easily
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            <i>HiddenInk</i> is an easy to-use platform to organize, manage
            and store all your notes.
          </p>

          <Link 
            to="/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>

        
        <div className="mt-12 lg:mt-0 ">
          <div className="w-70 h-85 bg-blue-200 rounded-xl shadow-md p-6 flex flex-col justify-between relative">
          <div className="absolute top-0 left-0 w-full h-10 bg-blue-400 rounded-t-xl"></div><br></br>
            <div>
              <div className="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded mb-3 w-2/4"></div><br></br>
              <div className="h-4 bg-gray-200 rounded mb-3 w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded mb-3 w-2/4"></div><br></br>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>

            <div className="w-4 h-4 bg-blue-400 rounded-full ml-auto"></div>
          </div>
        </div>

      </section>
    </div>
  )
}

export default Home
