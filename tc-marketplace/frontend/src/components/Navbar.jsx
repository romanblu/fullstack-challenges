import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-3  bg-opacity-25 ">
        <a className="text-2xl font-bold">PlantCellia</a>
        <div className="hidden sm:flex space-x-6 ">
            <a className="hover:text-lime-200">Products</a>
            <a className="hover:text-lime-200">About Us</a>
            <a className="hover:text-lime-200">Blog</a>
            <a className="hover:text-lime-200">Contact</a>
        </div>
        <div className="space-x-4 items-center">
            <a className="hover:text-lime-200">Login</a>
            <a className="bg-amber-400 text-green-900 px-2 py-1 rounded-xl hover:bg-amber-300 duration-200 shadow-lg hover:shadow-xl">Sign Up</a>
            </div>
    </nav>
  );
}

export default Navbar;