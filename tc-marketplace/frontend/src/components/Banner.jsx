import React from "react";

const Banner = () => {
    return (
        <section className="h-[70vh] flex px-8">
            <div className="flex flex-col justify-center items-center mr-4 sm:w-1/2">
              <div className="text-center ">
                <h1 className="text-4xl font-bold mb-4">
                  Connecting Tissue Culture Labs Worldwide
                </h1>
                <p className="text-lg mb-6">
                  Discover, exchange, and grow verified plant cultures from trusted laboratories across the globe.
                </p>
              </div>
              <div className="space-x-6 ">
                <a href="#shop" className="bg-slate-200 text-green-700 px-5 py-2 rounded-lg  hover:bg-green-100 hover:scale-105 transition duration-200 shadow-lg hover:shadow-xl">
                  Shop Now
                </a>
                <a href="#learn" className="border border-white px-5 py-2 rounded-lg hover:bg-slate-300 hover:text-green-700 transition duration-200 shadow-lg hover:shadow-xl">
                  Learn More
                </a>
              </div>
            </div>
            
            <div className="hidden sm:flex sm:w-1/2 justify-center mt-8 ">
              <img 
              src="https://www.shutterstock.com/image-photo/vase-decorate-plants-flowers-rainy-600nw-1960299640.jpg" 
              alt="Plants Banner" 
              className="rounded-t-full shadow-lg object-cover 
                transition-all duration-300"
            />
            </div>
        </section>
    );
}

export default Banner;