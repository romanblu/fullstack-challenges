import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-green-700 via-green-800 to-green-950 text-white ">
        <div className="text-center border-b-2 border-gray-200/40 py-6 max-w-[900px] mx-auto ">
            <h2 className="text-2xl font-bold text-white mb-2 pt-3">Stay in the Loop</h2>
            <p >Get updates from tissue culture labs, new plant listings, and exclusive offers.</p>
            <form className="flex flex-col sm:flex-row items-center justify-center gap-3 px-8 my-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="max-w-[400px] flex-grow sm:w-auto px-4 py-3  rounded-md border border-emerald-300/50 focus:ring-2 focus:ring-emerald-400 outline-none bg-emerald-400/30"
                required
              />
              <button
                type="submit"
                className="bg-emerald-600/50 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition"
              >
                Subscribe
              </button>
          </form>
        </div>
        <div className="container max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 px-8 pt-6 gap-6 ">
            {/* { Brand identity } */}
            <div>
              <h2 className="text-xl font-bold mb-2">PlantCellia</h2>
              <p className="text-sm text-gray-300">
                Connecting tissue culture labs and plant lovers worldwide 🌱  
                Explore, trade, and grow with verified suppliers.
              </p>
            </div>
             {/* Quick links  */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
              <ul className="space-y-1 text-gray-300">
                <li><a href="#" className="hover:text-green-400 transition">Home</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Shop</a></li>
                <li><a href="#" className="hover:text-green-400 transition">About</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Contact</a></li>
              </ul>
            </div>
             {/* Categories  */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Categories</h3>
              <ul className="space-y-1 text-gray-300">
                <li><a href="#" className="hover:text-green-400 transition">House Plants</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Commercial Plants</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Tissue Culture Labs</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Accessories</a></li>
              </ul>
            </div>
             {/* Contact  */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
              <p className="text-gray-300 text-sm mb-2">📍 Global supplier network</p>
              <p className="text-gray-300 text-sm mb-2">✉️ info@PlantCellia.com</p>
              <p className="text-gray-300 text-sm">🌐 www.plantcellia.com</p>
            </div>
        </div>
        <div className="mt-10 border-t-2 border-gray-200/40 py-6 max-w-[900px] mx-auto text-center text-gray-300 text-sm">
          © 2025 PlantCellia All rights reserved.
        </div>
      </footer>
    );
}

export default Footer;